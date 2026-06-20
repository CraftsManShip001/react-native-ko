# Codegen CLI

Gradle을 호출하거나 스크립트를 수동으로 실행하는 것은 기억하기 어렵고 많은 준비가 필요합니다.

이를 단순화하기 위해 이러한 작업을 실행하는 데 도움이 되는 CLI 도구를 만들었습니다: **Codegen** CLI입니다. 이 명령은 프로젝트에 대해 [@react-native/codegen](https://www.npmjs.com/package/@react-native/codegen)을 실행합니다. 다음 옵션을 사용할 수 있습니다:

```sh
npx @react-native-community/cli codegen --help
Usage: rnc-cli codegen [options]

Options:
  --verbose            Increase logging verbosity
  --path <path>        Path to the React Native project root. (default: "/Users/MyUsername/projects/my-app")
  --platform <string>  Target platform. Supported values: "android", "ios", "all". (default: "all")
  --outputPath <path>  Path where generated artifacts will be output to.
  -h, --help           display help for command
```

## 예시

- 현재 작업 디렉토리에서 `package.json`을 읽고, codegenConfig를 기반으로 코드를 생성합니다.

```shell
npx @react-native-community/cli codegen
```

- 현재 작업 디렉토리에서 `package.json`을 읽고, codegenConfig에 정의된 위치에 iOS 코드를 생성합니다.

```shell
npx @react-native-community/cli codegen --platform ios
```

- `third-party/some-library`에서 `package.json`을 읽고, `third-party/some-library/android/generated`에 Android 코드를 생성합니다.

```shell
npx @react-native-community/cli codegen \
    --path third-party/some-library \
    --platform android \
    --outputPath third-party/some-library/android/generated
```

## 라이브러리에 생성된 코드 포함하기

Codegen CLI는 라이브러리 개발자에게 훌륭한 도구입니다. 생성된 코드를 미리 확인하여 구현해야 할 인터페이스를 파악하는 데 사용할 수 있습니다.

일반적으로 생성된 코드는 라이브러리에 포함되지 않으며, 라이브러리를 사용하는 앱이 빌드 시 Codegen을 실행할 책임을 집니다.
대부분의 경우 이러한 설정으로 충분하지만, Codegen은 `includesGeneratedCode` 속성을 통해 생성된 코드를 라이브러리 자체에 포함하는 메커니즘도 제공합니다.

`includesGeneratedCode = true`를 사용할 때의 의미를 이해하는 것이 중요합니다. 생성된 코드를 포함하면 다음과 같은 여러 이점이 있습니다:

- 앱이 **Codegen**을 실행해 줄 필요가 없으며, 생성된 코드는 항상 존재합니다.
- 구현 파일이 항상 생성된 인터페이스와 일치합니다(이는 codegen의 API 변경에 대해 라이브러리 코드를 더 탄력적으로 만들어 줍니다).
- Android에서 두 가지 아키텍처를 모두 지원하기 위해 두 세트의 파일을 포함할 필요가 없습니다. 새로운 아키텍처용 파일만 유지하면 되며, 하위 호환성이 보장됩니다.
- 모든 네이티브 코드가 포함되므로, 라이브러리의 네이티브 부분을 사전 빌드(prebuild)로 배포할 수 있습니다.

반면, 한 가지 단점도 알아두어야 합니다:

- 생성된 코드는 라이브러리 내부에 정의된 React Native 버전을 사용합니다. 따라서 라이브러리가 React Native 0.76과 함께 배포되면 생성된 코드는 해당 버전을 기반으로 합니다. 이는 생성된 코드가 앱이 사용하는 **이전** React Native 버전(예: React Native 0.75에서 실행 중인 앱)과 호환되지 않을 수 있음을 의미합니다.

## `includesGeneratedCode` 활성화하기

이 설정을 활성화하려면:

- `package.json` 파일의 `codegenConfig` 필드에 `includesGeneratedCode` 속성을 추가합니다. 값을 `true`로 설정합니다.
- codegen CLI를 사용하여 로컬에서 **Codegen**을 실행합니다.
- 생성된 코드를 포함하도록 `package.json`을 업데이트합니다.
- 생성된 코드를 포함하도록 `podspec`을 업데이트합니다.
- 생성된 코드를 포함하도록 `build.Gradle` 파일을 업데이트합니다.
- `react-native.config.js`의 `cmakeListsPath`를 업데이트하여 Gradle이 빌드 디렉토리가 아닌 `outputDir`에서 CMakeLists 파일을 찾도록 합니다.
