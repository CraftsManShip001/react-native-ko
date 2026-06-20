---
id: other-debugging-methods
title: 기타 디버깅 방법
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

이 페이지는 레거시 JavaScript 디버깅 방법의 사용법을 다룹니다. 새로운 React Native 또는 Expo 앱을 시작하는 경우, [React Native DevTools](./react-native-devtools)를 사용하는 것을 권장합니다.

## Safari 개발자 도구 (직접 JSC 디버깅)

앱의 런타임으로 [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore)(JSC)를 사용할 때, Safari를 이용해 iOS 버전의 앱을 디버깅할 수 있습니다.

1. **실제 기기 전용**: 설정 앱을 열고 Safari > 고급으로 이동하여 "웹 인스펙터"가 켜져 있는지 확인하세요.
2. Mac에서 Safari를 열고 개발자 메뉴를 활성화하세요. Safari > 설정...에서 고급 탭을 선택한 다음 "웹 개발자용 기능 보기"를 선택하면 됩니다.
3. 개발자 메뉴에서 기기를 찾고 하위 메뉴에서 "JSContext" 항목을 선택하세요. 그러면 Chrome DevTools와 유사한 콘솔 및 소스 패널이 포함된 Safari의 웹 인스펙터가 열립니다.

![Safari 웹 인스펙터 열기](/docs/assets/debugging-safari-developer-tools.jpg)

:::tip
소스 맵이 기본적으로 활성화되어 있지 않을 수 있지만, [이 가이드](https://blog.nparashuram.com/2019/10/debugging-react-native-ios-apps-with.html) 또는 [동영상](https://www.youtube.com/watch?v=GrGqIIz51k4)을 참고하여 소스 맵을 활성화하고 소스 코드의 올바른 위치에 중단점을 설정할 수 있습니다.
:::

:::tip
앱을 다시 로드할 때마다 새로운 JSContext가 생성됩니다. "JSContext에 대한 웹 인스펙터 자동 표시"를 선택하면 매번 최신 JSContext를 수동으로 선택하지 않아도 됩니다.
:::

## Remote JavaScript Debugging (제거됨)

:::warning Important
Remote JavaScript Debugging은 React Native 0.79부터 제거되었습니다. 원래의 [deprecated 공지](https://github.com/react-native-community/discussions-and-proposals/discussions/734)를 참고하세요.

이전 버전의 React Native를 사용 중이라면 [해당 버전의 문서](/versions)를 참고하세요.
:::

![Chrome의 원격 디버거 창](/docs/assets/debugging-chrome-remote-debugger.jpg)
