---
id: profiling
title: Profiling
---

프로파일링은 앱의 성능, 리소스 사용량 및 동작을 분석하여 잠재적인 병목 현상이나 비효율성을 파악하는 과정입니다. 다양한 기기와 조건에서 앱이 원활하게 동작하도록 프로파일링 도구를 활용하는 것이 좋습니다.

iOS의 경우 Instruments가 매우 유용한 도구이며, Android의 경우 [Android Studio Profiler](profiling.md#system-tracing을-활용한-android-ui-성능-프로파일링)를 배우고 사용해야 합니다.

하지만 먼저, [**개발 모드가 꺼져 있는지 확인하세요!**](performance.md#개발-모드에서-실행-devtrue)

## System Tracing을 활용한 Android UI 성능 프로파일링

Android는 10,000개 이상의 다양한 기기를 지원하며 소프트웨어 렌더링을 지원하도록 일반화되어 있습니다. 프레임워크 아키텍처와 다양한 하드웨어 대상에 대한 범용화 필요성 때문에 안타깝게도 iOS에 비해 기본으로 제공되는 것이 적습니다. 하지만 때로는 개선할 수 있는 부분이 있으며, 많은 경우 네이티브 코드의 문제가 아닙니다!

이 버벅거림을 디버깅하는 첫 번째 단계는 각 16ms 프레임 동안 어디서 시간이 소비되는지 파악하는 것입니다. 이를 위해 [Android Studio의 내장 System Tracing 프로파일러](https://developer.android.com/studio/profile)를 사용합니다.

:::note
독립 실행형 `systrace` 도구는 Android platform-tools에서 제거되었습니다. 대신 Android Studio Profiler를 사용하세요. 더 나은 사용자 인터페이스로 동일한 기능을 제공합니다.
:::

### 1. 트레이스 수집

먼저 조사하려는 버벅거림이 발생하는 기기를 USB로 컴퓨터에 연결합니다. Android Studio에서 프로젝트의 `android` 폴더를 열고, 오른쪽 상단 패널에서 기기를 선택한 후 [프로파일 가능한 형태로 프로젝트를 실행](https://developer.android.com/studio/profile#build-and-run)합니다.

앱이 프로파일 가능한 형태로 빌드되어 기기에서 실행되면, 프로파일링하려는 탐색/애니메이션 직전 지점으로 이동하고 Android Studio Profiler 패널에서 ["Capture System Activities" 작업](https://developer.android.com/studio/profile#start-profiling)을 시작합니다.

트레이스 수집이 시작되면 원하는 애니메이션이나 상호작용을 수행합니다. 그런 다음 "Stop recording"을 누릅니다. 이제 [Android Studio에서 직접 트레이스를 검사](https://developer.android.com/studio/profile/jank-detection)할 수 있습니다. 또는 "Past Recordings" 패널에서 선택하고, "Export recording"을 누른 후 [Perfetto](https://perfetto.dev/)와 같은 도구에서 열 수 있습니다.

### 2. 트레이스 읽기

Android Studio 또는 Perfetto에서 트레이스를 열면 다음과 같은 화면을 볼 수 있습니다:

![예시](/docs/assets/SystraceExample.png)

:::note[힌트]
WASD 키를 사용하여 이동하고 확대/축소하세요.
:::

실제 UI는 다를 수 있지만, 아래 지침은 사용 도구에 관계없이 적용됩니다.

:::info[VSync 하이라이팅 활성화]
화면 오른쪽 상단의 이 체크박스를 선택하면 16ms 프레임 경계를 강조 표시합니다:

![VSync 하이라이팅 활성화](/docs/assets/SystraceHighlightVSync.png)

위 스크린샷처럼 얼룩말 무늬가 보여야 합니다. 보이지 않으면 다른 기기에서 프로파일링을 시도해 보세요. Samsung은 vsync 표시에 문제가 있는 것으로 알려져 있으며, Nexus 시리즈는 일반적으로 안정적입니다.
:::

### 3. 프로세스 찾기

패키지 이름의 (일부)가 보일 때까지 스크롤합니다. 이 경우 `com.facebook.adsmanager`를 프로파일링했는데, 커널의 스레드 이름 제한으로 인해 `book.adsmanager`로 표시됩니다.

왼쪽에는 오른쪽의 타임라인 행에 해당하는 스레드 집합이 표시됩니다. 우리 목적에서 중요한 스레드는 UI 스레드(패키지 이름 또는 UI Thread라는 이름을 가짐), `mqt_js`, `mqt_native_modules`입니다. Android 5 이상을 실행 중이라면 Render Thread도 중요합니다.

- **UI Thread.** 여기서 표준 Android measure/layout/draw가 발생합니다. 오른쪽의 스레드 이름은 패키지 이름(이 경우 book.adsmanager) 또는 UI Thread입니다. 이 스레드에서 보이는 이벤트는 `Choreographer`, `traversals`, `DispatchUI`와 관련된 다음과 같은 형태여야 합니다:

  ![UI Thread 예시](/docs/assets/SystraceUIThreadExample.png)

- **JS Thread.** 여기서 JavaScript가 실행됩니다. 스레드 이름은 기기의 커널 협력도에 따라 `mqt_js` 또는 `<...>`입니다. 이름이 없는 경우 `JSCall`, `Bridge.executeJSCall` 등을 찾아보세요:

  ![JS Thread 예시](/docs/assets/SystraceJSThreadExample.png)

- **Native Modules Thread.** 여기서 네이티브 모듈 호출(예: `UIManager`)이 실행됩니다. 스레드 이름은 `mqt_native_modules` 또는 `<...>`입니다. 이름이 없는 경우 `NativeCall`, `callJavaModuleMethod`, `onBatchComplete` 등을 찾아보세요:

  ![Native Modules Thread 예시](/docs/assets/SystraceNativeModulesThreadExample.png)

- **보너스: Render Thread.** Android L (5.0) 이상을 사용 중이라면 애플리케이션에 렌더 스레드도 있습니다. 이 스레드는 UI를 그리는 데 사용되는 실제 OpenGL 명령을 생성합니다. 스레드 이름은 `RenderThread` 또는 `<...>`입니다. 이름이 없는 경우 `DrawFrame` 및 `queueBuffer` 등을 찾아보세요:

  ![Render Thread 예시](/docs/assets/SystraceRenderThreadExample.png)

## 원인 파악

부드러운 애니메이션은 다음과 같이 보여야 합니다:

![부드러운 애니메이션](/docs/assets/SystraceWellBehaved.png)

각 색상 변화는 프레임입니다 — 프레임을 표시하려면 모든 UI 작업이 해당 16ms 기간이 끝나기 전에 완료되어야 합니다. 어떤 스레드도 프레임 경계 가까이에서 작업하지 않고 있다는 점에 주목하세요. 이렇게 렌더링되는 앱은 60 FPS로 렌더링되고 있습니다.

그러나 끊김을 발견했다면 다음과 같은 모습일 수 있습니다:

![JS로 인한 끊기는 애니메이션](/docs/assets/SystraceBadJS.png)

JS 스레드가 거의 항상 실행 중이며 프레임 경계를 넘고 있다는 점에 주목하세요! 이 앱은 60 FPS로 렌더링되지 않습니다. 이 경우 **문제는 JS에 있습니다**.

다음과 같은 모습도 볼 수 있습니다:

![UI로 인한 끊기는 애니메이션](/docs/assets/SystraceBadUI.png)

이 경우 UI 스레드와 렌더 스레드가 프레임 경계를 넘는 작업을 하고 있습니다. 각 프레임에서 렌더링하려는 UI에 너무 많은 작업이 필요합니다. 이 경우 **문제는 렌더링 중인 네이티브 뷰에 있습니다**.

이 시점에서 다음 단계를 알려줄 매우 유용한 정보를 얻었습니다.

## JavaScript 문제 해결

JS 문제를 파악했다면, 실행 중인 특정 JS에서 단서를 찾아보세요. 위 시나리오에서는 `RCTEventEmitter`가 프레임당 여러 번 호출되는 것을 볼 수 있습니다. 위 트레이스에서 JS 스레드를 확대하면 다음과 같습니다:

![과도한 JS](/docs/assets/SystraceBadJS2.png)

이상해 보입니다. 왜 이렇게 자주 호출될까요? 실제로 다른 이벤트들인가요? 이 질문들에 대한 답변은 아마 프로덕트 코드에 따라 달라질 것입니다. 그리고 많은 경우 [shouldComponentUpdate](https://react.dev/reference/react/Component#shouldcomponentupdate)를 살펴보고 싶을 것입니다.

## 네이티브 UI 문제 해결

네이티브 UI 문제를 파악했다면, 일반적으로 두 가지 시나리오가 있습니다:

1. 각 프레임에서 그리려는 UI가 GPU에서 너무 많은 작업을 요구하거나,
2. 애니메이션/상호작용 중에 새로운 UI를 생성하는 경우(예: 스크롤 중 새 콘텐츠 로드).

### GPU 작업 과부하

첫 번째 시나리오에서는 UI 스레드 및/또는 Render Thread가 다음과 같이 보이는 트레이스를 볼 수 있습니다:

![GPU 과부하](/docs/assets/SystraceBadUI.png)

프레임 경계를 넘는 `DrawFrame`에서 긴 시간이 소비되고 있다는 점에 주목하세요. 이는 GPU가 이전 프레임의 명령 버퍼를 비우기를 기다리는 데 소비되는 시간입니다.

이를 완화하려면 다음을 수행해야 합니다:

- 애니메이션/변환되는 복잡하고 정적인 콘텐츠(예: `Navigator` 슬라이드/알파 애니메이션)에 `renderToHardwareTextureAndroid` 사용을 검토합니다.
- 기본적으로 비활성화되어 있는 `needsOffscreenAlphaCompositing`을 사용하지 않도록 합니다. 대부분의 경우 프레임당 GPU 부하를 크게 증가시킵니다.

### UI 스레드에서 새 뷰 생성

두 번째 시나리오에서는 다음과 같은 모습을 볼 수 있습니다:

![뷰 생성](/docs/assets/SystraceBadCreateUI.png)

JS 스레드가 잠시 생각한 후 네이티브 모듈 스레드에서 일부 작업이 이루어지고, 그 뒤에 UI 스레드에서 비용이 많이 드는 순회가 발생하는 것을 확인하세요.

상호작용 후까지 새 UI 생성을 미루거나 생성 중인 UI를 단순화할 수 없다면, 이를 빠르게 완화할 방법이 없습니다. React Native 팀은 새 UI를 메인 스레드가 아닌 다른 스레드에서 생성하고 구성할 수 있도록 하는 인프라 수준의 해결책을 작업 중이며, 이를 통해 상호작용이 원활하게 계속될 수 있도록 할 것입니다.

### 네이티브 CPU 핫스팟 찾기

문제가 네이티브 쪽에 있는 것으로 보인다면, [CPU 핫스팟 프로파일러](https://developer.android.com/studio/profile/record-java-kotlin-methods)를 사용하여 어떤 일이 일어나고 있는지 자세한 정보를 얻을 수 있습니다. Android Studio Profiler 패널을 열고 "Find CPU Hotspots (Java/Kotlin Method Recording)"을 선택합니다.

:::info[Java/Kotlin 녹화 선택]

"Find CPU Hotspots **(Callstack Sample)**"이 아닌 "Find CPU Hotspots **(Java/Kotlin Recording)**"을 선택해야 합니다. 아이콘이 비슷하지만 동작이 다릅니다.
:::

상호작용을 수행하고 "Stop recording"을 누릅니다. 녹화는 리소스를 많이 사용하므로 상호작용을 짧게 유지하세요. 그런 다음 Android Studio에서 결과 트레이스를 검사하거나 내보내어 [Firefox Profiler](https://profiler.firefox.com/)와 같은 온라인 도구에서 열 수 있습니다.

System Trace와 달리 CPU 핫스팟 프로파일링은 느려서 정확한 측정치를 제공하지 않습니다. 그러나 어떤 네이티브 메서드가 호출되고 있는지, 그리고 각 프레임에서 비례적으로 어디서 시간이 소비되는지 파악하는 데 도움이 됩니다.
