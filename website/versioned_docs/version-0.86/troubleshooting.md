---
id: troubleshooting
title: 문제 해결
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

다음은 React Native를 설정하는 동안 발생할 수 있는 일반적인 문제들입니다. 여기에 나열되지 않은 문제가 발생하면 [GitHub에서 해당 이슈를 검색](https://github.com/facebook/react-native/issues/)해보세요.

### 포트가 이미 사용 중

[Metro 번들러][metro]는 포트 8081에서 실행됩니다. 다른 프로세스가 이미 해당 포트를 사용 중이라면, 해당 프로세스를 종료하거나 번들러가 사용하는 포트를 변경할 수 있습니다.

#### 포트 8081에서 프로세스 종료

포트 8081을 수신 중인 프로세스의 ID를 찾으려면 다음 명령을 실행하세요:

```shell
sudo lsof -i :8081
```

그런 다음 다음 명령을 실행하여 프로세스를 종료하세요:

```shell
kill -9 <PID>
```

Windows에서는 [리소스 모니터](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-port-on-windows)를 사용하여 포트 8081을 사용하는 프로세스를 찾고, 작업 관리자를 사용하여 중지할 수 있습니다.

#### 8081 이외의 포트 사용

`port` 파라미터를 사용하여 번들러가 8081 이외의 포트를 사용하도록 설정할 수 있습니다. 프로젝트의 루트에서 다음을 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start -- --port=8088
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start --port 8088
```

</TabItem>
</Tabs>

또한 새 포트에서 JavaScript 번들을 로드하도록 애플리케이션을 업데이트해야 합니다. Xcode에서 기기로 실행 중인 경우, `ios/__App_Name__.xcodeproj/project.pbxproj` 파일에서 `8081`을 선택한 포트로 업데이트하면 됩니다.

### NPM 잠금 오류

React Native CLI를 사용하는 동안 `npm WARN locking Error: EACCES`와 같은 오류가 발생하면 다음을 실행해보세요:

```shell
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### React에 필요한 라이브러리 누락

React Native를 프로젝트에 수동으로 추가한 경우, `RCTText.xcodeproj`, `RCTImage.xcodeproj` 등 사용 중인 모든 관련 의존성을 포함했는지 확인하세요. 다음으로, 이러한 의존성으로 빌드된 바이너리는 앱 바이너리에 링크되어야 합니다. Xcode 프로젝트 설정의 `Linked Frameworks and Binaries` 섹션을 사용하세요. 더 자세한 단계는 여기에 있습니다: [라이브러리 링크하기](linking-libraries-ios.md).

CocoaPods를 사용하는 경우, `Podfile`에 subspecs와 함께 React를 추가했는지 확인하세요. 예를 들어, `<Text />`, `<Image />` 및 `fetch()` API를 사용하는 경우, `Podfile`에 다음을 추가해야 합니다:

```
pod 'React', :path => '../node_modules/react-native', :subspecs => [
  'RCTText',
  'RCTImage',
  'RCTNetwork',
  'RCTWebSocket',
]
```

다음으로, `pod install`을 실행했는지 그리고 React가 설치된 `Pods/` 디렉터리가 프로젝트에 생성되었는지 확인하세요. CocoaPods는 설치된 의존성을 사용할 수 있도록 이후 생성된 `.xcworkspace` 파일을 사용하도록 안내합니다.

#### CocoaPod으로 사용할 때 React Native가 컴파일되지 않음

의존성 관리자를 사용할 때 발생하는 차이로 인한 소스 코드의 잠재적인 사후 수정을 처리하는 [cocoapods-fix-react-native](https://github.com/orta/cocoapods-fix-react-native)라는 CocoaPods 플러그인이 있습니다.

#### 인수 목록이 너무 깁니다: 재귀적 헤더 확장 실패

프로젝트의 빌드 설정에서 `User Search Header Paths`와 `Header Search Paths`는 Xcode가 코드에 지정된 `#import` 헤더 파일을 어디서 찾아야 하는지를 지정하는 두 가지 설정입니다. Pods의 경우, CocoaPods는 찾아볼 특정 폴더의 기본 배열을 사용합니다. 이 특정 설정이 덮어쓰여지지 않았는지, 설정된 폴더 중 너무 큰 폴더가 없는지 확인하세요. 폴더 중 하나가 큰 폴더이면 Xcode가 전체 디렉터리를 재귀적으로 검색하려고 하다가 위의 오류를 발생시킬 것입니다.

`User Search Header Paths`와 `Header Search Paths` 빌드 설정을 CocoaPods에서 설정한 기본값으로 되돌리려면 - 빌드 설정 패널에서 해당 항목을 선택하고 삭제를 누르세요. 커스텀 재정의가 제거되고 CocoaPod 기본값으로 돌아옵니다.

### 사용 가능한 트랜스포트 없음

React Native는 WebSockets에 대한 폴리필을 구현합니다. 이러한 [폴리필](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Core/InitializeCore.js)은 `import React from 'react'`를 통해 애플리케이션에 포함하는 react-native 모듈의 일부로 초기화됩니다. [Firebase](https://github.com/facebook/react-native/issues/3645)와 같이 WebSockets가 필요한 다른 모듈을 로드하는 경우, react-native 이후에 로드/require하세요:

```
import Firebase from 'firebase';
```

## Shell Command Unresponsive Exception

다음과 같은 ShellCommandUnresponsiveException 예외가 발생하는 경우:

```
Execution failed for task ':app:installDebug'.
  com.android.builder.testing.api.DeviceException: com.android.ddmlib.ShellCommandUnresponsiveException
```

터미널에서 다음 명령을 실행하여 ADB 서버를 재시작하세요:

```
adb kill-server
adb start-server
```

## react-native 패키지 관리자를 시작할 수 없음 (Linux에서)

### Case 1: Error "code":"ENOSPC","errno":"ENOSPC"

[inotify](https://github.com/guard/listen/blob/master/README.md#increasing-the-amount-of-inotify-watchers) (Linux에서 watchman이 사용)가 모니터링할 수 있는 디렉터리 수로 인해 발생하는 문제입니다. 해결하려면 터미널 창에서 다음 명령을 실행하세요:

```shell
echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

### Error: spawnSync ./gradlew EACCES

macOS에서 `npm run android` 또는 `yarn android`를 실행할 때 위의 오류가 발생하면, `gradlew` 파일을 실행 가능하게 만들기 위해 `sudo chmod +x android/gradlew` 명령을 실행해보세요.

[metro]: https://metrobundler.dev/
