---
id: usewindowdimensions
title: useWindowDimensions
---

```tsx
import {useWindowDimensions} from 'react-native';
```

`useWindowDimensions`는 화면 크기나 폰트 배율이 변경될 때 모든 값을 자동으로 업데이트합니다. 다음과 같이 애플리케이션 창의 너비와 높이를 가져올 수 있습니다.

```tsx
const {height, width} = useWindowDimensions();
```

## 예시

```SnackPlayer name=useWindowDimensions&supportedPlatforms=ios,android
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Window Dimension Data</Text>
        <Text>Height: {height}</Text>
        <Text>Width: {width}</Text>
        <Text>Font scale: {fontScale}</Text>
        <Text>Pixel ratio: {scale}</Text>
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
  header: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default App;
```

## 속성

### `fontScale`

```tsx
useWindowDimensions().fontScale;
```

현재 사용 중인 폰트의 배율입니다. 일부 운영 체제에서는 사용자가 읽기 편의를 위해 폰트 크기를 크거나 작게 조정할 수 있습니다. 이 속성을 통해 현재 적용된 배율을 확인할 수 있습니다.

---

### `height`

```tsx
useWindowDimensions().height;
```

앱이 차지하는 창 또는 화면의 높이(픽셀 단위)입니다.

---

### `scale`

```tsx
useWindowDimensions().scale;
```

앱이 실행 중인 기기의 픽셀 비율입니다. 값은 다음과 같습니다.

- `1`: 1포인트가 1픽셀과 동일함을 나타냅니다(일반적으로 PPI/DPI가 96이며, 일부 플랫폼에서는 76).
- `2` 또는 `3`: Retina 또는 고해상도 디스플레이를 나타냅니다.

---

### `width`

```tsx
useWindowDimensions().width;
```

앱이 차지하는 창 또는 화면의 너비(픽셀 단위)입니다.
