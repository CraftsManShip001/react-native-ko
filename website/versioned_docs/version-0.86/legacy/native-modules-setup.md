---
id: native-modules-setup
title: 네이티브 모듈 NPM 패키지 설정
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

네이티브 모듈은 일반적으로 npm 패키지로 배포됩니다. 단, 일반적인 JavaScript 외에도 플랫폼별 네이티브 코드가 포함됩니다. npm 패키지에 대해 더 알고 싶다면 [이 가이드](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)를 참고하세요.

네이티브 모듈을 위한 기본 프로젝트 구조를 설정하기 위해 커뮤니티 도구인 [create-react-native-library](https://callstack.github.io/react-native-builder-bob/create)를 사용합니다. 이 라이브러리의 작동 방식을 더 깊이 살펴볼 수도 있지만, 여기서는 기본 스크립트만 실행하면 됩니다.

```shell
npx create-react-native-library@latest react-native-awesome-module
```

여기서 `react-native-awesome-module`은 새 모듈에 원하는 이름입니다. 이 작업이 끝나면 `react-native-awesome-module` 폴더로 이동하여 다음 명령을 실행해 예제 프로젝트를 초기화합니다.

```shell
yarn
```

초기화가 완료되면 다음 명령 중 하나를 실행하여 예제 앱을 시작할 수 있습니다.

```shell
# Android 앱
yarn example android
# iOS 앱
yarn example ios
```

위의 모든 단계가 완료되면 [Android 네이티브 모듈](native-modules-android) 또는 [iOS 네이티브 모듈](native-modules-ios) 가이드를 계속 진행하여 코드를 추가할 수 있습니다.
