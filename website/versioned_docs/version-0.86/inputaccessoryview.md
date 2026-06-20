---
id: inputaccessoryview
title: InputAccessoryView
---

iOS에서 키보드 입력 액세서리 뷰를 커스터마이징할 수 있게 해주는 컴포넌트입니다. 입력 액세서리 뷰는 `TextInput`에 포커스가 있을 때마다 키보드 위에 표시됩니다. 이 컴포넌트를 사용하여 커스텀 툴바를 만들 수 있습니다.

이 컴포넌트를 사용하려면 커스텀 툴바를 InputAccessoryView 컴포넌트로 감싸고 `nativeID`를 설정하세요. 그런 다음 원하는 `TextInput`의 `inputAccessoryViewID`로 해당 `nativeID`를 전달하세요. 기본 예시:

```SnackPlayer name=InputAccessoryView&supportedPlatforms=ios
import {useState} from 'react';
import {
  Button,
  InputAccessoryView,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const inputAccessoryViewID = 'uniqueID';
const initialText = '';

const App = () => {
  const [text, setText] = useState(initialText);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView keyboardDismissMode="interactive">
          <TextInput
            style={styles.textInput}
            inputAccessoryViewID={inputAccessoryViewID}
            onChangeText={setText}
            value={text}
            placeholder={'Please type here…'}
          />
        </ScrollView>
      </SafeAreaView>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button onPress={() => setText(initialText)} title="Clear text" />
      </InputAccessoryView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default App;
```

이 컴포넌트는 키보드 상단에 고정된 텍스트 입력(sticky text input)을 만드는 데에도 사용할 수 있습니다. 이를 위해 `TextInput`을 `InputAccessoryView` 컴포넌트로 감싸고 `nativeID`를 설정하지 않으면 됩니다. 예시는 [InputAccessoryViewExample.js](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/InputAccessoryView/InputAccessoryViewExample.js)를 참조하세요.

---

# 레퍼런스

## Props

### `backgroundColor`

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `nativeID`

이 `InputAccessoryView`를 지정된 TextInput(들)과 연결하는 데 사용되는 ID입니다.

| Type   |
| ------ |
| string |

---

### `style`

| Type                              |
| --------------------------------- |
| [View Style](view-style-props.md) |

# 알려진 이슈

- [react-native#18997](https://github.com/facebook/react-native/issues/18997): 여러 줄 `TextInput`을 지원하지 않습니다.
- [react-native#20157](https://github.com/facebook/react-native/issues/20157): 하단 탭 바와 함께 사용할 수 없습니다.
