---
title: 풀 리퀘스트 여는 방법
---

이 안내서는 코어 React Native 저장소에 기여할 수 있도록 머신을 설정하고 첫 번째 풀 리퀘스트를 생성하는 단계별 과정을 제공합니다.

## 프롤로그: 준비하기

React Native를 빌드하고 개발하려면 몇 가지 도구와 의존성이 필요합니다. 이는 [환경 설정](/docs/environment-setup) 가이드의 "네이티브 코드로 프로젝트 빌드하기" 섹션에서 다루고 있습니다.

풀 리퀘스트를 수락하려면 [기여자 라이선스 동의서(CLA)](/contributing/contribution-license-agreement)를 제출해야 합니다. Meta의 오픈 소스 프로젝트 중 어떤 것이든 작업하려면 한 번만 하면 됩니다. 단 1분이면 되므로 의존성이 설치되는 동안 처리할 수 있습니다.

## 1장: 오픈 소스에 오신 것을 환영합니다

### 1. `git` 설치하기

React Native 소스 코드는 GitHub에 호스팅되어 있습니다. `git` 커맨드라인 프로그램을 통해 git 버전 관리와 상호작용할 수 있습니다. 머신에 git을 설정하려면 [GitHub의 안내](https://help.github.com/articles/set-up-git/)를 따르는 것을 권장합니다.

### 2. 소스 코드 가져오기

[GitHub](https://github.com/facebook/react-native)에서 React Native 소스 코드를 둘러볼 수 있지만, 로컬 머신에 포크를 설정하는 것을 권장합니다.

1. https://github.com/facebook/react-native 로 이동합니다.
2. 오른쪽 상단의 "Fork" 버튼을 클릭합니다.
3. 호스트로 사용할 사용자 이름을 선택합니다.

이제 GitHub의 https://github.com/your_username/react-native 에 React Native 포크가 생겼습니다. 다음으로 로컬 머신에 소스 코드 사본을 가져옵니다. 셸을 열고 다음 명령을 입력하세요.

```bash
git clone https://github.com/facebook/react-native.git
cd react-native
git remote add fork https://github.com/your_username/react-native.git
```

:::note
위 내용이 처음이라도 걱정하지 마세요. macOS와 Linux에서는 터미널 앱을 통해, Windows에서는 PowerShell을 통해 셸에 접근할 수 있습니다.
:::

코어 React Native 저장소의 내용이 담긴 새로운 `react-native` 디렉토리가 생성됩니다. 이 디렉토리는 실제로 React Native git 저장소의 클론입니다. 두 개의 리모트로 설정되어 있습니다.

- 업스트림 https://github.com/facebook/react-native 저장소를 위한 `origin`
- 자신의 GitHub 계정에 있는 React Native 포크를 위한 `fork`

### 3. 브랜치 생성하기

변경 사항을 추적하기 위해 포크에 새 브랜치를 생성하는 것을 권장합니다.

```bash
git checkout -b my_feature_branch --track origin/main
```

## 2장: 변경 사항 구현하기

### 1. 의존성 설치하기

React Native는 [Yarn Workspaces (Yarn Classic)](https://classic.yarnpkg.com/lang/en/docs/workspaces/)으로 관리되는 JavaScript 모노레포입니다.

프로젝트 수준 설치를 실행합니다.

```sh
yarn
```

`react-native-codegen` 패키지를 한 번 빌드해야 합니다.

```sh
yarn --cwd packages/react-native-codegen build
```

### 2. 코드 변경하기

이제 원하는 코드 에디터로 프로젝트를 열 수 있습니다. [Visual Studio Code](https://code.visualstudio.com/)는 JavaScript 개발자들에게 인기 있으며, React Native에 일반적인 변경을 가하는 경우 권장합니다.

IDE 프로젝트 구성:

- **VS Code**: `react-native.code-workspace` 파일을 엽니다. 확장 프로그램 추천과 함께 열리며 Flow Language Service 및 기타 에디터 설정이 올바르게 구성됩니다.
- **Android Studio**: 저장소 루트 폴더(`.idea` 구성 디렉토리가 있는 곳)를 엽니다.
- **Xcode**: `packages/rn-tester/RNTesterPods.xcworkspace`를 엽니다.

### 3. 변경 사항 실행하기

rn-tester 패키지를 사용하여 변경 사항을 실행하고 검증할 수 있습니다. [RNTester readme](https://github.com/facebook/react-native/blob/main/packages/rn-tester/README.md)에서 자세한 내용을 확인할 수 있습니다.

### 4. 변경 사항 테스트하기

변경 사항이 올바르고 테스트 실패를 유발하지 않는지 확인하세요. [테스트 실행 및 작성하기](/contributing/how-to-run-and-write-tests)에서 자세한 내용을 확인할 수 있습니다.

### 5. 코드 린트하기

코어 React Native 저장소에서 사용되는 각 언어의 스타일에 익숙해지는 데 시간이 걸릴 수 있다는 것을 이해합니다. 개발자가 사소한 문제에 신경 쓸 필요가 없도록 가능한 한 코드를 컨벤션에 맞게 자동으로 재작성하는 도구를 사용합니다.

예를 들어 [Prettier](https://prettier.io/)를 사용하여 JavaScript 코드를 포맷합니다. 에디터 통합을 통해 Prettier가 자동으로 포맷 문제를 수정하거나 `yarn run prettier`를 수동으로 실행하면 되므로 시간과 노력을 절약할 수 있습니다.

또한 린터를 사용하여 코드에 존재할 수 있는 스타일 문제를 잡아냅니다. `yarn run lint`를 실행하여 코드 스타일 상태를 확인할 수 있습니다.

코딩 컨벤션에 대한 자세한 내용은 [코딩 스타일 가이드](/contributing/how-to-contribute-code#코딩-스타일)를 참고하세요.

### 6. 변경 사항 확인하기

많은 인기 있는 에디터는 소스 컨트롤과 어떤 방식으로든 통합되어 있습니다. 커맨드 라인에서 `git status`와 `git diff`를 사용하여 무엇이 변경되었는지 추적할 수도 있습니다.

## 3장: 변경 사항 제안하기

### 1. 변경 사항 커밋하기

`git`을 사용하여 변경 사항을 버전 관리에 추가하세요.

```bash
git add <filename>
git commit -m <message>
```

짧고 설명적인 문장을 커밋 메시지로 사용할 수 있습니다.

:::note
좋은 git 커밋 메시지 작성에 대해 걱정되시나요? 걱정하지 마세요. 나중에 풀 리퀘스트가 병합될 때 모든 커밋이 단일 커밋으로 스쿼시됩니다. 이 스쿼시된 커밋의 메시지를 채우는 데는 풀 리퀘스트 설명이 사용됩니다.
:::

이 가이드는 첫 번째 기여를 도와주기에 충분한 정보를 다룹니다. GitHub에는 git을 시작하는 데 도움이 되는 여러 리소스가 있습니다.

- [Git 사용하기](https://help.github.com/en/categories/using-git)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

### 2. 변경 사항을 GitHub에 푸시하기

변경 사항이 버전 관리에 커밋되면 GitHub에 푸시할 수 있습니다.

```bash
git push fork <my_feature_branch>
```

모든 것이 잘 되면 풀 리퀘스트를 열도록 권장하는 메시지가 표시됩니다.

```
remote:
remote: Create a pull request for 'your_feature_branch' on GitHub by visiting:
remote:      https://github.com/your_username/react-native/pull/new/your_feature_branch
remote:
```

제공된 URL을 방문하여 다음 단계로 진행하세요.

### 3. 풀 리퀘스트 생성하기

거의 다 왔습니다! 다음 단계는 풀 리퀘스트를 작성하는 것입니다. 너무 길지 않은 설명적인 제목을 사용하세요. 그런 다음 기본 풀 리퀘스트 템플릿에서 제공하는 모든 필드를 작성하세요.

- **Summary(요약):** 이 필드를 사용하여 풀 리퀘스트를 보내는 동기를 설명합니다. 무엇을 수정하고 있나요?
- **[Changelog](/contributing/changelogs-in-pull-requests):** 풀 리퀘스트가 병합될 경우 어떤 것이 변경되는지 간단한 설명을 제공하여 릴리즈 메인테이너가 릴리즈 노트를 작성하는 데 도움을 주세요.
- **Test Plan(테스트 계획):** 리뷰어에게 변경 사항을 어떻게 테스트했는지 알려주세요. 엣지 케이스를 고려했나요? 변경 사항이 원하는 효과를 갖는지 확인하기 위해 어떤 단계를 따랐나요? 자세한 내용은 [테스트 계획이란?](https://medium.com/@martinkonicek/what-is-a-test-plan-8bfc840ec171)을 참고하세요.

### 4. 리뷰 검토 및 피드백 처리하기

GitHub의 풀 리퀘스트에 남겨진 댓글과 리뷰 피드백을 주시하세요. 메인테이너는 변경 사항이 코어 React Native 저장소에 병합될 준비가 되도록 돕기 위해 건설적이고 실행 가능한 피드백을 제공하기 위해 최선을 다할 것입니다.
