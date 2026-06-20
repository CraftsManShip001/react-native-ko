---
id: animatedvalue
title: Animated.Value
---

애니메이션을 구동하기 위한 표준 값입니다. 하나의 `Animated.Value`는 여러 속성을 동기화된 방식으로 구동할 수 있지만, 한 번에 하나의 메커니즘으로만 구동될 수 있습니다. 새로운 메커니즘(예: 새 애니메이션 시작 또는 `setValue` 호출)을 사용하면 이전 것이 중지됩니다.

일반적으로 `useAnimatedValue(0);` 또는 클래스 컴포넌트에서 `new Animated.Value(0);`로 초기화합니다.

---

# 레퍼런스

## 메서드

### `setValue()`

```tsx
setValue(value: number);
```

값을 직접 설정합니다. 이는 값에서 실행 중인 모든 애니메이션을 중지하고 바인딩된 모든 속성을 업데이트합니다.

**매개변수:**

| Name  | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| value | number | Yes      | 값          |

---

### `setOffset()`

```tsx
setOffset(offset: number);
```

`setValue`, 애니메이션, 또는 `Animated.event`를 통해 설정된 값 위에 적용되는 오프셋을 설정합니다. 패닝 제스처의 시작과 같은 것을 보정하는 데 유용합니다.

**매개변수:**

| Name   | Type   | Required | Description  |
| ------ | ------ | -------- | ------------ |
| offset | number | Yes      | 오프셋 값    |

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
addListener(callback: (state: {value: number}) => void): string;
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
stopAnimation(callback?: (value: number) => void);
```

실행 중인 모든 애니메이션이나 추적을 중지합니다. `callback`은 애니메이션을 중지한 후 최종 값과 함께 호출되며, 이는 레이아웃과 함께 애니메이션 위치와 일치하도록 state를 업데이트하는 데 유용합니다.

**매개변수:**

| Name     | Type     | Required | Description                                   |
| -------- | -------- | -------- | --------------------------------------------- |
| callback | function | No       | 최종 값을 받는 함수. |

---

### `resetAnimation()`

```tsx
resetAnimation(callback?: (value: number) => void);
```

모든 애니메이션을 중지하고 값을 원래 값으로 재설정합니다.

**매개변수:**

| Name     | Type     | Required | Description                                      |
| -------- | -------- | -------- | ------------------------------------------------ |
| callback | function | No       | 원래 값을 받는 함수. |

---

### `interpolate()`

```tsx
interpolate(config: InterpolationConfigType);
```

속성을 업데이트하기 전에 값을 보간합니다. 예를 들어 0-1을 0-10으로 매핑합니다.

`AnimatedInterpolation.js` 참조

**매개변수:**

| Name   | Type   | Required | Description    |
| ------ | ------ | -------- | -------------- |
| config | object | Yes      | 아래를 참조하세요. |

`config` 객체는 다음 키로 구성됩니다:

- `inputRange`: 숫자 배열
- `outputRange`: 숫자 또는 문자열 배열
- `easing` (선택): 입력 숫자가 주어지면 숫자를 반환하는 함수
- `extrapolate` (선택): 'extend', 'identity', 또는 'clamp'와 같은 문자열
- `extrapolateLeft` (선택): 'extend', 'identity', 또는 'clamp'와 같은 문자열
- `extrapolateRight` (선택): 'extend', 'identity', 또는 'clamp'와 같은 문자열

---

### `animate()`

```tsx
animate(animation, callback);
```

일반적으로 내부적으로만 사용되지만 커스텀 Animation 클래스에서 사용할 수 있습니다.

**매개변수:**

| Name      | Type      | Required | Description         |
| --------- | --------- | -------- | ------------------- |
| animation | Animation | Yes      | `Animation.js` 참조. |
| callback  | function  | Yes      | 콜백 함수.          |
