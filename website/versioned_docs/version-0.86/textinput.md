---
id: textinput
title: TextInput
---

키보드를 통해 앱에 텍스트를 입력하기 위한 기본 컴포넌트입니다. props를 통해 자동 수정, 자동 대문자화, 플레이스홀더 텍스트, 숫자 키패드와 같은 다양한 키보드 유형 등 여러 기능을 설정할 수 있습니다.

가장 기본적인 사용 사례는 `TextInput`을 배치하고 `onChangeText` 이벤트를 구독하여 사용자 입력을 읽는 것입니다. `onSubmitEditing`, `onFocus`와 같이 구독할 수 있는 다른 이벤트도 있습니다. 최소한의 예시:

```SnackPlayer name=TextInput%20Example
import {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInputExample = () => {
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;
```

네이티브 엘리먼트를 통해 노출되는 두 가지 메서드는 프로그래밍 방식으로 TextInput에 포커스를 주거나 포커스를 해제하는 `.focus()`와 `.blur()`입니다.

일부 props는 `multiline={true/false}`에서만 사용 가능합니다. 또한 한쪽 면에만 적용되는 테두리 스타일(예: `borderBottomColor`, `borderLeftWidth` 등)은 `multiline=true`일 경우 적용되지 않습니다. 동일한 효과를 내려면 `TextInput`을 `View`로 감싸세요.

```SnackPlayer name=Multiline%20TextInput%20Example
import {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const MultilineTextInputExample = () => {
  const [value, onChangeText] = useState('Useless Multiline Placeholder');

  // If you type something in the text box that is a color,
  // the background will change to that color.
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: value.toLowerCase(),
        }}>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          onChangeText={text => onChangeText(text)}
          value={value}
          style={styles.textInput}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    margin: 12,
  },
});

export default MultilineTextInputExample;
```

`TextInput`은 기본적으로 뷰 하단에 테두리가 있습니다. 이 테두리는 시스템이 제공하는 배경 이미지에 의해 패딩이 설정되며 변경할 수 없습니다. 이를 피하는 해결 방법은 높이를 명시적으로 설정하지 않는 것(이 경우 시스템이 올바른 위치에 테두리를 표시함) 또는 `underlineColorAndroid`를 투명으로 설정하여 테두리를 표시하지 않는 것입니다.

