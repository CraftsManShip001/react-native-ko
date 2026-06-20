---
title: 버그 보고 방법
---

React Native의 버그를 보고하는 것은 프로젝트에 기여를 시작하는 가장 좋은 방법 중 하나입니다. [GitHub 이슈](https://github.com/facebook/react-native/issues)를 새로운 버그 보고의 주요 채널로 사용합니다.

새 버그를 열기 전에 이슈 트래커에서 [이미 해당 버그가 존재하는지 검색](https://github.com/facebook/react-native/issues?q=sort%3Aupdated-desc%20is%3Aissue)해 주세요. 대부분의 경우 다른 사람이 이미 같은 문제를 경험했으므로 이것이 응답을 찾는 가장 빠른 방법입니다.

이슈 트래커에서 버그를 찾을 수 없다면 새로 열 수 있습니다. 새 이슈를 생성할 때 다음 사항을 확인하세요.

- 문제에 대한 설명을 추가합니다.
- [이슈 템플릿](https://github.com/facebook/react-native/issues/new?template=bug_report.yml)의 안내를 따릅니다.
- 사용 중인 React Native 버전을 추가합니다.
- `npx @react-native-community/cli info` 명령의 출력을 추가합니다.
- 해당되는 경우 문제의 스크린샷과 동영상을 추가합니다.

모든 버그 보고에는 **재현 코드(reproducer)**도 포함되어야 합니다. 재현 코드란 무슨 일이 일어나고 있는지 이해하고 디버깅을 도와주기 위해 필요한 코드입니다.

:::warning

많은 수의 이슈를 받기 때문에 재현 코드는 **필수**입니다. 재현 코드가 없는 이슈는 조사할 수 없으며 닫힐 가능성이 높습니다.

:::

## 재현 코드 제공하기

재현 코드의 목적은 버그를 _재현_하는 방법을 제공하는 것입니다. 재현 코드가 없으면 버그를 이해할 수 없고 수정도 할 수 없습니다.

재현 코드는 **최소한**이어야 합니다. 가능한 한 의존성이 적어야 하며 (이상적으로는 `react-native` 외에 없어야 합니다) 이렇게 해야 버그를 더 잘 격리할 수 있습니다.
GitHub에서 누군가가 재현 코드를 요청할 때, 그것은 모든 소스 코드를 요구하는 것이 **아닙니다**.

대신 보고하는 충돌/버그/이슈를 동일하게 재현하는 **최소한**의 프로젝트를 만들어야 합니다.

이 과정은 매우 중요합니다. 종종 재현 코드를 만드는 과정에서 이슈가 실제로 해결되기도 합니다. 재현 코드를 만들면 이슈가 특정 설정에 관련된 것인지 아니면 실제로 React Native 내부의 버그인지 더 쉽게 이해할 수 있습니다.

React Native에서의 트래픽 양으로 인해 유효한 재현 코드로 다음 중 하나만 허용합니다.

1. 대부분의 버그의 경우: 버그를 재현하도록 [RNTesterPlayground.js](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/Playground/RNTesterPlayground.js)를 수정한 풀 리퀘스트를 보내주세요.
2. UI 관련 버그의 경우: [Snack](https://snack.expo.dev).
3. 빌드/업그레이드 관련 버그의 경우: [재현 템플릿](https://github.com/react-native-community/reproducer-react-native/generate)을 사용한 프로젝트.

### RNTesterPlayground.js

재현 코드를 제공하는 가장 좋은 방법은 [`RNTesterPlayground.js`](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/Playground/RNTesterPlayground.js) 파일을 수정하는 풀 리퀘스트를 React Native에 여는 것입니다.

:::tip

이 재현 코드는 `react-native`의 `main`을 기준으로 코드를 실행하며 버그를 조사하고 수정하는 **가장 빠른** 방법입니다.

:::

`RNTesterPlayground.js` 파일은 참조 앱인 RN-Tester 앱 내부에 있습니다. 작동 방식과 빌드 방법에 대한 자세한 내용은 [전용 README 파일](https://github.com/facebook/react-native/blob/main/packages/rn-tester/README.md)에서 확인할 수 있습니다.

이러한 유형의 재현 코드 예시는 여기에 있습니다: [Reproduce modal layout issues #50704](https://github.com/facebook/react-native/pull/50704/)

`RNTesterPlayground.js`를 수정하면 RNTester의 **Playground** 탭에서 실행되는 코드를 확인할 수 있습니다.

![1단계](/docs/assets/RNTesterPlayground.png)

### Expo Snack

대부분의 UI 관련 버그는 [Expo Snack](https://snack.expo.dev/)을 사용하여 재현할 수 있습니다.

Expo Snack을 사용하면 브라우저에서 React Native 코드를 실행하고 즉시 렌더링되는 것을 확인할 수 있습니다.

Expo Snack에서 이슈를 재현할 수 있게 되면 **Save** 버튼을 클릭하여 이슈 보고에 첨부할 공유 가능한 링크를 얻으세요.

### 재현 템플릿

대부분의 빌드 관련 버그는 [커뮤니티 재현 템플릿](https://github.com/react-native-community/reproducer-react-native)을 사용하여 재현해야 합니다.

이 템플릿은 React Native Community CLI로 실행되는 작은 프로젝트를 만들며 빌드 이슈를 보여주는 데 사용할 수 있습니다.

템플릿에는 GitHub Actions로 CI가 이미 설정되어 있어 발생할 수 있는 빌드 이슈를 찾는 데 도움이 됩니다.

이 템플릿을 사용하려면:

1. GitHub에서 [Use this template](https://github.com/new?template_name=reproducer-react-native&template_owner=react-native-community) 버튼을 클릭하여 템플릿에서 시작하는 새 프로젝트를 만듭니다.
2. 새로 생성된 저장소를 로컬에 클론합니다.
3. 이슈를 재현하도록 수정을 적용합니다.
4. 생성 중인 새 버그 보고에 저장소 링크를 첨부합니다.
