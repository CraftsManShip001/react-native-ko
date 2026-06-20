---
id: accessibility
title: Accessibility
description: React Native의 Android 및 iOS와 함께 동작하도록 설계된 API 모음을 활용하여 보조 기술에 접근 가능한 모바일 앱을 만드세요.
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

Android와 iOS 모두 VoiceOver(iOS)와 TalkBack(Android)과 같은 내장 화면 리더를 포함한 보조 기술과 앱을 통합하기 위한 API를 제공합니다. React Native는 모든 사용자를 수용할 수 있도록 보완적인 API를 제공합니다.

:::info
Android와 iOS는 접근성 처리 방식에 약간의 차이가 있으므로, React Native 구현도 플랫폼에 따라 다를 수 있습니다.
:::

## 접근성 props

### `accessible`

`true`로 설정하면 해당 뷰가 화면 리더 및 하드웨어 키보드와 같은 보조 기술에 의해 발견 가능하다는 것을 나타냅니다. 이것이 반드시 VoiceOver나 TalkBack의 포커스를 받는다는 의미는 아닙니다. VoiceOver가 중첩된 접근성 요소를 허용하지 않거나, TalkBack이 일부 상위 요소에 포커스를 맞추도록 선택하는 경우 등 여러 이유가 있을 수 있습니다.

기본적으로 모든 터치 가능한 요소는 접근 가능합니다.

