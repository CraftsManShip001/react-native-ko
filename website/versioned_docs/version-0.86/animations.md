---
id: animations
title: Animations
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

애니메이션은 훌륭한 사용자 경험을 만들기 위해 매우 중요합니다. 정지해 있는 객체는 움직이기 시작할 때 관성을 극복해야 합니다. 움직이는 객체는 운동량을 가지며 즉시 멈추는 경우가 드뭅니다. 애니메이션을 사용하면 인터페이스에서 물리적으로 자연스러운 동작을 표현할 수 있습니다.

React Native는 두 가지 상호 보완적인 애니메이션 시스템을 제공합니다. 특정 값의 세밀하고 인터랙티브한 제어를 위한 [`Animated`](animations#animated-api)와 다음 렌더링/레이아웃 사이클에서 전역 레이아웃 트랜지션을 애니메이션화하는 [`LayoutAnimation`](animations#layoutanimation-api)입니다.

## `Animated` API

[`Animated`](animated) API는 매우 성능이 뛰어난 방식으로 다양한 흥미로운 애니메이션 및 인터랙션 패턴을 간결하게 표현하도록 설계되었습니다. `Animated`는 입력과 출력 사이의 선언적 관계에 초점을 맞추며, 그 사이에 구성 가능한 변환과 시간 기반 애니메이션 실행을 제어하는 `start`/`stop` 메서드를 제공합니다.

`Animated`는 여섯 가지 애니메이션 가능한 컴포넌트 타입을 내보냅니다: `View`, `Text`, `Image`, `ScrollView`, `FlatList`, `SectionList`. 또한 `Animated.createAnimatedComponent()`를 사용하여 직접 만들 수도 있습니다.

예를 들어, 마운트될 때 페이드 인되는 컨테이너 View는 다음과 같이 작성할 수 있습니다:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer ext=js
import {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
};
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer ext=tsx
import {useEffect, useRef, type PropsWithChildren, type FC} from 'react';
import {Animated, Text, View, type ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

const FadeInView: FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: 'powderblue',
        }}>
        <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>
          Fading in
        </Text>
      </FadeInView>
    </View>
  );
};
```

</TabItem>
</Tabs>

여기서 무슨 일이 일어나는지 살펴보겠습니다. `FadeInView` 렌더 메서드에서 `fadeAnim`이라는 새 `Animated.Value`가 `useRef`로 초기화됩니다. `View`의 opacity 속성이 이 애니메이션 값에 매핑됩니다. 내부적으로 숫자 값이 추출되어 opacity를 설정하는 데 사용됩니다.

컴포넌트가 마운트되면 opacity가 0으로 설정됩니다. 그런 다음 `fadeAnim` 애니메이션 값에 이징 애니메이션이 시작되어, 값이 최종값인 1로 애니메이션되면서 매 프레임마다 종속된 모든 매핑(이 경우 opacity만)을 업데이트합니다.

이 작업은 `setState`를 호출하고 다시 렌더링하는 것보다 빠른 최적화된 방식으로 수행됩니다. 전체 구성이 선언적이기 때문에, 구성을 직렬화하고 높은 우선순위 스레드에서 애니메이션을 실행하는 추가 최적화를 구현할 수 있습니다.

### 애니메이션 구성하기

애니메이션은 매우 유연하게 구성할 수 있습니다. 커스텀 및 미리 정의된 이징 함수, 딜레이, 지속 시간, 감쇠 인수, 스프링 상수 등 모든 것을 애니메이션 타입에 따라 조정할 수 있습니다.

`Animated`는 여러 애니메이션 타입을 제공하며, 가장 일반적으로 사용되는 것은 [`Animated.timing()`](animated#timing)입니다. 다양한 미리 정의된 이징 함수 중 하나를 사용하거나 직접 만든 함수를 사용하여 시간에 따라 값을 애니메이션화합니다. 이징 함수는 일반적으로 애니메이션에서 객체의 점진적인 가속과 감속을 표현하는 데 사용됩니다.

기본적으로 `timing`은 전체 속도까지 점진적으로 가속하고 마지막에 점진적으로 감속하여 멈추는 easeInOut 곡선을 사용합니다. `easing` 파라미터를 전달하여 다른 이징 함수를 지정할 수 있습니다. 커스텀 `duration` 또는 애니메이션 시작 전의 `delay`도 지원됩니다.

예를 들어, 객체가 최종 위치로 이동하기 전에 약간 뒤로 물러나는 2초 길이의 애니메이션을 만들고 싶다면:

```tsx
Animated.timing(this.state.xPosition, {
  toValue: 100,
  easing: Easing.back(),
  duration: 2000,
  useNativeDriver: true,
}).start();
```

내장 애니메이션에서 지원하는 모든 구성 파라미터에 대해 자세히 알아보려면 `Animated` API 참조의 [애니메이션 구성하기](animated#애니메이션-구성하기) 섹션을 참조하세요.

### 애니메이션 합성하기

애니메이션은 결합하여 순차적으로 또는 동시에 재생할 수 있습니다. 순차 애니메이션은 이전 애니메이션이 끝난 직후 재생하거나, 지정된 딜레이 후에 시작할 수 있습니다. `Animated` API는 `sequence()`와 `delay()` 같은 여러 메서드를 제공하며, 각각 실행할 애니메이션 배열을 받고 필요에 따라 자동으로 `start()`/`stop()`을 호출합니다.

예를 들어, 다음 애니메이션은 관성으로 멈춘 후 회전하면서 동시에 스프링처럼 튕겨 돌아옵니다:

```tsx
Animated.sequence([
  // decay, then spring to start and twirl
  Animated.decay(position, {
    // coast to a stop
    velocity: {x: gestureState.vx, y: gestureState.vy}, // velocity from gesture release
    deceleration: 0.997,
    useNativeDriver: true,
  }),
  Animated.parallel([
    // after decay, in parallel:
    Animated.spring(position, {
      toValue: {x: 0, y: 0}, // return to start
      useNativeDriver: true,
    }),
    Animated.timing(twirl, {
      // and twirl
      toValue: 360,
      useNativeDriver: true,
    }),
  ]),
]).start(); // start the sequence group
```

하나의 애니메이션이 중지되거나 중단되면 그룹의 다른 모든 애니메이션도 중지됩니다. `Animated.parallel`에는 이를 비활성화하기 위해 `false`로 설정할 수 있는 `stopTogether` 옵션이 있습니다.

합성 메서드의 전체 목록은 `Animated` API 참조의 [애니메이션 합성하기](animated#애니메이션-합성하기) 섹션에서 확인할 수 있습니다.

### 애니메이션 값 결합하기

덧셈, 곱셈, 나눗셈 또는 나머지 연산을 통해 [두 애니메이션 값을 결합하여](animated#애니메이션-값-결합하기) 새로운 애니메이션 값을 만들 수 있습니다.

계산을 위해 애니메이션 값이 다른 애니메이션 값의 역수가 필요한 경우가 있습니다. 예를 들어 스케일을 반전할 때(2x --> 0.5x):

```tsx
const a = new Animated.Value(1);
const b = Animated.divide(1, a);

