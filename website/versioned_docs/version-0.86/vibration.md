---
id: vibration
title: Vibration
---

기기를 진동시킵니다.

## 예시

```SnackPlayer name=Vibration%20Example&supportedPlatforms=ios,android
import {
  Button,
  Platform,
  Text,
  Vibration,
  View,
  StyleSheet,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

const App = () => {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
  ];

  const PATTERN_DESC =
    Platform.OS === 'android'
      ? 'wait 1s, vibrate 2s, wait 3s'
      : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>Vibration API</Text>
        <View>
          <Button title="Vibrate once" onPress={() => Vibration.vibrate()} />
        </View>
        <Separator />
        {Platform.OS === 'android'
          ? [
              <View>
                <Button
                  title="Vibrate for 10 seconds"
                  onPress={() => Vibration.vibrate(10 * ONE_SECOND_IN_MS)}
                />
              </View>,
              <Separator />,
            ]
          : null}
        <Text style={styles.paragraph}>Pattern: {PATTERN_DESC}</Text>
        <Button
          title="Vibrate with pattern"
          onPress={() => Vibration.vibrate(PATTERN)}
        />
        <Separator />
        <Button
          title="Vibrate with pattern until cancelled"
          onPress={() => Vibration.vibrate(PATTERN, true)}
        />
        <Separator />
        <Button
          title="Stop vibration pattern"
          onPress={() => Vibration.cancel()}
          color="#FF0000"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
```

:::info
Android 앱은 `AndroidManifest.xml`에 `<uses-permission android:name="android.permission.VIBRATE"/>`를 추가하여 `android.permission.VIBRATE` 권한을 요청해야 합니다.
:::

:::note
Vibration API는 iOS에서 `AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)` 호출로 구현됩니다.
:::

---

# 레퍼런스

## 메서드

### `cancel()`

```tsx
static cancel();
```

반복이 활성화된 상태로 `vibrate()`를 호출한 후 진동을 중지하려면 이 메서드를 호출하세요.

---

### `vibrate()`

```tsx
static vibrate(
  pattern?: number | number[],
  repeat?: boolean
);
```

고정된 지속 시간으로 진동을 발생시킵니다.

**Android에서는** 진동 지속 시간의 기본값이 400밀리초이며, `pattern` 인수에 숫자를 전달하여 임의의 진동 지속 시간을 지정할 수 있습니다. **iOS에서는** 진동 지속 시간이 약 400밀리초로 고정되어 있습니다.

`vibrate()` 메서드는 밀리초 단위의 숫자 배열로 이루어진 `pattern` 인수를 받을 수 있습니다. `repeat`을 true로 설정하면 `cancel()`이 호출될 때까지 진동 패턴이 반복됩니다.

**Android에서는** `pattern` 배열의 홀수 인덱스가 진동 지속 시간을, 짝수 인덱스가 대기 시간을 나타냅니다. **iOS에서는** 진동 지속 시간이 고정되어 있으므로 `pattern` 배열의 숫자들이 대기 시간을 나타냅니다.

**파라미터:**

| 이름    | 타입                                                                     | 기본값  | 설명                                                                                       |
| ------- | ------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------- |
| pattern | number <div className="label android">Android</div><hr/>array of numbers | `400`   | 밀리초 단위의 진동 지속 시간.<hr/>밀리초 단위 숫자 배열로 이루어진 진동 패턴. |
| repeat  | boolean                                                                  | `false` | `cancel()`이 호출될 때까지 진동 패턴을 반복합니다.                                                        |