Android에서 입력 필드에서 텍스트를 선택하면 앱의 activity `windowSoftInputMode` 매개변수가 `adjustResize`로 변경될 수 있습니다. 이는 키보드가 활성화된 동안 `position: 'absolute'`를 가진 컴포넌트에 문제를 일으킬 수 있습니다. 이 동작을 피하려면 AndroidManifest.xml에 `windowSoftInputMode`를 지정하거나( https://developer.android.com/guide/topics/manifest/activity-element.html ) 네이티브 코드로 이 매개변수를 프로그래밍 방식으로 제어하세요.

---

# 레퍼런스

## Props

### [View Props](view.md#props)

[View Props](view.md#props)를 상속합니다.

---

### `allowFontScaling`

텍스트 크기 접근성 설정을 존중하여 글꼴이 스케일링되어야 하는지 여부를 지정합니다. 기본값은 `true`입니다.

| 타입 |
| ---- |
| bool |

---

### `autoCapitalize`

`TextInput`이 특정 문자를 자동으로 대문자화하도록 지시합니다. 이 속성은 `name-phone-pad`와 같은 일부 키보드 유형에서는 지원되지 않습니다.

- `characters`: 모든 문자.
- `words`: 각 단어의 첫 글자.
- `sentences`: 각 문장의 첫 글자(_기본값_).
- `none`: 자동 대문자화 없음.

| 타입                                             |
| ------------------------------------------------ |
| enum('none', 'sentences', 'words', 'characters') |

---

### `autoComplete`

시스템이 자동 완성을 제공할 수 있도록 자동 완성 힌트를 지정합니다. Android에서는 시스템이 항상 휴리스틱을 사용하여 콘텐츠 유형을 식별함으로써 자동 완성을 제공하려 합니다. 자동 완성을 비활성화하려면 `autoComplete`를 `off`로 설정하세요.

다음 값은 모든 플랫폼에서 작동합니다.

- `additional-name`
- `address-line1`
- `address-line2`
- `birthdate-day` (iOS 17+)
- `birthdate-full` (iOS 17+)
- `birthdate-month` (iOS 17+)
- `birthdate-year` (iOS 17+)
- `cc-csc` (iOS 17+)
- `cc-exp` (iOS 17+)
- `cc-exp-day` (iOS 17+)
- `cc-exp-month` (iOS 17+)
- `cc-exp-year` (iOS 17+)
- `cc-number`
- `country`
- `current-password`
- `email`
- `family-name`
- `given-name`
- `honorific-prefix`
- `honorific-suffix`
- `name`
- `new-password`
- `off`
- `one-time-code`
- `postal-code`
- `street-address`
- `tel`
- `username`

<div className="label basic ios">iOS</div>

다음 값은 iOS에서만 작동합니다.

- `cc-family-name` (iOS 17+)
- `cc-given-name` (iOS 17+)
- `cc-middle-name` (iOS 17+)
- `cc-name` (iOS 17+)
- `cc-type` (iOS 17+)
- `nickname`
- `organization`
- `organization-title`
- `url`

<div className="label basic android">Android</div>

다음 값은 Android에서만 작동합니다.

- `gender`
- `name-family`
- `name-given`
- `name-middle`
- `name-middle-initial`
- `name-prefix`
- `name-suffix`
- `password`
- `password-new`
- `postal-address`
- `postal-address-country`
- `postal-address-extended`
- `postal-address-extended-postal-code`
- `postal-address-locality`
- `postal-address-region`
- `sms-otp`
- `tel-country-code`
- `tel-device`
- `tel-national`
- `username-new`

| 타입                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('additional-name', 'address-line1', 'address-line2', 'birthdate-day', 'birthdate-full', 'birthdate-month', 'birthdate-year', 'cc-csc', 'cc-exp', 'cc-exp-day', 'cc-exp-month', 'cc-exp-year', 'cc-number', 'country', 'current-password', 'email', 'family-name', 'given-name', 'honorific-prefix', 'honorific-suffix', 'name', 'new-password', 'off', 'one-time-code', 'postal-code', 'street-address', 'tel', 'username', 'cc-family-name', 'cc-given-name', 'cc-middle-name', 'cc-name', 'cc-type', 'nickname', 'organization', 'organization-title', 'url', 'gender', 'name-family', 'name-given', 'name-middle', 'name-middle-initial', 'name-prefix', 'name-suffix', 'password', 'password-new', 'postal-address', 'postal-address-country', 'postal-address-extended', 'postal-address-extended-postal-code', 'postal-address-locality', 'postal-address-region', 'sms-otp', 'tel-country-code', 'tel-device', 'tel-national', 'username-new') |

---

### `autoCorrect`

`false`이면 자동 수정을 비활성화합니다. 기본값은 `true`입니다.

| 타입 |
| ---- |
| bool |

---

### `autoFocus`

`true`이면 입력에 포커스를 줍니다. 기본값은 `false`입니다.

| 타입 |
| ---- |
| bool |

---

### 🗑️ `blurOnSubmit`

:::warning deprecated(더 이상 권장되지 않음)
`submitBehavior`가 이제 `blurOnSubmit`을 대체하며 `blurOnSubmit`으로 정의된 동작을 재정의합니다. [submitBehavior](textinput#submitbehavior)를 참조하세요.
:::

`true`이면 제출 시 텍스트 필드의 포커스가 해제됩니다. 단일 라인 필드의 기본값은 `true`이고 멀티라인 필드의 기본값은 `false`입니다. 멀티라인 필드에서 `blurOnSubmit`을 `true`로 설정하면 리턴 키를 누를 때 필드에 새 줄을 삽입하는 대신 필드의 포커스가 해제되고 `onSubmitEditing` 이벤트가 발생합니다.

| 타입 |
| ---- |
| bool |

---

### `caretHidden`

`true`이면 캐럿이 숨겨집니다. 기본값은 `false`입니다.

| 타입 |
| ---- |
| bool |

---

### `clearButtonMode` <div className="label ios">iOS</div>

텍스트 뷰의 오른쪽에 지우기 버튼이 나타나야 하는 시점입니다. 이 속성은 단일 라인 TextInput 컴포넌트에서만 지원됩니다. 기본값은 `never`입니다.

| 타입                                                       |
| ---------------------------------------------------------- |
| enum('never', 'while-editing', 'unless-editing', 'always') |

---

### `clearTextOnFocus` <div className="label ios">iOS</div>

`true`이면 편집이 시작될 때 텍스트 필드를 자동으로 지웁니다.

| 타입 |
| ---- |
| bool |

---

### `contextMenuHidden`

`true`이면 컨텍스트 메뉴가 숨겨집니다. 기본값은 `false`입니다.

| 타입 |
| ---- |
| bool |

---

### `dataDetectorTypes` <div className="label ios">iOS</div>

텍스트 입력에서 클릭 가능한 URL로 변환되는 데이터 유형을 결정합니다. `multiline={true}` 및 `editable={false}`일 때만 유효합니다. 기본적으로 어떤 데이터 유형도 감지되지 않습니다.

하나의 유형 또는 여러 유형의 배열을 제공할 수 있습니다.

`dataDetectorTypes`의 가능한 값:

- `'phoneNumber'`
- `'link'`
- `'address'`
- `'calendarEvent'`
- `'none'`
- `'all'`

| 타입                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), ,array of enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all') |

---

### `defaultValue`

사용자가 입력을 시작하면 변경될 초기 값을 제공합니다. 이벤트를 수신하고 value prop을 업데이트하여 제어 state를 동기화하는 것을 처리하고 싶지 않은 경우에 유용합니다.

| 타입   |
| ------ |
| string |

---

### `disableKeyboardShortcuts` <div className="label ios">iOS</div>

`true`이면 키보드 단축키(실행 취소/다시 실행 및 복사 버튼)가 비활성화됩니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `cursorColor` <div className="label android">Android</div>

지정하면 컴포넌트의 커서(또는 "캐럿") 색상을 설정합니다. `selectionColor`의 동작과 달리 커서 색상은 텍스트 선택 박스의 색상과 독립적으로 설정됩니다.

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `disableFullscreenUI` <div className="label android">Android</div>

`false`이면 텍스트 입력 주변에 사용 가능한 공간이 적은 경우(예: 휴대폰의 가로 방향) OS가 전체 화면 텍스트 입력 모드에서 텍스트를 편집하도록 할 수 있습니다. `true`이면 이 기능이 비활성화되어 사용자는 항상 텍스트 입력 내에서 직접 텍스트를 편집합니다. 기본값은 `false`입니다.

| 타입 |
| ---- |
| bool |

---

### `editable`

`false`이면 텍스트가 편집되지 않습니다. 기본값은 `true`입니다.

| 타입 |
| ---- |
| bool |

---

### `enablesReturnKeyAutomatically` <div className="label ios">iOS</div>

`true`이면 텍스트가 없을 때 키보드가 리턴 키를 비활성화하고 텍스트가 있을 때 자동으로 활성화합니다. 기본값은 `false`입니다.

| 타입 |
| ---- |
| bool |

---

### `enterKeyHint`

리턴 키에 표시할 텍스트를 결정합니다. `returnKeyType` prop보다 우선합니다.

다음 값은 모든 플랫폼에서 작동합니다.

- `done`
- `next`
- `search`
- `send`
- `go`

_Android 전용_

다음 값은 Android에서만 작동합니다.

- `previous`

_iOS 전용_

다음 값은 iOS에서만 작동합니다.

- `enter`

| 타입                                                              |
| ----------------------------------------------------------------- |
| enum('enter', 'done', 'next', 'previous', 'search', 'send', 'go') |

---

### `importantForAutofill` <div className="label android">Android</div>

Android API 레벨 26 이상에서 자동 완성 목적으로 앱의 개별 필드가 뷰 구조에 포함되어야 하는지 운영 체제에 알립니다. 가능한 값은 `auto`, `no`, `noExcludeDescendants`, `yes`, `yesExcludeDescendants`입니다. 기본값은 `auto`입니다.

- `auto`: Android 시스템이 자체 휴리스틱을 사용하여 해당 뷰가 자동 완성에 중요한지 여부를 결정하도록 합니다.
- `no`: 이 뷰는 자동 완성에 중요하지 않습니다.
- `noExcludeDescendants`: 이 뷰와 자식 요소들은 자동 완성에 중요하지 않습니다.
- `yes`: 이 뷰는 자동 완성에 중요합니다.
- `yesExcludeDescendants`: 이 뷰는 자동 완성에 중요하지만 자식 요소들은 자동 완성에 중요하지 않습니다.

| 타입                                                                       |
| -------------------------------------------------------------------------- |
| enum('auto', 'no', 'noExcludeDescendants', 'yes', 'yesExcludeDescendants') |

---

### `inlineImageLeft` <div className="label android">Android</div>

지정된 경우 제공된 이미지 리소스가 왼쪽에 렌더링됩니다. 이미지 리소스는 `/android/app/src/main/res/drawable` 내부에 있어야 하며 다음과 같이 참조됩니다.

```
<TextInput
 inlineImageLeft='search_icon'
/>
```

| 타입   |
| ------ |
| string |

---

### `inlineImagePadding` <div className="label android">Android</div>

인라인 이미지(있는 경우)와 텍스트 입력 자체 사이의 패딩입니다.

| 타입   |
| ------ |
| number |

---

### `inputAccessoryViewID` <div className="label ios">iOS</div>

이 텍스트 입력에 커스텀 [InputAccessoryView](inputaccessoryview.md)를 연결하는 선택적 식별자입니다. InputAccessoryView는 이 텍스트 입력이 포커스될 때 키보드 위에 렌더링됩니다.

| 타입   |
| ------ |
| string |

---

### `inputAccessoryViewButtonLabel` <div className="label ios">iOS</div>

기본 [InputAccessoryView](inputaccessoryview.md) 버튼 레이블을 재정의하는 선택적 레이블입니다.

기본적으로 기본 버튼 레이블은 현지화되지 않습니다. 현지화된 버전을 제공하려면 이 속성을 사용하세요.

| 타입   |
| ------ |
| string |

---

### `inputMode`

HTML의 `inputmode` 속성처럼 작동하며 열 키보드를 결정합니다(예: `numeric`). `keyboardType`보다 우선합니다.

다음 값을 지원합니다.

- `none`
- `text`
- `decimal`
- `numeric`
- `tel`
- `search`
- `email`
- `url`

| 타입                                                                        |
| --------------------------------------------------------------------------- |
| enum('decimal', 'email', 'none', 'numeric', 'search', 'tel', 'text', 'url') |

---

### `keyboardAppearance` <div className="label ios">iOS</div>

키보드의 색상을 결정합니다.

| 타입                             |
| -------------------------------- |
| enum('default', 'light', 'dark') |

---

### `keyboardType`

열 키보드를 결정합니다(예: `numeric`).

모든 유형의 스크린샷은 [여기](https://davidl.fr/blog/keyboard-react-native-ios-android#all-react-native-keyboard-type-examples-i-os-on-the-left-android-on-the-right)에서 확인할 수 있습니다.

다음 값은 모든 플랫폼에서 작동합니다.

- `default`
- `number-pad`
- `decimal-pad`
- `numeric`
- `email-address`
- `phone-pad`
- `url`

_iOS 전용_

다음 값은 iOS에서만 작동합니다.

- `ascii-capable`
- `numbers-and-punctuation`
- `name-phone-pad`
- `twitter`
- `web-search`

_Android 전용_

다음 값은 Android에서만 작동합니다.

- `visible-password`

| 타입                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password') |

---

### `lineBreakStrategyIOS` <div className="label ios">iOS</div>

iOS 14 이상에서 줄 분리 전략을 설정합니다. 가능한 값은 `none`, `standard`, `hangul-word`, `push-out`입니다.

| 타입                                                        | 기본값  |
| ----------------------------------------------------------- | -------- |
| enum(`'none'`, `'standard'`, `'hangul-word'`, `'push-out'`) | `'none'` |

---

### `lineBreakModeIOS` <div className="label ios">iOS</div>

iOS에서 줄 분리 모드를 설정합니다. 가능한 값은 `wordWrapping`, `char`, `clip`, `head`, `middle`, `tail`입니다.

| 타입                                                                       | 기본값          |
| -------------------------------------------------------------------------- | ---------------- |
| enum(`'wordWrapping'`, `'char'`, `'clip'`, `'head'`, `'middle'`, `'tail'`) | `'wordWrapping'` |

---

### `maxFontSizeMultiplier`

`allowFontScaling`이 활성화된 경우 글꼴이 도달할 수 있는 최대 스케일을 지정합니다. 가능한 값:

- `null/undefined` (기본값): 부모 노드 또는 전역 기본값(0)에서 상속
- `0`: 최대 없음, 부모/전역 기본값 무시
- `>= 1`: 이 노드의 `maxFontSizeMultiplier`를 이 값으로 설정

| 타입   |
| ------ |
| number |

---

### `maxLength`

입력 가능한 최대 문자 수를 제한합니다. 깜빡임을 피하기 위해 JS에서 로직을 구현하는 대신 이것을 사용하세요.

| 타입   |
| ------ |
| number |

---

### `multiline`

`true`이면 텍스트 입력이 여러 줄이 될 수 있습니다. 기본값은 `false`입니다.

:::note
이는 iOS에서 텍스트를 상단에 정렬하고 Android에서 중앙에 정렬한다는 점에 유의하세요. 두 플랫폼에서 동일한 동작을 원하면 `textAlignVertical`을 `top`으로 설정하세요.
:::

| 타입 |
| ---- |
| bool |

---

### `numberOfLines`

:::note
iOS의 `numberOfLines`는 [New Architecture](/architecture/landing-page)에서만 사용 가능합니다.
:::

`TextInput`의 최대 줄 수를 설정합니다. 줄을 채울 수 있도록 multiline을 `true`로 설정하여 함께 사용하세요.

| 타입   |
| ------ |
| number |

---

### `onBlur`

텍스트 입력의 포커스가 해제될 때 호출되는 콜백입니다.

:::note
`nativeEvent`에서 `text` 값에 접근하려는 경우 결과 값이 `undefined`일 수 있어 의도치 않은 오류가 발생할 수 있습니다. TextInput의 마지막 값을 찾으려면 편집 완료 시 발생하는 [`onEndEditing`](textinput#onendediting) 이벤트를 사용할 수 있습니다.
:::

| 타입                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onChange`

텍스트 입력의 텍스트가 변경될 때 호출되는 콜백입니다.

| 타입                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {eventCount, target, text}}`) => void |

---

### `onChangeText`

텍스트 입력의 텍스트가 변경될 때 호출되는 콜백입니다. 변경된 텍스트가 단일 문자열 인수로 콜백 핸들러에 전달됩니다.

| 타입     |
| -------- |
| function |

---

### `onContentSizeChange`

텍스트 입력의 콘텐츠 크기가 변경될 때 호출되는 콜백입니다.

멀티라인 텍스트 입력에서만 호출됩니다.

| 타입                                                       |
| ---------------------------------------------------------- |
| (`{nativeEvent: {contentSize: {width, height} }}`) => void |

---

### `onEndEditing`

텍스트 입력이 종료될 때 호출되는 콜백입니다.

| 타입     |
| -------- |
| function |

---

### `onPressIn`

터치가 시작될 때 호출되는 콜백입니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onPressOut`

터치가 해제될 때 호출되는 콜백입니다.

| 타입                                                   |
| ------------------------------------------------------ |
| `md ({nativeEvent: [PressEvent](pressevent)}) => void` |

---

### `onFocus`

텍스트 입력에 포커스될 때 호출되는 콜백입니다.

| 타입                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [TargetEvent](targetevent)}) => void` |

---

### `onKeyPress`

키가 눌릴 때 호출되는 콜백입니다. 해당 키에 대해 `keyValue`가 `'Enter'` 또는 `'Backspace'`이고, 공백을 포함한 입력 문자에 대해 `' '`이 포함된 객체와 함께 호출됩니다. `onChange` 콜백 이전에 발생합니다. 참고: Android에서는 소프트 키보드의 입력만 처리되며, 하드웨어 키보드 입력은 처리되지 않습니다.

| 타입                                        |
| ------------------------------------------- |
| (`{nativeEvent: {key: keyValue} }`) => void |

---

### `onLayout`

마운트 시 및 레이아웃 변경 시 호출됩니다.

| 타입                                                     |
| -------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)}) => void` |

---

### `onScroll`

콘텐츠 스크롤 시 호출됩니다. Android에서는 성능상의 이유로 `contentSize`가 제공되지 않지만, `ScrollEvent`의 다른 속성도 포함될 수 있습니다.

| 타입                                                |
| --------------------------------------------------- |
| (`{nativeEvent: {contentOffset: {x, y} }}`) => void |

---

### `onSelectionChange`

텍스트 입력 선택이 변경될 때 호출되는 콜백입니다.

| 타입                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {selection: {start, end} }}`) => void |