Animated.spring(a, {
  toValue: 2,
  useNativeDriver: true,
}).start();
```

### 보간

각 속성은 먼저 보간을 통해 처리할 수 있습니다. 보간은 입력 범위를 출력 범위에 매핑하며, 일반적으로 선형 보간을 사용하지만 이징 함수도 지원합니다. 기본적으로 주어진 범위를 벗어나 곡선을 외삽하지만, 출력 값을 고정(clamp)하도록 설정할 수도 있습니다.

0-1 범위를 0-100 범위로 변환하는 기본 매핑은 다음과 같습니다:

```tsx
value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

예를 들어, `Animated.Value`가 0에서 1로 이동하되, 위치는 150px에서 0px로, opacity는 0에서 1로 애니메이션하고 싶을 수 있습니다. 이는 위 예제의 `style`을 다음과 같이 수정하여 구현할 수 있습니다:

```tsx
  style={{
    opacity: this.state.fadeAnim, // Binds directly
    transform: [{
      translateY: this.state.fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }],
  }}
```

[`interpolate()`](animated)는 여러 범위 세그먼트도 지원하며, 데드 존 및 기타 유용한 트릭을 정의하는 데 편리합니다. 예를 들어 -300에서 부정 관계를 갖고 -100에서 0이 되며, 0에서 다시 1이 되고, 100에서 다시 0으로 내려간 후 그 이상의 값에서는 0으로 유지되는 데드 존을 만들려면 다음과 같이 할 수 있습니다:

