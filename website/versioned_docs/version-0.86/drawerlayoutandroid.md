---
id: drawerlayoutandroid
title: DrawerLayoutAndroid
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

플랫폼의 `DrawerLayout`(Android 전용)을 감싸는 React 컴포넌트입니다. 드로어(일반적으로 내비게이션에 사용)는 `renderNavigationView`로 렌더링되며, 직접적인 자식 요소는 메인 뷰(콘텐츠가 들어가는 곳)가 됩니다. 내비게이션 뷰는 초기에 화면에 표시되지 않지만, `drawerPosition` prop으로 지정한 창의 측면에서 당겨 들어올 수 있으며, `drawerWidth` prop으로 너비를 설정할 수 있습니다.

## 예시

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=DrawerLayoutAndroid%20Component%20Example&supportedPlatforms=android&ext=js
import {useRef, useState} from 'react';
import {Button, DrawerLayoutAndroid, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <SafeAreaView style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
          <Button
            title="Change Drawer Position"
            onPress={() => changeDrawerPosition()}
          />
          <Text style={styles.paragraph}>
            Swipe from the side or press button below to see it!
          </Text>
          <Button
            title="Open drawer"
            onPress={() => drawer.current.openDrawer()}
          />
        </SafeAreaView>
      </DrawerLayoutAndroid>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=DrawerLayoutAndroid%20Component%20Example&supportedPlatforms=android&ext=tsx
import {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
} from 'react-native';

const App = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>(
    'left',
  );
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current?.closeDrawer()}
      />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Drawer on the {drawerPosition}!</Text>
        <Button
          title="Change Drawer Position"
          onPress={() => changeDrawerPosition()}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current?.openDrawer()}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

---

# 레퍼런스

## Props

### [View Props](view.md#props)

[View Props](view.md#props)를 상속합니다.

---

### `drawerBackgroundColor`

드로어의 배경색을 지정합니다. 기본값은 `white`입니다. 드로어의 투명도를 설정하려면 rgba를 사용하세요. 예시:

```tsx
return (
  <DrawerLayoutAndroid drawerBackgroundColor="rgba(0,0,0,0.5)" />
);
```

| 타입               | 필수 여부 |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `drawerLockMode`

드로어의 잠금 모드를 지정합니다. 드로어는 3가지 상태로 잠길 수 있습니다:

- unlocked(기본값): 드로어가 터치 제스처에 반응하여 열리거나 닫힙니다.
- locked-closed: 드로어가 닫힌 상태로 유지되며 제스처에 반응하지 않습니다.
- locked-open: 드로어가 열린 상태로 유지되며 제스처에 반응하지 않습니다. 드로어는 여전히 프로그래밍 방식으로 열고 닫을 수 있습니다(`openDrawer`/`closeDrawer`).

| 타입                                             | 필수 여부 |
| ------------------------------------------------ | -------- |
| enum('unlocked', 'locked-closed', 'locked-open') | No       |

---

### `drawerPosition`

드로어가 슬라이드 인되는 화면의 방향을 지정합니다. 기본값은 `left`입니다.

| 타입                  | 필수 여부 |
| --------------------- | -------- |
| enum('left', 'right') | No       |

---

### `drawerWidth`

드로어의 너비, 즉 창의 가장자리에서 당겨 들어오는 뷰의 너비를 지정합니다.

| 타입   | 필수 여부 |
| ------ | -------- |
| number | No       |

---

### `keyboardDismissMode`

드래그 동작에 따라 키보드를 닫을지 여부를 결정합니다.

- 'none'(기본값): 드래그해도 키보드가 닫히지 않습니다.
- 'on-drag': 드래그를 시작하면 키보드가 닫힙니다.

| 타입                    | 필수 여부 |
| ----------------------- | -------- |
| enum('none', 'on-drag') | No       |

---

### `onDrawerClose`

내비게이션 뷰가 닫힐 때마다 호출되는 함수입니다.

| 타입     | 필수 여부 |
| -------- | -------- |
| function | No       |

---

### `onDrawerOpen`

내비게이션 뷰가 열릴 때마다 호출되는 함수입니다.

| 타입     | 필수 여부 |
| -------- | -------- |
| function | No       |

---

### `onDrawerSlide`

내비게이션 뷰와 상호작용이 있을 때마다 호출되는 함수입니다.

| 타입     | 필수 여부 |
| -------- | -------- |
| function | No       |

---

### `onDrawerStateChanged`

드로어 상태가 변경될 때 호출되는 함수입니다. 드로어는 3가지 상태를 가질 수 있습니다:

- idle: 현재 내비게이션 뷰와의 상호작용이 없는 상태
- dragging: 현재 내비게이션 뷰와 상호작용 중인 상태
- settling: 내비게이션 뷰와 상호작용이 있었으며, 내비게이션 뷰가 닫히거나 열리는 애니메이션을 완료하는 중인 상태

| 타입     | 필수 여부 |
| -------- | -------- |
| function | No       |

---

### `renderNavigationView`

화면 옆에 렌더링되어 당겨 들어올 수 있는 내비게이션 뷰입니다.

| 타입     | 필수 여부 |
| -------- | -------- |
| function | Yes      |

---

### `statusBarBackgroundColor`

드로어가 전체 화면을 차지하도록 하고 상태 표시줄의 배경을 그려 상태 표시줄 위로 열릴 수 있게 합니다. API 21 이상에서만 효과가 있습니다.

| 타입               | 필수 여부 |
| ------------------ | -------- |
| [color](colors.md) | No       |

## 메서드

### `closeDrawer()`

```tsx
closeDrawer();
```

드로어를 닫습니다.

---

### `openDrawer()`

```tsx
openDrawer();
```

드로어를 엽니다.
