---
id: optimizing-javascript-loading
title: Optimizing JavaScript loading
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

JavaScript 코드를 파싱하고 실행하려면 메모리와 시간이 필요합니다. 이 때문에 앱이 커질수록 처음 필요할 때까지 코드 로딩을 지연하는 것이 유용한 경우가 많습니다. React Native에는 기본적으로 활성화된 몇 가지 표준 최적화가 있으며, 자체 코드에서 React가 앱을 더 효율적으로 로드하도록 돕기 위해 적용할 수 있는 기법들도 있습니다. 또한 매우 큰 앱에 적합한 일부 고급 자동 최적화(각각의 트레이드오프가 있음)도 있습니다.

## 권장: Hermes 사용하기

Hermes는 새 React Native 앱의 기본 엔진으로, 효율적인 코드 로딩을 위해 고도로 최적화되어 있습니다. 릴리즈 빌드에서 JavaScript 코드는 미리 바이트코드로 완전히 컴파일됩니다. 바이트코드는 온디맨드로 메모리에 로드되며 일반 JavaScript처럼 파싱할 필요가 없습니다.

:::info
React Native에서 Hermes 사용에 대한 자세한 내용은 [여기](./hermes)를 참고하세요.
:::

## 권장: 대형 컴포넌트 지연 로드하기

