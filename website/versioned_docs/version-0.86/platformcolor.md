---
id: platformcolor
title: PlatformColor
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

```js
PlatformColor(color1, [color2, ...colorN]);
```

`PlatformColor` 함수를 사용하면 네이티브 색상에 해당하는 문자열 값을 전달하여 대상 플랫폼의 네이티브 색상에 접근할 수 있습니다. `PlatformColor` 함수에 문자열을 전달하면, 해당 플랫폼에 그 색상이 존재하는 경우 대응하는 네이티브 색상을 반환하며, 애플리케이션의 어느 부분에든 적용할 수 있습니다.

`PlatformColor` 함수에 두 개 이상의 문자열 값을 전달하면, 첫 번째 값을 기본값으로, 나머지 값들을 fallback으로 처리합니다.

```js
PlatformColor('bogusName', 'linkColor');
```

네이티브 색상은 테마 및/또는 고대비 설정에 민감할 수 있으므로, 이 플랫폼별 로직은 컴포넌트 내부에서도 동일하게 적용됩니다.

### 지원되는 색상

지원되는 시스템 색상 유형의 전체 목록은 다음을 참고하세요:

- Android:
  - [R.attr](https://developer.android.com/reference/android/R.attr) - `?attr` 접두사
  - [R.color](https://developer.android.com/reference/android/R.color) - `@android:color` 접두사
- iOS (Objective-C 및 Swift 표기법):
  - [UIColor Standard Colors](https://developer.apple.com/documentation/uikit/uicolor/standard_colors)
  - [UIColor UI Element Colors](https://developer.apple.com/documentation/uikit/uicolor/ui_element_colors)

#### 개발자 참고사항

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["web"])}>

<TabItem value="web">

:::info
디자인 시스템에 익숙하다면, `PlatformColor`를 로컬 디자인 시스템의 색상 토큰에 접근하는 방법으로 생각할 수 있습니다. 이를 통해 앱이 플랫폼과 자연스럽게 어우러질 수 있습니다!
:::

</TabItem>
</Tabs>

## 예제

```SnackPlayer name=PlatformColor%20Example&supportedPlatforms=android,ios
import {Platform, PlatformColor, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>I am a special label color!</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  label: {
    padding: 16,
    fontWeight: '800',
    ...Platform.select({
      ios: {
        color: PlatformColor('label'),
        backgroundColor: PlatformColor('systemTealColor'),
      },
      android: {
        color: PlatformColor('?android:attr/textColor'),
        backgroundColor: PlatformColor('@android:color/holo_blue_bright'),
      },
      default: {color: 'black'},
    }),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

`PlatformColor` 함수에 전달하는 문자열 값은 앱이 실행되는 네이티브 플랫폼에 존재하는 문자열과 정확히 일치해야 합니다. 런타임 오류를 방지하려면, 위 예제에서 보여주는 것처럼 `Platform.OS === 'platform'` 또는 `Platform.select()`를 통해 플랫폼 검사로 함수를 감싸야 합니다.

:::note
`PlatformColor`의 올바른 사용 방법을 보여주는 전체 예제는 [PlatformColorExample.js](https://github.com/facebook/react-native/blob/main/packages/rn-tester/js/examples/PlatformColor/PlatformColorExample.js)에서 확인할 수 있습니다.
:::
