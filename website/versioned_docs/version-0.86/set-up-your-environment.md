---
id: set-up-your-environment
title: 개발 환경 설정
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import constants from '@site/core/TabsConstants';

import GuideLinuxAndroid from './\_getting-started-linux-android.md';
import GuideMacOSAndroid from './\_getting-started-macos-android.md';
import GuideWindowsAndroid from './\_getting-started-windows-android.md';
import GuideMacOSIOS from './\_getting-started-macos-ios.md';

이 가이드에서는 Android Studio와 Xcode를 사용하여 프로젝트를 실행할 수 있도록 개발 환경을 설정하는 방법을 안내합니다. 이를 통해 Android 에뮬레이터와 iOS 시뮬레이터로 개발하고, 앱을 로컬에서 빌드하는 등의 작업이 가능합니다.

:::info
이 가이드는 Android Studio 또는 Xcode가 필요합니다. 이미 이 중 하나가 설치되어 있다면 몇 분 안에 시작할 수 있습니다. 설치되어 있지 않다면 설치 및 구성에 약 한 시간이 소요될 것으로 예상하세요.

<details>
<summary>개발 환경 설정이 반드시 필요한가요?</summary>

[Framework](/architecture/glossary#react-native-framework)를 사용하는 경우에는 개발 환경 설정이 필요하지 않습니다. React Native Framework를 사용하면 네이티브 앱 빌드를 Framework가 처리해 주기 때문에 Android Studio나 Xcode를 설치할 필요가 없습니다.

Framework 사용에 제약이 있거나 직접 Framework를 작성하려는 경우에는 로컬 환경 설정이 필수입니다. 환경 설정이 완료된 후에는 [프레임워크 없이 시작하기](getting-started-without-a-framework) 문서를 참고하세요.

</details>
:::

#### 개발 OS

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

#### 대상 OS

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'macOS, Android'

<GuideMacOSAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'macOS, iOS'

<GuideMacOSIOS/>

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windows">

#### 대상 OS

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Windows, Android'

<GuideWindowsAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Windows, iOS'

## 지원되지 않음

:::info
iOS용 네이티브 코드로 프로젝트를 빌드하려면 Mac이 필요합니다. iOS 기기에서 앱을 개발하려면 [Expo](environment-setup#expo로-새-react-native-프로젝트-시작하기)의 [Expo Go](https://expo.dev/go)를 사용하세요.
:::

</TabItem>
</Tabs>

</TabItem>
<TabItem value="linux">

#### 대상 OS

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Linux, Android'

<GuideLinuxAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Linux, iOS'

## 지원되지 않음

:::info
iOS용 네이티브 코드로 프로젝트를 빌드하려면 Mac이 필요합니다. iOS 기기에서 앱을 개발하려면 [Expo](environment-setup#expo로-새-react-native-프로젝트-시작하기)의 [Expo Go](https://expo.dev/go)를 사용하세요.
:::

</TabItem>
</Tabs>

</TabItem>
</Tabs>
