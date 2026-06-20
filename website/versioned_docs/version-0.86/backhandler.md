---
id: backhandler
title: BackHandler
---

BackHandler API는 뒤로 탐색을 위한 하드웨어 버튼 누름을 감지하고, 시스템의 뒤로 가기 동작에 대한 이벤트 리스너를 등록하며, 애플리케이션이 어떻게 반응할지 제어할 수 있게 해줍니다. Android 전용입니다.

이벤트 구독은 역순으로 호출됩니다(즉, 마지막으로 등록된 구독이 가장 먼저 호출됩니다).

- **구독 중 하나가 true를 반환하면,** 이전에 등록된 구독은 호출되지 않습니다.
- **true를 반환하는 구독이 없거나 등록된 구독이 없으면,** 기본 뒤로 가기 버튼 동작(앱 종료)을 프로그래밍 방식으로 실행합니다.

:::warning Modal 사용자를 위한 경고
앱에 열린 `Modal`이 표시되는 경우, `BackHandler`는 어떠한 이벤트도 발행하지 않습니다([`Modal` 문서](modal#onrequestclose) 참고).
:::

## 패턴

```tsx
const subscription = BackHandler.addEventListener(
  'hardwareBackPress',
  function () {
    /**
     * this.onMainScreen and this.goBack are just examples,
     * you need to use your own implementation here.
     *
     * Typically you would use the navigator here to go to the last state.
     */

    if (!this.onMainScreen()) {
      this.goBack();
      /**
       * When true is returned the event will not be bubbled up
       * & no other back action will execute
       */
      return true;
    }
    /**
     * Returning false will let the event to bubble up & let other event listeners
     * or the system's default back action to be executed.
     */
    return false;
  },
);

// Unsubscribe the listener on unmount
subscription.remove();
```

## 예제

다음 예제는 사용자가 앱을 종료할 것인지 확인하는 시나리오를 구현합니다:

```SnackPlayer name=BackHandler&supportedPlatforms=android
import {useEffect} from 'react';
import {Text, StyleSheet, BackHandler, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Click Back button!</Text>
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
```

`BackHandler.addEventListener`는 이벤트 리스너를 생성하고 `NativeEventSubscription` 객체를 반환합니다. 이 객체는 `NativeEventSubscription.remove` 메서드를 사용하여 해제해야 합니다.

## React Navigation과 함께 사용하기

React Navigation을 사용하여 다양한 화면을 탐색하는 경우, [커스텀 Android 뒤로 가기 버튼 동작](https://reactnavigation.org/docs/custom-android-back-button-handling/)에 관한 가이드를 참고하세요.

## BackHandler 훅

[React Native Hooks](https://github.com/react-native-community/hooks#usebackhandler)에는 이벤트 리스너 설정 과정을 단순화해주는 편리한 `useBackHandler` 훅이 있습니다.

---

# 레퍼런스

## 메서드

### `addEventListener()`

```tsx
static addEventListener(
  eventName: BackPressEventName,
  handler: () => boolean | null | undefined,
): NativeEventSubscription;
```

---

### `exitApp()`

```tsx
static exitApp();
```