---

### `onSubmitEditing`

텍스트 입력의 제출 버튼이 눌릴 때 호출되는 콜백입니다.

| 타입                                                  |
| ----------------------------------------------------- |
| (`{nativeEvent: {text, eventCount, target}}`) => void |

iOS에서는 `keyboardType="phone-pad"`를 사용할 때 이 메서드가 호출되지 않습니다.

---

### `placeholder`

텍스트가 입력되기 전에 렌더링되는 문자열입니다.

| 타입   |
| ------ |
| string |

---

### `placeholderTextColor`

플레이스홀더 문자열의 텍스트 색상입니다.

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `readOnly`

`true`이면 텍스트가 편집되지 않습니다. 기본값은 `false`입니다.

| 타입 |
| ---- |
| bool |

---

### `returnKeyLabel` <div className="label android">Android</div>

리턴 키를 레이블로 설정합니다. `returnKeyType` 대신 사용하세요.

| 타입   |
| ------ |
| string |

---

### `returnKeyType`

리턴 키가 어떻게 보여야 하는지를 결정합니다. Android에서는 `returnKeyLabel`도 사용할 수 있습니다.

_크로스 플랫폼_

다음 값은 모든 플랫폼에서 작동합니다.

- `done`
- `go`
- `next`
- `search`
- `send`

