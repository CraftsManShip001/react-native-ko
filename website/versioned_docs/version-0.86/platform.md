---
id: platform
title: Platform
---

## 예제

```SnackPlayer name=Platform%20API%20Example&supportedPlatforms=ios,android
import {Platform, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text>OS</Text>
          <Text style={styles.value}>{Platform.OS}</Text>
          <Text>OS Version</Text>
          <Text style={styles.value}>{Platform.Version}</Text>
          <Text>isTV</Text>
          <Text style={styles.value}>{Platform.isTV.toString()}</Text>
          {Platform.OS === 'ios' && (
            <>
              <Text>isPad</Text>
              <Text style={styles.value}>{Platform.isPad.toString()}</Text>
            </>
          )}
          <Text>Constants</Text>
          <Text style={styles.value}>
            {JSON.stringify(Platform.constants, null, 2)}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: '600',
    padding: 4,
    marginBottom: 8,
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
```

---

# 레퍼런스

## 속성

### `constants`

```tsx
static constants: PlatformConstants;
```

플랫폼과 관련된 모든 사용 가능한 공통 및 특정 상수를 포함하는 객체를 반환합니다.

**속성:**

| <div className="widerColumn">Name</div>                   | Type    | Optional | Description                                                                                                                                                                                       |
| --------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isTesting                                                 | boolean | No       |                                                                                                                                                                                                   |
| reactNativeVersion                                        | object  | No       | React Native 버전에 대한 정보. 키는 `major`, `minor`, `patch`이며 선택적으로 `prerelease`가 있고, 값은 `number`입니다.                                                                   |
| Version <div className="label android">Android</div>      | number  | No       | Android 전용 OS 버전 상수.                                                                                                                                                          |
| Release <div className="label android">Android</div>      | string  | No       |                                                                                                                                                                                                   |
| Serial <div className="label android">Android</div>       | string  | No       | Android 기기의 하드웨어 일련 번호.                                                                                                                                                      |
| Fingerprint <div className="label android">Android</div>  | string  | No       | 빌드를 고유하게 식별하는 문자열.                                                                                                                                                      |
| Model <div className="label android">Android</div>        | string  | No       | 최종 사용자에게 표시되는 Android 기기의 이름.                                                                                                                                                 |
| Brand <div className="label android">Android</div>        | string  | No       | 제품/하드웨어와 연결될 소비자에게 보이는 브랜드.                                                                                                                                    |
| Manufacturer <div className="label android">Android</div> | string  | No       | Android 기기의 제조사.                                                                                                                                                           |
| ServerHost <div className="label android">Android</div>   | string  | Yes      |                                                                                                                                                                                                   |
| uiMode <div className="label android">Android</div>       | string  | No       | 가능한 값: `'car'`, `'desk'`, `'normal'`,`'tv'`, `'watch'`, `'unknown'`. [Android ModeType](https://developer.android.com/reference/android/app/UiModeManager.html)에 대해 자세히 알아보세요. |
| forceTouchAvailable <div className="label ios">iOS</div>  | boolean | No       | 기기에서 3D Touch 사용 가능 여부를 나타냅니다.                                                                                                                                                |
| interfaceIdiom <div className="label ios">iOS</div>       | string  | No       | 기기의 인터페이스 타입. [UIUserInterfaceIdiom](https://developer.apple.com/documentation/uikit/uiuserinterfaceidiom)에 대해 자세히 알아보세요.                                                  |
| osVersion <div className="label ios">iOS</div>            | string  | No       | iOS 전용 OS 버전 상수.                                                                                                                                                              |
| systemName <div className="label ios">iOS</div>           | string  | No       | iOS 전용 OS 이름 상수.                                                                                                                                                                 |

---

### `isPad` <div className="label ios">iOS</div>

```tsx
static isPad: boolean;
```

기기가 iPad인지 정의하는 불리언 값을 반환합니다.

| Type    |
| ------- |
| boolean |

---

### `isTV`

```tsx
static isTV: boolean;
```

기기가 TV인지 정의하는 불리언 값을 반환합니다.

| Type    |
| ------- |
| boolean |

---

### `isVision`

```tsx
static isVision: boolean;
```

기기가 Apple Vision인지 정의하는 불리언 값을 반환합니다. _[Apple Vision Pro (iPad용으로 설계됨)](https://developer.apple.com/documentation/visionos/determining-whether-to-bring-your-app-to-visionos)를 사용하는 경우 `isVision`은 `false`이지만 `isPad`는 `true`입니다._

| Type    |
| ------- |
| boolean |

---

### `isTesting`

```tsx
static isTesting: boolean;
```

애플리케이션이 테스트 플래그가 설정된 개발자 모드에서 실행 중인지 정의하는 불리언 값을 반환합니다.

| Type    |
| ------- |
| boolean |

---

### `OS`

```tsx
static OS: 'android' | 'ios';
```

현재 OS를 나타내는 문자열 값을 반환합니다.

| Type                       |
| -------------------------- |
| enum(`'android'`, `'ios'`) |

---

### `Version`

```tsx
static Version: 'number' | 'string';
```

OS의 버전을 반환합니다.

| Type                                                                                                 |
| ---------------------------------------------------------------------------------------------------- |
| number <div className="label android">Android</div><hr />string <div className="label ios">iOS</div> |

## 메서드

### `select()`

```tsx
static select(config: Record<string, T>): T;
```

현재 실행 중인 플랫폼에 가장 적합한 값을 반환합니다.

#### 매개변수:

| Name   | Type   | Required | Description                   |
| ------ | ------ | -------- | ----------------------------- |
| config | object | Yes      | 아래 config 설명을 참조하세요. |

select 메서드는 현재 실행 중인 플랫폼에 가장 적합한 값을 반환합니다. 즉, 휴대폰에서 실행 중이라면 `android`와 `ios` 키가 우선적으로 적용됩니다. 이 키들이 지정되지 않은 경우 `native` 키가 사용되고, 그 다음 `default` 키가 사용됩니다.

`config` 매개변수는 다음 키를 가진 객체입니다:

- `android` (any)
- `ios` (any)
- `native` (any)
- `default` (any)

**사용 예시:**

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        backgroundColor: 'green',
      },
      ios: {
        backgroundColor: 'red',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

이렇게 하면 컨테이너는 모든 플랫폼에서 `flex: 1`을 가지며, Android에서는 초록색 배경, iOS에서는 빨간색 배경, 다른 플랫폼에서는 파란색 배경을 가집니다.

해당 플랫폼 키의 값은 `any` 타입이 될 수 있으므로, [`select`](platform.md#select) 메서드는 아래와 같이 플랫폼별 컴포넌트를 반환하는 데도 사용할 수 있습니다:

```tsx
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```

```tsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```
