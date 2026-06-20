---
id: permissionsandroid
title: PermissionsAndroid
---

<div className="banner-native-code-required">
  <h3>네이티브 코드가 포함된 프로젝트 필요</h3>
  <p>이 섹션은 네이티브 코드가 노출된 프로젝트에만 적용됩니다. 관리형 Expo 워크플로를 사용하고 있다면, 적절한 대안으로 Expo 문서의 <a href="https://docs.expo.dev/guides/permissions/">Permissions</a> 가이드를 참조하세요.</p>
</div>

`PermissionsAndroid`는 Android M의 새로운 권한 모델에 접근할 수 있도록 해줍니다. 소위 "일반(normal)" 권한은 `AndroidManifest.xml`에 명시되어 있으면 애플리케이션 설치 시 기본값으로 부여됩니다. 그러나 "위험(dangerous)" 권한은 다이얼로그 프롬프트가 필요합니다. 이러한 권한에는 이 모듈을 사용해야 합니다.

SDK 버전 23 이전의 기기에서는 매니페스트에 명시된 권한이 자동으로 부여되므로, `check`는 항상 `true`를 반환하고 `request`는 항상 `PermissionsAndroid.RESULTS.GRANTED`로 resolve됩니다.

사용자가 이전에 요청한 권한을 거부한 경우, OS는 앱에게 해당 권한이 필요한 이유를 설명하는 rationale을 표시하도록 권고합니다. 선택적 `rationale` 인수는 필요한 경우에만 설명 다이얼로그를 표시하며, 그렇지 않으면 일반 권한 프롬프트가 나타납니다.

### 예제

```SnackPlayer name=PermissionsAndroid%20Example&supportedPlatforms=android
import {
  Button,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.item}>Try permissions</Text>
      <Button title="request permissions" onPress={requestCameraPermission} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
```

### 사용자에게 프롬프트가 필요한 권한

`PermissionsAndroid.PERMISSIONS` 아래의 상수로 사용 가능합니다:

- `READ_CALENDAR`: 'android.permission.READ_CALENDAR'
- `WRITE_CALENDAR`: 'android.permission.WRITE_CALENDAR'
- `CAMERA`: 'android.permission.CAMERA'
- `READ_CONTACTS`: 'android.permission.READ_CONTACTS'
- `WRITE_CONTACTS`: 'android.permission.WRITE_CONTACTS'
- `GET_ACCOUNTS`: 'android.permission.GET_ACCOUNTS'
- `ACCESS_FINE_LOCATION`: 'android.permission.ACCESS_FINE_LOCATION'
- `ACCESS_COARSE_LOCATION`: 'android.permission.ACCESS_COARSE_LOCATION'
- `ACCESS_BACKGROUND_LOCATION`: 'android.permission.ACCESS_BACKGROUND_LOCATION'
- `RECORD_AUDIO`: 'android.permission.RECORD_AUDIO'
- `READ_PHONE_STATE`: 'android.permission.READ_PHONE_STATE'
- `CALL_PHONE`: 'android.permission.CALL_PHONE'
- `READ_CALL_LOG`: 'android.permission.READ_CALL_LOG'
- `WRITE_CALL_LOG`: 'android.permission.WRITE_CALL_LOG'
- `ADD_VOICEMAIL`: 'com.android.voicemail.permission.ADD_VOICEMAIL'
- `USE_SIP`: 'android.permission.USE_SIP'
- `PROCESS_OUTGOING_CALLS`: 'android.permission.PROCESS_OUTGOING_CALLS'
- `BODY_SENSORS`: 'android.permission.BODY_SENSORS'
- `SEND_SMS`: 'android.permission.SEND_SMS'
- `RECEIVE_SMS`: 'android.permission.RECEIVE_SMS'
- `READ_SMS`: 'android.permission.READ_SMS'
- `RECEIVE_WAP_PUSH`: 'android.permission.RECEIVE_WAP_PUSH'
- `RECEIVE_MMS`: 'android.permission.RECEIVE_MMS'
- `READ_EXTERNAL_STORAGE`: 'android.permission.READ_EXTERNAL_STORAGE'
- `WRITE_EXTERNAL_STORAGE`: 'android.permission.WRITE_EXTERNAL_STORAGE'
- `BLUETOOTH_CONNECT`: 'android.permission.BLUETOOTH_CONNECT'
- `BLUETOOTH_SCAN`: 'android.permission.BLUETOOTH_SCAN'
- `BLUETOOTH_ADVERTISE`: 'android.permission.BLUETOOTH_ADVERTISE'
- `ACCESS_MEDIA_LOCATION`: 'android.permission.ACCESS_MEDIA_LOCATION'
- `ACCEPT_HANDOVER`: 'android.permission.ACCEPT_HANDOVER'
- `ACTIVITY_RECOGNITION`: 'android.permission.ACTIVITY_RECOGNITION'
- `ANSWER_PHONE_CALLS`: 'android.permission.ANSWER_PHONE_CALLS'
- `READ_PHONE_NUMBERS`: 'android.permission.READ_PHONE_NUMBERS'
- `UWB_RANGING`: 'android.permission.UWB_RANGING'
- `BODY_SENSORS_BACKGROUND`: 'android.permission.BODY_SENSORS_BACKGROUND'
- `READ_MEDIA_IMAGES`: 'android.permission.READ_MEDIA_IMAGES'
- `READ_MEDIA_VIDEO`: 'android.permission.READ_MEDIA_VIDEO'
- `READ_MEDIA_AUDIO`: 'android.permission.READ_MEDIA_AUDIO'
- `POST_NOTIFICATIONS`: 'android.permission.POST_NOTIFICATIONS'
- `NEARBY_WIFI_DEVICES`: 'android.permission.NEARBY_WIFI_DEVICES'
- `READ_VOICEMAIL`: 'com.android.voicemail.permission.READ_VOICEMAIL',
- `WRITE_VOICEMAIL`: 'com.android.voicemail.permission.WRITE_VOICEMAIL',

