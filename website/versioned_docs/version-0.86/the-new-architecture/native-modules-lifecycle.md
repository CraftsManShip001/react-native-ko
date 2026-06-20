import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# 네이티브 모듈 라이프사이클

React Native에서 네이티브 모듈은 싱글톤입니다. 네이티브 모듈 인프라는 처음 접근할 때 지연 생성(lazy create) 방식으로 네이티브 모듈을 만들고, 앱에서 필요로 하는 동안 이를 유지합니다. 이는 앱 시작 시 네이티브 모듈을 즉시 생성하는 오버헤드를 피하고 더 빠른 시작 시간을 보장하기 위한 성능 최적화입니다.

순수 React Native 앱에서 네이티브 모듈은 한 번 생성되고 절대 소멸되지 않습니다. 그러나 더 복잡한 앱에서는 네이티브 모듈이 소멸되고 재생성되는 사용 사례가 있을 수 있습니다. 예를 들어, [기존 앱과 통합하기 가이드](/docs/integration-with-existing-apps)에서 소개하는 것처럼 일부 네이티브 뷰와 일부 React Native 서피스를 혼합하는 브라운필드 앱을 생각해 보세요. 이 경우 사용자가 React Native 서피스에서 벗어날 때 React Native 인스턴스를 소멸시키고, 사용자가 다시 해당 서피스로 돌아올 때 재생성하는 것이 합리적일 수 있습니다.

이런 상황에서 상태가 없는(stateless) 네이티브 모듈은 문제가 없습니다. 하지만 상태를 가진(stateful) 네이티브 모듈의 경우, 상태가 초기화되고 리소스가 해제될 수 있도록 네이티브 모듈을 적절히 무효화(invalidate)할 필요가 있습니다.

이 가이드에서는 네이티브 모듈을 올바르게 초기화하고 무효화하는 방법을 살펴봅니다. 이 가이드는 네이티브 모듈 작성 방법을 알고 있으며 네이티브 코드 작성에 익숙한 독자를 대상으로 합니다. 네이티브 모듈에 익숙하지 않다면 먼저 [Native Modules 가이드](/docs/turbo-native-modules-introduction)를 읽어 보세요.

## Android

Android의 경우, 모든 네이티브 모듈은 이미 두 가지 메서드 `initialize()`와 `invalidate()`를 정의하는 [TurboModule](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/turbomodule/core/interfaces/TurboModule.kt) 인터페이스를 구현합니다.

`initialize()` 메서드는 네이티브 모듈이 생성될 때 네이티브 모듈 인프라에 의해 호출됩니다. 예를 들어 ReactApplicationContext에 접근해야 하는 초기화 코드를 배치하기에 가장 적합한 곳입니다. `initialize()` 메서드를 구현하는 핵심 네이티브 모듈 예시로는 [BlobModule](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/blob/BlobModule.java#L155-L157), [NetworkingModule](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/network/NetworkingModule.java#L193-L197)이 있습니다.

`invalidate()` 메서드는 네이티브 모듈이 소멸될 때 네이티브 모듈 인프라에 의해 호출됩니다. 네이티브 모듈 상태를 초기화하고 메모리, 파일 등 더 이상 필요하지 않은 리소스를 해제하는 정리 코드를 배치하기에 가장 적합한 곳입니다. `invalidate()` 메서드를 구현하는 핵심 네이티브 모듈 예시로는 [DeviceInfoModule](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/deviceinfo/DeviceInfoModule.kt#L72-L76), [NetworkModule](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/network/NetworkingModule.java#L200-L212)이 있습니다.

## iOS

iOS의 경우, 네이티브 모듈은 [`RCTTurboModule`](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/ReactCommon/react/nativemodule/core/platform/ios/ReactCommon/RCTTurboModule.h#L196-L200) 프로토콜을 준수합니다. 그러나 이 프로토콜은 Android의 `TurboModule` 클래스에서 노출하는 `initialize` 및 `invalidate` 메서드를 노출하지 않습니다.

대신 iOS에서는 두 가지 추가 프로토콜인 [`RCTInitializing`](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/Base/RCTInitializing.h)과 [`RCTInvalidating`](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/Base/RCTInvalidating.h)이 있습니다. 이 프로토콜들은 각각 `initialize` 및 `invalidate` 메서드를 정의하는 데 사용됩니다.

모듈에서 초기화 코드를 실행해야 하는 경우, `RCTInitializing` 프로토콜을 준수하고 `initialize` 메서드를 구현할 수 있습니다. 이를 위해서는 다음과 같이 해야 합니다:

1. `NativeModule.h` 파일에 다음 줄을 추가하여 수정합니다:

```diff title="NativeModule.h"
+ #import <React/RCTInitializing.h>

//...

- @interface NativeModule : NSObject <NativeModuleSpec>
+ @interface NativeModule : NSObject <NativeModuleSpec, RCTInitializing>
//...
@end
```

2. `NativeModule.mm` 파일에 `initialize` 메서드를 구현합니다:

```diff title="NativeModule.mm"
// ...

@implementation NativeModule

+- (void)initialize {
+ // add the initialization code here
+}

@end
```

`initialize` 메서드를 구현하는 핵심 네이티브 모듈 예시로는 [RCTBlobManager](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/Libraries/Blob/RCTBlobManager.mm#L58-L68), [RCTTiming](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/CoreModules/RCTTiming.mm#L121-L124)이 있습니다.

모듈에서 정리 코드를 실행해야 하는 경우, `RCTInvalidating` 프로토콜을 준수하고 `invalidate` 메서드를 구현할 수 있습니다. 이를 위해서는 다음과 같이 해야 합니다:

1. `NativeModule.h` 파일에 다음 줄을 추가하여 수정합니다:

```diff title="NativeModule.h"
+ #import <React/RCTInvalidating.h>

//...

- @interface NativeModule : NSObject <NativeModuleSpec>
+ @interface NativeModule : NSObject <NativeModuleSpec, RCTInvalidating>

//...

@end
```

2. `NativeModule.mm` 파일에 `invalidate` 메서드를 구현합니다:

```diff title="NativeModule.mm"

// ...

@implementation NativeModule

+- (void)invalidate {
+ // add the cleanup code here
+}

@end
```

`invalidate` 메서드를 구현하는 핵심 네이티브 모듈 예시로는 [RCTAppearance](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/CoreModules/RCTAppearance.mm#L151-L155), [RCTDeviceInfo](https://github.com/facebook/react-native/blob/0617accecdcb11159ba15c34885f294bc206aa89/packages/react-native/React/CoreModules/RCTDeviceInfo.mm#L127-L133)가 있습니다.
