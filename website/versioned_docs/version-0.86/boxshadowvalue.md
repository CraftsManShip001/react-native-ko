---
id: boxshadowvalue
title: BoxShadowValue Object Type
---

`BoxShadowValue` 객체는 [`boxShadow`](./view-style-props.md#boxshadow) 스타일 prop에서 사용됩니다. 2~4개의 길이값, 선택적 색상, 선택적 `inset` 불리언으로 구성됩니다. 이 값들은 박스 그림자의 색상, 위치, 크기, 흐림 정도를 정의합니다.

## 예시

```js
{
  offsetX: 10,
  offsetY: -3,
  blurRadius: '15px',
  spreadDistance: '10px',
  color: 'red',
  inset: true,
}
```

## 키와 값

### `offsetX`

x축 방향의 오프셋입니다. 양수 또는 음수일 수 있습니다. 양수 값은 오른쪽을, 음수 값은 왼쪽을 나타냅니다.

| Type             | Optional |
| ---------------- | -------- |
| number \| string | No       |

### `offsetY`

y축 방향의 오프셋입니다. 양수 또는 음수일 수 있습니다. 양수 값은 위쪽을, 음수 값은 아래쪽을 나타냅니다.

| Type             | Optional |
| ---------------- | -------- |
| number \| string | No       |

### `blurRadius`

[가우시안 블러](https://en.wikipedia.org/wiki/Gaussian_blur) 알고리즘에서 사용되는 반지름을 나타냅니다. 값이 클수록 그림자가 더 흐려집니다. 음수가 아닌 값만 유효합니다. 기본값은 0입니다.

| Type             | Optional |
| ---------------- | -------- |
| number \| string | Yes      |

### `spreadDistance`

그림자가 얼마나 커지거나 작아지는지를 나타냅니다. 양수 값은 그림자를 확장하고, 음수 값은 그림자를 축소합니다.

| Type             | Optional |
| ---------------- | -------- |
| number \| string | Yes      |

### `color`

그림자의 색상입니다. 기본값은 `black`입니다.

| Type                 | Optional |
| -------------------- | -------- |
| [color](./colors.md) | Yes      |

### `inset`

그림자가 내부에 있는지 여부입니다. Inset 그림자는 요소의 테두리 박스 외부가 아닌 내부 주변에 표시됩니다.

| Type    | Optional |
| ------- | -------- |
| boolean | Yes      |

## 사용처

- [`boxShadow`](./view-style-props.md#boxshadow)
