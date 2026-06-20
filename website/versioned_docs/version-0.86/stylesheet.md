---
id: stylesheet
title: StyleSheet
---

StyleSheet는 CSS StyleSheet와 유사한 추상화입니다.

```SnackPlayer name=StyleSheet
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;
```

코드 품질 팁:

- 스타일을 렌더링 함수 밖으로 이동하면 코드를 이해하기 더 쉬워집니다.
- 스타일에 이름을 붙이면 렌더링 함수의 로우 레벨 컴포넌트에 의미를 추가하고, 재사용을 장려하는 좋은 방법입니다.
- 대부분의 IDE에서 `StyleSheet.create()`를 사용하면 유효한 스타일을 작성하는 데 도움이 되는 정적 타입 검사와 자동 완성 제안을 제공합니다.

---

# 레퍼런스

## 메서드

### `compose()`

```tsx
static compose(style1: Object, style2: Object): Object | Object[];
```

두 스타일을 결합하여 `style2`가 `style1`의 스타일을 덮어쓰도록 합니다. 둘 중 하나의 스타일이 falsy인 경우, 배열을 할당하지 않고 다른 스타일을 그대로 반환하여 메모리 할당을 줄이고 PureComponent 검사에서 참조 동등성을 유지합니다.

```SnackPlayer name=Compose
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={container}>
      <Text style={text}>React Native</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    color: '#000',
  },
});

const lists = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#61dafb',
  },
  listItem: {
    fontWeight: 'bold',
  },
});

const container = StyleSheet.compose(page.container, lists.listContainer);
const text = StyleSheet.compose(page.text, lists.listItem);

export default App;
```

---

### `create()`

```tsx
static create(styles: Object extends Record<string, ViewStyle | ImageStyle | TextStyle>): Object;
```

스타일을 생성하는 항등 함수입니다. `StyleSheet.create()` 내에서 스타일을 생성하는 가장 큰 실용적인 이점은 네이티브 스타일 속성에 대한 정적 타입 검사입니다.

---

### `flatten()`

```tsx
static flatten(style: Array<Object extends Record<string, ViewStyle | ImageStyle | TextStyle>>): Object;
```

스타일 객체 배열을 하나의 통합된 스타일 객체로 평탄화합니다.

```SnackPlayer name=Flatten
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={page.container}>
      <Text style={flattenStyle}>React Native</Text>
      <Text>Flatten Style</Text>
      <Text style={page.code}>{JSON.stringify(flattenStyle, null, 2)}</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  code: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: '#666',
    backgroundColor: '#eaeaea',
  },
});

const typography = StyleSheet.create({
  header: {
    color: '#61dafb',
    fontSize: 30,
    marginBottom: 36,
  },
});

const flattenStyle = StyleSheet.flatten([page.text, typography.header]);

export default App;
```

---

### `setStyleAttributePreprocessor()`

:::warning 실험적 기능
파괴적 변경이 빈번하게 발생할 수 있으며 안정적으로 공지되지 않을 수 있습니다. 전체 기능이 삭제될 수도 있습니다. 사용 시 주의하세요.
:::

```tsx
static setStyleAttributePreprocessor(
  property: string,
  process: (propValue: any) => any,
);
```

스타일 속성 값을 사전 처리하는 데 사용할 함수를 설정합니다. 이 함수는 내부적으로 색상과 transform 값을 처리하는 데 사용됩니다. 정말로 무엇을 하는지 알고 다른 옵션을 모두 소진한 경우가 아니라면 사용하지 마세요.

## 속성

---

### `absoluteFill`

절대 위치와 0 포지셔닝(`position: 'absolute', left: 0, right: 0, top: 0, bottom: 0`)을 사용하여 오버레이를 생성하는 것은 매우 일반적인 패턴이므로, `absoluteFill`을 편의를 위해 사용하고 반복되는 스타일의 중복을 줄일 수 있습니다. 원한다면 absoluteFill을 사용하여 StyleSheet에서 커스터마이즈된 항목을 만들 수 있습니다. 예:

```SnackPlayer name=absoluteFill
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.text}>1</Text>
      </View>
      <View style={[styles.box2, StyleSheet.absoluteFill]}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={styles.box3}>
        <Text style={styles.text}>3</Text>
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  box3: {
    position: 'absolute',
    top: 120,
    left: 120,
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
  text: {
    color: '#FFF',
    fontSize: 80,
  },
});

export default App;
```

---

### `hairlineWidth`

플랫폼에서 얇은 선의 너비로 정의됩니다. 두 요소 사이의 테두리나 구분선의 두께로 사용할 수 있습니다. 예시:

```SnackPlayer name=hairlineWidth
import {StyleSheet, Text, View} from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text style={styles.row}>React</Text>
    <Text style={styles.row}>Native</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  row: {
    padding: 4,
    borderBottomColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
```

이 상수는 항상 픽셀의 반올림된 숫자가 되므로(이를 통해 선을 선명하게 표현할 수 있음), 기반 플랫폼의 얇은 선 표준 너비와 일치하도록 합니다. 그러나 다양한 플랫폼과 화면 밀도에 따라 계산 방법이 달라질 수 있으므로, 이를 일정한 크기라고 가정해서는 안 됩니다.

시뮬레이터가 축소되어 있을 경우 hairline 너비의 선이 보이지 않을 수 있습니다.
