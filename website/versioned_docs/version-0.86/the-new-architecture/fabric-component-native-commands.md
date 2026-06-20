import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

# 네이티브 컴포넌트에서 네이티브 함수 호출하기

새로운 Native Component를 작성하는 [기본 가이드](/docs/fabric-native-components-introduction)에서 새 컴포넌트를 만드는 방법, JS 측에서 네이티브 측으로 속성을 전달하는 방법, 네이티브 측에서 JS로 이벤트를 방출하는 방법을 살펴봤습니다.

커스텀 컴포넌트는 프로그래밍 방식으로 웹 페이지를 다시 로드하는 것과 같이 더 고급 기능을 구현하기 위해 네이티브 코드에서 구현된 일부 함수를 명령형으로 호출할 수도 있습니다.

이 가이드에서는 새로운 개념인 Native Commands를 사용하여 이를 달성하는 방법을 배웁니다.

이 가이드는 [Native Components](/docs/fabric-native-components-introduction) 가이드를 기반으로 하며, 해당 가이드와 [Codegen](/docs/the-new-architecture/what-is-codegen)에 익숙하다고 가정합니다.

## 1. 컴포넌트 스펙 업데이트

첫 번째 단계는 `NativeCommand`를 선언하도록 컴포넌트 스펙을 업데이트하는 것입니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

`WebViewNativeComponent.ts`를 다음과 같이 업데이트합니다:

```diff title="Demo/specs/WebViewNativeComponent.ts"
import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
+import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  sourceURL?: string;
  onScriptLoaded?: BubblingEventHandler<WebViewScriptLoadedEvent> | null;
}

+interface NativeCommands {
+    reload: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
+}

+export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
+    supportedCommands: ['reload'],
+});

export default codegenNativeComponent<NativeProps>(
  'CustomWebView',
) as HostComponent<NativeProps>;
```

</TabItem>
<TabItem value="flow">

`WebViewNativeComponent.js`를 다음과 같이 업데이트합니다:

```diff title="Demo/specs/WebViewNativeComponent.js"
// @flow strict-local

import type {HostComponent, ViewProps} from 'react-native';
import type {BubblingEventHandler} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
+import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

type WebViewScriptLoadedEvent = $ReadOnly<{|
  result: "success" | "error",
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  sourceURL?: string;
  onScriptLoaded?: BubblingEventHandler<WebViewScriptLoadedEvent>?;
|}>;

+interface NativeCommands {
+    reload: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void;
+}

+export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
+    supportedCommands: ['reload'],
+});

export default (codegenNativeComponent<NativeProps>(
  'CustomWebView',
): HostComponent<NativeProps>);

```

</TabItem>
</Tabs>

이 변경 사항에는 다음이 필요합니다:

1. `react-native`에서 `codegenNativeCommands` 함수를 가져옵니다. 이는 codegen에 `NativeCommands`에 대한 코드를 생성해야 한다고 알려줍니다.
2. 네이티브에서 호출하려는 메서드를 포함하는 인터페이스를 정의합니다. 모든 Native Commands는 첫 번째 매개변수로 `React.ElementRef` 타입을 가져야 합니다.
3. 지원되는 commands 목록을 전달하는 `codegenNativeCommands` 호출의 결과인 `Commands` 변수를 내보냅니다.

:::warning
TypeScript에서 `React.ElementRef`는 deprecated되었습니다. 실제로 사용해야 하는 올바른 타입은 `React.ComponentRef`입니다. 그러나 Codegen의 버그로 인해 `ComponentRef`를 사용하면 앱이 크래시됩니다. 이미 수정 사항이 있지만, 이를 적용하려면 React Native의 새 버전을 릴리스해야 합니다.
:::

## 2. 새 커맨드를 사용하도록 앱 코드 업데이트

이제 앱에서 커맨드를 사용할 수 있습니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

`App.tsx` 파일을 열고 다음과 같이 수정합니다:

