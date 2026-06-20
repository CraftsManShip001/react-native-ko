---
id: layout-props
title: Layout Props
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

:::info
이 프로퍼티들에 대한 더 자세한 예제는 [Flexbox를 이용한 레이아웃](flexbox) 페이지에서 확인할 수 있습니다.
:::

### 예제

다음 예제는 다양한 프로퍼티가 React Native 레이아웃에 미치는 영향을 보여줍니다. 예를 들어 UI에서 정사각형을 추가하거나 제거하면서 `flexWrap` 프로퍼티의 값을 변경해 보세요.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=LayoutProps%20Example&ext=js
import {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  };

  const changeSetting = (value, options, setterFunction) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.playingSpace, hookedStyles]}>
          {squares.map(elem => elem)}
        </View>
        <ScrollView style={styles.layoutContainer}>
          <View style={styles.controlSpace}>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Direction"
                onPress={() =>
                  changeSetting(flexDirection, flexDirections, setFlexDirection)
                }
              />
              <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Justify Content"
                onPress={() =>
                  changeSetting(
                    justifyContent,
                    justifyContents,
                    setJustifyContent,
                  )
                }
              />
              <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Align Items"
                onPress={() =>
                  changeSetting(alignItems, alignItemsArr, setAlignItems)
                }
              />
              <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Direction"
                onPress={() =>
                  changeSetting(direction, directions, setDirection)
                }
              />
              <Text style={styles.text}>{directions[direction]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Wrap"
                onPress={() => changeSetting(wrap, wraps, setWrap)}
              />
              <Text style={styles.text}>{wraps[wrap]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Add Square"
                onPress={() => setSquares([...squares, <Square />])}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Delete Square"
                onPress={() =>
                  setSquares(squares.filter((v, i) => i !== squares.length - 1))
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const flexDirections = ['row', 'row-reverse', 'column', 'column-reverse'];
const justifyContents = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
const alignItemsArr = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
];
const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
const directions = ['inherit', 'ltr', 'rtl'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 0.5,
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
    overflow: 'hidden',
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 14).toString(16);
  });
};

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=LayoutProps%20Example&ext=tsx
import {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlexAlignType,
  FlexStyle,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  } as FlexStyle;

  const changeSetting = (
    value: number,
    options: any[],
    setterFunction: (index: number) => void,
  ) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.playingSpace, hookedStyles]}>
          {squares.map(elem => elem)}
        </View>
        <ScrollView style={styles.layoutContainer}>
          <View style={styles.controlSpace}>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Direction"
                onPress={() =>
                  changeSetting(flexDirection, flexDirections, setFlexDirection)
                }
              />
              <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Justify Content"
                onPress={() =>
                  changeSetting(
                    justifyContent,
                    justifyContents,
                    setJustifyContent,
                  )
                }
              />
              <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Align Items"
                onPress={() =>
                  changeSetting(alignItems, alignItemsArr, setAlignItems)
                }
              />
              <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Direction"
                onPress={() =>
                  changeSetting(direction, directions, setDirection)
                }
              />
              <Text style={styles.text}>{directions[direction]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Change Flex Wrap"
                onPress={() => changeSetting(wrap, wraps, setWrap)}
              />
              <Text style={styles.text}>{wraps[wrap]}</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Add Square"
                onPress={() => setSquares([...squares, <Square />])}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                title="Delete Square"
                onPress={() =>
                  setSquares(squares.filter((v, i) => i !== squares.length - 1))
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const flexDirections = [
  'row',
  'row-reverse',
  'column',
  'column-reverse',
] as FlexStyle['flexDirection'][];
const justifyContents = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as FlexStyle['justifyContent'][];
const alignItemsArr = [
  'flex-start',
  'flex-end',
  'center',
  'stretch',
  'baseline',
] as FlexAlignType[];
const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
const directions = ['inherit', 'ltr', 'rtl'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 0.5,
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
    overflow: 'hidden',
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 14).toString(16);
  });
};

