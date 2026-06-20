---
id: imagebackground
title: ImageBackground
---

웹에 익숙한 개발자들의 일반적인 기능 요청 중 하나가 `background-image`입니다. 이 사용 사례를 처리하기 위해 `<Image>`와 동일한 props를 가지는 `<ImageBackground>` 컴포넌트를 사용할 수 있으며, 그 위에 레이어로 쌓고 싶은 자식 요소를 추가할 수 있습니다.

구현이 기본적이기 때문에 일부 경우에는 `<ImageBackground>`를 사용하지 않을 수도 있습니다. 더 깊이 이해하려면 `<ImageBackground>`의 [소스 코드](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Image/ImageBackground.js)를 참조하고, 필요한 경우 커스텀 컴포넌트를 만드세요.

너비와 높이 스타일 속성을 반드시 지정해야 합니다.

## 예시

```SnackPlayer name=ImageBackground
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
```

---

# 레퍼런스

## Props

### [Image Props](image.md#props)

[Image Props](image.md#props)를 상속합니다.

---

### `imageStyle`

| Type                                |
| ----------------------------------- |
| [Image Style](image-style-props.md) |

---

### `imageRef`

마운트 시 내부 `Image` 컴포넌트의 [element node](element-nodes)가 할당될 ref 세터입니다.

---

### `style`

| Type                              |
| --------------------------------- |
| [View Style](view-style-props.md) |
