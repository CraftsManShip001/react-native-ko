---
id: virtualizedlist
title: VirtualizedList
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

더 편리한 [`<FlatList>`](flatlist.md) 및 [`<SectionList>`](sectionlist.md) 컴포넌트의 기본 구현체로, 해당 컴포넌트들이 더 잘 문서화되어 있습니다. 일반적으로 [`FlatList`](flatlist.md)가 제공하는 것보다 더 많은 유연성이 필요한 경우, 예를 들어 일반 배열 대신 불변 데이터와 함께 사용하는 경우에만 이 컴포넌트를 사용해야 합니다.

가상화는 활성 항목의 유한한 렌더 윈도우를 유지하고 렌더 윈도우 밖의 모든 항목을 적절한 크기의 빈 공간으로 대체함으로써 대용량 목록의 메모리 소비와 성능을 대폭 향상시킵니다. 윈도우는 스크롤 동작에 맞게 조정되며, 항목들은 가시 영역에서 멀리 떨어진 경우 낮은 우선순위(실행 중인 인터랙션 이후)로, 그렇지 않은 경우 높은 우선순위로 점진적으로 렌더링되어 빈 공간이 보일 가능성을 최소화합니다.

## 예시

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=VirtualizedListExample&ext=js
import {View, VirtualizedList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = _data => 50;

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=VirtualizedListExample&ext=tsx
import {View, VirtualizedList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ItemData = {
  id: string;
  title: string;
};

const getItem = (_data: unknown, index: number): ItemData => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = (_data: unknown) => 50;

type ItemProps = {
  title: string;
};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

몇 가지 주의 사항:

- 콘텐츠가 렌더 윈도우 밖으로 스크롤되면 내부 state가 보존되지 않습니다. 모든 데이터가 항목 데이터 또는 Flux, Redux, Relay 같은 외부 저장소에 캡처되어 있는지 확인하세요.
- 이 컴포넌트는 `PureComponent`이므로 `props`가 얕게 동일한 경우 다시 렌더링되지 않습니다. `renderItem` 함수가 의존하는 모든 것이 업데이트 후 `===`가 아닌 props(예: `extraData`)로 전달되는지 확인하세요. 그렇지 않으면 변경 시 UI가 업데이트되지 않을 수 있습니다. 여기에는 `data` props와 부모 컴포넌트의 state가 포함됩니다.
- 메모리를 제한하고 부드러운 스크롤을 가능하게 하기 위해, 콘텐츠는 화면 밖에서 비동기적으로 렌더링됩니다. 이는 채우기 속도보다 빠르게 스크롤하여 일시적으로 빈 콘텐츠를 볼 수 있음을 의미합니다. 이는 각 애플리케이션의 요구에 맞게 조정 가능한 트레이드오프이며, 저희는 내부적으로 이를 개선하고 있습니다.
- 기본적으로 목록은 각 항목의 `key` props를 찾아 React 키로 사용합니다. 대안으로 커스텀 `keyExtractor` props를 제공할 수 있습니다.

---

# 레퍼런스

## Props

### [ScrollView Props](scrollview.md#props)

[ScrollView Props](scrollview.md#props)를 상속합니다.

---

### `data`

항목을 검색하기 위해 `getItem` 및 `getItemCount`에 전달되는 불투명 데이터 타입입니다.

| 타입 |
| ---- |
| any  |

---

### <div className="label required basic">Required</div> **`getItem`**

```tsx
(data: any, index: number) => any;
```

모든 종류의 데이터 블롭에서 항목을 추출하기 위한 범용 접근자입니다.

| 타입     |
| -------- |
| function |

---

### <div className="label required basic">Required</div> **`getItemCount`**

```tsx
(data: any) => number;
```

데이터 블롭에 있는 항목의 수를 결정합니다.

| 타입     |
| -------- |
| function |

---

### <div className="label required basic">Required</div> **`renderItem`**

```tsx
(info: any) => ?React.Element<any>
```

`data`에서 항목을 가져와 목록에 렌더링합니다.

| 타입     |
| -------- |
| function |

---

### `CellRendererComponent`

CellRendererComponent를 사용하면 `renderItem`/`ListItemComponent`가 렌더링한 셀이 기반 ScrollView에 배치될 때 래핑되는 방식을 커스터마이즈할 수 있습니다. 이 컴포넌트는 셀 내의 변경 사항을 VirtualizedList에 알리는 이벤트 핸들러를 수락해야 합니다.

| 타입                                     |
| ---------------------------------------- |
| `React.ComponentType<CellRendererProps>` |

---

### `ItemSeparatorComponent`

각 항목 사이에 렌더링되지만 상단이나 하단에는 렌더링되지 않습니다. 기본적으로 `highlighted` 및 `leadingItem` props가 제공됩니다. `renderItem`은 `highlighted` props를 업데이트할 `separators.highlight`/`unhighlight`를 제공하지만, `separators.updateProps`를 사용하여 커스텀 props를 추가할 수도 있습니다. React Component(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)일 수 있습니다.

| 타입                         |
| ---------------------------- |
| component, function, element |

---

### `ListEmptyComponent`

목록이 비어 있을 때 렌더링됩니다. React Component(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)일 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `ListItemComponent`

각 데이터 항목은 이 엘리먼트를 사용하여 렌더링됩니다. React Component 클래스 또는 렌더 함수일 수 있습니다.

| 타입                |
| ------------------- |
| component, function |

---

### `ListFooterComponent`

모든 항목의 하단에 렌더링됩니다. React Component(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)일 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `ListFooterComponentStyle`

`ListFooterComponent`의 내부 View 스타일입니다.

| 타입          | 필수 여부 |
| ------------- | -------- |
| ViewStyleProp | No       |

---

### `ListHeaderComponent`

모든 항목의 상단에 렌더링됩니다. React Component(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)일 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `ListHeaderComponentStyle`

`ListHeaderComponent`의 내부 View 스타일입니다.

| 타입                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `debug`

`debug`는 사용법과 구현 모두의 디버깅을 돕기 위해 추가 로깅과 시각적 오버레이를 활성화하지만, 성능에 상당한 영향을 미칩니다.

| 타입    |
| ------- |
| boolean |

---

### 🗑️ `disableVirtualization`

:::warning Deprecated
가상화는 중요한 성능 및 메모리 최적화를 제공하지만, 렌더 윈도우 밖에 있는 React 인스턴스를 완전히 언마운트합니다. 디버깅 목적으로만 이 기능을 비활성화해야 합니다.
:::

| 타입    |
| ------- |
| boolean |

---

### `extraData`

목록에 다시 렌더링하도록 지시하는 마커 속성입니다(`PureComponent`를 구현하기 때문). `renderItem`, Header, Footer 등의 함수가 `data` props 외부의 것에 의존하는 경우 여기에 추가하고 불변으로 취급하세요.

| 타입 |
| ---- |
| any  |

---

### `getItemLayout`

```tsx
(
  data: any,
  index: number,
) => {length: number, offset: number, index: number}
```

| 타입     |
| -------- |
| function |

---

### `horizontal`

`true`이면 항목들을 세로로 쌓는 대신 가로로 나란히 렌더링합니다.

| 타입    |
| ------- |
| boolean |

---

### `initialNumToRender`

초기 배치에서 렌더링할 항목의 수입니다. 화면을 채우기에 충분하되 그보다 훨씬 많지 않아야 합니다. 이 항목들은 맨 위로 스크롤하는 동작의 인지된 성능을 향상시키기 위해 윈도우드 렌더링의 일부로 언마운트되지 않습니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `10`    |

---

### `initialScrollIndex`

첫 번째 항목의 맨 위에서 시작하는 대신 `initialScrollIndex`에서 시작합니다. 이 설정은 처음 `initialNumToRender` 항목을 항상 렌더링된 상태로 유지하는 "맨 위로 스크롤" 최적화를 비활성화하고 이 초기 인덱스에서 시작하는 항목들을 즉시 렌더링합니다. `getItemLayout`이 구현되어야 합니다.

| 타입   |
| ------ |
| number |

---

### `inverted`

스크롤 방향을 반전시킵니다. `-1`의 스케일 변환을 사용합니다.

| 타입    |
| ------- |
| boolean |

---

### `keyExtractor`

```tsx
(item: any, index: number) => string;
```

지정된 인덱스의 특정 항목에 대한 고유 키를 추출하는 데 사용됩니다. 키는 캐싱과 항목 재정렬을 추적하기 위한 React 키로 사용됩니다. 기본 추출기는 `item.key`를 확인하고, 그 다음 `item.id`를 확인하며, React처럼 인덱스를 사용하는 방식으로 대체됩니다.

| 타입     |
| -------- |
| function |

---

### `maxToRenderPerBatch`

각 증분 렌더 배치에서 렌더링할 최대 항목 수입니다. 한 번에 더 많이 렌더링할수록 채우기 속도가 좋아지지만, 콘텐츠를 렌더링하면 버튼 탭이나 다른 인터랙션에 응답하는 데 방해가 될 수 있어 응답성이 저하될 수 있습니다.

| 타입   |
| ------ |
| number |

---

### `onEndReached`

스크롤 위치가 목록의 논리적 끝에서 `onEndReachedThreshold` 이내에 들어오면 한 번 호출됩니다.

| 타입                                        |
| ------------------------------------------- |
| `(info: {distanceFromEnd: number}) => void` |

---

### `onEndReachedThreshold`

`onEndReached` 콜백을 트리거하기 위해 목록의 끝 가장자리가 콘텐츠 끝에서 얼마나 가까워야 하는지를 나타냅니다(목록의 가시 길이 단위). 따라서 값 0.5는 콘텐츠의 끝이 목록의 가시 길이의 절반 이내에 있을 때 `onEndReached`를 트리거합니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `2`     |

---

### `onRefresh`

```tsx
() => void;
```

제공된 경우, "당겨서 새로고침" 기능을 위한 표준 `RefreshControl`이 추가됩니다. `refreshing` props도 올바르게 설정해야 합니다.

| 타입     |
| -------- |
| function |

---

### `onScrollToIndexFailed`

```tsx
(info: {
  index: number,
  highestMeasuredFrameIndex: number,
  averageItemLength: number,
}) => void;
```

아직 측정되지 않은 인덱스로 스크롤할 때 실패를 처리하는 데 사용됩니다. 권장되는 조치는 자체 오프셋을 계산하고 `scrollTo`하거나, 가능한 한 멀리 스크롤한 후 더 많은 항목이 렌더링된 후에 다시 시도하는 것입니다.

| 타입     |
| -------- |
| function |

---

### `onStartReached`

스크롤 위치가 목록의 논리적 시작에서 `onStartReachedThreshold` 이내에 들어오면 한 번 호출됩니다.

| 타입                                          |
| --------------------------------------------- |
| `(info: {distanceFromStart: number}) => void` |

---

### `onStartReachedThreshold`

`onStartReached` 콜백을 트리거하기 위해 목록의 선도 가장자리가 콘텐츠 시작에서 얼마나 가까워야 하는지를 나타냅니다(목록의 가시 길이 단위). 따라서 값 0.5는 콘텐츠의 시작이 목록의 가시 길이의 절반 이내에 있을 때 `onStartReached`를 트리거합니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `2`     |

---

### `onViewableItemsChanged`

`viewabilityConfig` props에 의해 정의된 대로 행의 가시성이 변경될 때 호출됩니다.

| 타입                                                                                                  |
| ----------------------------------------------------------------------------------------------------- |
| `md (callback: {changed: [ViewToken](viewtoken)[], viewableItems: [ViewToken](viewtoken)[]}) => void` |

---

### `persistentScrollbar`

| 타입 |
| ---- |
| bool |

---

### `progressViewOffset`

로딩 인디케이터가 올바르게 표시되기 위해 오프셋이 필요한 경우 이 값을 설정하세요.

| 타입   |
| ------ |
| number |

---

### `refreshControl`

커스텀 새로고침 컨트롤 엘리먼트입니다. 설정하면 내부적으로 구축된 기본 `<RefreshControl>` 컴포넌트를 재정의합니다. onRefresh 및 refreshing props도 무시됩니다. 세로 VirtualizedList에서만 작동합니다.

| 타입    |
| ------- |
| element |

---

### `refreshing`

새로고침으로부터 새로운 데이터를 기다리는 동안 이 값을 true로 설정하세요.

| 타입    |
| ------- |
| boolean |

---

### `removeClippedSubviews`

:::warning
이 속성을 사용하면 일부 상황에서 버그(콘텐츠 누락)가 발생할 수 있습니다 - 주의해서 사용하세요.
:::

`true`일 때, 화면 밖의 자식 뷰가 화면 밖에 있을 때 네이티브 백업 슈퍼뷰에서 제거됩니다. 이는 대용량 목록의 스크롤 성능을 향상시킬 수 있습니다. Android에서 기본값은 `true`입니다.

| 타입    |
| ------- |
| boolean |

---

### `renderScrollComponent`

```tsx
(props: object) => element;
```

다르게 스타일링된 `RefreshControl`을 사용하는 등 커스텀 스크롤 컴포넌트를 렌더링합니다.

| 타입     |
| -------- |
| function |

---

### `viewabilityConfig`

flow 타입 및 추가 문서는 `ViewabilityHelper.js`를 참조하세요.

| 타입              |
| ----------------- |
| ViewabilityConfig |

---

### `viewabilityConfigCallbackPairs`

`ViewabilityConfig`/`onViewableItemsChanged` 쌍의 목록입니다. 해당 `ViewabilityConfig`의 조건이 충족되면 특정 `onViewableItemsChanged`가 호출됩니다. flow 타입 및 추가 문서는 `ViewabilityHelper.js`를 참조하세요.

| 타입                                   |
| -------------------------------------- |
| array of ViewabilityConfigCallbackPair |

---

### `updateCellsBatchingPeriod`

낮은 우선순위 항목 렌더 배치 사이의 시간(예: 화면에서 상당히 멀리 떨어진 항목 렌더링)입니다. `maxToRenderPerBatch`와 유사한 채우기 속도/응답성 트레이드오프입니다.

| 타입   |
| ------ |
| number |

---

### `windowSize`

가시 길이 단위로 가시 영역 밖에 렌더링되는 최대 항목 수를 결정합니다. 따라서 목록이 화면을 채우는 경우, `windowSize={21}`(기본값)은 가시 화면 영역과 뷰포트 위 최대 10개 화면, 아래 10개 화면을 렌더링합니다. 이 숫자를 줄이면 메모리 소비가 줄어들고 성능이 향상될 수 있지만, 빠른 스크롤 시 렌더링되지 않은 콘텐츠의 빈 영역이 일시적으로 보일 가능성이 높아집니다.

| 타입   |
| ------ |
| number |

## 메서드

### `flashScrollIndicators()`

```tsx
flashScrollIndicators();
```

---

### `getScrollableNode()`

```tsx
getScrollableNode(): any;
```

---

### `getScrollRef()`

```tsx
getScrollRef():
  | React.ElementRef<typeof ScrollView>
  | React.ElementRef<typeof View>
  | null;
```

---

### `getScrollResponder()`

```tsx
getScrollResponder () => ScrollResponderMixin | null;
```

기반 스크롤 응답자에 대한 핸들을 제공합니다. `this._scrollRef`가 `ScrollView`가 아닐 수 있으므로, 호출하기 전에 `getScrollResponder`에 응답하는지 확인해야 합니다.

---

### `scrollToEnd()`

```tsx
scrollToEnd(params?: {animated?: boolean});
```

콘텐츠의 끝으로 스크롤합니다. `getItemLayout` props 없이는 부드럽지 않을 수 있습니다.

**파라미터:**

| 이름   | 타입   |
| ------ | ------ |
| params | object |

유효한 `params` 키는 다음과 같습니다:

- `'animated'` (불리언) - 스크롤하는 동안 목록이 애니메이션을 수행해야 하는지 여부. 기본값은 `true`입니다.

---

### `scrollToIndex()`

```tsx
scrollToIndex(params: {
  index: number;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
});
```

유효한 `params`는 다음으로 구성됩니다:

- 'index' (숫자). 필수.
- 'animated' (불리언). 선택.
- 'viewOffset' (숫자). 선택.
- 'viewPosition' (숫자). 선택.

---

### `scrollToItem()`

```tsx
scrollToItem(params: {
  item: ItemT;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
);
```

유효한 `params`는 다음으로 구성됩니다:

- 'item' (Item). 필수.
- 'animated' (불리언). 선택.
- 'viewOffset' (숫자). 선택.
- 'viewPosition' (숫자). 선택.

---

### `scrollToOffset()`

```tsx
scrollToOffset(params: {
  offset: number;
  animated?: boolean;
});
```

목록의 특정 콘텐츠 픽셀 오프셋으로 스크롤합니다.

파라미터 `offset`은 스크롤할 오프셋을 기대합니다. `horizontal`이 true인 경우 오프셋은 x 값이고, 그 외의 경우 오프셋은 y 값입니다.

파라미터 `animated`(기본값 `true`)는 스크롤하는 동안 목록이 애니메이션을 수행해야 하는지 여부를 정의합니다.
