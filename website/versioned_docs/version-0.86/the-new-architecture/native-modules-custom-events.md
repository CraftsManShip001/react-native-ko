import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# 네이티브 모듈에서 이벤트 발생시키기

일부 상황에서는 플랫폼 레이어에서 이벤트를 수신한 뒤 이를 JavaScript 레이어로 전달하여 애플리케이션이 해당 네이티브 이벤트에 반응할 수 있도록 Native Module을 구성하고 싶을 수 있습니다. 또 다른 경우에는 UI를 업데이트할 수 있도록 이벤트를 발생시키는 오래 실행되는 작업이 있을 수도 있습니다.

두 경우 모두 네이티브 모듈에서 이벤트를 발생시키기 좋은 사용 사례입니다. 이 가이드에서는 그 방법을 알아봅니다.

## 스토리지에 새 키가 추가될 때 이벤트 발생시키기

이 예제에서는 스토리지에 새 키가 추가될 때 이벤트를 발생시키는 방법을 배웁니다. 키의 값을 변경할 때는 이벤트가 발생하지 않고, 새 키를 추가할 때만 발생합니다.

이 가이드는 [Native Module](/docs/turbo-native-modules-introduction) 가이드를 기반으로 합니다.
이 가이드를 시작하기 전에 해당 가이드를 먼저 읽고, 가능하다면 예제를 직접 구현해 보세요.

## Step 1: NativeLocalStorage 스펙 업데이트

첫 번째 단계는 `NativeLocalStorage` 스펙을 업데이트하여 React Native가 해당 모듈이 이벤트를 발생시킬 수 있음을 인식하도록 하는 것입니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

`NativeLocalStorage.ts` 파일을 열고 다음과 같이 수정합니다:

```diff title="NativeLocalStorage.ts"
+import type {TurboModule, CodegenTypes} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

+export type KeyValuePair = {
+  key: string,
+  value: string,
+}

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
  clear(): void;

+ readonly onKeyAdded: CodegenTypes.EventEmitter<KeyValuePair>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeLocalStorage',
);
```

</TabItem>
<TabItem value="flow">

`NativeLocalStorage.js` 파일을 열고 다음과 같이 수정합니다:

```diff title="NativeLocalStorage.js"

// @flow
+import type {TurboModule, CodegenTypes} from 'react-native';
import {TurboModule, TurboModuleRegistry} from 'react-native';

+export type KeyValuePair = {
+  key: string,
+  value: string,
+}

export interface Spec extends TurboModule {
  setItem(value: string, key: string): void;
  getItem(key: string): ?string;
  removeItem(key: string): void;
  clear(): void;
+ onKeyAdded: CodegenTypes.EventEmitter<KeyValuePair>
}
export default (TurboModuleRegistry.get<Spec>(
  'NativeLocalStorage'
): ?Spec);
```

</TabItem>
</Tabs>

`import type` 구문을 통해 `react-native`에서 `CodegenTypes`를 가져오며, 여기에는 `EventEmitter` 타입이 포함되어 있습니다. 이를 통해 `CodegenTypes.EventEmitter<KeyValuePair>`를 사용하여 `onKeyAdded` 프로퍼티를 정의하고, 이벤트가 `KeyValuePair` 타입의 페이로드를 전달하도록 지정할 수 있습니다.

이벤트가 발생하면 `KeyValuePair` 타입의 파라미터를 수신하게 됩니다.

## Step 2: Codegen 실행

Native Module의 스펙을 업데이트했으므로, 이제 Codegen을 다시 실행하여 네이티브 코드에 필요한 아티팩트를 생성해야 합니다.

이 과정은 Native Modules 가이드에서 설명한 것과 동일합니다.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
Codegen은 `generateCodegenArtifactsFromSchema` Gradle 태스크를 통해 실행됩니다:

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

이 작업은 Android 애플리케이션을 빌드할 때 자동으로 실행됩니다.
</TabItem>
<TabItem value="ios" label="iOS">
Codegen은 CocoaPods가 생성한 프로젝트에 자동으로 추가된 스크립트 단계의 일부로 실행됩니다.

```bash
cd ios
bundle install
bundle exec pod install
```

출력 결과는 다음과 같습니다:

```shell
...
Framework build type is static library
[Codegen] Adding script_phases to ReactCodegen.
[Codegen] Generating ./build/generated/ios/ReactCodegen.podspec.json
[Codegen] Analyzing /Users/me/src/TurboModuleExample/package.json
[Codegen] Searching for Codegen-enabled libraries in the app.
[Codegen] Found TurboModuleExample
[Codegen] Searching for Codegen-enabled libraries in the project dependencies.
[Codegen] Found react-native
...
```

