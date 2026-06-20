import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import constants from '@site/core/TabsConstants';
import CodeBlock from '@theme/CodeBlock';
import RNTemplateRepoLink from '@site/core/RNTemplateRepoLink';
import {getTemplateBranchNameForCurrentVersion} from '@site/src/getTemplateBranchNameForCurrentVersion';

## 핵심 개념

React Native 컴포넌트를 iOS 애플리케이션에 통합하기 위한 핵심 사항은 다음과 같습니다:

1. 올바른 디렉토리 구조 설정.
2. 필요한 NPM 의존성 설치.
3. Podfile 설정에 React Native 추가.
4. 첫 번째 React Native 화면을 위한 TypeScript 코드 작성.
5. `RCTRootView`를 사용하여 React Native와 iOS 코드 통합.
6. 번들러를 실행하고 앱이 동작하는 것을 확인하여 통합 테스트.

## 커뮤니티 템플릿 사용

이 가이드를 따르는 동안 [React Native Community Template](https://github.com/react-native-community/template/)을 참고 자료로 사용하는 것을 권장합니다. 이 템플릿에는 **최소한의 iOS 앱**이 포함되어 있으며 React Native를 기존 iOS 앱에 통합하는 방법을 이해하는 데 도움이 됩니다.

## 사전 요구 사항

[개발 환경 설정](set-up-your-environment) 가이드와 [프레임워크 없이 React Native 사용하기](getting-started-without-a-framework) 가이드를 따라 iOS용 React Native 앱을 빌드하기 위한 개발 환경을 설정하세요.
이 가이드는 `UIViewController` 생성 및 `Podfile` 파일 편집과 같은 iOS 개발의 기본 사항에 익숙하다는 것을 전제로 합니다.

### 1. 디렉토리 구조 설정

원활한 진행을 위해 통합 React Native 프로젝트를 위한 새 폴더를 만들고, **기존 iOS 프로젝트**를 `/ios` 하위 폴더로 **이동**하세요.

## 2. NPM 의존성 설치

루트 디렉토리로 이동하여 다음 명령어를 실행하세요:

<CodeBlock language="bash" title="shell">
{`curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/${getTemplateBranchNameForCurrentVersion()}/template/package.json`}
</CodeBlock>

이 명령어는 커뮤니티 템플릿의 `package.json` <RNTemplateRepoLink href="template/package.json">파일</RNTemplateRepoLink>을 프로젝트에 복사합니다.

다음으로 NPM 패키지를 설치하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install
```

</TabItem>
<TabItem value="yarn">

```shell
yarn install
```

</TabItem>
</Tabs>

설치 과정에서 새 `node_modules` 폴더가 생성됩니다. 이 폴더에는 프로젝트 빌드에 필요한 모든 JavaScript 의존성이 저장됩니다.

`.gitignore` 파일에 `node_modules/`를 추가하세요 (여기 <RNTemplateRepoLink href="template/_gitignore">커뮤니티 기본 파일</RNTemplateRepoLink> 참조).

### 3. 개발 도구 설치

### Xcode용 Command Line Tools

Command Line Tools를 설치하세요. Xcode 메뉴에서 **Settings... (또는 Preferences...)**를 선택하세요. Locations 패널로 이동하여 Command Line Tools 드롭다운에서 가장 최신 버전을 선택하여 도구를 설치하세요.

<ThemedImage
alt="Xcode Command Line Tools configuration"
sources={{
    light: '/docs/assets/GettingStartedXcodeCommandLineTools.png',
    dark: '/docs/assets/GettingStartedXcodeCommandLineToolsDark.png',
  }}
/>

### CocoaPods

[CocoaPods](https://cocoapods.org)는 iOS 및 macOS 개발을 위한 패키지 관리 도구입니다. 실제 React Native 프레임워크 코드를 현재 프로젝트에 로컬로 추가하는 데 사용합니다.

[Homebrew](https://brew.sh/)를 사용하여 CocoaPods를 설치하는 것을 권장합니다:

```shell
brew install cocoapods
```

## 4. 앱에 React Native 추가

### CocoaPods 설정

CocoaPods를 설정하려면 두 가지 파일이 필요합니다:

- 필요한 Ruby 의존성을 정의하는 **Gemfile**.
- 의존성을 올바르게 설치하는 방법을 정의하는 **Podfile**.

**Gemfile**을 위해 프로젝트의 루트 디렉토리로 이동하여 다음 명령어를 실행하세요:

<CodeBlock language="bash" title="shell">
{`curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/${getTemplateBranchNameForCurrentVersion()}/template/Gemfile`}
</CodeBlock>

이 명령어는 템플릿에서 Gemfile을 다운로드합니다.

:::note
Xcode 16으로 프로젝트를 생성한 경우 다음과 같이 Gemfile을 업데이트해야 합니다:

```diff
-gem 'cocoapods', '>= 1.13', '!= 1.15.0', '!= 1.15.1'
+gem 'cocoapods', '1.16.2'
gem 'activesupport', '>= 6.1.7.5', '!= 7.1.0'
-gem 'xcodeproj', '< 1.26.0'
+gem 'xcodeproj', '1.27.0'
```

Xcode 16은 이전 버전과 약간 다른 방식으로 프로젝트를 생성하므로, 올바르게 작동하려면 최신 CocoaPods 및 Xcodeproj gem이 필요합니다.
:::

마찬가지로 **Podfile**은 프로젝트의 `ios` 폴더로 이동하여 다음을 실행하세요:

<CodeBlock language="bash" title="shell">
{`curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/${getTemplateBranchNameForCurrentVersion()}/template/ios/Podfile`}
</CodeBlock>

<RNTemplateRepoLink href="template/Gemfile">Gemfile</RNTemplateRepoLink>과 <RNTemplateRepoLink href="template/ios/Podfile">Podfile</RNTemplateRepoLink>에 대한 참고 자료로 커뮤니티 템플릿을 사용하세요.

:::note
<RNTemplateRepoLink href="template/ios/Podfile#L17">이 줄</RNTemplateRepoLink>을 변경하는 것을 잊지 마세요.
:::

이제 Ruby gem과 Pod를 설치하기 위한 몇 가지 추가 명령어를 실행해야 합니다.
`ios` 폴더로 이동하여 다음 명령어를 실행하세요:

```sh
bundle install
bundle exec pod install
```

첫 번째 명령어는 Ruby 의존성을 설치하고, 두 번째 명령어는 실제로 React Native 코드를 애플리케이션에 통합하여 iOS 파일이 React Native 헤더를 가져올 수 있게 합니다.

## 5. TypeScript 코드 작성

이제 실제로 네이티브 iOS 애플리케이션을 수정하여 React Native를 통합합니다.

먼저 작성할 코드는 애플리케이션에 통합될 새 화면을 위한 실제 React Native 코드입니다.

### `index.js` 파일 생성

먼저 React Native 프로젝트의 루트에 빈 `index.js` 파일을 생성하세요.

`index.js`는 React Native 애플리케이션의 시작점이며 항상 필요합니다. React Native 컴포넌트나 애플리케이션의 일부인 다른 파일을 `import`하는 작은 파일일 수도 있고, 필요한 모든 코드를 포함할 수도 있습니다.

`index.js`는 다음과 같아야 합니다 (여기 <RNTemplateRepoLink href="template/index.js">커뮤니티 템플릿 파일을 참고</RNTemplateRepoLink>):

```js
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('HelloWorld', () => App);
```

### `App.tsx` 파일 생성

`App.tsx` 파일을 생성하겠습니다. 이것은 [JSX](<https://en.wikipedia.org/wiki/JSX_(JavaScript)>) 표현식을 포함할 수 있는 [TypeScript](https://www.typescriptlang.org/) 파일입니다. iOS 애플리케이션에 통합할 루트 React Native 컴포넌트가 포함됩니다 (<RNTemplateRepoLink href="template/App.tsx">링크</RNTemplateRepoLink>):

```tsx
import {type JSX} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode
              ? Colors.black
              : Colors.white,
            padding: 24,
          }}>
          <Text style={styles.title}>Step One</Text>
          <Text>
            Edit <Text style={styles.bold}>App.tsx</Text> to
            change this screen and see your edits.
          </Text>
          <Text style={styles.title}>See your changes</Text>
          <ReloadInstructions />
          <Text style={styles.title}>Debug</Text>
          <DebugInstructions />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

