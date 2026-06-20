---
id: pressable
title: Pressable
---

Pressable은 정의된 자식 요소에서 다양한 단계의 프레스 상호작용을 감지할 수 있는 핵심 컴포넌트 래퍼입니다.

```tsx
<Pressable onPress={onPressFunction}>
  <Text>I'm pressable!</Text>
</Pressable>
```

## 동작 방식

`Pressable`로 감싸진 요소에서:

- [`onPressIn`](#onpressin)은 프레스가 활성화될 때 호출됩니다.
- [`onPressOut`](#onpressout)은 프레스 제스처가 비활성화될 때 호출됩니다.

[`onPressIn`](#onpressin)이 호출된 후에는 두 가지 중 하나가 발생합니다:

1. 사용자가 손가락을 떼면 [`onPressOut`](#onpressout)에 이어 [`onPress`](#onpress)가 트리거됩니다.
2. 손가락을 떼기 전에 500밀리초 이상 유지하면 [`onLongPress`](#onlongpress)가 트리거됩니다. (손가락을 뗄 때 [`onPressOut`](#onpressout)도 여전히 발생합니다.)

<img src="/docs/assets/d_pressable_pressing.svg" width="1000" alt="onPress 이벤트의 순서 다이어그램." />

손가락은 가장 정밀한 도구가 아니며, 사용자가 실수로 잘못된 요소를 활성화하거나 활성화 영역을 놓치는 경우가 종종 있습니다. 이를 돕기 위해 `Pressable`에는 선택적인 `HitRect`가 있어, 감싸인 요소에서 얼마나 멀리 떨어진 곳에서 터치를 감지할지 정의할 수 있습니다. 프레스는 `HitRect` 내의 어느 곳에서나 시작할 수 있습니다.

`PressRect`는 프레스가 요소와 해당 `HitRect`를 벗어나도 활성화 상태를 유지하고 "프레스"로 인정받을 수 있게 합니다 — 누르고 있는 버튼에서 손가락을 천천히 밀어내는 동작을 생각해 보세요.

:::note
터치 영역은 부모 뷰의 경계를 벗어나지 않으며, 두 개의 겹치는 뷰에 터치가 닿을 경우 형제 뷰의 Z-index가 항상 우선순위를 가집니다.
:::

<figure>
  <img src="/docs/assets/d_pressable_anatomy.svg" width="1000" alt="HitRect와 PressRect의 작동 방식 다이어그램." />
  <figcaption>
    <code>HitRect</code>는 <code>hitSlop</code>으로, <code>PressRect</code>는 <code>pressRetentionOffset</code>으로 설정할 수 있습니다.
  </figcaption>
</figure>

:::info
`Pressable`은 React Native의 `Pressability` API를 사용합니다. Pressability의 상태 머신 흐름과 동작 방식에 대한 자세한 내용은 [Pressability](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Pressability/Pressability.js#L350) 구현을 확인하세요.
:::

## 예제

```SnackPlayer name=Pressable
import {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [timesPressed, setTimesPressed] = useState(0);

  let textLog = '';
  if (timesPressed > 1) {
    textLog = timesPressed + 'x onPress';
  } else if (timesPressed > 0) {
    textLog = 'onPress';
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => {
            setTimesPressed(current => current + 1);
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
            },
            styles.wrapperCustom,
          ]}>
          {({pressed}) => (
            <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
          )}
        </Pressable>
        <View style={styles.logBox}>
          <Text testID="pressable_press_console">{textLog}</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
  },
});

export default App;
```

## Props

### `android_disableSound` <div className="label android">Android</div>

true이면 프레스 시 Android 시스템 사운드를 재생하지 않습니다.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

### `android_ripple` <div className="label android">Android</div>

Android 리플 효과를 활성화하고 해당 속성을 구성합니다.

| Type                                   |
| -------------------------------------- |
| [RippleConfig](pressable#rippleconfig) |

### `children`

자식 요소 또는 컴포넌트가 현재 프레스 상태인지를 나타내는 불리언 값을 받는 함수입니다.

| Type                     |
| ------------------------ |
| [React Node](react-node) |

### `unstable_pressDelay`

`onPressIn`을 호출하기 전에 프레스 다운 후 대기하는 시간(밀리초)입니다.

| Type   |
| ------ |
| number |

### `delayLongPress`

`onLongPress`가 호출되기까지 `onPressIn`으로부터의 지속 시간(밀리초)입니다.

| Type   | Default |
| ------ | ------- |
| number | `500`   |

### `disabled`

프레스 동작의 비활성화 여부입니다.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

### `hitSlop`

프레스를 감지할 수 있는 요소 외부의 추가 거리를 설정합니다.

| Type                   |
| ---------------------- |
| [Rect](rect) or number |

### `onHoverIn`

시각적 피드백을 제공하기 위해 호버가 활성화될 때 호출됩니다.

| Type                                                                                                      |
| --------------------------------------------------------------------------------------------------------- |
| `md ({ nativeEvent: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) }) => void` |

### `onHoverOut`

시각적 피드백을 되돌리기 위해 호버가 비활성화될 때 호출됩니다.

| Type                                                                                                      |
| --------------------------------------------------------------------------------------------------------- |
| `md ({ nativeEvent: [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) }) => void` |

### `onLongPress`

`onPressIn` 이후 경과 시간이 500밀리초를 초과하면 호출됩니다. 이 시간은 [`delayLongPress`](#delaylongpress)로 사용자 정의할 수 있습니다.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPress`

`onPressOut` 이후에 호출됩니다.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressIn`

`onPressOut` 및 `onPress` 이전에 터치가 시작될 때 즉시 호출됩니다.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressMove`

프레스 위치가 이동할 때 호출됩니다.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `onPressOut`

터치가 해제될 때 호출됩니다.

| Type                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

### `pressRetentionOffset`

`onPressOut`이 트리거되기 전까지 터치를 프레스로 간주하는 이 뷰 외부의 추가 거리입니다.

| Type                   | Default                                      |
| ---------------------- | -------------------------------------------- |
| [Rect](rect) or number | `{bottom: 30, left: 20, right: 20, top: 20}` |

### `style`

뷰 스타일, 또는 컴포넌트가 현재 프레스 상태인지를 나타내는 불리언 값을 받아 뷰 스타일을 반환하는 함수입니다.

| Type                                                                                            |
| ----------------------------------------------------------------------------------------------- |
| [View Style](view-style-props) or `md ({ pressed: boolean }) => [View Style](view-style-props)` |

### `testOnly_pressed`

문서화 또는 테스트(예: 스냅샷 테스트)에만 사용됩니다.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

## 타입 정의

### RippleConfig

`android_ripple` 속성에 대한 리플 효과 설정입니다.

| Type   |
| ------ |
| object |

**속성:**

| Name       | Type            | Required | Description                                                                                                                                                                                 |
| ---------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color      | [color](colors) | No       | 리플 효과의 색상을 정의합니다.                                                                                                                                                              |
| borderless | boolean         | No       | 리플 효과에 테두리를 포함하지 않을지 여부를 정의합니다.                                                                                                                                     |
| radius     | number          | No       | 리플 효과의 반지름을 정의합니다.                                                                                                                                                            |
| foreground | boolean         | No       | true로 설정하면 배경 대신 뷰의 전경에 리플 효과를 추가합니다. 자식 뷰 중 하나가 자체 배경을 가지거나 이미지를 표시하는 경우처럼 리플이 가려지지 않도록 하고 싶을 때 유용합니다. |