</TabItem>
</Tabs>

## Step 3: 앱 코드 업데이트

이제 새 이벤트를 처리하도록 앱 코드를 업데이트할 차례입니다.

`App.tsx` 파일을 열고 다음과 같이 수정합니다:

```diff title="App.tsx"
import {
+ Alert,
+ EventSubscription,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';

import NativeLocalStorage from './specs/NativeLocalStorage';

const EMPTY = '<empty>';

function App(): React.JSX.Element {
  const [value, setValue] = React.useState<string | null>(null);
+ const [key, setKey] = React.useState<string | null>(null);
+ const listenerSubscription = React.useRef<null | EventSubscription>(null);

+ React.useEffect(() => {
+   listenerSubscription.current = NativeLocalStorage?.onKeyAdded((pair) => Alert.alert(`New key added: ${pair.key} with value: ${pair.value}`));

+   return  () => {
+     listenerSubscription.current?.remove();
+     listenerSubscription.current = null;
+   }
+ }, [])

  const [editingValue, setEditingValue] = React.useState<
    string | null
  >(null);

- React.useEffect(() => {
-   const storedValue = NativeLocalStorage?.getItem('myKey');
-   setValue(storedValue ?? '');
- }, []);

  function saveValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
    NativeLocalStorage?.setItem(editingValue ?? EMPTY, key);
    setValue(editingValue);
  }

  function clearAll() {
    NativeLocalStorage?.clear();
    setValue('');
  }

  function deleteValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
    NativeLocalStorage?.removeItem(key);
    setValue('');
  }

+ function retrieveValue() {
+   if (key == null) {
+     Alert.alert('Please enter a key');
+     return;
+   }
+   const val = NativeLocalStorage?.getItem(key);
+   setValue(val);
+ }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.text}>
        Current stored value is: {value ?? 'No Value'}
      </Text>
+     <Text>Key:</Text>
+      <TextInput
+       placeholder="Enter the key you want to store"
+       style={styles.textInput}
+       onChangeText={setKey}
+     />
+     <Text>Value:</Text>
      <TextInput
        placeholder="Enter the text you want to store"
        style={styles.textInput}
        onChangeText={setEditingValue}
      />
      <Button title="Save" onPress={saveValue} />
+     <Button title="Retrieve" onPress={retrieveValue} />
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

주목해야 할 몇 가지 변경 사항이 있습니다:

1. `EventSubscription`을 처리하기 위해 `react-native`에서 `EventSubscription` 타입을 가져와야 합니다.
2. `EventSubscription` 참조를 추적하기 위해 `useRef`를 사용해야 합니다.
3. `useEffect` 훅을 사용하여 리스너를 등록합니다. `onKeyAdded` 함수는 `KeyValuePair` 타입의 객체를 파라미터로 받는 콜백을 인자로 받습니다.
4. `onKeyAdded`에 추가된 콜백은 네이티브에서 JS로 이벤트가 발생할 때마다 실행됩니다.
5. `useEffect` 정리 함수에서 이벤트 구독을 `remove`하고 ref를 `null`로 설정합니다.

나머지 변경 사항은 이 새로운 기능을 위해 앱을 개선하는 일반적인 React 변경 사항입니다.

## Step 4: 네이티브 코드 작성

모든 준비가 완료되었으므로 이제 네이티브 플랫폼 코드를 작성해 봅니다.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">

[Native Modules 가이드](/docs/turbo-native-modules-introduction?platforms=android&language=typescript#3-turbo-native-module을-사용하여-애플리케이션-코드-작성)에 설명된 Android 가이드를 따랐다면, 남은 작업은 앱에서 이벤트를 발생시키는 코드를 연결하는 것입니다.

이를 위해 다음을 수행해야 합니다:

1. `NativeLocalStorage.kt` 파일을 엽니다.
2. 다음과 같이 수정합니다:

```diff title="NativeLocalStorage"
package com.nativelocalstorage

import android.content.Context
import android.content.SharedPreferences
import com.nativelocalstorage.NativeLocalStorageSpec
+import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
+import com.facebook.react.bridge.WritableMap

class NativeLocalStorageModule(reactContext: ReactApplicationContext) : NativeLocalStorageSpec(reactContext) {

