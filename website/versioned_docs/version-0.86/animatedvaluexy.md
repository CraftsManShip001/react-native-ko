---
id: animatedvaluexy
title: Animated.ValueXY
---

패닝 제스처와 같은 2D 애니메이션을 구동하기 위한 2D 값입니다. 일반 [`Animated.Value`](animatedvalue)와 거의 동일한 API이지만, 멀티플렉싱됩니다. 내부적으로 두 개의 일반 `Animated.Value`를 포함합니다.

## 예제

```SnackPlayer name=Animated.ValueXY%20Example
import {useRef} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DraggableView = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        dy: pan.y,
      },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        {toValue: {x: 0, y: 0}, useNativeDriver: true}, // Back to zero
      ).start();
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout(), styles.box]}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#61dafb',
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});

export default DraggableView;
```

---

# 레퍼런스

## 메서드

### `setValue()`

```tsx
setValue(value: {x: number; y: number});
```

값을 직접 설정합니다. 이는 값에서 실행 중인 모든 애니메이션을 중지하고 바인딩된 모든 속성을 업데이트합니다.

**매개변수:**

| Name  | Type                     | Required | Description |
| ----- | ------------------------ | -------- | ----------- |
| value | `{x: number; y: number}` | Yes      | 값          |

---

### `setOffset()`

```tsx
setOffset(offset: {x: number; y: number});
```

`setValue`, 애니메이션, 또는 `Animated.event`를 통해 설정된 값 위에 적용되는 오프셋을 설정합니다. 패닝 제스처의 시작과 같은 것을 보정하는 데 유용합니다.

**매개변수:**

| Name   | Type                     | Required | Description  |
| ------ | ------------------------ | -------- | ------------ |
| offset | `{x: number; y: number}` | Yes      | 오프셋 값    |

---

### `flattenOffset()`

```tsx
flattenOffset();
```

오프셋 값을 기본 값으로 병합하고 오프셋을 0으로 재설정합니다. 값의 최종 출력은 변경되지 않습니다.

---

### `extractOffset()`

```tsx
extractOffset();
```

오프셋 값을 기본 값으로 설정하고 기본 값을 0으로 재설정합니다. 값의 최종 출력은 변경되지 않습니다.

---

### `addListener()`

```tsx
addListener(callback: (value: {x: number; y: number}) => void);
```

애니메이션에서 업데이트를 관찰할 수 있도록 값에 비동기 리스너를 추가합니다. 값이 네이티브로 구동될 수 있기 때문에 값을 동기적으로 읽을 방법이 없어서 유용합니다.

리스너의 식별자로 사용되는 문자열을 반환합니다.

**매개변수:**

| Name     | Type     | Required | Description                                                                              |
| -------- | -------- | -------- | ---------------------------------------------------------------------------------------- |
| callback | function | Yes      | 새 값으로 설정된 `value` 키가 있는 객체를 받는 콜백 함수. |

---

### `removeListener()`

```tsx
removeListener(id: string);
```

리스너의 등록을 해제합니다. `id` 매개변수는 `addListener()`가 이전에 반환한 식별자와 일치해야 합니다.

**매개변수:**

| Name | Type   | Required | Description                        |
| ---- | ------ | -------- | ---------------------------------- |
| id   | string | Yes      | 제거할 리스너의 Id. |

---

### `removeAllListeners()`

```tsx
removeAllListeners();
```

등록된 모든 리스너를 제거합니다.

---

### `stopAnimation()`

```tsx
stopAnimation(callback?: (value: {x: number; y: number}) => void);
```

실행 중인 모든 애니메이션이나 추적을 중지합니다. `callback`은 애니메이션을 중지한 후 최종 값과 함께 호출되며, 이는 레이아웃과 함께 애니메이션 위치와 일치하도록 state를 업데이트하는 데 유용합니다.

**매개변수:**

| Name     | Type     | Required | Description                                   |
| -------- | -------- | -------- | --------------------------------------------- |
| callback | function | No       | 최종 값을 받는 함수. |

---

### `resetAnimation()`

```tsx
resetAnimation(callback?: (value: {x: number; y: number}) => void);
```

모든 애니메이션을 중지하고 값을 원래 값으로 재설정합니다.

**매개변수:**

| Name     | Type     | Required | Description                                      |
| -------- | -------- | -------- | ------------------------------------------------ |
| callback | function | No       | 원래 값을 받는 함수. |

---

### `getLayout()`

```tsx
getLayout(): {left: Animated.Value, top: Animated.Value};
```

스타일에서 사용하기 위해 `{x, y}`를 `{left, top}`으로 변환합니다. 예:

```tsx
style={this.state.anim.getLayout()}
```

---

### `getTranslateTransform()`

```tsx
getTranslateTransform(): [
  {translateX: Animated.Value},
  {translateY: Animated.Value},
];
```

`{x, y}`를 사용 가능한 이동 변환으로 변환합니다. 예:

```tsx
style={{
  transform: this.state.anim.getTranslateTransform()
}}
```
