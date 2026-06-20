---
id: panresponder
title: PanResponder
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`PanResponder`는 여러 터치를 하나의 제스처로 조정합니다. 단일 터치 제스처를 추가 터치에도 견고하게 만들어 주며, 기본적인 멀티 터치 제스처를 인식하는 데 사용할 수 있습니다.

기본적으로 `PanResponder`는 활성 제스처가 진행 중일 때 장시간 실행되는 JS 이벤트가 제스처를 방해하지 않도록 `InteractionManager` 핸들을 유지합니다.

`PanResponder`는 [제스처 응답 시스템](gesture-responder-system.md)에서 제공하는 응답자 핸들러의 예측 가능한 래퍼를 제공합니다. 각 핸들러에 대해 네이티브 이벤트 객체와 함께 새로운 `gestureState` 객체를 제공합니다.

```
onPanResponderMove: (event, gestureState) => {}
```

네이티브 이벤트는 [PressEvent](pressevent) 형태의 합성 터치 이벤트입니다.

`gestureState` 객체는 다음을 포함합니다.

- `stateID` - gestureState의 ID로, 화면에 최소 하나 이상의 터치가 있는 동안 유지됩니다.
- `moveX` - 최근에 이동한 터치의 최신 화면 좌표
- `moveY` - 최근에 이동한 터치의 최신 화면 좌표
- `x0` - 응답자 허가 시의 화면 좌표
- `y0` - 응답자 허가 시의 화면 좌표
- `dx` - 터치가 시작된 이후 제스처의 누적 이동 거리
- `dy` - 터치가 시작된 이후 제스처의 누적 이동 거리
- `vx` - 제스처의 현재 속도
- `vy` - 제스처의 현재 속도
- `numberActiveTouches` - 현재 화면에 있는 터치 수

## 사용 패턴

```tsx
const ExampleComponent = () => {
  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return <View {...panResponder.panHandlers} />;
};
```

## 예제

`PanResponder`는 `Animated` API와 함께 작동하여 UI에서 복잡한 제스처를 구현하는 데 도움을 줍니다. 다음 예제에는 화면에서 자유롭게 드래그할 수 있는 애니메이션 `View` 컴포넌트가 포함되어 있습니다.

```SnackPlayer name=PanResponder
import {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Drag this box!</Text>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;
```

[RNTester의 PanResponder 예제](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/PanResponder/PanResponderExample.js)를 사용해 보세요.

---

# 레퍼런스

## 메서드

### `create()`

```tsx
static create(config: PanResponderCallbacks): PanResponderInstance;
```

**매개변수:**

| Name                                                        | Type   | Description |
| ----------------------------------------------------------- | ------ | ----------- |
| config <div className="label basic required">Required</div> | object | 아래 참조   |

`config` 객체는 일반적인 `onResponder*` 콜백에서 `Responder`라는 단어를 `PanResponder`로 교체하여 [`PressEvent`](pressevent)뿐만 아니라 `PanResponder` 제스처 state도 제공하는 모든 응답자 콜백의 향상된 버전을 제공합니다. 예를 들어 `config` 객체는 다음과 같은 형태입니다.

- `onMoveShouldSetPanResponder: (e, gestureState) => {...}`
- `onMoveShouldSetPanResponderCapture: (e, gestureState) => {...}`
- `onStartShouldSetPanResponder: (e, gestureState) => {...}`
- `onStartShouldSetPanResponderCapture: (e, gestureState) => {...}`
- `onPanResponderReject: (e, gestureState) => {...}`
- `onPanResponderGrant: (e, gestureState) => {...}`
- `onPanResponderStart: (e, gestureState) => {...}`
- `onPanResponderEnd: (e, gestureState) => {...}`
- `onPanResponderRelease: (e, gestureState) => {...}`
- `onPanResponderMove: (e, gestureState) => {...}`
- `onPanResponderTerminate: (e, gestureState) => {...}`
- `onPanResponderTerminationRequest: (e, gestureState) => {...}`
- `onShouldBlockNativeResponder: (e, gestureState) => {...}`

일반적으로, 캡처 단계에 해당하는 이벤트가 있는 경우 캡처 단계에서 gestureState를 한 번 업데이트하고 버블 단계에서도 이를 사용할 수 있습니다.

`onStartShould*` 콜백에 주의하세요. 이 콜백들은 노드로 버블/캡처되는 시작/종료 이벤트에 대한 업데이트된 `gestureState`만 반영합니다. 노드가 응답자가 되면 제스처에 의해 처리되는 모든 시작/종료 이벤트와 그에 따라 업데이트된 `gestureState`에 의존할 수 있습니다. (numberActiveTouches)는 응답자가 아닌 경우 완전히 정확하지 않을 수 있습니다.
