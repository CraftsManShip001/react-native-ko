---
id: modal
title: Modal
---

Modal 컴포넌트는 감싸는 뷰 위에 콘텐츠를 표시하는 기본적인 방법입니다.

## 예시

```SnackPlayer name=Modal&supportedPlatforms=android,ios
import {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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

### 🗑️ `animated`

:::warning Deprecated
대신 [`animationType`](modal.md#animationtype) prop을 사용하세요.
:::

---

### `animationType`

`animationType` prop은 모달이 어떻게 애니메이션되는지를 제어합니다.

가능한 값:

- `slide` — 하단에서 슬라이드하여 나타남
- `fade` — 페이드인하여 나타남
- `none` — 애니메이션 없이 나타남

| 타입                                | 기본값 |
| ----------------------------------- | ------- |
| enum(`'none'`, `'slide'`, `'fade'`) | `none`  |

---

### `backdropColor`

모달의 `backdropColor`(또는 모달 컨테이너의 배경색)입니다. 값을 지정하지 않고 `transparent`가 `false`이면 기본값은 `white`입니다. `transparent`가 `true`이면 무시됩니다.

| 타입            | 기본값 |
| --------------- | ------- |
| [color](colors) | white   |

---

### `hardwareAccelerated` <div className="label android">Android</div>

`hardwareAccelerated` prop은 하위 창에 하드웨어 가속을 강제 적용할지 여부를 제어합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `navigationBarTranslucent` <div className="label android">Android</div>

`navigationBarTranslucent` prop은 모달이 시스템 내비게이션 바 아래로 확장될지 여부를 결정합니다. 단, 내비게이션 바를 반투명하게 만들려면 `statusBarTranslucent`도 `true`로 설정해야 합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `onDismiss` <div className="label ios">iOS</div>

`onDismiss` prop을 사용하면 모달이 닫힌 후 호출될 함수를 전달할 수 있습니다.

| 타입     |
| -------- |
| function |

---

### `onOrientationChange` <div className="label ios">iOS</div>

`onOrientationChange` 콜백은 모달이 표시되는 동안 방향이 변경될 때 호출됩니다. 제공되는 방향은 'portrait' 또는 'landscape'만 해당됩니다. 이 콜백은 현재 방향에 관계없이 초기 렌더링 시에도 호출됩니다.

| 타입     |
| -------- |
| function |

---

### `allowSwipeDismissal` <div className="label ios">iOS</div>

iOS에서 아래로 스와이프하여 모달을 닫을 수 있는지 여부를 제어합니다.
이 기능을 사용하려면 닫기 동작을 처리하는 `onRequestClose` prop을 구현해야 합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `ref`

마운트 시 [element node](element-nodes)가 할당될 ref 세터입니다.

---

### `onRequestClose`

`onRequestClose` 콜백은 사용자가 Android의 하드웨어 뒤로 가기 버튼 또는 Apple TV의 메뉴 버튼을 탭할 때 호출됩니다. 이 필수 prop으로 인해 모달이 열려 있는 동안에는 `BackHandler` 이벤트가 발생하지 않는다는 점에 주의하세요.
iOS에서는 `presentationStyle`이 `pageSheet` 또는 `formSheet`일 때 드래그 제스처로 Modal을 닫는 중에 이 콜백이 호출됩니다. `allowSwipeDismissal`이 활성화된 경우 이 콜백은 모달을 닫은 후에 호출됩니다.

| 타입                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function <div className="label basic required">Required</div><div className="label android">Android</div><div className="label tv">TV</div><hr />function <div className="label ios">iOS</div> |

---

### `onShow`

`onShow` prop을 사용하면 모달이 표시된 후 호출될 함수를 전달할 수 있습니다.

| 타입     |
| -------- |
| function |

---

### `presentationStyle` <div className="label ios">iOS</div>

`presentationStyle` prop은 모달이 표시되는 방식을 제어합니다(일반적으로 iPad 또는 Plus 크기 iPhone과 같은 큰 기기에서). 자세한 내용은 https://developer.apple.com/reference/uikit/uimodalpresentationstyle 를 참조하세요.

가능한 값:

- `fullScreen` — 화면 전체를 덮음
- `pageSheet` — 세로 너비 뷰를 중앙에 덮음(큰 기기에서만)
- `formSheet` — 좁은 너비 뷰를 중앙에 덮음(큰 기기에서만)
- `overFullScreen` — 화면 전체를 덮지만 투명도를 허용함

| 타입                                                                   | 기본값                                                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| enum(`'fullScreen'`, `'pageSheet'`, `'formSheet'`, `'overFullScreen'`) | `transparent={false}`이면 `fullScreen`<hr />`transparent={true}`이면 `overFullScreen` |

---

### `statusBarTranslucent` <div className="label android">Android</div>

`statusBarTranslucent` prop은 모달이 시스템 상태 표시줄 아래로 확장될지 여부를 결정합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `supportedOrientations` <div className="label ios">iOS</div>

`supportedOrientations` prop을 사용하면 모달이 지정된 방향 중 하나로 회전할 수 있습니다. iOS에서는 앱의 Info.plist에 있는 UISupportedInterfaceOrientations 필드에 지정된 내용에 의해 모달이 여전히 제한됩니다.

:::note
`pageSheet` 또는 `formSheet`의 `presentationStyle`을 사용하는 경우 이 속성은 iOS에서 무시됩니다.
:::

| 타입                                                                                                           | 기본값         |
| -------------------------------------------------------------------------------------------------------------- | -------------- |
| array of enums(`'portrait'`, `'portrait-upside-down'`, `'landscape'`, `'landscape-left'`, `'landscape-right'`) | `['portrait']` |

---

### `transparent`

`transparent` prop은 모달이 전체 뷰를 채울지 여부를 결정합니다. `true`로 설정하면 투명한 배경 위에 모달이 렌더링됩니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `visible`

`visible` prop은 모달이 표시될지 여부를 결정합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |
