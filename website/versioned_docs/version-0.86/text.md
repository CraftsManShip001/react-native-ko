---
id: text
title: Text
---

텍스트를 표시하기 위한 React 컴포넌트입니다.

`Text`는 중첩, 스타일링, 터치 처리를 지원합니다.

아래 예시에서 중첩된 제목과 본문 텍스트는 `styles.baseText`의 `fontFamily`를 상속받지만, 제목은 자체적인 추가 스타일을 가집니다. 리터럴 줄바꿈 문자로 인해 제목과 본문이 위아래로 쌓입니다.

```SnackPlayer name=Text%20Function%20Component%20Example
import {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInANest = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText} onPress={onPressTitle}>
            {titleText}
            {'\n'}
            {'\n'}
          </Text>
          <Text numberOfLines={5}>{bodyText}</Text>
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TextInANest;
```

## 중첩 텍스트

Android와 iOS 모두 특정 범위에 굵은 글씨나 색상 텍스트(`NSAttributedString` on iOS, `SpannableString` on Android)와 같은 서식을 지정함으로써 서식이 있는 텍스트를 표시할 수 있습니다. 실제로는 매우 번거로운 작업입니다. React Native에서는 동일한 효과를 얻기 위해 텍스트를 중첩하는 웹 패러다임을 채택했습니다.

```SnackPlayer name=Nested%20Text%20Example
import {Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const BoldAndBeautiful = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
});

export default BoldAndBeautiful;
```

내부적으로 React Native는 이를 다음 정보를 담은 평탄한 `NSAttributedString` 또는 `SpannableString`으로 변환합니다.

```
"I am bold and red"
0-9: bold
9-17: bold, red
```

## 컨테이너

`<Text>` 엘리먼트는 레이아웃 측면에서 고유합니다. 내부의 모든 것은 Flexbox 레이아웃이 아닌 텍스트 레이아웃을 사용합니다. 즉, `<Text>` 내부의 엘리먼트는 더 이상 직사각형이 아니며, 줄 끝에서 줄바꿈됩니다.

```tsx
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text 컨테이너: 공간이 허용되면 텍스트가 인라인으로 표시됩니다
// |First part and second part|

// 그렇지 않으면 하나의 텍스트처럼 흐릅니다
// |First part |
// |and second |
// |part       |

<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View 컨테이너: 각 텍스트가 자체 블록을 가집니다
// |First part and|
// |second part   |

// 그렇지 않으면 텍스트가 자체 블록 내에서 흐릅니다
// |First part |
// |and        |
// |second part|
```

## 제한된 스타일 상속

웹에서는 일반적으로 다음과 같이 상속되는 CSS 속성을 활용하여 전체 문서의 글꼴 패밀리와 크기를 설정합니다.

```css
html {
  font-family:
    'lucida grande', tahoma, verdana, arial, sans-serif;
  font-size: 11px;
  color: #141823;
}
```

문서 내 모든 엘리먼트는 자신이나 부모 중 하나가 새 규칙을 지정하지 않는 한 이 글꼴을 상속합니다.

React Native에서는 이에 대해 더 엄격합니다. **모든 텍스트 노드는 `<Text>` 컴포넌트 내부에 감싸야 합니다.** `<View>` 아래에 직접 텍스트 노드를 둘 수 없습니다.

```tsx
// 잘못된 예: <View>의 자식으로 텍스트 노드를 가질 수 없어 예외가 발생합니다
<View>
  Some text
</View>

// 올바른 예
<View>
  <Text>
    Some text
  </Text>
</View>
```

또한 전체 서브트리에 기본 글꼴을 설정하는 기능도 사용할 수 없습니다. 한편, `fontFamily`는 CSS의 `font-family`와 달리 단일 글꼴 이름만 허용합니다. 앱 전체에서 일관된 글꼴과 크기를 사용하는 권장 방법은 글꼴과 크기를 포함하는 `MyAppText` 컴포넌트를 만들고 앱 전체에서 이 컴포넌트를 사용하는 것입니다. 또한 이 컴포넌트를 활용하여 다른 종류의 텍스트를 위한 `MyAppHeaderText`와 같은 더 구체적인 컴포넌트를 만들 수도 있습니다.

```tsx
<View>
  <MyAppText>
    Text styled with the default font for the entire application
  </MyAppText>
  <MyAppHeaderText>Text styled as a header</MyAppHeaderText>
</View>
```

`MyAppText`가 자식 요소를 스타일이 적용된 `Text` 컴포넌트로만 렌더링하는 컴포넌트라고 가정하면, `MyAppHeaderText`는 다음과 같이 정의할 수 있습니다.

