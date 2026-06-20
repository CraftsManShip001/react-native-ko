---
id: react-native-gradle-plugin
title: React Native Gradle Plugin
---

이 가이드는 Android용 React Native 애플리케이션을 빌드할 때 **React Native Gradle Plugin**(RNGP라고도 불림)을 구성하는 방법을 설명합니다.

## 플러그인 사용

React Native Gradle Plugin은 `react-native`와 함께 자동으로 설치되는 별도의 NPM 패키지로 배포됩니다.

이 플러그인은 `npx react-native init`을 사용하여 생성된 새 프로젝트에 **이미 구성**되어 있습니다. 이 명령으로 앱을 생성했다면 추가적인 설치 단계가 필요하지 않습니다.

기존 프로젝트에 React Native를 통합하는 경우, [해당 페이지](/docs/integration-with-existing-apps)를 참고하세요: 플러그인 설치에 대한 구체적인 지침이 포함되어 있습니다.

## 플러그인 구성

기본적으로 플러그인은 합리적인 기본값으로 **바로 사용**할 수 있습니다. 필요한 경우에만 이 가이드를 참고하여 동작을 커스터마이징하세요.

플러그인을 구성하려면 `android/app/build.gradle` 내의 `react` 블록을 수정하면 됩니다:

```groovy
apply plugin: "com.facebook.react"

/**
 * This is the configuration block to customize your React Native Android app.
 * By default you don't need to apply any configuration, just uncomment the lines you need.
 */
react {
  // Custom configuration goes here.
}
```

각 구성 키에 대한 설명은 아래에서 확인할 수 있습니다:

### `root`

React Native 프로젝트의 루트 폴더, 즉 `package.json` 파일이 있는 위치입니다. 기본값은 `..`입니다. 다음과 같이 커스터마이징할 수 있습니다:

```groovy
root = file("../")
```

### `reactNativeDir`

`react-native` 패키지가 있는 폴더입니다. 기본값은 `../node_modules/react-native`입니다.
모노레포를 사용하거나 다른 패키지 매니저를 사용하는 경우, 설정에 맞게 `reactNativeDir`을 조정할 수 있습니다.

다음과 같이 커스터마이징할 수 있습니다:

```groovy
reactNativeDir = file("../node_modules/react-native")
```

### `codegenDir`

`react-native-codegen` 패키지가 있는 폴더입니다. 기본값은 `../node_modules/react-native-codegen`입니다.
모노레포를 사용하거나 다른 패키지 매니저를 사용하는 경우, 설정에 맞게 `codegenDir`을 조정할 수 있습니다.

다음과 같이 커스터마이징할 수 있습니다:

```groovy
codegenDir = file("../node_modules/@react-native/codegen")
```

### `cliFile`

React Native CLI의 진입점 파일입니다. 기본값은 `../node_modules/react-native/cli.js`입니다.
플러그인이 번들링 및 앱 생성을 위해 CLI를 호출해야 하므로 진입점 파일이 필요합니다.

모노레포를 사용하거나 다른 패키지 매니저를 사용하는 경우, 설정에 맞게 `cliFile`을 조정할 수 있습니다.
다음과 같이 커스터마이징할 수 있습니다:

```groovy
cliFile = file("../node_modules/react-native/cli.js")
```

### `debuggableVariants`

디버깅 가능한 변형(variant)의 목록입니다(변형에 대한 자세한 내용은 변형 사용 참고).

기본적으로 플러그인은 `debug`만 `debuggableVariants`로 간주하며, `release`는 해당하지 않습니다. `staging`, `lite` 등 다른 변형이 있는 경우 이에 맞게 조정해야 합니다.

`debuggableVariants`로 나열된 변형에는 번들이 포함되지 않으므로, Metro를 실행해야 합니다.

다음과 같이 커스터마이징할 수 있습니다:

```groovy
debuggableVariants = ["liteDebug", "prodDebug"]
```

### `nodeExecutableAndArgs`

모든 스크립트에 사용될 node 명령과 인수의 목록입니다. 기본값은 `[node]`이지만 다음과 같이 추가 플래그를 더하도록 커스터마이징할 수 있습니다:

```groovy
nodeExecutableAndArgs = ["node"]
```

### `bundleCommand`