export default App;
```

</TabItem>
</Tabs>

---

# 레퍼런스

## Props

### `alignContent`

`alignContent`는 교차 방향에서 행의 정렬 방식을 제어하며, 부모의 `alignContent`를 재정의합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content)를 참조하세요.

| Type                                                                                                 | Required |
| ---------------------------------------------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around', 'space-evenly') | No       |

---

### `alignItems`

`alignItems`는 교차 방향에서 자식 요소의 정렬 방식을 제어합니다. 예를 들어 자식 요소가 수직으로 흐른다면, `alignItems`는 수평 정렬 방식을 제어합니다. CSS의 `align-items`와 유사하게 동작합니다(기본값: stretch).

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)를 참조하세요.

| Type                                                            | Required |
| --------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'stretch', 'baseline') | No       |

---

### `alignSelf`

`alignSelf`는 교차 방향에서 자식 요소의 정렬 방식을 제어하며, 부모의 `alignItems`를 재정의합니다. CSS의 `align-self`와 유사하게 동작합니다(기본값: auto).

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)를 참조하세요.

| Type                                                                    | Required |
| ----------------------------------------------------------------------- | -------- |
| enum('auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline') | No       |

---

### `aspectRatio`

`aspectRatio`는 노드의 정의되지 않은 크기를 제어합니다.

- width/height가 설정된 노드에서는 설정되지 않은 차원의 크기를 제어합니다.
- flex basis가 설정된 노드에서는 설정되지 않은 경우 교차 축의 노드 크기를 제어합니다.
- 측정 함수가 있는 노드에서는 측정 함수가 flex basis를 측정하는 것처럼 동작합니다.
- flex grow/shrink가 있는 노드에서는 설정되지 않은 경우 교차 축의 노드 크기를 제어합니다.
- `aspectRatio`는 min/max 크기를 고려합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `borderBottomWidth`

`borderBottomWidth`는 CSS의 `border-bottom-width`와 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderEndWidth`

direction이 `ltr`일 때 `borderEndWidth`는 `borderRightWidth`와 동일합니다. direction이 `rtl`일 때 `borderEndWidth`는 `borderLeftWidth`와 동일합니다.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderLeftWidth`

`borderLeftWidth`는 CSS의 `border-left-width`와 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderRightWidth`

`borderRightWidth`는 CSS의 `border-right-width`와 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderStartWidth`

direction이 `ltr`일 때 `borderStartWidth`는 `borderLeftWidth`와 동일합니다. direction이 `rtl`일 때 `borderStartWidth`는 `borderRightWidth`와 동일합니다.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderTopWidth`

`borderTopWidth`는 CSS의 `border-top-width`와 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `borderWidth`

`borderWidth`는 CSS의 `border-width`와 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/border-width)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `bottom`

`bottom`은 이 컴포넌트의 하단 가장자리를 오프셋하는 논리적 픽셀 수입니다.

CSS의 `bottom`과 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

`bottom`이 레이아웃에 미치는 영향에 대한 자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/bottom)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `boxSizing`

`boxSizing`은 요소의 다양한 크기 props(`width`, `height`, `minWidth`, `minHeight` 등)가 어떻게 계산되는지를 정의합니다. `boxSizing`이 `border-box`이면 이 크기들은 요소의 테두리 박스에 적용됩니다. `content-box`이면 콘텐츠 박스에 적용됩니다. 기본값은 `border-box`입니다. 이 prop의 동작 방식에 대한 자세한 내용은 [웹 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)를 참조하세요.

| Type                              | Required |
| --------------------------------- | -------- |
| enum('border-box', 'content-box') | No       |

---

### `columnGap`

`columnGap`은 CSS의 `column-gap`과 유사하게 동작합니다. React Native에서는 픽셀 단위만 지원됩니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `direction`

`direction`은 사용자 인터페이스의 방향성 흐름을 지정합니다. 기본값은 `inherit`이며, 루트 노드는 현재 로케일을 기반으로 한 값을 가집니다.

