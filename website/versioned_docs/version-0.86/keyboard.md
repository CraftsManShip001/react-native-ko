---
id: keyboard
title: Keyboard
---

`Keyboard` 모듈은 키보드 이벤트를 제어합니다.

### 사용법

Keyboard 모듈을 사용하면 네이티브 이벤트를 수신하고 이에 반응할 수 있으며, 키보드를 닫는 등의 변경도 가능합니다.

```SnackPlayer name=Keyboard%20Example&supportedPlatforms=ios,android
import {useState, useEffect} from 'react';
import {Keyboard, Text, TextInput, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Example = () => {
  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>
        <TextInput
          style={style.input}
          placeholder="Click here…"
          onSubmitEditing={Keyboard.dismiss}
        />
        <Text style={style.status}>{keyboardStatus}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  status: {
    padding: 16,
    textAlign: 'center',
  },
});

export default Example;
```

---

# 레퍼런스

## 메서드

### `addListener()`

```tsx
static addListener: (
  eventType: KeyboardEventName,
  listener: KeyboardEventListener,
) => EmitterSubscription;
```

`addListener` 함수는 JavaScript 함수를 식별된 네이티브 키보드 알림 이벤트에 연결합니다.

이 함수는 리스너에 대한 참조를 반환합니다.

**파라미터:**

| Name                                                                     | Type     | Description                                                                    |
| ------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------ |
| eventName <div className="label basic two-lines required">Required</div> | string   | 수신할 이벤트를 식별하는 문자열입니다. 아래 목록을 참조하세요. |
| callback <div className="label basic two-lines required">Required</div>  | function | 이벤트가 발생할 때 호출될 함수입니다.                                 |

**`eventName`**

다음 중 하나가 될 수 있습니다:

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`
- `keyboardWillChangeFrame`
- `keyboardDidChangeFrame`

:::note
Android에서는 `keyboardDidShow`와 `keyboardDidHide` 이벤트만 사용할 수 있습니다. 액티비티에 `android:windowSoftInputMode`가 `adjustResize` 또는 `adjustNothing`으로 설정된 경우 Android 10 이하에서는 이벤트가 발생하지 않습니다.
:::

---

### `dismiss()`

```tsx
static dismiss();
```

활성화된 키보드를 닫고 포커스를 제거합니다.

---

### `scheduleLayoutAnimation`

```tsx
static scheduleLayoutAnimation(event: KeyboardEvent);
```

TextInput(또는 다른 키보드 액세서리 뷰)의 크기나 위치 변경을 키보드 움직임과 동기화하는 데 유용합니다.

---

### `isVisible()`

```tsx
static isVisible(): boolean;
```

마지막으로 알려진 키보드의 표시 여부를 반환합니다.

---

### `metrics()`

```tsx
static metrics(): KeyboardMetrics | undefined;
```

소프트 키보드가 표시된 경우 해당 메트릭을 반환합니다.
