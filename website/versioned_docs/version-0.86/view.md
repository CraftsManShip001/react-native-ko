---
id: view
title: View
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

UI를 구축하기 위한 가장 기본적인 컴포넌트인 `View`는 [flexbox](flexbox.md), [스타일](style.md), [일부 터치 처리](handling-touches.md), [접근성](accessibility.md) 컨트롤을 지원하는 레이아웃 컨테이너입니다. `View`는 React Native가 실행되는 플랫폼에 따라 `UIView`, `<div>`, `android.view` 등 네이티브 뷰에 직접 매핑됩니다.

`View`는 다른 뷰 내부에 중첩되도록 설계되었으며 0개에서 여러 개의 임의 타입 자식 요소를 가질 수 있습니다.

이 예시에서는 색상이 있는 두 박스와 텍스트 컴포넌트를 패딩이 있는 행으로 감싸는 `View`를 만듭니다.

```SnackPlayer name=View%20Example
import {View, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ViewBoxesWithColorAndText = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flexDirection: 'row'}}>
        <View style={{height: 100, backgroundColor: 'blue', flex: 0.2}} />
        <View style={{height: 100, backgroundColor: 'red', flex: 0.4}} />
        <Text>Hello World!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ViewBoxesWithColorAndText;
```

:::note
`View`는 명확성과 성능을 위해 [`StyleSheet`](style.md)과 함께 사용하도록 설계되었지만, 인라인 스타일도 지원됩니다.
:::

### 합성 터치 이벤트

`View` 리스폰더 props(예: `onResponderMove`)에 전달되는 합성 터치 이벤트는 [PressEvent](pressevent) 형식입니다.

---

# 레퍼런스

## Props

---

### `accessibilityActions`

접근성 액션을 통해 보조 기술이 컴포넌트의 액션을 프로그래밍 방식으로 호출할 수 있습니다. `accessibilityActions` 속성에는 액션 객체의 목록이 포함되어야 합니다. 각 액션 객체에는 name과 label 필드가 포함되어야 합니다.

