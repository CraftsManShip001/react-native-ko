# iOS - 네이티브 모듈에서 Swift 사용하기

Swift는 iOS에서 네이티브 애플리케이션을 개발하기 위한 공식 기본 언어입니다.

이 가이드에서는 Swift를 사용하여 네이티브 모듈을 작성하는 방법을 살펴봅니다.

:::note
React Native의 핵심은 주로 C++로 작성되어 있으며, Apple이 개발한 [상호 운용성 레이어](https://www.swift.org/documentation/cxx-interop/)에도 불구하고 Swift와 C++ 간의 상호 운용성은 그리 뛰어나지 않습니다.

따라서 이 가이드에서 작성할 모듈은 언어 간 비호환성으로 인해 순수 Swift 구현이 아닙니다. 일부 Objective-C++ 글루 코드를 작성해야 하지만, 이 가이드의 목표는 필요한 Objective-C++ 코드의 양을 최소화하는 것입니다. 기존 아키텍처에서 새 아키텍처로 기존 네이티브 모듈을 마이그레이션하는 경우, 이 접근 방식을 통해 대부분의 코드를 재사용할 수 있습니다.
:::

이 가이드는 [Native Module](/docs/turbo-native-modules-introduction) 가이드의 iOS 구현을 기반으로 합니다.
이 가이드를 시작하기 전에 해당 가이드를 먼저 읽고, 가능하다면 예제를 직접 구현해 보세요.

## 어댑터 패턴

목표는 Swift 모듈을 사용하여 모든 비즈니스 로직을 구현하고, 앱과 Swift 구현을 연결할 수 있는 얇은 글루 레이어를 Objective-C++로 갖추는 것입니다.

이를 위해 [어댑터(Adapter)](https://en.wikipedia.org/wiki/Adapter_pattern) 디자인 패턴을 활용하여 Swift 모듈과 Objective-C++ 레이어를 연결할 수 있습니다.

Objective-C++ 객체는 React Native에 의해 생성되며 Swift 모듈에 대한 참조를 유지하면서 라이프사이클을 관리합니다. Objective-C++ 객체는 모든 메서드 호출을 Swift로 전달합니다.

### Swift 모듈 생성

첫 번째 단계는 구현을 Objective-C++ 레이어에서 Swift 레이어로 이동하는 것입니다.

이를 위해 다음 단계를 따르세요:

1. Xcode 프로젝트에 `NativeLocalStorage.swift`라는 새 빈 파일을 만듭니다.
2. Swift 모듈에 다음과 같이 구현을 추가합니다:

```swift title="NativeLocalStorage.swift"
import Foundation

@objcMembers public class NativeLocalStorage: NSObject {
  let userDefaults = UserDefaults(suiteName: "local-storage");

  public func getItem(for key: String) -> String? {
    return userDefaults?.string(forKey: key)
  }

  public func setItem(for key: String, value: String) {
    userDefaults?.set(value, forKey: key)
  }

  public func removeItem(for key: String) {
    userDefaults?.removeObject(forKey: key)
  }

  public func clear() {
    userDefaults?.dictionaryRepresentation().keys.forEach { removeItem(for: $0) }
  }
}

```

Objective-C에서 호출해야 하는 모든 메서드를 `public`으로 선언하고 `@objc` 어노테이션을 붙여야 합니다.
또한 Objective-C에서 사용할 수 있도록 클래스가 `NSObject`를 상속해야 합니다.

### `RCTNativeLocalStorage` 파일 업데이트

그런 다음 Swift 모듈을 생성하고 메서드를 호출할 수 있도록 `RCTNativeLocalStorage` 구현을 업데이트해야 합니다.

1. `RCTNativeLocalStorage.mm` 파일을 엽니다.
2. 다음과 같이 업데이트합니다:

```diff title="RCTNativeLocalStorage.mm"
//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeLocalStorage.h"
+#import "SampleApp-Swift.h"

- static NSString *const RCTNativeLocalStorageKey = @"local-storage";

-@interface RCTNativeLocalStorage()
-@property (strong, nonatomic) NSUserDefaults *localStorage;
-@end

-@implementation RCTNativeLocalStorage
+@implementation RCTNativeLocalStorage {
+    NativeLocalStorage *storage;
+}

-RCT_EXPORT_MODULE(NativeLocalStorage)

 - (id) init {
   if (self = [super init]) {
-    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
+    storage = [NativeLocalStorage new];
   }
   return self;
 }

 - (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
   return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
 }

 - (NSString * _Nullable)getItem:(NSString *)key {
-   return [self.localStorage stringForKey:key];
+   return [storage getItemFor:key];
 }

 - (void)setItem:(NSString *)value key:(NSString *)key {
-   [self.localStorage setObject:value forKey:key];
+   [storage setItemFor:key value:value];
 }

 - (void)removeItem:(NSString *)key {
-   [self.localStorage removeObjectForKey:key];
+   [storage removeItemFor:key];
 }

 - (void)clear {
-   NSDictionary *keys = [self.localStorage dictionaryRepresentation];
-   for (NSString *key in keys) {
-     [self removeItem:key];
-   }
+  [storage clear];
 }

++ (NSString *)moduleName
+{
+  return @"NativeLocalStorage";
+}

@end
```

코드 자체는 크게 변경되지 않았습니다. `NSUserDefaults`에 대한 참조를 직접 생성하는 대신, Swift 구현을 사용하여 새 `NativeLocalStorage`를 생성하고, 네이티브 모듈 함수가 호출될 때마다 Swift로 구현된 `NativeLocalStorage`로 호출을 전달합니다.

`"SampleApp-Swift.h"` 헤더를 가져와야 합니다. 이 헤더는 Xcode가 자동으로 생성하며 Swift 파일의 공개 API를 Objective-C에서 사용 가능한 형식으로 포함합니다. 헤더의 `SampleApp` 부분은 실제 앱 이름이므로, `SampleApp`과 **다른** 이름으로 앱을 만들었다면 이를 변경해야 합니다.

`RCT_EXPORT_MODULE` 매크로도 더 이상 필요하지 않습니다. 네이티브 모듈은 [여기](/docs/turbo-native-modules-introduction?platforms=ios)에 설명된 대로 `package.json`을 사용하여 등록되기 때문입니다.

이 접근 방식은 인터페이스에 약간의 코드 중복을 도입하지만, 코드베이스에 이미 있는 Swift 코드를 최소한의 추가 노력으로 재사용할 수 있게 해줍니다.

### 브리징 헤더 구현

:::note
라이브러리 작성자로서 별도의 라이브러리로 배포될 네이티브 모듈을 개발하는 경우, 이 단계는 필요하지 않습니다.
:::

Swift 코드와 Objective-C++ 대응 부분을 연결하기 위해 필요한 마지막 단계는 브리징 헤더입니다.

브리징 헤더는 Swift 코드에서 볼 수 있어야 하는 모든 Objective-C 헤더 파일을 가져올 수 있는 헤더입니다.

코드베이스에 이미 브리징 헤더가 있을 수 있지만, 없는 경우 다음 단계에 따라 새로 만들 수 있습니다:

1. Xcode에서 새 파일을 만들고 `"SampleApp-Bridging-Header.h"`라고 이름을 지정합니다.
2. 다음과 같이 `"SampleApp-Bridging-Header.h"`의 내용을 업데이트합니다:

```diff title="SampleApp-Bridging-Header.h"
//
//  Use this file to import your target's public headers that you would like to expose to Swift.
//

+ #import <React-RCTAppDelegate/RCTDefaultReactNativeFactoryDelegate.h>
```

3. 프로젝트에서 브리징 헤더를 연결합니다:
   1. 프로젝트 네비게이터에서 앱 이름(`SampleApp`, 왼쪽)을 선택합니다.
   2. `Build Settings`를 클릭합니다.
   3. `"Bridging Header"`로 필터링합니다.
   4. "Bridging Header"의 상대 경로를 추가합니다. 예제에서는 `SampleApp-Bridging-Header.h`입니다.

![Bridging Header](/docs/assets/BridgingHeader.png)

## 앱 빌드 및 실행

이제 [Native Module 가이드의 마지막 단계](/docs/turbo-native-modules-introduction)를 따르면 Swift로 작성된 네이티브 모듈과 함께 앱이 실행되는 것을 확인할 수 있습니다.