```tsx
value.interpolate({
  inputRange: [-300, -100, 0, 100, 101],
  outputRange: [300, 0, 1, 0, 0],
});
```

이는 다음과 같이 매핑됩니다:

```
Input | Output
------|-------
  -400|    450
  -300|    300
  -200|    150
  -100|      0
   -50|    0.5
     0|      1
    50|    0.5
   100|      0
   101|      0
   200|      0
```

`interpolate()`는 문자열로의 매핑도 지원하여 색상뿐만 아니라 단위가 있는 값도 애니메이션화할 수 있습니다. 예를 들어 회전을 애니메이션화하고 싶다면:

```tsx
value.interpolate({
  inputRange: [0, 360],
  outputRange: ['0deg', '360deg'],
});
```

`interpolate()`는 임의의 이징 함수도 지원하며, 그 중 많은 것이 이미 [`Easing`](easing) 모듈에 구현되어 있습니다. `interpolate()`는 `outputRange`를 외삽하는 동작도 구성할 수 있습니다. `extrapolate`, `extrapolateLeft`, 또는 `extrapolateRight` 옵션을 설정하여 외삽 방식을 지정할 수 있습니다. 기본값은 `extend`이지만, 출력 값이 `outputRange`를 초과하지 않도록 `clamp`를 사용할 수 있습니다.

### 동적 값 추적하기

애니메이션 값은 일반 숫자 대신 다른 애니메이션 값을 애니메이션의 `toValue`로 설정하여 다른 값을 추적할 수도 있습니다. 예를 들어, Android의 Messenger에서 사용되는 "Chat Heads" 애니메이션은 다른 애니메이션 값에 고정된 `spring()`으로 구현하거나, 엄격한 추적을 위해 `duration`이 0인 `timing()`으로 구현할 수 있습니다. 보간과 함께 합성할 수도 있습니다:

```tsx
Animated.spring(follower, {toValue: leader}).start();
Animated.timing(opacity, {
  toValue: pan.x.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
  }),
  useNativeDriver: true,
}).start();
```

`leader`와 `follower` 애니메이션 값은 `Animated.ValueXY()`를 사용하여 구현됩니다. `ValueXY`는 패닝이나 드래그 같은 2D 인터랙션을 처리하는 편리한 방법입니다. 두 개의 `Animated.Value` 인스턴스와 그것들을 호출하는 일부 헬퍼 함수를 포함하는 기본 래퍼로, 많은 경우에 `Value`의 드롭인 대체품으로 `ValueXY`를 사용할 수 있습니다. 위 예제에서 x와 y 값 모두를 추적할 수 있게 합니다.

### 제스처 추적하기

