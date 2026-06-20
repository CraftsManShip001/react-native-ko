---
id: toastandroid
title: ToastAndroid
---

React Native의 ToastAndroid API는 Android 플랫폼의 ToastAndroid 모듈을 JS 모듈로 노출합니다. 다음 매개변수를 받는 `show(message, duration)` 메서드를 제공합니다.

- _message_ 토스트로 표시할 텍스트 문자열
- _duration_ 토스트 표시 시간—`ToastAndroid.SHORT` 또는 `ToastAndroid.LONG`

`showWithGravity(message, duration, gravity)`를 사용하면 화면 레이아웃에서 토스트가 나타날 위치를 지정할 수 있습니다. `ToastAndroid.TOP`, `ToastAndroid.BOTTOM`, `ToastAndroid.CENTER` 중 하나를 사용할 수 있습니다.

`showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)` 메서드를 사용하면 픽셀 단위로 오프셋을 지정할 수 있습니다.

:::note
Android 11(API 레벨 30)부터 gravity 설정이 텍스트 토스트에는 영향을 미치지 않습니다. 변경 사항은 [여기](https://developer.android.com/about/versions/11/behavior-changes-11#text-toast-api-changes)에서 확인하세요.
:::

```SnackPlayer name=Toast%20Android%20API%20Example&supportedPlatforms=android
import {StyleSheet, ToastAndroid, Button, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const showToast = () => {
    ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'All Your Base Are Belong To Us',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'A wild toast appeared!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title="Toggle Toast" onPress={() => showToast()} />
        <Button
          title="Toggle Toast With Gravity"
          onPress={() => showToastWithGravity()}
        />
        <Button
          title="Toggle Toast With Gravity & Offset"
          onPress={() => showToastWithGravityAndOffset()}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#888888',
    padding: 8,
  },
});

export default App;
```

---

# 레퍼런스

## 메서드

### `show()`

```tsx
static show(message: string, duration: number);
```

---

### `showWithGravity()`

이 속성은 Android API 29 이하에서만 동작합니다. 더 높은 Android API에서 유사한 기능이 필요하다면 snackbar나 notification 사용을 고려하세요.

```tsx
static showWithGravity(message: string, duration: number, gravity: number);
```

---

### `showWithGravityAndOffset()`

이 속성은 Android API 29 이하에서만 동작합니다. 더 높은 Android API에서 유사한 기능이 필요하다면 snackbar나 notification 사용을 고려하세요.

```tsx
static showWithGravityAndOffset(
  message: string,
  duration: number,
  gravity: number,
  xOffset: number,
  yOffset: number,
);
```

## 속성

### `SHORT`

화면에 표시되는 시간을 나타냅니다.

```tsx
static SHORT: number;
```

---

### `LONG`

화면에 표시되는 시간을 나타냅니다.

```tsx
static LONG: number;
```

---

### `TOP`

화면에서의 위치를 나타냅니다.

```tsx
static TOP: number;
```

---

### `BOTTOM`

화면에서의 위치를 나타냅니다.

```tsx
static BOTTOM: number;
```

---

### `CENTER`

화면에서의 위치를 나타냅니다.

```tsx
static CENTER: number;
```