_Android 전용_

다음 값은 Android에서만 작동합니다.

- `none`
- `previous`

_iOS 전용_

다음 값은 iOS에서만 작동합니다.

- `default`
- `emergency-call`
- `google`
- `join`
- `route`
- `yahoo`

| 타입                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------- |
| enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo') |

### `rejectResponderTermination` <div className="label ios">iOS</div>

`true`이면 TextInput이 터치 이벤트를 부모 컴포넌트에 전달할 수 있습니다. 이를 통해 iOS에서 Android의 기본 동작과 마찬가지로 TextInput에서 SwipeableListView와 같은 컴포넌트를 스와이프할 수 있습니다. `false`이면 TextInput은 항상 입력 처리를 요청합니다(비활성화된 경우 제외). 기본값은 `true`입니다.

| 타입 |
| ---- |
| bool |

---

### `rows` <div className="label android">Android</div>

`TextInput`의 줄 수를 설정합니다. 줄을 채울 수 있도록 multiline을 `true`로 설정하여 함께 사용하세요.

| 타입   |
| ------ |
| number |

---

### `scrollEnabled` <div className="label ios">iOS</div>

`false`이면 텍스트 뷰의 스크롤이 비활성화됩니다. 기본값은 `true`입니다. `multiline={true}`에서만 작동합니다.

