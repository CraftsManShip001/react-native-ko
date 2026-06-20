---
id: viewtoken
title: ViewToken Object Type
---

`ViewToken` 객체는 `onViewableItemsChanged` 콜백의 속성 중 하나로 반환됩니다(예: [FlatList](flatlist) 컴포넌트에서). [`ViewabilityHelper.js`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Lists/ViewabilityHelper.js)에서 내보내집니다.

## 예시

```js
{
  item: {key: "key-12"},
  key: "key-12",
  index: 11,
  isViewable: true
}
```

## 키와 값

### `index`

데이터 요소에 할당된 고유 숫자 식별자입니다.

| 타입   | 선택 여부 |
| ------ | -------- |
| number | Yes      |

### `isViewable`

목록 요소의 일부라도 뷰포트에서 보이는지 여부를 지정합니다.

| 타입    | 선택 여부 |
| ------- | -------- |
| boolean | No       |

### `item`

항목 데이터

| 타입 | 선택 여부 |
| ---- | -------- |
| any  | No       |

### `key`

최상위 레벨로 추출된 데이터 요소에 할당된 키 식별자입니다.

| 타입   | 선택 여부 |
| ------ | -------- |
| string | No       |

### `section`

`SectionList`와 함께 사용할 때의 항목 섹션 데이터입니다.

| 타입 | 선택 여부 |
| ---- | -------- |
| any  | Yes      |

## 사용하는 컴포넌트

- [`FlatList`](flatlist)
- [`SectionList`](sectionlist)
- [`VirtualizedList`](virtualizedlist)
