import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import CodeBlock from '@theme/CodeBlock';
import RNTemplateRepoLink from '@site/core/RNTemplateRepoLink';
import {getTemplateBranchNameForCurrentVersion} from '@site/src/getTemplateBranchNameForCurrentVersion';

## 핵심 개념

React Native 컴포넌트를 Android 애플리케이션에 통합하기 위한 핵심 사항은 다음과 같습니다:

1. 올바른 디렉토리 구조를 설정합니다.
2. 필요한 NPM 의존성을 설치합니다.
3. React Native를 Gradle 설정에 추가합니다.
4. 첫 번째 React Native 화면을 위한 TypeScript 코드를 작성합니다.
5. ReactActivity를 사용하여 React Native를 Android 코드와 통합합니다.
6. 번들러를 실행하고 앱이 동작하는 것을 확인하여 통합을 테스트합니다.

## 커뮤니티 템플릿 사용

이 가이드를 따라 진행하면서, [React Native Community Template](https://github.com/react-native-community/template/)을 참고용으로 사용하는 것을 권장합니다. 해당 템플릿에는 **최소한의 Android 앱**이 포함되어 있으며, React Native를 기존 Android 앱에 통합하는 방법을 이해하는 데 도움이 됩니다.

## 사전 준비

[개발 환경 설정](set-up-your-environment) 가이드와 [프레임워크 없이 React Native 사용하기](getting-started-without-a-framework) 가이드를 따라 Android용 React Native 앱을 빌드하기 위한 개발 환경을 구성하세요.
이 가이드는 또한 Activity 생성 및 `AndroidManifest.xml` 파일 편집과 같은 Android 개발 기초에 익숙하다고 가정합니다.

## 1. 디렉토리 구조 설정

원활한 진행을 위해, 통합된 React Native 프로젝트를 위한 새 폴더를 생성하고, **기존 Android 프로젝트**를 `/android` 하위 폴더로 **이동**하세요.

## 2. NPM 의존성 설치

루트 디렉토리로 이동한 후 다음 명령어를 실행하세요:

<CodeBlock language="bash" title="shell">
{`curl -O https://raw.githubusercontent.com/react-native-community/template/refs/heads/${getTemplateBranchNameForCurrentVersion()}/template/package.json`}
</CodeBlock>

이 명령어는 Community 템플릿의 `package.json` <RNTemplateRepoLink href="template/package.json">파일</RNTemplateRepoLink>을 프로젝트에 복사합니다.

다음으로, NPM 패키지를 설치합니다:

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

설치 과정에서 새로운 `node_modules` 폴더가 생성됩니다. 이 폴더에는 프로젝트 빌드에 필요한 모든 JavaScript 의존성이 저장됩니다.

`node_modules/`를 `.gitignore` 파일에 추가하세요 (여기 <RNTemplateRepoLink href="template/_gitignore">Community 기본 설정 파일</RNTemplateRepoLink>을 참고하세요).

## 3. 앱에 React Native 추가

### Gradle 설정

React Native는 React Native Gradle Plugin을 사용하여 의존성 및 프로젝트 설정을 구성합니다.

먼저, `settings.gradle` 파일을 다음 내용과 같이 편집합니다 (<RNTemplateRepoLink href="template/android/settings.gradle">Community 템플릿</RNTemplateRepoLink> 참고):

```groovy
// Configures the React Native Gradle Settings plugin used for autolinking
pluginManagement { includeBuild("../node_modules/@react-native/gradle-plugin") }
plugins { id("com.facebook.react.settings") }
extensions.configure(com.facebook.react.ReactSettingsExtension){ ex -> ex.autolinkLibrariesFromCommand() }
// If using .gradle.kts files:
// extensions.configure<com.facebook.react.ReactSettingsExtension> { autolinkLibrariesFromCommand() }
includeBuild("../node_modules/@react-native/gradle-plugin")

// Include your existing Gradle modules here.
// include(":app")
```

그런 다음 최상위 `build.gradle`을 열고 다음 줄을 추가합니다 (<RNTemplateRepoLink href="template/android/build.gradle">Community 템플릿</RNTemplateRepoLink> 참고):

```diff
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.3.1")
+       classpath("com.facebook.react:react-native-gradle-plugin")
    }
}
```

이렇게 하면 프로젝트 내에서 React Native Gradle Plugin(RNGP)을 사용할 수 있게 됩니다.
마지막으로, 애플리케이션의 `build.gradle` 파일(보통 `app` 폴더 안에 있는 별도의 `build.gradle` 파일)에 다음 내용을 추가합니다 (<RNTemplateRepoLink href="template/android/build.gradle">Community 템플릿 파일</RNTemplateRepoLink> 참고):

```diff
apply plugin: "com.android.application"
+apply plugin: "com.facebook.react"

repositories {
    mavenCentral()
}

dependencies {
    // Other dependencies here
+   // Note: we intentionally don't specify the version number here as RNGP will take care of it.
+   // If you don't use the RNGP, you'll have to specify version manually.
+   implementation("com.facebook.react:react-android")
+   implementation("com.facebook.react:hermes-android")
}

+react {
+   // Needed to enable Autolinking - https://github.com/react-native-community/cli/blob/master/docs/autolinking.md
+   autolinkLibrariesWithApp()
+}
```

마지막으로, 애플리케이션의 `gradle.properties` 파일을 열고 다음 줄을 추가합니다 (<RNTemplateRepoLink href="template/android/gradle.properties">Community 템플릿 파일</RNTemplateRepoLink> 참고):

```diff
+reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
+newArchEnabled=true
+hermesEnabled=true
```

### 매니페스트 설정

먼저, `AndroidManifest.xml`에 인터넷 권한이 있는지 확인하세요:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

+   <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">
    </application>
</manifest>
```

그런 다음 **디버그** `AndroidManifest.xml`에서 [일반 텍스트 트래픽](https://developer.android.com/training/articles/security-config#CleartextTrafficPermitted)을 활성화해야 합니다:

```diff
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
+       android:usesCleartextTraffic="true"
+       tools:targetApi="28"
    />
</manifest>
```

참고용으로 Community 템플릿의 AndroidManifest.xml 파일을 사용할 수 있습니다: <RNTemplateRepoLink href="template/android/app/src/main/AndroidManifest.xml">main</RNTemplateRepoLink> 및 <RNTemplateRepoLink href="template/android/app/src/debug/AndroidManifest.xml">debug</RNTemplateRepoLink>.

이는 애플리케이션이 HTTP를 통해 로컬 번들러인 [Metro](https://metrobundler.dev/)와 통신하기 때문에 필요합니다.

이 설정은 반드시 **디버그** 매니페스트에만 추가하세요.

## 4. TypeScript 코드 작성

이제 React Native를 통합하기 위해 네이티브 Android 애플리케이션을 수정합니다.

처음으로 작성할 코드는 애플리케이션에 통합될 새 화면을 위한 실제 React Native 코드입니다.

### `index.js` 파일 생성

먼저, React Native 프로젝트 루트에 빈 `index.js` 파일을 생성합니다.

`index.js`는 React Native 애플리케이션의 시작점이며, 항상 필요합니다. React Native 컴포넌트나 애플리케이션의 일부인 다른 파일을 `import`하는 소규모 파일이 될 수도 있고, 필요한 모든 코드를 포함할 수도 있습니다.

`index.js`는 다음과 같이 작성합니다 (<RNTemplateRepoLink href="template/index.js">Community 템플릿 파일</RNTemplateRepoLink> 참고):

```js
import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('HelloWorld', () => App);
```

### `App.tsx` 파일 생성

`App.tsx` 파일을 생성합니다. 이 파일은 [JSX](<https://en.wikipedia.org/wiki/JSX_(JavaScript)>) 표현식을 포함할 수 있는 [TypeScript](https://www.typescriptlang.org/) 파일입니다. Android 애플리케이션에 통합할 루트 React Native 컴포넌트를 포함합니다 (<RNTemplateRepoLink href="template/App.tsx">링크</RNTemplateRepoLink>):

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

여기 <RNTemplateRepoLink href="template/App.tsx">Community 템플릿 파일</RNTemplateRepoLink>을 참고하세요.

## 5. Android 코드와 통합

이제 React Native 런타임을 시작하고 React 컴포넌트를 렌더링하도록 지시하기 위해 네이티브 코드를 추가해야 합니다.

### Application 클래스 업데이트

먼저, `Application` 클래스를 다음과 같이 React Native를 올바르게 초기화하도록 업데이트해야 합니다:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```diff
package <your-package-here>;

import android.app.Application;
+import com.facebook.react.PackageList;
+import com.facebook.react.ReactApplication;
+import com.facebook.react.ReactHost;
+import com.facebook.react.ReactNativeHost;
+import com.facebook.react.ReactPackage;
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
+import com.facebook.react.defaults.DefaultReactHost;
+import com.facebook.react.defaults.DefaultReactNativeHost;
+import com.facebook.soloader.SoLoader;
+import com.facebook.react.soloader.OpenSourceMergedSoMapping
+import java.util.List;

-class MainApplication extends Application {
+class MainApplication extends Application implements ReactApplication {
+ @Override
+ public ReactNativeHost getReactNativeHost() {
+   return new DefaultReactNativeHost(this) {
+     @Override
+     protected List<ReactPackage> getPackages() { return new PackageList(this).getPackages(); }
+     @Override
+     protected String getJSMainModuleName() { return "index"; }
+     @Override
+     public boolean getUseDeveloperSupport() { return BuildConfig.DEBUG; }
+     @Override
+     protected boolean isNewArchEnabled() { return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED; }
+     @Override
+     protected Boolean isHermesEnabled() { return BuildConfig.IS_HERMES_ENABLED; }
+   };
+ }

+ @Override
+ public ReactHost getReactHost() {
+   return DefaultReactHost.getDefaultReactHost(getApplicationContext(), getReactNativeHost());
+ }

  @Override
  public void onCreate() {
    super.onCreate();
+   SoLoader.init(this, OpenSourceMergedSoMapping);
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     DefaultNewArchitectureEntryPoint.load();
+   }
  }
}
```

</TabItem>

<TabItem value="kotlin">

```diff
// package <your-package-here>

import android.app.Application
+import com.facebook.react.PackageList
+import com.facebook.react.ReactApplication
+import com.facebook.react.ReactHost
+import com.facebook.react.ReactNativeHost
+import com.facebook.react.ReactPackage
+import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
+import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
+import com.facebook.react.defaults.DefaultReactNativeHost
+import com.facebook.soloader.SoLoader
+import com.facebook.react.soloader.OpenSourceMergedSoMapping

-class MainApplication : Application() {
+class MainApplication : Application(), ReactApplication {

+ override val reactNativeHost: ReactNativeHost =
+      object : DefaultReactNativeHost(this) {
+        override fun getPackages(): List<ReactPackage> = PackageList(this).packages
+        override fun getJSMainModuleName(): String = "index"
+        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
+        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
+        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
+      }

+ override val reactHost: ReactHost
+   get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
+   SoLoader.init(this, OpenSourceMergedSoMapping)
+   if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
+     load()
+   }
  }
}
```

</TabItem>
</Tabs>

참고용으로 <RNTemplateRepoLink href="template/android/app/src/main/java/com/helloworld/MainApplication.kt">`MainApplication.kt` Community 템플릿 파일</RNTemplateRepoLink>을 사용할 수 있습니다.

#### `ReactActivity` 생성

마지막으로, `ReactActivity`를 상속하여 React Native 코드를 호스팅할 새로운 `Activity`를 생성해야 합니다. 이 Activity는 React Native 런타임을 시작하고 React 컴포넌트를 렌더링하는 역할을 담당합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
// package <your-package-here>;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MyReactActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "HelloWorld";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new DefaultReactActivityDelegate(this, getMainComponentName(), DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }
}
```