| 타입 |
| ---- |
| bool |

---

### `secureTextEntry`

`true`이면 비밀번호 같은 민감한 텍스트가 안전하게 유지되도록 입력된 텍스트를 가립니다. 기본값은 `false`입니다. `multiline={true}`와 함께 작동하지 않습니다.

| 타입 |
| ---- |
| bool |

---

### `selection`

텍스트 입력의 선택 시작과 끝입니다. 커서를 위치시키려면 start와 end를 같은 값으로 설정하세요.

| 타입                                  |
| ------------------------------------- |
| object: `{start: number,end: number}` |

---

### `selectionColor`

텍스트 입력의 하이라이트, 선택 핸들 및 커서 색상입니다.

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `selectionHandleColor` <div className="label android">Android</div>

선택 핸들의 색상을 설정합니다. `selectionColor`와 달리 선택의 색상과 독립적으로 선택 핸들 색상을 커스터마이즈할 수 있습니다.

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `selectTextOnFocus`

`true`이면 포커스 시 모든 텍스트가 자동으로 선택됩니다.

| 타입 |
| ---- |
| bool |

---

### `showSoftInputOnFocus`

`false`이면 필드에 포커스될 때 소프트 키보드가 표시되지 않습니다. 기본값은 `true`입니다.

| 타입 |
| ---- |
| bool |

