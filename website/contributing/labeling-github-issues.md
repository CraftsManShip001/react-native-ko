---
title: GitHub 이슈 레이블 지정
---

[레이블의 대부분](https://github.com/facebook/react-native/issues/labels)은 그 목적을 나타내는 접두사를 가지고 있습니다.

목록을 지배하는 두 가지 레이블 접두사가 바로 눈에 띌 것입니다: [API:](https://github.com/facebook/react-native/labels?utf8=%E2%9C%93&q=API%3A)와 [Component:](https://github.com/facebook/react-native/labels?utf8=%E2%9C%93&q=Component%3A)입니다.

이것들은 일반적으로 React Native 핵심 라이브러리의 API 또는 컴포넌트와 관련된 이슈와 풀 리퀘스트를 나타냅니다. 한눈에 어떤 컴포넌트에 문서화나 지원이 절실히 필요한지 이해하는 데 도움이 됩니다.

이 레이블들은 [봇](/contributing/bots-reference) 중 하나에 의해 자동으로 추가되지만, 봇이 이슈를 잘못 분류한 경우 자유롭게 조정하세요.

- `p:` 클래스의 레이블은 어떤 종류의 [관계](https://github.com/facebook/react-native/blob/main/ECOSYSTEM.md)를 유지하는 회사를 나타냅니다. 예를 들어 Microsoft와 Expo가 포함됩니다. 이것들도 이슈 작성자를 기반으로 도구에 의해 자동으로 추가됩니다.
- `DX:` 클래스의 레이블은 개발자 경험을 다루는 영역을 나타냅니다. React Native를 사용하는 사람들에게 부정적인 영향을 미치는 이슈에 사용하세요.
- `Tool:` 클래스의 레이블은 도구를 나타냅니다. CocoaPods, Buck 등이 해당합니다.
- `Resolution:` 레이블은 이슈의 상태를 전달하는 데 도움이 됩니다. 더 많은 정보가 필요한가요? 진행하기 전에 무엇을 해야 하나요?
- `Type:` 레이블은 풀 리퀘스트의 changelog 필드를 기반으로 봇이 추가합니다. 버그 리포트가 아닌 다른 유형의 이슈를 참조할 수도 있습니다.
- `Platform:` 레이블은 이슈가 영향을 미치는 개발 플랫폼이나 대상 OS를 식별하는 데 도움이 됩니다.

특정 레이블의 의미가 불확실한 경우 https://github.com/facebook/react-native/labels 로 가서 설명 필드를 확인하세요. 이것들을 올바르게 문서화하기 위해 최선을 다하겠습니다.

### 레이블 동작

다음 레이블 중 하나를 적용하면 봇 상호작용이 발생할 수 있습니다. 이것들의 목표는 필요하다고 판단될 때 미리 준비된 응답을 제공하여 이슈 트리아지를 돕는 것입니다.

- 봇에게 다음 단계에 대한 댓글을 남기도록 지시하는 레이블:
  - `Needs: Issue Template`
  - `Needs: Environment Info`
  - `Needs: Verify on Latest Version`
  - `Needs: Repro`

- 봇에게 설명하는 댓글을 남긴 후 이슈를 닫도록 지시하는 레이블:
  - `Resolution: For Stack Overflow`
  - `Type: Question`
  - `Type: Docs`

- 댓글 없이 이슈를 즉시 닫는 레이블:
  - `Type: Invalid`
