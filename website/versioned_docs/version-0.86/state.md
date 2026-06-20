---
id: state
title: State
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

컴포넌트를 제어하는 데이터에는 `props`와 `state` 두 가지 유형이 있습니다. `props`는 부모에 의해 설정되며 컴포넌트의 수명 동안 고정됩니다. 변경되는 데이터에는 `state`를 사용해야 합니다.

일반적으로 생성자에서 `state`를 초기화하고, 변경하고 싶을 때 `setState`를 호출해야 합니다.

예를 들어, 계속 깜빡이는 텍스트를 만들고 싶다고 가정해 보겠습니다. 텍스트 자체는 깜빡이는 컴포넌트가 생성될 때 한 번 설정되므로 텍스트 자체는 `prop`입니다. "현재 텍스트가 보이는지 여부"는 시간이 지남에 따라 변경되므로 `state`로 관리해야 합니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=State&ext=js
import {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

const Blink = props => {
  const [isShowingText, setIsShowingText] = useState(true);

  useEffect(() => {
    const toggle = setInterval(() => {
      setIsShowingText(!isShowingText);
    }, 1000);

    return () => clearInterval(toggle);
  });

  if (!isShowingText) {
    return null;
  }

  return <Text>{props.text}</Text>;
};

const BlinkApp = () => {
  return (
    <View style={{marginTop: 50}}>
      <Blink text="I love to blink" />
      <Blink text="Yes blinking is so great" />
      <Blink text="Why did they ever take this out of HTML" />
      <Blink text="Look at me look at me look at me" />
    </View>
  );
};

export default BlinkApp;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=State&ext=tsx
import {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

type BlinkProps = {
  text: string;
};

const Blink = (props: BlinkProps) => {
  const [isShowingText, setIsShowingText] = useState(true);

  useEffect(() => {
    const toggle = setInterval(() => {
      setIsShowingText(!isShowingText);
    }, 1000);

    return () => clearInterval(toggle);
  });

  if (!isShowingText) {
    return null;
  }

  return <Text>{props.text}</Text>;
};

const BlinkApp = () => {
  return (
    <View style={{marginTop: 50}}>
      <Blink text="I love to blink" />
      <Blink text="Yes blinking is so great" />
      <Blink text="Why did they ever take this out of HTML" />
      <Blink text="Look at me look at me look at me" />
    </View>
  );
};

export default BlinkApp;
```

</TabItem>
</Tabs>

실제 애플리케이션에서는 타이머로 state를 설정하는 경우가 거의 없습니다. 서버에서 새 데이터가 오거나 사용자 입력이 있을 때 state를 설정할 수 있습니다. 또한 [Redux](https://redux.js.org/)나 [MobX](https://mobx.js.org/)와 같은 state 컨테이너를 사용하여 데이터 흐름을 제어할 수도 있습니다. 그 경우에는 `setState`를 직접 호출하는 대신 Redux나 MobX를 사용하여 state를 수정합니다.

setState가 호출되면 BlinkApp은 컴포넌트를 다시 렌더링합니다. 타이머 내에서 setState를 호출하면, 타이머가 틱할 때마다 컴포넌트가 다시 렌더링됩니다.

State는 React에서와 동일하게 동작하므로, state 처리에 대한 자세한 내용은 [React.Component API](https://react.dev/reference/react/Component#setstate)를 참고하세요. 지금쯤 대부분의 예제가 기본 텍스트 색상을 사용한다는 것을 눈치채셨을 것입니다. 텍스트 색상을 사용자 정의하려면 [스타일에 대해 알아보기](style.md)가 필요합니다.
