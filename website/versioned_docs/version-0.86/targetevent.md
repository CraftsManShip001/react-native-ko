---
id: targetevent
title: TargetEvent Object Type
---

`TargetEvent` 객체는 포커스 변경의 결과로 콜백에서 반환됩니다. 예를 들어 [TextInput](textinput) 컴포넌트의 `onFocus` 또는 `onBlur`가 있습니다.

## 예제

```
{
    target: 1127
}
```

## 키와 값

### `target`

TargetEvent를 수신하는 요소의 노드 id입니다.

| 타입                        | 선택 여부 |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

## 사용처

- [`TextInput`](textinput)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
