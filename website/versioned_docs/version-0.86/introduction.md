---
id: getting-started
title: 소개
description: 이 유용한 가이드는 React Native 학습, 문서 활용, 환경 설정을 위한 사전 요구 사항을 설명합니다.
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="content-banner">
  React Native 여정의 시작을 환영합니다! 시작하기 지침을 찾고 계신다면, <a href="environment-setup">별도 섹션</a>으로 이동되었습니다. 문서, Native 컴포넌트, React 등에 대한 소개를 계속 읽어보세요!
  <img className="content-banner-img" src="/docs/assets/p_android-ios-devices.svg" alt=" " />
</div>

React Native는 숙련된 iOS 개발자부터 React 입문자, 처음으로 프로그래밍을 시작하는 사람까지 다양한 사람들이 사용합니다. 이 문서는 경험 수준이나 배경에 상관없이 모든 학습자를 위해 작성되었습니다.

## 이 문서를 활용하는 방법

여기서 시작하여 책처럼 순서대로 읽거나, 필요한 특정 섹션만 읽을 수 있습니다. 이미 React에 익숙하신가요? [해당 섹션](intro-react)을 건너뛰거나 가볍게 복습하기 위해 읽어보세요.

## 사전 요구 사항

React Native로 작업하려면 JavaScript 기초를 이해해야 합니다. JavaScript를 처음 접하거나 복습이 필요하다면, Mozilla Developer Network에서 [처음부터 배우거나](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [재입문할](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) 수 있습니다.

:::info
React, Android, iOS 개발에 대한 사전 지식을 가정하지 않으려고 최선을 다하고 있지만, 이런 주제들은 React Native 개발자 지망생에게 가치 있는 학습 주제입니다. 적절한 경우 더 깊이 다루는 리소스와 문서 링크를 제공하였습니다.
:::

## 인터랙티브 예시

이 소개에서는 다음과 같은 인터랙티브 예시를 통해 브라우저에서 바로 시작할 수 있습니다:

```SnackPlayer name=Hello%20World
import {Text, View} from 'react-native';

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
};

export default YourApp;
```

위는 Snack Player입니다. Expo가 만든 편리한 도구로, React Native 프로젝트를 삽입하고 실행하며 Android와 iOS 같은 플랫폼에서 어떻게 렌더링되는지 공유할 수 있습니다. 코드는 라이브로 편집 가능하므로 브라우저에서 바로 실험해 볼 수 있습니다. 위의 "Try editing me!" 텍스트를 "Hello, world!"로 바꿔 보세요!

:::tip
선택적으로 로컬 개발 환경을 설정하고 싶다면, [로컬 머신에서 환경 설정 가이드를 따라](set-up-your-environment) 코드 예시를 프로젝트에 붙여넣을 수 있습니다. (웹 개발자라면 이미 모바일 브라우저 테스트를 위한 로컬 환경이 설정되어 있을 수 있습니다!)
:::

## 개발자 노트

다양한 개발 배경을 가진 분들이 React Native를 배우고 있습니다. 웹, Android, iOS 등 다양한 기술을 경험하셨을 수 있습니다. 모든 배경의 개발자들을 위해 작성하려고 노력합니다. 때로는 다음과 같이 특정 플랫폼에 대한 설명을 제공합니다:

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["android","ios","web"])}>

<TabItem value="android">

:::info
Android 개발자에게는 이 개념이 친숙할 수 있습니다.
:::

</TabItem>
<TabItem value="ios">

:::info
iOS 개발자에게는 이 개념이 친숙할 수 있습니다.
:::

</TabItem>
<TabItem value="web">

:::info
웹 개발자에게는 이 개념이 친숙할 수 있습니다.
:::

</TabItem>
</Tabs>

## 형식

메뉴 경로는 굵게 표시되며 서브메뉴 탐색에는 꺾쇠 기호를 사용합니다. 예시: **Android Studio > Preferences**

---

이 가이드의 작동 방식을 알았으니, 이제 React Native의 기반인 [Native 컴포넌트](intro-react-native-components.md)에 대해 알아볼 시간입니다.
