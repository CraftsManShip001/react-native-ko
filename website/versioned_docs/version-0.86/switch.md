---
id: switch
title: Switch
---

불리언 입력을 렌더링합니다.

이 컴포넌트는 사용자 동작을 반영하기 위해 `value` prop을 업데이트하는 `onValueChange` 콜백이 필요한 제어 컴포넌트입니다. `value` prop이 업데이트되지 않으면, 컴포넌트는 사용자 동작의 예상 결과 대신 제공된 `value` prop을 계속 렌더링합니다.

## 예시

```SnackPlayer name=Switch&supportedPlatforms=android,ios
import {useState} from 'react';
import {Switch, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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
});

export default App;
```

---

# 레퍼런스

## Props

### [View Props](view.md#props)

[View Props](view.md#props)를 상속합니다.

---

### `disabled`

true이면 사용자가 스위치를 토글할 수 없습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `ios_backgroundColor` <div className="label ios">iOS</div>

iOS에서 배경에 사용할 커스텀 색상입니다. 이 배경 색상은 스위치 값이 `false`이거나 스위치가 비활성화된 경우(스위치가 반투명한 경우)에 표시됩니다.

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `onChange`

사용자가 스위치 값을 변경하려 할 때 호출됩니다. 변경 이벤트를 인수로 받습니다. 새로운 값만 받고 싶다면 `onValueChange`를 대신 사용하세요.

| 타입     |
| -------- |
| function |

---

### `onValueChange`

사용자가 스위치 값을 변경하려 할 때 호출됩니다. 새로운 값을 인수로 받습니다. 이벤트를 받고 싶다면 `onChange`를 대신 사용하세요.

| 타입     |
| -------- |
| function |

---

### `ref`

마운트 시 [엘리먼트 노드](element-nodes)가 할당될 ref 세터입니다.

---

### `thumbColor`

스위치 그립의 전경 색상입니다. iOS에서 이 값을 설정하면 스위치 그립의 드롭 섀도우가 사라집니다.

| 타입               |
| ------------------ |
| [color](colors.md) |

---

### `trackColor`

스위치 트랙의 커스텀 색상입니다.

_iOS_: 스위치 값이 `false`일 때 트랙이 테두리 안으로 축소됩니다. 축소된 트랙에 의해 노출되는 배경 색상을 변경하려면 [`ios_backgroundColor`](switch.md#ios_backgroundcolor-ios)를 사용하세요.

| 타입                                                         |
| ------------------------------------------------------------ |
| `md object: {false: [color](colors), true: [color](colors)}` |

---

### `value`

스위치의 값입니다. true이면 스위치가 켜집니다. 기본값은 false입니다.

| 타입 |
| ---- |
| bool |
