---
id: accessibilityinfo
title: AccessibilityInfo
---

디바이스에 현재 활성화된 스크린 리더가 있는지 알아야 할 때가 있습니다. `AccessibilityInfo` API는 이러한 목적으로 설계되었습니다. 이를 사용하여 스크린 리더의 현재 상태를 조회하거나, 스크린 리더 상태가 변경될 때 알림을 받도록 등록할 수 있습니다.

## 예시

```SnackPlayer name=AccessibilityInfo%20Example&supportedPlatforms=android,ios
import {useState, useEffect} from 'react';
import {AccessibilityInfo, Text, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    const reduceMotionChangedSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      isReduceMotionEnabled => {
        setReduceMotionEnabled(isReduceMotionEnabled);
      },
    );
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      isScreenReaderEnabled => {
        setScreenReaderEnabled(isScreenReaderEnabled);
      },
    );

    AccessibilityInfo.isReduceMotionEnabled().then(isReduceMotionEnabled => {
      setReduceMotionEnabled(isReduceMotionEnabled);
    });
    AccessibilityInfo.isScreenReaderEnabled().then(isScreenReaderEnabled => {
      setScreenReaderEnabled(isScreenReaderEnabled);
    });

    return () => {
      reduceMotionChangedSubscription.remove();
      screenReaderChangedSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.status}>
          The reduce motion is {reduceMotionEnabled ? 'enabled' : 'disabled'}.
        </Text>
        <Text style={styles.status}>
          The screen reader is {screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
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
  status: {
    margin: 30,
  },
});

export default App;
```

---

# 레퍼런스

## 메서드

### `addEventListener()`

```tsx
static addEventListener(
  eventName: AccessibilityChangeEventName | AccessibilityAnnouncementEventName,
  handler: (
    event: AccessibilityChangeEvent | AccessibilityAnnouncementFinishedEvent,
  ) => void,
): EmitterSubscription;
```

이벤트 핸들러를 추가합니다. 지원되는 이벤트:

| 이벤트 이름                                                                               | 설명                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityServiceChanged`<br/><div className="label two-lines android">Android</div> | TalkBack, 다른 Android 보조 기술, 서드파티 접근성 서비스 등이 활성화될 때 발생합니다. 이벤트 핸들러의 인수는 불리언입니다. 일부 접근성 서비스가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.                          |
| `announcementFinished`<br/><div className="label two-lines ios">iOS</div>                | 스크린 리더가 안내를 완료했을 때 발생합니다. 이벤트 핸들러의 인수는 다음 키를 가진 딕셔너리입니다:<ul><li>`announcement`: 스크린 리더가 안내한 문자열.</li><li>`success`: 안내가 성공적으로 이루어졌는지를 나타내는 불리언.</li></ul> |
| `boldTextChanged`<br/><div className="label two-lines ios">iOS</div>                     | 굵은 텍스트 토글 상태가 변경될 때 발생합니다. 이벤트 핸들러의 인수는 불리언입니다. 굵은 텍스트가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.                                                                                                                             |
| `grayscaleChanged`<br/><div className="label two-lines ios">iOS</div>                    | 그레이스케일 토글 상태가 변경될 때 발생합니다. 이벤트 핸들러의 인수는 불리언입니다. 그레이스케일이 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.                                                                                                                         |
| `invertColorsChanged`<br/><div className="label two-lines ios">iOS</div>                 | 색상 반전 토글 상태가 변경될 때 발생합니다. 이벤트 핸들러의 인수는 불리언입니다. 색상 반전이 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.                                                                                                                     |
| `reduceMotionChanged`                                                                    | 동작 줄이기 토글 상태가 변경될 때 발생합니다. 이벤트 핸들러의 인수는 불리언입니다. 동작 줄이기가 활성화되었거나("개발자 옵션"의 "전환 애니메이션 배율"이 "애니메이션 없음"으로 설정된 경우) `true`, 그렇지 않으면 `false`입니다.                                  |
| `reduceTransparencyChanged`<br/><div className="label two-lines ios">iOS</div>           | 투명도 줄이기 토글 상태가 변경될 때 발생합니다. 이벤트 핸들러의 인수는 불리언입니다. 투명도 줄이기가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.                                                                                                                         |
| `screenReaderChanged`                                                                    | 스크린 리더 상태가 변경될 때 발생합니다. 이벤트 핸들러의 인수는 불리언입니다. 스크린 리더가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.                                                                                                                          |

---

### `announceForAccessibility()`

```tsx
static announceForAccessibility(announcement: string);
```

스크린 리더가 읽을 문자열을 게시합니다.

---

### `announceForAccessibilityWithOptions()`

```tsx
static announceForAccessibilityWithOptions(
  announcement: string,
  options: {queue?: boolean},
);
```

수정 옵션을 사용하여 스크린 리더가 읽을 문자열을 게시합니다. 기본적으로 안내는 기존 음성을 중단하지만, iOS에서는 옵션 객체의 `queue`를 `true`로 설정하면 기존 음성 뒤에 대기시킬 수 있습니다.

**파라미터:**

| 이름                                                              | 타입   | 설명                                                                                  |
| ----------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| announcement <div className="label basic required">Required</div> | string | 안내할 문자열                                                                   |
| options <div className="label basic required">Required</div>      | object | `queue` - 기존 음성 뒤에 안내를 대기시킴 <div className="label ios">iOS</div> |

---

### `getRecommendedTimeoutMillis()` <div className="label android">Android</div>

```tsx
static getRecommendedTimeoutMillis(originalTimeout: number): Promise<number>;
```

사용자에게 필요한 타임아웃(밀리초)을 가져옵니다.
이 값은 "접근성" 설정의 "작업 수행 시간(접근성 타임아웃)"에서 설정됩니다.

**파라미터:**

| 이름                                                                 | 타입   | 설명                                                                           |
| -------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| originalTimeout <div className="label basic required">Required</div> | number | "접근성 타임아웃"이 설정되지 않은 경우 반환할 타임아웃입니다. 밀리초 단위로 지정하세요. |

---

### `isAccessibilityServiceEnabled()` <div className="label android">Android</div>

```tsx
static isAccessibilityServiceEnabled(): Promise<boolean>;
```

접근성 서비스가 활성화되어 있는지 확인합니다. 여기에는 TalkBack뿐만 아니라 설치된 서드파티 접근성 앱도 포함됩니다. TalkBack만 활성화 여부를 확인하려면 [isScreenReaderEnabled](#isscreenreaderenabled)를 사용하세요. 불리언으로 resolve되는 Promise를 반환합니다. 일부 접근성 서비스가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

:::note
TalkBack 상태만 확인하려면 [`isScreenReaderEnabled`](#isscreenreaderenabled)를 사용하세요.
:::

---

### `isBoldTextEnabled()` <div className="label ios">iOS</div>

```tsx
static isBoldTextEnabled(): Promise<boolean>:
```

현재 굵은 텍스트가 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 굵은 텍스트가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### `isGrayscaleEnabled()` <div className="label ios">iOS</div>

```tsx
static isGrayscaleEnabled(): Promise<boolean>;
```

현재 그레이스케일이 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 그레이스케일이 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### `isInvertColorsEnabled()` <div className="label ios">iOS</div>

```tsx
static isInvertColorsEnabled(): Promise<boolean>;
```

현재 색상 반전이 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 색상 반전이 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### `isReduceMotionEnabled()`

```tsx
static isReduceMotionEnabled(): Promise<boolean>;
```

현재 동작 줄이기가 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 동작 줄이기가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### `isReduceTransparencyEnabled()` <div className="label ios">iOS</div>

```tsx
static isReduceTransparencyEnabled(): Promise<boolean>;
```

현재 투명도 줄이기가 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 투명도 줄이기가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### `isScreenReaderEnabled()`

```tsx
static isScreenReaderEnabled(): Promise<boolean>;
```

현재 스크린 리더가 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 스크린 리더가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### `isHighTextContrastEnabled()` <div className="label android">Android</div>

```tsx
static isHighTextContrastEnabled(): Promise<boolean>
```

현재 높은 텍스트 대비가 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 높은 텍스트 대비가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### `isDarkerSystemColorsEnabled()` <div className="label ios">iOS</div>

```tsx
static isDarkerSystemColorsEnabled(): Promise<boolean>
```

현재 어두운 시스템 색상이 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 어두운 시스템 색상이 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### `prefersCrossFadeTransitions()` <div className="label ios">iOS</div>

```tsx
static prefersCrossFadeTransitions(): Promise<boolean>;
```

동작 줄이기 및 크로스페이드 전환 선호 설정이 현재 활성화되어 있는지 조회합니다. 불리언으로 resolve되는 Promise를 반환합니다. 크로스페이드 전환 선호가 활성화된 경우 `true`, 그렇지 않으면 `false`입니다.

---

### 🗑️ `setAccessibilityFocus()`

:::warning Deprecated
대신 `eventType`을 `focus`로 설정한 `sendAccessibilityEvent`를 사용하세요.
:::

```tsx
static setAccessibilityFocus(reactTag: number);
```

React 컴포넌트에 접근성 포커스를 설정합니다.

Android에서는 전달된 `reactTag`와 `UIManager.AccessibilityEventTypes.typeViewFocused` 인수로 `UIManager.sendAccessibilityEvent` 메서드를 호출합니다.

:::note
접근성 포커스를 받으려는 `View`에는 반드시 `accessible={true}`가 설정되어 있어야 합니다.
:::

---

### `sendAccessibilityEvent()`

```tsx
static sendAccessibilityEvent(host: HostInstance, eventType: AccessibilityEventTypes);
```

스크린 리더의 포커스 요소 변경과 같이 React 컴포넌트에서 접근성 이벤트를 명령적으로 트리거합니다.

:::note
접근성 포커스를 받으려는 `View`에는 반드시 `accessible={true}`가 설정되어 있어야 합니다.
:::

| 이름                                                           | 타입                    | 설명                                                                                                            |
| -------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| host <div className="label basic required">Required</div>      | HostInstance            | 이벤트를 전송할 컴포넌트 ref입니다.                                                                                |
| eventType <div className="label basic required">Required</div> | AccessibilityEventTypes | `'click'`(Android 전용), `'focus'`, `'viewHoverEnter'`(Android 전용), `'windowStateChange'`(Android 전용) 중 하나입니다. |
