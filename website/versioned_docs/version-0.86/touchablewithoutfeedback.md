---
id: touchablewithoutfeedback
title: TouchableWithoutFeedback
---

:::tip
터치 기반 입력을 처리하는 더 풍부하고 미래 지향적인 방법을 찾고 있다면, [Pressable](pressable.md) API를 확인하세요.
:::

매우 타당한 이유가 없는 한 사용하지 마세요. 누르기에 반응하는 모든 요소는 터치 시 시각적 피드백이 있어야 합니다.

`TouchableWithoutFeedback`은 하나의 자식만 지원합니다. 여러 자식 컴포넌트를 원한다면 View로 감싸세요. 중요한 점은, `TouchableWithoutFeedback`은 자식을 복제하고 리스폰더 props를 적용하는 방식으로 작동한다는 것입니다. 따라서 중간 컴포넌트들은 해당 props를 기반 React Native 컴포넌트에 전달해야 합니다.

## 사용 패턴

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableWithoutFeedback>;
```

## 예시

```SnackPlayer name=TouchableWithoutFeedback
import {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TouchableWithoutFeedbackExample = () => {
  const [count, setCount] = useState(0);

  const onPress = () => {
    setCount(count + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>Count: {count}</Text>
        </View>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  countText: {
    color: '#FF00FF',
  },
});

export default TouchableWithoutFeedbackExample;
```

---

# 레퍼런스

## Props

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

색상 반전이 켜졌을 때 이 View를 반전해야 하는지 여부를 나타내는 값입니다. `true`로 설정하면 색상 반전이 켜져 있어도 View를 반전하지 않도록 합니다.

자세한 정보는 [접근성 가이드](accessibility.md#accessibilityignoresinvertcolors-ios)를 참조하세요.

| Type    |
| ------- |
| Boolean |

---

### `accessible`

`true`이면 해당 View가 접근성 요소임을 나타냅니다. 기본적으로 모든 터치 가능 요소는 접근 가능합니다.

| Type |
| ---- |
| bool |

---

### `accessibilityLabel`

사용자가 요소와 상호작용할 때 스크린 리더가 읽는 텍스트를 재정의합니다. 기본적으로 레이블은 모든 자식을 순회하면서 공백으로 구분된 모든 `Text` 노드를 누적하여 만들어집니다.

| Type   |
| ------ |
| string |

---

### `accessibilityLanguage` <div className="label ios">iOS</div>

사용자가 요소와 상호작용할 때 스크린 리더가 사용해야 하는 언어를 나타내는 값입니다. [BCP 47 명세](https://www.rfc-editor.org/info/bcp47)를 따라야 합니다.

자세한 정보는 [iOS `accessibilityLanguage` 문서](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage)를 참조하세요.

| Type   |
| ------ |
| string |

---

### `accessibilityHint`

접근성 힌트는 접근성 레이블에서 결과가 명확하지 않을 때 사용자가 접근성 요소에서 작업을 수행하면 어떤 일이 발생하는지 이해하는 데 도움을 줍니다.

| Type   |
| ------ |
| string |

---

### `accessibilityRole`

`accessibilityRole`은 보조 기술 사용자에게 컴포넌트의 목적을 전달합니다.

`accessibilityRole`은 다음 중 하나일 수 있습니다:

- `'none'` - 요소에 역할이 없을 때 사용합니다.
- `'button'` - 요소를 버튼으로 처리해야 할 때 사용합니다.
- `'link'` - 요소를 링크로 처리해야 할 때 사용합니다.
- `'search'` - 텍스트 필드 요소를 검색 필드로도 처리해야 할 때 사용합니다.
- `'image'` - 요소를 이미지로 처리해야 할 때 사용합니다. 예를 들어 버튼이나 링크와 결합할 수 있습니다.
- `'keyboardkey'` - 요소가 키보드 키로 동작할 때 사용합니다.
- `'text'` - 요소를 변경할 수 없는 정적 텍스트로 처리해야 할 때 사용합니다.
- `'adjustable'` - 요소를 "조정"할 수 있을 때(예: 슬라이더) 사용합니다.
- `'imagebutton'` - 요소를 버튼으로 처리해야 하면서 이미지이기도 할 때 사용합니다.
- `'header'` - 요소가 콘텐츠 섹션의 헤더 역할을 할 때(예: 내비게이션 바의 제목) 사용합니다.
- `'summary'` - 앱이 처음 실행될 때 앱의 현재 상태에 대한 빠른 요약을 제공하는 데 요소를 사용할 수 있을 때 사용합니다.
- `'alert'` - 요소에 사용자에게 표시해야 할 중요한 텍스트가 포함되어 있을 때 사용합니다.
- `'checkbox'` - 요소가 체크됨, 체크 안 됨 또는 혼합 체크 상태를 가질 수 있는 체크박스를 나타낼 때 사용합니다.
- `'combobox'` - 요소가 여러 선택지 중에서 선택할 수 있는 콤보박스를 나타낼 때 사용합니다.
- `'menu'` - 컴포넌트가 선택지 메뉴일 때 사용합니다.
- `'menubar'` - 컴포넌트가 여러 메뉴의 컨테이너일 때 사용합니다.
- `'menuitem'` - 메뉴 내의 항목을 나타낼 때 사용합니다.
- `'progressbar'` - 작업의 진행 상황을 나타내는 컴포넌트를 나타낼 때 사용합니다.
- `'radio'` - 라디오 버튼을 나타낼 때 사용합니다.
- `'radiogroup'` - 라디오 버튼 그룹을 나타낼 때 사용합니다.
- `'scrollbar'` - 스크롤 바를 나타낼 때 사용합니다.
- `'spinbutton'` - 선택 목록을 여는 버튼을 나타낼 때 사용합니다.
- `'switch'` - 켜고 끌 수 있는 스위치를 나타낼 때 사용합니다.
- `'tab'` - 탭을 나타낼 때 사용합니다.
- `'tablist'` - 탭 목록을 나타낼 때 사용합니다.
- `'timer'` - 타이머를 나타낼 때 사용합니다.
- `'toolbar'` - 도구 모음(액션 버튼이나 컴포넌트의 컨테이너)을 나타낼 때 사용합니다.

| Type   |
| ------ |
| string |

---

### `accessibilityState`

보조 기술 사용자에게 컴포넌트의 현재 상태를 설명합니다.

자세한 정보는 [접근성 가이드](accessibility.md#accessibilitystate)를 참조하세요.

| Type                                                                                             |
| ------------------------------------------------------------------------------------------------ |
| object: `{disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool}` |

---

### `accessibilityActions`

접근성 액션을 사용하면 보조 기술이 컴포넌트의 액션을 프로그래밍 방식으로 호출할 수 있습니다. `accessibilityActions` 속성에는 액션 객체 목록이 포함되어야 합니다. 각 액션 객체에는 필드 이름과 레이블이 포함되어야 합니다.

자세한 정보는 [접근성 가이드](accessibility.md#접근성-액션)를 참조하세요.

| Type  |
| ----- |
| array |

---

### `aria-busy`

요소가 수정 중임을 나타내며, 보조 기술이 업데이트에 대해 사용자에게 알리기 전에 변경이 완료될 때까지 기다릴 수 있습니다.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-checked`

체크 가능한 요소의 상태를 나타냅니다. 이 필드는 불리언 값이나 혼합 체크박스를 나타내는 "mixed" 문자열을 사용할 수 있습니다.

| Type             | Default |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

---

### `aria-disabled`

요소가 인식은 가능하지만 비활성화되어 있어서 편집하거나 다른 방식으로 조작할 수 없음을 나타냅니다.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-expanded`

확장 가능한 요소가 현재 확장되었는지 또는 축소되었는지를 나타냅니다.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-hidden`

요소가 보조 기술에서 숨겨져 있는지 여부를 나타냅니다.

예를 들어, 형제 View `A`와 `B`를 포함하는 창에서 View `B`의 `aria-hidden`을 `true`로 설정하면 VoiceOver가 `B` 요소와 그 자식을 무시합니다.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-label`

인터랙티브 요소에 레이블을 지정하는 문자열 값을 정의합니다.

| Type   |
| ------ |
| string |

---

### `aria-live` <div className="label android">Android</div>

요소가 업데이트될 것임을 나타내며, 사용자 에이전트, 보조 기술 및 사용자가 라이브 영역에서 기대할 수 있는 업데이트 유형을 설명합니다.

- **off** 접근성 서비스가 이 View의 변경 사항을 알리지 않아야 합니다.
- **polite** 접근성 서비스가 이 View의 변경 사항을 알려야 합니다.
- **assertive** 접근성 서비스가 진행 중인 음성을 중단하고 이 View의 변경 사항을 즉시 알려야 합니다.

| Type                                     | Default |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div className="label ios">iOS</div>

VoiceOver가 수신자의 형제 View 내 요소를 무시해야 하는지 여부를 나타내는 불리언 값입니다. `accessibilityViewIsModal` prop보다 우선합니다.

| Type    | Default |
| ------- | ------- |
| boolean | false   |

---

### `aria-selected`

선택 가능한 요소가 현재 선택되었는지 여부를 나타냅니다.

| Type    |
| ------- |
| boolean |

### `onAccessibilityAction`

사용자가 접근성 액션을 수행할 때 호출됩니다. 이 함수의 유일한 인수는 수행할 액션 이름을 포함하는 이벤트입니다.

자세한 정보는 [접근성 가이드](accessibility.md#접근성-액션)를 참조하세요.

| Type     |
| -------- |
| function |

---

### `accessibilityValue`

컴포넌트의 현재 값을 나타냅니다. 컴포넌트 값의 텍스트 설명이거나, 슬라이더 및 프로그레스 바와 같은 범위 기반 컴포넌트의 경우 범위 정보(최솟값, 현재 값, 최댓값)를 포함합니다.

자세한 정보는 [접근성 가이드](accessibility.md#accessibilityvalue)를 참조하세요.

| Type                                                            |
| --------------------------------------------------------------- |
| object: `{min: number, max: number, now: number, text: string}` |

---

### `aria-valuemax`

슬라이더 및 프로그레스 바와 같은 범위 기반 컴포넌트의 최댓값을 나타냅니다. `accessibilityValue` prop의 `max` 값보다 우선합니다.

| Type   |
| ------ |
| number |

---

### `aria-valuemin`

슬라이더 및 프로그레스 바와 같은 범위 기반 컴포넌트의 최솟값을 나타냅니다. `accessibilityValue` prop의 `min` 값보다 우선합니다.

| Type   |
| ------ |
| number |

---

### `aria-valuenow`

슬라이더 및 프로그레스 바와 같은 범위 기반 컴포넌트의 현재 값을 나타냅니다. `accessibilityValue` prop의 `now` 값보다 우선합니다.

| Type   |
| ------ |
| number |

---

### `aria-valuetext`

컴포넌트의 텍스트 설명을 나타냅니다. `accessibilityValue` prop의 `text` 값보다 우선합니다.

| Type   |
| ------ |
| string |

---

### `delayLongPress`

`onPressIn` 이후 `onLongPress`가 호출되기까지의 지속 시간(밀리초)입니다.

| Type   |
| ------ |
| number |

---

### `delayPressIn`

터치 시작부터 `onPressIn`이 호출되기까지의 지속 시간(밀리초)입니다.

| Type   |
| ------ |
| number |

---

### `delayPressOut`

터치 해제부터 `onPressOut`이 호출되기까지의 지속 시간(밀리초)입니다.

| Type   |
| ------ |
| number |

---

### `disabled`

true이면 이 컴포넌트의 모든 상호작용을 비활성화합니다.

| Type |
| ---- |
| bool |

---

### `hitSlop`

버튼에서 터치를 시작할 수 있는 거리를 정의합니다. 버튼 밖으로 이동할 때 `pressRetentionOffset`에 추가됩니다.

:::note
터치 영역은 부모 View의 경계를 벗어나지 않으며, 터치가 겹치는 두 View에 닿을 경우 형제 View의 Z-인덱스가 항상 우선합니다.
:::

| Type                   |
| ---------------------- |
| [Rect](rect) or number |

### `id`

네이티브 코드에서 이 View를 찾는 데 사용됩니다. `nativeID` prop보다 우선합니다.

| Type   |
| ------ |
| string |

---

### `onBlur`

항목이 포커스를 잃을 때 호출됩니다.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onFocus`

항목이 포커스를 받을 때 호출됩니다.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onLayout`

마운트 시 및 레이아웃 변경 시 호출됩니다.

| Type                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onLongPress`

`onPressIn` 이후 370밀리초 이상 지속될 경우 호출됩니다. 이 시간은 [`delayLongPress`](#delaylongpress)로 커스터마이징할 수 있습니다.

| Type     |
| -------- |
| function |

---

### `onPress`

터치가 해제될 때(단, 취소된 경우 제외, 예: 리스폰더 잠금을 빼앗는 스크롤에 의해) 호출됩니다. 첫 번째 함수 인수는 [PressEvent](pressevent) 형태의 이벤트입니다.

| Type     |
| -------- |
| function |

---

### `onPressIn`

터치 가능 요소가 눌리는 즉시 호출되며 onPress보다 먼저 호출됩니다. 네트워크 요청을 할 때 유용할 수 있습니다. 첫 번째 함수 인수는 [PressEvent](pressevent) 형태의 이벤트입니다.

| Type     |
| -------- |
| function |

---

### `onPressOut`

onPress보다 먼저 터치가 해제되는 즉시 호출됩니다. 첫 번째 함수 인수는 [PressEvent](pressevent) 형태의 이벤트입니다.

| Type     |
| -------- |
| function |

---

### `pressRetentionOffset`

스크롤 View가 비활성화된 경우, 버튼을 비활성화하기 전에 터치가 버튼 밖으로 얼마나 이동할 수 있는지를 정의합니다. 비활성화된 후 다시 이동하면 버튼이 다시 활성화됩니다! 스크롤 View가 비활성화된 동안 여러 번 앞뒤로 이동해보세요. 메모리 할당을 줄이기 위해 상수를 전달하세요.

| Type                   |
| ---------------------- |
| [Rect](rect) or number |

---

### `nativeID`

| Type   |
| ------ |
| string |

---

### `testID`

end-to-end 테스트에서 이 View를 찾는 데 사용됩니다.

| Type   |
| ------ |
| string |

---

### `touchSoundDisabled` <div className="label android">Android</div>

true이면 터치 시 시스템 소리를 재생하지 않습니다.

| Type    |
| ------- |
| Boolean |
