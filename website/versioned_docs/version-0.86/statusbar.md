---
id: statusbar
title: StatusBar
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

앱의 상태 표시줄을 제어하는 컴포넌트입니다. 상태 표시줄은 일반적으로 화면 상단에 위치하며 현재 시간, Wi-Fi 및 셀룰러 네트워크 정보, 배터리 잔량 및/또는 기타 상태 아이콘을 표시하는 영역입니다.

### Navigator와 함께 사용하기

여러 `StatusBar` 컴포넌트를 동시에 마운트할 수 있습니다. props는 `StatusBar` 컴포넌트가 마운트된 순서대로 병합됩니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=StatusBar%20Component%20Example&supportedPlatforms=android,ios&ext=js
import {useState} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const App = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{'\n'}
          {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{'\n'}
          {statusBarStyle}
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{'\n'}
            {statusBarTransition}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button
            title="Toggle StatusBar"
            onPress={changeStatusBarVisibility}
          />
          <Button
            title="Change StatusBar Style"
            onPress={changeStatusBarStyle}
          />
          {Platform.OS === 'ios' ? (
            <Button
              title="Change StatusBar Transition"
              onPress={changeStatusBarTransition}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=StatusBar%20Component%20Example&supportedPlatforms=android,ios&ext=tsx
import {useState} from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  StatusBarStyle,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const STYLES = ['default', 'dark-content', 'light-content'] as const;
const TRANSITIONS = ['fade', 'slide', 'none'] as const;

const App = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0],
  );
  const [statusBarTransition, setStatusBarTransition] = useState<
    'fade' | 'slide' | 'none'
  >(TRANSITIONS[0]);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{'\n'}
          {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{'\n'}
          {statusBarStyle}
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{'\n'}
            {statusBarTransition}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button
            title="Toggle StatusBar"
            onPress={changeStatusBarVisibility}
          />
          <Button
            title="Change StatusBar Style"
            onPress={changeStatusBarStyle}
          />
          {Platform.OS === 'ios' ? (
            <Button
              title="Change StatusBar Transition"
              onPress={changeStatusBarTransition}
            />
          ) : null}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default App;
```

</TabItem>
</Tabs>

### 명령형 API

컴포넌트를 사용하기 적합하지 않은 경우를 위해 컴포넌트의 정적 함수로 노출된 명령형 API도 있습니다. 그러나 정적 API와 컴포넌트를 같은 prop에 함께 사용하는 것은 권장하지 않습니다. 정적 API로 설정된 값은 다음 렌더링에서 컴포넌트가 설정한 값으로 덮어씌워지기 때문입니다.

---

# 참조

## 상수

### `currentHeight` <div className="label android">Android</div>

노치 높이가 있는 경우 이를 포함한 상태 표시줄의 높이입니다.

---

## Props

### `animated`

상태 표시줄 속성 변경 간 전환에 애니메이션을 적용할지 여부입니다. `backgroundColor`, `barStyle`, `hidden` 속성에 지원됩니다.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

---

### `backgroundColor` <div className="label android">Android</div>

상태 표시줄의 배경색입니다.

:::warning
Android 15에서 도입된 엣지 투 엣지 적용으로 인해, 상태 표시줄의 배경색 설정은 API 레벨 35에서 deprecated(더 이상 권장되지 않음)되었으며 설정해도 효과가 없습니다. [엣지 투 엣지 권장사항](https://github.com/react-native-community/discussions-and-proposals/discussions/827)에서 자세히 알아볼 수 있습니다.
:::

| Type            | Required | Default                                                                |
| --------------- | -------- | ---------------------------------------------------------------------- |
| [color](colors) | No       | default system StatusBar background color, or `'black'` if not defined |

---

### `barStyle`

상태 표시줄 텍스트의 색상을 설정합니다.

Android에서는 API 버전 23 이상에서만 적용됩니다.

| Type                                       | Required | Default     |
| ------------------------------------------ | -------- | ----------- |
| [StatusBarStyle](statusbar#statusbarstyle) | No       | `'default'` |

---

### `hidden`

상태 표시줄을 숨길지 여부입니다.

| Type    | Required | Default |
| ------- | -------- | ------- |
| boolean | No       | `false` |

---

### `networkActivityIndicatorVisible` <div className="label ios">iOS</div>

네트워크 활동 표시기를 표시할지 여부입니다.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

---

### `showHideTransition` <div className="label ios">iOS</div>

`hidden` prop을 사용하여 상태 표시줄을 표시하거나 숨길 때의 전환 효과입니다.

| Type                                               | Default  |
| -------------------------------------------------- | -------- |
| [StatusBarAnimation](statusbar#statusbaranimation) | `'fade'` |

---

### `translucent` <div className="label android">Android</div>

상태 표시줄을 반투명으로 설정할지 여부입니다. translucent를 `true`로 설정하면 앱이 상태 표시줄 아래에 그려집니다. 반투명 상태 표시줄 색상을 사용할 때 유용합니다.

:::warning
Android 15에서 도입된 엣지 투 엣지 적용으로 인해, 상태 표시줄을 반투명으로 설정하는 것은 API 레벨 35에서 deprecated(더 이상 권장되지 않음)되었으며 설정해도 효과가 없습니다. [엣지 투 엣지 권장사항](https://github.com/react-native-community/discussions-and-proposals/discussions/827)에서 자세히 알아볼 수 있습니다.
:::

| Type    | Default |
| ------- | ------- |
| boolean | `false` |

## 메서드

### `popStackEntry()`

```tsx
static popStackEntry(entry: StatusBarProps);
```

스택에서 마지막 StatusBar 항목을 가져오고 제거합니다.

**매개변수:**

| Name                                                       | Type | Description                           |
| ---------------------------------------------------------- | ---- | ------------------------------------- |
| entry <div className="label basic required">Required</div> | any  | `pushStackEntry`에서 반환된 항목. |

---

### `pushStackEntry()`

```tsx
static pushStackEntry(props: StatusBarProps): StatusBarProps;
```

스택에 StatusBar 항목을 추가합니다. 완료되면 반환값을 `popStackEntry`에 전달해야 합니다.

**매개변수:**

| Name                                                       | Type | Description                                                      |
| ---------------------------------------------------------- | ---- | ---------------------------------------------------------------- |
| props <div className="label basic required">Required</div> | any  | 스택 항목에 사용할 StatusBar props를 포함하는 객체. |

---

### `replaceStackEntry()`

```tsx
static replaceStackEntry(
  entry: StatusBarProps,
  props: StatusBarProps
): StatusBarProps;
```

기존 StatusBar 스택 항목을 새 props로 교체합니다.

**매개변수:**

| Name                                                       | Type | Description                                                                  |
| ---------------------------------------------------------- | ---- | ---------------------------------------------------------------------------- |
| entry <div className="label basic required">Required</div> | any  | 교체할 `pushStackEntry`에서 반환된 항목.                             |
| props <div className="label basic required">Required</div> | any  | 교체 스택 항목에 사용할 StatusBar props를 포함하는 객체. |

---

### `setBackgroundColor()` <div className="label android">Android</div>

```tsx
static setBackgroundColor(color: ColorValue, animated?: boolean);
```

상태 표시줄의 배경색을 설정합니다.

:::warning
Android 15에서 도입된 엣지 투 엣지 적용으로 인해, 상태 표시줄의 배경색 설정은 API 레벨 35에서 deprecated(더 이상 권장되지 않음)되었으며 설정해도 효과가 없습니다. [엣지 투 엣지 권장사항](https://github.com/react-native-community/discussions-and-proposals/discussions/827)에서 자세히 알아볼 수 있습니다.
:::

**매개변수:**

| Name                                                       | Type    | Description               |
| ---------------------------------------------------------- | ------- | ------------------------- |
| color <div className="label basic required">Required</div> | string  | 배경색.         |
| animated                                                   | boolean | 스타일 변경에 애니메이션을 적용합니다. |

---

### `setBarStyle()`

```tsx
static setBarStyle(style: StatusBarStyle, animated?: boolean);
```

상태 표시줄 스타일을 설정합니다.

**매개변수:**

| Name                                                       | Type                                       | Description               |
| ---------------------------------------------------------- | ------------------------------------------ | ------------------------- |
| style <div className="label basic required">Required</div> | [StatusBarStyle](statusbar#statusbarstyle) | 설정할 상태 표시줄 스타일.  |
| animated                                                   | boolean                                    | 스타일 변경에 애니메이션을 적용합니다. |

---

### `setHidden()`

```tsx
static setHidden(hidden: boolean, animation?: StatusBarAnimation);
```

상태 표시줄을 표시하거나 숨깁니다.

**매개변수:**

| Name                                                        | Type                                               | Description                                             |
| ----------------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------- |
| hidden <div className="label basic required">Required</div> | boolean                                            | 상태 표시줄을 숨깁니다.                                    |
| animation <div className="label ios">iOS</div>              | [StatusBarAnimation](statusbar#statusbaranimation) | 상태 표시줄 hidden 속성 변경 시의 애니메이션. |

---

### 🗑️ `setNetworkActivityIndicatorVisible()` <div className="label ios">iOS</div>

:::warning Deprecated
상태 표시줄 네트워크 활동 표시기는 iOS 13 이상에서 지원되지 않습니다. 이 기능은 향후 릴리즈에서 제거될 예정입니다.
:::

```tsx
static setNetworkActivityIndicatorVisible(visible: boolean);
```

네트워크 활동 표시기의 표시 여부를 제어합니다.

**매개변수:**

| Name                                                         | Type    | Description         |
| ------------------------------------------------------------ | ------- | ------------------- |
| visible <div className="label basic required">Required</div> | boolean | 표시기를 표시합니다. |

---

### `setTranslucent()` <div className="label android">Android</div>

```tsx
static setTranslucent(translucent: boolean);
```

상태 표시줄의 반투명 여부를 제어합니다.

:::warning
Android 15에서 도입된 엣지 투 엣지 적용으로 인해, 상태 표시줄을 반투명으로 설정하는 것은 API 레벨 35에서 deprecated(더 이상 권장되지 않음)되었으며 설정해도 효과가 없습니다. [엣지 투 엣지 권장사항](https://github.com/react-native-community/discussions-and-proposals/discussions/827)에서 자세히 알아볼 수 있습니다.
:::

**매개변수:**

| Name                                                             | Type    | Description         |
| ---------------------------------------------------------------- | ------- | ------------------- |
| translucent <div className="label basic required">Required</div> | boolean | 반투명으로 설정합니다. |

## 타입 정의

### StatusBarAnimation

iOS에서 전환 시 사용되는 상태 표시줄 애니메이션 타입입니다.

| Type |
| ---- |
| enum |

**상수:**

| Value     | Type   | Description     |
| --------- | ------ | --------------- |
| `'fade'`  | string | 페이드 애니메이션  |
| `'slide'` | string | 슬라이드 애니메이션 |
| `'none'`  | string | 애니메이션 없음    |

---

### StatusBarStyle

상태 표시줄 스타일 타입입니다.

| Type |
| ---- |
| enum |

**상수:**

| Value             | Type   | Description                                                |
| ----------------- | ------ | ---------------------------------------------------------- |
| `'default'`       | string | 기본 상태 표시줄 스타일 (iOS는 어두운 색상, Android는 밝은 색상) |
| `'light-content'` | string | 흰색 텍스트와 아이콘                                      |
| `'dark-content'`  | string | 어두운 텍스트와 아이콘 (Android에서 API>=23 필요)         |