여기 <RNTemplateRepoLink href="template/App.tsx">참고용 커뮤니티 템플릿 파일</RNTemplateRepoLink>이 있습니다.

## 5. iOS 코드와 통합

이제 React Native 런타임을 시작하고 React 컴포넌트를 렌더링하도록 지시하기 위한 네이티브 코드를 추가해야 합니다.

### 요구 사항

React Native 초기화는 이제 iOS 앱의 특정 부분에 종속되지 않습니다.

React Native는 `RCTReactNativeFactory`라는 클래스를 사용하여 초기화할 수 있으며, 이 클래스는 React Native 라이프사이클 처리를 담당합니다.

클래스가 초기화되면 `UIWindow` 객체를 제공하여 React Native 뷰를 시작하거나, 팩토리에 임의의 `UIViewController`에 로드할 수 있는 `UIView` 생성을 요청할 수 있습니다.

다음 예시에서는 React Native 뷰를 `view`로 로드할 수 있는 ViewController를 생성합니다.

#### ReactViewController 생성

템플릿에서 새 파일을 생성하고(<kbd>⌘</kbd>+<kbd>N</kbd>) Cocoa Touch Class 템플릿을 선택하세요.

"Subclass of" 필드에서 `UIViewController`를 선택해야 합니다.

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

