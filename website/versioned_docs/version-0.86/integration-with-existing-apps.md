---
id: integration-with-existing-apps
title: 기존 앱과의 통합
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem';

import IntegrationApple from './\_integration-with-existing-apps-ios.md'; import
IntegrationKotlin from './\_integration-with-existing-apps-kotlin.md';

React Native는 새로운 모바일 앱을 처음부터 시작할 때 훌륭한 선택입니다. 그러나 기존 네이티브 애플리케이션에 단일 뷰나 사용자 흐름을 추가할 때도 잘 작동합니다. 몇 가지 단계를 거치면 새로운 React Native 기반의 기능, 화면, 뷰 등을 추가할 수 있습니다.

구체적인 단계는 대상 플랫폼에 따라 다릅니다.

<Tabs groupId="language" queryString defaultValue="kotlin" values={[ {label: 'Android (Java & Kotlin)', value: 'kotlin'}, {label: 'iOS (Objective-C and Swift)', value: 'apple'}, ]}>

<TabItem value="kotlin">

<IntegrationKotlin />

</TabItem>
<TabItem value="apple">

<IntegrationApple />

</TabItem>
</Tabs>
