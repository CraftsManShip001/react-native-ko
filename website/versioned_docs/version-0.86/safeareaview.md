---
id: safeareaview
title: '🗑️ SafeAreaView'
---

:::warning Deprecated
대신 [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context)를 사용하세요.
:::

`SafeAreaView`의 목적은 디바이스의 안전 영역 경계 내에서 콘텐츠를 렌더링하는 것입니다. 현재 iOS 11 이상의 iOS 디바이스에만 적용됩니다.

`SafeAreaView`는 중첩된 콘텐츠를 렌더링하고 내비게이션 바, 탭 바, 툴바 및 기타 상위 뷰로 덮이지 않는 뷰 영역을 반영하여 자동으로 패딩을 적용합니다. 또한, 가장 중요하게는 Safe Area의 패딩이 둥근 모서리나 카메라 노치(예: iPhone 13의 센서 하우징 영역)와 같은 화면의 물리적 제한을 반영합니다.

## 예제

사용하려면 최상위 뷰를 `flex: 1` 스타일이 적용된 `SafeAreaView`로 감싸세요. 애플리케이션 디자인에 맞는 배경색을 사용할 수도 있습니다.

```SnackPlayer name=SafeAreaView&supportedPlatforms=ios
import {StyleSheet, Text, SafeAreaView} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Page content</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default App;
```

---

# 참조

## Props

### [View Props](view.md#props)

[View Props](view.md#props)를 상속합니다.

:::note
패딩은 컴포넌트의 동작을 구현하는 데 사용되므로, `SafeAreaView`에 적용된 스타일의 패딩 규칙은 무시되며 플랫폼에 따라 다른 결과가 발생할 수 있습니다. 자세한 내용은 [#22211](https://github.com/facebook/react-native/issues/22211)을 참고하세요.
:::
