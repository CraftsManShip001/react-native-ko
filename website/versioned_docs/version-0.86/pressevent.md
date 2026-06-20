---
id: pressevent
title: PressEvent Object Type
---

`PressEvent` 객체는 예를 들어 [Button](button) 컴포넌트의 `onPress`와 같이, 사용자의 프레스 상호작용 결과로 콜백에서 반환됩니다.

## 예제

```js
{
    changedTouches: [PressEvent],
    identifier: 1,
    locationX: 8,
    locationY: 4.5,
    pageX: 24,
    pageY: 49.5,
    target: 1127,
    timestamp: 85131876.58868201,
    touches: []
}
```

## 키와 값

### `changedTouches`

마지막 이벤트 이후 변경된 모든 PressEvent의 배열입니다.

| Type                 | Optional |
| -------------------- | -------- |
| array of PressEvents | No       |

### `force` <div className="label ios">iOS</div>

3D Touch 프레스 시 사용된 힘의 양입니다. `0.0`에서 `1.0` 범위의 부동소수점 값을 반환합니다.

| Type   | Optional |
| ------ | -------- |
| number | Yes      |

### `identifier`

이벤트에 할당된 고유한 숫자 식별자입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `locationX`

터치 가능 영역 내부의 터치 원점 X 좌표(요소 기준 상대값)입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `locationY`

터치 가능 영역 내부의 터치 원점 Y 좌표(요소 기준 상대값)입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `pageX`

화면의 터치 원점 X 좌표(루트 뷰 기준 상대값)입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `pageY`

화면의 터치 원점 Y 좌표(루트 뷰 기준 상대값)입니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `target`

PressEvent를 수신하는 요소의 노드 id입니다.

| Type                        | Optional |
| --------------------------- | -------- |
| number, `null`, `undefined` | No       |

### `timestamp`

PressEvent가 발생한 시점의 타임스탬프 값입니다. 값은 밀리초 단위로 표현됩니다.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `touches`

화면의 현재 모든 PressEvent의 배열입니다.

| Type                 | Optional |
| -------------------- | -------- |
| array of PressEvents | No       |

## 사용되는 곳

- [`Button`](button)
- [`PanResponder`](panresponder)
- [`Pressable`](pressable)
- [`ScrollView`](scrollview)
- [`Text`](text)
- [`TextInput`](textinput)
- [`TouchableHighlight`](touchablenativefeedback)
- [`TouchableOpacity`](touchablewithoutfeedback)
- [`TouchableNativeFeedback`](touchablenativefeedback)
- [`TouchableWithoutFeedback`](touchablewithoutfeedback)
- [`View`](view)