Android에서 `accessible`은 네이티브 [`focusable`](<https://developer.android.com/reference/android/view/View#setFocusable(boolean)>)로 변환됩니다. iOS에서는 네이티브 [`isAccessibilityElement`](https://developer.apple.com/documentation/uikit/uiaccessibilityelement/isaccessibilityelement?language=objc)로 변환됩니다.

```tsx
<View>
  <View accessible={true} />
  <View />
</View>
```

위 예제에서 접근성 포커스는 `accessible` props가 있는 첫 번째 자식 뷰에서만 사용 가능하며, `accessible`이 없는 부모나 형제 요소에는 적용되지 않습니다.

### `accessibilityLabel`

뷰가 접근 가능하다고 표시된 경우, VoiceOver나 TalkBack 사용자가 선택한 요소를 알 수 있도록 뷰에 `accessibilityLabel`을 설정하는 것이 좋습니다. 화면 리더는 연관된 요소가 선택될 때 이 문자열을 읽어줍니다.

사용하려면 View, Text, 또는 Touchable에서 `accessibilityLabel` props를 사용자 정의 문자열로 설정하세요:

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Tap me!"
  onPress={onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Press me!</Text>
  </View>
</TouchableOpacity>
```

위 예제에서 TouchableOpacity 요소의 `accessibilityLabel`은 기본적으로 "Press me!"가 됩니다. 레이블은 모든 Text 노드 자식을 공백으로 연결하여 구성됩니다.

### `accessibilityLabelledBy` <div className="label android">Android</div>

복잡한 폼을 구성하는 데 사용되는 다른 요소의 [nativeID](view.md#nativeid) 참조입니다.
`accessibilityLabelledBy`의 값은 관련 요소의 `nativeID`와 일치해야 합니다:

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput
    accessibilityLabel="input"
    accessibilityLabelledBy="formLabel"
  />
</View>
```

위 예제에서 화면 리더는 TextInput에 포커스가 맞춰지면 `Input, Edit Box for Label for Input Field`를 읽어줍니다.

### `accessibilityHint`

접근성 힌트는 접근성 레이블만으로는 결과가 명확하지 않을 때 사용자에게 추가적인 맥락을 제공하는 데 사용할 수 있습니다.

View, Text, 또는 Touchable에서 `accessibilityHint` props를 사용자 정의 문자열로 설정하세요:

```tsx
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Go back"
  accessibilityHint="Navigates to the previous screen"
  onPress={onPress}>
  <View style={styles.button}>
    <Text style={styles.buttonText}>Back</Text>
  </View>
</TouchableOpacity>
```

<div className="label ios basic">iOS</div>

위 예제에서 VoiceOver는 사용자가 기기의 VoiceOver 설정에서 힌트를 활성화한 경우 레이블 다음에 힌트를 읽어줍니다. `accessibilityHint` 가이드라인에 대한 자세한 내용은 [iOS 개발자 문서](https://developer.apple.com/documentation/objectivec/nsobject/1615093-accessibilityhint)를 참고하세요.

<div className="label android basic">Android</div>

위 예제에서 TalkBack은 레이블 다음에 힌트를 읽어줍니다. 현재 Android에서는 힌트를 비활성화할 수 없습니다.

### `accessibilityLanguage` <div className="label ios">iOS</div>

`accessibilityLanguage` props를 사용하면 화면 리더가 요소의 **레이블**, **값**, **힌트**를 읽을 때 사용할 언어를 인식합니다. 제공된 문자열 값은 [BCP 47 사양](https://www.rfc-editor.org/info/bcp47)을 따라야 합니다.

```tsx
<View
  accessible={true}
  accessibilityLabel="Pizza"
  accessibilityLanguage="it-IT">
  <Text>🍕</Text>
</View>
```

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

화면 색상 반전은 색맹, 저시력, 시각 장애가 있는 사람들을 위해 iOS 및 iPadOS에서 사용할 수 있는 접근성 기능입니다. 이 설정이 켜져 있을 때 반전하지 않으려는 뷰(예: 사진)가 있다면 이 props를 `true`로 설정하세요.

### `accessibilityLiveRegion` <div className="label android">Android</div>

컴포넌트가 동적으로 변경될 때 TalkBack이 최종 사용자에게 알림을 줄 수 있습니다. 이는 `accessibilityLiveRegion` props를 통해 가능합니다. `none`, `polite`, `assertive`로 설정할 수 있습니다:

- **none** 접근성 서비스가 이 뷰의 변경 사항을 알리지 않아야 합니다.
- **polite** 접근성 서비스가 이 뷰의 변경 사항을 알려야 합니다.
- **assertive** 접근성 서비스가 진행 중인 음성을 중단하고 즉시 이 뷰의 변경 사항을 알려야 합니다.

```tsx
<TouchableWithoutFeedback onPress={addOne}>
  <View style={styles.embedded}>
    <Text>Click me</Text>
  </View>
</TouchableWithoutFeedback>
<Text accessibilityLiveRegion="polite">
  Clicked {count} times
</Text>
```

위 예제에서 `addOne` 메서드는 state 변수 `count`를 변경합니다. TouchableWithoutFeedback이 트리거되면 TalkBack은 `accessibilityLiveRegion="polite"` props 때문에 Text 뷰의 텍스트를 읽어줍니다.

### `accessibilityRole`

`accessibilityRole`은 보조 기술 사용자에게 컴포넌트의 목적을 전달합니다.

`accessibilityRole`은 다음 중 하나일 수 있습니다:

- **adjustable** 요소를 "조정"할 수 있을 때 사용합니다(예: 슬라이더).
- **alert** 요소가 사용자에게 표시해야 할 중요한 텍스트를 포함할 때 사용합니다.
- **button** 요소가 버튼으로 처리되어야 할 때 사용합니다.
- **checkbox** 요소가 체크, 체크 해제 또는 혼합 체크 상태를 가질 수 있는 체크박스를 나타낼 때 사용합니다.
- **combobox** 요소가 사용자가 여러 선택지 중에서 선택할 수 있는 콤보 박스를 나타낼 때 사용합니다.
- **header** 요소가 콘텐츠 섹션의 헤더 역할을 할 때 사용합니다(예: 내비게이션 바의 제목).
- **image** 요소가 이미지로 처리되어야 할 때 사용합니다. 버튼 또는 링크와 결합할 수 있습니다.
- **imagebutton** 요소가 버튼이면서 이미지일 때 사용합니다.
- **keyboardkey** 요소가 키보드 키 역할을 할 때 사용합니다.
- **link** 요소가 링크로 처리되어야 할 때 사용합니다.
- **menu** 컴포넌트가 선택 메뉴일 때 사용합니다.
- **menubar** 컴포넌트가 여러 메뉴의 컨테이너일 때 사용합니다.
- **menuitem** 메뉴 내의 항목을 나타낼 때 사용합니다.
- **none** 요소에 역할이 없을 때 사용합니다.
- **progressbar** 작업의 진행 상황을 나타내는 컴포넌트를 나타낼 때 사용합니다.
- **radio** 라디오 버튼을 나타낼 때 사용합니다.
- **radiogroup** 라디오 버튼 그룹을 나타낼 때 사용합니다.
- **scrollbar** 스크롤 바를 나타낼 때 사용합니다.
- **search** 텍스트 필드 요소가 검색 필드로도 처리되어야 할 때 사용합니다.
- **spinbutton** 선택 목록을 여는 버튼을 나타낼 때 사용합니다.
- **summary** 앱이 처음 실행될 때 앱의 현재 상태에 대한 빠른 요약을 제공하는 데 사용할 수 있는 요소일 때 사용합니다.
- **switch** 켜고 끌 수 있는 스위치를 나타낼 때 사용합니다.
- **tab** 탭을 나타낼 때 사용합니다.
- **tablist** 탭 목록을 나타낼 때 사용합니다.
- **text** 요소가 변경할 수 없는 정적 텍스트로 처리되어야 할 때 사용합니다.
- **timer** 타이머를 나타낼 때 사용합니다.
- **togglebutton** 토글 버튼을 나타낼 때 사용합니다. 버튼이 켜져 있는지 꺼져 있는지를 나타내려면 accessibilityState checked와 함께 사용해야 합니다.
- **toolbar** 툴바(액션 버튼 또는 컴포넌트의 컨테이너)를 나타낼 때 사용합니다.
- **grid** ScrollView, VirtualizedList, FlatList, 또는 SectionList와 함께 그리드를 나타낼 때 사용합니다. Android의 GridView에 그리드 진입/퇴출 알림을 추가합니다.

### `accessibilityShowsLargeContentViewer` <div className="label ios">iOS</div>

사용자가 요소를 길게 누를 때 대형 콘텐츠 뷰어를 표시할지 여부를 결정하는 불리언 값입니다.

iOS 13.0 이상에서 사용 가능합니다.

### `accessibilityLargeContentTitle` <div className="label ios">iOS</div>

대형 콘텐츠 뷰어가 표시될 때 제목으로 사용될 문자열입니다.

`accessibilityShowsLargeContentViewer`가 `true`로 설정되어야 합니다.

```tsx
<View
  accessibilityShowsLargeContentViewer={true}
  accessibilityLargeContentTitle="Home Tab">
  <Text>Home</Text>
</View>
```

### `accessibilityState`

보조 기술 사용자에게 컴포넌트의 현재 상태를 설명합니다.

`accessibilityState`는 객체입니다. 다음 필드를 포함합니다:

| 이름     | 설명                                                                                                            | 타입               | 필수 여부 |
| -------- | --------------------------------------------------------------------------------------------------------------- | ------------------ | -------- |
| disabled | 요소가 비활성화되었는지 여부를 나타냅니다.                                                                       | boolean            | No       |
| selected | 선택 가능한 요소가 현재 선택되어 있는지 여부를 나타냅니다.                                                       | boolean            | No       |
| checked  | 체크 가능한 요소의 상태를 나타냅니다. 이 필드는 불리언 값이나 혼합 체크박스를 나타내는 "mixed" 문자열을 취할 수 있습니다. | boolean or 'mixed' | No       |
| busy     | 요소가 현재 사용 중인지 여부를 나타냅니다.                                                                       | boolean            | No       |
| expanded | 확장 가능한 요소가 현재 확장되어 있는지 축소되어 있는지를 나타냅니다.                                            | boolean            | No       |

사용하려면 특정 정의가 있는 객체로 `accessibilityState`를 설정하세요.

### `accessibilityValue`

컴포넌트의 현재 값을 나타냅니다. 컴포넌트 값의 텍스트 설명이거나, 슬라이더 및 진행 바와 같은 범위 기반 컴포넌트의 경우 범위 정보(최솟값, 현재 값, 최댓값)를 포함합니다.

`accessibilityValue`는 객체입니다. 다음 필드를 포함합니다:

| 이름 | 설명                                                                                       | 타입    | 필수 여부                  |
| ---- | ------------------------------------------------------------------------------------------ | ------- | ------------------------- |
| min  | 이 컴포넌트 범위의 최솟값입니다.                                                            | integer | `now`가 설정된 경우 필수. |
| max  | 이 컴포넌트 범위의 최댓값입니다.                                                            | integer | `now`가 설정된 경우 필수. |
| now  | 이 컴포넌트 범위의 현재 값입니다.                                                           | integer | No                        |
| text | 이 컴포넌트 값의 텍스트 설명입니다. 설정되면 `min`, `now`, `max`를 재정의합니다.            | string  | No                        |

### `accessibilityViewIsModal` <div className="label ios">iOS</div>

VoiceOver가 수신자의 형제 뷰 내의 요소를 무시해야 하는지 여부를 나타내는 불리언 값입니다.

예를 들어, 형제 뷰 `A`와 `B`를 포함하는 창에서 뷰 `B`에 `accessibilityViewIsModal`을 `true`로 설정하면 VoiceOver는 뷰 `A`의 요소를 무시합니다. 반면, 뷰 `B`에 자식 뷰 `C`가 포함되어 있고 뷰 `C`에 `accessibilityViewIsModal`을 `true`로 설정하면 VoiceOver는 뷰 `A`의 요소를 무시하지 않습니다.

### `accessibilityElementsHidden` <div className="label ios">iOS</div>

주어진 접근성 요소와 그 요소가 포함하는 모든 접근성 요소가 숨겨져 있는지 여부를 나타내는 불리언 값입니다.

예를 들어, 형제 뷰 `A`와 `B`를 포함하는 창에서 뷰 `B`에 `accessibilityElementsHidden`을 `true`로 설정하면 VoiceOver는 뷰 `B`와 그 요소를 무시합니다. 이는 Android props `importantForAccessibility="no-hide-descendants"`와 유사합니다.

### `aria-valuemax`

슬라이더 및 진행 바와 같은 범위 기반 컴포넌트의 최댓값을 나타냅니다.

### `aria-valuemin`

슬라이더 및 진행 바와 같은 범위 기반 컴포넌트의 최솟값을 나타냅니다.

### `aria-valuenow`

슬라이더 및 진행 바와 같은 범위 기반 컴포넌트의 현재 값을 나타냅니다.

### `aria-valuetext`

컴포넌트의 텍스트 설명을 나타냅니다.

### `aria-busy`

요소가 수정 중이며 변경이 완료될 때까지 보조 기술이 사용자에게 업데이트를 알리기 전에 기다릴 수 있음을 나타냅니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

### `aria-checked`

체크 가능한 요소의 상태를 나타냅니다. 이 필드는 불리언 값이나 혼합 체크박스를 나타내는 "mixed" 문자열을 취할 수 있습니다.

| 타입             | 기본값 |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

### `aria-disabled`

요소가 인식 가능하지만 비활성화되어 편집하거나 조작할 수 없음을 나타냅니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

### `aria-expanded`

확장 가능한 요소가 현재 확장되어 있는지 축소되어 있는지를 나타냅니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

### `aria-hidden`

요소가 보조 기술에 숨겨져 있는지 여부를 나타냅니다.

예를 들어, 형제 뷰 `A`와 `B`를 포함하는 창에서 뷰 `B`에 `aria-hidden`을 `true`로 설정하면 VoiceOver는 `B` 요소와 그 자식을 무시합니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

### `aria-label`

요소의 이름을 지정하는 데 사용할 수 있는 문자열 값을 정의합니다.

| 타입   |
| ------ |
| string |

### `aria-labelledby` <div className="label android">Android</div>

적용된 요소에 레이블을 지정하는 요소를 식별합니다. `aria-labelledby`의 값은 관련 요소의 [`nativeID`](view.md#nativeid)와 일치해야 합니다:

```tsx
<View>
  <Text nativeID="formLabel">Label for Input Field</Text>
  <TextInput aria-label="input" aria-labelledby="formLabel" />
</View>
```

| 타입   |
| ------ |
| string |

### `aria-live` <div className="label android">Android</div>

요소가 업데이트될 것임을 나타내고, 사용자 에이전트, 보조 기술 및 사용자가 라이브 영역에서 예상할 수 있는 업데이트 유형을 설명합니다.

- **off** 접근성 서비스가 이 뷰의 변경 사항을 알리지 않아야 합니다.
- **polite** 접근성 서비스가 이 뷰의 변경 사항을 알려야 합니다.
- **assertive** 접근성 서비스가 진행 중인 음성을 중단하고 즉시 이 뷰의 변경 사항을 알려야 합니다.

| 타입                                     | 기본값  |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div className="label ios">iOS</div>

VoiceOver가 수신자의 형제 뷰 내의 요소를 무시해야 하는지 여부를 나타내는 불리언 값입니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

### `aria-selected`

선택 가능한 요소가 현재 선택되어 있는지 여부를 나타냅니다.

| 타입    |
| ------- |
| boolean |

### `experimental_accessibilityOrder`

<ExperimentalAPIWarning />

:::note
간결함을 위해 다음 예제에서는 기본 포커스 순서를 결정하는 레이아웃을 제외합니다. 문서 순서가 레이아웃 순서와 일치한다고 가정하세요.
:::

`experimental_accessibilityOrder`를 사용하면 보조 기술이 하위 컴포넌트에 포커스를 맞추는 순서를 정의할 수 있습니다. 순서를 제어하려는 컴포넌트에 설정된 [`nativeIDs`](view.md#nativeid)의 배열입니다. 예를 들어:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
</View>
```

보조 기술은 `nativeID`가 `B`인 `View`, 그다음 `C`, 그다음 `A` 순서로 포커스를 맞춥니다.

`experimental_accessibilityOrder`는 참조하는 컴포넌트의 접근성을 "켜지" 않습니다. 이는 여전히 직접 설정해야 합니다. 위 예제에서 `C`의 `accessible={true}`를 제거하면

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C"/>
</View>
```

`C`가 여전히 `experimental_accessibilityOrder`에 있더라도 새로운 순서는 `B` 다음 `A`가 됩니다.

그러나 `experimental_accessibilityOrder`는 참조하지 않는 컴포넌트의 접근성을 "끕니다".

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C"/>
  <View accessible={true} nativeID="D"/>
</View>
```

위 예제의 순서는 `B`, `C`, `A`가 됩니다. `D`는 포커스를 받지 않습니다. 이런 의미에서 `experimental_accessibilityOrder`는 _전수적(exhaustive)_입니다.

접근 불가능한 컴포넌트를 `experimental_accessibilityOrder`에 포함하는 것이 여전히 유효한 이유가 있습니다. 다음을 고려하세요:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C">
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

포커스 순서는 `B`, `D`, `E`, `F`, `A`가 됩니다. `D`, `E`, `F`는 `experimental_accessibilityOrder`에서 직접 참조되지 않지만, `C`는 직접 참조됩니다. 이 경우 `C`는 _접근성 컨테이너_입니다 — 접근 가능한 요소를 포함하지만, 자체적으로는 접근 가능하지 않습니다. 접근성 컨테이너가 `experimental_accessibilityOrder`에서 참조되면 포함된 요소들의 기본 순서가 적용됩니다. 이런 의미에서 `experimental_accessibilityOrder`는 _중첩 가능(nestable)_합니다.

`experimental_accessibilityOrder`는 다른 `experimental_accessibilityOrder`가 있는 컴포넌트를 참조할 수도 있습니다:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View nativeID="C" experimental_accessibilityOrder={['F', 'E', 'D']}>
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

포커스 순서는 `B`, `F`, `E`, `D`, `A`가 됩니다.

컴포넌트는 접근성 컨테이너이면서 동시에 접근성 요소(`accessible={true}`)가 될 수 없습니다. 따라서 다음과 같은 경우:

```
<View experimental_accessibilityOrder={['B', 'C', 'A']}>
  <View accessible={true} nativeID="A"/>
  <View accessible={true} nativeID="B"/>
  <View accessible={true} nativeID="C" experimental_accessibilityOrder={['F', 'E', 'D']}>
    <View accessible={true} nativeID="D"/>
    <View accessible={true} nativeID="E"/>
    <View accessible={true} nativeID="F"/>
  </View>
</View>
```

포커스 순서는 `B`, `C`, `A`가 됩니다. `D`, `E`, `F`는 더 이상 컨테이너 안에 없으므로 `experimental_accessibilityOrder`의 전수적 특성으로 인해 제외됩니다.

### `importantForAccessibility` <div className="label android">Android</div>

같은 부모를 가진 두 개의 겹치는 UI 컴포넌트의 경우, 기본 접근성 포커스가 예측 불가능한 동작을 할 수 있습니다. `importantForAccessibility` props는 뷰가 접근성 이벤트를 발생시키는지, 접근성 서비스에 보고되는지를 제어하여 이 문제를 해결합니다. `auto`, `yes`, `no`, `no-hide-descendants`(마지막 값은 접근성 서비스가 컴포넌트와 모든 자식을 무시하도록 강제합니다)로 설정할 수 있습니다.

```tsx
<View style={styles.container}>
  <View
    style={[styles.layout, {backgroundColor: 'green'}]}
    importantForAccessibility="yes">
    <Text>First layout</Text>
  </View>
  <View
    style={[styles.layout, {backgroundColor: 'yellow'}]}
    importantForAccessibility="no-hide-descendants">
    <Text>Second layout</Text>
  </View>
</View>
```

위 예제에서 `yellow` 레이아웃과 그 하위 요소는 TalkBack 및 다른 모든 접근성 서비스에서 완전히 보이지 않습니다. 따라서 TalkBack을 혼란스럽게 하지 않고 같은 부모를 가진 겹치는 뷰를 사용할 수 있습니다.

### `onAccessibilityEscape` <div className="label ios">iOS</div>

누군가 두 손가락으로 Z 모양 제스처인 "escape" 제스처를 수행할 때 호출될 사용자 정의 함수를 이 props에 할당하세요. 이스케이프 함수는 사용자 인터페이스에서 계층적으로 뒤로 이동해야 합니다. 이는 내비게이션 계층에서 위나 뒤로 이동하거나 모달 사용자 인터페이스를 닫는 것을 의미할 수 있습니다. 선택된 요소에 `onAccessibilityEscape` 함수가 없으면 시스템은 뷰 계층을 위로 순회하여 해당 함수를 가진 뷰를 찾거나, 찾지 못하면 실패했다는 신호를 냅니다.

### `onAccessibilityTap` <div className="label ios">iOS</div>

이 props를 사용하여 누군가 접근 가능한 요소가 선택된 상태에서 두 번 탭하여 활성화할 때 호출될 사용자 정의 함수를 할당하세요.

### `onMagicTap` <div className="label ios">iOS</div>

누군가 두 손가락으로 두 번 탭하는 "magic tap" 제스처를 수행할 때 호출될 사용자 정의 함수를 이 props에 할당하세요. magic tap 함수는 사용자가 컴포넌트에서 취할 수 있는 가장 관련성 높은 동작을 수행해야 합니다. iPhone의 전화 앱에서 magic tap은 전화를 받거나 현재 통화를 종료합니다. 선택된 요소에 `onMagicTap` 함수가 없으면 시스템은 뷰 계층을 위로 순회하여 해당 함수를 가진 뷰를 찾습니다.

### `role`

`role`은 컴포넌트의 목적을 전달하며 [`accessibilityRole`](accessibility#accessibilityrole) props보다 우선합니다.

`role`은 다음 중 하나일 수 있습니다:

- **alert** 요소가 사용자에게 표시해야 할 중요한 텍스트를 포함할 때 사용합니다.
- **button** 요소가 버튼으로 처리되어야 할 때 사용합니다.
- **checkbox** 요소가 체크, 체크 해제 또는 혼합 체크 상태를 가질 수 있는 체크박스를 나타낼 때 사용합니다.
- **combobox** 요소가 사용자가 여러 선택지 중에서 선택할 수 있는 콤보 박스를 나타낼 때 사용합니다.
- **grid** ScrollView, VirtualizedList, FlatList, 또는 SectionList와 함께 그리드를 나타낼 때 사용합니다. Android의 GridView에 그리드 진입/퇴출 알림을 추가합니다.
- **heading** 요소가 콘텐츠 섹션의 헤더 역할을 할 때 사용합니다(예: 내비게이션 바의 제목).
- **img** 요소가 이미지로 처리되어야 할 때 사용합니다. 예를 들어 버튼 또는 링크와 결합할 수 있습니다.
- **link** 요소가 링크로 처리되어야 할 때 사용합니다.
- **list** 항목 목록을 식별하는 데 사용합니다.
- **listitem** 목록의 항목을 식별하는 데 사용합니다.
- **menu** 컴포넌트가 선택 메뉴일 때 사용합니다.
- **menubar** 컴포넌트가 여러 메뉴의 컨테이너일 때 사용합니다.
- **menuitem** 메뉴 내의 항목을 나타낼 때 사용합니다.
- **none** 요소에 역할이 없을 때 사용합니다.
- **presentation** 요소에 역할이 없을 때 사용합니다.
- **progressbar** 작업의 진행 상황을 나타내는 컴포넌트를 나타낼 때 사용합니다.
- **radio** 라디오 버튼을 나타낼 때 사용합니다.
- **radiogroup** 라디오 버튼 그룹을 나타낼 때 사용합니다.
- **scrollbar** 스크롤 바를 나타낼 때 사용합니다.
- **searchbox** 텍스트 필드 요소가 검색 필드로도 처리되어야 할 때 사용합니다.
- **slider** 요소를 "조정"할 수 있을 때 사용합니다(예: 슬라이더).
- **spinbutton** 선택 목록을 여는 버튼을 나타낼 때 사용합니다.
- **summary** 앱이 처음 실행될 때 앱의 현재 상태에 대한 빠른 요약을 제공하는 데 사용할 수 있는 요소일 때 사용합니다.
- **switch** 켜고 끌 수 있는 스위치를 나타낼 때 사용합니다.
- **tab** 탭을 나타낼 때 사용합니다.
- **tablist** 탭 목록을 나타낼 때 사용합니다.
- **timer** 타이머를 나타낼 때 사용합니다.
- **toolbar** 툴바(액션 버튼 또는 컴포넌트의 컨테이너)를 나타낼 때 사용합니다.

## 접근성 액션

접근성 액션은 보조 기술이 컴포넌트의 액션을 프로그래밍 방식으로 호출할 수 있도록 합니다. 접근성 액션을 지원하려면 컴포넌트가 두 가지 작업을 수행해야 합니다:

- `accessibilityActions` props를 통해 지원하는 액션 목록을 정의합니다.
- 액션 요청을 처리하기 위한 `onAccessibilityAction` 함수를 구현합니다.

`accessibilityActions` props는 액션 객체의 목록을 포함해야 합니다. 각 액션 객체에는 다음 필드가 포함되어야 합니다:

| 이름  | 타입   | 필수 여부 |
| ----- | ------ | -------- |
| name  | string | Yes      |
| label | string | No       |

액션은 버튼 클릭이나 슬라이더 조정과 같은 표준 액션이거나, 이메일 메시지 삭제와 같이 특정 컴포넌트에 특화된 사용자 정의 액션일 수 있습니다. `name` 필드는 표준 및 사용자 정의 액션 모두에 필수이지만, 표준 액션에서는 `label`이 선택 사항입니다.

표준 액션 지원을 추가할 때 `name`은 다음 중 하나여야 합니다:

- `'magicTap'` - iOS 전용 - VoiceOver 포커스가 컴포넌트 위 또는 안에 있는 동안 사용자가 두 손가락으로 두 번 탭했습니다.
- `'escape'` - iOS 전용 - VoiceOver 포커스가 컴포넌트 위 또는 안에 있는 동안 사용자가 두 손가락으로 스크럽 제스처(왼쪽, 오른쪽, 왼쪽)를 수행했습니다.
- `'activate'` - 컴포넌트를 활성화합니다. 보조 기술의 유무에 관계없이 동일한 액션을 수행해야 합니다. 화면 리더 사용자가 컴포넌트를 두 번 탭할 때 실행됩니다.
- `'increment'` - 조정 가능한 컴포넌트를 증가시킵니다. iOS에서는 컴포넌트가 `'adjustable'` 역할을 가지고 사용자가 포커스를 맞추고 위로 스와이프할 때 VoiceOver가 이 액션을 생성합니다. Android에서는 사용자가 컴포넌트에 접근성 포커스를 맞추고 볼륨 업 버튼을 누를 때 TalkBack이 이 액션을 생성합니다.
- `'decrement'` - 조정 가능한 컴포넌트를 감소시킵니다. iOS에서는 컴포넌트가 `'adjustable'` 역할을 가지고 사용자가 포커스를 맞추고 아래로 스와이프할 때 VoiceOver가 이 액션을 생성합니다. Android에서는 사용자가 컴포넌트에 접근성 포커스를 맞추고 볼륨 다운 버튼을 누를 때 TalkBack이 이 액션을 생성합니다.
- `'longpress'` - Android 전용 - 사용자가 컴포넌트에 접근성 포커스를 맞추고 화면에 손가락을 두 번 탭하고 누르고 있을 때 이 액션이 생성됩니다. 보조 기술의 유무에 관계없이 동일한 액션을 수행해야 합니다.
- `'expand'` - Android 전용 - 이 액션은 컴포넌트를 "확장"하여 TalkBack이 "확장됨" 힌트를 알립니다.
- `'collapse'` - Android 전용 - 이 액션은 컴포넌트를 "축소"하여 TalkBack이 "축소됨" 힌트를 알립니다.

표준 액션에서 `label` 필드는 선택 사항이며 보조 기술에서 자주 사용되지 않습니다. 사용자 정의 액션의 경우 사용자에게 표시될 액션 설명이 포함된 지역화된 문자열입니다.

액션 요청을 처리하려면 컴포넌트가 `onAccessibilityAction` 함수를 구현해야 합니다. 이 함수의 유일한 인수는 수행할 액션 이름을 포함하는 이벤트입니다. 아래 RNTester의 예제는 여러 사용자 정의 액션을 정의하고 처리하는 컴포넌트를 만드는 방법을 보여줍니다.

```tsx
<View
  accessible={true}
  accessibilityActions={[
    {name: 'cut', label: 'cut'},
    {name: 'copy', label: 'copy'},
    {name: 'paste', label: 'paste'},
  ]}
  onAccessibilityAction={event => {
    switch (event.nativeEvent.actionName) {
      case 'cut':
        Alert.alert('Alert', 'cut action success');
        break;
      case 'copy':
        Alert.alert('Alert', 'copy action success');
        break;
      case 'paste':
        Alert.alert('Alert', 'paste action success');
        break;
    }
  }}
/>
```

## 화면 리더 활성화 여부 확인

`AccessibilityInfo` API를 사용하면 화면 리더가 현재 활성화되어 있는지 여부를 확인할 수 있습니다. 자세한 내용은 [AccessibilityInfo 문서](accessibilityinfo)를 참고하세요.

## 접근성 이벤트 전송 <div className="label android">Android</div>

때로는 UI 컴포넌트에서 접근성 이벤트를 트리거하는 것이 유용합니다(예: 화면에 사용자 정의 뷰가 나타나거나 뷰에 접근성 포커스를 설정할 때). 네이티브 UIManager 모듈은 이를 위해 'sendAccessibilityEvent' 메서드를 제공합니다. 뷰 태그와 이벤트 유형 두 가지 인수를 받습니다. 지원되는 이벤트 유형은 `typeWindowStateChanged`, `typeViewFocused`, `typeViewClicked`입니다.

```tsx
import {Platform, UIManager, findNodeHandle} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.sendAccessibilityEvent(
    findNodeHandle(this),
    UIManager.AccessibilityEventTypes.typeViewFocused,
  );
}
```

## TalkBack 지원 테스트 <div className="label android">Android</div>

TalkBack을 활성화하려면 Android 기기 또는 에뮬레이터의 설정 앱으로 이동하세요. 접근성을 탭한 다음 TalkBack을 탭하세요. "서비스 사용" 스위치를 토글하여 활성화하거나 비활성화하세요.

Android 에뮬레이터에는 기본적으로 TalkBack이 설치되어 있지 않습니다. Google Play 스토어를 통해 에뮬레이터에 TalkBack을 설치할 수 있습니다. Google Play 스토어가 설치된 에뮬레이터를 선택하세요. Android Studio에서 사용할 수 있습니다.

볼륨 키 단축키를 사용하여 TalkBack을 토글할 수 있습니다. 볼륨 키 단축키를 켜려면 설정 앱으로 이동한 다음 접근성으로 이동하세요. 상단에서 볼륨 키 단축키를 켜세요.

볼륨 키 단축키를 사용하려면 두 볼륨 키를 3초 동안 눌러 접근성 도구를 시작하세요.

또한 원하는 경우 다음 명령어를 사용하여 명령줄에서 TalkBack을 토글할 수 있습니다:

```shell
# disable
adb shell settings put secure enabled_accessibility_services com.android.talkback/com.google.android.marvin.talkback.TalkBackService

# enable
adb shell settings put secure enabled_accessibility_services com.google.android.marvin.talkback/com.google.android.marvin.talkback.TalkBackService
```

## VoiceOver 지원 테스트 <div className="label ios">iOS</div>

iOS 또는 iPadOS 기기에서 VoiceOver를 활성화하려면 설정 앱으로 이동하여 일반을 탭한 다음 접근성을 탭하세요. 거기서 사람들이 기기를 더 쉽게 사용할 수 있도록 하는 많은 도구를 찾을 수 있으며, VoiceOver도 포함되어 있습니다. VoiceOver를 활성화하려면 "시각" 아래의 VoiceOver를 탭하고 상단에 나타나는 스위치를 토글하세요.

접근성 설정의 맨 아래에 "손쉬운 사용 단축키"가 있습니다. 홈 버튼을 세 번 클릭하여 VoiceOver를 토글하는 데 사용할 수 있습니다.

VoiceOver는 시뮬레이터에서 사용할 수 없지만, Xcode의 접근성 검사기를 사용하여 애플리케이션을 통해 macOS VoiceOver를 사용할 수 있습니다. macOS의 VoiceOver는 다양한 경험을 제공할 수 있으므로 항상 기기에서 테스트하는 것이 좋습니다.

## 추가 리소스

- [Making React Native Apps Accessible](https://engineering.fb.com/ios/making-react-native-apps-accessible/)
