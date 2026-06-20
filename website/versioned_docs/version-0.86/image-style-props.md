---
id: image-style-props
title: Image Style Props
---

## 예시

### Image 리사이즈 모드

```SnackPlayer name=Image%20Resize%20Modes%20Example
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const asset = require('@expo/snack-static/react-native-logo.png');

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image style={[styles.image, {resizeMode: 'cover'}]} source={asset} />
          <Text style={styles.text}>resizeMode : cover</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'contain'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : contain</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'stretch'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : stretch</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'repeat'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : repeat</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'center'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : center</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 12,
    alignItems: 'center',
    gap: 16,
  },
  image: {
    borderWidth: 1,
    borderColor: 'red',
    height: 100,
    width: 200,
  },
  text: {
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default DisplayAnImageWithStyle;
```

### Image 테두리

```SnackPlayer name=Style%20BorderWidth%20and%20BorderColor%20Example
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          borderColor: 'red',
          borderWidth: 5,
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>borderColor & borderWidth</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

### Image 테두리 반경

```SnackPlayer name=Style%20Border%20Radius%20Example
import {View, Image, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const asset = require('@expo/snack-static/react-native-logo.png');

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image
            style={[styles.image, {borderTopRightRadius: 20}]}
            source={asset}
          />
          <Text>borderTopRightRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderBottomRightRadius: 20}]}
            source={asset}
          />
          <Text>borderBottomRightRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderBottomLeftRadius: 20}]}
            source={asset}
          />
          <Text>borderBottomLeftRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderTopLeftRadius: 20}]}
            source={asset}
          />
          <Text>borderTopLeftRadius</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderWidth: 1,
    borderColor: 'red',
    height: 100,
    width: 200,
  },
});

export default DisplayAnImageWithStyle;
```

### Image 틴트

```SnackPlayer name=Style%20tintColor%20Function%20Component
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          tintColor: '#000000',
          resizeMode: 'contain',
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>tintColor</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

# 레퍼런스

## Props

### `backfaceVisibility`

회전된 이미지의 뒷면이 표시되어야 하는지 여부를 정의하는 속성입니다.

| Type                          | Default     |
| ----------------------------- | ----------- |
| enum(`'visible'`, `'hidden'`) | `'visible'` |

---

### `backgroundColor`

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `borderBottomLeftRadius`

| Type   |
| ------ |
| number |

---

### `borderBottomRightRadius`

| Type   |
| ------ |
| number |

---

### `borderColor`

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `borderRadius`

| Type   |
| ------ |
| number |

---

### `borderTopLeftRadius`

| Type   |
| ------ |
| number |

---

### `borderTopRightRadius`

| Type   |
| ------ |
| number |

---

### `borderWidth`

| Type   |
| ------ |
| number |

---

### `opacity`

이미지의 불투명도 값을 설정합니다. 숫자는 `0.0`에서 `1.0` 범위여야 합니다.

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

### `overflow`

| Type                          | Default     |
| ----------------------------- | ----------- |
| enum(`'visible'`, `'hidden'`) | `'visible'` |

---

### `overlayColor` <div className="label android">Android</div>

이미지에 둥근 모서리가 있을 때 `overlayColor`를 지정하면 모서리의 나머지 공간이 단색으로 채워집니다. 이는 Android의 둥근 모서리 구현에서 지원되지 않는 경우에 유용합니다.

- `'contain'` 등 특정 리사이즈 모드
- 애니메이션 GIF

이 props를 사용하는 일반적인 방법은 단색 배경에 이미지를 표시하고 `overlayColor`를 배경과 동일한 색상으로 설정하는 것입니다.

이 기능이 내부적으로 작동하는 방식에 대한 자세한 내용은 [Fresco 문서](https://frescolib.org/docs/rounded-corners-and-circles.html)를 참조하세요.

| Type   |
| ------ |
| string |

---

### `resizeMode`

프레임이 원본 이미지 치수와 일치하지 않을 때 이미지 크기를 조정하는 방법을 결정합니다. 기본값은 `cover`입니다.

- `cover`: 이미지를 균일하게 확대/축소하여(이미지의 종횡비 유지) 다음 조건을 만족합니다.
  - 이미지의 두 치수(너비와 높이) 모두 뷰의 해당 치수(패딩 제외)보다 크거나 같습니다.
  - 확대/축소된 이미지의 적어도 하나의 치수가 뷰의 해당 치수(패딩 제외)와 같습니다.

- `contain`: 이미지를 균일하게 확대/축소하여(이미지의 종횡비 유지) 이미지의 두 치수(너비와 높이) 모두 뷰의 해당 치수(패딩 제외)보다 작거나 같도록 합니다.

- `stretch`: 너비와 높이를 독립적으로 확대/축소합니다. 이로 인해 src의 종횡비가 변경될 수 있습니다.

- `repeat`: 뷰의 프레임을 덮도록 이미지를 반복합니다. 이미지는 크기와 종횡비를 유지하지만, 뷰보다 큰 경우에는 뷰 안에 포함되도록 균일하게 축소됩니다.

- `center`: 두 치수 모두에서 뷰의 중앙에 이미지를 배치합니다. 이미지가 뷰보다 큰 경우 뷰 안에 포함되도록 균일하게 축소됩니다.

| Type                                                              | Default   |
| ----------------------------------------------------------------- | --------- |
| enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` |

---

### `objectFit`

프레임이 원본 이미지 치수와 일치하지 않을 때 이미지 크기를 조정하는 방법을 결정합니다.

| Type                                                   | Default   |
| ------------------------------------------------------ | --------- |
| enum(`'cover'`, `'contain'`, `'fill'`, `'scale-down'`) | `'cover'` |

---

### `tintColor`

투명하지 않은 모든 픽셀의 색상을 `tintColor`로 변경합니다.

| Type               |
| ------------------ |
| [color](colors.md) |
