---
id: sectionlist
title: SectionList
---

섹션 목록을 렌더링하기 위한 고성능 인터페이스로, 다음과 같은 유용한 기능들을 지원합니다:

- 완전한 크로스 플랫폼.
- 구성 가능한 가시성 콜백.
- 목록 헤더 지원.
- 목록 푸터 지원.
- 항목 구분선 지원.
- 섹션 헤더 지원.
- 섹션 구분선 지원.
- 이종 데이터 및 항목 렌더링 지원.
- 당겨서 새로 고침.
- 스크롤 로딩.

섹션 지원이 필요 없고 더 간단한 인터페이스를 원한다면 [`<FlatList>`](flatlist.md)를 사용하세요.

## 예시

```SnackPlayer name=SectionList%20Example
import {StyleSheet, Text, View, SectionList, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default App;
```

이것은 [`<VirtualizedList>`](virtualizedlist.md)를 편리하게 래핑한 것이므로, 여기에 명시적으로 나열되지 않은 props(및 [`<ScrollView>`](scrollview.md)의 props)와 다음 주의 사항을 상속합니다:

- 콘텐츠가 렌더 윈도우 밖으로 스크롤되면 내부 state가 보존되지 않습니다. 모든 데이터가 항목 데이터나 Flux, Redux, Relay와 같은 외부 저장소에 캡처되어 있는지 확인하세요.
- 이것은 `PureComponent`이므로 `props`가 얕게 같으면 다시 렌더링되지 않습니다. `renderItem` 함수가 의존하는 모든 것이 업데이트 후 `===`이 아닌 prop(예: `extraData`)으로 전달되는지 확인하세요. 그렇지 않으면 변경 시 UI가 업데이트되지 않을 수 있습니다. 이는 `data` prop과 부모 컴포넌트 state를 포함합니다.
- 메모리를 제한하고 부드러운 스크롤을 가능하게 하기 위해 콘텐츠는 비동기적으로 화면 밖에서 렌더링됩니다. 즉, 채우는 속도보다 빠르게 스크롤하면 잠시 빈 콘텐츠가 보일 수 있습니다. 이는 각 애플리케이션의 필요에 맞게 조정할 수 있는 트레이드오프이며, 내부적으로 개선 작업을 진행 중입니다.
- 기본적으로 목록은 각 항목에서 `key` prop을 찾아 React 키로 사용합니다. 또는 커스텀 `keyExtractor` prop을 제공할 수 있습니다.

---

# 레퍼런스

## Props

### [VirtualizedList Props](virtualizedlist.md#props)