```tsx
const MyAppHeaderText = ({children}) => {
  return (
    <MyAppText>
      <Text style={{fontSize: 20}}>{children}</Text>
    </MyAppText>
  );
};
```

이 방식으로 `MyAppText`를 구성하면 최상위 컴포넌트의 스타일을 받으면서도 특정 사용 사례에서 스타일을 추가하거나 재정의할 수 있습니다.

React Native는 여전히 스타일 상속의 개념을 가지고 있지만, 텍스트 서브트리로 제한됩니다. 아래 예시에서 두 번째 부분은 굵은 글씨이면서 동시에 빨간색이 됩니다.

```tsx
<Text style={{fontWeight: 'bold'}}>
  I am bold
  <Text style={{color: 'red'}}>and red</Text>
</Text>
```

텍스트 스타일을 적용하는 이 더 제한된 방식이 더 나은 앱을 만든다고 생각합니다.

- (개발자) React 컴포넌트는 강한 격리를 염두에 두고 설계되었습니다. props가 동일한 한, 앱 어디에서나 컴포넌트를 배치해도 같은 모양과 동작을 하리라고 신뢰할 수 있어야 합니다. props 외부에서 상속될 수 있는 텍스트 속성은 이러한 격리를 깨뜨립니다.

- (구현자) React Native의 구현도 단순화됩니다. 모든 단일 엘리먼트에 `fontFamily` 필드를 가질 필요가 없으며, 텍스트 노드를 표시할 때마다 트리를 루트까지 잠재적으로 탐색할 필요도 없습니다. 스타일 상속은 네이티브 Text 컴포넌트 내부에만 인코딩되어 있으며, 다른 컴포넌트나 시스템 자체에 누출되지 않습니다.

---

# 레퍼런스

## Props

### `accessibilityHint`

접근성 힌트는 접근성 레이블로부터 결과가 명확하지 않을 때, 사용자가 접근성 엘리먼트에서 동작을 수행하면 어떤 일이 발생하는지 이해하는 데 도움을 줍니다.

| 타입   |
| ------ |
| string |

---

### `accessibilityLanguage` <div className="label ios">iOS</div>

