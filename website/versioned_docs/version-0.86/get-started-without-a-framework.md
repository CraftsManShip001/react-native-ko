---
id: getting-started-without-a-framework
title: 프레임워크 없이 시작하기
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';
import PlatformSupport from '@site/src/theme/PlatformSupport';

import RemoveGlobalCLI from './\_remove-global-cli.md';

<PlatformSupport platforms={['android', 'ios', 'macOS', 'tv', 'watchOS', 'web', 'windows', 'visionOS']} />

[Framework](/architecture/glossary#react-native-framework)가 잘 지원하지 못하는 제약 조건이 있거나, 직접 Framework를 작성하는 것을 선호한다면, Framework 없이 React Native 앱을 만들 수 있습니다.

이를 위해 먼저 [환경을 설정](set-up-your-environment)해야 합니다. 설정이 완료되면 아래 단계를 따라 애플리케이션을 만들고 개발을 시작하세요.

### 1단계: 새 애플리케이션 만들기

<RemoveGlobalCLI />

[React Native Community CLI](https://github.com/react-native-community/cli)를 사용해 새 프로젝트를 생성할 수 있습니다. "AwesomeProject"라는 새 React Native 프로젝트를 만들어 보겠습니다:

```shell
npx @react-native-community/cli@latest init AwesomeProject
```

기존 애플리케이션에 React Native를 통합하거나, 프로젝트에 [Expo](https://docs.expo.dev/bare/installing-expo-modules/)를 설치했거나, 기존 React Native 프로젝트에 Android 지원을 추가하는 경우([기존 앱과의 통합](integration-with-existing-apps.md) 참조)라면 이 단계는 필요하지 않습니다. [Ignite CLI](https://github.com/infinitered/ignite)와 같은 서드파티 CLI를 사용해 React Native 앱을 설정할 수도 있습니다.

:::info

iOS에 문제가 있다면 다음을 실행해 의존성을 재설치해 보세요:

1. `cd ios`를 실행해 `ios` 폴더로 이동합니다.
2. `bundle install`을 실행해 [Bundler](https://bundler.io/)를 설치합니다.
3. `bundle exec pod install`을 실행해 CocoaPods가 관리하는 iOS 의존성을 설치합니다.

:::

#### [선택] 특정 버전 또는 템플릿 사용하기

특정 React Native 버전으로 새 프로젝트를 시작하려면 `--version` 인수를 사용하면 됩니다:

```shell
npx @react-native-community/cli@X.XX.X init AwesomeProject --version X.XX.X
```

`--template` 인수를 사용해 커스텀 React Native 템플릿으로 프로젝트를 시작할 수도 있습니다. 자세한 내용은 [여기](https://github.com/react-native-community/cli/blob/main/docs/init.md#initializing-project-with-custom-template)를 참고하세요.

### 2단계: Metro 시작하기

[**Metro**](https://metrobundler.dev/)는 React Native용 JavaScript 빌드 도구입니다. Metro 개발 서버를 시작하려면 프로젝트 폴더에서 다음을 실행하세요:

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

:::note
웹 개발에 익숙하다면, Metro는 Vite나 webpack 같은 번들러와 유사하지만 React Native를 위해 처음부터 끝까지 설계된 도구입니다. 예를 들어, Metro는 [Babel](https://babel.dev/)을 사용해 JSX 같은 문법을 실행 가능한 JavaScript로 변환합니다.
:::

### 3단계: 애플리케이션 시작하기

Metro Bundler를 별도의 터미널에서 실행한 채로 두세요. React Native 프로젝트 폴더 안에서 새 터미널을 열고 다음을 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

모든 것이 올바르게 설정되었다면, 곧 Android 에뮬레이터에서 새 앱이 실행되는 것을 볼 수 있습니다.

이것은 앱을 실행하는 한 가지 방법입니다 — Android Studio에서 직접 실행할 수도 있습니다.

:::tip
이 방법이 작동하지 않는다면 [문제 해결](troubleshooting.md) 페이지를 참고하세요.
:::

### 4단계: 앱 수정하기

앱을 성공적으로 실행했으니, 이제 수정해 보겠습니다.

- 원하는 텍스트 편집기에서 `App.tsx`를 열고 몇 줄을 수정합니다.
- <kbd>R</kbd> 키를 두 번 누르거나 Dev 메뉴(<kbd>Ctrl</kbd> + <kbd>M</kbd>)에서 `Reload`를 선택해 변경 사항을 확인하세요!

### 완료!

첫 번째 barebone React Native 앱을 성공적으로 실행하고 수정했습니다. 축하합니다!

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

### 다음으로?

- 이 새 React Native 코드를 기존 애플리케이션에 추가하고 싶다면 [통합 가이드](integration-with-existing-apps.md)를 확인하세요.
- React Native에 대해 더 알아보고 싶다면 [React Native 소개](getting-started)를 확인하세요.
