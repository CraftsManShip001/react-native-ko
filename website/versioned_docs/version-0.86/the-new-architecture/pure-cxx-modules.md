import {getCoreBranchNameForCurrentVersion} from '@site/src/getCoreBranchNameForCurrentVersion';
import {getCurrentVersion} from '@site/src/getCurrentVersion';
import CodeBlock from '@theme/CodeBlock';

# 크로스 플랫폼 네이티브 모듈 (C++)

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

C++로 모듈을 작성하는 것은 Android와 iOS 사이에서 플랫폼에 종속되지 않는 코드를 공유하기 위한 최선의 방법입니다. 순수 C++ 모듈을 사용하면 로직을 한 번만 작성하고 플랫폼별 코드를 작성할 필요 없이 모든 플랫폼에서 즉시 재사용할 수 있습니다.

이 가이드에서는 순수 C++ Turbo Native Module 생성 과정을 살펴봅니다:

1. JS 스펙 생성
2. 스캐폴딩 생성을 위한 Codegen 설정
3. 네이티브 로직 구현
4. Android 및 iOS 애플리케이션에 모듈 등록
5. JS에서 변경 사항 테스트

이 가이드의 나머지 부분은 다음 명령을 실행하여 애플리케이션을 생성했다고 가정합니다:

<CodeBlock language="bash" title="shell">
{`npx @react-native-community/cli@latest init SampleApp --version ${getCurrentVersion()}`}
</CodeBlock>

## 1. JS 스펙 생성

순수 C++ Turbo Native Module은 Turbo Native Module입니다. Codegen이 스캐폴딩 코드를 생성할 수 있도록 스펙 파일(spec file이라고도 함)이 필요합니다. 스펙 파일은 JS에서 Turbo Native Module에 접근하는 데도 사용됩니다.

스펙 파일은 타입이 지정된 JS 방언으로 작성해야 합니다. React Native는 현재 Flow와 TypeScript를 지원합니다.

1. 앱의 루트 폴더 내에 `specs`라는 새 폴더를 만듭니다.
2. 다음 코드로 `NativeSampleModule.ts`라는 새 파일을 만듭니다:

:::warning
모든 Native Turbo Module 스펙 파일에는 `Native` 접두사가 있어야 합니다. 그렇지 않으면 Codegen이 이를 무시합니다.
:::

<Tabs groupId="tnm-specs" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="flow">

```ts title="specs/NativeSampleModule.ts"
// @flow
import type {TurboModule} from 'react-native'
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
<TabItem value="typescript">

```ts title="specs/NativeSampleModule.ts"
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
</Tabs>

## 2. Codegen 설정

