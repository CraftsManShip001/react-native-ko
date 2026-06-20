---
title: 테스트 실행 및 작성 방법
---

## 테스트 실행하기

이 섹션은 기여자로서 React Native에 대한 변경 사항을 테스트하는 방법에 관한 내용입니다. 아직 설정하지 않았다면, [네이티브 코드로 프로젝트 빌드하기](/docs/environment-setup)를 위한 개발 환경 설정 단계를 먼저 진행하세요.

### JavaScript 테스트

JavaScript 테스트 스위트를 실행하는 가장 간단한 방법은 React Native 체크아웃의 루트에서 다음 명령을 사용하는 것입니다:

```bash
yarn test
```

이 명령은 [Jest](https://jestjs.io)를 사용하여 테스트를 실행합니다.

또한 코드가 [Flow](https://flowtype.org/)와 lint 테스트를 통과하는지 확인해야 합니다:

```bash
yarn flow
yarn lint
```

### iOS 테스트

`packages/rn-tester` 디렉터리의 [README.md](https://github.com/facebook/react-native/blob/main/packages/rn-tester/README.md) 지침을 따르세요.

그런 다음 React Native 체크아웃의 루트로 돌아가서 `yarn`을 실행하세요. 이렇게 하면 JavaScript 의존성이 설정됩니다.

이 시점에서 React Native 체크아웃의 루트에서 다음 스크립트를 호출하여 iOS 테스트를 실행할 수 있습니다:

```bash
./scripts/objc-test.sh test
```

Xcode를 사용하여 iOS 테스트를 실행할 수도 있습니다. `RNTester/RNTesterPods.xcworkspace`를 열고 <kbd>Command + U</kbd>를 누르거나 메뉴바에서 `Product`를 선택한 다음 `Test`를 선택하여 로컬에서 테스트를 실행하세요.

Xcode는 Test Navigator를 통해 개별 테스트를 실행하는 것도 허용합니다. <kbd>Command + 6</kbd> 단축키를 사용할 수도 있습니다.

:::note
`objc-test.sh`는 모든 테스트를 실행하기 위한 테스트 환경을 설정합니다. 또한 불안정하거나 깨진 것으로 알려진 테스트를 비활성화합니다. Xcode를 사용하여 테스트를 실행할 때 이 점을 염두에 두세요. 예상치 못한 실패가 발생하면 먼저 `objc-test.sh`에서 비활성화되어 있는지 확인하세요.
:::

#### iOS Podfile/Ruby 테스트

`Podfile` 구성을 수정하는 경우 이를 검증할 수 있는 Ruby 테스트가 있습니다.

Ruby 테스트를 실행하려면:

```bash
cd scripts
sh run_ruby_tests.sh
```

### Android 테스트

Android 유닛 테스트는 에뮬레이터에서 실행되지 않고 로컬 머신의 JVM에서 실행됩니다.

Android 유닛 테스트를 실행하려면 React Native 체크아웃의 루트에서 다음 스크립트를 호출하세요:

```bash
./gradlew test
```

## 테스트 작성하기

React Native에서 버그를 수정하거나 새 기능을 추가할 때마다 이를 다루는 테스트를 추가하는 것이 좋습니다. 변경 사항에 따라 적합한 다양한 유형의 테스트가 있을 수 있습니다.

### JavaScript 테스트

JavaScript 테스트는 테스트 대상 파일 옆에 함께 위치한 `__test__` 디렉터리 내에 있습니다. 기본 예시는 [`TouchableHighlight-test.js`][js-jest-test]를 참고하세요. 또한 Jest의 [React Native 앱 테스트하기][jest-tutorial] 튜토리얼을 따라 더 많은 것을 배울 수 있습니다.

[js-jest-test]: https://github.com/facebook/react-native/blob/main/Libraries/Components/Touchable/__tests__/TouchableHighlight-test.js
[jest-tutorial]: https://jestjs.io/docs/en/tutorial-react-native

### iOS 통합 테스트

React Native는 브리지를 통해 네이티브와 JS 컴포넌트 모두가 통신해야 하는 통합 컴포넌트를 더 쉽게 테스트할 수 있는 도구를 제공합니다.

두 가지 주요 컴포넌트는 `RCTTestRunner`와 `RCTTestModule`입니다. `RCTTestRunner`는 React Native 환경을 설정하고 Xcode에서 `XCTestCase`로 테스트를 실행할 수 있는 도구를 제공합니다(`runTest:module`이 가장 간단한 메서드입니다). `RCTTestModule`은 JavaScript에 `NativeModules.TestModule`로 내보내집니다.

테스트 자체는 JS로 작성되며, 완료되면 `TestModule.markTestCompleted()`를 호출해야 합니다. 그렇지 않으면 테스트가 타임아웃되어 실패합니다.

테스트 실패는 주로 JS 예외를 던짐으로써 표시됩니다. `runTest:module:initialProps:expectErrorRegex:` 또는 `runTest:module:initialProps:expectErrorBlock:`을 사용하여 오류 조건을 테스트할 수도 있으며, 이는 오류가 발생할 것을 예상하고 오류가 제공된 기준과 일치하는지 검증합니다.

사용 예시 및 통합 포인트는 다음을 참고하세요:

- [`IntegrationTestHarnessTest.js`][f-ios-test-harness]
- [`RNTesterIntegrationTests.m`][f-ios-integration-tests]
- [`IntegrationTestsApp.js`][f-ios-integration-test-app]

[f-ios-test-harness]: https://github.com/facebook/react-native/blob/main/IntegrationTests/IntegrationTestHarnessTest.js
[f-ios-integration-tests]: https://github.com/facebook/react-native/blob/main/RNTester/RNTesterIntegrationTests/RNTesterIntegrationTests.m
[f-ios-integration-test-app]: https://github.com/facebook/react-native/blob/main/IntegrationTests/IntegrationTestsApp.js

### iOS 스냅샷 테스트

통합 테스트의 일반적인 유형은 스냅샷 테스트입니다. 이 테스트는 컴포넌트를 렌더링하고, [`FBSnapshotTestCase`](https://github.com/facebook/ios-snapshot-test-case) 라이브러리를 내부적으로 사용하여 `TestModule.verifySnapshot()`으로 화면의 스냅샷을 참조 이미지와 비교하여 검증합니다. 참조 이미지는 `RCTTestRunner`에서 `recordMode = YES`로 설정한 다음 테스트를 실행하여 기록됩니다.

스냅샷은 32비트와 64비트 사이, 그리고 다양한 OS 버전 사이에서 약간 다를 수 있으므로 [올바른 구성](https://github.com/facebook/react-native/blob/main/scripts/.tests.env)으로 테스트가 실행되도록 강제하는 것이 좋습니다.

또한 모든 네트워크 데이터와 기타 잠재적으로 문제가 될 수 있는 의존성을 모킹할 것을 강력히 권장합니다. 기본 예시는 [`SimpleSnapshotTest`](https://github.com/facebook/react-native/blob/main/IntegrationTests/SimpleSnapshotTest.js)를 참고하세요.

풀 리퀘스트에서 스냅샷 테스트에 영향을 미치는 변경을 하는 경우(예: 스냅샷이 찍히는 예시 중 하나에 새 예시 케이스를 추가하는 경우), 스냅샷 참조 이미지를 다시 기록해야 합니다.

이렇게 하려면 [RNTester/RNTesterSnapshotTests.m](https://github.com/facebook/react-native/blob/136666e2e7d2bb8d3d51d599fc1384a2f68c43d3/RNTester/RNTesterIntegrationTests/RNTesterSnapshotTests.m#L29)에서 `recordMode` 플래그를 `_runner.recordMode = YES;`로 변경하고, 실패한 테스트를 다시 실행한 다음, record를 `NO`로 되돌리고 풀 리퀘스트를 제출/업데이트하여 CircleCI 빌드가 통과하는지 기다리세요.

### Android 유닛 테스트

Java/Kotlin 코드만으로 테스트할 수 있는 코드를 작업할 때마다 Android 유닛 테스트를 추가하는 것이 좋습니다. Android 유닛 테스트는 `packages/react-native/ReactAndroid/src/test/`에 위치합니다.

좋은 유닛 테스트가 어떤 모습인지 파악하기 위해 이것들을 살펴볼 것을 권장합니다.

## 지속적 테스트

오픈 소스 테스트를 자동으로 실행하기 위해 [CircleCI][config-circleci]를 사용합니다. CircleCI는 메인테이너가 코드 변경이 회귀를 도입하는지 여부를 이해하는 데 도움이 되도록, 풀 리퀘스트에 커밋이 추가될 때마다 이 테스트를 실행합니다. 테스트는 이 브랜치들의 상태를 추적하기 위해 `main` 및 `*-stable` 브랜치의 커밋에서도 실행됩니다.

[config-circleci]: https://github.com/facebook/react-native/blob/main/.circleci/config.yml

Meta의 내부 테스트 인프라에서 실행되는 또 다른 테스트 세트가 있습니다. 이 테스트 중 일부는 React Native의 내부 사용자가 정의한 통합 테스트입니다(예: Facebook 앱의 React Native 표면에 대한 유닛 테스트).

이 테스트는 Facebook의 소스 관리에 호스팅된 React Native 사본에 대한 모든 커밋에서 실행됩니다. 또한 풀 리퀘스트가 Facebook의 소스 관리로 임포트될 때도 실행됩니다.

이 테스트 중 하나가 실패하면 Meta의 누군가가 확인해야 합니다. 풀 리퀘스트는 Meta 직원만 임포트할 수 있으므로, 풀 리퀘스트를 임포트한 사람이 세부 사항을 처리할 수 있어야 합니다.

:::note
**CI 테스트를 로컬에서 실행하기:**
대부분의 오픈 소스 협업자는 이 테스트의 결과를 보기 위해 CircleCI에 의존합니다. CircleCI와 동일한 구성을 사용하여 로컬에서 변경 사항을 검증하려는 경우, CircleCI는 작업을 로컬에서 실행할 수 있는 [커맨드 라인 인터페이스](https://circleci.com/docs/local-cli)를 제공합니다.
:::

### F.A.Q.

#### CI 테스트에서 사용되는 Xcode 버전을 어떻게 업그레이드하나요?

새 버전의 Xcode로 업그레이드할 때는 먼저 [CircleCI에서 지원되는지](https://circleci.com/docs/testing-ios#supported-xcode-versions) 확인하세요.

또한 CircleCI 머신에 설치된 iOS 시뮬레이터에서 테스트가 실행되도록 테스트 환경 구성을 업데이트해야 합니다.

원하는 버전을 클릭하고 Runtimes 아래를 살펴보는 방법으로 [CircleCI의 Xcode 버전 참조](https://circleci.com/docs/2.0/testing-ios/#supported-xcode-versions)에서도 찾을 수 있습니다.

그런 다음 다음 두 파일을 수정할 수 있습니다:

- `.circleci/config.yml`

  `macos:` 아래 `xcode:` 줄을 수정하세요(`_XCODE_VERSION` 검색).

- `scripts/.tests.env`

  원하는 iOS 런타임에 맞게 `IOS_TARGET_OS` 환경 변수를 수정하세요.

이 변경 사항을 GitHub에 병합하려는 경우, 풀 리퀘스트를 임포트할 때 내부 Sandcastle RN OSS iOS 테스트 `react_native_oss.py`에서 사용되는 `_XCODE_VERSION` 값을 업데이트해야 하므로 Meta 직원에게 알려주세요.
