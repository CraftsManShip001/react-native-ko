---
id: usecolorscheme
title: useColorScheme
---

```tsx
import {useColorScheme} from 'react-native';
```

`useColorScheme` React 훅은 [`Appearance`](appearance) 모듈로부터 색상 구성표 업데이트를 제공하고 구독합니다. 반환값은 현재 활성화된 색상 구성표를 나타냅니다. 이 값은 사용자의 직접적인 동작(예: 기기 설정에서 테마 선택 또는 [`setColorScheme`](appearance#setcolorscheme)을 통한 애플리케이션 수준의 사용자 인터페이스 스타일 설정) 또는 스케줄(예: 낮/밤 주기에 따른 라이트 및 다크 테마)에 의해 이후에 업데이트될 수 있습니다.

### 반환값

- `'light'`: 라이트 색상 구성표가 적용되어 있습니다.
- `'dark'`: 다크 색상 구성표가 적용되어 있습니다.
- `'unspecified'`: **_반환되지 않습니다_** (타입이 잘못 지정됨).
- `null`: 네이티브 Appearance 모듈을 사용할 수 없는 경우 반환될 수 있습니다.

---

## 예시

```SnackPlayer
import {Text, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>useColorScheme(): {colorScheme}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

이 훅을 React 컨텍스트와 함께 사용하여 애플리케이션에 라이트 및 다크 테마 지원을 추가하는 방법을 보여주는 완전한 예시는 [`AppearanceExample.js`](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/Appearance/AppearanceExample.js)에서 확인할 수 있습니다.
