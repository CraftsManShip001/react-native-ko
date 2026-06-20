---
id: dimensions
title: Dimensions
---

:::info
[`useWindowDimensions`](usewindowdimensions)는 React 컴포넌트에서 권장되는 API입니다. `Dimensions`와 달리, 창의 크기가 변경될 때 함께 업데이트됩니다. 이는 React 패러다임과 잘 어울립니다.
:::

```tsx
import {Dimensions} from 'react-native';
```

다음 코드를 사용하여 애플리케이션 창의 너비와 높이를 가져올 수 있습니다:

```tsx
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```

:::note
크기 값은 즉시 사용할 수 있지만, 기기 회전이나 폴더블 기기 등의 이유로 변경될 수 있습니다. 따라서 이 상수에 의존하는 렌더링 로직이나 스타일은 값을 캐싱하는 것보다 매 렌더링마다 이 함수를 호출하도록 해야 합니다(예: `StyleSheet`에 값을 설정하는 대신 인라인 스타일 사용).
:::

폴더블 기기나 화면 크기 혹은 앱 창 크기가 변경될 수 있는 기기를 대상으로 한다면, 아래 예시와 같이 Dimensions 모듈에서 제공하는 이벤트 리스너를 사용할 수 있습니다.

## 예시

```SnackPlayer name=Dimensions%20Example
import {useState, useEffect} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const App = () => {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Window Dimensions</Text>
        {Object.entries(dimensions.window).map(([key, value]) => (
          <Text>
            {key} - {value}
          </Text>
        ))}
        <Text style={styles.header}>Screen Dimensions</Text>
        {Object.entries(dimensions.screen).map(([key, value]) => (
          <Text>
            {key} - {value}
          </Text>
        ))}
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
    fontSize: 16,
    marginVertical: 10,
  },
});

export default App;
```

# 레퍼런스

## 메서드

### `addEventListener()`

```tsx
static addEventListener(
  type: 'change',
  handler: ({
    window,
    screen,
  }: DimensionsValue) => void,
): EmitterSubscription;
```

이벤트 핸들러를 추가합니다. 지원되는 이벤트:

- `change`: `Dimensions` 객체 내의 속성이 변경될 때 발생합니다. 이벤트 핸들러의 인수는 [`DimensionsValue`](#dimensionsvalue) 타입 객체입니다.

---

### `get()`

```tsx
static get(dim: 'window' | 'screen'): ScaledSize;
```

초기 크기 값은 `runApplication`이 호출되기 전에 설정되므로, 다른 require가 실행되기 전에 사용할 수 있어야 하며, 이후에 업데이트될 수 있습니다.

예시: `const {height, width} = Dimensions.get('window');`

**파라미터:**

| 이름                                                               | 타입   | 설명                                                                       |
| ------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------------- |
| dim <div className="label basic required two-lines">Required</div> | string | `set`을 호출할 때 정의된 크기의 이름. 해당 크기의 값을 반환합니다. |

:::note
Android에서 `window` 크기는 상태 표시줄(반투명이 아닌 경우)과 하단 내비게이션 바의 크기만큼 줄어듭니다.
:::

## 타입 정의

### DimensionsValue

**속성:**

| 이름   | 타입                                | 설명                             |
| ------ | ----------------------------------- | --------------------------------------- |
| window | [ScaledSize](dimensions#scaledsize) | 표시되는 애플리케이션 창의 크기. |
| screen | [ScaledSize](dimensions#scaledsize) | 기기 화면의 크기.            |

### ScaledSize

| 타입   |
| ------ |
| object |

**속성:**

| 이름      | 타입   |
| --------- | ------ |
| width     | number |
| height    | number |
| scale     | number |
| fontScale | number |
