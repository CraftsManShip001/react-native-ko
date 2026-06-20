---
id: libraries
title: 라이브러리 사용하기
author: Brent Vatne
authorURL: 'https://twitter.com/notbrent'
description: 이 가이드는 React Native 개발자가 앱에서 서드파티 라이브러리를 찾고, 설치하고, 사용하는 방법을 소개합니다.
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native는 앱에서 바로 사용할 수 있는 [핵심 컴포넌트 및 API](./components-and-apis) 세트를 제공합니다. 하지만 React Native에 번들로 제공되는 컴포넌트와 API만 사용할 수 있는 것은 아닙니다. React Native에는 수천 명의 개발자로 이루어진 커뮤니티가 있습니다. 핵심 컴포넌트와 API에서 원하는 기능을 찾을 수 없다면, 커뮤니티에서 라이브러리를 찾아 설치하여 앱에 해당 기능을 추가할 수 있습니다.

## 패키지 매니저 선택하기

React Native 라이브러리는 일반적으로 [npm CLI](https://docs.npmjs.com/cli/npm) 또는 [Yarn Classic](https://classic.yarnpkg.com/en/)과 같은 Node.js 패키지 매니저를 사용하여 [npm 레지스트리](https://www.npmjs.com/)에서 설치합니다.

컴퓨터에 Node.js가 설치되어 있다면 npm CLI도 이미 설치되어 있습니다. 일부 개발자는 약간 더 빠른 설치 시간과 Workspaces 같은 추가 고급 기능 때문에 Yarn Classic을 선호합니다. 두 도구 모두 React Native와 잘 작동합니다. 이 가이드에서는 설명의 단순함을 위해 npm을 기준으로 설명합니다.

:::note
JavaScript 커뮤니티에서는 "라이브러리"와 "패키지"라는 용어를 혼용합니다.
:::

## 라이브러리 설치하기

프로젝트에 라이브러리를 설치하려면 터미널에서 프로젝트 디렉터리로 이동한 후 설치 명령을 실행하세요. `react-native-webview`를 예시로 시도해 봅시다:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install react-native-webview
```

</TabItem>
<TabItem value="yarn">

```shell
yarn add react-native-webview
```

</TabItem>
</Tabs>

설치한 라이브러리에는 네이티브 코드가 포함되어 있으므로, 사용하기 전에 앱에 링크해야 합니다.

## iOS에서 네이티브 코드 링크하기

React Native는 iOS 프로젝트 의존성을 관리하기 위해 CocoaPods를 사용하며, 대부분의 React Native 라이브러리도 이 규칙을 따릅니다. 사용 중인 라이브러리가 이를 따르지 않는 경우에는 해당 라이브러리의 README를 참조하세요. 대부분의 경우 다음 지침을 따르면 됩니다.

네이티브 iOS 프로젝트에 링크하려면 `ios` 디렉터리에서 `pod install`을 실행하세요. `ios` 디렉터리로 이동하지 않고 실행하는 단축 명령은 `npx pod-install`입니다.

```bash
npx pod-install
```

완료되면 앱 바이너리를 다시 빌드하여 새 라이브러리를 사용할 수 있도록 하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios
```

</TabItem>
</Tabs>

## Android에서 네이티브 코드 링크하기

React Native는 Android 프로젝트 의존성을 관리하기 위해 Gradle을 사용합니다. 네이티브 의존성이 있는 라이브러리를 설치한 후에는 새 라이브러리를 사용하기 위해 앱 바이너리를 다시 빌드해야 합니다:

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

## 라이브러리 찾기

[React Native Directory](https://reactnative.directory)는 React Native 전용으로 제작된 라이브러리를 검색할 수 있는 데이터베이스입니다. React Native 앱에 필요한 라이브러리를 찾을 때 가장 먼저 확인해야 할 곳입니다.

디렉터리에서 찾을 수 있는 라이브러리 중 많은 수가 [React Native Community](https://github.com/react-native-community/) 또는 [Expo](https://docs.expo.dev/versions/latest/)에서 제공됩니다.

React Native Community에서 만든 라이브러리는 React Native에 의존하는 기업의 자원봉사자와 개인에 의해 운영됩니다. iOS, tvOS, Android, Windows를 지원하는 경우가 많지만, 프로젝트마다 다릅니다. 이 조직의 라이브러리 중 많은 수가 이전에는 React Native 핵심 컴포넌트 및 API였습니다.

Expo에서 만든 라이브러리는 모두 TypeScript로 작성되었으며 가능한 경우 iOS, Android, `react-native-web`을 지원합니다.

React Native Directory 다음으로, 디렉터리에서 React Native 전용 라이브러리를 찾을 수 없는 경우 [npm 레지스트리](https://www.npmjs.com/)가 다음으로 좋은 선택입니다. npm 레지스트리는 JavaScript 라이브러리의 공식 소스이지만, 그 중 모든 라이브러리가 React Native와 호환되는 것은 아닙니다. React Native는 Node.js, 웹 브라우저, Electron 등 다양한 JavaScript 프로그래밍 환경 중 하나이며, npm에는 이러한 모든 환경에서 작동하는 라이브러리가 포함되어 있습니다.

## 라이브러리 호환성 확인하기

### React Native에서 작동하는가?

일반적으로 _다른 플랫폼 전용으로 제작된_ 라이브러리는 React Native에서 작동하지 않습니다. 예를 들어, `react-select`는 웹 전용으로 제작되어 `react-dom`을 대상으로 하며, `rimraf`는 Node.js용으로 제작되어 컴퓨터 파일 시스템과 상호작용합니다. 반면 `lodash`와 같은 라이브러리는 JavaScript 언어 기능만 사용하므로 어떤 환경에서도 작동합니다. 시간이 지나면 감이 생기겠지만, 그 전까지는 직접 시도해 보는 것이 가장 쉬운 방법입니다. React Native에서 작동하지 않는다면 `npm uninstall`을 사용하여 패키지를 제거할 수 있습니다.

### 내 앱이 지원하는 플랫폼에서 작동하는가?

[React Native Directory](https://reactnative.directory)에서는 iOS, Android, Web, Windows 등 플랫폼 호환성으로 필터링할 수 있습니다. 사용하려는 라이브러리가 현재 목록에 없다면, 라이브러리의 README를 참조하여 자세한 내용을 확인하세요.

### 내 앱의 React Native 버전과 호환되는가?

라이브러리의 최신 버전은 일반적으로 React Native의 최신 버전과 호환됩니다. 이전 버전을 사용 중이라면 어떤 버전의 라이브러리를 설치해야 하는지 README를 참조하세요. `npm install <library-name>@<version-number>` 명령을 실행하여 특정 버전의 라이브러리를 설치할 수 있습니다. 예를 들어: `npm install @react-native-community/netinfo@^2.0.0`.
