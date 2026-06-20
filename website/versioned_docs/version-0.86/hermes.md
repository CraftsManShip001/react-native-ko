---
id: hermes
title: Hermes 사용하기
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<a href="https://hermesengine.dev">
  <img width={300} height={300} className="hermes-logo" src="/docs/assets/HermesLogo.svg" style={{height: "auto"}}/>
</a>

[Hermes](https://hermesengine.dev)는 React Native에 최적화된 오픈 소스 JavaScript 엔진입니다. 많은 앱에서 Hermes를 사용하면 JavaScriptCore에 비해 시작 시간 단축, 메모리 사용량 감소, 앱 크기 축소 효과를 얻을 수 있습니다.
Hermes는 React Native에서 기본값으로 사용되며 활성화하기 위한 추가 설정이 필요하지 않습니다.

## 번들된 Hermes

React Native에는 **번들된 버전**의 Hermes가 포함되어 있습니다.
React Native의 새 버전을 출시할 때마다 Hermes 버전을 빌드합니다. 이를 통해 사용 중인 React Native 버전과 완전히 호환되는 Hermes 버전을 사용할 수 있습니다.

이 변경 사항은 React Native 사용자에게 완전히 투명하게 처리됩니다. 이 페이지에 설명된 명령을 사용하여 Hermes를 비활성화할 수 있습니다.
[기술적 구현에 대한 자세한 내용은 이 페이지에서 읽을 수 있습니다](/architecture/bundled-hermes).

## Hermes 사용 여부 확인

새 앱을 처음부터 최근에 만들었다면, 환영 화면에서 Hermes가 활성화되어 있는지 확인할 수 있습니다:

<figure>
<img src="/docs/assets/HermesApp.png" height="600" alt="새 프로젝트에서 JS 엔진 상태를 찾을 수 있는 위치" />
</figure>

JavaScript에서 Hermes를 사용 중인지 확인하는 데 사용할 수 있는 `HermesInternal` 전역 변수를 사용할 수 있습니다:

```jsx
const isHermes = () => !!global.HermesInternal;
```

:::caution
비표준 방법으로 JS 번들을 로드하는 경우 `HermesInternal` 변수는 사용 가능하지만 고도로 최적화된 사전 컴파일된 바이트코드를 사용하고 있지 않을 수 있습니다.
`.hbc` 파일을 사용하고 있는지 확인하고 아래에 자세히 설명된 대로 변경 전후를 벤치마크하세요.
:::

Hermes의 이점을 확인하려면 앱의 릴리즈 빌드/배포를 만들어 비교해 보세요. 예를 들어 프로젝트 루트에서:

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Android'

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android -- --mode="release"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android --mode release
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="ios">

[//]: # 'iOS'

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --mode="Release"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --mode Release
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

이렇게 하면 빌드 시 JavaScript가 Hermes 바이트코드로 컴파일되어 기기에서의 앱 시작 속도가 향상됩니다.

## JavaScriptCore로 전환하기

React Native는 [JavaScript 엔진](javascript-environment)으로 JavaScriptCore를 사용하는 것도 지원합니다. Hermes를 비활성화하려면 [커뮤니티 저장소의 지침](https://github.com/react-native-community/javascriptcore)을 따르세요.