사용자가 엘리먼트와 상호작용할 때 스크린 리더가 사용해야 하는 언어를 나타내는 값입니다. [BCP 47 specification](https://www.rfc-editor.org/info/bcp47)을 따라야 합니다.

자세한 내용은 [iOS `accessibilityLanguage` 문서](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage)를 참조하세요.

| 타입   |
| ------ |
| string |

---

### `accessibilityLabel`

사용자가 엘리먼트와 상호작용할 때 스크린 리더가 읽는 텍스트를 재정의합니다. 기본적으로 레이블은 모든 자식 요소를 탐색하고 공백으로 구분된 모든 `Text` 노드를 누적하여 구성됩니다.

| 타입   |
| ------ |
| string |

---

### `accessibilityRole`

스크린 리더에게 현재 포커스된 엘리먼트를 특정 역할을 가진 것으로 처리하도록 지시합니다.

iOS에서 이러한 역할은 해당 Accessibility Traits에 매핑됩니다. 이미지 버튼은 트레이트를 'image'와 'button' 모두로 설정한 것과 동일한 기능을 합니다. 자세한 내용은 [접근성 가이드](accessibility.md)를 참조하세요.

Android에서 이러한 역할은 iOS의 Voiceover에서 Accessibility Traits를 추가하는 것과 유사하게 TalkBack에서 작동합니다.

| 타입                                                 |
| ---------------------------------------------------- |
| [AccessibilityRole](accessibility#accessibilityrole) |

---

### `accessibilityState`

스크린 리더에게 현재 포커스된 엘리먼트가 특정 state에 있음을 알립니다.

하나의 state, state 없음, 또는 여러 state를 제공할 수 있습니다. state는 객체를 통해 전달해야 합니다(예: `{selected: true, disabled: true}`).

| 타입                                                   |
| ------------------------------------------------------ |
| [AccessibilityState](accessibility#accessibilitystate) |

---

### `accessibilityActions`

접근성 동작을 통해 보조 기술이 컴포넌트의 동작을 프로그래밍 방식으로 호출할 수 있습니다. `accessibilityActions` 속성은 동작 객체의 목록을 포함해야 합니다. 각 동작 객체는 필드 이름과 레이블을 포함해야 합니다.

자세한 내용은 [접근성 가이드](accessibility.md#접근성-액션)를 참조하세요.

| 타입  | 필수 여부 |
| ----- | -------- |
| array | No       |

---

### `onAccessibilityAction`

사용자가 접근성 동작을 수행할 때 호출됩니다. 이 함수의 유일한 인수는 수행할 동작의 이름을 포함하는 이벤트입니다.

자세한 내용은 [접근성 가이드](accessibility.md#접근성-액션)를 참조하세요.

| 타입     | 필수 여부 |
| -------- | -------- |
| function | No       |

---

### `accessible`

`true`로 설정하면 해당 뷰가 접근성 엘리먼트임을 나타냅니다.

자세한 내용은 [접근성 가이드](accessibility)를 참조하세요.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | `true`  |

---

### `adjustsFontSizeToFit`

주어진 스타일 제약에 맞게 글꼴 크기가 자동으로 축소되어야 하는지 여부를 지정합니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | `false` |

---

### `allowFontScaling`

텍스트 크기 접근성 설정을 존중하여 글꼴이 스케일링되어야 하는지 여부를 지정합니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | `true`  |

---

### `android_hyphenationFrequency` <div className="label android">Android</div>

Android API 레벨 23 이상에서 단어 분리를 결정할 때 사용할 자동 하이픈 빈도를 설정합니다.

| 타입                                | 기본값  |
| ----------------------------------- | -------- |
| enum(`'none'`, `'normal'`,`'full'`) | `'none'` |

---

### `aria-busy`

엘리먼트가 수정 중이며, 보조 기술이 업데이트에 대해 사용자에게 알리기 전에 변경이 완료될 때까지 기다릴 수 있음을 나타냅니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

---

### `aria-checked`

체크 가능한 엘리먼트의 state를 나타냅니다. 이 필드는 불리언 또는 혼합 체크박스를 나타내기 위한 "mixed" 문자열을 받을 수 있습니다.

| 타입             | 기본값 |
| ---------------- | ------- |
| boolean, 'mixed' | false   |

---

### `aria-disabled`

엘리먼트가 인식 가능하지만 비활성화되어 편집 불가능하거나 작동 불가능한 상태임을 나타냅니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

---

### `aria-expanded`

확장 가능한 엘리먼트가 현재 확장되었는지 접혔는지를 나타냅니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | false   |

---

### `aria-label`

인터랙티브 엘리먼트를 레이블하는 문자열 값을 정의합니다.

| 타입   |
| ------ |
| string |

---

### `aria-selected`

선택 가능한 엘리먼트가 현재 선택되었는지 여부를 나타냅니다.

| 타입    |
| ------- |
| boolean |

### `dataDetectorType` <div className="label android">Android</div>

텍스트 엘리먼트에서 클릭 가능한 URL로 변환되는 데이터 유형을 결정합니다. 기본적으로 어떤 데이터 유형도 감지되지 않습니다.

하나의 유형만 제공할 수 있습니다.

| 타입                                                          | 기본값  |
| ------------------------------------------------------------- | -------- |
| enum(`'phoneNumber'`, `'link'`, `'email'`, `'none'`, `'all'`) | `'none'` |

---

### `disabled` <div className="label android">Android</div>

테스트 목적으로 텍스트 뷰의 비활성화 state를 지정합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `dynamicTypeRamp` <div className="label ios">iOS</div>

iOS에서 이 엘리먼트에 적용할 [Dynamic Type](https://developer.apple.com/documentation/uikit/uifont/scaling_fonts_automatically) 램프입니다.

| 타입                                                                                                                                                     | 기본값  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum(`'caption2'`, `'caption1'`, `'footnote'`, `'subheadline'`, `'callout'`, `'body'`, `'headline'`, `'title3'`, `'title2'`, `'title1'`, `'largeTitle'`) | `'body'` |

---

### `ellipsizeMode`

`numberOfLines`가 설정된 경우, 이 prop은 텍스트가 어떻게 잘릴지를 정의합니다. 이 prop과 함께 `numberOfLines`를 반드시 설정해야 합니다.

다음 값 중 하나일 수 있습니다.

- `head` - 컨테이너에 끝부분이 맞게 줄이 표시되며, 줄 시작 부분의 누락된 텍스트는 말줄임표 기호로 나타납니다(예: "...wxyz").
- `middle` - 컨테이너에 시작과 끝이 맞게 줄이 표시되며, 중간의 누락된 텍스트는 말줄임표 기호로 나타납니다("ab...yz").
- `tail` - 컨테이너에 시작부분이 맞게 줄이 표시되며, 줄 끝부분의 누락된 텍스트는 말줄임표 기호로 나타납니다(예: "abcd...").
- `clip` - 텍스트 컨테이너 가장자리를 넘어 줄이 그려지지 않습니다.

:::note
Android에서 `numberOfLines`를 `1`보다 큰 값으로 설정하면 `tail` 값만 올바르게 작동합니다.
:::

| 타입                                           | 기본값 |
| ---------------------------------------------- | ------- |
| enum(`'head'`, `'middle'`, `'tail'`, `'clip'`) | `tail`  |

---

### `id`

네이티브 코드에서 이 뷰를 찾는 데 사용됩니다. `nativeID` prop보다 우선합니다.

| 타입   |
| ------ |
| string |

---

### `maxFontSizeMultiplier`

`allowFontScaling`이 활성화된 경우 글꼴이 도달할 수 있는 최대 스케일을 지정합니다. 가능한 값:

- `null/undefined`: 부모 노드 또는 전역 기본값(0)에서 상속
- `0`: 최대 없음, 부모/전역 기본값 무시
- `>= 1`: 이 노드의 `maxFontSizeMultiplier`를 이 값으로 설정

| 타입   | 기본값     |
| ------ | ----------- |
| number | `undefined` |

---

### `minimumFontScale`

`adjustsFontSizeToFit`이 활성화된 경우 글꼴이 도달할 수 있는 최소 스케일을 지정합니다(값 범위: 0.01~1.0).

| 타입   |
| ------ |
| number |

---

### `nativeID`

네이티브 코드에서 이 뷰를 찾는 데 사용됩니다.

| 타입   |
| ------ |
| string |

---

### `numberOfLines`

텍스트 레이아웃(줄바꿈 포함)을 계산한 후 말줄임표로 텍스트를 잘라내는 데 사용되며, 총 줄 수가 이 숫자를 초과하지 않도록 합니다. 이 속성을 `0`으로 설정하면 이 값이 해제되어 줄 수 제한이 적용되지 않습니다.

이 prop은 일반적으로 `ellipsizeMode`와 함께 사용됩니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `0`     |

---

### `onLayout`

마운트 시 및 레이아웃 변경 시 호출됩니다.

| 타입                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onLongPress`

길게 누를 때 호출되는 함수입니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onMoveShouldSetResponder`

이 뷰가 터치 응답권을 "요청"할 것인지 여부입니다. 뷰가 응답자가 아닐 때 모든 터치 이동마다 호출됩니다.

| 타입                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onPress`

`onPressOut` 이후 사용자가 누를 때 호출되는 함수입니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressIn`

`onPressOut` 및 `onPress` 이전에 터치가 시작되면 즉시 호출됩니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressOut`

터치가 해제되면 호출됩니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderGrant`

뷰가 이제 터치 이벤트에 응답합니다. 지금이 무언가를 강조 표시하고 사용자에게 무슨 일이 일어나고 있는지 보여줄 때입니다.

Android에서는 이 콜백에서 `true`를 반환하여 이 응답자가 종료될 때까지 다른 네이티브 컴포넌트가 응답자가 되는 것을 방지할 수 있습니다.

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

### `onResponderRelease`

터치가 끝날 때 발생합니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminate`

`View`에서 응답자가 제거되었습니다. `onResponderTerminationRequest` 호출 후 다른 뷰에 의해 가져가거나, OS에 의해 묻지 않고 가져갈 수 있습니다(예: iOS의 컨트롤 센터/알림 센터).

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onResponderTerminationRequest`

다른 `View`가 응답자가 되고 싶어서 이 `View`에 응답자를 해제하도록 요청합니다. `true`를 반환하면 해제를 허용합니다.

| 타입                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onStartShouldSetResponderCapture`

부모 `View`가 터치 시작 시 자식 `View`가 응답자가 되는 것을 방지하려면 이 핸들러가 `true`를 반환해야 합니다.

| 타입                                                      |
| --------------------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)}) => boolean` |

---

### `onTextLayout`

텍스트 레이아웃이 변경될 때 호출됩니다.

| 타입                                                 |
| ---------------------------------------------------- |
| ([`TextLayoutEvent`](text#textlayoutevent)) => mixed |

---

### `pressRetentionOffset`

스크롤 뷰가 비활성화된 경우, 버튼을 비활성화하기 전에 터치가 버튼에서 얼마나 멀리 이동할 수 있는지를 정의합니다. 비활성화된 후 다시 이동하면 버튼이 다시 활성화됩니다! 스크롤 뷰가 비활성화된 동안 여러 번 앞뒤로 이동해 보세요. 메모리 할당을 줄이기 위해 상수를 전달하도록 하세요.

| 타입                 |
| -------------------- |
| [Rect](rect), number |

---

### `ref`

마운트 시 [element node](element-nodes)가 할당되는 ref 세터입니다.

`Text` 컴포넌트는 웹의 단락 엘리먼트(`<p>`)가 텍스트 노드가 아닌 엘리먼트 노드인 것처럼 텍스트 노드를 제공하지 않습니다. 텍스트 노드는 자식 노드로 찾을 수 있습니다.

---

### `role`

`role`은 보조 기술 사용자에게 컴포넌트의 목적을 전달합니다. [`accessibilityRole`](text#accessibilityrole) prop보다 우선합니다.

| 타입                       |
| -------------------------- |
| [Role](accessibility#role) |

---

### `selectable`

사용자가 텍스트를 선택하고 네이티브 복사/붙여넣기 기능을 사용할 수 있게 합니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | `false` |

---

### `selectionColor` <div className="label android">Android</div>

텍스트의 하이라이트 색상입니다.

| 타입            |
| --------------- |
| [color](colors) |

---

### `style`

| 타입                                                                 |
| -------------------------------------------------------------------- |
| [Text Style](text-style-props), [View Style Props](view-style-props) |

---

### `suppressHighlighting` <div className="label ios">iOS</div>

`true`이면 텍스트를 누를 때 시각적 변화가 없습니다. 기본적으로 누를 때 텍스트 위에 회색 타원이 강조 표시됩니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | `false` |

---

### `testID`

엔드-투-엔드 테스트에서 이 뷰를 찾는 데 사용됩니다.

| 타입   |
| ------ |
| string |

---

### `textBreakStrategy` <div className="label android">Android</div>

Android API 레벨 23 이상에서 텍스트 분리 전략을 설정합니다. 가능한 값은 `simple`, `highQuality`, `balanced`입니다.

| 타입                                            | 기본값       |
| ----------------------------------------------- | ------------- |
| enum(`'simple'`, `'highQuality'`, `'balanced'`) | `highQuality` |

---

### `lineBreakStrategyIOS` <div className="label ios">iOS</div>

iOS 14 이상에서 줄 분리 전략을 설정합니다. 가능한 값은 `none`, `standard`, `hangul-word`, `push-out`입니다.

| 타입                                                        | 기본값  |
| ----------------------------------------------------------- | -------- |
| enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` |

## 타입 정의

### TextLayout

`TextLayout` 객체는 [`TextLayoutEvent`](text#textlayoutevent) 콜백의 일부이며 `Text` 줄에 대한 측정 데이터를 포함합니다.

#### 예시

```js
{
    capHeight: 10.496,
    ascender: 14.624,
    descender: 4,
    width: 28.224,
    height: 18.624,
    xHeight: 6.048,
    x: 0,
    y: 0
}
```

#### 속성

| 이름      | 타입   | 선택 여부 | 설명                                                         |
| --------- | ------ | -------- | ------------------------------------------------------------------- |
| ascender  | number | No       | 텍스트 레이아웃 변경 후 줄의 어센더 높이입니다.             |
| capHeight | number | No       | 기준선 위의 대문자 높이입니다.                        |
| descender | number | No       | 텍스트 레이아웃 변경 후 줄의 디센더 높이입니다.            |
| height    | number | No       | 텍스트 레이아웃 변경 후 줄의 높이입니다.                   |
| width     | number | No       | 텍스트 레이아웃 변경 후 줄의 너비입니다.                    |
| x         | number | No       | Text 컴포넌트 내부의 줄 X 좌표입니다.                        |
| xHeight   | number | No       | 기준선과 줄 중앙선(코퍼스 크기) 사이의 거리입니다. |
| y         | number | No       | Text 컴포넌트 내부의 줄 Y 좌표입니다.                        |

### TextLayoutEvent

`TextLayoutEvent` 객체는 컴포넌트 레이아웃 변경의 결과로 콜백에서 반환됩니다. 이 객체에는 렌더링된 모든 텍스트 줄에 해당하는 [`TextLayout`](text#textlayout) 객체 배열을 값으로 갖는 `lines`라는 키가 포함되어 있습니다.

#### 예시

```js
{
  lines: [
    TextLayout,
    TextLayout,
    // ...
  ];
  target: 1127;
}
```

#### 속성

| 이름   | 타입                                    | 선택 여부 | 설명                                           |
| ------ | --------------------------------------- | -------- | ----------------------------------------------------- |
| lines  | array of [TextLayout](text#textlayout)s | No       | 렌더링된 모든 줄에 대한 TextLayout 데이터를 제공합니다. |
| target | number                                  | No       | 엘리먼트의 노드 id입니다.                           |