이제 `ReactViewController.m` 파일을 열고 다음 변경 사항을 적용하세요:

```diff title="ReactViewController.m"
#import "ReactViewController.h"
+#import <React/RCTBundleURLProvider.h>
+#import <RCTReactNativeFactory.h>
+#import <RCTDefaultReactNativeFactoryDelegate.h>
+#import <RCTAppDependencyProvider.h>


@interface ReactViewController ()

@end

+@interface ReactNativeFactoryDelegate: RCTDefaultReactNativeFactoryDelegate
+@end

-@implementation ReactViewController
+@implementation ReactViewController {
+  RCTReactNativeFactory *_factory;
+  id<RCTReactNativeFactoryDelegate> _factoryDelegate;
+}

 - (void)viewDidLoad {
     [super viewDidLoad];
     // Do any additional setup after loading the view.
+    _factoryDelegate = [ReactNativeFactoryDelegate new];
+    _factoryDelegate.dependencyProvider = [RCTAppDependencyProvider new];
+    _factory = [[RCTReactNativeFactory alloc] initWithDelegate:_factoryDelegate];
+    self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
 }

@end

+@implementation ReactNativeFactoryDelegate
+
+- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
+{
+  return [self bundleURL];
+}
+
+- (NSURL *)bundleURL
+{
+#if DEBUG
+  return [RCTBundleURLProvider.sharedSettings jsBundleURLForBundleRoot:@"index"];
+#else
+  return [NSBundle.mainBundle URLForResource:@"main" withExtension:@"jsbundle"];
+#endif
+}

@end

```

</TabItem>
<TabItem value="swift">

이제 `ReactViewController.swift` 파일을 열고 다음 변경 사항을 적용하세요:

```diff title="ReactViewController.swift"
import UIKit
+import React
+import React_RCTAppDelegate
+import ReactAppDependencyProvider

class ReactViewController: UIViewController {
+  var reactNativeFactory: RCTReactNativeFactory?
+  var reactNativeFactoryDelegate: RCTReactNativeFactoryDelegate?

  override func viewDidLoad() {
    super.viewDidLoad()
+    reactNativeFactoryDelegate = ReactNativeDelegate()
+    reactNativeFactoryDelegate!.dependencyProvider = RCTAppDependencyProvider()
+    reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeFactoryDelegate!)
+    view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld")

  }
}

+class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
+    override func sourceURL(for bridge: RCTBridge) -> URL? {
+      self.bundleURL()
+    }
+
+    override func bundleURL() -> URL? {
+      #if DEBUG
+      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
+      #else
+      Bundle.main.url(forResource: "main", withExtension: "jsbundle")
+      #endif
+    }
+
+}
```

</TabItem>
</Tabs>

#### rootViewController에 React Native 뷰 표시

마지막으로 React Native 뷰를 표시할 수 있습니다. 이를 위해 JS 콘텐츠를 로드할 수 있는 뷰를 호스팅할 새 View Controller가 필요합니다.
이미 초기 `ViewController`가 있으며, 이를 통해 `ReactViewController`를 표시할 수 있습니다. 방법은 여러 가지가 있으며 앱에 따라 다릅니다. 이 예시에서는 React Native를 모달로 표시하는 버튼이 있다고 가정합니다.

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

```diff title="ViewController.m"
#import "ViewController.h"
+#import "ReactViewController.h"

@interface ViewController ()

@end

- @implementation ViewController
+@implementation ViewController {
+  ReactViewController *reactViewController;
+}

 - (void)viewDidLoad {
   [super viewDidLoad];
   // Do any additional setup after loading the view.
   self.view.backgroundColor = UIColor.systemBackgroundColor;
+  UIButton *button = [UIButton new];
+  [button setTitle:@"Open React Native" forState:UIControlStateNormal];
+  [button setTitleColor:UIColor.systemBlueColor forState:UIControlStateNormal];
+  [button setTitleColor:UIColor.blueColor forState:UIControlStateHighlighted];
+  [button addTarget:self action:@selector(presentReactNative) forControlEvents:UIControlEventTouchUpInside];
+  [self.view addSubview:button];

+  button.translatesAutoresizingMaskIntoConstraints = NO;
+  [NSLayoutConstraint activateConstraints:@[
+    [button.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
+    [button.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
+    [button.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
+    [button.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
+  ]];
 }

+- (void)presentReactNative
+{
+  if (reactViewController == NULL) {
+    reactViewController = [ReactViewController new];
+  }
+  [self presentViewController:reactViewController animated:YES];
+}

@end
```

