---
id: direct-manipulation
title: Direct Manipulation
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

전체 서브트리를 다시 렌더링하기 위해 state/props를 사용하지 않고 컴포넌트를 직접 변경해야 하는 경우가 있습니다. 예를 들어 브라우저에서 React를 사용할 때 DOM 노드를 직접 수정해야 하는 경우가 있는데, 모바일 앱의 뷰에서도 마찬가지입니다. `setNativeProps`는 DOM 노드에 직접 속성을 설정하는 것에 대응하는 React Native의 기능입니다.

:::caution
빈번한 재렌더링이 성능 병목 현상을 일으킬 때 `setNativeProps`를 사용하세요!

직접 조작(Direct manipulation)은 자주 사용하게 될 도구가 아닙니다. 일반적으로 컴포넌트 계층을 렌더링하고 많은 뷰를 조정하는 오버헤드를 피하기 위해 연속 애니메이션을 만들 때만 사용합니다.
`setNativeProps`는 명령형이며 state를 React 컴포넌트가 아닌 네이티브 레이어(DOM, UIView 등)에 저장하기 때문에 코드를 이해하기 어렵게 만듭니다.

사용하기 전에 `setState`와 [`shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate)로 문제를 해결해 보세요.
:::

## TouchableOpacity와 setNativeProps

[TouchableOpacity](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/Touchable/TouchableOpacity.js)는 내부적으로 `setNativeProps`를 사용하여 자식 컴포넌트의 투명도를 업데이트합니다.

```tsx
const viewRef = useRef<View>();
const setOpacityTo = useCallback(value => {
  // Redacted: animation related code
  viewRef.current.setNativeProps({
    opacity: value,
  });
}, []);
```

이를 통해 다음과 같은 코드를 작성할 수 있으며, 자식이 해당 사실을 알거나 구현을 변경하지 않아도 탭에 반응하여 자식의 투명도가 업데이트됩니다.

```tsx
<TouchableOpacity onPress={handlePress}>
  <View>
    <Text>Press me!</Text>
  </View>
</TouchableOpacity>
```

`setNativeProps`를 사용할 수 없다고 가정해 봅시다. 이 제약 조건에서 구현할 수 있는 한 가지 방법은 state에 투명도 값을 저장하고 `onPress`가 발생할 때마다 해당 값을 업데이트하는 것입니다.

```tsx
const [buttonOpacity, setButtonOpacity] = useState(1);
return (
  <TouchableOpacity
    onPressIn={() => setButtonOpacity(0.5)}
    onPressOut={() => setButtonOpacity(1)}>
    <View style={{opacity: buttonOpacity}}>
      <Text>Press me!</Text>
    </View>
  </TouchableOpacity>
);
```

이 방법은 원래 예시에 비해 계산 비용이 높습니다. 뷰와 자식의 다른 속성이 변경되지 않더라도 투명도가 변경될 때마다 React가 컴포넌트 계층을 다시 렌더링해야 합니다. 일반적으로 이 오버헤드는 문제가 되지 않지만, 연속 애니메이션을 수행하고 제스처에 응답할 때 컴포넌트를 신중하게 최적화하면 애니메이션 품질을 향상시킬 수 있습니다.

[NativeMethodsMixin](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod.js)에서 `setNativeProps` 구현을 살펴보면 `RCTUIManager.updateView`를 감싸는 래퍼임을 알 수 있습니다. 이 함수 호출은 재렌더링에서 발생하는 것과 정확히 동일합니다. [ReactNativeBaseComponent의 receiveComponent](https://github.com/facebook/react-native/blob/fb2ec1ea47c53c2e7b873acb1cb46192ac74274e/Libraries/Renderer/oss/ReactNativeRenderer-prod.js#L5793-L5813)를 참조하세요.

## 복합 컴포넌트와 setNativeProps

복합 컴포넌트(Composite components)는 네이티브 뷰로 지원되지 않으므로 `setNativeProps`를 호출할 수 없습니다. 다음 예시를 살펴보세요.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=setNativeProps%20with%20Composite%20Components&ext=js
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = props => (
  <View style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
);

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=setNativeProps%20with%20Composite%20Components&ext=tsx
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = (props: {label: string}) => (
  <View style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
);

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
</Tabs>

이 코드를 실행하면 즉시 다음과 같은 오류가 발생합니다: `Touchable child must either be native or forward setNativeProps to a native component`. 이는 `MyButton`이 투명도를 설정해야 하는 네이티브 뷰로 직접 지원되지 않기 때문입니다. 이렇게 생각할 수 있습니다. `createReactClass`로 컴포넌트를 정의하면 스타일 prop을 설정하고 작동할 것이라고 기대하지 않을 것입니다. 네이티브 컴포넌트를 감싸지 않는 한 스타일 prop을 자식에게 전달해야 합니다. 마찬가지로 `setNativeProps`를 네이티브로 지원되는 자식 컴포넌트로 전달해야 합니다.

#### setNativeProps를 자식에게 전달하기

`setNativeProps` 메서드는 `View` 컴포넌트에 대한 모든 ref에 존재하므로, 커스텀 컴포넌트의 ref를 렌더링하는 `<View />` 컴포넌트 중 하나로 전달하면 충분합니다. 즉, 커스텀 컴포넌트에서 `setNativeProps`를 호출하는 것은 감싼 `View` 컴포넌트에서 직접 `setNativeProps`를 호출하는 것과 동일한 효과를 냅니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Forwarding%20setNativeProps&ext=js
import {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = forwardRef((props, ref) => (
  <View {...props} ref={ref} style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
));

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Forwarding%20setNativeProps&ext=tsx
import {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const MyButton = forwardRef<View, {label: string}>((props, ref) => (
  <View {...props} ref={ref} style={{marginTop: 50}}>
    <Text>{props.label}</Text>
  </View>
));

const App = () => (
  <TouchableOpacity>
    <MyButton label="Press me!" />
  </TouchableOpacity>
);

export default App;
```

</TabItem>
</Tabs>

이제 `TouchableOpacity` 안에서 `MyButton`을 사용할 수 있습니다!

`{...props}`를 사용하여 모든 props를 자식 뷰로 전달한 것을 눈치채셨을 것입니다. 이는 `TouchableOpacity`가 실제로 복합 컴포넌트이기 때문에, 자식의 `setNativeProps`에 의존하는 것 외에도 자식이 터치 처리를 수행해야 합니다. 이를 위해 `TouchableOpacity` 컴포넌트로 콜백하는 [다양한 props](view.md#onmoveshouldsetresponder)를 전달합니다. 반면 `TouchableHighlight`는 네이티브 뷰로 지원되며 `setNativeProps`만 구현하면 됩니다.

## setNativeProps로 TextInput 값 편집하기

`setNativeProps`의 또 다른 매우 일반적인 사용 사례는 TextInput의 값을 편집하는 것입니다. `bufferDelay`가 낮고 사용자가 매우 빠르게 타이핑할 때 TextInput의 `controlled` prop이 문자를 누락할 수 있습니다. 일부 개발자는 이 prop을 완전히 건너뛰고 필요할 때 `setNativeProps`를 사용하여 TextInput 값을 직접 조작하는 것을 선호합니다. 예를 들어, 다음 코드는 버튼을 탭할 때 입력을 편집하는 방법을 보여줍니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Clear%20text&ext=js
import {useCallback, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const inputRef = useRef(null);
  const editText = useCallback(() => {
    inputRef.current.setNativeProps({text: 'Edited Text'});
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} />
      <TouchableOpacity onPress={editText}>
        <Text>Edit text</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Clear%20text&ext=tsx
import {useCallback, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const inputRef = useRef<TextInput>(null);
  const editText = useCallback(() => {
    inputRef.current?.setNativeProps({text: 'Edited Text'});
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} />
      <TouchableOpacity onPress={editText}>
        <Text>Edit text</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;
```

</TabItem>
</Tabs>

동일한 방식으로 [`clear`](../textinput#clear) 메서드를 사용하여 현재 입력 텍스트를 지우는 `TextInput`을 초기화할 수 있습니다.

## render 함수와의 충돌 방지

render 함수에서도 관리하는 속성을 업데이트하면 컴포넌트가 재렌더링될 때마다 해당 속성이 변경되고, `setNativeProps`에서 이전에 설정한 값은 완전히 무시되고 재정의되기 때문에 예측하기 어렵고 혼란스러운 버그가 발생할 수 있습니다.

## setNativeProps & shouldComponentUpdate

[`shouldComponentUpdate`를 지능적으로 적용](https://react.dev/reference/react/Component#shouldcomponentupdate)하면 변경되지 않은 컴포넌트 서브트리를 조정하는 데 불필요한 오버헤드를 피할 수 있으며, `setNativeProps` 대신 `setState`를 사용해도 충분한 성능을 낼 수 있습니다.

## 다른 네이티브 메서드

여기에 설명된 메서드는 React Native에서 제공하는 기본 컴포넌트 대부분에서 사용할 수 있습니다. 단, 네이티브 뷰로 직접 지원되지 않는 복합 컴포넌트에서는 사용할 수 _없습니다_. 여기에는 일반적으로 앱에서 직접 정의한 대부분의 컴포넌트가 포함됩니다.

### measure(callback)

주어진 뷰의 뷰포트 내 위치, 너비, 높이를 확인하고 비동기 콜백을 통해 값을 반환합니다. 성공하면 콜백이 다음 인수와 함께 호출됩니다.

- x
- y
- width
- height
- pageX
- pageY

이 측정값은 네이티브에서 렌더링이 완료된 후에만 사용할 수 있습니다. 가능한 한 빨리 측정값이 필요하고 `pageX` 및 `pageY`가 필요하지 않다면 [`onLayout`](view.md#onlayout) 속성을 사용하는 것을 고려해 보세요.

또한 `measure()`가 반환하는 width와 height는 뷰포트에서 컴포넌트의 너비와 높이입니다. 컴포넌트의 실제 크기가 필요하다면 [`onLayout`](view.md#onlayout) 속성을 사용하는 것을 고려해 보세요.

### measureInWindow(callback)

창에서 주어진 뷰의 위치를 확인하고 비동기 콜백을 통해 값을 반환합니다. React 루트 뷰가 다른 네이티브 뷰에 임베드된 경우 절대 좌표를 반환합니다. 성공하면 콜백이 다음 인수와 함께 호출됩니다.

- x
- y
- width
- height

### measureLayout(relativeToNativeComponentRef, onSuccess, onFail)

`measure()`와 비슷하지만, `relativeToNativeComponentRef` 참조로 지정된 조상을 기준으로 뷰를 측정합니다. 즉, 반환된 좌표는 조상 뷰의 원점 `x`, `y`를 기준으로 합니다.

:::note
이 메서드는 `relativeToNativeNode` 핸들러(참조 대신)로도 호출할 수 있지만, 이 방식은 새 아키텍처에서는 더 이상 사용되지 않습니다.
:::

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=measureLayout%20example&supportedPlatforms=android,ios&ext=js
import {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

const App = () => {
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const [measure, setMeasure] = useState(null);

  useEffect(() => {
    if (textRef.current && textContainerRef.current) {
      textRef.current.measureLayout(
        textContainerRef.current,
        (left, top, width, height) => {
          setMeasure({left, top, width, height});
        },
      );
    }
  }, [measure]);

  return (
    <View style={styles.container}>
      <View ref={textContainerRef} style={styles.textContainer}>
        <Text ref={textRef}>Where am I? (relative to the text container)</Text>
      </View>
      <Text style={styles.measure}>{JSON.stringify(measure)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  measure: {
    textAlign: 'center',
    padding: 12,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=measureLayout%20example&ext=tsx
import {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

type Measurements = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const App = () => {
  const textContainerRef = useRef<View>(null);
  const textRef = useRef<Text>(null);
  const [measure, setMeasure] = useState<Measurements | null>(null);

  useEffect(() => {
    if (textRef.current && textContainerRef.current) {
      textRef.current?.measureLayout(
        textContainerRef.current,
        (left, top, width, height) => {
          setMeasure({left, top, width, height});
        },
        () => {
          console.error('measurement failed');
        },
      );
    }
  }, [measure]);

  return (
    <View style={styles.container}>
      <View ref={textContainerRef} style={styles.textContainer}>
        <Text ref={textRef}>Where am I? (relative to the text container)</Text>
      </View>
      <Text style={styles.measure}>{JSON.stringify(measure)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: '#61dafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  measure: {
    textAlign: 'center',
    padding: 12,
  },
});

export default App;
```

</TabItem>
</Tabs>

### focus()

주어진 입력 또는 뷰에 포커스를 요청합니다. 실제로 발생하는 동작은 플랫폼과 뷰 유형에 따라 다릅니다.

### blur()

입력 또는 뷰에서 포커스를 제거합니다. `focus()`의 반대 동작입니다.
