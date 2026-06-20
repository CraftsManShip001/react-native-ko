---
id: rect
title: Rect Object Type
---

`Rect`는 직사각형 영역을 얼마나 확장할지를 설명하기 위해 숫자형 픽셀 값을 받습니다. 이 값들은 원래 영역의 크기에 더해져 영역을 확장합니다.

## 예시

```js
{
    bottom: 20,
    left: null,
    right: undefined,
    top: 50
}
```

## 키와 값

### `bottom`

| Type                        | Required |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

### `left`

| Type                        | Required |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

### `right`

| Type                        | Required |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

### `top`

| Type                        | Required |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

## 사용처

- [`Image`](image)
- [`Pressable`](pressable)
- [`Text`](text)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
