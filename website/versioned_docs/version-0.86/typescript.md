---
id: typescript
title: TypeScript 사용하기
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[TypeScript][ts]는 타입 정의를 추가하여 JavaScript를 확장하는 언어입니다. 새로운 React Native 프로젝트는 기본적으로 TypeScript를 대상으로 하지만, JavaScript와 Flow도 지원합니다.

## TypeScript 시작하기

[React Native CLI](getting-started-without-a-framework#1단계-새-애플리케이션-만들기)나 [Ignite][ignite]와 같이 인기 있는 템플릿으로 생성된 새 프로젝트는 기본적으로 TypeScript를 사용합니다.

TypeScript는 TypeScript 템플릿을 유지 관리하는 [Expo][expo]와 함께 사용할 수도 있으며, 프로젝트에 `.ts` 또는 `.tsx` 파일이 추가될 때 TypeScript를 자동으로 설치하고 구성하라는 메시지가 표시됩니다.

```shell
npx create-expo-app --template
```

## 기존 프로젝트에 TypeScript 추가

1. 프로젝트에 TypeScript, 타입, ESLint 플러그인을 추가합니다.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -D typescript @react-native/typescript-config @types/jest @types/react @types/react-test-renderer
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add --dev typescript @react-native/typescript-config @types/jest @types/react @types/react-test-renderer
```

</TabItem>
</Tabs>

:::note
이 명령어는 모든 의존성의 최신 버전을 추가합니다. 프로젝트에서 사용하는 기존 패키지와 맞추기 위해 버전을 변경해야 할 수 있습니다. [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)와 같은 도구를 사용하여 React Native에서 제공하는 버전을 확인할 수 있습니다.
:::

2. TypeScript 구성 파일을 추가합니다. 프로젝트 루트에 `tsconfig.json`을 생성합니다:

```json title="tsconfig.json"
{
  "extends": "@react-native/typescript-config"
}
```

3. JavaScript 파일 이름을 `*.tsx`로 변경합니다.

:::warning
프로덕션 빌드를 번들링할 때 문제가 발생할 수 있으므로 `./index.js` 진입점 파일은 그대로 유지해야 합니다.
:::

4. `tsc`를 실행하여 새 TypeScript 파일의 타입을 검사합니다.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npx tsc
```

</TabItem>
<TabItem value="yarn">

```shell
yarn tsc
```

</TabItem>
</Tabs>

## TypeScript 대신 JavaScript 사용하기

React Native는 새 애플리케이션의 기본값을 TypeScript로 설정하지만, JavaScript도 사용할 수 있습니다. `.jsx` 확장자를 가진 파일은 TypeScript 대신 JavaScript로 처리되며, 타입 검사가 수행되지 않습니다. JavaScript 모듈은 TypeScript 모듈에서 import할 수 있으며, 반대의 경우도 마찬가지입니다.

## TypeScript와 React Native의 동작 방식

기본적으로 TypeScript 소스는 번들링 중에 [Babel][babel]에 의해 변환됩니다. 타입 검사에는 TypeScript 컴파일러만 사용하는 것을 권장합니다. 이것이 새로 생성된 애플리케이션에서 `tsc`의 기본 동작 방식입니다. React Native로 포팅되는 기존 TypeScript 코드가 있다면 TypeScript 대신 Babel을 사용할 때 [한두 가지 주의 사항][babel-7-caveats]이 있습니다.

## React Native + TypeScript는 어떤 모습인가요

`React.Component<Props, State>`를 통해 React 컴포넌트의 [Props](props)와 [State](state)에 대한 인터페이스를 제공할 수 있으며, 이는 JSX에서 해당 컴포넌트를 다룰 때 타입 검사와 에디터 자동 완성 기능을 제공합니다.

```tsx title="components/Hello.tsx"
import {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

function Hello({name, baseEnthusiasmLevel = 0}: Props) {
  const [enthusiasmLevel, setEnthusiasmLevel] = useState(
    baseEnthusiasmLevel,
  );

  const onIncrement = () =>
    setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () =>
    setEnthusiasmLevel(
      enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0,
    );

  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join('!') : '';

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello {name}
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View>
        <Button
          title="Increase enthusiasm"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
        <Button
          title="Decrease enthusiasm"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="red"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Hello;
```

[TypeScript 플레이그라운드][tsplay]에서 더 많은 문법을 탐색해볼 수 있습니다.

## 유용한 자료를 찾을 수 있는 곳

- [TypeScript 핸드북][ts-handbook]
- [TypeScript에 관한 React 문서][react-ts]
- [React + TypeScript 치트시트][cheat]에는 React와 TypeScript를 함께 사용하는 방법에 대한 좋은 개요가 있습니다.

## TypeScript와 함께 커스텀 경로 별칭 사용하기

TypeScript와 함께 커스텀 경로 별칭을 사용하려면 Babel과 TypeScript 모두에서 경로 별칭이 동작하도록 설정해야 합니다. 방법은 다음과 같습니다:

1. `tsconfig.json`을 수정하여 [커스텀 경로 매핑][path-map]을 설정합니다. `src` 루트에 있는 모든 항목을 이전 경로 참조 없이 사용할 수 있도록 설정하고, `tests/File.tsx`를 사용하여 테스트 파일에 접근할 수 있도록 합니다:

```diff
{
-  "extends": "@react-native/typescript-config"
+  "extends": "@react-native/typescript-config",
+  "compilerOptions": {
+    "baseUrl": ".",
+    "paths": {
+      "*": ["src/*"],
+      "tests": ["tests/*"],
+      "@components/*": ["src/components/*"],
+    },
+  }
}
```

2. 프로젝트에 개발 패키지로 [`babel-plugin-module-resolver`][bpmr]를 추가합니다:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install --save-dev babel-plugin-module-resolver
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add --dev babel-plugin-module-resolver
```

</TabItem>
</Tabs>

3. 마지막으로 `babel.config.js`를 구성합니다(`babel.config.js`의 문법은 `tsconfig.json`과 다름에 주의하세요):

```diff
{
   presets: ['module:metro-react-native-babel-preset'],
+  plugins: [
+    [
+       'module-resolver',
+       {
+         root: ['./src'],
+         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
+         alias: {
+           tests: ['./tests/'],
+           "@components": "./src/components",
+         }
+       }
+    ]
+  ]
}
```

[react-ts]: https://react.dev/learn/typescript
[ts]: https://www.typescriptlang.org/
[flow]: https://flow.org
[ts-template]: https://github.com/react-native-community/react-native-template-typescript
[babel]: /docs/javascript-environment#javascript-문법-변환기
[babel-7-caveats]: https://babeljs.io/docs/en/next/babel-plugin-transform-typescript
[cheat]: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#reacttypescript-cheatsheets
[ts-handbook]: https://www.typescriptlang.org/docs/handbook/intro.html
[path-map]: https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping
[bpmr]: https://github.com/tleunen/babel-plugin-module-resolver
[expo]: https://expo.io
[ignite]: https://github.com/infinitered/ignite
[tsplay]: https://www.typescriptlang.org/play?strictNullChecks=false&jsx=3#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4BYAKFEljgG8AhAVxhggDsAaOAZRgCeAGyS8AFkiQweAFSQAPaXABqwJAHcAvnGy4CRdDAC0HFDGAA3JGSpUFteILBI4ABRxgAznAC8DKnBwpiBIAFxwnjBQwBwA5hSUgQBGKJ5IAKIcMGLMnsCpIAAySFZCAPzhHMwgSUhQCZq2lGickXAAEkhCQhDhyIYAdABiAMIAPO4QXgB8vnAAFPRBKCE8KWmZ2bn5nkUlXXMADHCaAJS+s-QBcC0cbQDaSFk5eQXFpTxpMJsvO3ulAF05v0MANcqIYGYkPN1hlnts3vshKcEtdbm1OABJDhoIghLJzebnHyzL4-BG7d5deZPLavSlIuAAajgAEYUWjWvBOAARJC4pD4+B+IkXCJScn0-7U2m-RGlOCzY5lOCyinSoRwIxsuDhQ4cyicu7wWIS+RoIQrMzATgAWRQUAA1t4RVUQCMxA7PJVqrUoMTZm6PV7FXBlXAAIJQKAoATzIOeqDeFnsgYAKwgMXm+AAhPhzuF8DZDYk4EQYMwoBwFtdAmNVBoIoIRD56JFhEhPANbpCYnVNNNa4E4GM5Iomx3W+2RF3YkQpDFYgOh8OOl0evR8ARGqXV4F6MEkDu98P6KbvubLSBrXaHc6afCpVTkce92MAPRjmCD3fD+tqdQfxPOsWDYTgVz3cwYBbAAibEBVSFw1SlGCINXdA0E7PIkmAIRgEEQoUFqIQfBgmIBSFVDfxPTh3Cw1ssRxPFaVfYCbggHooFIpIhGYJAqLY98gOAsZQPYDg0OHKDYL5BC0lVR8-gEti4AwrDgBwvCCKIrpSIAE35ZismUtjaKITxPAYjhZKMmBWOAlpONIog9JMvchIgj8G0AocvIA4SDU0VFmi5CcZzmfgO3ESQYG7AwYGhK5Sx7FA+ygcIktXTARHkcJWS4IcUDw2IOExBKQG9OAYMwrI6hggrfzTXJzEwAQRk4BKsnCaraTq65NAawI5xixcMqHTAOt4YAAC8wjgAAmQ5BuHCasgAdSQYBYjEGBCySDi9PwZbAmvKBYhiPKADZloGqgzmC+xoHgAzMBQZghHgTpuggBIgA
