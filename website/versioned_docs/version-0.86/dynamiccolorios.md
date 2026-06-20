---
id: dynamiccolorios
title: DynamicColorIOS
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`DynamicColorIOS` 함수는 iOS에 특화된 플랫폼 색상 타입입니다.

```tsx
DynamicColorIOS({
  light: color,
  dark: color,
  highContrastLight: color, // (optional) will fallback to "light" if not provided
  highContrastDark: color, // (optional) will fallback to "dark" if not provided
});
```

`DynamicColorIOS`는 두 개의 필수 키 `dark`와 `light`, 그리고 두 개의 선택 키 `highContrastLight`와 `highContrastDark`를 포함하는 객체를 단일 인수로 받습니다. 이 값들은 iOS의 "라이트 모드"와 "다크 모드"에서 사용할 색상, 그리고 고대비 접근성 모드가 활성화되었을 때의 고대비 버전 색상에 해당합니다.

런타임에서 시스템은 현재 시스템 외관 및 접근성 설정에 따라 표시할 색상을 결정합니다. 다이나믹 색상은 시스템 설정 변경에 자동으로 반응해야 하는 브랜딩 색상이나 기타 앱별 색상에 유용합니다.

#### 개발자 노트

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["ios", "web"])}>

<TabItem value="web">

:::info
CSS의 `@media (prefers-color-scheme: dark)`에 익숙하다면, 이와 비슷한 개념입니다! 다만 미디어 쿼리에서 모든 색상을 정의하는 대신, 사용하는 바로 그 위치에서 어떤 상황에 어떤 색상을 사용할지 정의합니다. 간편하죠!
:::

</TabItem>
<TabItem value="ios">

:::info
`DynamicColorIOS` 함수는 iOS 네이티브 메서드 [`UIColor colorWithDynamicProvider:`](https://developer.apple.com/documentation/uikit/uicolor/3238040-colorwithdynamicprovider)와 유사합니다.
:::

</TabItem>
</Tabs>

## 예제

```tsx
import {DynamicColorIOS} from 'react-native';

const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue',
});

const customContrastDynamicTextColor = DynamicColorIOS({
  dark: 'darkgray',
  light: 'lightgray',
  highContrastDark: 'black',
  highContrastLight: 'white',
});
```