다음 단계는 `package.json`에서 [Codegen](what-is-codegen.mdx)을 설정하는 것입니다. 다음 내용을 포함하도록 파일을 업데이트합니다:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   // highlight-add-start
   "codegenConfig": {
     "name": "AppSpecs",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.sampleapp.specs"
     }
   },
   // highlight-add-end
   "dependencies": {
```

이 설정은 Codegen이 `specs` 폴더에서 스펙 파일을 찾도록 지시합니다. 또한 Codegen이 `modules`에 대한 코드만 생성하고 생성된 코드의 네임스페이스를 `AppSpecs`로 지정하도록 지시합니다.

## 3. 네이티브 코드 작성

C++ Turbo Native Module을 작성하면 Android와 iOS 간에 코드를 공유할 수 있습니다. 따라서 코드를 한 번 작성하고, C++ 코드를 플랫폼에서 인식할 수 있도록 각 플랫폼에 적용해야 할 변경 사항을 살펴봅니다.

1. `android` 및 `ios` 폴더와 같은 수준에 `shared`라는 폴더를 만듭니다.
2. `shared` 폴더 내에 `NativeSampleModule.h`라는 새 파일을 만듭니다.

   ```cpp title="shared/NativeSampleModule.h"
   #pragma once

   #include <AppSpecsJSI.h>

   #include <memory>
   #include <string>

   namespace facebook::react {

   class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
   public:
     NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

     std::string reverseString(jsi::Runtime& rt, std::string input);
   };

   } // namespace facebook::react

   ```

3. `shared` 폴더 내에 `NativeSampleModule.cpp`라는 새 파일을 만듭니다.

   ```cpp title="shared/NativeSampleModule.cpp"
   #include "NativeSampleModule.h"

   namespace facebook::react {

   NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
       : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

   std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
     return std::string(input.rbegin(), input.rend());
   }

   } // namespace facebook::react
   ```

생성한 두 파일을 살펴봅니다:

- `NativeSampleModule.h` 파일은 순수 C++ TurboModule의 헤더 파일입니다. `include` 구문은 Codegen이 생성하고 구현해야 할 인터페이스와 기본 클래스를 포함하는 스펙이 포함되도록 합니다.
- 모듈은 해당 네임스페이스에 있는 모든 타입에 접근하기 위해 `facebook::react` 네임스페이스 내에 위치합니다.
- `NativeSampleModule` 클래스는 실제 Turbo Native Module 클래스이며, 이 클래스를 Turbo Native Module로 동작하게 해주는 일부 글루 코드와 보일러플레이트 코드를 포함하는 `NativeSampleModuleCxxSpec` 클래스를 상속합니다.
- 마지막으로, 필요에 따라 JS와 통신하기 위한 `CallInvoker`에 대한 포인터를 받는 생성자와 구현해야 할 함수 프로토타입이 있습니다.

`NativeSampleModule.cpp` 파일은 Turbo Native Module의 실제 구현이며, 스펙에서 선언한 생성자와 메서드를 구현합니다.

## 4. 플랫폼에 모듈 등록

다음 단계에서는 플랫폼에 모듈을 등록합니다. 이는 React Native 애플리케이션이 JS 레이어에서 네이티브 메서드를 최종적으로 호출할 수 있도록 네이티브 코드를 JS에 노출하는 단계입니다.

이것은 플랫폼별 코드를 작성해야 하는 유일한 시점입니다.

### Android

Android 앱이 C++ Turbo Native Module을 효과적으로 빌드할 수 있도록 하기 위해 다음이 필요합니다:

1. C++ 코드에 접근하기 위한 `CMakeLists.txt` 생성.
2. 새로 생성한 `CMakeLists.txt` 파일을 가리키도록 `build.gradle` 수정.
3. 새 Turbo Native Module을 등록하기 위해 Android 앱에 `OnLoad.cpp` 파일 생성.

#### 1. `CMakeLists.txt` 파일 생성

Android는 CMake를 사용하여 빌드합니다. CMake는 shared 폴더에 정의한 파일에 접근하여 빌드해야 합니다.

1. `SampleApp/android/app/src/main/jni` 라는 새 폴더를 만듭니다. `jni` 폴더는 Android의 C++ 측이 위치하는 곳입니다.
2. `CMakeLists.txt` 파일을 만들고 다음 내용을 추가합니다:

```shell title="CMakeLists.txt"
cmake_minimum_required(VERSION 3.13)

# Define the library name here.
project(appmodules)

# This file includes all the necessary to let you build your React Native application
include(${REACT_ANDROID_DIR}/cmake-utils/ReactNative-application.cmake)

# Define where the additional source code lives. We need to crawl back the jni, main, src, app, android folders
target_sources(${CMAKE_PROJECT_NAME} PRIVATE ../../../../../shared/NativeSampleModule.cpp)

# Define where CMake can find the additional header files. We need to crawl back the jni, main, src, app, android folders
target_include_directories(${CMAKE_PROJECT_NAME} PUBLIC ../../../../../shared)
```

CMake 파일은 다음을 수행합니다:

- 모든 앱 C++ 코드가 포함될 `appmodules` 라이브러리를 정의합니다.
- React Native의 기본 CMake 파일을 로드합니다.
- `target_sources` 지시문으로 빌드해야 하는 모듈 C++ 소스 코드를 추가합니다. 기본적으로 React Native는 이미 기본 소스로 `appmodules` 라이브러리를 채우며, 여기서는 커스텀 소스를 포함합니다. `jni` 폴더에서 C++ Turbo Module이 위치한 `shared` 폴더로 거슬러 올라가야 함을 확인할 수 있습니다.
- CMake가 모듈 헤더 파일을 찾을 위치를 지정합니다. 이 경우에도 `jni` 폴더에서 거슬러 올라가야 합니다.

#### 2. 커스텀 C++ 코드를 포함하도록 `build.gradle` 수정

Gradle은 Android 빌드를 조율하는 도구입니다. Turbo Native Module을 빌드하기 위해 `CMake` 파일을 찾을 위치를 Gradle에 알려주어야 합니다.

1. `SampleApp/android/app/build.gradle` 파일을 엽니다.
2. 기존 `android` 블록 내에 다음 블록을 추가합니다:

```diff title="android/app/build.gradle"
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }

