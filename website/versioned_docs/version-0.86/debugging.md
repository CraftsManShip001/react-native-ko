---
id: debugging
title: Debugging Basics
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

:::note
Dev Menu, LogBox, React Native DevTools 등의 디버깅 기능은 릴리즈(프로덕션) 빌드에서 비활성화됩니다.
:::

## Dev Menu 열기

React Native는 디버깅 기능에 접근할 수 있는 인앱 개발자 메뉴를 제공합니다. 기기를 흔들거나 키보드 단축키를 사용하여 Dev Menu에 접근할 수 있습니다:

- iOS 시뮬레이터: <kbd>Ctrl</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>Z</kbd> (또는 Device > Shake)
- Android 에뮬레이터: <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS) 또는 <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows 및 Linux)

대안 방법 (Android): `adb shell input keyevent 82`.

![The React Native Dev Menu](/docs/assets/debugging-dev-menu-083.jpg)

## DevTools 열기

[React Native DevTools](./react-native-devtools)는 React Native에 내장된 디버거입니다. 웹 브라우저와 유사하게 JavaScript 코드의 실행 상태를 검사하고 파악할 수 있습니다.

DevTools를 열려면 다음 중 하나를 사용하세요:

- Dev Menu에서 "Open DevTools"를 선택합니다.
- CLI에서 <kbd>j</kbd>를 누릅니다.

![React Native DevTools opened to the "Welcome" pane](/docs/assets/debugging-rndt-welcome-083.jpg)

처음 실행하면 DevTools가 환영 패널과 함께 열리며, 로그를 확인하고 JavaScript 런타임과 상호작용할 수 있는 콘솔 드로어가 열립니다. 창 상단에서 통합 React 컴포넌트 인스펙터와 프로파일러를 포함한 다른 패널로 이동할 수 있습니다.

자세한 내용은 [React Native DevTools 가이드](./react-native-devtools)를 참고하세요.

## LogBox

LogBox는 앱에서 경고나 오류가 기록될 때 표시되는 인앱 도구입니다.

![A LogBox warning and an expanded LogBox syntax error](/docs/assets/debugging-logbox-076.jpg)

### 치명적 오류

JavaScript 구문 오류와 같이 복구 불가능한 오류가 발생하면 LogBox가 오류 위치와 함께 열립니다. 이 상태에서는 코드를 실행할 수 없으므로 LogBox를 닫을 수 없습니다. 구문 오류가 Fast Refresh 또는 수동 리로드를 통해 수정되면 LogBox가 자동으로 닫힙니다.

### 콘솔 오류 및 경고

콘솔 오류와 경고는 빨간색 또는 노란색 배지와 함께 화면 알림으로 표시됩니다.

- **오류**는 알림 횟수와 함께 표시됩니다. 알림을 탭하면 확장된 보기와 다른 로그를 페이지로 넘겨볼 수 있습니다.
- **경고**는 세부 내용 없이 알림 배너만 표시되며, React Native DevTools를 열도록 안내합니다.

React Native DevTools가 열려 있으면 치명적 오류를 제외한 모든 오류가 LogBox에서 숨겨집니다. 특정 로그를 숨기거나 수준을 조정하는 다양한 LogBox 옵션이 있으므로, 신뢰할 수 있는 정보 소스로 React Native DevTools 내의 Console 패널을 사용하는 것을 권장합니다.

<details>
<summary>**💡 로그 무시하기**</summary>

LogBox는 `LogBox` API를 통해 설정할 수 있습니다.

```js
import {LogBox} from 'react-native';
```

#### 모든 로그 무시하기

`LogBox.ignoreAllLogs()`를 사용하면 LogBox 알림을 비활성화할 수 있습니다. 제품 데모 등의 상황에서 유용합니다.

```js
LogBox.ignoreAllLogs();
```

#### 특정 로그 무시하기

`LogBox.ignoreLogs()`를 사용하면 로그별로 알림을 비활성화할 수 있습니다. 서드파티 종속성 등에서 수정할 수 없는 노이즈성 경고에 유용합니다.

```js
LogBox.ignoreLogs([
  // Exact message
  'Warning: componentWillReceiveProps has been renamed',

  // Substring or regex match
  /GraphQL error: .*/,
]);
```

:::note

LogBox는 React의 특정 오류를 경고로 처리하므로, 인앱 오류 알림으로 표시되지 않을 수 있습니다. 고급 사용자는 [`LogBoxData.setWarningFilter()`](https://github.com/facebook/react-native/blob/d334f4d77eea538dff87fdcf2ebc090246cfdbb0/packages/react-native/Libraries/LogBox/Data/LogBoxData.js#L338)를 사용하여 LogBox의 경고 필터를 커스터마이징함으로써 이 동작을 변경할 수 있습니다.

:::

</details>

## 성능 모니터

Android와 iOS에서는 Dev Menu에서 **"Perf Monitor"**를 선택하여 개발 중에 인앱 성능 오버레이를 토글할 수 있습니다. 이 기능에 대한 자세한 내용은 [여기](/docs/performance)를 참고하세요.

![The Performance Monitor overlay on iOS and Android](/docs/assets/debugging-performance-monitor.jpg)

:::info
성능 모니터는 앱 내에서 실행되며 참고용 지표입니다. 정확한 성능 측정을 위해서는 Android Studio와 Xcode의 네이티브 도구를 사용하는 것을 권장합니다.
:::
