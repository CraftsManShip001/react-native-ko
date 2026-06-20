---
id: dropshadowvalue
title: DropShadowValue Object Type
---

`DropShadowValue` 객체는 `dropShadow` 함수를 위한 [`filter`](./view-style-props.md#filter) 스타일 prop에서 사용됩니다. 2개 또는 3개의 길이 값과 선택적 색상으로 구성됩니다. 이 값들은 드롭 섀도우의 색상, 위치 및 흐림 정도를 정의합니다.

## 예시

```js
{
  offsetX: 10,
  offsetY: -3,
  standardDeviation: '15px',
  color: 'blue',
}
```

## 키와 값

### `offsetX`

x축 방향의 오프셋입니다. 양수 또는 음수가 될 수 있습니다. 양수 값은 오른쪽, 음수 값은 왼쪽을 나타냅니다.

| 타입             | 선택 여부 |
| ---------------- | -------- |
| number \| string | No       |

### `offsetY`

y축 방향의 오프셋입니다. 양수 또는 음수가 될 수 있습니다. 양수 값은 위쪽, 음수 값은 아래쪽을 나타냅니다.

| 타입             | 선택 여부 |
| ---------------- | -------- |
| number \| string | No       |

### `standardDeviation`

[가우시안 블러](https://en.wikipedia.org/wiki/Gaussian_blur) 알고리즘에 사용되는 표준 편차를 나타냅니다. 값이 클수록 섀도우가 더 흐릿해집니다. 음수가 아닌 값만 유효합니다. 기본값은 0입니다.

| 타입             | 선택 여부 |
| ---------------- | -------- |
| number \| string | Yes      |

### `color`

섀도우의 색상입니다. 기본값은 `black`입니다.

| 타입                 | 선택 여부 |
| -------------------- | -------- |
| [color](./colors.md) | Yes      |

## 사용처

- [`filter`](./view-style-props.md#filter)