+   externalNativeBuild {
+       cmake {
+           path "src/main/jni/CMakeLists.txt"
+       }
+   }
}
```

이 블록은 Gradle 파일에 CMake 파일을 찾을 위치를 알려줍니다. 경로는 `build.gradle` 파일이 있는 폴더를 기준으로 상대 경로이므로, `jni` 폴더에 있는 `CMakeLists.txt` 파일의 경로를 추가해야 합니다.

#### 3. 새 Turbo Native Module 등록

마지막 단계는 런타임에 새 C++ Turbo Native Module을 등록하여 JS가 C++ Turbo Native Module을 요청할 때 앱이 어디서 찾아야 하는지 알고 반환할 수 있도록 하는 것입니다.

1. `SampleApp/android/app/src/main/jni` 폴더에서 다음 명령을 실행합니다:

<CodeBlock language="sh" title="shell">
{`curl -O https://raw.githubusercontent.com/facebook/react-native/${getCoreBranchNameForCurrentVersion()}/packages/react-native/ReactAndroid/cmake-utils/default-app-setup/OnLoad.cpp`}
</CodeBlock>

2. 그런 다음 이 파일을 다음과 같이 수정합니다:

```diff title="android/app/src/main/jni/OnLoad.cpp"
#include <DefaultComponentsRegistry.h>
#include <DefaultTurboModuleManagerDelegate.h>
#include <autolinking.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <rncore.h>

+ // Include the NativeSampleModule header
+ #include <NativeSampleModule.h>

//...

std::shared_ptr<TurboModule> cxxModuleProvider(
    const std::string& name,
    const std::shared_ptr<CallInvoker>& jsInvoker) {
  // Here you can provide your CXX Turbo Modules coming from
  // either your application or from external libraries. The approach to follow
  // is similar to the following (for a module called `NativeCxxModuleExample`):
  //
  // if (name == NativeCxxModuleExample::kModuleName) {
  //   return std::make_shared<NativeCxxModuleExample>(jsInvoker);
  // }

+  // This code registers the module so that when the JS side asks for it, the app can return it
+  if (name == NativeSampleModule::kModuleName) {
+    return std::make_shared<NativeSampleModule>(jsInvoker);
+  }

  // And we fallback to the CXX module providers autolinked
  return autolinking_cxxModuleProvider(name, jsInvoker);
}

// leave the rest of the file
```

이 단계는 React Native에서 원본 `OnLoad.cpp` 파일을 다운로드하여 앱에 C++ Turbo Native Module을 로드하도록 안전하게 재정의할 수 있도록 합니다.

파일을 다운로드한 후 다음을 통해 수정할 수 있습니다:

- 모듈을 가리키는 헤더 파일 포함
- JS가 요청할 때 앱이 반환할 수 있도록 Turbo Native Module 등록

이제 프로젝트 루트에서 `yarn android`를 실행하면 앱이 성공적으로 빌드되는 것을 확인할 수 있습니다.

### iOS

iOS 앱이 C++ Turbo Native Module을 효과적으로 빌드할 수 있도록 하기 위해 다음이 필요합니다:

1. pods 설치 및 Codegen 실행.
2. iOS 프로젝트에 `shared` 폴더 추가.
3. 애플리케이션에 C++ Turbo Native Module 등록.

#### 1. Pods 설치 및 Codegen 실행

첫 번째 단계는 iOS 애플리케이션을 준비할 때마다 실행하는 일반적인 단계입니다. CocoaPods는 React Native 의존성을 설정하고 설치하는 데 사용하는 도구이며, 이 과정의 일부로 Codegen도 실행합니다.

```bash
cd ios
bundle install
bundle exec pod install
```

#### 2. iOS 프로젝트에 shared 폴더 추가

이 단계는 `shared` 폴더를 프로젝트에 추가하여 Xcode에서 볼 수 있도록 합니다.

1. CocoaPods가 생성한 Xcode Workspace를 엽니다.

```bash
cd ios
open SampleApp.xcworkspace
```

2. 왼쪽의 `SampleApp` 프로젝트를 클릭하고 `Add files to "Sample App"...`을 선택합니다.

![Add Files to Sample App...](/docs/assets/AddFilesToXcode1.png)

3. `shared` 폴더를 선택하고 `Add`를 클릭합니다.

![Add Files to Sample App...](/docs/assets/AddFilesToXcode2.png)

모든 것을 올바르게 완료했다면 왼쪽의 프로젝트가 다음과 같이 표시됩니다:

![Xcode Project](/docs/assets/CxxTMGuideXcodeProject.png)

#### 3. 앱에 Cxx Turbo Native Module 등록

앱에 순수 Cxx Turbo Native Module을 등록하려면 다음이 필요합니다:

1. Native Module을 위한 `ModuleProvider` 생성
2. JS 모듈 이름과 ModuleProvider 클래스를 연결하도록 `package.json` 설정.

ModuleProvider는 순수 C++ 모듈을 나머지 iOS 앱과 연결하는 Objective-C++입니다.

##### 3.1 ModuleProvider 생성

