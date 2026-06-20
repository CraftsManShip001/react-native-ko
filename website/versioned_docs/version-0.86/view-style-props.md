---
id: view-style-props
title: View Style Props
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';
import {getCoreBranchNameForCurrentVersion} from '@site/src/getCoreBranchNameForCurrentVersion';

### 예시

```SnackPlayer name=ViewStyleProps
import {View, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.top} />
      <View style={styles.middle} />
      <View style={styles.bottom} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: 'beige',
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: 'pink',
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default App;
```

# 레퍼런스

## Props

### `backfaceVisibility`

| 타입                          |
| ----------------------------- |
| enum(`'visible'`, `'hidden'`) |

---

### `backgroundColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `experimental_backgroundImage`

<ExperimentalAPIWarning />

`experimental_backgroundImage`는 웹과 유사한 문법을 사용하여 [`linear-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient) ([0.76.x+](https://github.com/facebook/react-native/blob/main/CHANGELOG-0.7x.md#v0760)) 및 [`radial-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/radial-gradient) ([0.80.x+](https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0800))를 그릴 수 있는 기능을 제공합니다.

```tsx
// Simple usage:
<View style={{
  experimental_backgroundImage: 'linear-gradient(45deg, blue, red)'
}} />
<View style={{
  experimental_backgroundImage: 'radial-gradient(ellipse farthest-corner at 30% 40%, red, blue)'
}} />
```

더 복잡한 사용 예시는 RNTester 앱에서 확인할 수 있습니다(`PlatformColor` 지원 포함):

- <a href={`https://github.com/facebook/react-native/blob/${getCoreBranchNameForCurrentVersion()}/packages/rn-tester/js/examples/LinearGradient/LinearGradientExample.js`}>LinearGradientExample.js</a>
- <a href={`https://github.com/facebook/react-native/blob/${getCoreBranchNameForCurrentVersion()}/packages/rn-tester/js/examples/RadialGradient/RadialGradientExample.js`}>RadialGradientExample.js</a>

| 타입                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string, array of objects: `{type: 'linear-gradient', direction: string, colorStops: object[] }`, `{type: 'radial-gradient', shape: string, position: object, size: string, colorStops: object[] }` |

---

### `borderBottomColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderBlockColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderBlockEndColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderBlockStartColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderBottomEndRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderBottomLeftRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderBottomRightRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderBottomStartRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderStartEndRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderStartStartRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderEndEndRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderEndStartRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderBottomWidth`

| 타입   |
| ------ |
| number |

---

### `borderColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderCurve` <div className="label ios">iOS</div>

iOS 13+에서는 테두리의 모서리 곡선을 변경할 수 있습니다.

| 타입                               |
| ---------------------------------- |
| enum(`'circular'`, `'continuous'`) |

---

### `borderEndColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderLeftColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderLeftWidth`

| 타입   |
| ------ |
| number |

---

### `borderRadius`

둥근 테두리가 보이지 않으면 `overflow: 'hidden'`도 함께 적용해 보세요.

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderRightColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderRightWidth`

| 타입   |
| ------ |
| number |

---

### `borderStartColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderStyle`

| 타입                                    |
| --------------------------------------- |
| enum(`'solid'`, `'dotted'`, `'dashed'`) |

---

### `borderTopColor`

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `borderTopEndRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderTopLeftRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderTopRightRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderTopStartRadius`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderTopWidth`

| 타입                              |
| --------------------------------- |
| number, string (percentage value) |

---

### `borderWidth`

| 타입   |
| ------ |
| number |

### `boxShadow`

:::note
`boxShadow`는 [New Architecture](/architecture/landing-page)에서만 사용 가능합니다. 외부 그림자는 **Android 9+**에서만 지원됩니다. 내부 그림자는 **Android 10+**에서만 지원됩니다.
:::

요소에 그림자 효과를 추가하며, 그림자의 위치, 색상, 크기, 흐림 정도를 제어할 수 있습니다. 이 그림자는 그림자가 _inset_인지 여부에 따라 요소의 테두리 박스 외부 또는 내부에 나타납니다. 이는 [동일한 이름의 웹 스타일 prop](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)의 사양 준수 구현입니다. 사용 가능한 모든 인수에 대한 자세한 내용은 [BoxShadowValue](./boxshadowvalue) 문서를 참조하세요.

이 그림자들을 조합하여 하나의 `boxShadow`가 여러 개의 서로 다른 그림자로 구성될 수 있습니다.

