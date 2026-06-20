---
id: easing
title: Easing
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`Easing` 모듈은 일반적인 easing 함수들을 구현합니다. 이 모듈은 [`Animated.timing()`](animated.md#timing)에서 애니메이션에 물리적으로 그럴듯한 동작을 부여하기 위해 사용됩니다.

일부 일반적인 easing 함수의 시각화는 https://easings.net/ 에서 확인할 수 있습니다.

### 사전 정의된 애니메이션

`Easing` 모듈은 다음 메서드를 통해 여러 사전 정의된 애니메이션을 제공합니다:

- [`back`](easing.md#back) 앞으로 이동하기 전에 객체가 약간 뒤로 가는 기본 애니메이션을 제공합니다
- [`bounce`](easing.md#bounce) 바운싱 애니메이션을 제공합니다
- [`ease`](easing.md#ease) 기본 관성 애니메이션을 제공합니다
- [`elastic`](easing.md#elastic) 기본 스프링 인터랙션을 제공합니다

### 표준 함수

세 가지 표준 easing 함수가 제공됩니다:

- [`linear`](easing.md#linear)
- [`quad`](easing.md#quad)
- [`cubic`](easing.md#cubic)

[`poly`](easing.md#poly) 함수는 4차, 5차 및 기타 고차 함수를 구현하는 데 사용할 수 있습니다.

### 추가 함수

다음 메서드를 통해 추가적인 수학 함수들이 제공됩니다:

- [`bezier`](easing.md#bezier) 3차 베지어 곡선을 제공합니다
- [`circle`](easing.md#circle) 원형 함수를 제공합니다
- [`sin`](easing.md#sin) 사인 함수를 제공합니다
- [`exp`](easing.md#exp) 지수 함수를 제공합니다

다음 헬퍼들은 다른 easing 함수를 수정하는 데 사용됩니다.

- [`in`](easing.md#in) easing 함수를 순방향으로 실행합니다
- [`inOut`](easing.md#inout) 임의의 easing 함수를 대칭적으로 만듭니다
- [`out`](easing.md#out) easing 함수를 역방향으로 실행합니다

## 예제

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Easing%20Demo&ext=js
import {useRef} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>
          Press rows below to preview the Easing!
        </Text>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles} />
        </View>
        <SectionList
          style={styles.list}
          sections={SECTIONS}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => animate(item.easing)}
              style={styles.listRow}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(4)},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 2, 1, -1),
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Easing%20Demo&ext=tsx
import {useRef} from 'react';
import {
  Animated,
  Easing,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type EasingFunction,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animate = (easing: EasingFunction) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
      useNativeDriver: false,
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>
          Press rows below to preview the Easing!
        </Text>
        <View style={styles.boxContainer}>
          <Animated.View style={animatedStyles} />
        </View>
        <SectionList
          style={styles.list}
          sections={SECTIONS}
          keyExtractor={item => item.title}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => animate(item.easing)}
              style={styles.listRow}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.listHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const SECTIONS = [
  {
    title: 'Predefined animations',
    data: [
      {title: 'Bounce', easing: Easing.bounce},
      {title: 'Ease', easing: Easing.ease},
      {title: 'Elastic', easing: Easing.elastic(4)},
    ],
  },
  {
    title: 'Standard functions',
    data: [
      {title: 'Linear', easing: Easing.linear},
      {title: 'Quad', easing: Easing.quad},
      {title: 'Cubic', easing: Easing.cubic},
    ],
  },
  {
    title: 'Additional functions',
    data: [
      {
        title: 'Bezier',
        easing: Easing.bezier(0, 2, 1, -1),
      },
      {title: 'Circle', easing: Easing.circle},
      {title: 'Sin', easing: Easing.sin},
      {title: 'Exp', easing: Easing.exp},
    ],
  },
  {
    title: 'Combinations',
    data: [
      {
        title: 'In + Bounce',
        easing: Easing.in(Easing.bounce),
      },
      {
        title: 'Out + Exp',
        easing: Easing.out(Easing.exp),
      },
      {
        title: 'InOut + Elastic',
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#20232a',
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: '#61dafb',
  },
  boxContainer: {
    height: 160,
    alignItems: 'center',
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: '#61dafb',
  },
  list: {
    backgroundColor: '#fff',
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f4f4f4',
    color: '#999',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  listRow: {
    padding: 8,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# 레퍼런스

## 메서드

### `step0()`

```tsx
static step0(n: number);
```

스테핑 함수로, `n`이 양수이면 1을 반환합니다.

---

### `step1()`

```tsx
static step1(n: number);
```

스테핑 함수로, `n`이 1 이상이면 1을 반환합니다.

---

### `linear()`

```tsx
static linear(t: number);
```

선형 함수입니다. `f(t) = t`. 위치는 경과 시간과 1:1로 대응합니다.

https://cubic-bezier.com/#0,0,1,1

---

### `ease()`

```tsx
static ease(t: number);
```

기본 관성 인터랙션으로, 객체가 서서히 속도를 높이는 것과 유사합니다.

https://cubic-bezier.com/#.42,0,1,1

---

### `quad()`

```tsx
static quad(t: number);
```

2차 함수입니다. `f(t) = t * t`. 위치는 경과 시간의 제곱과 같습니다.

https://easings.net/#easeInQuad

---

### `cubic()`

```tsx
static cubic(t: number);
```

3차 함수입니다. `f(t) = t * t * t`. 위치는 경과 시간의 세제곱과 같습니다.

https://easings.net/#easeInCubic

---

### `poly()`

```tsx
static poly(n: number);
```

거듭제곱 함수입니다. 위치는 경과 시간의 N제곱과 같습니다.

n = 4: https://easings.net/#easeInQuart n = 5: https://easings.net/#easeInQuint

---

### `sin()`

```tsx
static sin(t: number);
```

사인 함수입니다.

https://easings.net/#easeInSine

---

### `circle()`

```tsx
static circle(t: number);
```

원형 함수입니다.

https://easings.net/#easeInCirc

---

### `exp()`

```tsx
static exp(t: number);
```

지수 함수입니다.

https://easings.net/#easeInExpo

---

### `elastic()`

```tsx
static elastic(bounciness: number);
```

기본 탄성 인터랙션으로, 스프링이 앞뒤로 진동하는 것과 유사합니다.

기본 bounciness 값은 1로, 한 번 약간 초과합니다. bounciness가 0이면 전혀 초과하지 않으며, bounciness가 N > 1이면 약 N번 초과합니다.

https://easings.net/#easeInElastic

---

### `back()`

```tsx
static back(s)
```

`Animated.parallel()`과 함께 사용하면 애니메이션 시작 시 객체가 약간 뒤로 가는 기본 효과를 만들 수 있습니다.

---

### `bounce()`

```tsx
static bounce(t: number);
```

기본 바운싱 효과를 제공합니다.

https://easings.net/#easeInBounce

---

### `bezier()`

```tsx
static bezier(x1: number, y1: number, x2: number, y2: number);
```

CSS Transitions의 `transition-timing-function`에 해당하는 3차 베지어 곡선을 제공합니다.

3차 베지어 곡선을 시각화하는 유용한 도구는 https://cubic-bezier.com/ 에서 찾을 수 있습니다.

---

### `in()`

```tsx
static in(easing: number);
```

easing 함수를 순방향으로 실행합니다.

---

### `out()`

```tsx
static out(easing: number);
```

easing 함수를 역방향으로 실행합니다.

---

### `inOut()`

```tsx
static inOut(easing: number);
```

임의의 easing 함수를 대칭적으로 만듭니다. easing 함수는 지속 시간의 절반 동안 순방향으로 실행된 후, 나머지 지속 시간 동안 역방향으로 실행됩니다.