1. Xcode에서 `SampleApp` 프로젝트를 선택하고 <kbd>⌘</kbd> + <kbd>N</kbd>을 눌러 새 파일을 만듭니다.
2. `Cocoa Touch Class` 템플릿을 선택합니다.
3. 이름을 `NativeSampleModuleProvider`로 추가합니다. (다른 필드는 `Subclass of: NSObject`, `Language: Objective-C`로 유지합니다.)
4. Next를 클릭하여 파일을 생성합니다.
5. `NativeSampleModuleProvider.m`을 `NativeSampleModuleProvider.mm`으로 이름을 변경합니다. `mm` 확장자는 Objective-C++ 파일을 나타냅니다.
6. 다음 내용으로 `NativeSampleModuleProvider.h`를 구현합니다:

```objc title="NativeSampleModuleProvider.h"

#import <Foundation/Foundation.h>
#import <ReactCommon/RCTTurboModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface NativeSampleModuleProvider : NSObject <RCTModuleProvider>

@end

NS_ASSUME_NONNULL_END
```

이는 `RCTModuleProvider` 프로토콜을 준수하는 `NativeSampleModuleProvider` 객체를 선언합니다.

7. 다음 내용으로 `NativeSampleModuleProvider.mm`을 구현합니다:

```objc title="NativeSampleModuleProvider.mm"

#import "NativeSampleModuleProvider.h"
#import <ReactCommon/CallInvoker.h>
#import <ReactCommon/TurboModule.h>
#import "NativeSampleModule.h"

@implementation NativeSampleModuleProvider

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeSampleModule>(params.jsInvoker);
}

@end
```

이 코드는 `getTurboModule:` 메서드가 호출될 때 순수 C++ `NativeSampleModule`을 생성하여 `RCTModuleProvider` 프로토콜을 구현합니다.

##### 3.2 package.json 업데이트

마지막 단계는 `package.json`을 업데이트하여 React Native에 Native Module의 JS 스펙과 네이티브 코드의 구체적인 구현 사이의 연결을 알려주는 것입니다.

다음과 같이 `package.json`을 수정합니다:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   "codegenConfig": {
     "name": "AppSpecs",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.sampleapp.specs"
     // highlight-add-start
     },
     "ios": {
        "modulesProvider": {
          "NativeSampleModule":  "NativeSampleModuleProvider"
        }
     }
     // highlight-add-end
   },

   "dependencies": {
```

이 시점에서 codegen이 다시 실행되어 새 파일을 생성할 수 있도록 pods를 재설치해야 합니다:

```bash
# from the ios folder
bundle exec pod install
open SampleApp.xcworkspace
```

이제 Xcode에서 애플리케이션을 빌드하면 성공적으로 빌드할 수 있을 것입니다.

## 5. 코드 테스트

이제 JS에서 C++ Turbo Native Module에 접근할 차례입니다. 이를 위해 `App.tsx` 파일을 수정하여 Turbo Native Module을 가져오고 코드에서 호출해야 합니다.

1. `App.tsx` 파일을 엽니다.
2. 템플릿의 내용을 다음 코드로 교체합니다:

```tsx title="App.tsx"
import {type JSX, useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import SampleTurboModule from './specs/NativeSampleModule';

function App(): JSX.Element {
  const [value, setValue] = useState('');
  const [reversedValue, setReversedValue] = useState('');

  const onPress = () => {
    const revString = SampleTurboModule.reverseString(value);
    setReversedValue(revString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here the text you want to reverse</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});

export default App;
```

이 앱에서 주목할 만한 줄은 다음과 같습니다:

- `import SampleTurboModule from './specs/NativeSampleModule';`: 이 줄은 앱에서 Turbo Native Module을 가져옵니다.
- `const revString = SampleTurboModule.reverseString(value);` (`onPress` 콜백 내부): 앱에서 Turbo Native Module을 사용하는 방법입니다.

:::warning
이 예제를 가능한 한 간단하게 유지하기 위해 앱에서 직접 스펙 파일을 가져왔습니다.
이 경우 모범 사례는 스펙을 래핑하는 별도의 파일을 만들고 애플리케이션에서 해당 파일을 사용하는 것입니다.
이렇게 하면 스펙에 대한 입력을 준비하고 JS에서 더 많은 제어권을 갖게 됩니다.
:::

첫 번째 C++ Turbo Native Module을 작성했습니다!

| <center>Android</center>                                                                             | <center>iOS</center>                                                                          |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| <center><img src="/docs/assets/CxxGuideAndroidVideo.gif" alt="Android Video" height="600"/></center> | <center><img src="/docs/assets/CxxGuideIOSVideo.gif" alt="iOS video" height="600" /></center> |
