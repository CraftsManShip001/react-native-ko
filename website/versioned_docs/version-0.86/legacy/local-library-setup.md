---
id: local-library-setup
title: 로컬 라이브러리 설정
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

로컬 라이브러리는 레지스트리에 배포되지 않고 앱 내부에서 사용하는 뷰 또는 모듈을 포함하는 라이브러리입니다. 이는 로컬 라이브러리가 앱의 네이티브 코드와 분리된다는 점에서 뷰와 모듈에 대한 전통적인 설정 방식과 다릅니다.

로컬 라이브러리는 `android/` 및 `ios/` 폴더 외부에 생성되며, 오토링킹(autolinking)을 활용하여 앱과 통합됩니다. 로컬 라이브러리가 있는 구조는 다음과 같습니다.

```plaintext
MyApp
├── node_modules
├── modules <-- folder for your local libraries
│ └── awesome-module <-- your local library
├── android
├── ios
├── src
├── index.js
└── package.json
```

로컬 라이브러리의 코드가 `android/` 및 `ios/` 폴더 외부에 존재하기 때문에 향후 React Native 버전 업그레이드, 다른 프로젝트로 복사 등이 더 쉬워집니다.

로컬 라이브러리를 만들기 위해 [create-react-native-library](https://callstack.github.io/react-native-builder-bob/create)를 사용합니다. 이 도구에는 필요한 모든 템플릿이 포함되어 있습니다.

### 시작하기

React Native 애플리케이션의 루트 폴더 안에서 다음 명령을 실행하세요.

```shell
npx create-react-native-library@latest awesome-module
```

`awesome-module`은 새 모듈에 사용할 이름입니다. 프롬프트를 완료하면 새 모듈이 포함된 `modules` 폴더가 프로젝트 루트 디렉토리에 생성됩니다.

### 링킹

기본적으로, 생성된 라이브러리는 Yarn을 사용할 때는 `link:` 프로토콜을, npm을 사용할 때는 `file:` 프로토콜을 사용하여 프로젝트에 자동으로 링크됩니다.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>

<TabItem value="npm">

```json
"dependencies": {
  "awesome-module": "file:./modules/awesome-module"
}
```

</TabItem>
<TabItem value="yarn">

```json
"dependencies": {
  "awesome-module": "link:./modules/awesome-module"
}
```

</TabItem>
</Tabs>

이렇게 하면 `node_modules` 아래에 라이브러리로의 심볼릭 링크가 생성되어 오토링킹이 작동합니다.

### 의존성 설치

모듈을 링크하려면 의존성을 설치해야 합니다.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>

<TabItem value="npm">

```shell
npm install
```

</TabItem>
<TabItem value="yarn">

```shell
yarn install
```

</TabItem>
</Tabs>

### 앱에서 모듈 사용하기

앱에서 모듈을 사용하려면 이름으로 import할 수 있습니다.

```js
import {multiply} from 'awesome-module';
```
