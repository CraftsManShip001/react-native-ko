---
id: optimizing-flatlist-configuration
title: Optimizing FlatList Configuration
---

## 용어

- **VirtualizedList:** `FlatList` 뒤에 있는 컴포넌트입니다(React Native의 [`Virtual List`](https://bvaughn.github.io/react-virtualized/#/components/List) 개념 구현체).

- **메모리 사용량(Memory consumption):** 목록에 대한 정보가 메모리에 얼마나 저장되는지를 나타내며, 앱 충돌로 이어질 수 있습니다.

- **반응성(Responsiveness):** 애플리케이션이 상호작용에 응답하는 능력입니다. 낮은 반응성이란 예를 들어 컴포넌트를 터치했을 때 즉시 반응하는 대신 잠시 기다렸다가 반응하는 경우를 말합니다.

- **빈 영역(Blank areas):** `VirtualizedList`가 항목을 충분히 빠르게 렌더링하지 못할 때, 렌더링되지 않은 컴포넌트가 빈 공간으로 나타나는 목록의 일부로 진입할 수 있습니다.

- **뷰포트(Viewport):** 픽셀로 렌더링되는 콘텐츠의 가시 영역입니다.

- **윈도우(Window):** 항목이 마운트되어야 하는 영역으로, 일반적으로 뷰포트보다 훨씬 큽니다.

## Props

다음은 `FlatList` 성능 향상에 도움이 되는 props 목록입니다:

### `removeClippedSubviews`

| 타입    | 기본값                              |
| ------- | ------------------------------------ |
| Boolean | Android에서는 `true`, 그 외에는 `false` |

`true`로 설정하면 뷰포트 바깥에 있는 뷰가 네이티브 뷰 계층에서 자동으로 분리됩니다.

**장점:** 뷰포트 바깥의 뷰를 네이티브 렌더링 및 드로잉 탐색에서 제외함으로써 메인 스레드에 소요되는 시간을 줄이고, 프레임 드롭 위험을 감소시킵니다.

**단점:** 이 구현에는 버그가 있을 수 있습니다. 특히 transforms 및/또는 절대 위치를 복잡하게 사용하는 경우 콘텐츠 누락(주로 iOS에서 관찰됨)이 발생할 수 있습니다. 또한 뷰가 할당 해제되지 않고 단순히 분리되기 때문에 메모리를 크게 절약하지는 않는다는 점에 유의하세요.

### `maxToRenderPerBatch`

| 타입   | 기본값 |
| ------ | ------- |
| Number | 10      |

`FlatList`를 통해 전달할 수 있는 `VirtualizedList` props입니다. 배치당 렌더링되는 항목 수를 제어하며, 이는 스크롤할 때마다 렌더링되는 다음 항목 청크입니다.

**장점:** 숫자를 크게 설정하면 스크롤 시 시각적으로 빈 영역이 줄어듭니다(채우기 속도 증가).

**단점:** 배치당 더 많은 항목은 JavaScript 실행 시간이 길어져 누르기 같은 다른 이벤트 처리를 차단할 수 있어 반응성이 떨어집니다.

### `updateCellsBatchingPeriod`

| 타입   | 기본값 |
| ------ | ------- |
| Number | 50      |

`maxToRenderPerBatch`가 배치당 렌더링되는 항목 수를 지정하는 반면, `updateCellsBatchingPeriod`는 `VirtualizedList`에 배치 렌더링 사이의 지연 시간(밀리초 단위, 즉 윈도우 내 항목을 렌더링하는 빈도)을 알려줍니다.

**장점:** 이 props를 `maxToRenderPerBatch`와 조합하면, 예를 들어 더 적은 빈도의 배치에서 더 많은 항목을 렌더링하거나, 더 잦은 빈도의 배치에서 더 적은 항목을 렌더링하는 등의 제어가 가능합니다.

**단점:** 배치 빈도가 낮으면 빈 영역이 발생할 수 있고, 배치 빈도가 높으면 반응성 문제가 발생할 수 있습니다.

### initialNumToRender

| 타입   | 기본값 |
| ------ | ------- |
| Number | 10      |

초기에 렌더링할 항목 수입니다.

**장점:** 모든 기기에서 화면을 채울 항목 수를 정확히 정의할 수 있습니다. 초기 렌더링 성능을 크게 향상시킬 수 있습니다.

**단점:** `initialNumToRender`를 너무 작게 설정하면 초기 렌더링 시 뷰포트를 채우기에 너무 적어 빈 영역이 발생할 수 있습니다.

### `windowSize`

| 타입   | 기본값 |
| ------ | ------- |
| Number | 21      |

여기에 전달하는 숫자는 측정 단위로, 1은 뷰포트 높이와 같습니다. 기본값은 21(위로 10개 뷰포트, 아래로 10개, 그 사이에 하나)입니다.

**장점:** `windowSize`가 크면 스크롤 중 빈 공간을 볼 가능성이 줄어듭니다. 반면 `windowSize`가 작으면 동시에 마운트되는 항목이 줄어들어 메모리를 절약할 수 있습니다.

**단점:** `windowSize`가 크면 메모리 사용량이 늘어납니다. `windowSize`가 작으면 빈 영역이 보일 가능성이 높아집니다.

## 목록 항목

다음은 목록 항목 컴포넌트에 관한 몇 가지 팁입니다. 목록의 핵심이므로 빠르게 작동해야 합니다.

### 기본 컴포넌트 사용하기

컴포넌트가 복잡할수록 렌더링이 느려집니다. 목록 항목에 많은 로직과 중첩을 피하세요. 앱에서 이 목록 항목 컴포넌트를 많이 재사용한다면 큰 목록 전용 컴포넌트를 만들고 로직과 중첩을 최소화하세요.

### 가벼운 컴포넌트 사용하기

컴포넌트가 무거울수록 렌더링이 느려집니다. 무거운 이미지는 피하세요(목록 항목에는 최대한 작은 크기로 잘린 버전이나 썸네일을 사용하세요). 디자인팀과 협의하여 목록에서 효과, 상호작용, 정보를 최소화하세요. 세부 항목에서 보여주세요.

### `memo()` 사용하기

`React.memo()`는 전달된 props가 변경될 때만 다시 렌더링되는 메모화된 컴포넌트를 생성합니다. 이 함수를 사용해 FlatList의 컴포넌트를 최적화할 수 있습니다.

```tsx
import {memo} from 'react';
import {View, Text} from 'react-native';

const MyListItem = memo(
  ({title}: {title: string}) => (
    <View>
      <Text>{title}</Text>
    </View>
  ),
  (prevProps, nextProps) => {
    return prevProps.title === nextProps.title;
  },
);

export default MyListItem;
```

이 예시에서는 `title`이 변경될 때만 `MyListItem`이 다시 렌더링되도록 결정했습니다. 비교 함수를 `React.memo()`의 두 번째 인수로 전달했으므로 지정된 props가 변경될 때만 컴포넌트가 다시 렌더링됩니다. 비교 함수가 `true`를 반환하면 컴포넌트가 다시 렌더링되지 않습니다.

### 캐시된 최적화 이미지 사용하기

더 나은 성능의 이미지를 위해 커뮤니티 패키지(예: [Dream11](https://github.com/ds-horizon)의 [@d11/react-native-fast-image](https://github.com/ds-horizon/react-native-fast-image))를 사용할 수 있습니다. 목록의 모든 이미지는 `new Image()` 인스턴스입니다. `loaded` 훅에 더 빠르게 도달할수록 JavaScript 스레드가 더 빨리 자유로워집니다.

### `getItemLayout` 사용하기

모든 목록 항목 컴포넌트의 높이(또는 수평 목록의 경우 너비)가 동일하다면, [getItemLayout](flatlist#getitemlayout) props를 제공하여 `FlatList`가 비동기 레이아웃 계산을 관리할 필요가 없도록 합니다. 이는 매우 바람직한 최적화 기법입니다.

컴포넌트의 크기가 동적이고 성능이 꼭 필요하다면, 디자인팀에 더 나은 성능을 위한 리디자인 가능성을 논의해보세요.

### `keyExtractor` 또는 `key` 사용하기

`FlatList` 컴포넌트에 [`keyExtractor`](flatlist#keyextractor)를 설정할 수 있습니다. 이 props는 캐싱과 항목 재정렬을 추적하기 위한 React `key`로 사용됩니다.

항목 컴포넌트에 `key` props를 사용할 수도 있습니다.

### `renderItem`에 익명 함수 사용하지 않기

함수형 컴포넌트의 경우, `renderItem` 함수를 반환된 JSX 외부로 이동하세요. 또한 매 렌더링마다 재생성되지 않도록 `useCallback` 훅으로 감싸야 합니다.

클래스 컴포넌트의 경우, `renderItem` 함수를 render 함수 외부로 이동하여 render 함수가 호출될 때마다 재생성되지 않도록 하세요.

```tsx
const renderItem = useCallback(({item}) => (
   <View key={item.key}>
      <Text>{item.title}</Text>
   </View>
 ), []);

return (
  // ...
  <FlatList data={items} renderItem={renderItem} />;
  // ...
);
```
