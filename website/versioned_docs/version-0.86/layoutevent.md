---
id: layoutevent
title: LayoutEvent Object Type
---

`LayoutEvent` 객체는 [View](view) 컴포넌트의 `onLayout`과 같이 컴포넌트 레이아웃이 변경될 때 콜백의 결과로 반환됩니다.

## 예제

```js
{
    layout: {
        width: 520,
        height: 70.5,
        x: 0,
        y: 42.5
    },
    target: 1127
}
```

## 키와 값

### `height`

레이아웃 변경 후 컴포넌트의 높이입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `width`

레이아웃 변경 후 컴포넌트의 너비입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `x`

부모 컴포넌트 내에서 컴포넌트의 X 좌표입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `y`

부모 컴포넌트 내에서 컴포넌트의 Y 좌표입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `target`

LayoutEvent를 수신하는 요소의 노드 id입니다.

| Type                        | Optional |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

## 사용처

- [`Image`](image)
- [`Pressable`](pressable)
- [`ScrollView`](scrollview)
- [`Text`](text)
- [`TextInput`](textinput)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
- [`View`](view)
