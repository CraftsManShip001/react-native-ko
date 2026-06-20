---
id: transforms
title: Transforms
---

Transforms는 2D 또는 3D 변환을 사용하여 컴포넌트의 외관과 위치를 수정하는 데 도움이 되는 스타일 속성입니다. 그러나 변환을 적용하면 변환된 컴포넌트 주변의 레이아웃은 동일하게 유지되므로 인접한 컴포넌트와 겹칠 수 있습니다. 이러한 겹침을 방지하기 위해 변환된 컴포넌트, 인접 컴포넌트에 마진을 적용하거나 컨테이너에 패딩을 적용할 수 있습니다.

## 예시

```SnackPlayer name=Transforms%20Example
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.box}>
          <Text style={styles.text}>Original Object</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{scale: 2}],
            },
          ]}>
          <Text style={styles.text}>Scale by 2</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{scaleX: 2}],
            },
          ]}>
          <Text style={styles.text}>ScaleX by 2</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{scaleY: 2}],
            },
          ]}>
          <Text style={styles.text}>ScaleY by 2</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{rotate: '45deg'}],
            },
          ]}>
          <Text style={styles.text}>Rotate by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{rotateX: '45deg'}, {rotateZ: '45deg'}],
            },
          ]}>
          <Text style={styles.text}>Rotate X&Z by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{rotateY: '45deg'}, {rotateZ: '45deg'}],
            },
          ]}>
          <Text style={styles.text}>Rotate Y&Z by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{skewX: '45deg'}],
            },
          ]}>
          <Text style={styles.text}>SkewX by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{skewY: '45deg'}],
            },
          ]}>
          <Text style={styles.text}>SkewY by 45 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{skewX: '30deg'}, {skewY: '30deg'}],
            },
          ]}>
          <Text style={styles.text}>Skew X&Y by 30 deg</Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{translateX: -50}],
            },
          ]}>
          <Text style={styles.text}>TranslateX by -50 </Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [{translateY: 50}],
            },
          ]}>
          <Text style={styles.text}>TranslateY by 50 </Text>
        </View>

        <View
          style={[
            styles.box,
            {
              transform: [
                {
                  matrix: [1, 0.5, 0, 0, 0.5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                },
              ],
            },
          ]}>
          <Text style={styles.text}>Matrix Transform</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    marginVertical: 40,
    backgroundColor: '#61dafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 8,
    color: '#000',
    textAlign: 'center',
  },
});

export default App;
```

---

# 레퍼런스

## Transform

`transform`은 변환 객체의 배열 또는 공백으로 구분된 문자열 값을 허용합니다. 각 객체는 변환할 속성을 키로, 변환에 사용할 값을 값으로 지정합니다. 객체는 결합하지 않아야 합니다. 객체당 하나의 키/값 쌍을 사용하세요.

rotate 변환은 변환이 각도(deg) 또는 라디안(rad)으로 표현될 수 있도록 문자열이 필요합니다. 예를 들어:

```js
{
  transform: [{rotateX: '45deg'}, {rotateZ: '0.785398rad'}],
}
```

공백으로 구분된 문자열을 사용하여 동일하게 표현할 수도 있습니다:

```js
{
  transform: 'rotateX(45deg) rotateZ(0.785398rad)',
}
```

skew 변환은 변환이 각도(deg)로 표현될 수 있도록 문자열이 필요합니다. 예를 들어:

```js
{
  transform: [{skewX: '45deg'}],
}
```

### Matrix Transform

`matrix` 변환은 16개의 숫자 배열로 된 4x4 변환 행렬을 허용합니다. 이를 통해 단일 연산으로 이동, 회전, 스케일링 및 기울이기를 결합하는 복잡한 변환을 적용할 수 있습니다.

행렬은 열 우선 순서로 지정됩니다:

```js
{
  transform: [
    {
      matrix: [
        scaleX,
        skewY,
        0,
        0,
        skewX,
        scaleY,
        0,
        0,
        0,
        0,
        1,
        0,
        translateX,
        translateY,
        0,
        1,
      ],
    },
  ];
}
```

