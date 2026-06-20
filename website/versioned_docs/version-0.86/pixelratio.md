---
id: pixelratio
title: PixelRatio
---

`PixelRatio`는 기기의 픽셀 밀도와 폰트 스케일에 접근할 수 있게 해줍니다.

## 올바른 크기의 이미지 가져오기

픽셀 밀도가 높은 기기를 사용하는 경우 더 높은 해상도의 이미지를 가져와야 합니다. 표시하는 이미지의 크기에 픽셀 비율을 곱하는 것이 좋은 방법입니다.

```tsx
const image = getImage({
  width: PixelRatio.getPixelSizeForLayoutSize(200),
  height: PixelRatio.getPixelSizeForLayoutSize(100),
});
<Image source={image} style={{width: 200, height: 100}} />;
```

## 픽셀 그리드 스냅

iOS에서는 예를 들어 29.674825와 같이 임의의 정밀도로 요소의 위치와 크기를 지정할 수 있습니다. 그러나 물리적 디스플레이는 고정된 수의 픽셀만을 가지고 있습니다. 예를 들어 iPhone SE(1세대)는 640×1136, iPhone 11은 828×1792입니다. iOS는 하나의 원본 픽셀을 여러 픽셀로 분산시켜 눈을 속이는 방식으로 사용자 값에 최대한 충실하게 표현하려 합니다. 이 기법의 단점은 결과적으로 요소가 흐릿하게 보일 수 있다는 것입니다.

실제로 개발자들이 이 기능을 원하지 않으며, 흐릿한 요소를 피하기 위해 수동으로 반올림 처리를 해야 한다는 것을 발견했습니다. React Native에서는 모든 픽셀을 자동으로 반올림합니다.

이 반올림 시점에 주의해야 합니다. 반올림된 값과 반올림되지 않은 값을 동시에 사용하면 반올림 오류가 누적될 수 있습니다. 반올림 오류가 하나만 있어도 1픽셀 테두리가 사라지거나 두 배로 커질 수 있기 때문에 치명적입니다.

React Native에서는 JavaScript와 레이아웃 엔진 내의 모든 것이 임의의 정밀도 숫자로 작동합니다. 메인 스레드에서 네이티브 요소의 위치와 크기를 설정할 때만 반올림이 이루어집니다. 또한 반올림 오류가 누적되는 것을 방지하기 위해 부모가 아닌 루트를 기준으로 반올림됩니다.

## 예제

```SnackPlayer name=PixelRatio%20Example
import {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const size = 50;
const cat = {
  uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
  width: size,
  height: size,
};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text>Current Pixel Ratio is:</Text>
          <Text style={styles.value}>{PixelRatio.get()}</Text>
        </View>
        <View style={styles.container}>
          <Text>Current Font Scale is:</Text>
          <Text style={styles.value}>{PixelRatio.getFontScale()}</Text>
        </View>
        <View style={styles.container}>
          <Text>On this device images with a layout width of</Text>
          <Text style={styles.value}>{size} px</Text>
          <Image source={cat} />
        </View>
        <View style={styles.container}>
          <Text>require images with a pixel width of</Text>
          <Text style={styles.value}>
            {PixelRatio.getPixelSizeForLayoutSize(size)} px
          </Text>
          <Image
            source={cat}
            style={{
              width: PixelRatio.getPixelSizeForLayoutSize(size),
              height: PixelRatio.getPixelSizeForLayoutSize(size),
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    marginBottom: 12,
    marginTop: 4,
  },
});

export default App;
```

---

# 레퍼런스

## 메서드

### `get()`

```tsx
static get(): number;
```

기기의 픽셀 밀도를 반환합니다. 몇 가지 예시:

- `PixelRatio.get() === 1`
  - [mdpi Android 기기](https://material.io/tools/devices/)
- `PixelRatio.get() === 1.5`
  - [hdpi Android 기기](https://material.io/tools/devices/)
- `PixelRatio.get() === 2`
  - iPhone SE, 6S, 7, 8
  - iPhone XR
  - iPhone 11
  - [xhdpi Android 기기](https://material.io/tools/devices/)
- `PixelRatio.get() === 3`
  - iPhone 6S Plus, 7 Plus, 8 Plus
  - iPhone X, XS, XS Max
  - iPhone 11 Pro, 11 Pro Max
  - Pixel, Pixel 2
  - [xxhdpi Android 기기](https://material.io/tools/devices/)
- `PixelRatio.get() === 3.5`
  - Nexus 6
  - Pixel XL, Pixel 2 XL
  - [xxxhdpi Android 기기](https://material.io/tools/devices/)

---

### `getFontScale()`

```tsx
static getFontScale(): number;
```

폰트 크기의 스케일링 인수를 반환합니다. 이 값은 절대 폰트 크기를 계산하는 데 사용되는 비율이므로, 이에 크게 의존하는 요소는 이 값을 사용하여 계산해야 합니다.

- Android에서는 **설정 > 디스플레이 > 글꼴 크기**에서 설정한 사용자 환경 설정을 반영합니다.
- iOS에서는 **설정 > 디스플레이 및 밝기 > 텍스트 크기**에서 설정한 사용자 환경 설정을 반영하며, **설정 > 손쉬운 사용 > 디스플레이 및 텍스트 크기 > 큰 텍스트**에서도 업데이트할 수 있습니다.

폰트 스케일이 설정되지 않은 경우 기기 픽셀 비율을 반환합니다.

---

### `getPixelSizeForLayoutSize()`

```tsx
static getPixelSizeForLayoutSize(layoutSize: number): number;
```

레이아웃 크기(dp)를 픽셀 크기(px)로 변환합니다.

정수값을 반환하도록 보장됩니다.

---

### `roundToNearestPixel()`

```tsx
static roundToNearestPixel(layoutSize: number): number;
```

레이아웃 크기(dp)를 정수 픽셀 수에 해당하는 가장 가까운 레이아웃 크기로 반올림합니다. 예를 들어, PixelRatio가 3인 기기에서 `PixelRatio.roundToNearestPixel(8.4) = 8.33`이며, 이는 정확히 (8.33 \* 3) = 25픽셀에 해당합니다.
