---
id: tutorial
title: 기초 배우기
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native는 React와 유사하지만, 웹 컴포넌트 대신 네이티브 컴포넌트를 빌딩 블록으로 사용합니다. 따라서 React Native 앱의 기본 구조를 이해하려면 JSX, 컴포넌트, `state`, `props`와 같은 기본적인 React 개념들을 이해해야 합니다. React를 이미 알고 있더라도 네이티브 컴포넌트와 같이 React Native만의 내용을 배워야 합니다. 이 튜토리얼은 React 경험 유무에 관계없이 모든 독자를 대상으로 합니다.

시작해 봅시다.

## Hello World

오랜 전통에 따라 "Hello, world!"만 출력하는 앱을 먼저 만들어보겠습니다. 다음과 같습니다:

```SnackPlayer name=Hello%20World
import {Text, View} from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};
export default HelloWorldApp;
```

궁금하다면 웹 시뮬레이터에서 샘플 코드를 직접 수정해볼 수 있습니다. 또한 `App.js` 파일에 붙여넣어 로컬 환경에서 실제 앱을 만들 수도 있습니다.

## 무슨 일이 일어나고 있나요?

1. 먼저 `JSX`를 사용하기 위해 `React`를 import해야 합니다. JSX는 각 플랫폼의 네이티브 컴포넌트로 변환됩니다.
2. 2번째 줄에서 `react-native`로부터 `Text`와 `View` 컴포넌트를 import합니다.