```diff title="App.tsx"
-import {Alert, StyleSheet, View} from 'react-native';
-import WebView from '../specs/WebViewNativeComponent';
+import {Alert, StyleSheet, Pressable, Text, View} from 'react-native';
+import WebView, {Commands} from '../specs/WebViewNativeComponent';

function App(): React.JSX.Element {
+    const webViewRef = React.useRef<React.ElementRef<typeof View> | null>(null);
+
+    const refresh = () => {
+        if (webViewRef.current) {
+            Commands.reload(webViewRef.current);
+        }
+    };

  return (
    <View style={styles.container}>
      <WebView
+       ref={webViewRef}
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
+      <View style={styles.tabbar}>
+        <Pressable onPress={refresh} style={styles.button}>
+            {({pressed}) => (
+                !pressed ? <Text style={styles.buttonText}>Refresh</Text> : <Text style={styles.buttonTextPressed}>Refresh</Text>) }
+        </Pressable>
+      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  webview: {
    width: '100%',
-    height: '100%',
+    height: '90%',
  },
+  tabbar: {
+    flex: 1,
+    backgroundColor: 'gray',
+    width: '100%',
+    alignItems: 'center',
+    alignContent: 'center',
+  },
+  button: {
+    margin: 10,
+  },
+  buttonText: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF',
+    width: '100%',
+  },
+  buttonTextPressed: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF77',
+    width: '100%',
+  },
});

export default App;
```

</TabItem>
<TabItem value="flow">

`App.tsx` 파일을 열고 다음과 같이 수정합니다:

```diff title="App.jsx"
-import {Alert, StyleSheet, View} from 'react-native';
-import WebView from '../specs/WebViewNativeComponent';
+import {Alert, StyleSheet, Pressable, Text, View} from 'react-native';
+import WebView, {Commands} from '../specs/WebViewNativeComponent';

function App(): React.JSX.Element {
+    const webViewRef = React.useRef<React.ElementRef<typeof View> | null>(null);
+
+    const refresh = () => {
+        if (webViewRef.current) {
+            Commands.reload(webViewRef.current);
+        }
+    };

  return (
    <View style={styles.container}>
      <WebView
+       ref={webViewRef}
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
+      <View style={styles.tabbar}>
+        <Pressable onPress={refresh} style={styles.button}>
+            {({pressed}) => (
+                !pressed ? <Text style={styles.buttonText}>Refresh</Text> : <Text style={styles.buttonTextPressed}>Refresh</Text>) }
+        </Pressable>
+      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
  webview: {
    width: '100%',
-    height: '100%',
+    height: '90%',
  },
+  tabbar: {
+    flex: 1,
+    backgroundColor: 'gray',
+    width: '100%',
+    alignItems: 'center',
+    alignContent: 'center',
+  },
+  button: {
+    margin: 10,
+  },
+  buttonText: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF',
+    width: '100%',
+  },
+  buttonTextPressed: {
+    fontSize: 20,
+    fontWeight: 'bold',
+    color: '#00D6FF77',
+    width: '100%',
+  },
});

export default App;
```

</TabItem>
</Tabs>

여기서 관련된 변경 사항은 다음과 같습니다:

1. 스펙 파일에서 `Commands` 상수를 가져옵니다. Command는 네이티브에 있는 메서드를 호출할 수 있는 객체입니다.
2. `useRef`를 사용하여 `WebView` 커스텀 네이티브 컴포넌트에 대한 ref를 선언합니다. 이 ref를 네이티브 커맨드에 전달해야 합니다.
3. `refresh` 함수를 구현합니다. 이 함수는 WebView의 ref가 null이 아닌지 확인하고, 그렇지 않은 경우 커맨드를 호출합니다.
4. 사용자가 버튼을 탭할 때 커맨드를 호출하는 pressable을 추가합니다.

나머지 변경 사항은 `Pressable`을 추가하고 뷰를 더 보기 좋게 스타일링하는 일반적인 React 변경 사항입니다.

## 3. Codegen 재실행

스펙이 업데이트되고 커맨드를 사용할 준비가 되었으니, 이제 네이티브 코드를 구현할 시간입니다. 그러나 네이티브 코드 작성에 들어가기 전에 codegen을 재실행하여 네이티브 코드에 필요한 새로운 타입을 생성해야 합니다.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
Codegen은 `generateCodegenArtifactsFromSchema` Gradle 태스크를 통해 실행됩니다:

```bash
cd android
./gradlew generateCodegenArtifactsFromSchema

BUILD SUCCESSFUL in 837ms
14 actionable tasks: 3 executed, 11 up-to-date
```

이는 Android 애플리케이션을 빌드할 때 자동으로 실행됩니다.
</TabItem>
<TabItem value="ios" label="iOS">
Codegen은 CocoaPods가 생성한 프로젝트에 자동으로 추가된 스크립트 단계의 일부로 실행됩니다.