</TabItem>
<TabItem value="swift">

```diff title="ViewController.swift"
import UIKit

class ViewController: UIViewController {

+  var reactViewController: ReactViewController?

  override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.
    self.view.backgroundColor = .systemBackground

+    let button = UIButton()
+    button.setTitle("Open React Native", for: .normal)
+    button.setTitleColor(.systemBlue, for: .normal)
+    button.setTitleColor(.blue, for: .highlighted)
+    button.addAction(UIAction { [weak self] _ in
+      guard let self else { return }
+      if reactViewController == nil {
+       reactViewController = ReactViewController()
+      }
+      present(reactViewController!, animated: true)
+    }, for: .touchUpInside)
+    self.view.addSubview(button)
+
+    button.translatesAutoresizingMaskIntoConstraints = false
+    NSLayoutConstraint.activate([
+      button.leadingAnchor.constraint(equalTo: self.view.leadingAnchor),
+      button.trailingAnchor.constraint(equalTo: self.view.trailingAnchor),
+      button.centerXAnchor.constraint(equalTo: self.view.centerXAnchor),
+      button.centerYAnchor.constraint(equalTo: self.view.centerYAnchor),
+    ])
  }
}
```

</TabItem>
</Tabs>

Sandbox 스크립팅을 비활성화해야 합니다. 이를 위해 Xcode에서 앱을 클릭하고 빌드 설정으로 이동하세요. "script"로 필터링하고 `User Script Sandboxing`을 `NO`로 설정하세요. 이 단계는 React Native와 함께 제공되는 [Hermes 엔진](https://github.com/facebook/hermes/blob/main/README.md)의 Debug 버전과 Release 버전 간 전환을 올바르게 수행하는 데 필요합니다.

![Disable Sandboxing](/docs/assets/disable-sandboxing.png)

마지막으로 `Info.plist` 파일에 `UIViewControllerBasedStatusBarAppearance` 키를 추가하고 값을 `NO`로 설정하세요.

![Disable UIViewControllerBasedStatusBarAppearance](/docs/assets/disable-UIViewControllerBasedStatusBarAppearance.png)

## 6. 통합 테스트

애플리케이션에 React Native를 통합하기 위한 모든 기본 단계를 완료했습니다. 이제 [Metro 번들러](https://metrobundler.dev/)를 시작하여 TypeScript 애플리케이션 코드를 번들로 빌드합니다. Metro의 HTTP 서버는 개발자 환경의 `localhost`에서 시뮬레이터나 기기로 번들을 공유합니다. 이를 통해 [핫 리로딩](https://reactnative.dev/blog/2016/03/24/introducing-hot-reloading)이 가능합니다.

먼저 프로젝트 루트에 다음과 같이 `metro.config.js` 파일을 생성해야 합니다:

```js
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

커뮤니티 템플릿 파일의 <RNTemplateRepoLink href="template/metro.config.js">`metro.config.js` 파일</RNTemplateRepoLink>을 참고 자료로 확인할 수 있습니다.

그런 다음 프로젝트 루트에 `.watchmanconfig` 파일을 생성해야 합니다. 이 파일에는 빈 json 객체가 포함되어야 합니다:

```sh
echo {} > .watchmanconfig
```

설정 파일이 준비되면 번들러를 실행할 수 있습니다. 프로젝트 루트 디렉토리에서 다음 명령어를 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn start
```

</TabItem>
</Tabs>

이제 iOS 앱을 평소처럼 빌드하고 실행하세요.

앱 내에서 React로 구동되는 Activity에 도달하면 개발 서버에서 JavaScript 코드를 로드하고 다음을 표시합니다:

<center><img src="/docs/assets/EmbeddedAppIOS078.gif" width="300" /></center>

### Xcode에서 릴리즈 빌드 생성

Xcode를 사용하여 릴리즈 빌드도 생성할 수 있습니다. 유일한 추가 단계는 앱이 빌드될 때 실행되어 JS와 이미지를 iOS 애플리케이션에 패키징하는 스크립트를 추가하는 것입니다.

1. Xcode에서 애플리케이션을 선택합니다.
2. `Build Phases`를 클릭합니다.
3. 왼쪽 상단의 `+`를 클릭하고 `New Run Script Phase`를 선택합니다.
4. `Run Script` 줄을 클릭하고 스크립트 이름을 `Bundle React Native code and images`로 변경합니다.
5. 텍스트 박스에 다음 스크립트를 붙여넣습니다:

```sh title="Build React Native code and image"
set -e

WITH_ENVIRONMENT="$REACT_NATIVE_PATH/scripts/xcode/with-environment.sh"
REACT_NATIVE_XCODE="$REACT_NATIVE_PATH/scripts/react-native-xcode.sh"

/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

6. `[CP] Embed Pods Frameworks`라는 스크립트 앞으로 드래그 앤 드롭하세요.

이제 릴리즈용으로 앱을 빌드하면 예상대로 작동합니다.

## 7. React Native 뷰에 초기 props 전달

경우에 따라 네이티브 앱에서 JavaScript로 일부 정보를 전달하고 싶을 수 있습니다. 예를 들어, 현재 로그인한 사용자의 ID와 데이터베이스에서 정보를 가져오는 데 사용할 수 있는 토큰을 React Native에 전달하고 싶을 수 있습니다.

이는 `RCTReactNativeFactory` 클래스의 `view(withModuleName:initialProperty)` 오버로드의 `initialProperties` 파라미터를 사용하여 가능합니다. 다음 단계에서 방법을 보여줍니다.

### 초기 properties를 읽도록 App.tsx 파일 업데이트

`App.tsx` 파일을 열고 다음 코드를 추가하세요:

```diff title="App.tsx"
import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

-function App(): React.JSX.Element {
+function App(props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
-       <View
-         style={{
-           backgroundColor: isDarkMode
-             ? Colors.black
-             : Colors.white,
-           padding: 24,
-         }}>
-         <Text style={styles.title}>Step One</Text>
-         <Text>
-           Edit <Text style={styles.bold}>App.tsx</Text> to
-           change this screen and see your edits.
-         </Text>
-         <Text style={styles.title}>See your changes</Text>
-         <ReloadInstructions />
-         <Text style={styles.title}>Debug</Text>
-         <DebugInstructions />
+         <Text style={styles.title}>UserID: {props.userID}</Text>
+         <Text style={styles.title}>Token: {props.token}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
+   marginLeft: 20,
  },
  bold: {
    fontWeight: '700',
  },
});

export default App;
```

이 변경 사항은 React Native에 App 컴포넌트가 이제 일부 properties를 받아들인다는 것을 알립니다. `RCTreactNativeFactory`는 컴포넌트가 렌더링될 때 해당 props를 전달하는 역할을 담당합니다.

### 초기 properties를 JavaScript에 전달하도록 네이티브 코드 업데이트

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

초기 properties를 JavaScript에 전달하도록 `ReactViewController.mm`을 수정하세요.

```diff title="ReactViewController.mm"
 - (void)viewDidLoad {
   [super viewDidLoad];
   // Do any additional setup after loading the view.

   _factoryDelegate = [ReactNativeFactoryDelegate new];
   _factoryDelegate.dependencyProvider = [RCTAppDependencyProvider new];
   _factory = [[RCTReactNativeFactory alloc] initWithDelegate:_factoryDelegate];
-  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
+  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld" initialProperties:@{
+    @"userID": @"12345678",
+    @"token": @"secretToken"
+  }];
}
```

</TabItem>
<TabItem value="swift">

초기 properties를 React Native 뷰에 전달하도록 `ReactViewController.swift`를 수정하세요.

```diff title="ReactViewController.swift"
  override func viewDidLoad() {
    super.viewDidLoad()
    reactNativeFactoryDelegate = ReactNativeDelegate()
    reactNativeFactoryDelegate!.dependencyProvider = RCTAppDependencyProvider()
    reactNativeFactory = RCTReactNativeFactory(delegate: reactNativeFactoryDelegate!)
-   view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld")
+   view = reactNativeFactory!.rootViewFactory.view(withModuleName: "HelloWorld" initialProperties: [
+     "userID": "12345678",
+     "token": "secretToken"
+])

  }
}
```

</TabItem>
</Tabs>

3. 앱을 다시 실행하세요. `ReactViewController`를 표시하면 다음 화면이 나타납니다:

<center>
  <img src="/docs/assets/brownfield-with-initial-props.png" width="30%" height="30%"/>
</center>

## 다음 단계

이 시점부터 평소처럼 앱을 계속 개발할 수 있습니다. React Native로 작업하는 방법에 대해 더 알아보려면 [디버깅](debugging) 및 [배포](running-on-device) 문서를 참조하세요.
