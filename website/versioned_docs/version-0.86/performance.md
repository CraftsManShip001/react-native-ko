---
id: performance
title: 성능 개요
---

React Native를 WebView 기반 도구 대신 사용하는 중요한 이유 중 하나는 초당 최소 60 프레임을 달성하고 앱에 네이티브 느낌을 제공하기 위해서입니다. 가능한 경우, React Native가 최적화를 자동으로 처리하여 성능에 대한 걱정 없이 앱 개발에 집중할 수 있도록 합니다. 하지만 아직 그 수준에 도달하지 못한 영역도 있고, React Native(네이티브 코드를 직접 작성하는 경우와 마찬가지로)가 최적의 최적화 방법을 결정할 수 없는 영역도 있습니다. 이런 경우에는 수동 개입이 필요합니다. 우리는 기본적으로 부드러운 UI 성능을 제공하기 위해 노력하지만, 그것이 불가능한 경우도 있을 수 있습니다.

이 가이드는 [성능 문제를 해결](profiling.md)하는 데 도움이 되는 기본 사항을 가르치고, [일반적인 문제의 원인과 제안된 해결책](performance.md#일반적인-성능-문제의-원인)을 논의하기 위한 것입니다.

## 프레임에 대해 알아야 할 것

우리 조부모 세대가 영화를 ["움직이는 사진"](https://www.youtube.com/watch?v=F1i40rnpOsA)이라고 부른 이유가 있습니다. 비디오의 사실적인 움직임은 일정한 속도로 정적인 이미지를 빠르게 변경함으로써 만들어지는 환상입니다. 이 각각의 이미지를 프레임이라고 합니다. 초당 표시되는 프레임 수는 비디오(또는 사용자 인터페이스)가 얼마나 부드럽고 실감나게 보이는지에 직접적인 영향을 미칩니다. iOS 및 Android 기기는 초당 최소 60 프레임을 표시하므로, 해당 간격 동안 사용자가 화면에서 볼 정적 이미지(프레임)를 생성하는 데 필요한 모든 작업을 수행하는 데 최대 16.67ms가 주어집니다. 할당된 시간 내에 해당 프레임을 생성하는 데 필요한 작업을 완료하지 못하면 "프레임을 드롭"하게 되고 UI가 응답하지 않는 것처럼 보입니다.

이제 앱에서 [개발자 메뉴](debugging.md#dev-menu-열기)를 열고 `Show Perf Monitor`를 토글해 보세요. 두 가지 다른 프레임 레이트가 있음을 알 수 있습니다.

![성능 모니터 스크린샷](/docs/assets/PerfUtil.png)

### JS 프레임 레이트 (JavaScript 스레드)

대부분의 React Native 애플리케이션에서 비즈니스 로직은 JavaScript 스레드에서 실행됩니다. 이곳에 React 애플리케이션이 존재하고, API 호출이 이루어지며, 터치 이벤트가 처리됩니다. 네이티브 뷰에 대한 업데이트는 배치 처리되어 이벤트 루프의 각 반복 끝에 프레임 마감 전에(모든 것이 잘 진행된다면) 네이티브 측으로 전송됩니다. JavaScript 스레드가 한 프레임 동안 응답하지 않으면 드롭된 프레임으로 간주됩니다. 예를 들어, 복잡한 애플리케이션의 루트 컴포넌트에 새로운 state를 설정하고 계산 비용이 많이 드는 컴포넌트 서브트리를 다시 렌더링하게 되면, 이 과정이 200ms가 걸리고 12개의 프레임이 드롭될 수 있습니다. JavaScript가 제어하는 모든 애니메이션은 그 동안 멈추는 것처럼 보입니다. 충분히 많은 프레임이 드롭되면 사용자가 이를 느끼게 됩니다.

예를 들어 터치에 응답하는 경우: JavaScript 스레드에서 여러 프레임에 걸쳐 작업을 수행하고 있다면 `TouchableOpacity`에 응답하는 데 지연이 있을 수 있습니다. 이는 JavaScript 스레드가 바빠서 메인 스레드에서 전송된 원시 터치 이벤트를 처리할 수 없기 때문입니다. 결과적으로 `TouchableOpacity`는 터치 이벤트에 반응하여 네이티브 뷰에 불투명도 조정을 명령할 수 없습니다.

### UI 프레임 레이트 (메인 스레드)

네이티브 스택 내비게이터(예: React Navigation이 제공하는 [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator))의 성능이 JavaScript 기반 스택 내비게이터보다 기본적으로 더 좋다는 것을 눈치챘을 것입니다. 전환 애니메이션이 네이티브 메인 UI 스레드에서 실행되기 때문에 JavaScript 스레드의 프레임 드롭에 영향을 받지 않습니다.

마찬가지로, JavaScript 스레드가 잠겨 있을 때도 `ScrollView`가 메인 스레드에서 동작하기 때문에 `ScrollView`를 통해 위아래로 스크롤할 수 있습니다. 스크롤 이벤트는 JS 스레드로 전달되지만, 스크롤이 발생하는 데 이를 받을 필요는 없습니다.

## 일반적인 성능 문제의 원인

### 개발 모드에서 실행 (`dev=true`)

개발 모드에서 실행할 때 JavaScript 스레드 성능이 크게 저하됩니다. 이는 불가피한 일입니다. 좋은 경고와 오류 메시지를 제공하기 위해 런타임에 훨씬 더 많은 작업이 필요합니다. 항상 [릴리즈 빌드](running-on-device.md#프로덕션용-앱-빌드하기)에서 성능을 테스트하세요.

### `console.log` 문 사용

번들된 앱을 실행할 때 이러한 문은 JavaScript 스레드에서 큰 병목 현상을 일으킬 수 있습니다. 여기에는 [redux-logger](https://github.com/evgenyrodionov/redux-logger)와 같은 디버깅 라이브러리의 호출도 포함되므로 번들링 전에 이를 제거하세요. 또한 모든 `console.*` 호출을 제거하는 이 [babel 플러그인](https://babeljs.io/docs/plugins/transform-remove-console/)을 사용할 수 있습니다. 먼저 `npm i babel-plugin-transform-remove-console --save-dev`로 설치한 다음, 프로젝트 디렉토리의 `.babelrc` 파일을 다음과 같이 수정하세요.

```json
{
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    }
  }
}
```

이렇게 하면 프로젝트의 릴리즈(프로덕션) 버전에서 모든 `console.*` 호출이 자동으로 제거됩니다.

프로젝트에 `console.*` 호출이 없더라도 플러그인을 사용하는 것을 권장합니다. 서드파티 라이브러리도 이를 호출할 수 있습니다.

### `FlatList` 렌더링이 너무 느리거나 대용량 목록의 스크롤 성능이 좋지 않은 경우

[`FlatList`](flatlist.md)가 느리게 렌더링된다면, 렌더링된 항목의 측정을 건너뜀으로써 렌더링 속도를 최적화하는 [`getItemLayout`](flatlist.md#getitemlayout)을 구현했는지 확인하세요.

성능에 최적화된 다른 서드파티 목록 라이브러리도 있습니다. [FlashList](https://github.com/shopify/flash-list)와 [Legend List](https://github.com/legendapp/legend-list)가 있습니다.

### JavaScript 스레드에서 동시에 많은 작업을 수행하여 JS 스레드 FPS가 하락하는 경우

"내비게이터 전환이 느린 현상"이 가장 흔한 증상이지만 다른 경우에도 발생할 수 있습니다. [`InteractionManager`](interactionmanager.md)를 사용하는 것이 좋은 방법일 수 있지만, 애니메이션 도중 작업을 지연하는 데 드는 사용자 경험 비용이 너무 높다면 [`LayoutAnimation`](layoutanimation.md)을 고려해 볼 수 있습니다.

[`Animated API`](animated.md)는 현재 [useNativeDriver: true를 설정](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated#how-do-i-use-this-in-my-app)하지 않는 한 JavaScript 스레드에서 각 키프레임을 필요에 따라 계산하는 반면, [`LayoutAnimation`](layoutanimation.md)은 Core Animation을 활용하여 JS 스레드와 메인 스레드의 프레임 드롭에 영향을 받지 않습니다.

이를 사용하는 한 가지 경우는 모달을 애니메이션화하는 경우입니다(위에서 아래로 슬라이드하고 반투명 오버레이를 페이드인하면서) 여러 네트워크 요청을 초기화하고 응답을 받고, 모달의 내용을 렌더링하고, 모달이 열린 뷰를 업데이트하는 경우입니다. `LayoutAnimation` 사용 방법에 대한 자세한 내용은 [애니메이션 가이드](animations.md)를 참고하세요.

**주의 사항:**

- `LayoutAnimation`은 실행 후 잊어버리는 애니메이션("정적" 애니메이션)에만 작동합니다. 중단 가능해야 한다면 [`Animated`](animated.md)를 사용해야 합니다.

### 화면에서 뷰를 이동(스크롤, 변환, 회전)하면 UI 스레드 FPS가 하락하는 경우

이는 특히 Android에서 이미지 위에 투명 배경의 텍스트가 있거나 알파 컴포지팅이 필요한 상황에서 각 프레임마다 뷰를 다시 그려야 할 때 발생합니다. `renderToHardwareTextureAndroid`를 활성화하면 이 문제를 크게 개선할 수 있습니다. iOS의 경우 `shouldRasterizeIOS`가 기본적으로 이미 활성화되어 있습니다.

이를 과도하게 사용하지 않도록 주의하세요. 그렇지 않으면 메모리 사용량이 급증할 수 있습니다. 이러한 props를 사용할 때 성능과 메모리 사용량을 프로파일링하세요. 뷰를 더 이상 이동하지 않을 계획이라면 이 속성을 끄세요.

### 이미지 크기를 애니메이션화하면 UI 스레드 FPS가 하락하는 경우

iOS에서 [`Image` 컴포넌트](image.md)의 너비 또는 높이를 조정할 때마다 원본 이미지에서 다시 잘리고 크기가 조정됩니다. 이는 특히 큰 이미지의 경우 매우 비용이 많이 들 수 있습니다. 대신 크기를 애니메이션화할 때 `transform: [{scale}]` 스타일 속성을 사용하세요. 이미지를 탭하여 전체 화면으로 확대하는 경우가 이를 사용하는 예입니다.

### TouchableX 뷰의 응답성이 좋지 않은 경우

터치에 응답하는 컴포넌트의 불투명도나 강조 표시를 조정하는 것과 같은 프레임에서 작업을 수행하면, `onPress` 함수가 반환된 후에야 효과를 볼 수 있습니다. 이는 `onPress`가 무거운 다시 렌더링을 유발하는 state를 설정하고 그 결과로 몇 개의 프레임이 드롭되는 경우에 발생할 수 있습니다. 해결책은 `onPress` 핸들러 내의 모든 작업을 `requestAnimationFrame`으로 감싸는 것입니다.

```tsx
function handleOnPress() {
  requestAnimationFrame(() => {
    this.doExpensiveAction();
  });
}
```
