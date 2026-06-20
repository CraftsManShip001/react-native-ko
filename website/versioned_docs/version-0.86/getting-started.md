---
id: environment-setup
title: React Native 시작하기
hide_table_of_contents: true
---

import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

**React Native는 React를 아는 개발자가 네이티브 앱을 만들 수 있게 해줍니다.** 동시에, 네이티브 개발자는 React Native를 사용해 공통 기능을 한 번 작성함으로써 네이티브 플랫폼 간의 동등성을 확보할 수 있습니다.

우리는 React Native를 경험하는 가장 좋은 방법은 프로덕션에 바로 사용 가능한 앱을 만들 수 있는 모든 필요한 API를 갖춘 도구 상자인 **Framework**를 통하는 것이라고 믿습니다.

Framework 없이도 React Native를 사용할 수 있지만, 대부분의 개발자는 [Expo](https://expo.dev)와 같은 React Native Framework를 사용하면 이점을 얻는다는 것을 발견했습니다. Expo는 파일 기반 라우팅, 고품질 범용 라이브러리, 네이티브 파일을 직접 관리하지 않고도 네이티브 코드를 수정하는 플러그인 작성 기능을 제공합니다.

<details>
<summary>Framework 없이 React Native를 사용할 수 있나요?</summary>

네. Framework 없이 React Native를 사용할 수 있습니다. **하지만 React Native로 새 앱을 만드는 경우, Framework 사용을 권장합니다.**

간단히 말해, 앱 자체를 작성하는 데 시간을 쓸 수 있으며, 앱에 추가로 전체 Framework를 직접 작성하지 않아도 됩니다.

React Native 커뮤니티는 내비게이션, 네이티브 API 접근, 네이티브 의존성 처리 등에 대한 접근 방식을 수년에 걸쳐 다듬어왔습니다. 대부분의 앱은 이러한 핵심 기능이 필요합니다. React Native Framework는 앱 시작부터 이를 제공합니다.

Framework 없이는 핵심 기능을 구현하기 위한 자체 솔루션을 직접 작성하거나, 기존 라이브러리 모음을 조합해 Framework의 골격을 만들어야 합니다. 이는 앱을 시작할 때와 나중에 유지 관리할 때 모두 실제 작업이 필요합니다.

Framework가 잘 지원하지 못하는 특이한 제약 조건이 있거나 이러한 문제를 직접 해결하는 것을 선호한다면, Android Studio, Xcode를 사용해 Framework 없이 React Native 앱을 만들 수 있습니다. 이 방법에 관심이 있다면 [환경 설정](set-up-your-environment) 방법과 [프레임워크 없이 시작하는 방법](getting-started-without-a-framework)을 알아보세요.

</details>

## Expo로 새 React Native 프로젝트 시작하기

<PlatformSupport platforms={['android', 'ios', 'tv', 'web']} />

Expo는 프로덕션 수준의 React Native Framework입니다. Expo는 파일 기반 라우팅, 네이티브 모듈의 표준 라이브러리 등 앱 개발을 더 쉽게 만드는 개발자 도구를 제공합니다.

Expo의 Framework는 무료 오픈 소스이며, [GitHub](https://github.com/expo)와 [Discord](https://chat.expo.dev)에 활발한 커뮤니티가 있습니다. Expo 팀은 Meta의 React Native 팀과 긴밀히 협력하여 최신 React Native 기능을 Expo SDK에 제공합니다.

Expo 팀은 또한 개발 프로세스의 각 단계에서 Framework인 Expo를 보완하는 선택적 서비스 세트인 Expo Application Services(EAS)를 제공합니다.

새 Expo 프로젝트를 만들려면 터미널에서 다음을 실행하세요:

```shell
npx create-expo-app@latest
```

앱을 만든 후, Expo의 시작 가이드의 나머지 부분을 따라 앱 개발을 시작하세요.

<BoxLink href="https://docs.expo.dev/get-started/set-up-your-environment">Expo로 계속하기</BoxLink>