패닝이나 스크롤 같은 제스처 및 기타 이벤트는 [`Animated.event`](animated#event)를 사용하여 애니메이션 값에 직접 매핑할 수 있습니다. 이는 복잡한 이벤트 객체에서 값을 추출할 수 있도록 구조화된 맵 문법으로 이루어집니다. 첫 번째 레벨은 여러 인수에 걸쳐 매핑할 수 있도록 배열이며, 그 배열에는 중첩된 객체가 포함됩니다.

예를 들어, 수평 스크롤 제스처를 처리할 때 `event.nativeEvent.contentOffset.x`를 `scrollX`(`Animated.Value`)에 매핑하려면 다음과 같이 합니다:

```tsx
 onScroll={Animated.event(
   // scrollX = e.nativeEvent.contentOffset.x
   [{nativeEvent: {
        contentOffset: {
          x: scrollX
        }
      }
    }]
 )}
```

다음 예제는 `ScrollView`에서 사용된 `Animated.event`를 사용하여 스크롤 위치 인디케이터가 애니메이션되는 수평 스크롤 캐러셀을 구현합니다.

#### Animated Event를 사용한 ScrollView 예제

```SnackPlayer name=Animated&supportedPlatforms=ios,android
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  useAnimatedValue,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const images = new Array(6).fill(
  'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);

const App = () => {
  const scrollX = useAnimatedValue(0);

  const {width: windowWidth} = useWindowDimensions();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollContainer}>
          <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ])}
            scrollEventThrottle={1}>
            {images.map((image, imageIndex) => {
              return (
                <View
                  style={{width: windowWidth, height: 250}}
                  key={imageIndex}>
                  <ImageBackground source={{uri: image}} style={styles.card}>
                    <View style={styles.textContainer}>
                      <Text style={styles.infoText}>
                        {'Image - ' + imageIndex}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.indicatorContainer}>
            {images.map((image, imageIndex) => {
              const width = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: [8, 16, 8],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, {width}]}
                />
              );
            })}
          </View>
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
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

`PanResponder`를 사용할 때는 `gestureState.dx`와 `gestureState.dy`에서 x, y 위치를 추출하기 위해 다음 코드를 사용할 수 있습니다. `PanResponder` 핸들러에 전달되는 두 번째 인수인 `gestureState`에만 관심이 있으므로 배열의 첫 번째 위치에 `null`을 사용합니다.

```tsx
onPanResponderMove={Animated.event(
  [null, // ignore the native event
  // extract dx and dy from gestureState
  // like 'pan.x = gestureState.dx, pan.y = gestureState.dy'
  {dx: pan.x, dy: pan.y}
])}
```

#### Animated Event를 사용한 PanResponder 예제

```SnackPlayer name=Animated
import {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

const App = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag & Release this box!</Text>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <View style={styles.box} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default App;
```

### 현재 애니메이션 값에 응답하기

애니메이션 중에 현재 값을 읽는 명확한 방법이 없다는 것을 눈치챌 수 있습니다. 이는 최적화로 인해 값이 네이티브 런타임에서만 알 수 있기 때문입니다. 현재 값에 응답하여 JavaScript를 실행해야 하는 경우 두 가지 방법이 있습니다:

- `spring.stopAnimation(callback)`은 애니메이션을 중지하고 최종 값으로 `callback`을 호출합니다. 이는 제스처 트랜지션을 만들 때 유용합니다.
- `spring.addListener(callback)`은 애니메이션이 실행되는 동안 최근 값을 제공하면서 비동기적으로 `callback`을 호출합니다. 이는 state 변경을 트리거하는 데 유용합니다. 예를 들어 사용자가 드래그하면서 가까워질 때 버블을 새 옵션에 스냅하는 경우처럼, 이런 더 큰 state 변경은 60fps로 실행되어야 하는 패닝 같은 연속 제스처에 비해 몇 프레임의 지연에 덜 민감합니다.

`Animated`는 일반 JavaScript 이벤트 루프와 독립적으로 고성능 방식으로 애니메이션을 실행할 수 있도록 완전히 직렬화 가능하도록 설계되었습니다. 이는 API에 영향을 미치므로, 완전히 동기적인 시스템에 비해 무언가를 하기가 약간 더 까다롭게 느껴질 때 이 점을 염두에 두세요. 이러한 제한 사항을 해결하는 방법으로 `Animated.Value.addListener`를 확인해 보세요. 하지만 미래에 성능에 영향을 미칠 수 있으므로 드물게 사용하세요.

### 네이티브 드라이버 사용하기

`Animated` API는 직렬화 가능하도록 설계되었습니다. [네이티브 드라이버](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated)를 사용하면, 애니메이션을 시작하기 전에 애니메이션에 관한 모든 것을 네이티브로 전송하여 네이티브 코드가 매 프레임마다 브릿지를 거치지 않고 UI 스레드에서 애니메이션을 수행할 수 있습니다. 애니메이션이 시작된 후에는 JS 스레드가 블록되어도 애니메이션에 영향을 미치지 않습니다.

일반 애니메이션에 네이티브 드라이버를 사용하려면 애니메이션을 시작할 때 애니메이션 구성에서 `useNativeDriver: true`를 설정합니다. `useNativeDriver` 속성이 없는 애니메이션은 레거시 이유로 기본값이 false이지만, 경고(TypeScript에서는 타입 체크 오류)를 발생시킵니다.

```tsx
Animated.timing(this.state.animatedValue, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // <-- Set this to true
}).start();
```

애니메이션 값은 하나의 드라이버와만 호환되므로, 값에 애니메이션을 시작할 때 네이티브 드라이버를 사용한다면 해당 값의 모든 애니메이션도 네이티브 드라이버를 사용해야 합니다.

네이티브 드라이버는 `Animated.event`와도 함께 작동합니다. 이는 스크롤 위치를 따르는 애니메이션에 특히 유용한데, 네이티브 드라이버 없이는 React Native의 비동기 특성으로 인해 애니메이션이 항상 제스처보다 한 프레임 뒤처지기 때문입니다.

```tsx
<Animated.ScrollView // <-- Use the Animated ScrollView wrapper
  onScroll={Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: this.state.animatedValue},
        },
      },
    ],
    {useNativeDriver: true}, // <-- Set this to true
  )}>
  {content}
