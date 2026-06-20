---
id: nodes
title: Nodes from refs
---

React Native 앱은 웹에서 React DOM이 DOM 트리를 생성하는 것과 유사하게, UI를 나타내는 네이티브 뷰 트리를 렌더링합니다. React Native는 [refs](https://react.dev/learn/manipulating-the-dom-with-refs)를 통해 이 트리에 명령적으로 접근할 수 있도록 합니다. refs는 [`View`](/docs/view)와 같은 내장 컴포넌트로 렌더링되는 것들을 포함한 모든 네이티브 컴포넌트에서 반환됩니다.

React Native는 3가지 유형의 노드를 제공합니다:

- [Elements](/docs/element-nodes): 엘리먼트 노드는 네이티브 뷰 트리의 네이티브 컴포넌트를 나타냅니다(웹의 [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) 노드와 유사). refs를 통해 모든 네이티브 컴포넌트에서 제공됩니다.
- [Text](/docs/text-nodes): 텍스트 노드는 트리의 원시 텍스트 콘텐츠를 나타냅니다(웹의 [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) 노드와 유사). `refs`를 통해 직접 접근할 수 없지만, 엘리먼트 refs의 [`childNodes`](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes) 같은 메서드를 사용해 접근할 수 있습니다.
- [Documents](/docs/document-nodes): 문서 노드는 완전한 네이티브 뷰 트리를 나타냅니다(웹의 [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) 노드와 유사). 텍스트 노드와 마찬가지로 [`ownerDocument`](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument) 같은 속성을 사용해 다른 노드를 통해서만 접근할 수 있습니다.

웹에서와 마찬가지로, 이러한 노드들은 렌더링된 UI 트리를 탐색하거나, 레이아웃 정보에 접근하거나, `focus` 같은 명령적 작업을 실행하는 데 사용할 수 있습니다.

:::info
**웹과 달리, 이러한 노드들은 변형(mutation)을 허용하지 않습니다** (예: [`node.appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)). 트리의 콘텐츠는 React 렌더러에 의해 완전히 관리되기 때문입니다.
:::
