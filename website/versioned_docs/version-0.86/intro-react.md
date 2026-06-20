---
id: intro-react
title: React 기초
description: React Native를 완전히 이해하려면 React에 대한 탄탄한 기반이 필요합니다. 이 짧은 React 소개가 시작하거나 복습하는 데 도움이 될 것입니다.
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native는 JavaScript로 사용자 인터페이스를 만들기 위한 인기 있는 오픈 소스 라이브러리인 [React](https://react.dev/) 위에서 실행됩니다. React Native를 최대한 활용하려면 React 자체를 이해하는 것이 도움이 됩니다. 이 섹션은 시작하거나 복습 과정으로 활용할 수 있습니다.

React의 핵심 개념을 다루겠습니다:

- 컴포넌트
- JSX
- props
- state

더 깊이 파고들고 싶다면 [React 공식 문서](https://react.dev/learn)를 확인해 보시기 바랍니다.

## 첫 번째 컴포넌트

이 React 소개의 나머지 부분에서는 예시로 고양이를 사용합니다. 이름과 일할 카페가 필요한 친근하고 다가가기 쉬운 존재들이죠. 여기 첫 번째 Cat 컴포넌트가 있습니다:

```SnackPlayer name=Your%20Cat
import {Text} from 'react-native';

const Cat = () => {
  return <Text>Hello, I am your cat!</Text>;
};

export default Cat;
```

방법은 다음과 같습니다: `Cat` 컴포넌트를 정의하려면, 먼저 JavaScript의 [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)를 사용하여 React Native의 [`Text`](/docs/text) Core Component를 가져옵니다:

```tsx
import {Text} from 'react-native';
```

컴포넌트는 함수로 시작합니다:

```tsx
const Cat = () => {};
```

컴포넌트를 청사진으로 생각할 수 있습니다. 함수 컴포넌트가 반환하는 것은 **React 엘리먼트**로 렌더링됩니다. React 엘리먼트를 사용하면 화면에 보여줄 내용을 설명할 수 있습니다.

여기서 `Cat` 컴포넌트는 `<Text>` 엘리먼트를 렌더링합니다:

```tsx
const Cat = () => {
  return <Text>Hello, I am your cat!</Text>;
};
```

JavaScript의 [`export default`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)를 사용하여 함수 컴포넌트를 내보내면 앱 전체에서 다음과 같이 사용할 수 있습니다:

```tsx
const Cat = () => {
  return <Text>Hello, I am your cat!</Text>;
};

export default Cat;
```

:::tip
이것은 컴포넌트를 내보내는 여러 방법 중 하나입니다. 이런 방식의 내보내기는 Snack Player와 잘 작동합니다. 그러나 앱의 파일 구조에 따라 다른 규칙을 사용해야 할 수도 있습니다. 이 [JavaScript imports and exports 치트시트](https://medium.com/dailyjs/javascript-module-cheatsheet-7bd474f1d829)가 도움이 될 수 있습니다.
:::

이제 `return` 문을 더 자세히 살펴보세요. `<Text>Hello, I am your cat!</Text>`는 엘리먼트 작성을 편리하게 만드는 JavaScript 문법인 JSX를 사용하고 있습니다.

## JSX

React와 React Native는 `<Text>Hello, I am your cat!</Text>`와 같이 JavaScript 안에서 엘리먼트를 작성할 수 있게 해주는 문법인 **JSX**를 사용합니다. React 문서에는 [JSX에 대한 포괄적인 가이드](https://react.dev/learn/writing-markup-with-jsx)가 있으니 더 자세히 알고 싶으시면 참고하세요. JSX는 JavaScript이기 때문에 그 안에서 변수를 사용할 수 있습니다. 여기서는 고양이의 이름인 `name`을 선언하고 `<Text>` 안에 중괄호로 감싸서 삽입합니다.

```SnackPlayer name=Curly%20Braces
import {Text} from 'react-native';

const Cat = () => {
  const name = 'Maru';
  return <Text>Hello, I am {name}!</Text>;
};

export default Cat;
```

`{getFullName("Rum", "Tum", "Tugger")}`와 같은 함수 호출을 포함한 모든 JavaScript 표현식이 중괄호 사이에서 작동합니다:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Curly%20Braces&ext=js
import {Text} from 'react-native';

const getFullName = (firstName, secondName, thirdName) => {
  return firstName + ' ' + secondName + ' ' + thirdName;
};

const Cat = () => {
  return <Text>Hello, I am {getFullName('Rum', 'Tum', 'Tugger')}!</Text>;
};

export default Cat;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Curly%20Braces&ext=tsx
import {Text} from 'react-native';

const getFullName = (
  firstName: string,
  secondName: string,
  thirdName: string,
) => {
  return firstName + ' ' + secondName + ' ' + thirdName;
};

const Cat = () => {
  return <Text>Hello, I am {getFullName('Rum', 'Tum', 'Tugger')}!</Text>;
};

export default Cat;
```

</TabItem>
</Tabs>

중괄호를 JSX 안에서 JS 기능으로 연결되는 포털이라고 생각해 보세요!

## 커스텀 컴포넌트

이미 [React Native의 Core Components](intro-react-native-components)를 만나 보셨을 것입니다. React를 사용하면 이런 컴포넌트들을 서로 중첩하여 새로운 컴포넌트를 만들 수 있습니다. 이처럼 중첩 가능하고 재사용 가능한 컴포넌트가 React 패러다임의 핵심입니다.

예를 들어, 아래와 같이 [`View`](view) 안에 [`Text`](text)와 [`TextInput`](textinput)을 중첩할 수 있으며, React Native가 함께 렌더링합니다:

```SnackPlayer name=Custom%20Components
import {Text, TextInput, View} from 'react-native';

const Cat = () => {
  return (
    <View>
      <Text>Hello, I am...</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="Name me!"
      />
    </View>
  );
};

export default Cat;
```

#### 개발자 노트

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["android", "web"])}>

<TabItem value="web">

:::info
웹 개발에 익숙하다면 `<View>`와 `<Text>`가 HTML을 연상시킬 수 있습니다! 애플리케이션 개발에서 `<div>`와 `<p>` 태그라고 생각해도 좋습니다.
:::

</TabItem>
<TabItem value="android">

:::info
Android에서는 보통 `LinearLayout`, `FrameLayout`, `RelativeLayout` 등 안에 View를 배치하여 화면에서 자식 View들이 어떻게 배열될지 정의합니다. React Native에서는 `View`가 자식의 레이아웃에 Flexbox를 사용합니다. [Flexbox를 사용한 레이아웃 가이드](flexbox)에서 더 자세히 알아볼 수 있습니다.
:::

</TabItem>
</Tabs>

`<Cat>`을 사용하면 코드를 반복하지 않고도 여러 곳에서 이 컴포넌트를 여러 번 렌더링할 수 있습니다:

```SnackPlayer name=Multiple%20Components
import {Text, View} from 'react-native';

const Cat = () => {
  return (
    <View>
      <Text>I am also a cat!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Text>Welcome!</Text>
      <Cat />
      <Cat />
      <Cat />
    </View>
  );
};

export default Cafe;
```

다른 컴포넌트를 렌더링하는 컴포넌트는 **부모 컴포넌트**입니다. 여기서 `Cafe`는 부모 컴포넌트이고 각 `Cat`은 **자식 컴포넌트**입니다.

카페에 원하는 만큼 고양이를 넣을 수 있습니다. 각 `<Cat>`은 고유한 엘리먼트를 렌더링하며—props로 커스터마이즈할 수 있습니다.

## Props

**Props**는 "properties"의 줄임말입니다. Props를 사용하면 React 컴포넌트를 커스터마이즈할 수 있습니다. 예를 들어, 여기서는 각 `<Cat>`에 다른 `name`을 전달하여 `Cat`이 렌더링하도록 합니다:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Multiple%20Props&ext=js
import {Text, View} from 'react-native';

const Cat = props => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
    </View>
  );
};

export default Cafe;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Multiple%20Props&ext=tsx
import {Text, View} from 'react-native';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
};

const Cafe = () => {
  return (
    <View>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
    </View>
  );
};

export default Cafe;
```

</TabItem>
</Tabs>

React Native의 Core Components 대부분도 props로 커스터마이즈할 수 있습니다. 예를 들어, [`Image`](image)를 사용할 때는 [`source`](image#source) prop을 전달하여 어떤 이미지를 표시할지 정의합니다:

```SnackPlayer name=Props
import {Text, View, Image} from 'react-native';

const CatApp = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
        }}
        style={{width: 200, height: 200}}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
};

export default CatApp;
```

`Image`에는 [`style`](image#style)을 포함하여 [다양한 props](image#props)가 있으며, 스타일은 디자인 및 레이아웃 관련 속성-값 쌍으로 이루어진 JS 객체를 받습니다.

:::note
`style`의 width와 height를 감싸는 이중 중괄호 `{{ }}`를 주목하세요. JSX에서 JavaScript 값은 `{}`로 참조됩니다. 이것은 문자열 이외의 것을 props로 전달할 때 유용합니다. 예를 들어 배열이나 숫자: `<Cat food={["fish", "kibble"]} age={2} />`. 그러나 JS 객체 **_역시_** 중괄호로 표시됩니다: `{width: 200, height: 200}`. 따라서 JSX에서 JS 객체를 전달하려면 객체를 **또 다른 쌍**의 중괄호로 감싸야 합니다: `{{width: 200, height: 200}}`
:::

props와 Core Components인 [`Text`](text), [`Image`](image), [`View`](view)로 많은 것을 만들 수 있습니다! 하지만 인터랙티브한 무언가를 만들려면 state가 필요합니다.

## State

props를 컴포넌트의 렌더링 방식을 설정하는 데 사용하는 인수로 생각할 수 있다면, **state**는 컴포넌트의 개인 데이터 저장소와 같습니다. state는 시간이 지남에 따라 변하거나 사용자 상호작용에서 오는 데이터를 처리하는 데 유용합니다. state는 컴포넌트에 메모리를 제공합니다!

:::info
일반적인 규칙으로, 컴포넌트가 렌더링될 때 구성하기 위해서는 props를 사용하세요. 시간이 지남에 따라 변할 것으로 예상되는 컴포넌트 데이터를 추적하기 위해서는 state를 사용하세요.
:::

다음 예시는 먹이를 기다리고 있는 배고픈 두 고양이가 있는 고양이 카페에서 일어납니다. 시간이 지남에 따라 변할 것으로 예상되는 배고픔(이름과는 달리)이 state로 저장됩니다. 고양이에게 먹이를 주려면 버튼을 누르세요—그러면 state가 업데이트됩니다.

[React의 `useState` Hook](https://react.dev/learn/state-a-components-memory)을 호출하여 컴포넌트에 state를 추가할 수 있습니다. Hook은 React 기능에 "연결"할 수 있게 해주는 일종의 함수입니다. 예를 들어, `useState`는 함수 컴포넌트에 state를 추가할 수 있게 해주는 Hook입니다. [React 문서에서 다른 종류의 Hook들](https://react.dev/reference/react)에 대해 더 자세히 알아볼 수 있습니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=State&ext=js
import {useState} from 'react';
import {Button, Text, View} from 'react-native';

const Cat = props => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=State&ext=tsx
import {useState} from 'react';
import {Button, Text, View} from 'react-native';

type CatProps = {
  name: string;
};

const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? 'hungry' : 'full'}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

</TabItem>
</Tabs>

먼저 React에서 `useState`를 다음과 같이 가져와야 합니다:

```tsx
import {useState} from 'react';
```

그런 다음 컴포넌트의 함수 안에서 `useState`를 호출하여 컴포넌트의 state를 선언합니다. 이 예시에서 `useState`는 `isHungry` state 변수를 생성합니다:

```tsx
const Cat = (props: CatProps) => {
  const [isHungry, setIsHungry] = useState(true);
  // ...
};
```

:::tip
`useState`를 사용하여 문자열, 숫자, 불리언, 배열, 객체 등 모든 종류의 데이터를 추적할 수 있습니다. 예를 들어, `const [timesPetted, setTimesPetted] = useState(0)`으로 고양이가 쓰다듬어진 횟수를 추적할 수 있습니다!
:::

`useState`를 호출하면 두 가지가 발생합니다:

- 초기값을 가진 "state 변수"를 생성합니다—이 경우 state 변수는 `isHungry`이고 초기값은 `true`입니다
- 해당 state 변수의 값을 설정하는 함수를 생성합니다—`setIsHungry`

어떤 이름을 사용하든 상관없습니다. 하지만 패턴을 `[<getter>, <setter>] = useState(<initialValue>)`로 생각하면 편리합니다.

다음으로 [`Button`](button) Core Component를 추가하고 `onPress` prop을 지정합니다:

```tsx
<Button
  onPress={() => {
    setIsHungry(false);
  }}
  //..
/>
```

이제 누군가가 버튼을 누르면 `onPress`가 실행되어 `setIsHungry(false)`를 호출합니다. 이로 인해 state 변수 `isHungry`가 `false`로 설정됩니다. `isHungry`가 false이면 `Button`의 `disabled` prop이 `true`로 설정되고 `title`도 변경됩니다:

```tsx
<Button
  //..
  disabled={!isHungry}
  title={isHungry ? 'Give me some food, please!' : 'Thank you!'}
/>
```

:::info
`isHungry`가 [const](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/const)임에도 불구하고 재할당이 가능한 것처럼 보일 수 있습니다! `const` 키워드는 state 자체가 불변임을 의미하지 않습니다. 오히려 state와 이를 업데이트하는 함수를 포함하는 객체에 대한 참조가 변경되지 않음을 의미합니다.
`setIsHungry`와 같은 state 설정 함수가 호출되면 해당 컴포넌트가 다시 렌더링됩니다. 이 경우 `Cat` 함수가 다시 실행되며—이번에는 `useState`가 `isHungry`의 다음 값을 제공합니다.
:::

마지막으로 고양이들을 `Cafe` 컴포넌트 안에 넣습니다:

```tsx
const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};
```

:::info
위의 `<>`와 `</>`를 보셨나요? 이 JSX 조각들은 [fragments](https://react.dev/reference/react/Fragment)입니다. 인접한 JSX 엘리먼트는 감싸는 태그로 래핑되어야 합니다. Fragments를 사용하면 `View`와 같은 불필요한 래핑 엘리먼트를 중첩하지 않고도 이를 수행할 수 있습니다.
:::

---

React와 React Native의 Core Components를 모두 다루었으니, 이제 [`<TextInput>` 처리하기](handling-text-input)를 살펴보며 일부 핵심 컴포넌트를 더 깊이 알아보겠습니다.
