---
id: progressbarandroid
title: '🗑️ ProgressBarAndroid'
---

:::warning Deprecated
대신 [커뮤니티 패키지](https://reactnative.directory/?search=progressbar) 중 하나를 사용하세요.
:::

앱이 로딩 중이거나 앱에서 어떤 작업이 진행 중임을 나타내는 데 사용하는 Android 전용 React 컴포넌트입니다.

### 예시

```SnackPlayer name=ProgressBarAndroid&supportedPlatforms=android
import {View, StyleSheet, ProgressBarAndroid, Text} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.example}>
        <Text>Circle Progress Indicator</Text>
        <ProgressBarAndroid />
      </View>
      <View style={styles.example}>
        <Text>Horizontal Progress Indicator</Text>
        <ProgressBarAndroid styleAttr="Horizontal" />
      </View>
      <View style={styles.example}>
        <Text>Colored Progress Indicator</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
      </View>
      <View style={styles.example}>
        <Text>Fixed Progress Value</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 24,
  },
});

export default App;
```

---

# Reference

## Props

[View Props](view.md#props)를 상속합니다.

### `animating`

ProgressBar를 표시할지(true, 기본값) 숨길지(false) 여부입니다.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `color`

프로그레스 바의 색상입니다.

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `indeterminate`

프로그레스 바가 불확정 진행 상태를 표시할지 여부입니다. `styleAttr`이 Horizontal인 경우에만 false로 설정할 수 있으며, 이 경우 `progress` 값이 필요합니다.

| Type              | Required |
| ----------------- | -------- |
| indeterminateType | No       |

---

### `progress`

진행률 값(0에서 1 사이)입니다.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `styleAttr`

ProgressBar의 스타일입니다. 다음 중 하나를 선택합니다:

- Horizontal
- Normal (기본값)
- Small
- Large
- Inverse
- SmallInverse
- LargeInverse

| Type                                                                                      | Required |
| ----------------------------------------------------------------------------------------- | -------- |
| enum('Horizontal', 'Normal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | No       |

---

### `testID`

엔드투엔드 테스트에서 이 뷰를 찾는 데 사용됩니다.

| Type   | Required |
| ------ | -------- |
| string | No       |