예를 들어, 스케일과 기울이기를 결합하여 적용하려면:

```js
{
  transform: [
    {
      matrix: [
        1, 0.5, 0, 0, 0.5, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
      ],
    },
  ];
}
```

:::note
Matrix 변환은 애니메이션 라이브러리에서 나온 것과 같이 미리 계산된 변환 행렬을 적용하거나 UI 편집기 애플리케이션을 구축할 때 유용합니다. 기본 변환의 경우 개별 변환 속성(scale, rotate, translate 등)을 사용하는 것이 더 읽기 쉬우므로 권장합니다.
:::

| Type                                                                                                                                                                                                                                                                                                          | Required |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| array of objects: `{matrix: number[]}`, `{perspective: number}`, `{rotate: string}`, `{rotateX: string}`, `{rotateY: string}`, `{rotateZ: string}`, `{scale: number}`, `{scaleX: number}`, `{scaleY: number}`, `{translateX: number}`, `{translateY: number}`, `{skewX: string}`, `{skewY: string}` or string | No       |

---

### 🗑️ `decomposedMatrix`, `rotation`, `scaleX`, `scaleY`, `transformMatrix`, `translateX`, `translateY`

:::warning Deprecated
대신 [`transform`](transforms#transform) prop을 사용하세요.
:::

## Transform Origin

`transformOrigin` 속성은 View 변환의 기준점을 설정합니다. 변환 기준점은 변환이 적용되는 지점입니다. 기본적으로 변환의 기준점은 `center`입니다.

# 예시

```SnackPlayer name=TransformOrigin%20Example
import {useEffect, useRef} from 'react';
import {Animated, View, StyleSheet, Easing} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.transformOriginWrapper}>
          <Animated.View
            style={[
              styles.transformOriginView,
              {
                transform: [{rotate: spin}],
              },
            ]}
          />
        </View>
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
  transformOriginWrapper: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  transformOriginView: {
    backgroundColor: 'pink',
    width: 100,
    height: 100,
    transformOrigin: 'top',
  },
});

export default App;
```

### 값

Transform origin은 `px`, `percentage` 및 `top`, `left`, `right`, `bottom`, `center` 키워드 값을 지원합니다.

`transformOrigin` 속성은 하나, 두 개 또는 세 개의 값으로 지정할 수 있으며, 각 값은 오프셋을 나타냅니다.

#### 단일 값 문법:

- 값은 `px`, `percentage` 또는 `left`, `center`, `right`, `top`, `bottom` 키워드 중 하나여야 합니다.

```js
{
  transformOrigin: '20px',
  transformOrigin: 'bottom',
}
```

#### 두 값 문법:

- 첫 번째 값(x-offset)은 `px`, `percentage` 또는 `left`, `center`, `right` 키워드 중 하나여야 합니다.
- 두 번째 값(y-offset)은 `px`, `percentage` 또는 `top`, `center`, `bottom` 키워드 중 하나여야 합니다.

```js
{
  transformOrigin: '10px 2px',
  transformOrigin: 'left top',
  transformOrigin: 'top right',
}
```

#### 세 값 문법:

- 처음 두 값은 두 값 문법과 동일합니다.
- 세 번째 값(z-offset)은 `px`여야 합니다. 항상 Z 오프셋을 나타냅니다.

```js
{
  transformOrigin: '2px 30% 10px',
  transformOrigin: 'right bottom 20px',
}
```

#### 배열 문법

`transformOrigin`은 배열 문법도 지원합니다. Animated API와 함께 사용하기 편리하며, 문자열 파싱을 피하므로 더 효율적입니다.

```js
{
  // Using numeric values
  transformOrigin: [10, 30, 40],
  // Mixing numeric and percentage values
  transformOrigin: [10, '20%', 0],
}
```

추가 정보는 MDN의 [Transform origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin) 가이드를 참조하세요.
