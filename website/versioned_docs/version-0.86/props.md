---
id: props
title: Props
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

대부분의 컴포넌트는 생성 시 다양한 매개변수를 통해 커스터마이즈할 수 있습니다. 이렇게 전달된 매개변수를 `props`(properties의 약자)라고 합니다.

예를 들어, React Native의 기본 컴포넌트 중 하나인 `Image`를 살펴보겠습니다. 이미지를 생성할 때 `source`라는 prop을 사용하여 표시할 이미지를 제어할 수 있습니다.

```SnackPlayer name=Props
import {Image} from 'react-native';

const Bananas = () => {
  let pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
  };
  return (
    <Image source={pic} style={{width: 193, height: 110, marginTop: 50}} />
  );
};

export default Bananas;
```

`{pic}`을 감싸는 중괄호에 주목하세요. 이 중괄호는 변수 `pic`을 JSX에 삽입합니다. JSX 내의 중괄호 안에는 어떤 JavaScript 표현식도 넣을 수 있습니다.

여러분이 직접 만든 컴포넌트에서도 `props`를 사용할 수 있습니다. 이를 통해 `render` 함수에서 `props`를 참조함으로써, 앱의 여러 곳에서 각기 약간씩 다른 속성으로 재사용할 수 있는 단일 컴포넌트를 만들 수 있습니다. 아래 예시를 살펴보세요:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Props&ext=js
import {Text, View} from 'react-native';

const Greeting = props => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={{alignItems: 'center', top: 50}}>
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

```SnackPlayer name=Props&ext=tsx
import {Text, View} from 'react-native';

type GreetingProps = {
  name: string;
};

const Greeting = (props: GreetingProps) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={{alignItems: 'center', top: 50}}>
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

`name`을 prop으로 사용하면 `Greeting` 컴포넌트를 커스터마이즈할 수 있어, 각 인사말마다 해당 컴포넌트를 재사용할 수 있습니다. 이 예시에서는 [Core Components](intro-react-native-components)와 유사하게 JSX에서 `Greeting` 컴포넌트를 사용합니다. React가 훌륭한 이유가 바로 여기에 있습니다. 원하는 UI 기본 요소가 없다면 직접 만들 수 있습니다.

또 다른 새로운 개념은 [`View`](view.md) 컴포넌트입니다. [`View`](view.md)는 다른 컴포넌트의 컨테이너로서 스타일과 레이아웃을 제어하는 데 유용합니다.

`props`와 기본 [`Text`](text.md), [`Image`](image.md), [`View`](view.md) 컴포넌트를 활용하면 다양한 정적 화면을 구성할 수 있습니다. 시간이 지남에 따라 앱이 변경되도록 만드는 방법을 배우려면 [State에 대해 알아보세요](state.md).
