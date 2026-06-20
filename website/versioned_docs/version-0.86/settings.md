---
id: settings
title: Settings
---

`Settings`는 iOS에서만 사용할 수 있는 영구적인 키-값 저장소인 [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults)의 래퍼입니다.

## 예시

```SnackPlayer name=Settings%20Example&supportedPlatforms=ios
import {useState} from 'react';
import {Button, Settings, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [data, setData] = useState(() => Settings.get('data'));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Stored value:</Text>
        <Text style={styles.value}>{data}</Text>
        <Button
          onPress={() => {
            Settings.set({data: 'React'});
            setData(Settings.get('data'));
          }}
          title="Store 'React'"
        />
        <Button
          onPress={() => {
            Settings.set({data: 'Native'});
            setData(Settings.get('data'));
          }}
          title="Store 'Native'"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    marginVertical: 12,
  },
});

export default App;
```

---

# 레퍼런스

## 메서드

### `clearWatch()`

```tsx
static clearWatch(watchId: number);
```

`watchId`는 구독을 처음 설정할 때 `watchKeys()`가 반환한 숫자입니다.

---

### `get()`

```tsx
static get(key: string): any;
```

`NSUserDefaults`에서 지정한 `key`의 현재 값을 가져옵니다.

---

### `set()`

```tsx
static set(settings: Record<string, any>);
```

`NSUserDefaults`에서 하나 이상의 값을 설정합니다.

---

### `watchKeys()`

```tsx
static watchKeys(keys: string | array<string>, callback: () => void): number;
```

`keys` 파라미터로 지정된 키 중 하나의 값이 `NSUserDefaults`에서 변경될 때 알림을 받도록 구독합니다. `clearWatch()`와 함께 사용하여 구독을 해제할 수 있는 `watchId` 숫자를 반환합니다.

:::note
`watchKeys()`는 설계상 내부적인 `set()` 호출을 무시하며, React Native 코드 외부에서 수행된 변경 사항에 대해서만 콜백을 실행합니다.
:::