</Animated.ScrollView>
```

[RNTester 앱](https://github.com/facebook/react-native/blob/main/packages/rn-tester/)을 실행한 후 Native Animated Example을 로드하여 네이티브 드라이버의 동작을 확인할 수 있습니다. [소스 코드](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/NativeAnimation/NativeAnimationsExample.js)를 살펴보면 이 예제들이 어떻게 만들어졌는지 알 수 있습니다.

#### 주의 사항

`Animated`로 할 수 있는 모든 것이 현재 네이티브 드라이버에서 지원되는 것은 아닙니다. 주요 제한 사항은 레이아웃이 아닌 속성만 애니메이션화할 수 있다는 것입니다: `transform`과 `opacity` 같은 것은 작동하지만 Flexbox와 position 속성은 작동하지 않습니다. `Animated.event`를 사용할 때는 버블링 이벤트가 아닌 직접 이벤트에서만 작동합니다. 즉, `PanResponder`에서는 작동하지 않지만 `ScrollView#onScroll` 같은 것에서는 작동합니다.

애니메이션이 실행 중일 때, `VirtualizedList` 컴포넌트가 더 많은 행을 렌더링하지 못하게 할 수 있습니다. 사용자가 목록을 스크롤하는 동안 길거나 반복되는 애니메이션을 실행해야 하는 경우, 애니메이션 구성에서 `isInteraction: false`를 사용하여 이 문제를 방지할 수 있습니다.

### 주의할 점

`rotateY`, `rotateX` 등의 transform 스타일을 사용할 때는 transform 스타일 `perspective`가 설정되어 있는지 확인하세요. 현재 일부 애니메이션은 이것 없이는 Android에서 렌더링되지 않을 수 있습니다. 아래 예제를 참조하세요.

```tsx
<Animated.View
  style={{
    transform: [
      {scale: this.state.scale},
      {rotateY: this.state.rotateY},
      {perspective: 1000}, // without this line this Animation will not render on Android while working fine on iOS
    ],
  }}
/>
```

### 추가 예제

RNTester 앱에는 `Animated`를 사용한 다양한 예제가 있습니다:

- [AnimatedGratuitousApp](https://github.com/facebook/react-native/tree/main/packages/rn-tester/js/examples/AnimatedGratuitousApp)
- [NativeAnimationsExample](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/NativeAnimation/NativeAnimationsExample.js)

## `LayoutAnimation` API

`LayoutAnimation`을 사용하면 다음 렌더링/레이아웃 사이클에서 모든 View에 사용될 `create` 및 `update` 애니메이션을 전역으로 구성할 수 있습니다. 이는 특정 속성을 직접 애니메이션화하기 위해 측정하거나 계산하지 않고도 Flexbox 레이아웃 업데이트를 수행하는 데 유용합니다. 특히 레이아웃 변경이 부모에 영향을 미칠 수 있는 경우에 유용합니다. 예를 들어 "더 보기" 확장 기능은 부모의 크기를 늘리고 아래 행을 밀어내는데, 이를 위해 컴포넌트 간에 명시적인 조율 없이 모두 동기화하여 애니메이션화할 수 있습니다.

`LayoutAnimation`은 매우 강력하고 유용할 수 있지만, `Animated` 및 기타 애니메이션 라이브러리보다 제어가 훨씬 적습니다. 따라서 `LayoutAnimation`으로 원하는 것을 할 수 없다면 다른 방법을 사용해야 할 수 있습니다.

**Android**에서 이 기능을 사용하려면 `UIManager`를 통해 다음 플래그를 설정해야 합니다:

```tsx
UIManager.setLayoutAnimationEnabledExperimental(true);
```

```SnackPlayer name=LayoutAnimations
import {useState} from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App() {
  const [state, setState] = useState({
    w: 100,
    h: 100,
  });

  const onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    setState({w: state.w + 15, h: state.h + 15});
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, {width: state.w, height: state.h}]} />
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Press me!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
```

이 예제는 사전 설정값을 사용합니다. 필요에 따라 애니메이션을 커스터마이즈할 수 있으며, 자세한 내용은 [LayoutAnimation.js](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/LayoutAnimation/LayoutAnimation.js)를 참조하세요.

## 추가 참고 사항

### `requestAnimationFrame`

`requestAnimationFrame`은 브라우저에서 익숙할 수 있는 폴리필입니다. 유일한 인수로 함수를 받아 다음 다시 그리기 전에 해당 함수를 호출합니다. 이는 모든 JavaScript 기반 애니메이션 API의 기반이 되는 필수 빌딩 블록입니다. 일반적으로 이것을 직접 호출할 필요가 없습니다 - 애니메이션 API가 프레임 업데이트를 관리해 줍니다.

### `setNativeProps`

[직접 조작 섹션](legacy/direct-manipulation)에서 언급된 바와 같이, `setNativeProps`는 합성 컴포넌트와 달리 실제로 네이티브 View로 뒷받침되는 컴포넌트의 속성을 `setState`하고 컴포넌트 계층 구조를 다시 렌더링하지 않고도 직접 수정할 수 있게 합니다.

Rebound 예제에서 스케일을 업데이트하는 데 이것을 사용할 수 있습니다 - 이는 업데이트하는 컴포넌트가 깊이 중첩되어 있고 `shouldComponentUpdate`로 최적화되지 않은 경우에 유용할 수 있습니다.

프레임이 떨어지는 애니메이션(초당 60프레임 미만으로 수행되는 경우)을 발견하면, 최적화를 위해 `setNativeProps` 또는 `shouldComponentUpdate`를 사용해 보세요. 또는 [useNativeDriver 옵션](https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated)을 사용하여 JavaScript 스레드 대신 UI 스레드에서 애니메이션을 실행할 수 있습니다. [InteractionManager](interactionmanager)를 사용하여 애니메이션이 완료된 후까지 계산 집약적인 작업을 지연시킬 수도 있습니다. 앱 내 개발자 메뉴의 "FPS Monitor" 도구를 사용하여 프레임 속도를 모니터링할 수 있습니다.
