---
id: flatlist
title: FlatList
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

기본적인 평면 목록을 렌더링하기 위한 고성능 인터페이스로, 가장 유용한 기능들을 지원합니다.

- 완전한 크로스 플랫폼 지원.
- 선택적 수평 모드.
- 구성 가능한 가시성 콜백.
- 헤더 지원.
- 푸터 지원.
- 구분선 지원.
- 당겨서 새로 고침.
- 스크롤 로딩.
- ScrollToIndex 지원.
- 다중 열 지원.

섹션 지원이 필요하다면 [`<SectionList>`](sectionlist.md)를 사용하세요.

## 예제

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Simple%20FlatList%20Example&ext=js
import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Simple%20FlatList%20Example&ext=tsx
import {View, FlatList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

여러 열을 렌더링하려면 [`numColumns`](flatlist.md#numcolumns) props를 사용하세요. `flexWrap` 레이아웃 대신 이 방법을 사용하면 아이템 높이 로직과의 충돌을 방지할 수 있습니다.

아래는 선택 가능한 더 복잡한 예제입니다.

- `FlatList`에 `extraData={selectedId}`를 전달하여 state가 변경될 때 `FlatList` 자체가 다시 렌더링되도록 합니다. 이 props를 설정하지 않으면, `FlatList`는 `PureComponent`이고 props 비교에서 변경 사항이 나타나지 않기 때문에 아이템을 다시 렌더링해야 한다는 것을 알 수 없습니다.
- `keyExtractor`는 리스트가 기본 `key` 속성 대신 `id`를 react 키로 사용하도록 지시합니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=flatlist-selectable&ext=js
import {useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=flatlist-selectable&ext=tsx
import {useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

이는 [`<VirtualizedList>`](virtualizedlist.md)를 감싸는 편의 래퍼이며, 명시적으로 나열되지 않은 props(및 [`<ScrollView>`](scrollview.md)의 props)를 상속받습니다. 다음과 같은 주의 사항이 있습니다.

- 콘텐츠가 렌더링 윈도우 밖으로 스크롤되면 내부 state가 보존되지 않습니다. 모든 데이터가 아이템 데이터 또는 Flux, Redux, Relay와 같은 외부 스토어에 캡처되어 있는지 확인하세요.
- 이는 `PureComponent`이므로 `props`가 얕은 동등성을 유지하면 다시 렌더링되지 않습니다. `renderItem` 함수가 의존하는 모든 것이 업데이트 후 `===`가 아닌 props(예: `extraData`)로 전달되었는지 확인하세요. 그렇지 않으면 변경 시 UI가 업데이트되지 않을 수 있습니다. 여기에는 `data` props와 부모 컴포넌트 state가 포함됩니다.
- 메모리를 제한하고 부드러운 스크롤을 가능하게 하기 위해, 콘텐츠는 화면 밖에서 비동기적으로 렌더링됩니다. 이는 화면 채우기 속도보다 빠르게 스크롤하여 일시적으로 빈 콘텐츠가 보일 수 있음을 의미합니다. 이는 각 애플리케이션의 요구에 맞게 조정할 수 있는 트레이드오프이며, 백그라운드에서 개선하기 위해 노력하고 있습니다.
- 기본값으로 리스트는 각 아이템에서 `key` props를 찾아 React 키로 사용합니다. 대신 커스텀 `keyExtractor` props를 제공할 수도 있습니다.

---

# 레퍼런스

## Props

### [VirtualizedList Props](virtualizedlist.md#props)

[VirtualizedList Props](virtualizedlist.md#props)를 상속합니다.

---

### <div className="label required basic">필수</div> **`renderItem`**

```tsx
renderItem({
  item: ItemT,
  index: number,
  separators: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
  }
}): JSX.Element;
```

`data`에서 아이템을 가져와 리스트에 렌더링합니다.

필요한 경우 `index`와 같은 추가 메타데이터를 제공하며, 더 일반적인 `highlight` 및 `unhighlight`(불리언 `highlighted` props를 설정)가 사용 사례에 충분하지 않은 경우 앞쪽 또는 뒤쪽 구분선의 렌더링을 변경하기 위해 원하는 props를 설정할 수 있는 `separators.updateProps` 함수도 제공합니다.

| 타입     |
| -------- |
| function |

- `item` (Object): 렌더링되는 `data`의 아이템.
- `index` (number): `data` 배열에서 이 아이템에 해당하는 인덱스.
- `separators` (Object)
  - `highlight` (Function)
  - `unhighlight` (Function)
  - `updateProps` (Function)
    - `select` (enum('leading', 'trailing'))
    - `newProps` (Object)

사용 예시:

```tsx
<FlatList
  ItemSeparatorComponent={
    Platform.OS !== 'android' &&
    (({highlighted}) => (
      <View
        style={[style.separator, highlighted && {marginLeft: 0}]}
      />
    ))
  }
  data={[{title: 'Title Text', key: 'item1'}]}
  renderItem={({item, index, separators}) => (
    <TouchableHighlight
      key={item.key}
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={{backgroundColor: 'white'}}>
        <Text>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )}
/>
```

---

### <div className="label required basic">필수</div> **`data`**

렌더링할 아이템의 배열(또는 배열과 유사한 목록). 다른 데이터 타입을 사용하려면 [`VirtualizedList`](virtualizedlist.md)를 직접 사용하세요.

| 타입      |
| --------- |
| ArrayLike |

---

### `ItemSeparatorComponent`

각 아이템 사이에 렌더링되며, 상단과 하단에는 렌더링되지 않습니다. 기본값으로 `highlighted`와 `leadingItem` props가 제공됩니다. `renderItem`은 `highlighted` props를 업데이트하는 `separators.highlight`/`unhighlight`를 제공하며, `separators.updateProps`로 커스텀 props를 추가할 수도 있습니다. React Component(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)가 될 수 있습니다.

| 타입                         |
| ---------------------------- |
| component, function, element |

---

### `ListEmptyComponent`

리스트가 비어있을 때 렌더링됩니다. React Component(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)가 될 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `ListFooterComponent`

모든 아이템의 하단에 렌더링됩니다. React Component(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)가 될 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `ListFooterComponentStyle`

`ListFooterComponent`의 내부 View에 대한 스타일링입니다.

| 타입                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `ListHeaderComponent`

모든 아이템의 상단에 렌더링됩니다. React Component(예: `SomeComponent`) 또는 React 엘리먼트(예: `<SomeComponent />`)가 될 수 있습니다.

| 타입               |
| ------------------ |
| component, element |

---

### `ListHeaderComponentStyle`

`ListHeaderComponent`의 내부 View에 대한 스타일링입니다.

| 타입                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `columnWrapperStyle`

`numColumns > 1`일 때 생성되는 다중 아이템 행에 대한 선택적 커스텀 스타일입니다.

| 타입                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `extraData`

리스트에 다시 렌더링을 지시하기 위한 마커 속성입니다(`PureComponent`를 구현하므로). `renderItem`, Header, Footer 등의 함수가 `data` props 외부의 것에 의존하는 경우 여기에 두고 불변으로 처리하세요.

| 타입 |
| ---- |
| any  |

---

### `getItemLayout`

```tsx
(data, index) => {length: number, offset: number, index: number}
```

`getItemLayout`은 아이템의 크기(높이 또는 너비)를 미리 알고 있는 경우 동적 콘텐츠의 측정을 건너뛸 수 있는 선택적 최적화입니다. 고정 크기 아이템이 있는 경우 `getItemLayout`이 효율적입니다. 예를 들어:

```tsx
  getItemLayout={(data, index) => (
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  )}
```

`getItemLayout`을 추가하면 수백 개의 아이템이 있는 리스트의 성능을 크게 향상시킬 수 있습니다. `ItemSeparatorComponent`를 지정하는 경우 오프셋 계산에 구분선 길이(높이 또는 너비)를 포함하는 것을 잊지 마세요.

| 타입     |
| -------- |
| function |

---

### `horizontal`

`true`이면 아이템을 수직으로 쌓는 대신 수평으로 나란히 렌더링합니다.

| 타입    |
| ------- |
| boolean |

---

### `initialNumToRender`

초기 배치에서 렌더링할 아이템 수입니다. 화면을 채울 만큼 충분하되 그 이상은 필요하지 않습니다. 이 아이템들은 스크롤-투-탑 액션의 인식된 성능을 향상시키기 위해 윈도우 렌더링의 일부로 언마운트되지 않습니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `10`    |

---

### `initialScrollIndex`

첫 번째 아이템에서 상단으로 시작하는 대신 `initialScrollIndex`에서 시작합니다. 이렇게 하면 처음 `initialNumToRender` 아이템을 항상 렌더링하는 "스크롤-투-탑" 최적화가 비활성화되고 이 초기 인덱스에서 시작하는 아이템을 즉시 렌더링합니다. `getItemLayout`이 구현되어야 합니다.

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
(item: ItemT, index: number) => string;
```

지정된 인덱스의 특정 아이템에 대한 고유 키를 추출하는 데 사용됩니다. 키는 캐싱과 아이템 재정렬을 추적하는 react 키로 사용됩니다. 기본 추출기는 `item.key`를 확인한 후 `item.id`를 확인하고, React처럼 인덱스를 폴백으로 사용합니다.

| 타입     |
| -------- |
| function |

---

### `numColumns`

여러 열은 `horizontal={false}`로만 렌더링할 수 있으며 `flexWrap` 레이아웃처럼 지그재그로 배열됩니다. 아이템은 모두 동일한 높이여야 합니다 - 메이슨리 레이아웃은 지원되지 않습니다.

| 타입   |
| ------ |
| number |

---

### `onRefresh`

```tsx
() => void;
```

제공된 경우 "당겨서 새로 고침" 기능을 위해 표준 RefreshControl이 추가됩니다. `refreshing` props도 올바르게 설정했는지 확인하세요.

| 타입     |
| -------- |
| function |

---

### `onViewableItemsChanged`

`viewabilityConfig` props에 정의된 대로 행의 가시성이 변경될 때 호출됩니다.

| 타입                                                                                                  |
| ----------------------------------------------------------------------------------------------------- |
| `md (callback: {changed: [ViewToken](viewtoken)[], viewableItems: [ViewToken](viewtoken)[]} => void;` |

---

### `progressViewOffset`

로딩 인디케이터가 올바르게 표시되려면 오프셋이 필요할 때 설정합니다.

| 타입   |
| ------ |
| number |

---

### `refreshing`

새 데이터를 기다리는 동안 이 값을 true로 설정합니다.

| 타입    |
| ------- |
| boolean |

---

### `removeClippedSubviews`

:::warning
이 속성을 사용하면 일부 상황에서 버그(누락된 콘텐츠)가 발생할 수 있습니다 - 사용 시 주의하세요.
:::

`true`이면 화면 밖의 자식 뷰가 화면 밖에 있을 때 네이티브 백킹 슈퍼뷰에서 제거됩니다. 이는 큰 리스트의 스크롤 성능을 향상시킬 수 있습니다. Android에서 기본값은 `true`입니다.

| 타입    |
| ------- |
| boolean |

---

### `viewabilityConfig`

flow 타입 및 추가 문서는 [`ViewabilityHelper.js`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Lists/ViewabilityHelper.js)를 참조하세요.

| 타입              |
| ----------------- |
| ViewabilityConfig |

`viewabilityConfig`는 다음 속성을 가진 객체인 `ViewabilityConfig` 타입을 받습니다.

| 속성                             | 타입    |
| -------------------------------- | ------- |
| minimumViewTime                  | number  |
| viewAreaCoveragePercentThreshold | number  |
| itemVisiblePercentThreshold      | number  |
| waitForInteraction               | boolean |

`viewAreaCoveragePercentThreshold` 또는 `itemVisiblePercentThreshold` 중 하나 이상이 필수입니다. 다음 오류를 방지하기 위해 `constructor`에서 설정해야 합니다([참조](https://github.com/facebook/react-native/issues/17408)):

```
  Error: Changing viewabilityConfig on the fly is not supported
```

```tsx
constructor (props) {
  super(props)

  this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
  }
}
```

```tsx
<FlatList
    viewabilityConfig={this.viewabilityConfig}
  ...
```

#### minimumViewTime

가시성 콜백이 실행되기 전에 아이템이 물리적으로 보여야 하는 최소 시간(밀리초)입니다. 높은 숫자는 멈추지 않고 콘텐츠를 스크롤하면 콘텐츠를 가시적으로 표시하지 않음을 의미합니다.

#### viewAreaCoveragePercentThreshold

부분적으로 가려진 아이템이 "가시적"으로 계산되기 위해 뷰포트가 덮어야 하는 비율, 0-100. 완전히 보이는 아이템은 항상 가시적으로 간주됩니다. 0은 뷰포트의 단일 픽셀이 아이템을 가시적으로 만든다는 의미이고, 100은 아이템이 완전히 보이거나 전체 뷰포트를 덮어야 가시적으로 계산된다는 의미입니다.

#### itemVisiblePercentThreshold

`viewAreaCoveragePercentThreshold`와 유사하지만, 덮고 있는 뷰포트 비율 대신 보이는 아이템의 비율을 고려합니다.

#### waitForInteraction

사용자가 스크롤하거나 렌더링 후 `recordInteraction`이 호출될 때까지 아무것도 가시적으로 간주되지 않습니다.

---

### `viewabilityConfigCallbackPairs`

`ViewabilityConfig`/`onViewableItemsChanged` 쌍의 목록입니다. 해당 `ViewabilityConfig`의 조건이 충족되면 특정 `onViewableItemsChanged`가 호출됩니다. flow 타입 및 추가 문서는 `ViewabilityHelper.js`를 참조하세요.

| 타입                                   |
| -------------------------------------- |
| array of ViewabilityConfigCallbackPair |

## 메서드

### `flashScrollIndicators()`

```tsx
flashScrollIndicators();
```

스크롤 인디케이터를 일시적으로 표시합니다.

---

### `getNativeScrollRef()`

```tsx
getNativeScrollRef(): React.ElementRef<typeof ScrollViewComponent>;
```

기저 스크롤 컴포넌트에 대한 참조를 제공합니다.

---

### `getScrollResponder()`

```tsx
getScrollResponder(): ScrollResponderMixin;
```

기저 스크롤 리스폰더에 대한 핸들을 제공합니다.

---

### `getScrollableNode()`

```tsx
getScrollableNode(): any;
```

기저 스크롤 노드에 대한 핸들을 제공합니다.

### `scrollToEnd()`

```tsx
scrollToEnd(params?: {animated?: boolean});
```

콘텐츠의 끝으로 스크롤합니다. `getItemLayout` props 없이는 부드럽지 않을 수 있습니다.

**매개변수:**

| 이름   | 타입   |
| ------ | ------ |
| params | object |

유효한 `params` 키:

- 'animated' (불리언) - 스크롤 시 리스트가 애니메이션을 수행해야 하는지 여부. 기본값은 `true`.

---

### `scrollToIndex()`

```tsx
scrollToIndex: (params: {
  index: number;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
});
```

지정된 인덱스의 아이템이 뷰 가능한 영역에 위치하도록 스크롤합니다. `viewPosition` 0은 상단, 1은 하단, 0.5는 중앙에 배치합니다.

:::note
`getItemLayout` props를 지정하지 않고 렌더링 윈도우 밖의 위치로 스크롤할 수 없습니다.
:::

**매개변수:**

| 이름                                                        | 타입   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">필수</div> | object |

유효한 `params` 키:

- 'animated' (불리언) - 스크롤 시 리스트가 애니메이션을 수행해야 하는지 여부. 기본값은 `true`.
- 'index' (숫자) - 스크롤할 인덱스. 필수.
- 'viewOffset' (숫자) - 최종 목표 위치에서 오프셋할 고정 픽셀 수.
- 'viewPosition' (숫자) - `0`은 인덱스로 지정된 아이템을 상단에, `1`은 하단에, `0.5`는 중앙에 배치합니다.

---

### `scrollToItem()`

```tsx
scrollToItem(params: {
  animated?: ?boolean,
  item: Item,
  viewPosition?: number,
});
```

데이터를 선형으로 스캔해야 합니다 - 가능하다면 대신 `scrollToIndex`를 사용하세요.

:::note
`getItemLayout` props를 지정하지 않고 렌더링 윈도우 밖의 위치로 스크롤할 수 없습니다.
:::

**매개변수:**

| 이름                                                        | 타입   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">필수</div> | object |

유효한 `params` 키:

- 'animated' (불리언) - 스크롤 시 리스트가 애니메이션을 수행해야 하는지 여부. 기본값은 `true`.
- 'item' (객체) - 스크롤할 아이템. 필수.
- 'viewPosition' (숫자)

---

### `scrollToOffset()`

```tsx
scrollToOffset(params: {
  offset: number;
  animated?: boolean;
});
```

리스트의 특정 콘텐츠 픽셀 오프셋으로 스크롤합니다.

**매개변수:**

| 이름                                                        | 타입   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">필수</div> | object |

유효한 `params` 키:

- 'offset' (숫자) - 스크롤할 오프셋. `horizontal`이 true인 경우 오프셋은 x 값이고, 그 외의 경우 y 값입니다. 필수.
- 'animated' (불리언) - 스크롤 시 리스트가 애니메이션을 수행해야 하는지 여부. 기본값은 `true`.
