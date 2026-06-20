---
title: 코드 기여 방법
---

React Native에 기여하는 데 관심을 가져 주셔서 감사합니다! 이슈에 댓글을 달거나 트리아지하는 것부터 PR을 리뷰하고 제출하는 것까지, [모든 기여를 환영합니다](/contributing/overview). 이 문서에서는 React Native에 코드를 기여하는 단계를 설명합니다.

지금 바로 코드 기여를 시작하고 싶다면 비교적 제한된 범위의 버그가 포함된 [`Good first issues`](https://github.com/facebook/react-native/labels/good%20first%20issue) 목록을 참고하세요.
[`Help wanted`](https://github.com/facebook/react-native/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22help+wanted+%3Aoctocat%3A%22+sort%3Aupdated-desc+) 레이블이 붙은 이슈는 PR을 제출하기에 좋은 이슈입니다.

## 사전 요구사항

:::info
사용하는 플랫폼과 개발하려는 플랫폼에 맞는 필수 도구 및 개발 환경 설정은 [환경 설정](/docs/environment-setup) 가이드를 참고하세요.
:::

## 개발 워크플로

React Native를 클론한 후 디렉토리를 열고 `yarn`을 실행하여 의존성을 설치하세요.

이제 여러 명령을 실행할 준비가 되었습니다.

- `yarn start`는 Metro 패키저 서버를 시작합니다.
- `yarn lint`는 코드 스타일을 검사합니다.
- `yarn format`은 코드를 자동으로 포맷합니다.
- `yarn test`는 Jest 기반 JavaScript 테스트 스위트를 실행합니다.
  - `yarn test --watch`는 대화형 JavaScript 테스트 워처를 실행합니다.
  - `yarn test <pattern>`은 파일 이름이 일치하는 JavaScript 테스트를 실행합니다.
- `yarn flow`는 [Flow](https://flowtype.org/) 타입 검사를 실행합니다.
  - `yarn flow-check-android`는 `*.android.js` 파일에 대해 전체 Flow 검사를 수행합니다.
  - `yarn flow-check-ios`는 `*.ios.js` 파일에 대해 전체 Flow 검사를 수행합니다.
- `yarn test-typescript`는 [TypeScript](https://www.typescriptlang.org/) 타입 검사를 실행합니다.
- `yarn test-ios`는 iOS 테스트 스위트를 실행합니다 (macOS 필요).
- `yarn build`는 구성된 모든 패키지를 빌드합니다. 일반적으로 이 명령은 게시 전 CI에서만 실행하면 됩니다.
  - 빌드가 필요한 패키지는 [scripts/build/config.js](https://github.com/facebook/react-native/blob/main/scripts/build/config.js)에 구성되어 있습니다.
- `yarn build-types`는 공개 API에 대한 TypeScript 타입을 생성하고 스냅샷을 업데이트합니다.

## 변경 사항 테스트하기

테스트는 코드베이스에 회귀가 발생하는 것을 방지하는 데 도움이 됩니다. 변경 사항을 작업하면서 회귀가 발생하지 않도록 `yarn test` 또는 위의 플랫폼별 스크립트를 실행하는 것을 권장합니다.

GitHub 저장소는 CircleCI를 사용하여 [지속적으로 테스트](/contributing/how-to-run-and-write-tests#지속적-테스트)되며, 그 결과는 [커밋](https://github.com/facebook/react-native/commits/main) 및 풀 리퀘스트의 Checks 기능을 통해 확인할 수 있습니다.

테스트 실행 및 작성에 대한 자세한 내용은 [테스트 실행 및 작성 방법](/contributing/how-to-run-and-write-tests) 페이지에서 확인할 수 있습니다.

## 코딩 스타일

Prettier를 사용하여 JavaScript 코드를 포맷합니다. 에디터 통합을 통해 Prettier가 자동으로 포맷 문제를 수정하거나 `yarn run prettier`를 수동으로 실행하면 되므로 시간과 노력을 절약할 수 있습니다. 또한 린터를 사용하여 코드에 존재할 수 있는 스타일 문제를 잡아냅니다. `yarn run lint`를 실행하여 코드 스타일 상태를 확인할 수 있습니다.

하지만 린터가 잡아내지 못하는 스타일, 특히 Java나 Objective-C 코드에서 그런 경우가 있습니다.

### Objective-C

- `@property` 선언 뒤에 공백
- _모든_ `if` 문에 괄호, _같은_ 줄에
- `- method`, `@interface`, `@implementation` 괄호는 다음 줄에
- 줄 길이를 80자 내외로 유지 _시도_ (때로는 불가능할 수 있습니다...)
- `*` 연산자는 변수 이름과 함께 작성 (예: `NSObject *variableName;`)

### Java

- 메서드 호출이 여러 줄에 걸쳐 있으면 닫는 괄호는 마지막 인수와 같은 줄에 작성합니다.
- 메서드 헤더가 한 줄에 맞지 않으면 각 인수를 별도 줄에 작성합니다.
- 100자 줄 길이

## 풀 리퀘스트 제출하기

React Native에 대한 코드 수준 기여는 일반적으로 [풀 리퀘스트](https://help.github.com/en/articles/about-pull-requests) 형태로 이루어집니다. React Native에 변경 사항을 제안하는 과정은 다음과 같이 요약할 수 있습니다.

1. React Native 저장소를 포크하고 `main`에서 브랜치를 생성합니다.
2. 테스트가 필요한 코드를 추가했다면 테스트를 추가합니다.
3. API를 변경했다면 문서를 업데이트합니다.
4. 풀 리퀘스트를 열면 로컬 또는 CI에서 테스트 스위트가 통과하는지 확인합니다.
5. 코드 린트가 통과하는지 확인합니다 (예: `yarn lint --fix`).
6. `yarn build-types --validate`로 코드가 JS 공개 API를 수정하는지 확인합니다. 수정하는 경우 `yarn build-types`를 사용하여 스냅샷을 재생성합니다.
7. 변경 사항을 포크에 푸시합니다.
8. React Native 저장소에 풀 리퀘스트를 생성합니다.
9. 풀 리퀘스트의 댓글을 리뷰하고 처리합니다.
10. 봇이 제안을 댓글로 달 수 있습니다. 일반적으로 메인테이너가 코드를 리뷰하기 전에 이를 먼저 해결해 달라고 요청합니다.
11. 아직 제출하지 않았다면 [기여자 라이선스 동의서("CLA")](#기여자-라이선스-동의서)를 제출합니다.

모든 것이 잘 되면 풀 리퀘스트가 병합됩니다. 병합되지 않는 경우 메인테이너가 최선을 다해 이유를 설명할 것입니다.

풀 리퀘스트를 처음 제출하는 경우 [시작을 돕는 단계별 가이드](/contributing/how-to-open-a-pull-request)를 만들었습니다. 풀 리퀘스트 처리 방법에 대한 자세한 내용은 [풀 리퀘스트 관리 페이지](managing-pull-requests)를 참고하세요.

### 기여자 라이선스 동의서

풀 리퀘스트를 수락하려면 [기여자 라이선스 동의서(CLA)](/contributing/contribution-license-agreement)를 제출해야 합니다. Meta의 오픈 소스 프로젝트 중 어떤 것이든 작업하려면 한 번만 하면 됩니다. 단 1분이면 되므로 의존성이 설치되는 동안 처리할 수 있습니다.

## 라이선스

React Native에 기여함으로써 귀하의 기여는 React Native 저장소 루트 디렉토리의 [LICENSE](https://github.com/facebook/react-native/blob/main/LICENSE) 파일에 따라 라이선스가 부여된다는 데 동의합니다.