### 권한 요청 결과 문자열

`PermissionsAndroid.RESULTS` 아래의 상수로 사용 가능합니다:

- `GRANTED`: 'granted'
- `DENIED`: 'denied'
- `NEVER_ASK_AGAIN`: 'never_ask_again'

---

# 레퍼런스

## 메서드

### `check()`

```tsx
static check(permission: Permission): Promise<boolean>;
```

지정된 권한이 부여되었는지 여부를 나타내는 불리언 값으로 resolve되는 Promise를 반환합니다.

**매개변수:**

| Name       | Type   | Required | Description                  |
| ---------- | ------ | -------- | ---------------------------- |
| permission | string | Yes      | 확인할 권한. |

---

### `request()`

```tsx
static request(
  permission: Permission,
  rationale?: Rationale,
): Promise<PermissionStatus>;
```

사용자에게 권한 활성화를 요청하고, 사용자가 요청을 허용했는지, 거부했는지, 또는 다시 묻지 않기를 원하는지 나타내는 문자열 값(위의 결과 문자열 참조)으로 resolve되는 Promise를 반환합니다.

`rationale`이 제공된 경우, 이 함수는 권한이 필요한 이유를 설명하는 다이얼로그를 표시할 필요가 있는지 OS에 확인하고(https://developer.android.com/training/permissions/requesting.html#explain), 시스템 권한 다이얼로그를 표시합니다.

**매개변수:**

| Name       | Type   | Required | Description                |
| ---------- | ------ | -------- | -------------------------- |
| permission | string | Yes      | 요청할 권한. |
| rationale  | object | No       | 아래 `rationale`을 참조하세요.     |

**Rationale:**

| Name           | Type   | Required | Description                      |
| -------------- | ------ | -------- | -------------------------------- |
| title          | string | Yes      | 다이얼로그의 제목.         |
| message        | string | Yes      | 다이얼로그의 메시지.       |
| buttonPositive | string | Yes      | 긍정 버튼의 텍스트. |
| buttonNegative | string | No       | 부정 버튼의 텍스트. |
| buttonNeutral  | string | No       | 중립 버튼의 텍스트.  |

---

### `requestMultiple()`

```tsx
static requestMultiple(
  permissions: Permission[],
): Promise<{[key in Permission]: PermissionStatus}>;
```

동일한 다이얼로그에서 여러 권한을 활성화하도록 사용자에게 요청하고, 권한을 키로, 사용자가 각 요청을 허용했는지, 거부했는지, 또는 다시 묻지 않기를 원하는지 나타내는 문자열을 값으로 하는 객체(위의 결과 문자열 참조)를 반환합니다.

**매개변수:**

| Name        | Type  | Required | Description                      |
| ----------- | ----- | -------- | -------------------------------- |
| permissions | array | Yes      | 요청할 권한의 배열. |
