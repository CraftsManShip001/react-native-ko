---
id: touchablehighlight
title: TouchableHighlight
---

:::tip
터치 기반 입력을 처리하는 더 포괄적이고 미래 지향적인 방법을 찾고 있다면 [Pressable](pressable.md) API를 확인하세요.
:::

뷰가 터치에 올바르게 반응하도록 만드는 래퍼입니다. 누를 때 래핑된 뷰의 불투명도가 낮아지면서 언더레이 색상이 비쳐 보이며, 뷰가 어두워지거나 색조가 변합니다.

언더레이는 자식을 새 View로 래핑함으로써 구현되며, 이는 레이아웃에 영향을 줄 수 있고 올바르게 사용하지 않으면 의도치 않은 시각적 결함이 발생할 수 있습니다. 예를 들어 래핑된 뷰의 `backgroundColor`가 명시적으로 불투명한 색상으로 설정되지 않은 경우 문제가 생길 수 있습니다.

TouchableHighlight는 자식을 반드시 하나만 가져야 합니다(0개 또는 2개 이상은 불가). 여러 자식 컴포넌트가 필요하다면 View로 감싸세요.

```tsx
function MyComponent(props: MyComponentProps) {
  return (
    <View {...props} style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>My Component</Text>
    </View>
  );
}

<TouchableHighlight
  activeOpacity={0.6}
  underlayColor="#DDDDDD"
  onPress={() => alert('Pressed!')}>
  <MyComponent />
</TouchableHighlight>;
```

## 예제

```SnackPlayer name=TouchableHighlight%20Example
import {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TouchableHighlightExample = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(count + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.button}>
            <Text>Touch Here</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count || null}</Text>
        </View>
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
  countText: {
    color: '#FF00FF',
  },
});

export default TouchableHighlightExample;
```

---

# 레퍼런스

## Props

### [TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)

[TouchableWithoutFeedback Props](touchablewithoutfeedback.md#props)를 상속합니다.

---

### `activeOpacity`

터치가 활성화되었을 때 래핑된 뷰의 불투명도를 결정합니다. 값은 0과 1 사이여야 합니다. 기본값은 0.85입니다. `underlayColor`가 설정되어 있어야 합니다.

| Type   |
| ------ |
| number |

---

### `onHideUnderlay`

언더레이가 숨겨진 직후 호출됩니다.

| Type     |
| -------- |
| function |

---

### `onShowUnderlay`

언더레이가 표시된 직후 호출됩니다.

| Type     |
| -------- |
| function |

---

### `ref`

마운트될 때 [element node](element-nodes)가 할당될 ref 세터입니다.

---

### `style`

| Type       |
| ---------- |
| View.style |

---

### `underlayColor`

터치가 활성화되었을 때 비쳐 보이는 언더레이의 색상입니다.

| Type               |
| ------------------ |
| [color](colors.md) |

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

### `testOnly_pressed`

스냅샷 테스트에 유용합니다.

| Type |
| ---- |
| bool |
