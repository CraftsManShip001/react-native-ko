---
id: activityindicator
title: ActivityIndicator
---

원형 로딩 인디케이터를 표시합니다.

## 예시

```SnackPlayer name=ActivityIndicator%20Example
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" color="#0000ff" />
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
```

# 레퍼런스

## Props

### [View Props](view#props)

[View Props](view#props)를 상속합니다.

---

### `animating`

인디케이터를 표시(`true`)할지 숨길(`false`)지 여부입니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `color`

스피너의 전경색입니다.

| 타입            | 기본값                                                                                                                                                                                         |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [color](colors) | `null` (시스템 강조 기본 색상)<div className="label android">Android</div><hr/><ins style={{background: '#999'}} className="color-box" />`'#999999'` <div className="label ios">iOS</div> |

---

### `hidesWhenStopped` <div className="label ios">iOS</div>

애니메이션이 없을 때 인디케이터를 숨길지 여부입니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `ref`

마운트 시 [엘리먼트 노드](element-nodes)가 할당될 ref 세터입니다.

---

### `size`

인디케이터의 크기입니다.

| 타입                                                                               | 기본값   |
| ---------------------------------------------------------------------------------- | --------- |
| enum(`'small'`, `'large'`)<hr/>number <div className="label android">Android</div> | `'small'` |
