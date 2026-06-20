---
id: shadow-props
title: Shadow Props
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Shadow%20Props&supportedPlatforms=ios&ext=js&dependencies=@react-native-community/slider
import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

const ShadowPropSlider = ({label, value, ...props}) => {
  return (
    <>
      <Text>
        {label} ({value.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
};

const App = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.square,
            {
              shadowOffset: {
                width: shadowOffsetWidth,
                height: -shadowOffsetHeight,
              },
              shadowOpacity,
              shadowRadius,
            },
          ]}
        />
        <View style={styles.controls}>
          <ShadowPropSlider
            label="shadowOffset - X"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetWidth}
            onValueChange={setShadowOffsetWidth}
          />
          <ShadowPropSlider
            label="shadowOffset - Y"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetHeight}
            onValueChange={setShadowOffsetHeight}
          />
          <ShadowPropSlider
            label="shadowRadius"
            minimumValue={0}
            maximumValue={100}
            value={shadowRadius}
            onValueChange={setShadowRadius}
          />
          <ShadowPropSlider
            label="shadowOpacity"
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={shadowOpacity}
            onValueChange={val => setShadowOpacity(val)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  square: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 150,
    shadowColor: 'black',
    width: 150,
  },
  controls: {
    paddingHorizontal: 12,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Shadow%20Props&supportedPlatforms=ios&ext=tsx&dependencies=@react-native-community/slider
import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Slider, {SliderProps} from '@react-native-community/slider';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ShadowPropSliderProps = SliderProps & {
  label: string;
};

const ShadowPropSlider = ({label, value, ...props}: ShadowPropSliderProps) => {
  return (
    <>
      <Text>
        {label} ({value?.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
};

const App = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.square,
            {
              shadowOffset: {
                width: shadowOffsetWidth,
                height: -shadowOffsetHeight,
              },
              shadowOpacity,
              shadowRadius,
            },
          ]}
        />
        <View style={styles.controls}>
          <ShadowPropSlider
            label="shadowOffset - X"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetWidth}
            onValueChange={setShadowOffsetWidth}
          />
          <ShadowPropSlider
            label="shadowOffset - Y"
            minimumValue={-50}
            maximumValue={50}
            value={shadowOffsetHeight}
            onValueChange={setShadowOffsetHeight}
          />
          <ShadowPropSlider
            label="shadowRadius"
            minimumValue={0}
            maximumValue={100}
            value={shadowRadius}
            onValueChange={setShadowRadius}
          />
          <ShadowPropSlider
            label="shadowOpacity"
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={shadowOpacity}
            onValueChange={val => setShadowOpacity(val)}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  square: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 150,
    shadowColor: 'black',
    width: 150,
  },
  controls: {
    paddingHorizontal: 12,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# 레퍼런스

React Native에는 세 가지 종류의 shadow API가 있습니다:

- `boxShadow`: View 스타일 prop으로, [동일한 이름의 웹 스타일 prop](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)을 사양에 맞게 구현한 것입니다.
- `dropShadow`: [`filter`](./view-style-props#filter) View 스타일 prop의 일부로 사용할 수 있는 특정 필터 함수입니다.
- 다양한 `shadow` props (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`): 플랫폼 수준 API가 노출하는 네이티브 대응 항목에 직접 매핑됩니다.

`dropShadow`와 `boxShadow`의 차이점은 다음과 같습니다:

- `dropShadow`는 `filter`의 일부인 반면, `boxShadow`는 독립적인 스타일 prop입니다.
- `dropShadow`는 알파 마스크이므로 알파 값이 양수인 픽셀만 그림자를 "투영"합니다. `boxShadow`는 내용과 무관하게 요소의 테두리 박스 주변에 그림자를 투영합니다(inset이 아닌 경우).
- `dropShadow`는 Android에서만 사용 가능하며, `boxShadow`는 iOS와 Android 모두에서 사용 가능합니다.
- `dropShadow`는 `boxShadow`처럼 inset으로 설정할 수 없습니다.
- `dropShadow`는 `boxShadow`와 달리 `spreadDistance` 인수를 지원하지 않습니다.

`boxShadow`와 `dropShadow` 모두 일반적으로 `shadow` props보다 더 많은 기능을 제공합니다. 그러나 `shadow` props는 네이티브 플랫폼 수준 API에 매핑되므로, 단순한 그림자만 필요하다면 이 props를 사용하는 것이 권장됩니다. 단, `shadowColor`만 Android와 iOS 모두에서 작동하며, 나머지 `shadow` props는 iOS에서만 작동합니다.

## Props

### `boxShadow`

문서는 [View 스타일 Props](./view-style-props#boxshadow)를 참고하세요.

### `dropShadow` <div className="label android">Android</div>

문서는 [View 스타일 Props](./view-style-props#filter)를 참고하세요.

### `shadowColor`

드롭 섀도우 색상을 설정합니다.

이 속성은 Android API 28 이상에서만 작동합니다. 하위 Android API에서 유사한 기능을 사용하려면 [`elevation` 속성](view-style-props#elevation-android)을 사용하세요.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `shadowOffset` <div className="label ios">iOS</div>

드롭 섀도우 오프셋을 설정합니다.

| Type                                     |
| ---------------------------------------- |
| object: `{width: number,height: number}` |

---

### `shadowOpacity` <div className="label ios">iOS</div>

드롭 섀도우 불투명도를 설정합니다(색상의 알파 컴포넌트와 곱해집니다).

| Type   |
| ------ |
| number |

---

### `shadowRadius` <div className="label ios">iOS</div>

드롭 섀도우 블러 반경을 설정합니다.

| Type   |
| ------ |
| number |
