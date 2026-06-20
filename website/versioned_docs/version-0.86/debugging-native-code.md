---
id: debugging-native-code
title: Debugging Native Code
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="banner-native-code-required">
  <h3>네이티브 코드가 포함된 프로젝트 전용</h3>
  <p>아래 섹션은 네이티브 코드가 노출된 프로젝트에만 해당합니다. 관리형 Expo 워크플로를 사용하는 경우, 이 API를 사용하려면 <a href="https://docs.expo.dev/workflow/prebuild/" target="_blank">prebuild</a> 가이드를 참고하세요.</p>
</div>

## 로그 확인하기

앱이 실행 중인 상태에서 터미널에 다음 명령어를 입력하면 iOS 또는 Android 앱의 네이티브 로그를 확인할 수 있습니다:

```shell
# For Android:
npx react-native log-android
# Or, for iOS:
npx react-native log-ios
```

iOS 시뮬레이터에서는 Debug > Open System Log…를 통해, Android 앱이 디바이스 또는 에뮬레이터에서 실행 중일 때는 터미널에서 `adb logcat "*:S" ReactNative:V ReactNativeJS:V`를 실행하여 로그에 접근할 수도 있습니다.

<details>
<summary>**💡 커스텀 네이티브 로그**</summary>

Native Module을 작성하면서 디버깅을 위해 모듈에 커스텀 로그를 추가하고 싶다면 아래 방법을 사용할 수 있습니다:

#### Android (Java/Kotlin)

네이티브 모듈에서 `Log` 클래스를 사용하면 Logcat에서 확인할 수 있는 로그를 추가할 수 있습니다:

```java
import android.util.Log;

private void log(String message) {
    Log.d("YourModuleName", message);
}
```

Logcat에서 이 로그를 보려면 `YourModuleName`을 커스텀 태그로 교체하여 다음 명령어를 사용하세요:

```shell
adb logcat "*:S" ReactNative:V ReactNativeJS:V YourModuleName:D
```

#### iOS (Objective-C/Swift)

네이티브 모듈에서 커스텀 로그를 위해 `NSLog`를 사용하세요:

```objectivec
NSLog(@"YourModuleName: %@", message);
```

또는 Swift에서는:

```swift
print("YourModuleName: \(message)")
```

이 로그는 앱 실행 시 Xcode 콘솔에 표시됩니다.

</details>

## 네이티브 IDE에서 디버깅하기

Native Module 작성 등 네이티브 코드를 다룰 때는 Android Studio 또는 Xcode에서 앱을 실행하여 일반 네이티브 앱 개발과 동일하게 브레이크포인트 설정 등의 네이티브 디버깅 기능을 활용할 수 있습니다.

또 다른 방법은 React Native CLI로 앱을 실행한 후, 네이티브 IDE(Android Studio 또는 Xcode)의 네이티브 디버거를 해당 프로세스에 연결하는 것입니다.

### Android Studio

Android Studio에서는 메뉴 바의 "Run" 옵션으로 이동하여 "Attach to Process..."를 클릭한 다음, 실행 중인 React Native 앱을 선택하면 됩니다.

### Xcode

Xcode에서는 상단 메뉴 바의 "Debug"를 클릭하고 "Attach to process" 옵션을 선택한 후, "Likely Targets" 목록에서 앱을 선택하세요.
