---
title: 풀 리퀘스트의 Changelog
---

풀 리퀘스트의 changelog 항목은 변경 사항에 대한 "tl;dr:" 역할을 합니다. Android에 영향을 주나요? 이것이 호환성이 깨지는 변경 사항인가요? 새로운 것이 추가되었나요?

표준화된 형식으로 changelog를 제공하면 릴리즈 담당자가 릴리즈 노트를 작성하는 데 도움이 됩니다. 풀 리퀘스트 설명에 changelog를 포함해 주세요. 풀 리퀘스트가 머지되면 풀 리퀘스트 설명이 커밋 메시지로 사용됩니다.

### 형식

changelog 항목의 형식은 다음과 같습니다.

```
## Changelog:

[Category] [Type] - Message
```

"Category" 필드는 다음 중 하나일 수 있습니다.

- **Android**: Android에 영향을 주는 변경 사항.
- **iOS**: iOS에 영향을 주는 변경 사항.
- **General**: 다른 카테고리에 해당하지 않는 변경 사항.
- **Internal**: 릴리즈 노트를 사용하는 개발자와 관련이 없는 변경 사항.

"Type" 필드는 다음 중 하나일 수 있습니다.

- **Breaking**: 호환성이 깨지는 변경 사항.
- **Added**: 새로운 기능 추가.
- **Changed**: 기존 기능의 변경.
- **Deprecated**: 곧 제거될 기능.
- **Removed**: 이미 제거된 기능.
- **Fixed**: 버그 수정.
- **Security**: 보안 취약점과 관련된 경우.

마지막으로 "Message" 필드는 기능 수준에서 "무엇을, 왜" 변경했는지를 설명할 수 있습니다. 이를 통해 React Native 사용자에게 주목할 만한 변경 사항을 간략히 전달하세요.

자세한 내용은 [좋은 changelog를 작성하는 방법](https://keepachangelog.com/en/1.0.0/#how)과 [changelog를 유지하는 이유](https://keepachangelog.com/en/1.0.0/#why)를 참조하세요.

### 예시

- `[General] [Added] - Add snapToOffsets prop to ScrollView component`
- `[General] [Fixed] - Fix various issues in snapToInterval on ScrollView component`
- `[iOS] [Fixed] - Fix crash in RCTImagePicker`

### FAQ

#### 풀 리퀘스트에 Android와 JavaScript 모두에 대한 변경 사항이 포함된 경우 어떻게 하나요?

Android 카테고리를 사용하세요.

#### 풀 리퀘스트에 Android와 iOS 모두에 대한 변경 사항이 포함된 경우 어떻게 하나요?

하나의 풀 리퀘스트에서 변경이 이루어진 경우 General 카테고리를 사용하세요.

#### 풀 리퀘스트에 Android, iOS, JavaScript 모두에 대한 변경 사항이 포함된 경우 어떻게 하나요?

하나의 풀 리퀘스트에서 변경이 이루어진 경우 General 카테고리를 사용하세요.

#### 그 외의 경우에는?

changelog 항목이 없는 것보다는 있는 것이 낫습니다. 올바른 카테고리를 선택했는지 확신이 없다면, "message" 필드를 활용하여 변경 사항을 간결하게 설명하세요.

이 항목들은 [`@rnx-kit/rn-changelog-generator`](https://github.com/microsoft/rnx-kit/tree/main/incubator/rn-changelog-generator) 스크립트가 초안을 작성하는 데 사용되며, 이후 릴리즈 담당자가 편집합니다.

작성하신 내용은 최종 릴리즈 노트의 적절한 위치에 변경 사항을 추가하는 데 사용됩니다.
