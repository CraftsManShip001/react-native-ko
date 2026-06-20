---
id: keyboardavoidingview
title: KeyboardAvoidingView
---

이 컴포넌트는 가상 키보드가 표시되는 동안 화면에 계속 보이도록 키보드 높이에 따라 높이, 위치 또는 하단 패딩을 자동으로 조정합니다.

## 예제

```SnackPlayer name=KeyboardAvoidingView&supportedPlatforms=android,ios
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';

const KeyboardAvoidingComponent = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default KeyboardAvoidingComponent;
```

---

# 레퍼런스

## Props

### [View Props](view.md#props)

[View Props](view.md#props)를 상속합니다.

---

### `behavior`

키보드가 표시될 때의 반응 방식을 지정합니다.

:::note
Android와 iOS는 이 prop에 대해 서로 다르게 동작합니다. iOS와 Android 모두에서 `behavior`를 설정하는 것을 권장합니다.
:::

| Type                                        |
| ------------------------------------------- |
| enum(`'height'`, `'position'`, `'padding'`) |

---

### `contentContainerStyle`

`behavior`가 `'position'`일 때 콘텐츠 컨테이너(View)의 스타일입니다.

| Type                              |
| --------------------------------- |
| [View Style](view-style-props.md) |

---

### `enabled`

KeyboardAvoidingView를 활성화하거나 비활성화합니다.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `keyboardVerticalOffset`

사용자 화면 상단과 React Native 뷰 사이의 거리이며, 일부 사용 사례에서 0이 아닐 수 있습니다.

| Type   | Default |
| ------ | ------- |
| number | `0`     |