</TabItem>

<TabItem value="kotlin">

```kotlin
// package <your-package-here>

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MyReactActivity : ReactActivity() {

    override fun getMainComponentName(): String = "HelloWorld"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

</TabItem>
</Tabs>

참고용으로 <RNTemplateRepoLink href="template/android/app/src/main/java/com/helloworld/MainActivity.kt">`MainActivity.kt` Community 템플릿 파일</RNTemplateRepoLink>을 사용할 수 있습니다.

새로운 Activity를 생성할 때마다 `AndroidManifest.xml` 파일에 추가해야 합니다. 또한 `MyReactActivity`의 테마를 `Theme.AppCompat.Light.NoActionBar`(또는 ActionBar가 없는 테마)로 설정해야 합니다. 그렇지 않으면 React Native 화면 위에 ActionBar가 렌더링됩니다:

```diff
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
      android:name=".MainApplication">

+     <activity
+       android:name=".MyReactActivity"
+       android:label="@string/app_name"
+       android:theme="@style/Theme.AppCompat.Light.NoActionBar">
+     </activity>
    </application>
</manifest>
```

이제 Activity에서 JavaScript 코드를 실행할 준비가 되었습니다.

## 6. 통합 테스트

React Native를 애플리케이션에 통합하기 위한 모든 기본 단계를 완료했습니다. 이제 [Metro 번들러](https://metrobundler.dev/)를 시작하여 TypeScript 애플리케이션 코드를 번들로 빌드합니다. Metro의 HTTP 서버는 개발 환경의 `localhost`에서 시뮬레이터나 기기로 번들을 공유합니다. 이를 통해 [핫 리로딩](https://reactnative.dev/blog/2016/03/24/introducing-hot-reloading)이 가능합니다.

먼저, 프로젝트 루트에 다음과 같이 `metro.config.js` 파일을 생성합니다:

```js
const {getDefaultConfig} = require('@react-native/metro-config');
module.exports = getDefaultConfig(__dirname);
```

Community 템플릿의 <RNTemplateRepoLink href="template/metro.config.js">`metro.config.js` 파일</RNTemplateRepoLink>을 참고용으로 확인할 수 있습니다.

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

이제 Android 앱을 평소와 같이 빌드하고 실행하세요.

앱 내의 React 기반 Activity에 접근하면, 개발 서버에서 JavaScript 코드를 로드하고 다음과 같이 표시됩니다:

<center><img src="/docs/assets/EmbeddedAppAndroidVideo.gif" width="300" /></center>

### Android Studio에서 릴리즈 빌드 생성

Android Studio를 사용하여 릴리즈 빌드를 생성할 수도 있습니다! 기존 네이티브 Android 앱의 릴리즈 빌드를 생성하는 것만큼 간단합니다.

React Native Gradle Plugin이 APK/App Bundle 내에 JS 코드를 번들링합니다.

Android Studio를 사용하지 않는 경우, 다음 명령어로 릴리즈 빌드를 생성할 수 있습니다:

```
cd android
# For a Release APK
./gradlew :app:assembleRelease
# For a Release AAB
./gradlew :app:bundleRelease
```

### 다음 단계는?

이제 평소와 같이 앱 개발을 계속할 수 있습니다. React Native로 작업하는 방법에 대한 자세한 내용은 [디버깅](debugging) 및 [배포](running-on-device) 문서를 참고하세요.
