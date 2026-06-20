---
id: react-native-devtools
title: React Native DevTools
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native DevTools는 React Native를 위한 현대적인 디버깅 환경입니다. 처음부터 목적에 맞게 설계되었으며, 기존 디버깅 방법보다 근본적으로 더 통합적이고, 정확하며, 신뢰할 수 있도록 설계되었습니다.

![React Native DevTools가 "Welcome" 패널을 열어 보여주는 화면](/docs/assets/debugging-rndt-welcome-083.jpg)

React Native DevTools는 React 앱 관련 문제를 디버깅하기 위한 도구이며, 네이티브 도구를 대체하는 것이 아닙니다. React Native의 기반 플랫폼 레이어(예: Native Module 개발 중)를 검사하고 싶다면, Android Studio 및 Xcode에서 제공하는 디버깅 도구를 사용하세요([네이티브 코드 디버깅](/docs/debugging-native-code) 참고).

<details>
<summary>**💡 호환성** — 0.76에서 출시</summary>

React Native DevTools는 Hermes를 실행하는 모든 React Native 앱을 지원합니다. 이전의 Flipper, Experimental Debugger, Hermes debugger(Chrome) 프론트엔드를 대체합니다.

이전 버전의 React Native에서는 React Native DevTools를 설정할 수 없습니다.

- **Chrome Browser DevTools — 지원되지 않음**
  - `chrome://inspect`를 통한 React Native 연결은 더 이상 지원되지 않습니다. 최신 버전의 Chrome DevTools(최신 브라우저 기능 및 API에 맞춰 제작됨)는 테스트되지 않았으며, 이 프론트엔드에는 당사의 커스터마이징이 포함되지 않아 기능이 올바르게 작동하지 않을 수 있습니다. 대신, React Native DevTools와 함께 지원되는 버전을 제공합니다.
