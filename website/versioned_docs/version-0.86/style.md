---
id: style
title: Style
---

React Native에서는 JavaScript를 사용하여 애플리케이션의 스타일을 지정합니다. 모든 핵심 컴포넌트는 `style`이라는 이름의 prop을 받습니다. 스타일 이름과 [값](colors.md)은 일반적으로 웹에서 CSS가 동작하는 방식과 일치하지만, 이름은 카멜 케이스로 작성됩니다. 예를 들어 `background-color` 대신 `backgroundColor`를 사용합니다.

`style` prop은 일반 JavaScript 객체일 수 있습니다. 이것이 예제 코드에서 주로 사용하는 방식입니다. 스타일 배열을 전달할 수도 있는데, 배열의 마지막 스타일이 우선 적용되므로 이를 이용해 스타일을 상속할 수 있습니다.

컴포넌트가 복잡해질수록 `StyleSheet.create`를 사용하여 여러 스타일을 한 곳에 정의하는 것이 더 깔끔합니다. 다음은 그 예시입니다:

```SnackPlayer name=Style
import {StyleSheet, Text, View} from 'react-native';

const LotsOfStyles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default LotsOfStyles;
```

일반적인 패턴 중 하나는 컴포넌트가 `style` prop을 받아 서브 컴포넌트의 스타일 지정에 사용하는 것입니다. 이를 통해 CSS에서처럼 스타일이 "계단식"으로 적용되게 할 수 있습니다.

텍스트 스타일을 커스터마이징하는 방법은 훨씬 더 많습니다. 전체 목록은 [Text 컴포넌트 레퍼런스](text.md)를 확인하세요.

이제 텍스트를 아름답게 만들 수 있습니다. 스타일 전문가가 되는 다음 단계는 [컴포넌트 크기를 제어하는 방법](height-and-width.md)을 배우는 것입니다.

## 알려진 문제

- [react-native#29308](https://github.com/facebook/react-native/issues/29308#issuecomment-792864162): 일부 경우에 React Native는 웹에서 CSS가 동작하는 방식과 일치하지 않습니다. 예를 들어, 터치 영역이 부모 뷰의 경계를 넘지 않으며 Android에서는 음수 마진이 지원되지 않습니다.
