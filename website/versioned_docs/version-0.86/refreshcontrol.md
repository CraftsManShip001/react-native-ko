---
id: refreshcontrol
title: RefreshControl
---

이 컴포넌트는 ScrollView 또는 ListView 내부에서 당겨서 새로 고침(pull to refresh) 기능을 추가하기 위해 사용됩니다. ScrollView가 `scrollY: 0` 상태일 때 아래로 스와이프하면 `onRefresh` 이벤트가 발생합니다.

## 예제

```SnackPlayer name=RefreshControl&supportedPlatforms=ios,android
import {useCallback, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text>Pull down to see RefreshControl indicator</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

:::note
`refreshing`은 제어 props입니다. 따라서 `onRefresh` 함수 내에서 반드시 `true`로 설정해야 하며, 그렇지 않으면 새로 고침 인디케이터가 즉시 멈춥니다.
:::

---

# 레퍼런스

## Props

### [View Props](view.md#props)

[View Props](view.md#props)를 상속합니다.

---

### <div className="label required basic">Required</div>**`refreshing`**

뷰가 활성 새로 고침 상태를 표시해야 하는지 여부입니다.

| Type    |
| ------- |
| boolean |

---

### `colors` <div className="label android">Android</div>

새로 고침 인디케이터를 그리는 데 사용할 색상입니다(최소 하나 이상).

| Type                         |
| ---------------------------- |
| array of [colors](colors.md) |

---

### `enabled` <div className="label android">Android</div>

당겨서 새로 고침 기능의 활성화 여부입니다.

| Type    | Default |
| ------- | ------- |
| boolean | `true`  |

---

### `onRefresh`

뷰가 새로 고침을 시작할 때 호출됩니다.

| Type     |
| -------- |
| function |

---

### `progressBackgroundColor` <div className="label android">Android</div>

새로 고침 인디케이터의 배경색입니다.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `progressViewOffset`

진행률 뷰의 상단 오프셋입니다.

| Type   | Default |
| ------ | ------- |
| number | `0`     |

---

### `size` <div className="label android">Android</div>

새로 고침 인디케이터의 크기입니다.

| Type                         | Default     |
| ---------------------------- | ----------- |
| enum(`'default'`, `'large'`) | `'default'` |

---

### `tintColor` <div className="label ios">iOS</div>

새로 고침 인디케이터의 색상입니다.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `title` <div className="label ios">iOS</div>

새로 고침 인디케이터 아래에 표시되는 제목입니다.

| Type   |
| ------ |
| string |

---

### `titleColor` <div className="label ios">iOS</div>

새로 고침 인디케이터 제목의 색상입니다.

| Type               |
| ------------------ |
| [color](colors.md) |
