---
id: appstate
title: AppState
---

`AppState`는 앱이 포그라운드에 있는지 백그라운드에 있는지 알려주고, 상태가 변경될 때 알림을 받을 수 있습니다.

AppState는 푸시 알림을 처리할 때 의도와 적절한 동작을 결정하는 데 자주 사용됩니다.

### 앱 상태

- `active` - 앱이 포그라운드에서 실행 중입니다.
- `background` - 앱이 백그라운드에서 실행 중입니다. 사용자가 다음 중 하나에 있는 상태입니다:
  - 다른 앱
  - 홈 화면
  - [Android] 자동완성 자격 증명 선택기 같은 임시 시스템 액티비티를 포함한 다른 `Activity`(앱 또는 시스템에 의해 실행된 경우 포함)
- [iOS] `inactive` - 포그라운드와 백그라운드 사이를 전환하거나, 멀티태스킹 뷰 진입, 알림 센터 열기, 전화 수신과 같은 비활성 상태에서 발생하는 상태입니다.

자세한 내용은 [Apple 공식 문서](https://developer.apple.com/documentation/uikit/app_and_scenes/managing_your_app_s_life_cycle)를 참고하세요.

## 기본 사용법

현재 상태를 확인하려면 `AppState.currentState`를 사용하세요. 이 값은 최신 상태로 유지됩니다.

:::info
레거시 아키텍처를 사용하는 경우, `currentState`는 네이티브 측에서 비동기적으로 값을 받아올 때까지 초기에 `null`일 수 있습니다.
:::

```SnackPlayer name=AppState%20Example
import {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const AppStateExample = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Current state is: {appStateVisible}</Text>
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
});

export default AppStateExample;
```

이 예제는 앱이 `active` 상태일 때만 사용자에게 표시되므로, 항상 "Current state is: active"만 표시됩니다. 코드를 직접 실험해보려면 내장 미리보기 대신 실제 기기를 사용하는 것을 권장합니다.

---

# 레퍼런스

## 이벤트

### `change`

앱 상태가 변경되면 수신되는 이벤트입니다. 리스너는 [현재 앱 상태 값](appstate#앱-상태) 중 하나를 인수로 받아 호출됩니다.

### `memoryWarning` <div className="label ios">iOS</div>

운영 체제로부터 앱이 메모리 경고를 받을 때 발생합니다.

### `focus` <div className="label android">Android</div>

앱이 포커스를 얻을 때(사용자가 앱과 상호작용 중일 때) 수신됩니다.

### `blur` <div className="label android">Android</div>

사용자가 앱과 활발히 상호작용하지 않을 때 수신됩니다. 사용자가 [알림 서랍](https://developer.android.com/guide/topics/ui/notifiers/notifications#bar-and-drawer)을 내리는 상황에서 유용합니다. `AppState`는 변경되지 않지만 `blur` 이벤트가 발생합니다.

## 메서드

### `addEventListener()`

```tsx
static addEventListener(
  type: AppStateEvent,
  listener: (state: AppStateStatus) => void,
): NativeEventSubscription;
```

AppState에서 지정된 이벤트 타입이 발생할 때마다 호출될 함수를 등록합니다. 유효한 `eventType` 값은 [위의 이벤트 목록](#이벤트)을 참고하세요. `EventSubscription`을 반환합니다.

## 프로퍼티

### `currentState`

```tsx
static currentState: AppStateStatus;
```