앱의 번들을 생성할 때 호출되는 `bundle` 명령의 이름입니다. [RAM Bundles](https://reactnative.dev/docs/0.74/ram-bundles-inline-requires)를 사용하는 경우에 유용합니다. 기본값은 `bundle`이지만 다음과 같이 추가 플래그를 더하도록 커스터마이징할 수 있습니다:

```groovy
bundleCommand = "ram-bundle"
```

### `bundleConfig`

`bundle --config <file>`에 전달될 구성 파일의 경로입니다. 기본값은 비어 있습니다(구성 파일이 제공되지 않음). 번들링 구성 파일에 대한 자세한 내용은 [CLI 문서](https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle)에서 확인할 수 있습니다. 다음과 같이 커스터마이징할 수 있습니다:

```groovy
bundleConfig = file(../rn-cli.config.js)
```

### `bundleAssetName`

생성될 번들 파일의 이름입니다. 기본값은 `index.android.bundle`입니다. 다음과 같이 커스터마이징할 수 있습니다:

```groovy
bundleAssetName = "MyApplication.android.bundle"
```

### `entryFile`

번들 생성에 사용되는 진입점 파일입니다. 기본값은 `index.android.js` 또는 `index.js`를 검색합니다. 다음과 같이 커스터마이징할 수 있습니다:

```groovy
entryFile = file("../js/MyApplication.android.js")
```

### `extraPackagerArgs`

`bundle` 명령에 전달될 추가 플래그의 목록입니다. 사용 가능한 플래그 목록은 [CLI 문서](https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle)에서 확인할 수 있습니다. 기본값은 비어 있습니다. 다음과 같이 커스터마이징할 수 있습니다:

```groovy
extraPackagerArgs = []
```

### `hermesCommand`

`hermesc` 명령(Hermes 컴파일러)의 경로입니다. React Native에는 Hermes 컴파일러가 번들로 포함되어 있으므로 일반적으로 커스터마이징할 필요가 없습니다. 플러그인은 기본적으로 시스템에 맞는 올바른 컴파일러를 사용합니다.

### `hermesFlags`

`hermesc`에 전달할 플래그 목록입니다. 기본값은 `["-O", "-output-source-map"]`입니다. 다음과 같이 커스터마이징할 수 있습니다:

```groovy
hermesFlags = ["-O", "-output-source-map"]
```

### `enableBundleCompression`

번들 에셋을 `.apk`로 패키징할 때 압축 여부를 설정합니다.

`.bundle`의 압축을 비활성화하면 RAM에 직접 메모리 매핑할 수 있어 시작 시간이 단축되지만, 디스크에서 앱 크기가 커집니다. `.apk` 파일은 다운로드 전 압축되므로 `.apk` 다운로드 크기에는 거의 영향을 미치지 않습니다.

기본적으로 비활성화되어 있으며, 애플리케이션의 디스크 공간이 정말로 걱정되지 않는 한 활성화하지 않는 것이 좋습니다.

## 플레이버 및 빌드 변형 사용

Android 앱을 빌드할 때, 같은 프로젝트에서 다양한 버전의 앱을 만들기 위해 [커스텀 플레이버](https://developer.android.com/studio/build/build-variants#product-flavors)를 사용할 수 있습니다.

커스텀 빌드 타입(예: `staging`) 또는 커스텀 플레이버(예: `full`, `lite` 등)를 구성하려면 [공식 Android 가이드](https://developer.android.com/studio/build/build-variants)를 참고하세요.
기본적으로 새 앱은 두 가지 빌드 타입(`debug`와 `release`)으로 생성되며 커스텀 플레이버는 없습니다.

모든 빌드 타입과 플레이버의 조합이 **빌드 변형** 세트를 생성합니다. 예를 들어, `debug`/`staging`/`release` 빌드 타입과 `full`/`lite` 플레이버가 있으면 `fullDebug`, `fullStaging`, `fullRelease` 등 6개의 빌드 변형이 생성됩니다.

`debug`와 `release` 외에 커스텀 변형을 사용하는 경우, React Native Gradle Plugin에 [`debuggableVariants`](#debuggablevariants) 구성을 사용하여 어떤 변형이 **디버깅 가능**한지 지정해야 합니다:

```diff
apply plugin: "com.facebook.react"

react {
+ debuggableVariants = ["fullStaging", "fullDebug"]
}
```

이는 플러그인이 `debuggableVariants`에 해당하는 모든 변형에 대해 JS 번들링을 건너뛰기 때문에 필요합니다. 이러한 변형을 실행하려면 Metro가 필요합니다. 예를 들어, `debuggableVariants`에 `fullStaging`을 나열하면 번들이 없기 때문에 스토어에 게시할 수 없습니다.

## 플러그인이 내부적으로 하는 일

React Native Gradle Plugin은 React Native 애플리케이션을 프로덕션에 배포하기 위한 애플리케이션 빌드 구성을 담당합니다.
또한 플러그인은 서드파티 라이브러리 내에서 New Architecture에 사용되는 [Codegen](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md)을 실행하는 데도 사용됩니다.

플러그인의 주요 역할 요약:

- 디버깅 불가능한 모든 변형에 대해 `bundle`, `hermesc`, `compose-source-map` 명령을 호출하는 `createBundle<Variant>JsAndAssets` 태스크를 추가합니다.
- `react-native`의 `package.json`에서 React Native 버전을 읽어 `com.facebook.react:react-android` 및 `com.facebook.react:hermes-android` 의존성의 적절한 버전을 설정합니다.
- 필요한 모든 Maven 의존성을 사용하기 위한 적절한 Maven 저장소(Maven Central, Google Maven Repo, JSC local Maven repo 등)를 설정합니다.
- New Architecture를 사용하는 앱을 빌드할 수 있도록 NDK를 설정합니다.
- 런타임에 Hermes 또는 New Architecture 활성화 여부를 알 수 있도록 `buildConfigFields`를 설정합니다.
- 앱이 연결할 포트를 알 수 있도록 Metro DevServer 포트를 Android 리소스로 설정합니다.
- 라이브러리나 앱이 New Architecture를 위한 Codegen을 사용하는 경우 [React Native Codegen](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md)을 호출합니다.