  override fun getName() = NAME

  override fun setItem(value: String, key: String) {
+   var shouldEmit = false
+   if (getItem(key) != null) {
+       shouldEmit = true
+   }
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.putString(key, value)
    editor.apply()

+   if (shouldEmit == true) {
+       val eventData = Arguments.createMap().apply {
+           putString("key", key)
+           putString("value", value)
+       }
+       emitOnKeyAdded(eventData)
+   }
  }

  override fun getItem(key: String): String? {
    val sharedPref = getReactApplicationContext().getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val username = sharedPref.getString(key, null)
    return username.toString()
  }
```

우선, 네이티브에서 JS로 전송해야 하는 이벤트 데이터를 생성하는 데 필요한 몇 가지 타입을 가져와야 합니다. 다음과 같은 import가 필요합니다:

- `import com.facebook.react.bridge.Arguments`
- `import com.facebook.react.bridge.WritableMap`

다음으로, 실제로 JS에 이벤트를 발생시키는 로직을 구현해야 합니다. 스펙에서 정의된 `KeyValuePair`와 같은 복잡한 타입의 경우, Codegen은 `ReadableMap`을 파라미터로 받는 함수를 생성합니다. `Arguments.createMap()` 팩토리 메서드를 사용하여 `ReadableMap`을 생성하고, `apply` 함수를 사용하여 맵을 채울 수 있습니다. 맵에서 사용하는 키가 JS의 스펙 타입에 정의된 프로퍼티와 동일한지 확인하는 것은 개발자의 책임입니다.

</TabItem>
<TabItem value="ios" label="iOS">

[Native Modules 가이드](/docs/turbo-native-modules-introduction?platforms=ios&language=typescript#3-turbo-native-module을-사용하여-애플리케이션-코드-작성)에 설명된 iOS 가이드를 따랐다면, 남은 작업은 앱에서 이벤트를 발생시키는 코드를 연결하는 것입니다.

이를 위해 다음을 수행해야 합니다:

1. `RCTNativeLocalStorage.h` 파일을 엽니다.
2. 기본 클래스를 `NSObject`에서 `NativeLocalStorageSpecBase`로 변경합니다.

```diff title="RCTNativeLocalStorage.h"
#import <Foundation/Foundation.h>
#import <NativeLocalStorageSpec/NativeLocalStorageSpec.h>

NS_ASSUME_NONNULL_BEGIN

-@interface RCTNativeLocalStorage : NSObject <NativeLocalStorageSpec>
+@interface RCTNativeLocalStorage : NativeLocalStorageSpecBase <NativeLocalStorageSpec>

@end

NS_ASSUME_NONNULL_END
```

3. `RCTNativeLocalStorage.mm` 파일을 엽니다.
4. 필요할 때 이벤트를 발생시키도록 수정합니다. 예를 들면 다음과 같습니다:

```diff title="RCTNativeLocalStorage.mm"
 - (void)setItem:(NSString *)value key:(NSString *)key {
+  BOOL shouldEmitEvent = NO;
+  if (![self getItem:key]) {
+    shouldEmitEvent = YES;
+  }
   [self.localStorage setObject:value forKey:key];

+  if (shouldEmitEvent) {
+    [self emitOnKeyAdded:@{@"key": key, @"value": value}];
+  }
}
```

`NativeLocalStorageSpecBase`는 `emitOnKeyAdded` 메서드와 기본 구현 및 보일러플레이트를 제공하는 기본 클래스입니다. 이 클래스 덕분에 JS에 이벤트를 전송하는 데 필요한 Objective-C와 JSI 간의 모든 변환을 직접 처리할 필요가 없습니다.

스펙에서 정의된 `KeyValuePair`와 같은 복잡한 타입의 경우, Codegen은 네이티브 측에서 채울 수 있는 범용 딕셔너리를 생성합니다. 딕셔너리에서 사용하는 키가 JS의 스펙 타입에 정의된 프로퍼티와 동일한지 확인하는 것은 개발자의 책임입니다.

</TabItem>
</Tabs>

## Step 5: 앱 실행

이제 앱을 실행하면 다음과 같은 동작을 확인할 수 있습니다.

| <center>Android</center>                                                                                    | <center>iOS</center>                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| <center><img src="/docs/assets/turbo-native-modules-events-android.gif" width="75%" height="75%"/></center> | <center><img src="/docs/assets/turbo-native-modules-events-ios.gif" width="75%" height="75%"/></center> |
