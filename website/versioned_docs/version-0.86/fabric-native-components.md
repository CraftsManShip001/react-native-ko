---
id: fabric-native-components-introduction
title: Fabric Native Components 소개
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import {FabricNativeComponentsAndroid,FabricNativeComponentsIOS} from './\_fabric-native-components';

# Native Components

Android의 고유한 [CheckBox](https://developer.android.com/reference/androidx/appcompat/widget/AppCompatCheckBox)나 iOS의 [UIButton](https://developer.apple.com/documentation/uikit/uibutton?language=objc)처럼 [Host Component](https://reactnative.dev/architecture/glossary#host-view-tree-and-host-view)를 감싸는 _새로운_ React Native 컴포넌트를 빌드하고 싶다면, Fabric Native Component를 사용해야 합니다.

이 가이드에서는 웹 뷰 컴포넌트를 구현하여 Fabric Native Component를 빌드하는 방법을 보여줍니다. 이를 위한 단계는 다음과 같습니다.

1. Flow 또는 TypeScript를 사용하여 JavaScript 명세를 정의합니다.
2. 제공된 명세에서 코드를 생성하고 자동 링크되도록 의존성 관리 시스템을 구성합니다.
3. 네이티브 코드를 구현합니다.
4. 앱에서 컴포넌트를 사용합니다.

컴포넌트를 사용하기 위한 일반 템플릿으로 생성된 애플리케이션이 필요합니다.

```bash
npx @react-native-community/cli@latest init Demo --install-pods false
```

## WebView 컴포넌트 만들기

이 가이드에서는 Web View 컴포넌트를 생성하는 방법을 보여줍니다. Android의 [`WebView`](https://developer.android.com/reference/android/webkit/WebView) 컴포넌트와 iOS의 [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview?language=objc) 컴포넌트를 사용하여 컴포넌트를 생성합니다.

컴포넌트 코드를 담을 폴더 구조를 먼저 만들어 봅시다.

```bash
mkdir -p Demo/{specs,android/app/src/main/java/com/webview}
```

이렇게 하면 작업할 다음과 같은 레이아웃이 만들어집니다.

```
Demo
├── android/app/src/main/java/com/webview
└── ios
└── specs
```

- `android/app/src/main/java/com/webview` 폴더는 Android 코드를 담을 폴더입니다.
- `ios` 폴더는 iOS 코드를 담을 폴더입니다.
- `specs` 폴더는 Codegen의 명세 파일을 담을 폴더입니다.

## 1. Codegen을 위한 명세 정의

명세는 반드시 [TypeScript](https://www.typescriptlang.org/) 또는 [Flow](https://flow.org/)로 정의되어야 합니다(자세한 내용은 [Codegen](the-new-architecture/what-is-codegen) 문서를 참조하세요). 이는 Codegen이 플랫폼 코드를 React가 실행되는 JavaScript 런타임에 연결하는 C++, Objective-C++, Java 코드를 생성하는 데 사용됩니다.

명세 파일은 Codegen과 함께 작동하려면 `<MODULE_NAME>NativeComponent.{ts|js}` 형식으로 명명되어야 합니다. `NativeComponent` 접미사는 단순한 컨벤션이 아니라, Codegen이 명세 파일을 감지하는 데 실제로 사용됩니다.

WebView 컴포넌트에 다음 명세를 사용하세요.

<Tabs groupId="language" queryString defaultValue={constants.defaultJavaScriptSpecLanguage} values={constants.javaScriptSpecLanguages}>
<TabItem value="typescript">

```typescript title="Demo/specs/WebViewNativeComponent.ts"
import type {
  CodegenTypes,
  HostComponent,
  ViewProps,
} from 'react-native';
import {codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = {
  result: 'success' | 'error';
};

export interface NativeProps extends ViewProps {
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent> | null;
}

export default codegenNativeComponent<NativeProps>(
  'CustomWebView',
) as HostComponent<NativeProps>;
```

</TabItem>
<TabItem value="flow">

```ts title="Demo/RCTWebView/js/RCTWebViewNativeComponent.js":
// @flow strict-local

import type {CodegenTypes, HostComponent, ViewProps} from 'react-native';
import {codegenNativeComponent} from 'react-native';

type WebViewScriptLoadedEvent = $ReadOnly<{|
  result: "success" | "error",
|}>;

type NativeProps = $ReadOnly<{|
  ...ViewProps,
  sourceURL?: string;
  onScriptLoaded?: CodegenTypes.BubblingEventHandler<WebViewScriptLoadedEvent>?;
|}>;

export default (codegenNativeComponent<NativeProps>(
  'CustomWebView',
): HostComponent<NativeProps>);

```

</TabItem>
</Tabs>

이 명세는 imports를 제외하고 세 가지 주요 부분으로 구성됩니다.

- `WebViewScriptLoadedEvent`는 이벤트가 네이티브에서 JavaScript로 전달해야 하는 데이터를 위한 지원 데이터 타입입니다.
- `NativeProps`는 컴포넌트에 설정할 수 있는 props의 정의입니다.
- `codegenNativeComponent` 구문은 커스텀 컴포넌트의 코드를 생성 가능하게 하고 네이티브 구현과 매칭하는 데 사용되는 컴포넌트 이름을 정의합니다.

Native Modules와 마찬가지로, `specs/` 디렉터리에 여러 명세 파일을 가질 수 있습니다. 사용할 수 있는 타입과 이에 대응하는 플랫폼 타입에 대한 자세한 내용은 [부록](appendix.md)을 참조하세요.

## 2. Codegen 실행 구성

명세는 React Native의 Codegen 도구가 플랫폼별 인터페이스와 보일러플레이트를 생성하는 데 사용됩니다. 이를 위해 Codegen은 명세를 어디서 찾고 어떻게 처리할지 알아야 합니다. 다음을 포함하도록 `package.json`을 업데이트하세요.

```json package.json
    "start": "react-native start",
    "test": "jest"
  },
  // highlight-start
  "codegenConfig": {
    "name": "AppSpec",
    "type": "components",
    "jsSrcsDir": "specs",
    "android": {
      "javaPackageName": "com.webview"
    },
    "ios": {
      "componentProvider": {
        "CustomWebView": "RCTWebView"
      }
    }
  },
  // highlight-end
  "dependencies": {
```

Codegen을 위한 모든 설정이 완료되면, 생성된 코드와 연결하기 위해 네이티브 코드를 준비해야 합니다.

iOS의 경우, 명세에서 내보낸 JS 컴포넌트 이름(`CustomWebView`)을 컴포넌트를 네이티브로 구현할 iOS 클래스와 선언적으로 매핑하고 있다는 점에 유의하세요.

## 2. 네이티브 코드 빌드

이제 React가 뷰를 렌더링하도록 요청할 때 플랫폼이 올바른 네이티브 뷰를 생성하고 화면에 렌더링할 수 있도록 네이티브 플랫폼 코드를 작성할 차례입니다.

Android와 iOS 플랫폼 모두에서 작업해야 합니다.

:::note
이 가이드에서는 New Architecture에서만 작동하는 Native Component를 만드는 방법을 보여줍니다. New Architecture와 Legacy Architecture를 모두 지원해야 한다면 [하위 호환성 가이드](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/backwards-compat.md)를 참조하세요.

:::

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
    <TabItem value="android" label="Android">
        <FabricNativeComponentsAndroid />
    </TabItem>
    <TabItem value="ios" label="iOS">
        <FabricNativeComponentsIOS />
    </TabItem>
</Tabs>

## 3. 네이티브 컴포넌트 사용

마지막으로, 앱에서 새 컴포넌트를 사용할 수 있습니다. 생성된 `App.tsx`를 다음과 같이 업데이트하세요.

```javascript title="Demo/App.tsx"
import {Alert, StyleSheet, View} from 'react-native';
import WebView from './specs/WebViewNativeComponent';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <WebView
        sourceURL="https://react.dev/"
        style={styles.webview}
        onScriptLoaded={() => {
          Alert.alert('Page Loaded');
        }}
      />
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
    height: '100%',
  },
});

export default App;
```

이 코드는 새로 만든 `WebView` 컴포넌트를 사용하여 `react.dev` 웹사이트를 로드하는 앱을 생성합니다.

앱은 웹 페이지가 로드될 때 알림도 표시합니다.

## 4. WebView 컴포넌트를 사용하여 앱 실행

<Tabs groupId="platforms" queryString defaultValue={constants.defaultPlatform}>
<TabItem value="android" label="Android">
```bash
yarn run android
```
</TabItem>
<TabItem value="ios" label="iOS">
```bash
yarn run ios
```
</TabItem>
</Tabs>

|                                      Android                                      |                                     iOS                                      |
| :-------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| <img style={{ "max-height": "600px" }} src="/docs/assets/webview-android.webp" /> | <img style={{"max-height": "600px" }} src="/docs/assets/webview-ios.webp" /> |
