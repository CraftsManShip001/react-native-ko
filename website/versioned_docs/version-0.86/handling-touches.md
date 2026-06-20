---
id: handling-touches
title: 터치 처리
---

사용자는 주로 터치를 통해 모바일 앱과 상호작용합니다. 버튼 탭하기, 목록 스크롤하기, 지도 확대·축소하기와 같은 다양한 제스처를 조합하여 사용합니다. React Native는 일반적인 제스처를 모두 처리할 수 있는 컴포넌트를 제공하며, 더 고급 제스처 인식을 위한 포괄적인 [제스처 응답 시스템](gesture-responder-system.md)도 갖추고 있습니다. 하지만 가장 먼저 관심을 가질 컴포넌트는 기본 Button일 것입니다.

## 기본 버튼 표시하기

[Button](button.md)은 모든 플랫폼에서 보기 좋게 렌더링되는 기본 버튼 컴포넌트를 제공합니다. 버튼을 표시하는 최소한의 예시는 다음과 같습니다:

```tsx
<Button
  onPress={() => {
    console.log('You tapped the button!');
  }}
  title="Press Me"
/>
```

iOS에서는 파란색 레이블로, Android에서는 밝은 텍스트가 있는 파란색 모서리가 둥근 사각형으로 렌더링됩니다. 버튼을 누르면 "onPress" 함수가 호출되며, 이 경우 알림 팝업이 표시됩니다. 원하는 경우 "color" props를 지정하여 버튼 색상을 변경할 수 있습니다.

![](/docs/assets/Button.png)

아래 예시를 사용하여 `Button` 컴포넌트를 자유롭게 실험해 보세요. 오른쪽 하단의 토글을 클릭하여 앱을 미리 볼 플랫폼을 선택한 다음 "Tap to Play"를 클릭하여 앱을 미리 볼 수 있습니다.

```SnackPlayer name=Button%20Basics
import {Alert, Button, StyleSheet, View} from 'react-native';

const ButtonBasics = () => {
  const onPress = () => {
    Alert.alert('You tapped the button!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Press Me" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Press Me" color="#841584" />
      </View>
      <View style={styles.alternativeLayoutButtonContainer}>
        <Button onPress={onPress} title="This looks great!" />
        <Button onPress={onPress} title="OK!" color="#841584" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ButtonBasics;
```

## Touchables

기본 버튼이 앱에 어울리지 않는다면, React Native가 제공하는 "Touchable" 컴포넌트를 사용하여 직접 버튼을 만들 수 있습니다. 이 컴포넌트들은 탭 제스처를 캡처하고 제스처가 인식될 때 피드백을 표시하는 기능을 제공합니다. 단, 기본 스타일은 제공하지 않으므로 앱에서 보기 좋게 만들려면 약간의 작업이 필요합니다.

어떤 "Touchable" 컴포넌트를 사용할지는 제공하고자 하는 피드백의 종류에 따라 달라집니다:

- 일반적으로 웹에서 버튼이나 링크를 사용할 곳에 [**TouchableHighlight**](touchablehighlight.md)를 사용할 수 있습니다. 사용자가 버튼을 누르면 뷰의 배경이 어두워집니다.

- Android에서 사용자의 터치에 반응하는 잉크 표면 반응 물결 효과를 표시하려면 [**TouchableNativeFeedback**](touchablenativefeedback.md) 사용을 고려할 수 있습니다.

- [**TouchableOpacity**](touchableopacity.md)는 버튼의 불투명도를 낮춰 사용자가 누르는 동안 배경이 보이도록 피드백을 제공하는 데 사용할 수 있습니다.

- 탭 제스처를 처리해야 하지만 피드백을 표시하고 싶지 않을 경우 [**TouchableWithoutFeedback**](touchablewithoutfeedback.md)을 사용하세요.

경우에 따라 사용자가 일정 시간 동안 뷰를 누르고 있는 것을 감지해야 할 수 있습니다. 이러한 길게 누르기는 "Touchable" 컴포넌트의 `onLongPress` props에 함수를 전달하여 처리할 수 있습니다.

이 모두를 실제로 확인해 보겠습니다:

```SnackPlayer name=Touchables
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Touchables = () => {
  const onPressButton = () => {
    Alert.alert('You tapped the button!');
  };

  const onLongPressButton = () => {
    Alert.alert('You long-pressed the button!');
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPressButton} underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableHighlight</Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableOpacity</Text>
        </View>
      </TouchableOpacity>
      <TouchableNativeFeedback
        onPress={onPressButton}
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackground()
            : undefined
        }>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            TouchableNativeFeedback{' '}
            {Platform.OS !== 'android' ? '(Android only)' : ''}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableHighlight
        onPress={onPressButton}
        onLongPress={onLongPressButton}
        underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>Touchable with Long Press</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});

export default Touchables;
```

## 스크롤 및 스와이프

터치 스크린 기기에서 일반적으로 사용되는 제스처에는 스와이프와 팬이 있습니다. 이를 통해 사용자는 항목 목록을 스크롤하거나 콘텐츠 페이지를 스와이프할 수 있습니다. 이를 위해 [ScrollView](scrollview.md) Core Component를 확인하세요.

## 알려진 이슈

- [react-native#29308](https://github.com/facebook/react-native/issues/29308#issuecomment-792864162): 터치 영역은 절대 부모 뷰의 경계를 넘어 확장되지 않으며, Android에서는 음수 마진이 지원되지 않습니다.