[VirtualizedList Props](virtualizedlist.md#props)를 상속합니다.

---

### <div className="label required basic">Required</div>**`renderItem`**

모든 섹션의 모든 항목에 대한 기본 렌더러입니다. 섹션별로 재정의할 수 있습니다. React 엘리먼트를 반환해야 합니다.

| 타입     |
| -------- |
| function |

렌더 함수에는 다음 키를 가진 객체가 전달됩니다:

- 'item' (object) - 이 섹션의 `data` 키에 지정된 항목 객체
- 'index' (number) - 섹션 내 항목의 인덱스.
- 'section' (object) - `sections`에 지정된 전체 섹션 객체.
- 'separators' (object) - 다음 키를 가진 객체:
  - 'highlight' (function) - `() => void`
  - 'unhighlight' (function) - `() => void`
  - 'updateProps' (function) - `(select, newProps) => void`
    - 'select' (enum) - 가능한 값은 'leading', 'trailing'
    - 'newProps' (object)

---

### <div className="label required basic">Required</div>**`sections`**

렌더링할 실제 데이터로, [`FlatList`](flatlist.md)의 `data` prop과 유사합니다.

| 타입                                        |
| ------------------------------------------- |
| array of [Section](sectionlist.md#section)s |

---

### `extraData`

목록에 다시 렌더링하도록 알리는 마커 속성입니다(`PureComponent`를 구현하므로). `renderItem`, Header, Footer 등의 함수가 `data` prop 외부의 무언가에 의존하는 경우 여기에 넣고 불변으로 처리하세요.

| 타입 |
| ---- |
| any  |

---

### `initialNumToRender`

초기 배치에서 렌더링할 항목 수입니다. 화면을 채울 만큼 충분하지만 너무 많지 않아야 합니다. 이 항목들은 맨 위로 스크롤하는 작업의 인지된 성능을 향상시키기 위해 윈도우 렌더링의 일부로 언마운트되지 않습니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `10`    |

---

### `inverted`

스크롤 방향을 반전시킵니다. -1의 배율 변환을 사용합니다.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | `false` |

---

### `ItemSeparatorComponent`

각 항목 사이에 렌더링되지만 상단이나 하단에는 렌더링되지 않습니다. 기본적으로 `highlighted`, `section`, `[leading/trailing][Item/Section]` props가 제공됩니다. `renderItem`은 `highlighted` prop을 업데이트하는 `separators.highlight`/`unhighlight`를 제공하지만 `separators.updateProps`로 커스텀 props를 추가할 수도 있습니다. React 컴포넌트(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)일 수 있습니다.

| 타입                         |
| ---------------------------- |
| component, function, element |

---

### `keyExtractor`

지정된 인덱스의 항목에 대한 고유 키를 추출하는 데 사용됩니다. 키는 캐싱에 사용되며 항목 재정렬을 추적하는 React 키로도 사용됩니다. 기본 추출기는 `item.key`를, 그 다음 `item.id`를 확인하고, React와 마찬가지로 인덱스로 폴백합니다. 이는 각 항목의 키를 설정하지만 각 섹션 전체에는 여전히 고유한 키가 필요합니다.

| 타입                                    |
| --------------------------------------- |
| (item: object, index: number) => string |

---

### `ListEmptyComponent`

목록이 비어 있을 때 렌더링됩니다. React 컴포넌트(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)일 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `ListFooterComponent`

목록의 맨 끝에 렌더링됩니다. React 컴포넌트(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)일 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `ListHeaderComponent`

목록의 맨 처음에 렌더링됩니다. React 컴포넌트(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)일 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `onRefresh`

제공된 경우, "당겨서 새로 고침" 기능을 위해 표준 RefreshControl이 추가됩니다. `refreshing` prop도 올바르게 설정해야 합니다. RefreshControl을 상단에서 오프셋하려면(예: 100pt만큼) `progressViewOffset={100}`을 사용하세요.

| 타입     |
| -------- |
| function |

---

### `onViewableItemsChanged`

`viewabilityConfig` prop에 의해 정의된 대로 행의 가시성이 변경될 때 호출됩니다.

| 타입                                                                                                  |
| ----------------------------------------------------------------------------------------------------- |
| `md (callback: {changed: [ViewToken](viewtoken)[], viewableItems: [ViewToken](viewtoken)[]}) => void` |

---

### `refreshing`

새로 고침으로부터 새 데이터를 기다리는 동안 이것을 `true`로 설정하세요.

| 타입    | 기본값 |
| ------- | ------- |
| boolean | `false` |

---

### `removeClippedSubviews`

:::warning
이 속성을 사용하면 일부 상황에서 버그(콘텐츠 누락)가 발생할 수 있습니다 - 위험을 감수하고 사용하세요.
:::

`true`일 때, 화면 밖의 자식 뷰는 화면 밖에 있을 때 네이티브 백킹 슈퍼뷰에서 제거됩니다. 이는 대형 목록의 스크롤 성능을 향상시킬 수 있습니다. Android에서는 기본값이 `true`입니다.

| 타입    |
| ------- |
| boolean |

---

### `renderSectionFooter`

각 섹션의 하단에 렌더링됩니다.

| 타입                                                                      |
| ------------------------------------------------------------------------- |
| `md (info: {section: [Section](sectionlist#section)}) => element ｜ null` |

---

### `renderSectionHeader`

각 섹션의 상단에 렌더링됩니다. 기본적으로 iOS에서 `ScrollView` 상단에 고정됩니다. `stickySectionHeadersEnabled`를 참고하세요.

| 타입                                                                      |
| ------------------------------------------------------------------------- |
| `md (info: {section: [Section](sectionlist#section)}) => element ｜ null` |

---

### `SectionSeparatorComponent`

각 섹션의 상단과 하단에 렌더링됩니다(항목 사이에만 렌더링되는 `ItemSeparatorComponent`와 다름). 위아래 헤더로부터 섹션을 구분하기 위한 것이며, 일반적으로 `ItemSeparatorComponent`와 동일한 하이라이트 응답을 갖습니다. 또한 `highlighted`, `[leading/trailing][Item/Section]`, `separators.updateProps`의 커스텀 props도 받습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `stickySectionHeadersEnabled`

섹션 헤더가 다음 헤더가 밀어낼 때까지 화면 상단에 고정되도록 합니다. iOS에서만 기본적으로 활성화됩니다(해당 플랫폼 표준이기 때문).

| 타입    | 기본값                                                                                               |
| ------- | ---------------------------------------------------------------------------------------------------- |
| boolean | `false` <div className="label android">Android</div><hr/>`true` <div className="label ios">iOS</div> |

## 메서드

### `flashScrollIndicators()` <div className="label ios">iOS</div>

```tsx
flashScrollIndicators();
```

스크롤 인디케이터를 잠깐 표시합니다.

---

### `recordInteraction()`

```tsx
recordInteraction();
```

목록에 상호작용이 발생했음을 알려 가시성 계산을 트리거해야 합니다. 예를 들어 `waitForInteractions`가 `true`이고 사용자가 스크롤하지 않은 경우입니다. 일반적으로 항목 탭이나 내비게이션 동작에 의해 호출됩니다.

---

### `scrollToLocation()`

```tsx
scrollToLocation(params: SectionListScrollParams);
```

지정된 `sectionIndex`와 `itemIndex`(섹션 내)의 항목으로 스크롤합니다. `viewPosition`이 `0`이면 상단(고정 헤더로 가려질 수 있음), `1`이면 하단, `0.5`이면 중간에 배치됩니다.

:::note
`getItemLayout` 또는 `onScrollToIndexFailed` prop을 지정하지 않으면 렌더 윈도우 밖의 위치로 스크롤할 수 없습니다.
:::

**매개변수:**

| 이름                                                        | 타입   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">Required</div> | object |

유효한 `params` 키:

- 'animated' (boolean) - 스크롤 중 목록이 애니메이션을 수행해야 하는지 여부. 기본값은 `true`.
- 'itemIndex' (number) - 스크롤할 항목의 섹션 내 인덱스. 필수.
- 'sectionIndex' (number) - 스크롤할 항목이 포함된 섹션의 인덱스. 필수.
- 'viewOffset' (number) - 최종 목표 위치를 오프셋하는 고정 픽셀 수. 예를 들어 고정 헤더를 보정하는 데 사용.
- 'viewPosition' (number) - `0`이면 인덱스로 지정된 항목을 상단에, `1`이면 하단에, `0.5`이면 중간에 배치.

## 타입 정의

### Section

특정 섹션에 대해 렌더링할 데이터를 식별하는 객체입니다.

| 타입 |
| ---- |
| any  |

**속성:**

| 이름                                                      | 타입               | 설명                                                                                                                                                                    |
| --------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data <div className="label basic required">Required</div> | array              | 이 섹션의 항목을 렌더링하기 위한 데이터. [`FlatList`의 data prop](flatlist)과 유사한 객체 배열.                                                           |
| key                                                       | string             | 섹션 재정렬을 추적하기 위한 선택적 키. 섹션을 재정렬하지 않을 계획이라면 기본적으로 배열 인덱스가 사용됩니다.                                                           |
| renderItem                                                | function           | 이 섹션에 대한 임의의 항목 렌더러를 선택적으로 정의하여, 목록의 기본 [`renderItem`](sectionlist)을 재정의합니다.                                              |
| ItemSeparatorComponent                                    | component, element | 이 섹션에 대한 임의의 항목 구분선을 선택적으로 정의하여, 목록의 기본 [`ItemSeparatorComponent`](sectionlist#itemseparatorcomponent)를 재정의합니다.                      |
| keyExtractor                                              | function           | 이 섹션에 대한 임의의 키 추출기를 선택적으로 정의하여, 기본 [`keyExtractor`](sectionlist#keyextractor)를 재정의합니다.                                                  |
