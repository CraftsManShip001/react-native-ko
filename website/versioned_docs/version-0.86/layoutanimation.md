---
id: layoutanimation
title: LayoutAnimation
---

다음 레이아웃이 발생할 때 뷰를 새 위치로 자동으로 애니메이션 처리합니다.

이 API를 사용하는 일반적인 방법은 함수형 컴포넌트에서 state 훅을 업데이트하기 전에 호출하고, 클래스 컴포넌트에서는 `setState`를 호출하기 전에 사용하는 것입니다.

**Android**에서 이 기능을 사용하려면 `UIManager`를 통해 다음 플래그를 설정해야 합니다.

```js
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
```

## 예제

```SnackPlayer name=LayoutAnimation%20Example&supportedPlatforms=android,ios
import {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const App = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={style.container}>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setExpanded(!expanded);
          }}>
          <Text>Press me to {expanded ? 'collapse' : 'expand'}!</Text>
        </TouchableOpacity>
        {expanded && (
          <View style={style.tile}>
            <Text>I disappear sometimes!</Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  tile: {
    backgroundColor: 'lightgrey',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 4,
  },
});

export default App;
```

---

# 레퍼런스

## 메서드

### `configureNext()`

```tsx
static configureNext(
  config: LayoutAnimationConfig,
  onAnimationDidEnd?: () => void,
  onAnimationDidFail?: () => void,
);
```

다음 레이아웃에서 실행될 애니메이션을 예약합니다.

#### 파라미터:

| Name               | Type     | Required | Description                         |
| ------------------ | -------- | -------- | ----------------------------------- |
| config             | object   | Yes      | 아래의 config 설명을 참조하세요.       |
| onAnimationDidEnd  | function | No       | 애니메이션이 완료되면 호출됩니다.       |
| onAnimationDidFail | function | No       | 애니메이션이 실패하면 호출됩니다.       |

`config` 파라미터는 아래 키를 가진 객체입니다. [`create`](layoutanimation.md#create)는 `config`에 유효한 객체를 반환하며, [`Presets`](layoutanimation.md#presets) 객체도 모두 `config`로 전달할 수 있습니다.

- `duration`: 밀리초 단위
- `create`: 새로운 뷰를 애니메이션으로 표시하는 선택적 config
- `update`: 업데이트된 뷰를 애니메이션 처리하는 선택적 config
- `delete`: 제거되는 뷰를 애니메이션 처리하는 선택적 config

`create`, `update`, `delete`에 전달되는 config는 다음 키를 가집니다.

- `type`: 사용할 [애니메이션 타입](layoutanimation.md#types)
- `property`: 애니메이션 처리할 [레이아웃 프로퍼티](layoutanimation.md#프로퍼티) (선택 사항이지만 `create` 및 `delete`에 권장)
- `springDamping` (숫자, 선택 사항이며 `type: Type.spring`과 함께만 사용)
- `initialVelocity` (숫자, 선택 사항)
- `delay` (숫자, 선택 사항)
- `duration` (숫자, 선택 사항)

---

### `create()`

```tsx
static create(duration, type, creationProp)
```

[`configureNext`](layoutanimation.md#configurenext)에 전달할 객체(`create`, `update`, `delete` 필드 포함)를 생성하는 헬퍼입니다. `type` 파라미터는 [애니메이션 타입](layoutanimation.md#types)이고, `creationProp` 파라미터는 [레이아웃 프로퍼티](layoutanimation.md#프로퍼티)입니다.

**예제:**

```SnackPlayer name=LayoutAnimation&supportedPlatforms=android,ios
import {useState} from 'react';
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Button,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [boxPosition, setBoxPosition] = useState('left');

  const toggleBox = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'spring', springDamping: 0.4},
      delete: {type: 'linear', property: 'opacity'},
    });
    setBoxPosition(boxPosition === 'left' ? 'right' : 'left');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Toggle Layout" onPress={toggleBox} />
      </View>
      <View
        style={[styles.box, boxPosition === 'left' ? null : styles.moveRight]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: 'blue',
  },
  moveRight: {
    alignSelf: 'flex-end',
    height: 200,
    width: 200,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});

export default App;
```

## 프로퍼티

### Types

[`create`](layoutanimation.md#create) 메서드나 [`configureNext`](layoutanimation.md#configurenext)의 `create`/`update`/`delete` config에서 사용할 애니메이션 타입의 열거형입니다. (사용 예: `LayoutAnimation.Types.easeIn`)

| Types         |
| ------------- |
| spring        |
| linear        |
| easeInEaseOut |
| easeIn        |
| easeOut       |
| keyboard      |

---

### Properties

[`create`](layoutanimation.md#create) 메서드나 [`configureNext`](layoutanimation.md#configurenext)의 `create`/`update`/`delete` config에서 사용할 애니메이션 처리 가능한 레이아웃 프로퍼티의 열거형입니다. (사용 예: `LayoutAnimation.Properties.opacity`)

| Properties |
| ---------- |
| opacity    |
| scaleX     |
| scaleY     |
| scaleXY    |

---

### Presets

[`configureNext`](layoutanimation.md#configurenext)에 전달할 미리 정의된 애니메이션 config 집합입니다.

| Presets       | Value                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| easeInEaseOut | `create(300, 'easeInEaseOut', 'opacity')`                                                                                                                      |
| linear        | `create(500, 'linear', 'opacity')`                                                                                                                             |
| spring        | `{duration: 700, create: {type: 'linear', property: 'opacity'}, update: {type: 'spring', springDamping: 0.4}, delete: {type: 'linear', property: 'opacity'} }` |

---

### `easeInEaseOut`

`Presets.easeInEaseOut`으로 `configureNext()`를 호출합니다.

---

### `linear`

`Presets.linear`로 `configureNext()`를 호출합니다.

---

### `spring`

`Presets.spring`으로 `configureNext()`를 호출합니다.

**예제:**

```SnackPlayer name=LayoutAnimation&supportedPlatforms=android,ios
import {useState} from 'react';
import {
  View,
  Platform,
  UIManager,
  LayoutAnimation,
  StyleSheet,
  Button,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [firstBoxPosition, setFirstBoxPosition] = useState('left');
  const [secondBoxPosition, setSecondBoxPosition] = useState('left');
  const [thirdBoxPosition, setThirdBoxPosition] = useState('left');

  const toggleFirstBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFirstBoxPosition(firstBoxPosition === 'left' ? 'right' : 'left');
  };

  const toggleSecondBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setSecondBoxPosition(secondBoxPosition === 'left' ? 'right' : 'left');
  };

  const toggleThirdBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setThirdBoxPosition(thirdBoxPosition === 'left' ? 'right' : 'left');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="EaseInEaseOut" onPress={toggleFirstBox} />
      </View>
      <View
        style={[
          styles.box,
          firstBoxPosition === 'left' ? null : styles.moveRight,
        ]}
      />
      <View style={styles.buttonContainer}>
        <Button title="Linear" onPress={toggleSecondBox} />
      </View>
      <View
        style={[
          styles.box,
          secondBoxPosition === 'left' ? null : styles.moveRight,
        ]}
      />
      <View style={styles.buttonContainer}>
        <Button title="Spring" onPress={toggleThirdBox} />
      </View>
      <View
        style={[
          styles.box,
          thirdBoxPosition === 'left' ? null : styles.moveRight,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: 'blue',
  },
  moveRight: {
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});

export default App;
```
