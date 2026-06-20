---
id: text-nodes
title: Text nodes
---

텍스트 노드는 트리에서 원시 텍스트 콘텐츠를 나타냅니다(웹의 [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) 노드와 유사합니다). `refs`를 통해 직접 접근할 수는 없지만, 엘리먼트 refs의 [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)와 같은 메서드를 사용하여 접근할 수 있습니다.

```SnackPlayer ext=js&name=Text%20instances%20example
import {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const TextWithRefs = () => {
  const ref = useRef(null);
  const [viewInfo, setViewInfo] = useState('');

  useEffect(() => {
    // `textElement` is an object implementing the interface described here.
    const textElement = ref.current;
    const textNode = textElement.childNodes[0];
    setViewInfo(
      `Text content is: ${textNode.nodeValue}`,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text ref={ref}>
        Hello world!
      </Text>
      <Text>{viewInfo}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
    backgroundColor: 'gray',
  },
});

export default TextWithRefs;
```

---

## 레퍼런스

### 웹 호환 API

[`CharacterData`](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData)에서:

- 속성(Properties)
  - [`data`](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData/data)
  - [`length`](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData/length)
  - [`nextElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData/nextElementSibling)
  - [`previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData/previousElementSibling)
- 메서드(Methods)
  - [`substringData()`](https://developer.mozilla.org/en-US/docs/Web/API/CharacterData/substringData)

[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node)에서:

- 속성(Properties)
  - [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
  - [`firstChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild)
  - [`isConnected`](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected)
  - [`lastChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild)
  - [`nextSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)
  - [`nodeName`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)
  - [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
  - [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)
  - [`ownerDocument`](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument)
    - ℹ️ 이 컴포넌트가 렌더링된 [document 노드](/docs/document-nodes)를 반환합니다.
  - [`parentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)
  - [`parentNode`](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)
  - [`previousSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling)
  - [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- 메서드(Methods)
  - [`compareDocumentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition)
  - [`contains()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
  - [`getRootNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode)
    - ℹ️ 컴포넌트가 마운트되지 않은 경우 자기 자신에 대한 참조를 반환합니다.
  - [`hasChildNodes()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes)
