---
id: animated
title: Animated
---

`Animated` 라이브러리는 애니메이션을 유연하고 강력하며 빌드 및 유지 관리가 쉽도록 설계되었습니다. `Animated`는 입력과 출력 간의 선언적 관계, 그 사이의 구성 가능한 변환, 그리고 시간 기반 애니메이션 실행을 제어하는 `start`/`stop` 메서드에 초점을 맞춥니다.

애니메이션을 만드는 핵심 워크플로우는 `Animated.Value`를 생성하고, 이를 애니메이션 컴포넌트의 하나 이상의 스타일 속성에 연결한 다음, `Animated.timing()`을 사용하는 애니메이션을 통해 업데이트를 구동하는 것입니다.

:::note
애니메이션 값을 직접 수정하지 마세요. [`useRef` Hook](https://react.dev/reference/react/useRef)을 사용하여 변경 가능한 ref 객체를 반환할 수 있습니다. 이 ref 객체의 `current` 속성은 주어진 인수로 초기화되며 컴포넌트 생명주기 전반에 걸쳐 유지됩니다.
:::

## 예제

다음 예제에는 애니메이션 값 `fadeAnim`에 따라 페이드 인 및 페이드 아웃되는 `View`가 포함되어 있습니다.

```SnackPlayer name=Animated%20Example
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  useAnimatedValue,
} from 'react-native';

const App = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}>
          <Text style={styles.fadingText}>Fading View!</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <Button title="Fade In View" onPress={fadeIn} />
          <Button title="Fade Out View" onPress={fadeOut} />
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
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default App;
```

`Animated`의 추가 사용 예시는 [애니메이션](animations#animated-api) 가이드를 참조하세요.

## 개요

`Animated`와 함께 사용할 수 있는 두 가지 값 타입이 있습니다:

- 단일 값에는 [`Animated.Value()`](animated#value)
- 벡터에는 [`Animated.ValueXY()`](animated#valuexy)

`Animated.Value`는 스타일 속성이나 다른 props에 바인딩할 수 있으며 보간(interpolation)도 가능합니다. 하나의 `Animated.Value`로 임의 개수의 속성을 구동할 수 있습니다.

### 애니메이션 구성하기

`Animated`는 세 가지 애니메이션 타입을 제공합니다. 각 애니메이션 타입은 값이 초기값에서 최종값으로 어떻게 변화하는지를 제어하는 특정 애니메이션 곡선을 제공합니다:

- [`Animated.decay()`](animated#decay)는 초기 속도에서 시작하여 점진적으로 정지합니다.
- [`Animated.spring()`](animated#spring)은 기본적인 스프링 물리 모델을 제공합니다.
- [`Animated.timing()`](animated#timing)은 [이징 함수](easing)를 사용하여 시간에 따라 값을 애니메이션합니다.

대부분의 경우 `timing()`을 사용하게 됩니다. 기본적으로 대칭 easeInOut 곡선을 사용하여 객체가 전속력으로 점진적으로 가속하고 점진적으로 감속하며 정지하는 것을 표현합니다.

### 애니메이션 다루기

애니메이션은 해당 애니메이션에서 `start()`를 호출하여 시작합니다. `start()`는 애니메이션이 완료될 때 호출될 완료 콜백을 받습니다. 애니메이션이 정상적으로 완료되면 완료 콜백이 `{finished: true}`와 함께 호출됩니다. 완료되기 전에 `stop()`이 호출되어 애니메이션이 종료된 경우(예: 제스처나 다른 애니메이션에 의해 중단된 경우)에는 `{finished: false}`를 받게 됩니다.

```tsx
Animated.timing({}).start(({finished}) => {
  /* completion callback */
});
```

### 네이티브 드라이버 사용하기

네이티브 드라이버를 사용하면 애니메이션을 시작하기 전에 애니메이션에 관한 모든 정보를 네이티브로 전송하여, 매 프레임마다 브리지를 거치지 않고도 네이티브 코드가 UI 스레드에서 애니메이션을 수행할 수 있습니다. 애니메이션이 시작되면 JS 스레드가 차단되더라도 애니메이션에 영향을 주지 않습니다.

애니메이션 구성에서 `useNativeDriver: true`를 지정하여 네이티브 드라이버를 사용할 수 있습니다. 자세한 내용은 [애니메이션](animations#네이티브-드라이버-사용하기) 가이드를 참조하세요.

### 애니메이션 가능한 컴포넌트

애니메이션 가능한 컴포넌트만 애니메이션할 수 있습니다. 이러한 특별한 컴포넌트는 애니메이션 값을 속성에 바인딩하는 마법을 수행하고, 매 프레임마다 React 렌더링 및 재조정 프로세스의 비용을 피하기 위해 타겟 네이티브 업데이트를 수행합니다. 또한 언마운트 시 정리를 처리하므로 기본적으로 안전합니다.

- [`createAnimatedComponent()`](animated#createanimatedcomponent)를 사용하여 컴포넌트를 애니메이션 가능하게 만들 수 있습니다.

`Animated`는 위의 래퍼를 사용하여 다음과 같은 애니메이션 가능한 컴포넌트를 내보냅니다:

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`
- `Animated.FlatList`
- `Animated.SectionList`

### 애니메이션 합성하기

애니메이션은 합성 함수를 사용하여 복잡한 방식으로 결합할 수도 있습니다:

- [`Animated.delay()`](animated#delay)는 주어진 지연 후 애니메이션을 시작합니다.
- [`Animated.parallel()`](animated#parallel)은 여러 애니메이션을 동시에 시작합니다.
- [`Animated.sequence()`](animated#sequence)는 각 애니메이션이 완료될 때까지 기다린 후 다음 애니메이션을 시작하는 방식으로 순서대로 애니메이션을 시작합니다.
- [`Animated.stagger()`](animated#stagger)는 연속적인 지연을 두고 순서대로 그리고 병렬로 애니메이션을 시작합니다.

하나의 애니메이션의 `toValue`를 다른 `Animated.Value`로 설정하여 애니메이션을 체인으로 연결할 수도 있습니다. 애니메이션 가이드의 [동적 값 추적](animations#동적-값-추적하기)을 참조하세요.

기본적으로 하나의 애니메이션이 중지되거나 중단되면 그룹 내의 모든 다른 애니메이션도 중지됩니다.

### 애니메이션 값 결합하기

두 개의 애니메이션 값을 덧셈, 뺄셈, 곱셈, 나눗셈 또는 나머지 연산을 통해 결합하여 새로운 애니메이션 값을 만들 수 있습니다:

- [`Animated.add()`](animated#add)
- [`Animated.subtract()`](animated#subtract)
- [`Animated.divide()`](animated#divide)
- [`Animated.modulo()`](animated#modulo)
- [`Animated.multiply()`](animated#multiply)

### 보간(Interpolation)

`interpolate()` 함수를 사용하면 입력 범위를 다른 출력 범위에 매핑할 수 있습니다. 기본적으로 주어진 범위를 벗어나 곡선을 외삽하지만, 출력 값을 클램프할 수도 있습니다. 기본적으로 선형 보간을 사용하지만 이징 함수도 지원합니다.

- [`interpolate()`](animatedvalue#interpolate)

보간에 대한 자세한 내용은 [애니메이션](animations#보간) 가이드를 참조하세요.

### 제스처 및 기타 이벤트 처리하기

패닝이나 스크롤 같은 제스처와 기타 이벤트는 `Animated.event()`를 사용하여 애니메이션 값에 직접 매핑할 수 있습니다. 이는 구조화된 맵 구문으로 수행되어 복잡한 이벤트 객체에서 값을 추출할 수 있습니다. 첫 번째 레벨은 여러 인수에 걸쳐 매핑할 수 있도록 배열이며, 해당 배열에는 중첩된 객체가 포함됩니다.

- [`Animated.event()`](animated#event)

예를 들어, 수평 스크롤 제스처를 다룰 때 `event.nativeEvent.contentOffset.x`를 `scrollX`(`Animated.Value`)에 매핑하기 위해 다음과 같이 수행합니다:

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

---

# 레퍼런스

## 메서드

주어진 값이 Value 대신 ValueXY인 경우, 각 구성 옵션은 스칼라 대신 `{x: ..., y: ...}` 형태의 벡터일 수 있습니다.

### `decay()`

```tsx
static decay(value, config): CompositeAnimation;
```

감쇠 계수를 기반으로 초기 속도에서 0으로 값을 애니메이션합니다.

Config는 다음 옵션을 가질 수 있는 객체입니다:

- `velocity`: 초기 속도. 필수.
- `deceleration`: 감쇠 비율. 기본값 0.997.
- `isInteraction`: 이 애니메이션이 `InteractionManager`에서 "인터랙션 핸들"을 생성하는지 여부. 기본값 true.
- `useNativeDriver`: true이면 네이티브 드라이버를 사용합니다. 필수.

---

### `timing()`

```tsx
static timing(value, config): CompositeAnimation;
```

시간 지정 이징 곡선을 따라 값을 애니메이션합니다. [`Easing`](easing) 모듈에는 수많은 사전 정의된 곡선이 있으며, 자체 함수를 사용할 수도 있습니다.

Config는 다음 옵션을 가질 수 있는 객체입니다:

- `duration`: 애니메이션 길이(밀리초). 기본값 500.
- `easing`: 곡선을 정의하는 이징 함수. 기본값은 `Easing.inOut(Easing.ease)`.
- `delay`: 지연 후 애니메이션 시작(밀리초). 기본값 0.
- `isInteraction`: 이 애니메이션이 `InteractionManager`에서 "인터랙션 핸들"을 생성하는지 여부. 기본값 true.
- `useNativeDriver`: true이면 네이티브 드라이버를 사용합니다. 필수.

---

### `spring()`

```tsx
static spring(value, config): CompositeAnimation;
```

[감쇠 조화 진동자](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator)를 기반으로 한 분석적 스프링 모델에 따라 값을 애니메이션합니다. `toValue`가 업데이트될 때 유연한 모션을 만들기 위해 속도 상태를 추적하며 체인으로 연결할 수 있습니다.

Config는 다음 옵션을 가질 수 있는 객체입니다.

bounciness/speed, tension/friction, 또는 stiffness/damping/mass 중 하나만 정의할 수 있으며 둘 이상은 정의할 수 없습니다:

friction/tension 또는 bounciness/speed 옵션은 [`Facebook Pop`](https://github.com/facebook/pop), [Rebound](https://github.com/facebookarchive/rebound), 및 [Origami](https://origami.design/)의 스프링 모델과 일치합니다.

- `friction`: "탄성"/오버슈트를 제어합니다. 기본값 7.
- `tension`: 속도를 제어합니다. 기본값 40.
- `speed`: 애니메이션 속도를 제어합니다. 기본값 12.
- `bounciness`: 탄성을 제어합니다. 기본값 8.

stiffness/damping/mass를 매개변수로 지정하면 `Animated.spring`이 [감쇠 조화 진동자](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator)의 운동 방정식을 기반으로 한 분석적 스프링 모델을 사용합니다. 이 동작은 스프링 역학 뒤에 있는 물리학에 더 정확하고 충실하며, iOS의 CASpringAnimation의 구현과 매우 유사합니다.

- `stiffness`: 스프링 강성 계수. 기본값 100.
- `damping`: 마찰력으로 인해 스프링의 모션이 어떻게 감쇠되어야 하는지를 정의합니다. 기본값 10.
- `mass`: 스프링 끝에 연결된 객체의 질량. 기본값 1.

다른 구성 옵션은 다음과 같습니다:

- `velocity`: 스프링에 연결된 객체의 초기 속도. 기본값 0(객체가 정지 상태).
- `overshootClamping`: 스프링이 클램프되어 튕기지 않아야 하는지를 나타내는 불리언. 기본값 false.
- `restDisplacementThreshold`: 스프링이 정지 상태로 간주되어야 하는 정지 위치로부터의 변위 임계값. 기본값 0.001.
- `restSpeedThreshold`: 스프링이 정지 상태로 간주되어야 하는 속도(픽셀/초). 기본값 0.001.
- `delay`: 지연 후 애니메이션 시작(밀리초). 기본값 0.
- `isInteraction`: 이 애니메이션이 `InteractionManager`에서 "인터랙션 핸들"을 생성하는지 여부. 기본값 true.
- `useNativeDriver`: true이면 네이티브 드라이버를 사용합니다. 필수.

---

### `add()`

```tsx
static add(a: Animated, b: Animated): AnimatedAddition;
```

두 Animated 값을 더하여 구성된 새로운 Animated 값을 생성합니다.

---

### `subtract()`

```tsx
static subtract(a: Animated, b: Animated): AnimatedSubtraction;
```

첫 번째 Animated 값에서 두 번째 Animated 값을 빼서 구성된 새로운 Animated 값을 생성합니다.

---

### `divide()`

```tsx
static divide(a: Animated, b: Animated): AnimatedDivision;
```

첫 번째 Animated 값을 두 번째 Animated 값으로 나누어 구성된 새로운 Animated 값을 생성합니다.

---

### `multiply()`

```tsx
static multiply(a: Animated, b: Animated): AnimatedMultiplication;
```

두 Animated 값을 곱하여 구성된 새로운 Animated 값을 생성합니다.

---

### `modulo()`

```tsx
static modulo(a: Animated, modulus: number): AnimatedModulo;
```

제공된 Animated 값의 (음수가 아닌) 나머지로 이루어진 새로운 Animated 값을 생성합니다.

---

### `diffClamp()`

```tsx
static diffClamp(a: Animated, min: number, max: number): AnimatedDiffClamp;
```

2개의 값 사이로 제한된 새로운 Animated 값을 생성합니다. 마지막 값과의 차이를 사용하므로 값이 경계에서 멀리 있더라도 값이 다시 가까워지기 시작하면 변경되기 시작합니다. (`value = clamp(value + diff, min, max)`).

예를 들어 위로 스크롤 할 때 내비게이션 바를 표시하고 아래로 스크롤 할 때 숨기는 스크롤 이벤트에 유용합니다.

---

### `delay()`

```tsx
static delay(time: number): CompositeAnimation;
```

주어진 지연 후 애니메이션을 시작합니다.

---

### `sequence()`

```tsx
static sequence(animations: CompositeAnimation[]): CompositeAnimation;
```

각 애니메이션이 완료될 때까지 기다린 후 다음 애니메이션을 시작하는 방식으로 배열의 애니메이션을 순서대로 시작합니다. 현재 실행 중인 애니메이션이 중지되면 이후 애니메이션은 시작되지 않습니다.

---

### `parallel()`

```tsx
static parallel(
  animations: CompositeAnimation[],
  config?: ParallelConfig
): CompositeAnimation;
```

배열의 애니메이션을 모두 동시에 시작합니다. 기본적으로 하나의 애니메이션이 중지되면 모두 중지됩니다. `stopTogether` 플래그로 이를 재정의할 수 있습니다.

---

### `stagger()`

```tsx
static stagger(
  time: number,
  animations: CompositeAnimation[]
): CompositeAnimation;
```

배열의 애니메이션은 병렬로 실행(겹침)될 수 있지만, 연속적인 지연을 두고 순서대로 시작됩니다. 트레일링 효과를 만들 때 유용합니다.

---

### `loop()`

```tsx
static loop(
  animation: CompositeAnimation[],
  config?: LoopAnimationConfig
): CompositeAnimation;
```

주어진 애니메이션을 지속적으로 반복하여 끝에 도달할 때마다 재설정하고 처음부터 다시 시작합니다. 하위 애니메이션이 `useNativeDriver: true`로 설정된 경우 JS 스레드를 차단하지 않고 반복됩니다. 또한 반복은 애니메이션이 실행되는 동안 `VirtualizedList` 기반 컴포넌트가 더 많은 행을 렌더링하지 못하도록 막을 수 있습니다. 이를 해결하려면 하위 애니메이션 구성에 `isInteraction: false`를 전달하세요.

Config는 다음 옵션을 가질 수 있는 객체입니다:

- `iterations`: 애니메이션이 반복되어야 하는 횟수. 기본값 `-1`(무한).

---

### `event()`

```tsx
static event(
  argMapping: Mapping[],
  config?: EventConfig
): (...args: any[]) => void;
```

매핑 배열을 받아 각 인수에서 그에 따라 값을 추출한 다음, 매핑된 출력에 대해 `setValue`를 호출합니다. 예:

```tsx
onScroll={Animated.event(
  [{nativeEvent: {contentOffset: {x: this._scrollX}}}],
  {listener: (event: ScrollEvent) => console.log(event)}, // Optional async listener
)}
 ...
onPanResponderMove: Animated.event(
  [
    null, // raw event arg ignored
    {dx: this._panX},
  ], // gestureState arg
  {
    listener: (
      event: GestureResponderEvent,
      gestureState: PanResponderGestureState
    ) => console.log(event, gestureState),
  } // Optional async listener
);
```

Config는 다음 옵션을 가질 수 있는 객체입니다:

- `listener`: 선택적 비동기 리스너.
- `useNativeDriver`: true이면 네이티브 드라이버를 사용합니다. 필수.

---

### `forkEvent()`

```jsx
static forkEvent(event: AnimatedEvent, listener: Function): AnimatedEvent;
```

props를 통해 전달되는 애니메이션 이벤트를 엿보기 위한 고급 명령형 API입니다. 기존 `AnimatedEvent`에 새로운 JavaScript 리스너를 추가할 수 있습니다. `animatedEvent`가 JavaScript 리스너인 경우 두 리스너를 하나로 병합하고, `animatedEvent`가 null/undefined이면 JavaScript 리스너를 직접 할당합니다. 가능한 경우 값을 직접 사용하세요.

---

### `unforkEvent()`

```jsx
static unforkEvent(event: AnimatedEvent, listener: Function);
```

---

### `start()`

```tsx
static start(callback?: (result: {finished: boolean}) => void);
```

애니메이션은 해당 애니메이션에서 start()를 호출하여 시작합니다. start()는 애니메이션이 완료되거나 완료되기 전에 stop()이 호출되어 애니메이션이 종료될 때 호출될 완료 콜백을 받습니다.

**매개변수:**

| Name     | Type                                    | Required | Description                                                                                                                                                     |
| -------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | `(result: {finished: boolean}) => void` | No       | 애니메이션이 정상적으로 완료된 후 또는 완료되기 전에 stop()이 호출되어 종료될 때 호출되는 함수 |

콜백을 사용하는 start 예제:

```tsx
Animated.timing({}).start(({finished}) => {
  /* completion callback */
});
```

---

### `stop()`

```tsx
static stop();
```

실행 중인 모든 애니메이션을 중지합니다.

---

### `reset()`

```tsx
static reset();
```

실행 중인 모든 애니메이션을 중지하고 값을 원래 값으로 재설정합니다.

## 속성

### `Value`

애니메이션을 구동하기 위한 표준 값 클래스입니다. 일반적으로 `useAnimatedValue(0);` 또는 클래스 컴포넌트에서 `new Animated.Value(0);`로 초기화합니다.

`Animated.Value` API에 대한 자세한 내용은 별도의 [페이지](animatedvalue)에서 확인할 수 있습니다.

---

### `ValueXY`

패닝 제스처와 같은 2D 애니메이션을 구동하기 위한 2D 값 클래스입니다.

`Animated.ValueXY` API에 대한 자세한 내용은 별도의 [페이지](animatedvaluexy)에서 확인할 수 있습니다.

---

### `Interpolation`

flow에서 Interpolation 타입을 사용하기 위해 내보냅니다.

---

### `Node`

타입 검사의 용이성을 위해 내보냅니다. 모든 애니메이션 값은 이 클래스에서 파생됩니다.

---

### `createAnimatedComponent`

모든 React 컴포넌트를 애니메이션 가능하게 만듭니다. `Animated.View` 등을 만드는 데 사용됩니다.

---

### `attachNativeEvent`

뷰의 이벤트에 애니메이션 값을 연결하는 명령형 API입니다. 가능한 경우 `useNativeDriver: true`와 함께 `Animated.event`를 사용하는 것이 좋습니다.
