---
id: turbo-native-modules-ios
title: 'Turbo Native Modules: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

이제 애플리케이션이 종료된 후에도 `localStorage`가 유지되도록 iOS 플랫폼 코드를 작성할 차례입니다.

## Xcode 프로젝트 준비

Xcode를 사용하여 iOS 프로젝트를 준비해야 합니다. 다음 **6단계**를 완료하면 생성된 `NativeLocalStorageSpec` 인터페이스를 구현하는 `RCTNativeLocalStorage`를 갖게 됩니다.

1. CocoaPods가 생성한 Xcode Workspace를 엽니다:

```bash
cd ios
open TurboModuleExample.xcworkspace
```

<img className="half-size" alt="Open Xcode Workspace" src="/docs/assets/turbo-native-modules/xcode/1.webp" />

2. 앱을 우클릭하고 <code>New Group</code>을 선택한 후, 새 그룹 이름을 `NativeLocalStorage`로 지정합니다.

<img className="half-size" alt="Right click on app and select New Group" src="/docs/assets/turbo-native-modules/xcode/2.webp" />

3. `NativeLocalStorage` 그룹 안에서 <code>New</code>→<code>File from Template</code>을 생성합니다.

<img className="half-size" alt="Create a new file using the Cocoa Touch Class template" src="/docs/assets/turbo-native-modules/xcode/3.webp" />

4. <code>Cocoa Touch Class</code>를 사용합니다.

<img className="half-size" alt="Use the Cocoa Touch Class template" src="/docs/assets/turbo-native-modules/xcode/4.webp"  />

5. Cocoa Touch Class 이름을 <code>RCTNativeLocalStorage</code>로 지정하고 언어는 <code>Objective-C</code>를 선택합니다.

<img className="half-size" alt="Create an Objective-C RCTNativeLocalStorage class" src="/docs/assets/turbo-native-modules/xcode/5.webp" />

6. <code>RCTNativeLocalStorage.m</code>을 <code>RCTNativeLocalStorage.mm</code>으로 이름을 변경하여 Objective-C++ 파일로 만듭니다.

<img className="half-size" alt="Convert to and Objective-C++ file" src="/docs/assets/turbo-native-modules/xcode/6.webp" />

## NSUserDefaults로 localStorage 구현

먼저 `RCTNativeLocalStorage.h`를 업데이트합니다:

```objc title="NativeLocalStorage/RCTNativeLocalStorage.h"
//  RCTNativeLocalStorage.h
//  TurboModuleExample

#import <Foundation/Foundation.h>
// highlight-add-next-line
#import <NativeLocalStorageSpec/NativeLocalStorageSpec.h>

NS_ASSUME_NONNULL_BEGIN

// highlight-remove-next-line
@interface RCTNativeLocalStorage : NSObject
// highlight-add-next-line
@interface RCTNativeLocalStorage : NSObject <NativeLocalStorageSpec>

@end
```

그런 다음 구현부를 업데이트하여 커스텀 [suite name](https://developer.apple.com/documentation/foundation/nsuserdefaults/1409957-initwithsuitename)이 있는 `NSUserDefaults`를 사용하도록 합니다.

```objc title="NativeLocalStorage/RCTNativeLocalStorage.mm"
//  RCTNativeLocalStorage.m
//  TurboModuleExample

#import "RCTNativeLocalStorage.h"

static NSString *const RCTNativeLocalStorageKey = @"local-storage";

@interface RCTNativeLocalStorage()
@property (strong, nonatomic) NSUserDefaults *localStorage;
@end

@implementation RCTNativeLocalStorage

- (id) init {
  if (self = [super init]) {
    _localStorage = [[NSUserDefaults alloc] initWithSuiteName:RCTNativeLocalStorageKey];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

- (NSString * _Nullable)getItem:(NSString *)key {
  return [self.localStorage stringForKey:key];
}

- (void)setItem:(NSString *)value
          key:(NSString *)key {
  [self.localStorage setObject:value forKey:key];
}

- (void)removeItem:(NSString *)key {
  [self.localStorage removeObjectForKey:key];
}

- (void)clear {
  NSDictionary *keys = [self.localStorage dictionaryRepresentation];
  for (NSString *key in keys) {
    [self removeItem:key];
  }
}

+ (NSString *)moduleName
{
  return @"NativeLocalStorage";
}

@end
```

주의할 사항:

- Xcode를 사용하여 Codegen의 `@protocol NativeLocalStorageSpec`으로 이동할 수 있습니다. 또한 Xcode를 사용하여 스텁을 자동으로 생성할 수도 있습니다.

## 앱에 Native Module 등록

마지막 단계는 `package.json`을 업데이트하여 React Native에 Native Module의 JS 사양과 네이티브 코드에서의 구체적인 구현 사이의 연결을 알려주는 것입니다.

`package.json`을 다음과 같이 수정합니다:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   "codegenConfig": {
     "name": "NativeLocalStorageSpec",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.nativelocalstorage"
     },
     // highlight-add-start
     "ios": {
        "modulesProvider": {
          "NativeLocalStorage": "RCTNativeLocalStorage"
        }
     }
     // highlight-add-end
   },

   "dependencies": {
```

이 시점에서 pods를 다시 설치하여 codegen이 다시 실행되고 새 파일이 생성되도록 해야 합니다:

```bash
# from the ios folder
bundle exec pod install
open TurboModuleExample.xcworkspace
```

이제 Xcode에서 애플리케이션을 빌드하면 성공적으로 빌드될 것입니다.

## 시뮬레이터에서 코드 빌드 및 실행

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">
```bash
npm run ios
```
</TabItem>
<TabItem value="yarn">
```bash
yarn run ios
```
</TabItem>
</Tabs>

<video width="30%" height="30%" playsinline="true" autoplay="true" muted="true" loop="true">
    <source src="/docs/assets/turbo-native-modules/turbo-native-modules-ios.webm" type="video/webm" />
    <source src="/docs/assets/turbo-native-modules/turbo-native-modules-ios.mp4" type="video/mp4" />
</video>
