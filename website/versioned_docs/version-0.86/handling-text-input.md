---
id: handling-text-input
title: 텍스트 입력 처리하기
---

[`TextInput`](textinput)은 사용자가 텍스트를 입력할 수 있게 해주는 [핵심 컴포넌트](intro-react-native-components)입니다. 텍스트가 변경될 때마다 호출될 함수를 받는 `onChangeText` props와, 텍스트가 제출될 때 호출될 함수를 받는 `onSubmitEditing` props를 가지고 있습니다.

예를 들어, 사용자가 타이핑할 때 그 단어들을 다른 언어로 번역한다고 가정해 봅시다. 이 새로운 언어에서는 모든 단어가 같은 방식으로 표기됩니다: 🍕. 따라서 "Hello there Bob"이라는 문장은 "🍕 🍕 🍕"로 번역됩니다.

```SnackPlayer name=Handling%20Text%20Input
import {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TextInput
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        style={{
          height: 40,
          padding: 5,
          marginHorizontal: 8,
          borderWidth: 1,
        }}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text
          .split(' ')
          .map(word => word && '🍕')
          .join(' ')}
      </Text>
    </View>
  );
};

export default PizzaTranslator;
```

이 예제에서는 `text`가 시간이 지남에 따라 변경되기 때문에 state에 저장합니다.

텍스트 입력으로 할 수 있는 작업은 훨씬 더 많습니다. 예를 들어, 사용자가 타이핑하는 동안 텍스트의 유효성을 검사할 수 있습니다. 더 자세한 예제는 [제어 컴포넌트에 관한 React 문서](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable) 또는 [TextInput 레퍼런스 문서](textinput.md)를 참조하세요.

`TextInput`은 사용자가 앱과 상호작용하는 여러 방법 중 하나입니다. 입력을 처리하는 다른 방법의 예제는 [터치 처리하기](handling-touches.md) 문서를 참조하세요.

이제 또 다른 핵심 컴포넌트인 [ScrollView](using-a-scrollview)를 살펴보겠습니다.
