---
id: turbo-native-modules-introduction
title: 'Native Modules: 소개'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import CodeBlock from '@theme/CodeBlock';
import {getCurrentVersion} from '@site/src/getCurrentVersion';
import {TurboNativeModulesAndroid, TurboNativeModulesIOS} from './\_turbo-native-modules-components';

# Native Modules

React Native 애플리케이션 코드는 React Native나 기존 라이브러리에서 제공하지 않는 네이티브 플랫폼 API와 상호작용해야 할 수 있습니다. **Turbo Native Module**을 사용하여 직접 통합 코드를 작성할 수 있습니다. 이 가이드에서는 작성 방법을 안내합니다.

기본 단계는 다음과 같습니다:

1. 가장 인기 있는 JavaScript 타입 어노테이션 언어 중 하나인 Flow 또는 TypeScript를 사용하여 **타입이 지정된 JavaScript 사양을 정의합니다**;
2. **Codegen을 실행하도록 의존성 관리 시스템을 구성합니다**. Codegen은 사양을 네이티브 언어 인터페이스로 변환합니다;
3. 사양을 사용하여 **애플리케이션 코드를 작성합니다**; 그리고
4. **생성된 인터페이스를 사용하여 네이티브 플랫폼 코드를 작성하고** 네이티브 코드를 React Native 런타임 환경에 연결합니다.

다음 명령어로 애플리케이션을 생성했다고 가정하고 예제 Turbo Native Module을 만들어가며 각 단계를 살펴보겠습니다:

<CodeBlock language="bash" title="shell">
{`npx @react-native-community/cli@latest init TurboModuleExample --version ${getCurrentVersion()}`}
</CodeBlock>

## 네이티브 영구 저장소

이 가이드에서는 [Web Storage API](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev)인 `localStorage`의 구현을 작성하는 방법을 보여줍니다. 이 API는 프로젝트에서 애플리케이션 코드를 작성하는 React 개발자에게 친숙한 API입니다.

모바일에서 이를 동작시키려면 Android와 iOS API를 사용해야 합니다:

- Android: [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences), 그리고
- iOS: [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults).

### 1. 타입 사양 선언

React Native는 [Codegen](/docs/the-new-architecture/what-is-codegen)이라는 도구를 제공하며, 이 도구는 TypeScript 또는 Flow로 작성된 사양을 받아 Android와 iOS용 플랫폼별 코드를 생성합니다. 사양은 네이티브 코드와 React Native JavaScript 런타임 사이에서 주고받을 메서드와 데이터 타입을 선언합니다. Turbo Native Module은 사양, 직접 작성하는 네이티브 코드, 그리고 사양에서 생성된 Codegen 인터페이스를 모두 포함합니다.

사양 파일을 생성하려면:

1. 앱의 루트 폴더 안에 `specs`라는 새 폴더를 만듭니다.
2. `NativeLocalStorage.ts`라는 새 파일을 만듭니다.

:::info
사양에서 사용할 수 있는 모든 타입과 생성되는 네이티브 타입은 [Appendix](/docs/appendix) 문서에서 확인할 수 있습니다.
:::

:::info
모듈 이름과 관련 사양 파일 이름을 변경하려면 항상 'Native'를 접두사로 사용해야 합니다(예: `NativeStorage` 또는 `NativeUsersDefault`).
:::

다음은 `localStorage` 사양의 구현 예시입니다:

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="specs/NativeLocalStorage.ts"
import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);
```

</TabItem>
<TabItem value="flow">

```flow title="NativeLocalStorage.js"
import type {TurboModule} from 'react-native';
import {TurboModule, TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): ?string;
  removeItem(key: string): void;
  clear(): void;
}
```

</TabItem>
</Tabs>

### 2. Codegen 실행 구성

사양은 React Native Codegen 도구에서 플랫폼별 인터페이스와 보일러플레이트를 생성하는 데 사용됩니다. 이를 위해 Codegen은 사양의 위치와 처리 방법을 알아야 합니다. `package.json`을 업데이트하여 다음을 포함시킵니다:

```json title="package.json"
     "start": "react-native start",
     "test": "jest"
   },
   // highlight-add-start
   "codegenConfig": {
     "name": "NativeLocalStorageSpec",
     "type": "modules",
     "jsSrcsDir": "specs",
     "android": {
       "javaPackageName": "com.nativelocalstorage"
     }
   },
   // highlight-add-end
   "dependencies": {
```

Codegen을 위한 모든 설정이 완료되었으면 네이티브 코드가 생성된 코드에 연결될 수 있도록 준비해야 합니다.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
Codegen은 `generateCodegenArtifactsFromSchema` Gradle 태스크를 통해 실행됩니다:

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

이 과정은 Android 애플리케이션을 빌드할 때 자동으로 실행됩니다.
</TabItem>
<TabItem value="ios" label="iOS">
Codegen은 CocoaPods가 생성한 프로젝트에 자동으로 추가되는 스크립트 단계의 일부로 실행됩니다.

```bash
cd ios
bundle install
bundle exec pod install
```

출력 결과는 다음과 같이 표시됩니다:

```shell
...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

</TabItem>
</Tabs>

### 3. Turbo Native Module을 사용하여 애플리케이션 코드 작성

`NativeLocalStorage`를 사용하여 수정된 `App.tsx`에는 저장하고 싶은 텍스트, 입력 필드, 그리고 이 값을 업데이트하는 버튼이 포함됩니다.

`TurboModuleRegistry`는 Turbo Native Module을 가져오는 2가지 모드를 지원합니다:

- `get<T>(name: string): T | null`: Turbo Native Module을 사용할 수 없는 경우 `null`을 반환합니다.
- `getEnforcing<T>(name: string): T`: Turbo Native Module을 사용할 수 없는 경우 예외를 발생시킵니다. 모듈이 항상 사용 가능하다고 가정합니다.

```tsx title="App.tsx"
import {useEffect, useState, type JSX} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): JSX.Element {
  const [value, setValue] = useState<string | null>(null);

  const [editingValue, setEditingValue] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const storedValue = NativeLocalStorage?.getItem('myKey');
    setValue(storedValue ?? '');
  }, []);

  function saveValue() {
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
    NativeLocalStorage?.removeItem('myKey');
    setValue('');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
      <Button title="Delete" onPress={deleteValue} />
      <Button title="Clear" onPress={clearAll} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

export default App;
```

### 4. 네이티브 플랫폼 코드 작성

모든 준비가 완료되었으면 네이티브 플랫폼 코드를 작성하기 시작합니다. 이 작업은 2단계로 진행됩니다:

:::note
이 가이드는 새로운 아키텍처에서만 동작하는 Turbo Native Module을 생성하는 방법을 보여줍니다. 새로운 아키텍처와 레거시 아키텍처 모두를 지원해야 하는 경우 [하위 호환성 가이드](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat.md)를 참고하세요.
:::

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <TurboNativeModulesAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <TurboNativeModulesIOS/>
    </TabItem>
</Tabs>