---

### `smartInsertDelete` <div className="label ios">iOS</div>

`false`이면 iOS 시스템이 붙여넣기 작업 후 여분의 공백을 삽입하거나 잘라내기 또는 삭제 작업 후 하나 또는 두 개의 공백을 삭제하지 않습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `spellCheck` <div className="label ios">iOS</div>

`false`이면 맞춤법 검사 스타일(예: 빨간 밑줄)이 비활성화됩니다. 기본값은 `autoCorrect`에서 상속됩니다.

| 타입 |
| ---- |
| bool |

---

### `submitBehavior`

리턴 키가 눌렸을 때,

단일 라인 입력의 경우:

- `'newline'`은 기본적으로 `'blurAndSubmit'`입니다
- `undefined`는 기본적으로 `'blurAndSubmit'`입니다

멀티라인 입력의 경우:

- `'newline'`은 새 줄을 추가합니다
- `undefined`는 기본적으로 `'newline'`입니다

단일 라인과 멀티라인 입력 모두:

- `'submit'`은 제출 이벤트만 전송하고 입력의 포커스를 해제하지 않습니다
- `'blurAndSubmit'`은 입력의 포커스를 해제하고 제출 이벤트를 전송합니다

| 타입                                       |
| ------------------------------------------ |
| enum('submit', 'blurAndSubmit', 'newline') |