- **Visual Studio Code — 지원되지 않음** (기존과 동일)
  - [Expo Tools](https://github.com/expo/vscode-expo) 및 [Radon IDE](https://ide.swmansion.com/)와 같은 서드파티 확장 프로그램은 호환성이 개선되었을 수 있지만, React 팀이 직접 지원하지는 않습니다.

</details>
<details>
<summary>**💡 피드백 & FAQ**</summary>

모든 플랫폼에서 React를 디버깅하는 데 사용하는 도구가 신뢰할 수 있고, 친숙하며, 간단하고, 일관성이 있기를 바랍니다. 이 페이지에 설명된 모든 기능은 이러한 원칙을 바탕으로 구축되었으며, 앞으로 더 많은 기능을 제공하고자 합니다.

React Native DevTools의 미래를 적극적으로 발전시켜 나가고 있으며, 문제, 자주 묻는 질문, 피드백을 추적하기 위한 중앙화된 [GitHub 토론](https://github.com/react-native-community/discussions-and-proposals/discussions/819)을 개설했습니다.

</details>

## 핵심 기능

React Native DevTools는 Chrome DevTools 프론트엔드를 기반으로 합니다. 웹 개발 경험이 있다면 기능들이 익숙하게 느껴질 것입니다. 시작점으로, 전체 가이드와 동영상 리소스가 포함된 [Chrome DevTools 문서](https://developer.chrome.com/docs/devtools)를 살펴보는 것을 권장합니다.

### Console

![React Native DevTools Sources 뷰에 로그 시리즈가 표시되고 옆에 기기가 있는 화면](/docs/assets/debugging-rndt-console.jpg)

Console 패널에서는 메시지를 보고 필터링하고, JavaScript를 실행하며, 객체 속성을 검사하는 등의 작업을 할 수 있습니다.

[Console features reference | Chrome DevTools](https://developer.chrome.com/docs/devtools/console/reference)

#### 유용한 팁

- 앱에 로그가 많은 경우, 필터 박스를 사용하거나 표시할 로그 수준을 변경하세요.
- [Live Expressions](https://developer.chrome.com/docs/devtools/console/live-expressions)로 시간에 따라 값을 모니터링하세요.
- [Preserve Logs](https://developer.chrome.com/docs/devtools/console/reference#persist)로 리로드 후에도 메시지를 유지하세요.
- <kbd>Ctrl</kbd> + <kbd>L</kbd>을 사용해 콘솔 뷰를 지우세요.

### Sources와 브레이크포인트

![React Native DevTools Sources 뷰에서 브레이크포인트가 일시 중지된 화면과 옆에 기기가 있는 모습](/docs/assets/debugging-rndt-sources-paused-with-device.jpg)

Sources 패널에서는 앱의 소스 파일을 보고 브레이크포인트를 설정할 수 있습니다. 브레이크포인트를 사용하여 앱이 일시 중지될 코드 줄을 정의하면, 프로그램의 현재 상태를 검사하고 코드를 단계별로 실행할 수 있습니다.

[Pause your code with breakpoints | Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/breakpoints)

:::tip

#### 미니 가이드

브레이크포인트는 디버깅 도구킷의 핵심 도구입니다!

1. 사이드바 또는 <kbd>Cmd ⌘</kbd>+<kbd>P</kbd> / <kbd>Ctrl</kbd>+<kbd>P</kbd>를 사용하여 소스 파일로 이동하세요.
2. 코드 줄 옆의 줄 번호 열을 클릭하여 브레이크포인트를 추가하세요.
3. 일시 중지된 상태에서 오른쪽 상단의 탐색 컨트롤을 사용하여 [코드를 단계별로 실행](https://developer.chrome.com/docs/devtools/javascript/reference#stepping)하세요.

:::

#### 유용한 팁

- 앱이 일시 중지되면 "Paused in Debugger" 오버레이가 표시됩니다. 탭하여 재개하세요.
- 브레이크포인트에서 현재 스코프와 콜 스택을 검사하고 watch 표현식을 설정할 수 있는 오른쪽 패널에 주의하세요.
- `debugger;` 구문을 사용하면 텍스트 에디터에서 브레이크포인트를 빠르게 설정할 수 있습니다. Fast Refresh를 통해 즉시 기기에 반영됩니다.
- 브레이크포인트에는 여러 종류가 있습니다! 예를 들어, [Conditional Breakpoints 및 Logpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints#overview)가 있습니다.

### Network <div className="label primary">0.83부터</div>

![React Native DevTools Network 패널의 네트워크 요청 화면](/docs/assets/debugging-rndt-network.jpg)

Network 패널에서는 앱이 수행하는 네트워크 요청을 보고 검사할 수 있습니다. 기록된 요청은 타이밍, 송수신 헤더, 응답 미리보기 등 상세한 메타데이터를 제공합니다.

DevTools가 열려 있으면 네트워크 요청이 자동으로 기록됩니다. 일부 예외를 제외하고 Chrome의 대부분 기능을 지원합니다. 아래에서 자세한 내용을 확인하세요.

<details>
<summary><strong>💡 네트워크 이벤트 범위, Expo 지원</strong></summary>

**어떤 네트워크 이벤트가 캡처됩니까?**

현재 `fetch()`, `XMLHttpRequest`, `<Image>`를 통한 모든 네트워크 호출을 기록하며, Expo Fetch와 같은 커스텀 네트워킹 라이브러리 지원은 이후 버전에서 제공될 예정입니다.

**Expo 네트워크 차이점**

이 때문에 Expo를 사용하는 앱은 계속해서 "Expo Network" 패널을 보게 됩니다. 이는 Expo 프레임워크의 별도 구현으로, 추가적인 요청 소스를 기록하지만 일부 기능이 축소되어 있습니다.

- Expo 특정 네트워크 이벤트 범위 포함.
- 요청 initiator 지원 없음.
- Performance 패널 통합 없음.

향후 릴리스에서 Expo Fetch 및 서드파티 네트워킹 라이브러리를 새로운 네트워크 검사 파이프라인과 통합하기 위해 Expo와 협력 중입니다.

**미구현 기능**

출시 시점에 React Native에서 아직 지원하지 않는 기능은 다음과 같습니다:

- WebSocket 이벤트
- 네트워크 응답 모킹
- 시뮬레이션된 네트워크 스로틀링

</details>

<details>
<summary><strong>💡 응답 미리보기 버퍼 크기</strong></summary>

대량의 응답 데이터를 검사하는 경우, 응답 미리보기는 최대 100MB 크기의 기기 내 버퍼에 캐시된다는 점을 유의하세요. 즉, 캐시가 너무 커지면 가장 오래된 요청부터 응답 미리보기(메타데이터는 제외)가 삭제될 수 있습니다.

</details>

#### 유용한 팁

- Initiator 탭을 사용하여 앱에서 네트워크 요청이 시작된 위치의 콜 스택을 확인하세요.
- 네트워크 이벤트는 Performance 패널의 Network 트랙에도 표시됩니다.

### Performance <div className="label primary">0.83부터</div>

![React Native DevTools Performance 패널의 성능 추적 화면](/docs/assets/debugging-rndt-performance.jpg)

성능 추적을 사용하면 앱 내에서 성능 세션을 기록하여 JavaScript 코드가 어떻게 실행되고 어떤 작업에 시간이 가장 많이 소요되는지 파악할 수 있습니다. React Native에서는 JavaScript 실행, React Performance 트랙, 네트워크 이벤트, 커스텀 [User Timings](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/User_timing)을 단일 성능 타임라인에 렌더링하여 보여줍니다.

#### 유용한 팁

- [Annotations](https://developer.chrome.com/docs/devtools/performance/annotations)(shift-드래그)를 사용하여 성능 추적에 레이블을 붙이고 표시하세요 — 팀원과 [다운로드 및 공유](https://developer.chrome.com/docs/devtools/performance/save-trace)하기 전에 유용합니다. Annotations는 시간 범위를 **초** 단위로 빠르게 파악하는 방법도 제공합니다.
- 앱에서 [`PerformanceObserver` API](./global-PerformanceObserver.md)를 사용하여 런타임에 성능 이벤트를 관찰하세요 — 성능 텔레메트리를 캡처하고 싶을 때 유용합니다.

#### 더 알아보기

- [React Performance tracks](https://react.dev/reference/dev-tools/react-performance-tracks)
- [Performance APIs > User Timings | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/User_timing)
- ["Debug Like a Senior — React Native Performance Panel" | Software Mansion](https://blog.swmansion.com/react-native-debugging-new-performance-panel-in-react-native-0-83-21ca90871f6d)

### Memory

![Memory 패널에서 힙 스냅샷을 검사하는 화면](/docs/assets/debugging-rndt-memory.jpg)

Memory 패널에서는 힙 스냅샷을 찍고 시간에 따른 JavaScript 코드의 메모리 사용량을 볼 수 있습니다.

[Record heap snapshots | Chrome DevTools](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots)

#### 유용한 팁

- <kbd>Cmd ⌘</kbd>+<kbd>F</kbd> / <kbd>Ctrl</kbd>+<kbd>F</kbd>를 사용하여 힙에서 특정 객체를 필터링하세요.
- [allocation timeline report](https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler)를 작성하면 시간에 따른 메모리 사용량을 그래프로 보고 가능한 메모리 누수를 파악하는 데 유용합니다.

## React DevTools 기능

통합된 Components 및 Profiler 패널에서 [React DevTools](https://react.dev/learn/react-developer-tools) 브라우저 확장 프로그램의 모든 기능을 사용할 수 있습니다. 이 기능들은 React Native DevTools에서 원활하게 작동합니다.

### React Components

![React Components 패널을 사용하여 엘리먼트를 선택하고 찾는 화면](/docs/assets/debugging-rndt-react-components.gif)

React Components 패널에서는 렌더링된 React 컴포넌트 트리를 검사하고 업데이트할 수 있습니다.

- DevTools에서 엘리먼트를 호버하거나 선택하면 기기에서 해당 항목이 강조 표시됩니다.
- DevTools에서 엘리먼트를 찾으려면, 왼쪽 상단의 "Select element" 버튼을 클릭한 다음 앱에서 임의의 엘리먼트를 탭하세요.

#### 유용한 팁

- 컴포넌트의 props와 state는 오른쪽 패널에서 런타임에 보고 수정할 수 있습니다.
- [React Compiler](https://react.dev/learn/react-compiler)로 최적화된 컴포넌트에는 "Memo ✨" 배지가 표시됩니다.

:::tip

#### 프로팁: 리렌더링 강조 표시

리렌더링은 React 앱에서 성능 문제의 주요 원인이 될 수 있습니다. DevTools는 컴포넌트 리렌더링이 발생하면 이를 강조 표시할 수 있습니다.

- 활성화하려면, View Settings(`⚙︎`) 아이콘을 클릭하고 "Highlight updates when components render"를 체크하세요.

![라이브 렌더 오버레이 녹화 옆에 표시된 "highlight updates" 설정 위치](/docs/assets/debugging-rndt-highlight-renders.gif)

:::

### React Profiler

![플레임 그래프로 렌더링된 프로파일 화면](/docs/assets/debugging-rndt-react-profiler.jpg)

React Profiler 패널에서는 성능 프로파일을 기록하여 컴포넌트 렌더링 타이밍과 React 커밋을 파악할 수 있습니다.

자세한 내용은 [2018년 원본 가이드](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html#reading-performance-data)를 참조하세요(일부 내용이 구버전일 수 있습니다).

## DevTools 재연결

가끔 DevTools가 대상 기기에서 연결이 끊어질 수 있습니다. 이는 다음과 같은 경우에 발생할 수 있습니다:

- 앱이 종료된 경우.
- 앱이 재빌드된 경우(새 네이티브 빌드가 설치됨).
- 앱이 네이티브 측에서 충돌한 경우.
- dev 서버(Metro)가 종료된 경우.
- 물리적 기기가 연결 해제된 경우.

연결이 끊어지면 "Debugging connection was closed"라는 메시지와 함께 대화상자가 표시됩니다.

![기기 연결이 끊어졌을 때 표시되는 재연결 대화상자](/docs/assets/debugging-reconnect-menu.jpg)

여기서 다음 중 하나를 선택할 수 있습니다:

- **닫기**: 닫기(`×`) 아이콘을 선택하거나 대화상자 외부를 클릭하면 연결이 끊어지기 전 마지막 상태의 DevTools UI로 돌아갑니다.
- **재연결**: 연결 끊김의 원인을 해결한 후 "Reconnect DevTools"를 선택하세요.