`boxShadow`는 [웹 문법](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow#syntax)을 모방한 문자열 또는 [BoxShadowValue](./boxshadowvalue) 객체 배열을 받습니다.
| 타입 |
| --------------------------- |
| array of BoxShadowValue objects \| string |

### `cursor` <div className="label ios">iOS</div>

iOS 17+에서는 `pointer`로 설정하면 포인터(iOS의 트랙패드나 스타일러스, 또는 visionOS의 사용자 시선)가 뷰 위에 있을 때 호버 효과를 사용할 수 있습니다.

| 타입                        |
| --------------------------- |
| enum(`'auto'`, `'pointer'`) |

---

### `elevation` <div className="label android">Android</div>

Android의 기반이 되는 [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation)를 사용하여 뷰의 고도를 설정합니다. 이를 통해 항목에 그림자 효과를 추가하고 겹치는 뷰의 z-order에 영향을 줍니다. Android 5.0+에서만 지원되며, 이전 버전에서는 효과가 없습니다.

| 타입   |
| ------ |
| number |

---

### `filter`

:::note
`filter`는 [New Architecture](/architecture/landing-page)에서만 사용 가능합니다.
:::

`View`에 그래픽 필터를 추가합니다. 이 필터는 `View`의 그래픽 구성에 대한 개별 변경을 나타내는 임의 개수의 _필터 함수_로 구성됩니다. 유효한 필터 함수의 전체 목록은 아래에 정의되어 있습니다. `filter`는 `View`의 자손 요소와 `View` 자체에 적용됩니다. `filter`는 `overflow: hidden`을 의미하므로 자손 요소는 `View`의 경계에 맞게 잘립니다.

다음 필터 함수는 모든 플랫폼에서 작동합니다:

- `brightness`: `View`의 밝기를 변경합니다. 음수가 아닌 숫자 또는 백분율을 받습니다.
- `opacity`: `View`의 불투명도(알파)를 변경합니다. 음수가 아닌 숫자 또는 백분율을 받습니다.

:::note
성능 및 사양 준수 문제로 인해 iOS에서는 이 두 가지 필터 함수만 사용 가능합니다. UIKit 대신 SwiftUI를 사용하여 이 구현에 대한 잠재적인 해결 방법을 탐색할 계획이 있습니다.
:::

<div className="label basic android">Android</div>

다음 필터 함수는 Android에서만 작동합니다:

- `blur`: [가우시안 블러](https://en.wikipedia.org/wiki/Gaussian_blur)로 `View`를 흐리게 합니다. 지정된 길이가 블러링 알고리즘에 사용되는 반경을 나타냅니다. 음수가 아닌 DIP 값이 유효합니다(백분율 불가). 값이 클수록 더 흐려집니다.
- `contrast`: `View`의 대비를 변경합니다. 음수가 아닌 숫자 또는 백분율을 받습니다.
- `dropShadow`: `View`의 알파 마스크 주변에 그림자를 추가합니다(알파 값이 0이 아닌 픽셀만 그림자를 드리웁니다). 그림자 색상을 나타내는 선택적 색상과 2개 또는 3개의 길이를 받습니다. 2개의 길이가 지정된 경우 각각 X 및 Y 방향으로 그림자를 이동시키는 `offsetX`와 `offsetY`로 해석됩니다. 3번째 길이가 주어진 경우 그림자에 사용되는 가우시안 블러의 표준 편차로 해석되므로 값이 클수록 그림자가 더 흐려집니다. 인수에 대한 자세한 내용은 [DropShadowValue](./dropshadowvalue.md)를 참조하세요.
- `grayscale`: `View`를 지정된 양만큼 [그레이스케일](https://en.wikipedia.org/wiki/Grayscale)로 변환합니다. 음수가 아닌 숫자 또는 백분율을 받으며, `1` 또는 `100%`는 완전한 그레이스케일을 나타냅니다.
- `hueRotate`: View의 [색조](https://en.wikipedia.org/wiki/Hue)를 변경합니다. 이 함수의 인수는 색조가 회전될 색상 휠의 각도를 정의하므로 예를 들어 `360deg`는 효과가 없습니다. 이 각도는 `deg` 또는 `rad` 단위를 가질 수 있습니다.
- `invert`: `View`의 색상을 반전시킵니다. 음수가 아닌 숫자 또는 백분율을 받으며, `1` 또는 `100%`는 완전한 반전을 나타냅니다.
- `sepia`: `View`를 [세피아](<https://en.wikipedia.org/wiki/Sepia_(color)>)로 변환합니다. 음수가 아닌 숫자 또는 백분율을 받으며, `1` 또는 `100%`는 완전한 세피아를 나타냅니다.
- `saturate`: `View`의 [채도](https://en.wikipedia.org/wiki/Colorfulness)를 변경합니다. 음수가 아닌 숫자 또는 백분율을 받습니다.

:::note
`blur`와 `dropShadow`는 **Android 12+**에서만 지원됩니다.
:::

`filter`는 위의 필터 함수들로 구성된 객체 배열 또는 [웹 문법](https://developer.mozilla.org/en-US/docs/Web/CSS/filter#syntax)을 모방한 문자열을 받습니다.
| 타입 |
| ------ |
| array of objects: `{brightness: number\|string}`, `{opacity: number\|string}`, `{blur: number\|string}`, `{contrast: number\|string}`, `{dropShadow: DropShadowValue\|string}`, `{grayscale: number\|string}`, `{hueRotate: number\|string}`, `{invert: number\|string}`, `{sepia: number\|string}`, `{saturate: number\|string}` or string|

---

### `mixBlendMode`

:::note
`mixBlendMode`는 [New Architecture](/architecture/landing-page)와 **Android 10+**에서만 사용 가능합니다.
:::

`View`의 색상이 **쌓임 맥락(stacking context)**의 다른 요소들과 어떻게 혼합되는지 제어합니다. 각 혼합 함수에 대한 전체 개요는 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)를 참조하세요.

혼합되는 대상을 더 세밀하게 제어하려면 [isolation](layout-props#isolation)을 참조하세요.

##### mixBlendMode 값

- `normal`: 요소가 블렌딩 없이 배경 위에 그려집니다.
- `multiply`: 소스 색상이 대상 색상과 곱해져 대상을 대체합니다.
- `screen`: 배경과 소스 색상 값의 보색을 곱한 다음 결과의 보색을 취합니다.
- `overlay`: 배경 색상 값에 따라 색상을 곱하거나 스크린합니다.
- `darken`: 배경과 소스 색상 중 더 어두운 색상을 선택합니다.
- `lighten`: 배경과 소스 색상 중 더 밝은 색상을 선택합니다.
- `color-dodge`: 소스 색상을 반영하기 위해 배경 색상을 밝게 합니다. 검은색으로 그리면 변화가 없습니다.
- `color-burn`: 소스 색상을 반영하기 위해 배경 색상을 어둡게 합니다. 흰색으로 그리면 변화가 없습니다.
- `hard-light`: 소스 색상 값에 따라 색상을 곱하거나 스크린합니다. 효과는 배경에 강한 스포트라이트를 비추는 것과 유사합니다.
- `soft-light`: 소스 색상 값에 따라 색상을 어둡게 하거나 밝게 합니다. 효과는 배경에 부드러운 스포트라이트를 비추는 것과 유사합니다.
- `difference`: 두 구성 색상 중 더 어두운 색상을 더 밝은 색상에서 뺍니다.
- `exclusion`: Difference 모드와 유사하지만 대비가 낮은 효과를 생성합니다.
- `hue`: 소스 색상의 색조와 배경 색상의 채도 및 밝기를 가진 색상을 만듭니다.
- `saturation`: 소스 색상의 채도와 배경 색상의 색조 및 밝기를 가진 색상을 만듭니다.
- `color`: 소스 색상의 색조와 채도, 배경 색상의 밝기를 가진 색상을 만듭니다. 배경의 회색 수준을 유지하므로 흑백 이미지를 채색하거나 컬러 이미지를 틴팅하는 데 유용합니다.
- `luminosity`: 소스 색상의 밝기와 배경 색상의 색조 및 채도를 가진 색상을 만듭니다. Color 모드의 반대 효과를 생성합니다.
- `plus-lighter`: 소스와 대상 색상 채널을 더하고 각 채널을 최대값으로 클램핑합니다.

| 타입                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| enum(`'normal'`, `'multiply'`, `'screen'`, `'overlay'`, `'darken'`, `'lighten'`, `'color-dodge'`, `'color-burn'`, `'hard-light'`, `'soft-light'`, `'difference'`, `'exclusion'`, `'hue'`, `'saturation'`, `'color'`, `'luminosity'`, `'plus-lighter'`) |

---

### `opacity`

| 타입   |
| ------ |
| number |

---

### `outlineColor`

:::note
`outlineColor`는 [New Architecture](/architecture/landing-page)에서만 사용 가능합니다.
:::

요소의 아웃라인 색상을 설정합니다. 자세한 내용은 [웹 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color)를 참조하세요.

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `outlineOffset`

:::note
`outlineOffset`는 [New Architecture](/architecture/landing-page)에서만 사용 가능합니다.
:::

아웃라인과 요소의 경계 사이의 공간 크기를 설정합니다. 레이아웃에는 영향을 주지 않습니다. 자세한 내용은 [웹 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset)를 참조하세요.

| 타입   |
| ------ |
| number |

---

### `outlineStyle`

:::note
`outlineStyle`는 [New Architecture](/architecture/landing-page)에서만 사용 가능합니다.
:::

요소의 아웃라인 스타일을 설정합니다. 자세한 내용은 [웹 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style)를 참조하세요.

| 타입                                    |
| --------------------------------------- |
| enum(`'solid'`, `'dotted'`, `'dashed'`) |

---

### `outlineWidth`

:::note
`outlineWidth`는 [New Architecture](/architecture/landing-page)에서만 사용 가능합니다.
:::

테두리 외부의 요소 주변에 그려지는 아웃라인의 너비입니다. 레이아웃에는 영향을 주지 않습니다. 자세한 내용은 [웹 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width)를 참조하세요.

| 타입   |
| ------ |
| number |

---

### `pointerEvents`

`View`가 터치 이벤트의 대상이 될 수 있는지를 제어합니다.

- `'auto'`: View가 터치 이벤트의 대상이 될 수 있습니다.
- `'none'`: View는 터치 이벤트의 대상이 될 수 없습니다.
- `'box-none'`: View는 터치 이벤트의 대상이 될 수 없지만 하위 뷰는 될 수 있습니다.
- `'box-only'`: View는 터치 이벤트의 대상이 될 수 있지만 하위 뷰는 될 수 없습니다.

| 타입                                                  |
| ----------------------------------------------------- |
| enum(`'auto'`, `'box-none'`, `'box-only'`, `'none'` ) |
