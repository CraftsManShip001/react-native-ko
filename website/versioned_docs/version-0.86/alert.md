---
id: alert
title: Alert
---

지정된 제목과 메시지로 알림 다이얼로그를 실행합니다.

선택적으로 버튼 목록을 제공할 수 있습니다. 버튼을 탭하면 해당 onPress 콜백이 실행되고 알림이 닫힙니다. 기본적으로 'OK' 버튼만 표시됩니다.

이 API는 Android와 iOS 모두에서 동작하며 정적 알림을 표시할 수 있습니다. 사용자에게 정보 입력을 요청하는 알림은 iOS에서만 사용할 수 있습니다.

## 예시

```SnackPlayer name=Alert%20Example&supportedPlatforms=ios,android
import {StyleSheet, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />
        <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;
```

## iOS

iOS에서는 버튼 수를 제한 없이 지정할 수 있습니다. 각 버튼은 선택적으로 스타일을 지정하거나 강조할 수 있으며, 사용 가능한 옵션은 [AlertButtonStyle](#alertbuttonstyle-ios) 열거형과 [AlertButton](alert#alertbutton)의 `isPreferred` 필드로 표현됩니다.

## Android

Android에서는 최대 세 개의 버튼을 지정할 수 있습니다. Android에는 중립, 부정, 긍정 버튼의 개념이 있습니다:

- 버튼이 하나인 경우, '긍정' 버튼이 됩니다 (예: 'OK')
- 두 개의 버튼은 '부정', '긍정'을 의미합니다 (예: 'Cancel', 'OK')
- 세 개의 버튼은 '중립', '부정', '긍정'을 의미합니다 (예: 'Later', 'Cancel', 'OK')

Android의 알림은 알림 박스 외부를 탭하여 닫을 수 있습니다. 기본적으로 비활성화되어 있으며, `cancelable` 속성을 `true`로 설정한 선택적 [AlertOptions](alert#alertoptions) 파라미터를 제공하여 활성화할 수 있습니다. 즉,<br/>`{cancelable: true}`.

취소 이벤트는 `options` 파라미터 내부에 `onDismiss` 콜백 속성을 제공하여 처리할 수 있습니다.

### 예시 <div className="label android">Android</div>

```SnackPlayer name=Alert%20Android%20Dissmissable%20Example&supportedPlatforms=android
import {StyleSheet, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Button title="Show alert" onPress={showAlert} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

---

# 레퍼런스

## 메서드

### `alert()`

```tsx
static alert (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
);
```

**파라미터:**

| 이름                                                       | 타입                               | 설명                                                             |
| ---------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| title <div className="label basic required">Required</div> | string                             | 다이얼로그의 제목입니다. `null` 또는 빈 문자열을 전달하면 제목이 숨겨집니다. |
| message                                                    | string                             | 다이얼로그 제목 아래에 표시되는 선택적 메시지입니다.              |
| buttons                                                    | [AlertButton](alert#alertbutton)[] | 버튼 설정을 담은 선택적 배열입니다.                     |
| options                                                    | [AlertOptions](alert#alertoptions) | 선택적 Alert 설정입니다.                                        |

---

### `prompt()` <div className="label ios">iOS</div>

```tsx
static prompt: (
  title: string,
  message?: string,
  callbackOrButtons?: ((text: string) => void) | AlertButton[],
  type?: AlertType,
  defaultValue?: string,
  keyboardType?: string,
);
```

Alert 형태로 텍스트를 입력하는 프롬프트를 생성하고 표시합니다.

**파라미터:**

| 이름                                                       | 타입                                            | 설명                                                                                                                                                                                           |
| ---------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title <div className="label basic required">Required</div> | string                                          | 다이얼로그의 제목입니다.                                                                                                                                                                   |
| message                                                    | string                                          | 텍스트 입력 위에 표시되는 선택적 메시지입니다.                                                                                                                                                |
| callbackOrButtons                                          | function<hr/>[AlertButton](alert#alertbutton)[] | 함수를 전달하면 사용자가 'OK'를 탭할 때 프롬프트의 값과 함께 호출됩니다<br/>`(text: string) => void`.<hr/>배열을 전달하면 배열 내용을 기반으로 버튼이 구성됩니다. |
| type                                                       | [AlertType](alert#alerttype-ios)                | 텍스트 입력을 설정합니다.                                                                                                                                                                       |
| defaultValue                                               | string                                          | 텍스트 입력의 기본 텍스트입니다.                                                                                                                                                                       |
| keyboardType                                               | string                                          | 첫 번째 텍스트 필드(있는 경우)의 키보드 타입입니다. TextInput [keyboardTypes](textinput#keyboardtype) 중 하나입니다.                                                                                          |
| options                                                    | [AlertOptions](alert#alertoptions)              | 선택적 Alert 설정입니다.                                                                                                                                                                      |

---

## 타입 정의

### AlertButtonStyle <div className="label ios">iOS</div>

iOS Alert 버튼 스타일입니다.

| 타입 |
| ---- |
| enum |

**상수:**

| 값           | 설명               |
| --------------- | ------------------------- |
| `'default'`     | 기본 버튼 스타일입니다.     |
| `'cancel'`      | 취소 버튼 스타일입니다.      |
| `'destructive'` | 파괴적 버튼 스타일입니다. |

---

### AlertType <div className="label ios">iOS</div>

iOS Alert 타입입니다.

| 타입 |
| ---- |
| enum |

**상수:**

| 값              | 설명                  |
| ------------------ | ---------------------------- |
| `'default'`        | 입력이 없는 기본 알림입니다. |
| `'plain-text'`     | 일반 텍스트 입력 알림입니다.       |
| `'secure-text'`    | 보안 텍스트 입력 알림입니다.      |
| `'login-password'` | 로그인 및 비밀번호 알림입니다.     |

---

### AlertButton

알림 내 버튼 설정을 설명하는 객체입니다.

| 타입             |
| ---------------- |
| array of objects |

**객체 속성:**

| 이름                                             | 타입                                           | 설명                                                                    |
| ------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------ |
| text                                             | string                                         | 버튼 레이블입니다.                                                                  |
| onPress                                          | function                                       | 버튼이 눌렸을 때의 콜백 함수입니다.                                      |
| style <div className="label ios">iOS</div>       | [AlertButtonStyle](alert#alertbuttonstyle-ios) | 버튼 스타일입니다. Android에서는 이 속성이 무시됩니다.                        |
| isPreferred <div className="label ios">iOS</div> | boolean                                        | 버튼을 강조할지 여부입니다. Android에서는 이 속성이 무시됩니다. |

---

### AlertOptions

| 타입   |
| ------ |
| object |

**속성:**

| 이름                                                    | 타입     | 설명                                                                                                               |
| ------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| cancelable <div className="label android">Android</div> | boolean  | 알림 박스 외부를 탭하여 알림을 닫을 수 있는지 여부를 정의합니다.                                                    |
| userInterfaceStyle <div className="label ios">iOS</div> | string   | 알림에 사용되는 인터페이스 스타일로, `light` 또는 `dark`로 설정할 수 있으며, 설정하지 않으면 기본 시스템 스타일이 사용됩니다. |
| onDismiss <div className="label android">Android</div>  | function | 알림이 닫혔을 때 실행되는 콜백 함수입니다.                                                                    |
