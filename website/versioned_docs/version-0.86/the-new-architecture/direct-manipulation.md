---
id: direct-manipulation-new-architecture
title: Direct Manipulation
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

때로는 전체 서브트리를 다시 렌더링하는 state/props를 사용하지 않고 컴포넌트를 직접 변경해야 할 때가 있습니다. 예를 들어 브라우저에서 React를 사용할 때 DOM 노드를 직접 수정해야 하는 경우가 있으며, 모바일 앱의 뷰도 마찬가지입니다. `setNativeProps`는 DOM 노드에 직접 속성을 설정하는 것과 동등한 React Native의 기능입니다.

:::caution
빈번한 재렌더링이 성능 병목을 일으킬 때 `setNativeProps`를 사용하세요!

직접 조작(direct manipulation)은 자주 사용하게 될 도구가 아닙니다. 일반적으로 컴포넌트 계층 구조를 렌더링하고 많은 뷰를 조정하는 오버헤드를 피하기 위한 지속적인 애니메이션을 만들 때만 사용합니다.
`setNativeProps`는 명령형이며 state를 React 컴포넌트가 아닌 네이티브 레이어(DOM, UIView 등)에 저장하므로 코드를 추론하기 더 어렵게 만듭니다.

사용하기 전에 `setState`와 [`shouldComponentUpdate`](https://react.dev/reference/react/Component#shouldcomponentupdate)로 문제를 해결해 보세요.
:::

## setNativeProps로 TextInput 값 편집하기

`setNativeProps`의 또 다른 매우 일반적인 사용 사례는 TextInput의 값을 편집하는 것입니다. TextInput의 `controlled` props는 `bufferDelay`가 낮고 사용자가 매우 빠르게 타이핑할 때 가끔 문자를 누락시킬 수 있습니다. 일부 개발자는 이 props를 완전히 건너뛰고 필요할 때 `setNativeProps`를 사용하여 TextInput 값을 직접 조작하는 것을 선호합니다.

예를 들어, 다음 코드는 버튼을 탭할 때 입력값을 편집하는 방법을 보여줍니다:

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=setNativeProps%20on%20TextInput&ext=js
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

동일한 방식으로 현재 입력 텍스트를 지우는 [`clear`](../textinput#clear) 메서드를 사용하여 `TextInput`을 초기화할 수 있습니다.

## 렌더 함수와의 충돌 방지

렌더 함수에 의해서도 관리되는 속성을 업데이트하면 컴포넌트가 재렌더링될 때마다 해당 속성이 변경되어 `setNativeProps`로 이전에 설정된 값이 완전히 무시되고 재정의되므로 예측하기 어렵고 혼란스러운 버그가 발생할 수 있습니다.
