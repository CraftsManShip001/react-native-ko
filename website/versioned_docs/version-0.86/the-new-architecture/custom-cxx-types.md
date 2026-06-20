import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# 고급: 커스텀 C++ 타입

:::note
이 가이드는 [**Pure C++ Turbo Native Modules**](pure-cxx-modules.md) 가이드에 익숙하다고 가정합니다. 이 가이드는 그 내용을 기반으로 합니다.
:::

C++ Turbo Native Modules는 대부분의 `std::` 표준 타입에 대한 [브리징 기능](https://github.com/facebook/react-native/tree/main/packages/react-native/ReactCommon/react/bridging)을 지원합니다. 추가 코드 없이 모듈에서 대부분의 타입을 사용할 수 있습니다.

앱이나 라이브러리에서 새로운 커스텀 타입을 지원하려면 필요한 `bridging` 헤더 파일을 제공해야 합니다.

## 새로운 커스텀 타입 추가: Int64

C++ Turbo Native Modules는 아직 `int64_t` 숫자를 지원하지 않습니다. JavaScript가 2^53보다 큰 숫자를 지원하지 않기 때문입니다. 2^53보다 큰 숫자를 표현하려면 JS에서 `string` 타입을 사용하고, C++에서 자동으로 `int64_t`로 변환하면 됩니다.

### 1. 브리징 헤더 파일 생성

새로운 커스텀 타입을 지원하는 첫 번째 단계는, 타입을 JS 표현에서 C++ 표현으로, 그리고 C++ 표현에서 JS 표현으로 변환하는 브리징 헤더를 정의하는 것입니다.

1. `shared` 폴더에 `Int64.h`라는 새 파일을 추가합니다.
2. 해당 파일에 다음 코드를 추가합니다:

```cpp title="Int64.h"
#pragma once

#include <react/bridging/Bridging.h>

namespace facebook::react {

template <>
struct Bridging<int64_t> {
  // Converts from the JS representation to the C++ representation
  static int64_t fromJs(jsi::Runtime &rt, const jsi::String &value) {
    try {
      size_t pos;
      auto str = value.utf8(rt);
      auto num = std::stoll(str, &pos);
      if (pos != str.size()) {
        throw std::invalid_argument("Invalid number"); // don't support alphanumeric strings
      }
      return num;
    } catch (const std::logic_error &e) {
      throw jsi::JSError(rt, e.what());
    }
  }

  // Converts from the C++ representation to the JS representation
  static jsi::String toJs(jsi::Runtime &rt, int64_t value) {
    return bridging::toJs(rt, std::to_string(value));
  }
};

}
```

커스텀 브리징 헤더의 핵심 구성 요소는 다음과 같습니다:

- 커스텀 타입에 대한 `Bridging` 구조체의 명시적 특수화. 이 경우 템플릿은 `int64_t` 타입을 지정합니다.
- JS 표현에서 C++ 표현으로 변환하는 `fromJs` 함수
- C++ 표현에서 JS 표현으로 변환하는 `toJs` 함수

:::note
iOS에서는 `Int64.h` 파일을 Xcode 프로젝트에 추가하는 것을 잊지 마세요.
:::

### 2. JS 스펙 수정

이제 새로운 타입을 사용하는 메서드를 추가하도록 JS 스펙을 수정할 수 있습니다. 평소처럼 Flow 또는 TypeScript를 사용하여 스펙을 작성할 수 있습니다.

1. `specs/NativeSampleTurbomodule`을 엽니다.
2. 다음과 같이 스펙을 수정합니다:

<Tabs groupId="custom-int64" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```diff title="NativeSampleModule.ts"
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
+  readonly cubicRoot: (input: string) => number;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
<TabItem value="flow">

```diff title="NativeSampleModule.js"
// @flow
import type {TurboModule} from 'react-native';
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
+  +cubicRoot: (input: string) => number;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
</Tabs>

이 파일에서 C++로 구현해야 할 함수를 정의합니다.

### 3. 네이티브 코드 구현

이제 JS 스펙에서 선언한 함수를 구현해야 합니다.

1. `specs/NativeSampleModule.h` 파일을 열고 다음 변경 사항을 적용합니다:

```diff title="NativeSampleModule.h"
#pragma once

#include <AppSpecsJSI.h>
#include <memory>
#include <string>

+ #include "Int64.h"

namespace facebook::react {

class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);
+ int32_t cubicRoot(jsi::Runtime& rt, int64_t input);
};

} // namespace facebook::react

```

2. `specs/NativeSampleModule.cpp` 파일을 열고 새 함수를 구현합니다:

```diff title="NativeSampleModule.cpp"
#include "NativeSampleModule.h"
+ #include <cmath>

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

+int32_t NativeSampleModule::cubicRoot(jsi::Runtime& rt, int64_t input) {
+    return std::cbrt(input);
+}

} // namespace facebook::react
```

이 구현은 수학 연산을 수행하기 위해 `<cmath>` C++ 라이브러리를 가져온 다음, `<cmath>` 모듈의 `cbrt` 기본 함수를 사용하여 `cubicRoot` 함수를 구현합니다.

### 4. 앱에서 코드 테스트

이제 앱에서 코드를 테스트할 수 있습니다.

먼저 TurboModule의 새 메서드를 사용하도록 `App.tsx` 파일을 업데이트해야 합니다. 그런 다음 Android와 iOS에서 앱을 빌드할 수 있습니다.

1. `App.tsx` 코드를 열고 다음 변경 사항을 적용합니다:

```diff title="App.tsx"
// ...
+ const [cubicSource, setCubicSource] = useState('')
+ const [cubicRoot, setCubicRoot] = useState(0)
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          Welcome to C++ Turbo Native Module Example
        </Text>
        <Text>Write down here the text you want to revert</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your text here"
          onChangeText={setValue}
          value={value}
        />
        <Button title="Reverse" onPress={onPress} />
        <Text>Reversed text: {reversedValue}</Text>
+        <Text>For which number do you want to compute the Cubic Root?</Text>
+        <TextInput
+          style={styles.textInput}
+          placeholder="Write your text here"
+          onChangeText={setCubicSource}
+          value={cubicSource}
+        />
+        <Button title="Get Cubic Root" onPress={() => setCubicRoot(SampleTurboModule.cubicRoot(cubicSource))} />
+        <Text>The cubic root is: {cubicRoot}</Text>
      </View>
    </SafeAreaView>
  );
}
//...
```

2. Android에서 앱을 테스트하려면 프로젝트 루트 폴더에서 `yarn android`를 실행합니다.
3. iOS에서 앱을 테스트하려면 프로젝트 루트 폴더에서 `yarn ios`를 실행합니다.

## 새로운 구조화된 커스텀 타입 추가: Address

위의 접근 방식은 모든 종류의 타입에 일반화할 수 있습니다. 구조화된 타입의 경우 React Native는 JS와 C++ 간에 더 쉽게 브리징할 수 있는 몇 가지 헬퍼 함수를 제공합니다.

다음 속성을 가진 커스텀 `Address` 타입을 브리징하고 싶다고 가정해 보겠습니다:

```ts
interface Address {
  street: string;
  num: number;
  isInUS: boolean;
}
```

### 1. 스펙에서 타입 정의

첫 번째 단계로, Codegen이 모든 지원 코드를 출력할 수 있도록 JS 스펙에서 새로운 커스텀 타입을 정의합니다. 이렇게 하면 코드를 수동으로 작성할 필요가 없습니다.

1. `specs/NativeSampleModule` 파일을 열고 다음 변경 사항을 추가합니다.

<Tabs groupId="custom-int64" queryString defaultValue={constants.defaultJavaScriptSpecLanguages} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```diff title="NativeSampleModule (Add Address type and validateAddress function)"
import {TurboModule, TurboModuleRegistry} from 'react-native';

+export type Address = {
+  street: string,
+  num: number,
+  isInUS: boolean,
+};

export interface Spec extends TurboModule {
  readonly reverseString: (input: string) => string;
+ readonly validateAddress: (input: Address) => boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeSampleModule',
);
```

</TabItem>
<TabItem value="flow">

```diff title="NativeSampleModule (Add Address type and validateAddress function)"

// @flow
import type {TurboModule} from 'react-native';
import { TurboModuleRegistry } from "react-native";

+export type Address = {
+  street: string,
+  num: number,
+  isInUS: boolean,
+};


export interface Spec extends TurboModule {
  +reverseString: (input: string) => string;
+ +validateAddress: (input: Address) => boolean;
}

export default (TurboModuleRegistry.getEnforcing<Spec>(
  "NativeSampleModule"
): Spec);
```

</TabItem>
</Tabs>

이 코드는 새로운 `Address` 타입을 정의하고 Turbo Native Module에 새로운 `validateAddress` 함수를 정의합니다. `validateFunction`은 `Address` 객체를 매개변수로 요구한다는 점에 주목하세요.

커스텀 타입을 반환하는 함수를 정의하는 것도 가능합니다.

### 2. 브리징 코드 정의

스펙에서 정의한 `Address` 타입으로부터 Codegen은 두 가지 헬퍼 타입을 생성합니다: `NativeSampleModuleAddress`와 `NativeSampleModuleAddressBridging`.

첫 번째 타입은 `Address`의 정의입니다. 두 번째 타입은 커스텀 타입을 JS와 C++ 간에 브리징하는 모든 인프라를 포함합니다. 추가로 해야 할 유일한 단계는 `NativeSampleModuleAddressBridging` 타입을 확장하는 `Bridging` 구조체를 정의하는 것입니다.

1. `shared/NativeSampleModule.h` 파일을 엽니다.
2. 파일에 다음 코드를 추가합니다:

```diff title="NativeSampleModule.h (Bridging the Address type)"
#include "Int64.h"
#include <memory>
#include <string>

namespace facebook::react {
+  using Address = NativeSampleModuleAddress<std::string, int32_t, bool>;

+  template <>
+  struct Bridging<Address>
+      : NativeSampleModuleAddressBridging<Address> {};
  // ...
}
```

이 코드는 제네릭 타입 `NativeSampleModuleAddress`에 대한 `Address` 타입 별칭을 정의합니다. **제네릭의 순서가 중요합니다**: 첫 번째 템플릿 인수는 구조체의 첫 번째 데이터 타입을 참조하고, 두 번째는 두 번째를 참조하는 식입니다.

그런 다음 코드는 Codegen이 생성한 `NativeSampleModuleAddressBridging`을 확장하여 새로운 `Address` 타입에 대한 `Bridging` 특수화를 추가합니다.

:::note
이 타입들을 생성하는 데는 다음과 같은 컨벤션이 따릅니다:

- 이름의 첫 번째 부분은 항상 모듈의 타입입니다. 이 예시에서는 `NativeSampleModule`입니다.
- 이름의 두 번째 부분은 항상 스펙에서 정의된 JS 타입의 이름입니다. 이 예시에서는 `Address`입니다.
  :::

### 3. 네이티브 코드 구현

이제 C++에서 `validateAddress` 함수를 구현해야 합니다. 먼저 `.h` 파일에 함수 선언을 추가하고, 그런 다음 `.cpp` 파일에서 구현할 수 있습니다.

1. `shared/NativeSampleModule.h` 파일을 열고 함수 정의를 추가합니다.

```diff title="NativeSampleModule.h (validateAddress function prototype)"
  std::string reverseString(jsi::Runtime& rt, std::string input);

+  bool validateAddress(jsi::Runtime &rt, jsi::Object input);
};

} // namespace facebook::react
```

2. `shared/NativeSampleModule.cpp` 파일을 열고 함수 구현을 추가합니다.

```cpp title="NativeSampleModule.cpp (validateAddress implementation)"
bool NativeSampleModule::validateAddress(jsi::Runtime &rt, jsi::Object input) {
  std::string street = input.getProperty(rt, "street").asString(rt).utf8(rt);
  int32_t number = input.getProperty(rt, "num").asNumber();

  return !street.empty() && number > 0;
}
```

구현에서 `Address`를 나타내는 객체는 `jsi::Object`입니다. 이 객체에서 값을 추출하려면 `JSI`가 제공하는 접근자를 사용해야 합니다:

- `getProperty()`는 이름으로 객체에서 속성을 가져옵니다.
- `asString()`은 속성을 `jsi::String`으로 변환합니다.
- `utf8()`은 `jsi::String`을 `std::string`으로 변환합니다.
- `asNumber()`는 속성을 `double`로 변환합니다.

객체를 수동으로 파싱한 후에는 필요한 로직을 구현할 수 있습니다.

:::note
`JSI`와 그 동작 방식에 대해 더 알고 싶다면 App.JS 2024의 이 [훌륭한 발표](https://youtu.be/oLmGInjKU2U?feature=shared)를 참고하세요.
:::

### 4. 앱에서 코드 테스트

앱에서 코드를 테스트하려면 `App.tsx` 파일을 수정해야 합니다.

1. `App.tsx` 파일을 엽니다. `App()` 함수의 내용을 제거합니다.
2. `App()` 함수의 본문을 다음 코드로 교체합니다:

```tsx title="App.tsx (App function body replacement)"
const [street, setStreet] = useState('');
const [num, setNum] = useState('');
const [isValidAddress, setIsValidAddress] = useState<
  boolean | null
>(null);

const onPress = () => {
  let houseNum = parseInt(num, 10);
  if (isNaN(houseNum)) {
    houseNum = -1;
  }
  const address = {
    street,
    num: houseNum,
    isInUS: false,
  };
  const result = SampleTurboModule.validateAddress(address);
  setIsValidAddress(result);
};

return (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        Welcome to C Turbo Native Module Example
      </Text>
      <Text>Address:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your address here"
        onChangeText={setStreet}
        value={street}
      />
      <Text>Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your address here"
        onChangeText={setNum}
        value={num}
      />
      <Button title="Validate" onPress={onPress} />
      {isValidAddress != null && (
        <Text>
          Your address is {isValidAddress ? 'valid' : 'not valid'}
        </Text>
      )}
    </View>
  </SafeAreaView>
);
```

축하합니다!

JS에서 C++로 첫 번째 타입을 성공적으로 브리징했습니다.
