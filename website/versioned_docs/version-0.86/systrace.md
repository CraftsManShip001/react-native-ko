---
id: systrace
title: Systrace
---

`Systrace`는 표준 Android 마커 기반 프로파일링 도구입니다(Android platform-tools 패키지를 설치할 때 함께 설치됩니다). 프로파일링된 코드 블록은 시작/종료 마커로 둘러싸이며, 색상이 있는 차트 형식으로 시각화됩니다. Android SDK와 React Native 프레임워크 모두 시각화할 수 있는 표준 마커를 제공합니다.

## 예제

`Systrace`를 사용하면 태그와 정수 값으로 JavaScript(JS) 이벤트를 표시할 수 있습니다. EasyProfiler에서 타이머가 없는 JS 이벤트를 캡처합니다.

```SnackPlayer name=Systrace%20Example
import {Button, Text, View, StyleSheet, Systrace} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const enableProfiling = () => {
    Systrace.setEnabled(true); // Call setEnabled to turn on the profiling.
    Systrace.beginEvent('event_label');
    Systrace.counterEvent('event_label', 10);
  };

  const stopProfiling = () => {
    Systrace.endEvent();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>
          React Native Systrace API
        </Text>
        <View style={styles.buttonsColumn}>
          <Button
            title="Capture the non-Timed JS events in EasyProfiler"
            onPress={() => enableProfiling()}
          />
          <Button
            title="Stop capturing"
            onPress={() => stopProfiling()}
            color="#FF0000"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    gap: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonsColumn: {
    gap: 16,
  },
});

export default App;
```

---

# 레퍼런스

## 메서드

### `isEnabled()`

```tsx
static isEnabled(): boolean;
```

---

### `beginEvent()`

```tsx
static beginEvent(eventName: string | (() => string), args?: EventArgs);
```

동일한 호출 스택 프레임 내에서 프로파일을 시작하고 종료하기 위한 beginEvent/endEvent입니다.

---

### `endEvent()`

```tsx
static endEvent(args?: EventArgs);
```

---

### `beginAsyncEvent()`

```tsx
static beginAsyncEvent(
  eventName: string | (() => string),
  args?: EventArgs,
): number;
```

종료가 다른 스레드에서 발생하거나 현재 스택 프레임 밖에서 발생할 수 있는 프로파일을 시작하고 종료하기 위한 beginAsyncEvent/endAsyncEvent입니다. 예를 들어 await 시, 반환된 cookie 변수를 endAsyncEvent 호출의 입력으로 사용하여 프로파일을 종료해야 합니다.

---

### `endAsyncEvent()`

```tsx
static endAsyncEvent(
  eventName: EventName,
  cookie: number,
  args?: EventArgs,
);
```

---

### `counterEvent()`

```tsx
static counterEvent(eventName: string | (() => string), value: number);
```

systrace 타임라인의 profileName에 값을 등록합니다.
