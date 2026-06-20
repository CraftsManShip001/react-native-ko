---
id: touchableopacity
title: TouchableOpacity
---

:::tip
터치 기반 입력을 처리하는 더 포괄적이고 미래 지향적인 방법을 찾고 있다면 [Pressable](pressable.md) API를 확인하세요.
:::

뷰가 터치에 올바르게 반응하도록 만드는 래퍼입니다. 누를 때 래핑된 뷰의 불투명도가 낮아지면서 뷰가 어두워집니다.

불투명도는 자식을 `Animated.View`로 래핑하여 제어되며, 이 뷰가 뷰 계층에 추가됩니다. 이로 인해 레이아웃에 영향을 줄 수 있다는 점에 유의하세요.

## 예제

```SnackPlayer name=TouchableOpacity%20Example
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.countContainer}>
          <Text>Count: {count}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Press Here</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

export default App;
```

---

# 레퍼런스

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

[TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)를 상속합니다.

---

### `style`

| Type                           |
| ------------------------------ |
| [View.style](view-style-props) |

---

### `activeOpacity`

터치가 활성화되었을 때 래핑된 뷰의 불투명도를 결정합니다. 기본값은 `0.2`입니다.

| Type   |
| ------ |
| number |

---

### `hasTVPreferredFocus` <div className="label ios">iOS</div>

_(Apple TV 전용)_ TV 우선 포커스 (View 컴포넌트 문서를 참조하세요).

| Type |
| ---- |
| bool |

---

### `nextFocusDown` <div className="label android">Android</div>

TV 다음 포커스 아래 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div>

TV 다음 포커스 앞 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div>

TV 다음 포커스 왼쪽 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div>

TV 다음 포커스 오른쪽 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div>

TV 다음 포커스 위 방향 (View 컴포넌트 문서를 참조하세요).

| Type   |
| ------ |
| number |

---

### `ref`

마운트될 때 [element node](element-nodes)가 할당될 ref 세터입니다.