그런 다음 `HelloWorldApp` 함수를 정의합니다. 이 함수는 [함수 컴포넌트](https://react.dev/reference/react/Component)이며 웹의 React와 동일하게 동작합니다. 이 함수는 몇 가지 스타일이 적용된 `View` 컴포넌트와 자식 요소로 `Text`를 반환합니다.

`Text` 컴포넌트는 텍스트를 렌더링하고, `View` 컴포넌트는 컨테이너를 렌더링합니다. 이 컨테이너에는 여러 스타일이 적용되어 있는데, 각각이 어떤 역할을 하는지 살펴보겠습니다.

첫 번째 스타일은 `flex: 1`입니다. [`flex`](layout-props#flex) prop은 항목들이 기본 축을 따라 사용 가능한 공간을 어떻게 "채울지"를 정의합니다. 컨테이너가 하나뿐이므로 부모 컴포넌트의 모든 사용 가능한 공간을 차지합니다. 이 경우 유일한 컴포넌트이므로 화면의 모든 사용 가능한 공간을 차지합니다.

다음 스타일은 [`justifyContent`](layout-props#justifycontent): "center"입니다. 이는 컨테이너의 기본 축 중앙에 자식 요소들을 정렬합니다. 마지막으로 [`alignItems`](layout-props#alignitems): "center"는 컨테이너의 교차 축 중앙에 자식 요소들을 정렬합니다.

여기서 일부 내용이 JavaScript처럼 보이지 않을 수도 있습니다. 걱정하지 마세요. _이것이 미래입니다._

우선 ES2015(ES6라고도 함)는 이제 공식 표준의 일부가 된 JavaScript 개선 사항의 집합이지만, 아직 모든 브라우저에서 지원되지 않아 웹 개발에서는 아직 사용되지 않는 경우가 많습니다. React Native는 ES2015를 지원하므로 호환성 걱정 없이 사용할 수 있습니다. 위 예시의 `import`, `export`, `const`, `from`은 모두 ES2015 기능입니다. ES2015에 익숙하지 않다면 이 튜토리얼과 같은 샘플 코드를 읽으면서 배울 수 있습니다. 원한다면 [이 페이지](https://babeljs.io/learn-es2015/)에서 ES2015 기능에 대한 좋은 개요를 볼 수 있습니다.

이 코드 예시에서 또 다른 특이한 점은 `<View><Text>Hello world!</Text></View>`입니다. 이는 JSX로, JavaScript 내에 XML을 포함하는 문법입니다. 많은 프레임워크는 마크업 언어 안에 코드를 삽입하는 특수 템플릿 언어를 사용합니다. React에서는 반대입니다. JSX를 사용하면 코드 안에 마크업 언어를 작성할 수 있습니다. 웹의 HTML처럼 보이지만, `<div>`나 `<span>` 같은 웹 요소 대신 React 컴포넌트를 사용합니다. 이 경우 `<Text>`는 텍스트를 표시하는 [Core Component](intro-react-native-components)이고 `View`는 `<div>` 또는 `<span>`과 같습니다.

## 컴포넌트

이 코드는 새로운 `Component`인 `HelloWorldApp`을 정의하고 있습니다. React Native 앱을 만들 때는 새로운 컴포넌트를 많이 만들게 됩니다. 화면에 보이는 모든 것은 어떤 형태의 컴포넌트입니다.

## Props

대부분의 컴포넌트는 생성 시 다양한 파라미터로 커스터마이즈할 수 있습니다. 이러한 생성 파라미터를 props라고 합니다.

직접 만든 컴포넌트에서도 `props`를 사용할 수 있습니다. 이를 통해 앱의 여러 위치에서 약간씩 다른 속성으로 하나의 컴포넌트를 재사용할 수 있습니다. 함수 컴포넌트에서는 `props.YOUR_PROP_NAME`으로, 클래스 컴포넌트에서는 `this.props.YOUR_PROP_NAME`으로 참조합니다. 다음은 예시입니다:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Hello%20Props&ext=js
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

const Greeting = props => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

export default LotsOfGreetings;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Hello%20Props&ext=tsx
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

type GreetingProps = {
  name: string;
};

const Greeting = (props: GreetingProps) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

export default LotsOfGreetings;
```

</TabItem>
</Tabs>

`name`을 prop으로 사용하면 `Greeting` 컴포넌트를 커스터마이즈할 수 있어, 각 인사말에 해당 컴포넌트를 재사용할 수 있습니다. 이 예시에서는 JSX에서 `Greeting` 컴포넌트도 사용합니다. 이런 것이 가능하다는 점이 React를 훌륭하게 만드는 이유입니다.

여기서 새롭게 등장하는 것은 [`View`](view.md) 컴포넌트입니다. [`View`](view.md)는 다른 컴포넌트를 담는 컨테이너로 유용하며, 스타일과 레이아웃을 제어하는 데 도움이 됩니다.

`props`와 기본 [`Text`](text.md), [`Image`](image.md), [`View`](view.md) 컴포넌트를 사용하여 다양한 정적 화면을 만들 수 있습니다. 앱이 시간이 지남에 따라 변하는 방법을 배우려면 [State에 대해 알아보세요](#state).

## State

[읽기 전용](https://react.dev/reference/react/Component#props)이며 수정해서는 안 되는 props와 달리, `state`는 React 컴포넌트가 사용자 동작, 네트워크 응답 및 기타 다른 것에 반응하여 시간이 지남에 따라 출력을 변경할 수 있도록 합니다.

#### React에서 state와 props의 차이점은 무엇인가요?

React 컴포넌트에서 props는 부모 컴포넌트에서 자식 컴포넌트로 전달하는 변수입니다. 마찬가지로 state도 변수이지만, 파라미터로 전달되는 것이 아니라 컴포넌트가 내부적으로 초기화하고 관리합니다.

#### React와 React Native에서 state를 처리하는 방식에 차이가 있나요?

<div className="two-columns">

```tsx
// React Counter Example using Hooks!

import {useState} from 'react';



const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <p>You clicked {count} times</p>
      <button
        onClick={() => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
};


// CSS
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

```

```tsx
// React Native Counter Example using Hooks!

import {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me!"
      />
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

</div>

위에서 볼 수 있듯이, [React](https://react.dev/learn/state-a-components-memory)와 `React Native` 사이에 `state` 처리 방식의 차이는 없습니다. 클래스와 [hooks](https://react.dev/reference/react/useState)를 사용하는 함수 컴포넌트 모두에서 컴포넌트의 state를 사용할 수 있습니다!

다음 예시에서는 클래스를 사용하여 위와 동일한 카운터 예시를 보여줍니다.

```SnackPlayer name=Hello%20Classes
import {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

class App extends Component {
  state = {
    count: 0,
  };

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>You clicked {this.state.count} times</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10,
  },
});

export default App;
```
