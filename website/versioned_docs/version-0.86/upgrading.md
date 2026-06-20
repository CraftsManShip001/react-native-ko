---
id: upgrading
title: 새 버전으로 업그레이드하기
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

새 버전의 React Native로 업그레이드하면 더 많은 API, 뷰, 개발자 도구 및 기타 기능을 사용할 수 있습니다. 업그레이드에는 약간의 노력이 필요하지만, 최대한 간단하게 진행할 수 있도록 지원하고 있습니다.

## Expo 프로젝트

Expo 프로젝트를 새 버전의 React Native로 업그레이드하려면 `package.json` 파일에서 `react-native`, `react`, `expo` 패키지 버전을 업데이트해야 합니다. Expo는 SDK 버전을 한 번에 하나씩 순차적으로 업그레이드할 것을 권장합니다. 이렇게 하면 업그레이드 과정에서 발생하는 문제와 오류를 정확히 파악하는 데 도움이 됩니다. 프로젝트 업그레이드에 대한 최신 정보는 [Expo SDK 업그레이드 안내](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)를 참조하세요.

## React Native 프로젝트

일반적인 React Native 프로젝트는 Android 프로젝트, iOS 프로젝트, JavaScript 프로젝트로 구성되어 있어 업그레이드가 다소 복잡할 수 있습니다. [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/)는 두 버전 사이에서 발생하는 모든 변경 사항을 제공하여 앱 업그레이드를 도와주는 웹 도구입니다. 또한 특정 파일에 대한 설명을 표시하여 해당 변경이 필요한 이유를 이해하는 데 도움을 줍니다.

### 1. 버전 선택

먼저 업그레이드하려는 시작 버전과 목표 버전을 선택해야 합니다. 기본적으로 최신 주요 버전이 선택됩니다. 선택 후 "Show me how to upgrade" 버튼을 클릭하세요.

💡 주요 업데이트의 경우 업그레이드에 도움이 되는 링크가 포함된 "유용한 콘텐츠" 섹션이 상단에 표시됩니다.

### 2. 의존성 업그레이드

처음 표시되는 파일은 `package.json`입니다. 해당 파일에 표시된 의존성을 업데이트하는 것이 좋습니다. 예를 들어, `react-native`와 `react`가 변경 사항으로 나타나면 다음 명령을 실행하여 프로젝트에 설치할 수 있습니다.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
npm install react-native@{{VERSION}}
npm install react@{{REACT_VERSION}}
```

</TabItem>
<TabItem value="yarn">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
yarn add react-native@{{VERSION}}
yarn add react@{{REACT_VERSION}}
```

</TabItem>
</Tabs>

### 3. 프로젝트 파일 업그레이드

새 릴리스에는 `npx react-native init` 실행 시 생성되는 다른 파일들에 대한 업데이트가 포함될 수 있습니다. 해당 파일들은 [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) 페이지에서 `package.json` 다음에 나열됩니다. 다른 변경 사항이 없다면 프로젝트를 재빌드하기만 하면 개발을 계속할 수 있습니다. 변경 사항이 있는 경우, 해당 내용을 프로젝트에 수동으로 적용해야 합니다.

### 문제 해결

#### 모든 변경 사항을 적용했는데도 앱이 여전히 이전 버전을 사용합니다

이런 종류의 오류는 보통 캐시와 관련이 있습니다. [react-native-clean-project](https://github.com/pmadruga/react-native-clean-project)를 설치하여 프로젝트의 모든 캐시를 지운 후 다시 실행해 보는 것을 권장합니다.