코드/의존성이 많은 컴포넌트가 앱을 처음 렌더링할 때 사용되지 않을 가능성이 높다면, React의 [`lazy`](https://react.dev/reference/react/lazy) API를 사용하여 처음 렌더링될 때까지 코드 로딩을 지연할 수 있습니다. 일반적으로 앱의 화면 수준 컴포넌트를 지연 로드하는 것을 고려해야 합니다. 그렇게 하면 앱에 새 화면을 추가해도 시작 시간이 늘어나지 않습니다.

:::info
코드 예시를 포함한 [Suspense를 사용한 컴포넌트 지연 로드](https://react.dev/reference/react/lazy#suspense-for-code-splitting)에 대한 자세한 내용은 React 문서를 참고하세요.
:::

### 팁: 모듈 사이드 이펙트 피하기

컴포넌트 모듈(또는 그 의존성)이 전역 변수 수정이나 컴포넌트 외부 이벤트 구독 같은 _사이드 이펙트_를 가지고 있다면, 컴포넌트를 지연 로드하면 앱의 동작이 변경될 수 있습니다. React 앱의 대부분의 모듈은 사이드 이펙트가 없어야 합니다.

```tsx title="SideEffects.tsx"
import Logger from './utils/Logger';

//  🚩 🚩 🚩 Side effect! This must be executed before React can even begin to
// render the SplashScreen component, and can unexpectedly break code elsewhere
// in your app if you later decide to lazy-load SplashScreen.
global.logger = new Logger();

export function SplashScreen() {
  // ...
}
```

## 고급: `require` 인라인 호출

때로는 `lazy`나 비동기 `import()`를 사용하지 않고도 처음 사용할 때까지 일부 코드 로딩을 지연하고 싶을 수 있습니다. 파일 상단에 정적 `import`를 사용하는 대신 [`require()`](https://metrobundler.dev/docs/module-api/#require) 함수를 사용하면 됩니다.

```tsx title="VeryExpensive.tsx"
import {Component} from 'react';
import {Text} from 'react-native';
// ... import some very expensive modules

export default function VeryExpensive() {
  // ... lots and lots of rendering logic
  return <Text>Very Expensive Component</Text>;
}
```

```tsx title="Optimized.tsx"
import {useCallback, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
// Usually we would write a static import:
// import VeryExpensive from './VeryExpensive';

let VeryExpensive = null;

export default function Optimize() {
  const [needsExpensive, setNeedsExpensive] = useState(false);
  const didPress = useCallback(() => {
    if (VeryExpensive == null) {
      VeryExpensive = require('./VeryExpensive').default;
    }

    setNeedsExpensive(true);
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity onPress={didPress}>
        <Text>Load</Text>
      </TouchableOpacity>
      {needsExpensive ? <VeryExpensive /> : null}
    </View>
  );
}
```

## 고급: `require` 호출 자동 인라인

React Native CLI를 사용해 앱을 빌드하는 경우, `require` 호출(`import`는 아님)은 자신의 코드와 사용하는 서드 파티 패키지(`node_modules`) 내부 모두에서 자동으로 인라인 처리됩니다.

```tsx
import {useCallback, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

// This top-level require call will be evaluated lazily as part of the component below.
const VeryExpensive = require('./VeryExpensive').default;

export default function Optimize() {
  const [needsExpensive, setNeedsExpensive] = useState(false);
  const didPress = useCallback(() => {
    setNeedsExpensive(true);
  }, []);

  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity onPress={didPress}>
        <Text>Load</Text>
      </TouchableOpacity>
      {needsExpensive ? <VeryExpensive /> : null}
    </View>
  );
}
```

:::info
일부 React Native 프레임워크는 이 동작을 비활성화합니다. 특히 Expo 프로젝트에서는 `require` 호출이 기본적으로 인라인 처리되지 않습니다. 프로젝트의 Metro 설정을 편집하고 [`getTransformOptions`](https://metrobundler.dev/docs/configuration#gettransformoptions)에서 `inlineRequires: true`를 설정하면 이 최적화를 활성화할 수 있습니다.
:::

### 인라인 `require`의 주의 사항

`require` 호출을 인라인 처리하면 모듈이 평가되는 순서가 변경되고, 일부 모듈이 _절대_ 평가되지 않는 상황이 발생할 수도 있습니다. JavaScript 모듈은 대개 사이드 이펙트가 없도록 작성되기 때문에 이는 일반적으로 자동으로 수행해도 안전합니다.

모듈 중 하나에 사이드 이펙트가 있는 경우 — 예를 들어 일부 로깅 메커니즘을 초기화하거나 나머지 코드에서 사용하는 전역 API를 패치하는 경우 — 예상치 못한 동작이나 충돌이 발생할 수 있습니다. 이런 경우 특정 모듈을 이 최적화에서 제외하거나 완전히 비활성화할 수 있습니다.

**모든 `require` 호출의 자동 인라인을 비활성화하려면:**

`metro.config.js`를 업데이트하여 `inlineRequires` 트랜스포머 옵션을 `false`로 설정하세요:

```tsx title="metro.config.js"
module.exports = {
  transformer: {
    async getTransformOptions() {
      return {
        transform: {
          inlineRequires: false,
        },
      };
    },
  },
};
```

**특정 모듈만 `require` 인라인에서 제외하려면:**

두 가지 관련 트랜스포머 옵션이 있습니다: `inlineRequires.blockList`와 `nonInlinedRequires`. 각각 사용 방법은 아래 코드 스니펫을 참고하세요.

```tsx title="metro.config.js"
module.exports = {
  transformer: {
    async getTransformOptions() {
      return {
        transform: {
          inlineRequires: {
            blockList: {
              // require() calls in `DoNotInlineHere.js` will not be inlined.
              [require.resolve('./src/DoNotInlineHere.js')]: true,

              // require() calls anywhere else will be inlined, unless they
              // match any entry nonInlinedRequires (see below).
            },
          },
          nonInlinedRequires: [
            // require('react') calls will not be inlined anywhere
            'react',
          ],
        },
      };
    },
  },
};
```

인라인 `require` 설정 및 미세 조정에 대한 자세한 내용은 [Metro의 `getTransformOptions` 문서](https://metrobundler.dev/docs/configuration#gettransformoptions)를 참고하세요.

## 고급: 랜덤 액세스 모듈 번들 사용하기 (Hermes 미사용 시)

:::tip
**Hermes 사용 시 지원되지 않습니다.** Hermes 바이트코드는 RAM 번들 형식과 호환되지 않으며, 모든 사용 사례에서 동일하거나 더 나은 성능을 제공합니다.
:::

랜덤 액세스 모듈 번들(RAM 번들이라고도 함)은 위에서 언급한 기법들과 함께 작동하여 파싱되어 메모리에 로드되어야 하는 JavaScript 코드의 양을 제한합니다. 각 모듈은 별도의 문자열(또는 파일)로 저장되며, 모듈을 실행해야 할 때만 파싱됩니다.

RAM 번들은 물리적으로 별도의 파일로 분할되거나, 단일 파일에 여러 모듈의 룩업 테이블로 구성된 _인덱스_ 형식을 사용할 수 있습니다.

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms}>
<TabItem value="android">

Android에서 RAM 형식을 활성화하려면 `android/app/build.gradle` 파일을 편집하세요. `apply from: "../../node_modules/react-native/react.gradle"` 줄 앞에 `project.ext.react` 블록을 추가하거나 수정하세요:

```
project.ext.react = [
  bundleCommand: "ram-bundle",
]
```

Android에서 단일 인덱스 파일을 사용하려면 다음 줄을 사용하세요:

```
project.ext.react = [
  bundleCommand: "ram-bundle",
  extraPackagerArgs: ["--indexed-ram-bundle"]
]
```

</TabItem>
<TabItem value="ios">

iOS에서 RAM 번들은 항상 인덱스 형식(= 단일 파일)입니다.

Xcode에서 빌드 단계 "Bundle React Native code and images"를 편집하여 RAM 형식을 활성화하세요. `../node_modules/react-native/scripts/react-native-xcode.sh` 앞에 `export BUNDLE_COMMAND="ram-bundle"`을 추가하세요:

```
export BUNDLE_COMMAND="ram-bundle"
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

</TabItem>
</Tabs>

RAM 번들 빌드 설정 및 미세 조정에 대한 자세한 내용은 [Metro의 `getTransformOptions` 문서](https://metrobundler.dev/docs/configuration#gettransformoptions)를 참고하세요.