자세한 내용은 [MDN CSS 레퍼런스](https://www.yogalayout.dev/docs/styling/layout-direction)를 참조하세요.

| Type                          | Required |
| ----------------------------- | -------- |
| enum('inherit', 'ltr', 'rtl') | No       |

---

### `display`

`display`는 이 컴포넌트의 디스플레이 타입을 설정합니다.

CSS의 `display`와 유사하게 동작하지만 `'flex'`, `'none'`, `'contents'` 값만 지원합니다. 기본값은 `flex`입니다.

| Type                             | Required |
| -------------------------------- | -------- |
| enum('none', 'flex', 'contents') | No       |

---

### `end`

direction이 `ltr`일 때 `end`는 `right`와 동일합니다. direction이 `rtl`일 때 `end`는 `left`와 동일합니다.

이 스타일은 `left` 및 `right` 스타일보다 우선합니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `flex`

React Native에서 `flex`는 CSS와 동일하게 동작하지 않습니다. `flex`는 문자열이 아닌 숫자이며, [Yoga](https://github.com/facebook/yoga) 레이아웃 엔진에 따라 동작합니다.

`flex`가 양수이면 컴포넌트가 유연해지며, flex 값에 비례하는 크기를 가집니다. 따라서 `flex`가 `2`인 컴포넌트는 `flex`가 `1`인 컴포넌트보다 두 배의 공간을 차지합니다. `flex: <양수>`는 `flexGrow: <양수>, flexShrink: 1, flexBasis: 0`과 동일합니다.

`flex`가 `0`이면 컴포넌트는 `width` 및 `height`에 따라 크기가 결정되고 유연하지 않습니다.

`flex`가 `-1`이면 컴포넌트는 일반적으로 `width` 및 `height`에 따라 크기가 결정됩니다. 하지만 공간이 충분하지 않으면 컴포넌트는 `minWidth` 및 `minHeight`까지 줄어듭니다.

`flexGrow`, `flexShrink`, `flexBasis`는 CSS와 동일하게 동작합니다.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexBasis`

`flexBasis`는 주 축을 따라 항목의 기본 크기를 제공하는 축 독립적인 방법입니다. 자식의 `flexBasis` 설정은 부모가 `flexDirection: row` 컨테이너일 때 해당 자식의 `width` 설정과 유사하며, 부모가 `flexDirection: column` 컨테이너일 때 자식의 `height` 설정과 유사합니다. 항목의 `flexBasis`는 `flexGrow` 및 `flexShrink` 계산이 수행되기 전의 항목 기본 크기입니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `flexDirection`

`flexDirection`은 컨테이너의 자식이 이동하는 방향을 제어합니다. `row`는 왼쪽에서 오른쪽으로, `column`은 위에서 아래로 이동하며, 나머지 두 값도 유추할 수 있을 것입니다. CSS의 `flex-direction`처럼 동작하지만 기본값은 `column`입니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)를 참조하세요.

| Type                                                   | Required |
| ------------------------------------------------------ | -------- |
| enum('row', 'row-reverse', 'column', 'column-reverse') | No       |

---

### `flexGrow`

`flexGrow`는 주 축을 따라 컨테이너 내의 여유 공간이 자식 요소들에게 어떻게 분배되어야 하는지를 설명합니다. 자식 요소들을 배치한 후, 컨테이너는 남은 공간을 자식의 flex grow 값에 따라 분배합니다.

`flexGrow`는 0 이상의 부동 소수점 값을 허용하며, 기본값은 0입니다. 컨테이너는 자식의 `flexGrow` 값에 비례하여 남은 공간을 분배합니다.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexShrink`

[`flexShrink`](layout-props#flexshrink)는 자식 요소들의 전체 크기가 주 축에서 컨테이너의 크기를 초과할 때 주 축을 따라 자식 요소들을 축소하는 방법을 설명합니다. `flexShrink`는 `flexGrow`와 매우 유사하며, 초과된 크기를 음의 남은 공간으로 간주하면 같은 방식으로 생각할 수 있습니다. 이 두 프로퍼티는 자식이 필요에 따라 커지고 줄어들 수 있도록 함께 잘 작동합니다.

`flexShrink`는 0 이상의 부동 소수점 값을 허용하며, 기본값은 0입니다. 컨테이너는 자식의 `flexShrink` 값에 비례하여 자식을 축소합니다.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `flexWrap`

`flexWrap`은 자식 요소가 flex 컨테이너의 끝에 도달한 후 줄 바꿈을 할 수 있는지를 제어합니다. CSS의 `flex-wrap`처럼 동작합니다(기본값: nowrap).

`alignItems: stretch`(기본값)와는 더 이상 함께 동작하지 않으므로, 예를 들어 `alignItems: flex-start`를 사용하는 것이 좋습니다(변경 사항 세부 내용: https://github.com/facebook/react-native/releases/tag/v0.28.0).

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap)를 참조하세요.

| Type                                   | Required |
| -------------------------------------- | -------- |
| enum('wrap', 'nowrap', 'wrap-reverse') | No       |

---

### `gap`

`gap`은 CSS의 `gap`과 유사하게 동작합니다. React Native에서는 픽셀 단위만 지원됩니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `height`

`height`는 이 컴포넌트의 높이를 설정합니다.

CSS의 `height`와 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/height)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `inset`

:::note
`inset`은 [새로운 아키텍처](/architecture/landing-page)에서만 사용 가능합니다.
:::

`inset` 설정은 `top`, `bottom`, `right`, `left` props를 각각 설정하는 것과 동일한 효과를 가집니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/inset)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetBlock`

:::note
`insetBlock`은 [새로운 아키텍처](/architecture/landing-page)에서만 사용 가능합니다.
:::

[`top`](layout-props#top) 및 [`bottom`](layout-props#bottom)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetBlockEnd`

:::note
`insetBlockEnd`는 [새로운 아키텍처](/architecture/landing-page)에서만 사용 가능합니다.
:::

[`bottom`](layout-props#bottom)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-end)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetBlockStart`

:::note
`insetBlockStart`는 [새로운 아키텍처](/architecture/landing-page)에서만 사용 가능합니다.
:::

[`top`](layout-props#top)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-start)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetInline`

:::note
`insetInline`은 [새로운 아키텍처](/architecture/landing-page)에서만 사용 가능합니다.
:::

[`right`](layout-props#right) 및 [`left`](layout-props#left)와 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetInlineEnd`

:::note
`insetInlineEnd`는 [새로운 아키텍처](/architecture/landing-page)에서만 사용 가능합니다.
:::

direction이 `ltr`일 때 `insetInlineEnd`는 [`right`](layout-props#right)와 동일합니다. direction이 `rtl`일 때 `insetInlineEnd`는 [`left`](layout-props#left)와 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-end)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `insetInlineStart`

:::note
`insetInlineStart`는 [새로운 아키텍처](/architecture/landing-page)에서만 사용 가능합니다.
:::

direction이 `ltr`일 때 `insetInlineStart`는 [`left`](layout-props#left)와 동일합니다. direction이 `rtl`일 때 `insetInlineStart`는 [`right`](layout-props#right)와 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `isolation`

:::note
`isolation`은 [새로운 아키텍처](/architecture/landing-page)에서만 사용 가능합니다.
:::

`isolation`을 사용하면 [스태킹 컨텍스트](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context)를 형성할 수 있습니다.

두 가지 값이 있습니다.

- `auto` (기본값): 아무것도 하지 않습니다.
- `isolate`: 스태킹 컨텍스트를 형성합니다.

| Type                    | Required |
| ----------------------- | -------- |
| enum('auto', 'isolate') | No       |

---

### `justifyContent`

`justifyContent`는 주 방향에서 자식 요소의 정렬 방식을 제어합니다. 예를 들어 자식 요소가 수직으로 흐른다면, `justifyContent`는 수직 정렬 방식을 제어합니다. CSS의 `justify-content`처럼 동작합니다(기본값: flex-start).

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)를 참조하세요.

| Type                                                                                      | Required |
| ----------------------------------------------------------------------------------------- | -------- |
| enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly') | No       |

---

### `left`

`left`는 이 컴포넌트의 왼쪽 가장자리를 오프셋하는 논리적 픽셀 수입니다.

CSS의 `left`와 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

`left`가 레이아웃에 미치는 영향에 대한 자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/left)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `margin`

`margin` 설정은 `marginTop`, `marginLeft`, `marginBottom`, `marginRight`를 각각 설정하는 것과 동일한 효과를 가집니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/margin)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginBottom`

`marginBottom`은 CSS의 `margin-bottom`과 유사하게 동작합니다. 자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginBlock`

[`marginVertical`](layout-props#marginvertical)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-block)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginBlockEnd`

[`marginBottom`](layout-props#marginbottom)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-block-end)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginBlockStart`

[`marginTop`](layout-props#margintop)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-block-start)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginEnd`

direction이 `ltr`일 때 `marginEnd`는 `marginRight`와 동일합니다. direction이 `rtl`일 때 `marginEnd`는 `marginLeft`와 동일합니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginHorizontal`

`marginHorizontal` 설정은 `marginLeft` 및 `marginRight`를 모두 설정하는 것과 동일한 효과를 가집니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginInline`

[`marginHorizontal`](layout-props#marginhorizontal)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-inline)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginInlineEnd`

direction이 `ltr`일 때 `marginInlineEnd`는 [`marginEnd`](layout-props#marginend)(즉, `marginRight`)와 동일합니다. direction이 `rtl`일 때 `marginInlineEnd`는 [`marginEnd`](layout-props#marginend)(즉, `marginLeft`)와 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-inline-end)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginInlineStart`

direction이 `ltr`일 때 `marginInlineStart`는 [`marginStart`](layout-props#marginstart)(즉, `marginLeft`)와 동일합니다. direction이 `rtl`일 때 `marginInlineStart`는 [`marginStart`](layout-props#marginstart)(즉, `marginRight`)와 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/margin-inline-start)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginLeft`

`marginLeft`는 CSS의 `margin-left`와 유사하게 동작합니다. 자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginRight`

`marginRight`는 CSS의 `margin-right`와 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginStart`

direction이 `ltr`일 때 `marginStart`는 `marginLeft`와 동일합니다. direction이 `rtl`일 때 `marginStart`는 `marginRight`와 동일합니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginTop`

`marginTop`은 CSS의 `margin-top`과 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `marginVertical`

`marginVertical` 설정은 `marginTop` 및 `marginBottom`을 모두 설정하는 것과 동일한 효과를 가집니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `maxHeight`

`maxHeight`는 이 컴포넌트의 최대 높이(논리적 픽셀 단위)입니다.

CSS의 `max-height`와 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `maxWidth`

`maxWidth`는 이 컴포넌트의 최대 너비(논리적 픽셀 단위)입니다.

CSS의 `max-width`와 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/max-width)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `minHeight`

`minHeight`는 이 컴포넌트의 최소 높이(논리적 픽셀 단위)입니다.

CSS의 `min-height`와 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/min-height)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `minWidth`

`minWidth`는 이 컴포넌트의 최소 너비(논리적 픽셀 단위)입니다.

CSS의 `min-width`와 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `overflow`

`overflow`는 자식 요소가 측정되고 표시되는 방식을 제어합니다. `overflow: hidden`은 뷰를 클리핑하고, `overflow: scroll`은 부모의 주 축과 독립적으로 뷰를 측정합니다. CSS의 `overflow`처럼 동작합니다(기본값: visible).

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)를 참조하세요.

| Type                                | Required |
| ----------------------------------- | -------- |
| enum('visible', 'hidden', 'scroll') | No       |

---

### `padding`

`padding` 설정은 `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`를 각각 설정하는 것과 동일한 효과를 가집니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/padding)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingBottom`

`paddingBottom`은 CSS의 `padding-bottom`과 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingBlock`

[`paddingVertical`](layout-props#paddingvertical)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingBlockEnd`

[`paddingBottom`](layout-props#paddingbottom)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block-end)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingBlockStart`

[`paddingTop`](layout-props#paddingtop)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-block-start)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingEnd`

direction이 `ltr`일 때 `paddingEnd`는 `paddingRight`와 동일합니다. direction이 `rtl`일 때 `paddingEnd`는 `paddingLeft`와 동일합니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingHorizontal`

`paddingHorizontal` 설정은 `paddingLeft` 및 `paddingRight`를 모두 설정하는 것과 같습니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingInline`

[`paddingHorizontal`](layout-props#paddinghorizontal)과 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingInlineEnd`

direction이 `ltr`일 때 `paddingInlineEnd`는 [`paddingEnd`](layout-props#paddingend)(즉, `paddingRight`)와 동일합니다. direction이 `rtl`일 때 `paddingInlineEnd`는 [`paddingEnd`](layout-props#paddingend)(즉, `paddingLeft`)와 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline-end)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingInlineStart`

direction이 `ltr`일 때 `paddingInlineStart`는 [`paddingStart`](layout-props#paddingstart)(즉, `paddingLeft`)와 동일합니다. direction이 `rtl`일 때 `paddingInlineStart`는 [`paddingStart`](layout-props#paddingstart)(즉, `paddingRight`)와 동일합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding-inline-start)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingLeft`

`paddingLeft`는 CSS의 `padding-left`와 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingRight`

`paddingRight`는 CSS의 `padding-right`와 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingStart`

direction이 `ltr`일 때 `paddingStart`는 `paddingLeft`와 동일합니다. direction이 `rtl`일 때 `paddingStart`는 `paddingRight`와 동일합니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingTop`

`paddingTop`은 CSS의 `padding-top`과 유사하게 동작합니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `paddingVertical`

`paddingVertical` 설정은 `paddingTop` 및 `paddingBottom`을 모두 설정하는 것과 같습니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `position`

React Native에서 `position`은 [일반 CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/position)와 유사하지만, 모든 것이 기본적으로 `relative`로 설정됩니다.

`relative`는 요소를 레이아웃의 일반적인 흐름에 따라 배치합니다. 인셋(`top`, `bottom`, `left`, `right`)은 이 레이아웃을 기준으로 오프셋됩니다.

`absolute`는 요소를 레이아웃의 일반적인 흐름에서 제거합니다. 인셋은 해당 [컨테이닝 블록](./flexbox.md#the-containing-block)을 기준으로 오프셋됩니다.

`static`은 요소를 레이아웃의 일반적인 흐름에 따라 배치합니다. 인셋은 아무런 효과가 없습니다.
`static` 요소는 절대 위치 자식 요소를 위한 컨테이닝 블록을 형성하지 않습니다.

자세한 내용은 [Flexbox를 이용한 레이아웃 문서](./flexbox.md#position)를 참조하세요. 또한 [Yoga 문서](https://www.yogalayout.dev/docs/styling/position)에는 React Native와 CSS에서 `position`이 어떻게 다른지에 대한 자세한 내용이 있습니다.

| Type                                   | Required |
| -------------------------------------- | -------- |
| enum('absolute', 'relative', 'static') | No       |

---

### `right`

`right`는 이 컴포넌트의 오른쪽 가장자리를 오프셋하는 논리적 픽셀 수입니다.

CSS의 `right`와 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

`right`가 레이아웃에 미치는 영향에 대한 자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/right)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `rowGap`

`rowGap`은 CSS의 `row-gap`과 유사하게 동작합니다. React Native에서는 픽셀 단위만 지원됩니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `start`

direction이 `ltr`일 때 `start`는 `left`와 동일합니다. direction이 `rtl`일 때 `start`는 `right`와 동일합니다.

이 스타일은 `left`, `right`, `end` 스타일보다 우선합니다.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `top`

`top`은 이 컴포넌트의 상단 가장자리를 오프셋하는 논리적 픽셀 수입니다.

CSS의 `top`과 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

`top`이 레이아웃에 미치는 영향에 대한 자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/top)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `width`

`width`는 이 컴포넌트의 너비를 설정합니다.

CSS의 `width`와 유사하게 동작하지만, React Native에서는 포인트나 백분율을 사용해야 합니다. em 및 기타 단위는 지원되지 않습니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/width)를 참조하세요.

| Type           | Required |
| -------------- | -------- |
| number, string | No       |

---

### `zIndex`

`zIndex`는 어떤 컴포넌트가 다른 컴포넌트 위에 표시될지를 제어합니다. 일반적으로 `zIndex`를 사용할 필요는 없습니다. 컴포넌트는 문서 트리의 순서에 따라 렌더링되므로, 나중에 오는 컴포넌트가 앞에 오는 컴포넌트 위에 그려집니다. 애니메이션이나 이 동작을 원하지 않는 커스텀 모달 인터페이스가 있을 때 `zIndex`가 유용할 수 있습니다.

CSS의 `z-index` 프로퍼티처럼 동작합니다 - `zIndex`가 더 큰 컴포넌트가 위에 렌더링됩니다. z 방향은 폰에서 눈을 향해 뻗어 나가는 방향이라고 생각하세요.

iOS에서는 `zIndex`가 예상대로 동작하려면 `View`들이 서로 형제 관계여야 할 수 있습니다.

자세한 내용은 [MDN CSS 레퍼런스](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)를 참조하세요.

| Type   | Required |
| ------ | -------- |
| number | No       |