```bash
cd ios
bundle install
bundle exec pod install
```

출력은 다음과 같이 표시됩니다:

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

## 4. 네이티브 코드 구현

이제 JS가 네이티브 뷰의 메서드를 직접 호출할 수 있도록 하는 네이티브 변경 사항을 구현할 시간입니다.

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">

뷰가 Native Command에 응답하도록 하려면 ReactWebViewManager만 수정하면 됩니다.

지금 빌드를 시도하면 현재 `ReactWebViewManager`가 새 `reload` 메서드를 구현하지 않으므로 빌드가 실패합니다.
빌드 오류를 수정하려면 `ReactWebViewManager`를 수정하여 구현합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```diff title="ReactWebViewManager.java"

//...
  @ReactProp(name = "sourceUrl")
  @Override
  public void setSourceURL(ReactWebView view, String sourceURL) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error);
      return;
    }
    view.loadUrl(sourceURL, new HashMap<>());
  }

+  @Override
+  public void reload(ReactWebView view) {
+    view.reload();
+  }

  public static final String REACT_CLASS = "CustomWebView";
//...
```

</TabItem>
<TabItem value="kotlin">

```diff title="ReactWebViewManager.kt"
  @ReactProp(name = "sourceUrl")
  override fun setSourceURL(view: ReactWebView, sourceURL: String?) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error)
      return;
    }
    view.loadUrl(sourceURL, emptyMap())
  }

+  override fun reload(view: ReactWebView) {
+    view.reload()
+  }

  companion object {
    const val REACT_CLASS = "CustomWebView"
  }
```

</TabItem>
</Tabs>

이 경우 ReactWebView가 Android의 `WebView`를 상속받아 reload 메서드를 직접 사용할 수 있으므로 `view.reload()` 메서드를 직접 호출하는 것으로 충분합니다. 커스텀 뷰에서 사용할 수 없는 커스텀 함수를 구현하는 경우, React Native의 `ViewManager`가 관리하는 Android의 View에 필요한 메서드를 구현해야 할 수도 있습니다.

</TabItem>
<TabItem value="ios" label="iOS">

뷰가 Native Command에 응답하도록 하려면 iOS에서 몇 가지 메서드를 구현해야 합니다.

`RCTWebView.mm` 파일을 열고 다음과 같이 수정합니다:

```diff title="RCTWebView.mm"
  // Event emitter convenience method
  - (const CustomWebViewEventEmitter &)eventEmitter
  {
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
  }

+  - (void)handleCommand:(const NSString *)commandName args:(const NSArray *)args
+  {
+  RCTCustomWebViewHandleCommand(self, commandName, args);
+  }
+
+  - (void)reload
+  {
+  [_webView reloadFromOrigin];
+  }

  + (ComponentDescriptorProvider)componentDescriptorProvider
  {
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
  }
```

뷰가 Native Commands에 응답하도록 하려면 다음 변경 사항을 적용해야 합니다:

1. `handleCommand:args` 함수를 추가합니다. 이 함수는 컴포넌트 인프라가 커맨드를 처리하기 위해 호출합니다. 함수 구현은 모든 컴포넌트에서 유사합니다: Codegen이 생성한 `RCT<componentNameInJS>HandleCommand` 함수를 호출해야 합니다. `RCT<componentNameInJS>HandleCommand`는 호출해야 하는 커맨드가 지원되는 커맨드 중에 있는지, 전달된 매개변수가 예상된 것과 일치하는지 검증합니다. 모든 검사가 통과되면 `RCT<componentNameInJS>HandleCommand`가 적절한 네이티브 메서드를 호출합니다.
2. `reload` 메서드를 구현합니다. 이 예시에서 `reload` 메서드는 WebKit의 WebView의 `reloadFromOrigin` 함수를 호출합니다.

</TabItem>
</Tabs>

## 5. 앱 실행

마지막으로 일반적인 명령으로 앱을 실행할 수 있습니다. 앱이 실행되면 새로 고침 버튼을 탭하여 페이지가 다시 로드되는 것을 확인할 수 있습니다.

| <center>Android</center>                                                                         | <center>iOS</center>                                                                         |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| <center><img src="/docs/assets/native-commands-android.gif" height="75%" width="75%" /></center> | <center><img src="/docs/assets/native-commands-ios.gif" height="75%" width="75%" /></center> |
