---
id: touchablenativefeedback
title: TouchableNativeFeedback
---

:::tip
터치 기반 입력을 처리하는 더 포괄적이고 미래 지향적인 방법을 찾고 있다면 [Pressable](pressable.md) API를 확인하세요.
:::

뷰가 터치에 올바르게 반응하도록 만드는 래퍼입니다(Android 전용). Android에서 이 컴포넌트는 네이티브 state drawable을 사용하여 터치 피드백을 표시합니다.

현재는 단일 View 인스턴스만 자식 노드로 지원합니다. 이는 해당 View를 일부 추가 속성이 설정된 다른 RCTView 노드 인스턴스로 교체하는 방식으로 구현되기 때문입니다.

네이티브 피드백 터치의 배경 drawable은 `background` 속성으로 커스터마이징할 수 있습니다.

## 예제

```SnackPlayer name=TouchableNativeFeedback%20Android%20Component%20Example&supportedPlatforms=android
import {useState} from 'react';
import {Text, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [rippleColor, setRippleColor] = useState(randomHexColor());
  const [rippleOverflow, setRippleOverflow] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableNativeFeedback
          onPress={() => {
            setRippleColor(randomHexColor());
            setRippleOverflow(!rippleOverflow);
          }}
          background={TouchableNativeFeedback.Ripple(
            rippleColor,
            rippleOverflow,
          )}>
          <View style={styles.touchable}>
            <Text style={styles.text}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const randomHexColor = () => {
  return '#000000'.replace(/0/g, function () {
    return Math.round(Math.random() * 16).toString(16);
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  touchable: {
    flex: 0.33,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    borderColor: 'black',
    borderWidth: 1,
  },
  text: {
    alignSelf: 'center',
  },
});

export default App;
```

---

# 레퍼런스

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

[TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)를 상속합니다.

---

### `background`

피드백을 표시하는 데 사용할 배경 drawable의 타입을 결정합니다. `type` 속성과 해당 `type`에 따른 추가 데이터를 포함하는 객체를 받습니다. 정적 메서드 중 하나를 사용하여 해당 객체를 생성하는 것을 권장합니다.

| Type               |
| ------------------ |
| backgroundPropType |

---

### `useForeground`

배경 대신 뷰의 전경에 ripple 효과를 추가하려면 `true`로 설정하세요. 자식 뷰 중 하나가 자체 배경을 갖고 있거나 이미지를 표시하는 경우처럼 ripple이 자식 뷰에 가려지지 않도록 하고 싶을 때 유용합니다.

이 기능은 Android 6.0 이상에서만 사용 가능하므로 먼저 `TouchableNativeFeedback.canUseNativeForeground()`를 확인하세요. 더 낮은 버전에서 사용하면 경고가 표시되고 배경으로 폴백됩니다.

| Type |
| ---- |
| bool |

---

### `hasTVPreferredFocus` <div className="label android">Android</div>

TV 우선 포커스 (View 컴포넌트 문서를 참조하세요).

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

TV 다음 포커스 아래 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

TV 다음 포커스 앞 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

TV 다음 포커스 왼쪽 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

TV 다음 포커스 오른쪽 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

TV 다음 포커스 위 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

## 메서드

### `SelectableBackground()`

```tsx
static SelectableBackground(
  rippleRadius: number | null,
): ThemeAttributeBackgroundPropType;
```

선택 가능한 요소에 대한 Android 테마 기본 배경(`?android:attr/selectableItemBackground`)을 나타내는 객체를 생성합니다. `rippleRadius` 매개변수는 ripple 효과의 반경을 제어합니다.

---

### `SelectableBackgroundBorderless()`

```tsx
static SelectableBackgroundBorderless(
  rippleRadius: number | null,
): ThemeAttributeBackgroundPropType;
```

테두리 없는 선택 가능한 요소에 대한 Android 테마 기본 배경(`?android:attr/selectableItemBackgroundBorderless`)을 나타내는 객체를 생성합니다. Android API 레벨 21 이상에서 사용할 수 있습니다. `rippleRadius` 매개변수는 ripple 효과의 반경을 제어합니다.

---

### `Ripple()`

```tsx
static Ripple(
  color: ColorValue,
  borderless: boolean,
  rippleRadius?: number | null,
): RippleBackgroundPropType;
```

지정된 색상(문자열)의 ripple drawable을 나타내는 객체를 생성합니다. `borderless` 속성이 `true`이면 ripple이 뷰 경계 밖에서도 렌더링됩니다(예: 네이티브 액션바 버튼). 이 배경 타입은 Android API 레벨 21 이상에서 사용할 수 있습니다.

**매개변수:**

| Name         | Type    | Required | Description                                 |
| ------------ | ------- | -------- | ------------------------------------------- |
| color        | string  | Yes      | The ripple color                            |
| borderless   | boolean | Yes      | If the ripple can render outside its bounds |
| rippleRadius | ?number | No       | controls the radius of the ripple effect    |

---

### `canUseNativeForeground()`

```tsx
static canUseNativeForeground(): boolean;
```
