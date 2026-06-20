---
id: element-nodes
title: Element nodes
---

Element 노드는 네이티브 뷰 트리에서 네이티브 컴포넌트를 나타냅니다(웹의 [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) 노드와 유사합니다).

모든 네이티브 컴포넌트와 많은 내장 컴포넌트에서 ref를 통해 제공됩니다:

```SnackPlayer ext=js&name=Element%20instances%20example
import {useEffect, useRef, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';

const ViewWithRefs = () => {
  const ref = useRef(null);
  const [viewInfo, setViewInfo] = useState('');

  useEffect(() => {
    // `element` is an object implementing the interface described here.
    const element = ref.current;
    const rect = JSON.stringify(element.getBoundingClientRect());
    setViewInfo(
      `Bounding rect is: ${rect}.\nText content is: ${element.textContent}`,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View ref={ref} style={styles.content}>
        <Text>Hello world!</Text>
      </View>
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

export default ViewWithRefs;
```

:::info
일부 내장 컴포넌트는 다른 컴포넌트(네이티브 컴포넌트 포함)의 컨테이너 역할만 한다는 점에 유의하세요. 예를 들어, `ScrollView`는 내부적으로 네이티브 스크롤 뷰와 네이티브 뷰를 렌더링하며, 이들은 `getNativeScrollRef()`와 `getInnerViewRef()` 같은 메서드를 사용하여 제공하는 ref를 통해 접근할 수 있습니다.
:::

---

## 레퍼런스

### 웹 호환 API

[`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)에서:

- 속성
  - [`offsetHeight`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)
  - [`offsetLeft`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft)
  - [`offsetParent`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent)
  - [`offsetTop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop)
  - [`offsetWidth`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
- 메서드
  - [`blur()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur).
  - [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus).
    - ⚠️ `options` 파라미터는 지원되지 않습니다.

[`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element)에서:

- 속성
  - [`childElementCount`](https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount)
  - [`children`](https://developer.mozilla.org/en-US/docs/Web/API/Element/children)
  - [`clientHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight)
  - [`clientLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientLeft)
  - [`clientTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientTop)
  - [`clientWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)
  - [`firstElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild)
  - [`id`](https://developer.mozilla.org/en-US/docs/Web/API/Element/id)
    - ℹ️ `id` 또는 `nativeID` props의 값을 반환합니다.
  - [`lastElementChild`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild)
  - [`nextElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling)
  - [`nodeName`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)
  - [`nodeType`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType)
  - [`nodeValue`](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)
  - [`previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling)
  - [`scrollHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)
  - [`scrollLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft)
    - ⚠️ 내장 컴포넌트의 경우, `ScrollView` 인스턴스만 0이 아닌 값을 반환할 수 있습니다.
  - [`scrollTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop)
    - ⚠️ 내장 컴포넌트의 경우, `ScrollView` 인스턴스만 0이 아닌 값을 반환할 수 있습니다.
  - [`scrollWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth)
  - [`tagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)
    - ℹ️ `RN:`을 접두사로 붙인 정규화된 네이티브 컴포넌트 이름을 반환합니다. 예: `RN:View`.
  - [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- 메서드
  - [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
  - [`hasPointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasPointerCapture)
  - [`setPointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture)
  - [`releasePointerCapture()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture)

[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node)에서:

- 속성
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
- 메서드
  - [`compareDocumentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition)
  - [`contains()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
  - [`getRootNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode)
    - ℹ️ 컴포넌트가 마운트되지 않은 경우 자기 자신에 대한 참조를 반환합니다.
  - [`hasChildNodes()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes)

### 레거시 API

- [`measure()`](/docs/legacy/direct-manipulation#measurecallback)
- [`measureInWindow()`](/docs/legacy/direct-manipulation#measureinwindowcallback)
- [`measureLayout()`](/docs/legacy/direct-manipulation#measurelayoutrelativetonativecomponentref-onsuccess-onfail)
- [`setNativeProps()`](/docs/legacy/direct-manipulation#touchableopacity와-setnativeprops)
