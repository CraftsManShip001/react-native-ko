---
id: i18nmanager
title: I18nManager
---

# I18nManager

`I18nManager` 모듈은 아랍어, 히브리어 등의 언어에 대한 RTL(오른쪽에서 왼쪽) 레이아웃 지원을 관리하기 위한 유틸리티를 제공합니다. RTL 동작을 제어하고 현재 레이아웃 방향을 확인하는 메서드를 제공합니다.

## 예시

### RTL에 따라 위치 및 애니메이션 변경

flexbox 요소에 맞게 요소를 절대 위치로 배치하면 RTL 언어에서 정렬이 맞지 않을 수 있습니다. `isRTL`을 사용하여 정렬이나 애니메이션을 조정할 수 있습니다.

```SnackPlayer name=I18nManager%20Change%20Absolute%20Positions%20And%20Animations
import {I18nManager, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  // Change to `true` to see the effect in a non-RTL language
  const isRTL = I18nManager.isRTL;
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View
          style={{
            position: 'absolute',
            left: isRTL ? undefined : 0,
            right: isRTL ? 0 : undefined,
          }}>
          {isRTL ? <Text>Back &gt;</Text> : <Text>&lt; Back</Text>}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

### 개발 중

```SnackPlayer name=I18nManager%20During%20Development
import {useState} from 'react';
import {Alert, I18nManager, StyleSheet, Switch, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [rtl, setRTL] = useState(I18nManager.isRTL);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.forceRtl}>
            <Text>Force RTL in Development:</Text>
            <Switch
              value={rtl}
              onValueChange={value => {
                setRTL(value);
                I18nManager.forceRTL(value);
                Alert.alert(
                  'Reload this page',
                  'Please reload this page to change the UI direction! ' +
                    'All examples in this app will be affected. ' +
                    'Check them out to see what they look like in RTL layout.',
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  forceRtl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
```

# 레퍼런스

## 속성

### `isRTL`

```typescript
static isRTL: boolean;
```

앱이 현재 RTL 레이아웃 모드인지 여부를 나타내는 불리언 값입니다.

`isRTL`의 값은 다음 로직에 의해 결정됩니다.

- `forceRTL`이 `true`이면 `isRTL`은 `true`를 반환합니다.
- `allowRTL`이 `false`이면 `isRTL`은 `false`를 반환합니다.
- 그렇지 않으면, 다음 조건을 만족할 때 `isRTL`은 `true`가 됩니다.
  - **iOS:**
    - 기기의 사용자 선호 언어가 RTL 언어인 경우
    - 애플리케이션에 정의된 현지화에 사용자가 선택한 언어가 포함된 경우(Xcode 프로젝트 파일의 `knownRegions = (...)`에 정의된 대로)
  - **Android:**
    - 기기의 사용자 선호 언어가 RTL 언어인 경우
    - 애플리케이션의 `AndroidManifest.xml`에서 `<application>` 요소에 `android:supportsRTL="true"`가 정의된 경우

### `doLeftAndRightSwapInRTL`

```typescript
static doLeftAndRightSwapInRTL: boolean;
```

RTL 모드에서 left 및 right 스타일 속성이 자동으로 교체되어야 하는지 여부를 나타내는 불리언 값입니다. 활성화하면 RTL 레이아웃에서 left가 right가 되고 right가 left가 됩니다.

## 메서드

### `allowRTL()`

```typescript
static allowRTL: (allowRTL: boolean) => void;
```

애플리케이션에 대한 RTL 레이아웃 지원을 활성화하거나 비활성화합니다.

**파라미터:**

- `allowRTL` (boolean): RTL 레이아웃 허용 여부

**중요 사항:**

- 변경 사항은 즉시 적용되지 않고 다음 애플리케이션 시작 시 적용됩니다.
- 이 설정은 앱 재시작 시에도 유지됩니다.

### `forceRTL()`

```typescript
static forceRTL: (forced: boolean) => void;
```

기기 언어 설정에 관계없이 앱이 RTL 레이아웃을 사용하도록 강제합니다. 이는 주로 개발 중 RTL 레이아웃을 테스트하는 데 유용합니다.

프로덕션 앱에서 RTL을 강제하는 것은 피하세요. 적용되려면 앱을 완전히 재시작해야 하므로 사용자 경험이 좋지 않습니다.

**파라미터:**

- `forced` (boolean): RTL 레이아웃 강제 여부

**중요 사항:**

- 변경 사항은 즉시 적용되지 않고 다음 애플리케이션 시작 시 완전히 적용됩니다.
- 이 설정은 앱 재시작 시에도 유지됩니다.
- 개발 및 테스트 목적으로만 사용하세요. 프로덕션에서는 RTL을 완전히 비허용하거나 적절히 처리해야 합니다(`isRTL` 참조).

### `swapLeftAndRightInRTL()`

```typescript
static swapLeftAndRightInRTL: (swapLeftAndRight: boolean) => void;
```

RTL 모드에서 left와 right 스타일 속성을 교체합니다. 활성화하면 RTL 레이아웃에서 left가 right가 되고 right가 left가 됩니다. `isRTL`의 값에는 영향을 주지 않습니다.