자세한 내용은 [접근성 가이드](accessibility.md#접근성-액션)를 참조하세요.

| 타입  |
| ----- |
| array |

---

### `accessibilityElementsHidden` <div className="label ios">iOS</div>

주어진 접근성 요소와 이를 포함하는 접근성 요소가 숨겨져 있는지를 나타내는 불리언 값입니다. 기본값은 `false`입니다.

자세한 내용은 [접근성 가이드](accessibility.md#accessibilityelementshidden-ios)를 참조하세요.

| 타입 |
| ---- |
| bool |

---

### `accessibilityHint`

접근성 힌트는 접근성 레이블에서 결과가 명확하지 않을 때 사용자가 접근성 요소에 대한 액션을 수행했을 때 어떤 일이 발생하는지 이해하는 데 도움을 줍니다.

| 타입   |
| ------ |
| string |

---

### `accessibilityLanguage` <div className="label ios">iOS</div>

사용자가 요소와 상호작용할 때 스크린 리더가 사용해야 하는 언어를 나타내는 값입니다. [BCP 47 사양](https://www.rfc-editor.org/info/bcp47)을 따라야 합니다.

자세한 내용은 [iOS `accessibilityLanguage` 문서](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage)를 참조하세요.

| 타입   |
| ------ |
| string |

---

### `accessibilityIgnoresInvertColors` <div className="label ios">iOS</div>

색상 반전이 켜져 있을 때 이 뷰가 반전되어야 하는지 여부를 나타내는 값입니다. `true` 값은 색상 반전이 켜져 있어도 뷰가 반전되지 않도록 합니다.

자세한 내용은 [접근성 가이드](accessibility.md#accessibilityignoresinvertcolors-ios)를 참조하세요.

| 타입 |
| ---- |
| bool |

---

### `accessibilityLabel`

사용자가 요소와 상호작용할 때 스크린 리더가 읽는 텍스트를 재정의합니다. 기본값으로는 모든 자식 요소를 탐색하고 공백으로 구분된 모든 `Text` 노드를 누적하여 레이블을 구성합니다.

| 타입   |
| ------ |
| string |

---

### `accessibilityLiveRegion` <div className="label android">Android</div>

이 뷰가 변경될 때 사용자에게 알려야 하는지를 접근성 서비스에 알립니다. Android API >= 19에서만 작동합니다. 가능한 값:

- `'none'` - 접근성 서비스가 이 뷰의 변경 사항을 알리지 않아야 합니다.
- `'polite'`- 접근성 서비스가 이 뷰의 변경 사항을 알려야 합니다.
- `'assertive'` - 접근성 서비스가 진행 중인 음성을 중단하고 즉시 이 뷰의 변경 사항을 알려야 합니다.

참조는 [Android `View` 문서](https://developer.android.com/reference/android/view/View.html#attr_android:accessibilityLiveRegion)를 참조하세요.

| 타입                                |
| ----------------------------------- |
| enum('none', 'polite', 'assertive') |

---

### `accessibilityRole`

`accessibilityRole`은 보조 기술 사용자에게 컴포넌트의 목적을 전달합니다.

`accessibilityRole`은 다음 중 하나일 수 있습니다:

- `'none'` - 요소에 역할이 없을 때 사용합니다.
- `'button'` - 요소를 버튼으로 처리해야 할 때 사용합니다.
- `'link'` - 요소를 링크로 처리해야 할 때 사용합니다.
- `'search'` - 텍스트 필드 요소를 검색 필드로도 처리해야 할 때 사용합니다.
- `'image'` - 요소를 이미지로 처리해야 할 때 사용합니다. 예를 들어 버튼이나 링크와 결합할 수 있습니다.
- `'keyboardkey'` - 요소가 키보드 키 역할을 할 때 사용합니다.
- `'text'` - 요소를 변경할 수 없는 정적 텍스트로 처리해야 할 때 사용합니다.
- `'adjustable'` - 요소를 "조정"할 수 있을 때 사용합니다(예: 슬라이더).
- `'imagebutton'` - 요소를 버튼으로 처리해야 하고 이미지이기도 할 때 사용합니다.
- `'header'` - 요소가 콘텐츠 섹션의 헤더 역할을 할 때 사용합니다(예: 내비게이션 바의 제목).
- `'summary'` - 앱이 처음 실행될 때 앱의 현재 상태에 대한 빠른 요약을 제공하는 데 사용할 수 있는 요소에 사용합니다.
- `'alert'` - 사용자에게 제공해야 하는 중요한 텍스트를 포함하는 요소에 사용합니다.
- `'checkbox'` - 체크, 미체크 또는 혼합 체크 상태를 가질 수 있는 체크박스를 나타내는 요소에 사용합니다.
- `'combobox'` - 여러 선택지 중에서 선택할 수 있는 콤보 박스를 나타내는 요소에 사용합니다.
- `'menu'` - 컴포넌트가 선택지 메뉴일 때 사용합니다.
- `'menubar'` - 컴포넌트가 여러 메뉴의 컨테이너일 때 사용합니다.
- `'menuitem'` - 메뉴 내의 항목을 나타내는 데 사용합니다.
- `'progressbar'` - 작업의 진행 상황을 나타내는 컴포넌트를 나타내는 데 사용합니다.
- `'radio'` - 라디오 버튼을 나타내는 데 사용합니다.
- `'radiogroup'` - 라디오 버튼 그룹을 나타내는 데 사용합니다.
- `'scrollbar'` - 스크롤 바를 나타내는 데 사용합니다.
- `'spinbutton'` - 선택지 목록을 여는 버튼을 나타내는 데 사용합니다.
- `'switch'` - 켜고 끌 수 있는 스위치를 나타내는 데 사용합니다.
- `'tab'` - 탭을 나타내는 데 사용합니다.
- `'tablist'` - 탭 목록을 나타내는 데 사용합니다.
- `'timer'` - 타이머를 나타내는 데 사용합니다.
- `'toolbar'` - 도구 모음(액션 버튼이나 컴포넌트의 컨테이너)을 나타내는 데 사용합니다.
- `'grid'` - ScrollView, VirtualizedList, FlatList, 또는 SectionList와 함께 사용하여 그리드를 나타냅니다. Android GridView의 그리드 진입/진출 알림을 추가합니다.

| 타입   |
| ------ |
| string |

---

### `accessibilityState`

보조 기술 사용자에게 컴포넌트의 현재 상태를 설명합니다.

자세한 내용은 [접근성 가이드](accessibility.md#accessibilitystate)를 참조하세요.

| 타입                                                                                             |
| ------------------------------------------------------------------------------------------------ |
| object: `{disabled: bool, selected: bool, checked: bool or 'mixed', busy: bool, expanded: bool}` |

---

### `accessibilityValue`

컴포넌트의 현재 값을 나타냅니다. 컴포넌트 값의 텍스트 설명이거나, 슬라이더 및 프로그레스 바와 같은 범위 기반 컴포넌트의 경우 범위 정보(최소값, 현재값, 최대값)를 포함합니다.

자세한 내용은 [접근성 가이드](accessibility.md#accessibilityvalue)를 참조하세요.

| 타입                                                            |
| --------------------------------------------------------------- |
| object: `{min: number, max: number, now: number, text: string}` |

---

### `accessibilityViewIsModal` <div className="label ios">iOS</div>

VoiceOver가 수신자의 형제 뷰 내의 요소를 무시해야 하는지를 나타내는 값입니다. 기본값은 `false`입니다.

자세한 내용은 [접근성 가이드](accessibility.md#accessibilityviewismodal-ios)를 참조하세요.

| 타입 |
| ---- |
| bool |

---

### `accessible`

`true`일 때, 뷰가 접근성 요소임을 나타내며 스크린 리더 및 하드웨어 키보드와 같은 보조 기술로 탐색할 수 있습니다. 기본적으로 모든 터치 가능한 요소는 접근 가능합니다.

자세한 내용은 [접근성 가이드](accessibility.md#accessible)를 참조하세요.

---

### `aria-busy`

요소가 수정 중임을 나타내며, 보조 기술이 업데이트에 대해 사용자에게 알리기 전에 변경이 완료될 때까지 기다릴 수 있습니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

---

### `aria-checked`

체크 가능한 요소의 상태를 나타냅니다. 이 필드는 혼합 체크박스를 나타내기 위해 불리언 또는 "mixed" 문자열을 받을 수 있습니다.

| 타입             | 기본값 |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

---

### `aria-disabled`

요소가 인식 가능하지만 비활성화되어 있어 편집하거나 작동할 수 없음을 나타냅니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

---

### `aria-expanded`

확장 가능한 요소가 현재 확장되어 있는지 또는 축소되어 있는지를 나타냅니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

---

### `aria-hidden`

요소가 보조 기술에서 숨겨져 있는지를 나타냅니다.

예를 들어, 형제 뷰 `A`와 `B`가 포함된 창에서 뷰 `B`의 `aria-hidden`을 `true`로 설정하면 VoiceOver가 `B` 요소와 그 자식 요소를 무시하게 됩니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

---

### `aria-label`

인터랙티브 요소에 레이블을 지정하는 문자열 값을 정의합니다.

| 타입   |
| ------ |
| string |

---

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

---

### `aria-live` <div className="label android">Android</div>

요소가 업데이트될 것임을 나타내며, 사용자 에이전트, 보조 기술, 사용자가 라이브 영역에서 예상할 수 있는 업데이트 유형을 설명합니다.

- **off** 접근성 서비스가 이 뷰의 변경 사항을 알리지 않아야 합니다.
- **polite** 접근성 서비스가 이 뷰의 변경 사항을 알려야 합니다.
- **assertive** 접근성 서비스가 진행 중인 음성을 중단하고 즉시 이 뷰의 변경 사항을 알려야 합니다.

| 타입                                     | 기본값 |
| ---------------------------------------- | ------- |
| enum(`'assertive'`, `'off'`, `'polite'`) | `'off'` |

---

### `aria-modal` <div className="label ios">iOS</div>

VoiceOver가 수신자의 형제 뷰 내의 요소를 무시해야 하는지를 나타내는 불리언 값입니다. [`accessibilityViewIsModal`](#accessibilityviewismodal-ios) prop보다 우선합니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

---

### `aria-selected`

선택 가능한 요소가 현재 선택되어 있는지를 나타냅니다.

| 타입    |
| ------- |
| boolean |

### `aria-valuemax`

슬라이더 및 프로그레스 바와 같은 범위 기반 컴포넌트의 최대값을 나타냅니다. `accessibilityValue` prop의 `max` 값보다 우선합니다.

| 타입   |
| ------ |
| number |

---

### `aria-valuemin`

슬라이더 및 프로그레스 바와 같은 범위 기반 컴포넌트의 최소값을 나타냅니다. `accessibilityValue` prop의 `min` 값보다 우선합니다.

| 타입   |
| ------ |
| number |

---

### `aria-valuenow`

슬라이더 및 프로그레스 바와 같은 범위 기반 컴포넌트의 현재 값을 나타냅니다. `accessibilityValue` prop의 `now` 값보다 우선합니다.

| 타입   |
| ------ |
| number |

---

### `aria-valuetext`

컴포넌트의 텍스트 설명을 나타냅니다. `accessibilityValue` prop의 `text` 값보다 우선합니다.

| 타입   |
| ------ |
| string |

---

### `collapsable`

자식 요소의 레이아웃에만 사용되거나 아무것도 그리지 않는 뷰는 최적화를 위해 네이티브 계층에서 자동으로 제거될 수 있습니다. 이 최적화를 비활성화하고 이 `View`가 네이티브 뷰 계층에 존재하도록 하려면 이 속성을 `false`로 설정하세요.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | true    |

---

### `collapsableChildren`

`false`로 설정하면 뷰의 직접 자식 요소가 네이티브 뷰 계층에서 제거되는 것을 방지합니다. 각 자식에 `collapsable={false}`를 설정하는 것과 유사한 효과입니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | true    |

---

### `experimental_accessibilityOrder`

<ExperimentalAPIWarning />

`experimental_accessibilityOrder`는 보조 기술이 이 `View`의 자손 요소에 포커스를 맞추는 순서를 나타냅니다. 이 prop은 순서가 정의되는 일부 자손 컴포넌트의 [`nativeID`](view.md#nativeid)인 문자열 배열을 받습니다. 이 prop은 접근성 자체를 활성화하지 않으므로 참조된 각 컴포넌트는 [`accessible`](view.md#accessible)을 true로 설정하여 접근 가능하도록 해야 합니다. 이 prop은 **중첩 가능**하고 **완전한** 특성을 가집니다. 즉:

- `experimental_accessibilityOrder`에 접근 불가능한 컴포넌트에 대한 참조가 포함된 경우, 해당 컴포넌트의 자손 요소가 기본 순서로 포커스를 받습니다. 또한, `experimental_accessibilityOrder`를 가진 다른 컴포넌트에 대한 참조도 포함할 수 있습니다.
- 접근 가능한 컴포넌트가 `experimental_accessibilityOrder`에 직접 참조되지 않거나, `experimental_accessibilityOrder`에 직접 참조된 컨테이너 내에 중첩되지 않은 경우, 해당 컴포넌트는 접근 불가능합니다.

자세한 내용은 [접근성 가이드](accessibility.md#experimental_accessibilityorder)를 참조하세요.

| 타입             |
| ---------------- |
| array of strings |

---

### `focusable` <div className="label android">Android</div>

이 `View`가 비터치 입력 장치(예: 하드웨어 키보드)로 포커스를 받을 수 있어야 하는지를 나타냅니다.

| 타입    |
| ------- |
| boolean |

---

### `hitSlop`

터치 이벤트가 뷰에서 얼마나 멀리서 시작될 수 있는지를 정의합니다. 일반적인 인터페이스 가이드라인에서는 최소 30~40포인트/밀도 독립 픽셀의 터치 대상을 권장합니다.

예를 들어, 터치 가능한 뷰의 높이가 20인 경우, `hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}`으로 터치 가능한 높이를 40으로 확장할 수 있습니다.

:::note
터치 영역은 절대 부모 뷰 경계를 벗어나지 않으며, 터치가 겹치는 두 뷰를 동시에 감지하면 형제 뷰의 Z-인덱스가 항상 우선합니다.
:::

| 타입                                                                 |
| -------------------------------------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` |

---

### `id`

네이티브 클래스에서 이 뷰를 찾는 데 사용됩니다. `nativeID` prop보다 우선합니다.

:::warning
이 설정은 이 뷰에 대한 '레이아웃 전용 뷰 제거' 최적화를 비활성화합니다!
:::

| 타입   |
| ------ |
| string |

---

### `importantForAccessibility` <div className="label android">Android</div>

접근성 이벤트를 발생시키는지, 화면을 조회하는 접근성 서비스에 보고되는지에 관한 뷰의 접근성 중요도를 제어합니다. Android에서만 작동합니다.

가능한 값:

- `'auto'` - 시스템이 뷰가 접근성에 중요한지를 결정합니다 - 기본값(권장).
- `'yes'` - 뷰가 접근성에 중요합니다.
- `'no'` - 뷰가 접근성에 중요하지 않습니다.
- `'no-hide-descendants'` - 뷰와 그 자손 뷰 모두 접근성에 중요하지 않습니다.

참조는 [Android `importantForAccessibility` 문서](https://developer.android.com/reference/android/R.attr.html#importantForAccessibility)를 참조하세요.

| 타입                                             |
| ------------------------------------------------ |
| enum('auto', 'yes', 'no', 'no-hide-descendants') |

---

### `nativeID`

네이티브 클래스에서 이 뷰를 찾는 데 사용됩니다.

:::warning
이 설정은 이 뷰에 대한 '레이아웃 전용 뷰 제거' 최적화를 비활성화합니다!
:::

| 타입   |
| ------ |
| string |

---

### `needsOffscreenAlphaCompositing`

100% 정확한 색상과 블렌딩 동작을 유지하기 위해 이 `View`를 오프스크린으로 렌더링하고 알파 값으로 합성해야 하는지를 나타냅니다. 기본값(`false`)은 전체 컴포넌트를 오프스크린으로 렌더링하고 알파 값으로 다시 합성하는 대신, 각 요소를 그리는 데 사용되는 페인트에 알파를 적용하여 컴포넌트와 그 자식 요소를 그리는 방식으로 대체합니다. 이 기본 방식은 여러 겹치는 요소가 있는 `View`(예: 여러 겹치는 `View`, 또는 텍스트와 배경)에 불투명도를 설정할 때 눈에 띄고 원치 않는 결과를 초래할 수 있습니다.

올바른 알파 동작을 유지하기 위한 오프스크린 렌더링은 비용이 매우 많이 들고 네이티브가 아닌 개발자가 디버그하기 어렵기 때문에 기본적으로 활성화되어 있지 않습니다. 애니메이션을 위해 이 속성을 활성화해야 하는 경우 뷰 **콘텐츠**가 정적인 경우(즉, 매 프레임마다 다시 그릴 필요가 없는 경우) renderToHardwareTextureAndroid와 함께 사용하는 것을 고려하세요. 해당 속성이 활성화되면 이 View는 한 번만 오프스크린으로 렌더링되고 하드웨어 텍스처에 저장된 다음, GPU에서 렌더링 대상을 전환할 필요 없이 매 프레임마다 알파 값으로 화면에 합성됩니다.

| 타입 |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

사용자가 아래로 내비게이션할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown)를 참조하세요.

| 타입   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

사용자가 앞으로 내비게이션할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward)를 참조하세요.

| 타입   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

사용자가 왼쪽으로 내비게이션할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft)를 참조하세요.

| 타입   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

사용자가 오른쪽으로 내비게이션할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight)를 참조하세요.

| 타입   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

사용자가 위로 내비게이션할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp)를 참조하세요.

| 타입   |
| ------ |
| number |

---

### `onAccessibilityAction`

사용자가 접근성 액션을 수행할 때 호출됩니다. 이 함수의 유일한 인수는 수행할 액션의 이름을 포함하는 이벤트입니다.

자세한 내용은 [접근성 가이드](accessibility.md#접근성-액션)를 참조하세요.

| 타입     |
| -------- |
| function |

---

### `onAccessibilityEscape` <div className="label ios">iOS</div>

`accessible`이 `true`일 때, 사용자가 이스케이프 제스처를 수행하면 시스템이 이 함수를 호출합니다.

| 타입     |
| -------- |
| function |

---

### `onAccessibilityTap` <div className="label ios">iOS</div>

`accessible`이 true일 때, 사용자가 접근성 탭 제스처를 수행하면 시스템이 이 함수를 호출하려고 시도합니다.

| 타입     |
| -------- |
| function |

---

### `onLayout`

마운트 시 및 레이아웃 변경 시 호출됩니다.

이 이벤트는 레이아웃이 계산된 직후 발생하지만, 레이아웃 애니메이션이 진행 중인 경우 특히, 이벤트가 수신될 때 새 레이아웃이 아직 화면에 반영되지 않을 수 있습니다.

| 타입                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onMagicTap` <div className="label ios">iOS</div>

`accessible`이 `true`일 때, 사용자가 매직 탭 제스처를 수행하면 시스템이 이 함수를 호출합니다.

| 타입     |
| -------- |
| function |

---

### `onMoveShouldSetResponder`

이 뷰가 터치 응답권을 "요청"하려고 하나요? 리스폰더가 아닐 때 `View`의 모든 터치 이동에 대해 호출됩니다.

| 타입                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onMoveShouldSetResponderCapture`

부모 `View`가 자식 `View`가 이동 시 리스폰더가 되는 것을 방지하려는 경우, `true`를 반환하는 이 핸들러를 가져야 합니다.

| 타입                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onResponderGrant`

View가 이제 터치 이벤트에 응답하고 있습니다. 이 시점이 하이라이트를 표시하고 사용자에게 어떤 일이 일어나고 있는지 보여줄 때입니다.

Android에서는 이 콜백에서 true를 반환하면 이 리스폰더가 종료될 때까지 다른 네이티브 컴포넌트가 리스폰더가 되는 것을 방지합니다.

| 타입                                                              |
| ----------------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void ｜ boolean` |

---

### `onResponderMove`

사용자가 손가락을 움직이고 있습니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderReject`

다른 리스폰더가 이미 활성화되어 있으며 리스폰더가 되려는 해당 `View`에 이를 양보하지 않습니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderRelease`

터치가 끝날 때 발생합니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminate`

`View`에서 리스폰더가 해제되었습니다. `onResponderTerminationRequest` 호출 후 다른 뷰가 가져갈 수도 있고, OS가 요청 없이 가져갈 수도 있습니다(예: iOS의 제어 센터/알림 센터에서 발생).

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminationRequest`

다른 `View`가 리스폰더가 되려 하며 이 `View`에 리스폰더를 해제하도록 요청하고 있습니다. `true`를 반환하면 해제를 허용합니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onStartShouldSetResponder`

이 뷰가 터치 시작 시 리스폰더가 되길 원하나요?

| 타입                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onStartShouldSetResponderCapture`

부모 `View`가 자식 `View`가 터치 시작 시 리스폰더가 되는 것을 방지하려는 경우, `true`를 반환하는 이 핸들러를 가져야 합니다.

| 타입                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `pointerEvents`

`View`가 터치 이벤트의 대상이 될 수 있는지를 제어합니다.

- `'auto'`: View가 터치 이벤트의 대상이 될 수 있습니다.
- `'none'`: View는 터치 이벤트의 대상이 될 수 없습니다.
- `'box-none'`: View는 터치 이벤트의 대상이 될 수 없지만 하위 뷰는 될 수 있습니다. CSS에서 다음 클래스를 가진 뷰처럼 동작합니다:

```css
.box-none {
  pointer-events: none;
}
.box-none * {
  pointer-events: auto;
}
```

- `'box-only'`: View는 터치 이벤트의 대상이 될 수 있지만 하위 뷰는 될 수 없습니다. CSS에서 다음 클래스를 가진 뷰처럼 동작합니다:

```css
.box-only {
  pointer-events: auto;
}
.box-only * {
  pointer-events: none;
}
```

| 타입                                         |
| -------------------------------------------- |
| enum('box-none', 'none', 'box-only', 'auto') |

---

### `ref`

마운트 시 [element node](element-nodes)가 할당될 ref 세터입니다.

---

### `removeClippedSubviews`

이것은 `RCTView`가 노출하는 성능 관련 속성으로, 대부분이 오프스크린 상태인 많은 하위 뷰가 있을 때 스크롤 콘텐츠에 유용합니다. 이 속성이 효과적이려면 경계를 벗어나는 많은 하위 뷰를 포함하는 뷰에 적용되어야 합니다. 하위 뷰에도 `overflow: hidden`이 적용되어야 하며, 포함 뷰(또는 상위 뷰 중 하나)에도 마찬가지입니다.

| 타입 |
| ---- |
| bool |

---

### `renderToHardwareTextureAndroid` <div className="label android">Android</div>

이 `View`가 GPU의 단일 하드웨어 텍스처에 자체(및 모든 자식 요소)를 렌더링해야 하는지를 나타냅니다.

Android에서는 불투명도, 회전, 이동 및/또는 크기 조정만 수정하는 애니메이션과 인터랙션에 유용합니다. 이러한 경우 뷰를 다시 그릴 필요가 없으며 디스플레이 목록을 다시 실행할 필요가 없습니다. 텍스처를 재사용하고 다른 파라미터로 다시 합성할 수 있습니다. 단점은 제한된 비디오 메모리를 사용할 수 있으므로 인터랙션/애니메이션이 끝나면 이 prop을 false로 다시 설정해야 합니다.

| 타입 |
| ---- |
| bool |

---

### `role`

`role`은 보조 기술 사용자에게 컴포넌트의 목적을 전달합니다. [`accessibilityRole`](view#accessibilityrole) prop보다 우선합니다.

| 타입                       |
| -------------------------- |
| [Role](accessibility#role) |

---

### `shouldRasterizeIOS` <div className="label ios">iOS</div>

이 `View`를 합성하기 전에 비트맵으로 렌더링해야 하는지를 나타냅니다.

iOS에서는 이 컴포넌트의 크기나 자식 요소를 수정하지 않는 애니메이션과 인터랙션에 유용합니다. 예를 들어, 정적 뷰의 위치를 이동할 때 래스터화를 통해 렌더러가 정적 뷰의 캐시된 비트맵을 재사용하고 각 프레임 동안 빠르게 합성할 수 있습니다.

래스터화는 오프스크린 드로잉 패스를 발생시키고 비트맵이 메모리를 소비합니다. 이 속성을 사용할 때는 테스트하고 측정하세요.

| 타입 |
| ---- |
| bool |

---

### `style`

| 타입                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `tabIndex` <div className="label android">Android</div>

이 `View`가 비터치 입력 장치(예: 하드웨어 키보드)로 포커스를 받을 수 있어야 하는지를 나타냅니다.
다음 값을 지원합니다:

- `0` - View가 포커스를 받을 수 있습니다.
- `-1` - View가 포커스를 받을 수 없습니다.

| 타입        |
| ----------- |
| enum(0, -1) |

---

### `testID`

end-to-end 테스트에서 이 뷰를 찾는 데 사용됩니다.

:::warning
이 설정은 이 뷰에 대한 '레이아웃 전용 뷰 제거' 최적화를 비활성화합니다!
:::

| 타입   |
| ------ |
| string |