---

### `textAlign`

입력 텍스트를 입력 필드의 왼쪽, 중앙 또는 오른쪽으로 정렬합니다.

`textAlign`의 가능한 값:

- `left`
- `center`
- `right`

| 타입                            |
| ------------------------------- |
| enum('left', 'center', 'right') |

---

### `textContentType` <div className="label ios">iOS</div>

키보드 및 시스템에 사용자가 입력하는 콘텐츠의 예상 의미론적 의미에 대한 정보를 제공합니다.

:::note
[`autoComplete`](#autocomplete)는 동일한 기능을 제공하며 모든 플랫폼에서 사용 가능합니다. 플랫폼별 동작 차이가 있을 경우 [`Platform.select`](/docs/platform#select)를 사용할 수 있습니다.

`textContentType`과 `autoComplete`를 함께 사용하는 것을 피하세요. 하위 호환성을 위해 두 속성이 모두 설정된 경우 `textContentType`이 우선합니다.
:::

`textContentType`을 `username` 또는 `password`로 설정하여 기기 키체인에서 로그인 세부 정보를 자동 완성할 수 있습니다.

`newPassword`는 사용자가 키체인에 저장하려는 새 비밀번호 입력을 나타내는 데 사용할 수 있으며, `oneTimeCode`는 SMS로 도착한 코드로 필드를 자동 완성할 수 있음을 나타내는 데 사용할 수 있습니다.

자동 완성을 비활성화하려면 `textContentType`을 `none`으로 설정하세요.

`textContentType`의 가능한 값:

- `none`
- `addressCity`
- `addressCityAndState`
- `addressState`
- `birthdate` (iOS 17+)
- `birthdateDay` (iOS 17+)
- `birthdateMonth` (iOS 17+)
- `birthdateYear` (iOS 17+)
- `countryName`
- `creditCardExpiration` (iOS 17+)
- `creditCardExpirationMonth` (iOS 17+)
- `creditCardExpirationYear` (iOS 17+)
- `creditCardFamilyName` (iOS 17+)
- `creditCardGivenName` (iOS 17+)
- `creditCardMiddleName` (iOS 17+)
- `creditCardName` (iOS 17+)
- `creditCardNumber`
- `creditCardSecurityCode` (iOS 17+)
- `creditCardType` (iOS 17+)
- `emailAddress`
- `familyName`
- `fullStreetAddress`
- `givenName`
- `jobTitle`
- `location`
- `middleName`
- `name`
- `namePrefix`
- `nameSuffix`
- `newPassword`
- `nickname`
- `oneTimeCode`
- `organizationName`
- `password`
- `postalCode`
- `streetAddressLine1`
- `streetAddressLine2`
- `sublocality`
- `telephoneNumber`
- `URL`
- `username`

| 타입                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| enum('none', 'addressCity', 'addressCityAndState', 'addressState', 'birthdate', 'birthdateDay', 'birthdateMonth', 'birthdateYear', 'countryName', 'creditCardExpiration', 'creditCardExpirationMonth', 'creditCardExpirationYear', 'creditCardFamilyName', 'creditCardGivenName', 'creditCardMiddleName', 'creditCardName', 'creditCardNumber', 'creditCardSecurityCode', 'creditCardType', 'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix', 'nameSuffix', 'newPassword', 'nickname', 'oneTimeCode', 'organizationName', 'password', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality', 'telephoneNumber', 'URL', 'username') |

---

### `passwordRules` <div className="label ios">iOS</div>

iOS에서 `textContentType`을 `newPassword`로 사용할 때 OS가 비밀번호 요구 사항을 충족하는 비밀번호를 생성할 수 있도록 최소 요건을 알릴 수 있습니다. `PasswordRules`에 대한 유효한 문자열을 만들려면 [Apple 문서](https://developer.apple.com/password-rules/)를 참조하세요.

:::tip
비밀번호 생성 대화 상자가 나타나지 않는 경우 다음을 확인하세요.

- AutoFill이 활성화되어 있는지: **설정** → **비밀번호 및 계정** → **AutoFill 비밀번호**를 "켜기"로 전환
- iCloud 키체인이 사용 중인지: **설정** → **Apple ID** → **iCloud** → **키체인** → **iCloud 키체인**을 "켜기"로 전환
  :::

| 타입   |
| ------ |
| string |

---

### `style`

모든 Text 스타일이 지원되는 것은 아닙니다. 지원되지 않는 스타일의 불완전한 목록:

- `borderLeftWidth`
- `borderTopWidth`
- `borderRightWidth`
- `borderBottomWidth`
- `borderTopLeftRadius`
- `borderTopRightRadius`
- `borderBottomRightRadius`
- `borderBottomLeftRadius`

[Styles](style.md)

| 타입                  |
| --------------------- |
| [Text](text.md#style) |

---

### `textBreakStrategy` <div className="label android">Android</div>

Android API 레벨 23 이상에서 텍스트 분리 전략을 설정합니다. 가능한 값은 `simple`, `highQuality`, `balanced`이며 기본값은 `highQuality`입니다.

| 타입                                      |
| ----------------------------------------- |
| enum('simple', 'highQuality', 'balanced') |

---

### `underlineColorAndroid` <div className="label android">Android</div>

`TextInput` 밑줄의 색상입니다.

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `value`

텍스트 입력에 표시할 값입니다. `TextInput`은 제어 컴포넌트로, 제공된 경우 네이티브 값이 이 value prop과 일치하도록 강제됩니다. 대부분의 경우 잘 작동하지만, 일부 경우에는 깜빡임이 발생할 수 있습니다. 일반적인 원인 중 하나는 같은 값을 유지하여 편집을 방지하는 것입니다. 같은 값을 설정하는 것 외에도 `editable={false}`를 설정하거나 깜빡임 없이 원하지 않는 편집을 방지하기 위해 `maxLength`를 설정/업데이트하세요.

| 타입   |
| ------ |
| string |

## 메서드

### `.focus()`

```tsx
focus();
```

네이티브 입력이 포커스를 요청하도록 합니다.

### `.blur()`

```tsx
blur();
```

네이티브 입력이 포커스를 잃도록 합니다.

### `clear()`

```tsx
clear();
```

`TextInput`에서 모든 텍스트를 제거합니다.

---

### `isFocused()`

```tsx
isFocused(): boolean;
```

입력이 현재 포커스된 경우 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

# 알려진 문제

- [react-native#19096](https://github.com/facebook/react-native/issues/19096): Android의 `onKeyPreIme`를 지원하지 않습니다.
- [react-native#19366](https://github.com/facebook/react-native/issues/19366): Android의 뒤로가기 버튼으로 키보드를 닫은 후 `.focus()`를 호출하면 키보드가 다시 나타나지 않습니다.
- [react-native#26799](https://github.com/facebook/react-native/issues/26799): `keyboardType="email-address"` 또는 `keyboardType="phone-pad"`일 때 Android의 `secureTextEntry`를 지원하지 않습니다.
