---
id: strict-typescript-api
title: Strict TypeScript API (선택적 적용)
---

import RNRepoLink from '@site/core/RNRepoLink';

Strict TypeScript API는 React Native의 미래 안정적인 JavaScript API에 대한 미리보기입니다.

구체적으로, 이는 0.80 버전부터 사용할 수 있는 `react-native` npm 패키지의 새로운 TypeScript 타입 세트입니다. 더 강력하고 미래 호환성이 높은 타입 정확도를 제공하며, React Native의 API를 안정적인 형태로 자신 있게 발전시킬 수 있게 해줍니다. Strict TypeScript API를 적용하면 일부 구조적인 타입 차이가 발생하므로, 한 번의 파괴적 변경(breaking change)이 수반됩니다.

새로운 타입의 특징은 다음과 같습니다:

1. **소스 코드에서 직접 생성됨** — 커버리지와 정확도가 향상되어 더 강력한 호환성 보장을 기대할 수 있습니다.
2. **`react-native`의 index 파일로 제한됨** — 공개 API를 더 엄격하게 정의하여, 내부 파일을 변경할 때 API가 손상되지 않습니다.

커뮤니티가 준비되면, Strict TypeScript API는 향후 기본 API가 될 예정입니다 — 딥 임포트 제거와 함께 동기화됩니다.

## 적용 방법

새로운 타입을 기존 타입과 함께 제공하므로, 준비가 되면 마이그레이션을 선택할 수 있습니다. 얼리 어답터와 새로 만들어지는 앱은 `tsconfig.json` 파일을 통해 적용하도록 권장합니다.

적용하는 것은 **파괴적 변경**이며, 일부 새로운 타입의 이름과 형태가 업데이트되었습니다. 다만 많은 앱에는 영향이 없을 수 있습니다. 각 파괴적 변경은 다음 섹션에서 확인할 수 있습니다.

```json title="tsconfig.json"
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    ...
    "customConditions": ["react-native-strict-api"]
  }
}
```

:::note[내부 동작]

이 설정은 TypeScript가 `react-native` 타입을 기존의 [`types/`](https://www.npmjs.com/package/react-native?activeTab=code) 디렉토리(수동 유지 관리) 대신 새로운 [`types_generated/`](https://www.npmjs.com/package/react-native?activeTab=code) 디렉토리에서 resolve하도록 지시합니다. TypeScript나 편집기를 재시작할 필요가 없습니다.

:::

Strict TypeScript API는 React Native에서 딥 임포트를 제거하는 [RFC](https://github.com/react-native-community/discussions-and-proposals/pull/894)를 따릅니다. 따라서 일부 API는 루트에서 더 이상 export되지 않습니다. 이는 React Native API의 전체 표면 영역을 줄이기 위한 의도적인 결정입니다.

:::tip[API 피드백]

**피드백 전달**: 앞으로 최소 두 번의 React Native 릴리스에 걸쳐 커뮤니티와 함께 export할 API를 확정할 예정입니다. [피드백 스레드](https://github.com/react-native-community/discussions-and-proposals/discussions/893)에서 의견을 공유해 주세요.

동기와 일정에 대한 자세한 내용은 [공지 블로그 포스트](https://reactnative.dev/blog/2025/06/12/moving-towards-a-stable-javascript-api)를 참조하세요.

:::

## 마이그레이션 가이드

### Codegen 타입은 이제 `react-native` 패키지에서 임포트해야 합니다

`Int32`, `Double`, `WithDefault` 등 codegen에 사용되는 타입은 이제 단일 `CodegenTypes` 네임스페이스 아래에서 사용할 수 있습니다. 마찬가지로, `codegenNativeComponent`와 `codegenNativeCommands`도 딥 임포트 대신 react-native 패키지에서 임포트할 수 있습니다.

네임스페이스화된 `CodegenTypes`와 `codegenNativeCommands`, `codegenNativeComponent`는 Strict API가 활성화되지 않은 경우에도 `react-native` 패키지에서 사용할 수 있어, 서드파티 라이브러리의 적용을 쉽게 합니다.

**변경 전**

```ts title=""
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {
  Int32,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';

interface NativeProps extends ViewProps {
  enabled?: WithDefault<boolean, true>;
  size?: Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

**변경 후**

```ts title=""
import {CodegenTypes, codegenNativeComponent} from 'react-native';

interface NativeProps extends ViewProps {
  enabled?: CodegenTypes.WithDefault<boolean, true>;
  size?: CodegenTypes.Int32;
}

export default codegenNativeComponent<NativeProps>(
  'RNCustomComponent',
);
```

### `*Static` 타입 제거

**변경 전**

```tsx title=""
import {Linking, LinkingStatic} from 'react-native';

function foo(linking: LinkingStatic) {}
foo(Linking);
```

**변경 후**

```tsx title=""
import {Linking} from 'react-native';

function foo(linking: Linking) {}
foo(Linking);
```

다음 API들은 이전에 `*Static` 이름의 타입과 해당 타입의 변수 선언으로 구성되어 있었습니다. 대부분의 경우 값과 타입이 동일한 식별자로 export되는 별칭이 있었지만, 일부는 누락되어 있었습니다.

(예를 들어, `AlertStatic` 타입과 `AlertStatic` 타입의 `Alert` 변수, 그리고 `AlertStatic`의 별칭인 `Alert` 타입이 있었습니다. 하지만 `PixelRatio`의 경우 `PixelRatioStatic` 타입과 해당 타입의 `PixelRatio` 변수만 있었고 추가적인 타입 별칭은 없었습니다.)

**영향받는 API**

- `AlertStatic`
- `ActionSheetIOSStatic`
- `ToastAndroidStatic`
- `InteractionManagerStatic` (이 경우 관련 `InteractionManager` 타입 별칭이 없었음)
- `UIManagerStatic`
- `PlatformStatic`
- `SectionListStatic`
- `PixelRatioStatic` (이 경우 관련 `PixelRatio` 타입 별칭이 없었음)
- `AppStateStatic`
- `AccessibilityInfoStatic`
- `ImageResizeModeStatic`
- `BackHandlerStatic`
- `DevMenuStatic` (이 경우 관련 `DevMenu` 타입 별칭이 없었음)
- `ClipboardStatic`
- `PermissionsAndroidStatic`
- `ShareStatic`
- `DeviceEventEmitterStatic`
- `LayoutAnimationStatic`
- `KeyboardStatic` (이 경우 관련 `Keyboard` 타입 별칭이 없었음)
- `DevSettingsStatic` (이 경우 관련 `DevSettings` 타입 별칭이 없었음)
- `I18nManagerStatic`
- `EasingStatic`
- `PanResponderStatic`
- `NativeModulesStatic` (이 경우 관련 `NativeModules` 타입 별칭이 없었음)
- `LogBoxStatic`
- `PushNotificationIOSStatic`
- `SettingsStatic`
- `VibrationStatic`

### 일부 핵심 컴포넌트가 클래스 컴포넌트 대신 함수 컴포넌트로 변경됨

- `View`
- `Image`
- `TextInput`
- `Modal`
- `Text`
- `TouchableWithoutFeedback`
- `Switch`
- `ActivityIndicator`
- `ProgressBarAndroid`
- `InputAccessoryView`
- `Button`
- `SafeAreaView`

이 변경으로 인해, 이러한 뷰의 ref 타입에 접근하려면 클래스 컴포넌트와 함수 컴포넌트 모두에서 예상대로 동작하는 `React.ComponentRef<typeof View>` 패턴을 사용해야 합니다. 예:

```ts title=""
const ref = useRef<React.ComponentRef<typeof View>>(null);
```

## 기타 파괴적 변경

### Animated 타입 변경

Animated 노드는 이전에 보간 출력에 기반한 제네릭 타입이었습니다. 이제는 제네릭 `interpolate` 메서드를 가진 비제네릭 타입으로 변경되었습니다.

`Animated.LegacyRef`는 더 이상 사용할 수 없습니다.

### 선택적 props의 타입 통일

새로운 타입에서는 모든 선택적 prop이 `type | undefined`로 타입 지정됩니다.

### 일부 deprecated 타입 제거

<RNRepoLink href="/packages/react-native/types/public/DeprecatedPropertiesAlias.d.ts">`DeprecatedPropertiesAlias.d.ts`</RNRepoLink>에 나열된 모든 타입은 Strict API에서 접근할 수 없습니다.

### 남아있던 컴포넌트 props 제거

타입 정의에 정의되어 있었지만 컴포넌트에서 사용되지 않거나 정의가 없었던 일부 속성이 제거되었습니다(예: `Text`의 `lineBreakMode`, `ScrollView`의 `scrollWithoutAnimationTo`, transform 배열 외부에 정의된 transform 스타일).

### 이전에 접근 가능했던 private 타입 헬퍼가 제거될 수 있음

이전 타입 정의의 설정으로 인해, 정의된 모든 타입이 `react-native` 패키지에서 접근 가능했습니다. 여기에는 명시적으로 export되지 않은 타입과 내부적으로만 사용하도록 의도된 헬퍼 타입이 포함되었습니다.

대표적인 예로 StyleSheet 관련 타입(`RecursiveArray`, `RegisteredStyle`, `Falsy` 등)과 Animated 관련 타입(`WithAnimatedArray`, `WithAnimatedObject` 등)이 있습니다.
