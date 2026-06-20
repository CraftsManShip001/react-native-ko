---
id: scrollview
title: ScrollView
---

플랫폼의 ScrollView를 래핑하면서 터치 잠금 "responder" 시스템과의 통합을 제공하는 컴포넌트입니다.

ScrollView는 무한한 높이의 자식 요소들을 유한한 컨테이너 안에 담기 때문에(스크롤 상호작용을 통해), 정상적으로 동작하려면 반드시 유한한 높이를 가져야 합니다. ScrollView의 높이를 제한하려면 뷰의 높이를 직접 설정하거나(권장하지 않음), 모든 부모 뷰가 유한한 높이를 갖도록 해야 합니다. 뷰 스택 아래로 `{flex: 1}`을 전달하는 것을 잊으면 오류가 발생할 수 있으며, 요소 인스펙터를 통해 빠르게 디버그할 수 있습니다.

현재는 포함된 다른 responder가 이 스크롤 뷰가 responder가 되는 것을 막는 기능을 지원하지 않습니다.

`<ScrollView>` vs [`<FlatList>`](flatlist.md) - 어떤 것을 사용해야 할까요?

`ScrollView`는 React 자식 컴포넌트를 한 번에 모두 렌더링하지만, 이는 성능상 단점이 있습니다.

표시하려는 항목이 매우 많다고 상상해보세요, 아마도 여러 화면 분량의 콘텐츠일 것입니다. 표시되지 않을 수도 있는 모든 항목에 대해 JS 컴포넌트와 네이티브 뷰를 한꺼번에 생성하면 렌더링 속도가 느려지고 메모리 사용량이 증가합니다.

이때 `FlatList`가 활용됩니다. `FlatList`는 항목이 화면에 나타나려 할 때 지연 렌더링하고, 화면 밖으로 멀리 스크롤된 항목은 제거하여 메모리와 처리 시간을 절약합니다.

`FlatList`는 항목 사이에 구분선을 렌더링하거나, 다중 열, 무한 스크롤 로딩, 기타 기본 제공 기능이 필요한 경우에도 유용합니다.

## 예시

```SnackPlayer name=ScrollView%20Example
import {StyleSheet, Text, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});

export default App;
```

---

# 레퍼런스

## Props

### [View Props](view.md#props)

[View Props](view#props)를 상속합니다.

---

### `StickyHeaderComponent`

고정 헤더를 렌더링하는 데 사용될 React 컴포넌트로, `stickyHeaderIndices`와 함께 사용해야 합니다. 예를 들어 목록에 애니메이션 및 숨길 수 있는 헤더를 원하는 경우처럼, 고정 헤더가 커스텀 변환을 사용할 때 이 컴포넌트를 설정해야 할 수 있습니다. 컴포넌트가 제공되지 않으면 기본 [`ScrollViewStickyHeader`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/ScrollView/ScrollViewStickyHeader.js) 컴포넌트가 사용됩니다.

| 타입               |
| ------------------ |
| component, element |

---

### `alwaysBounceHorizontal` <div className="label ios">iOS</div>

`true`일 때, 콘텐츠가 스크롤 뷰보다 작더라도 끝에 도달하면 수평으로 바운스됩니다.

| 타입 | 기본값                                                |
| ---- | ----------------------------------------------------- |
| bool | `horizontal={true}`일 때 `true`<hr/>`false` 그 외     |

---

### `alwaysBounceVertical` <div className="label ios">iOS</div>

`true`일 때, 콘텐츠가 스크롤 뷰보다 작더라도 끝에 도달하면 수직으로 바운스됩니다.

| 타입 | 기본값                                                |
| ---- | ----------------------------------------------------- |
| bool | `horizontal={true}`일 때 `false`<hr/>`true` 그 외     |

---

### `automaticallyAdjustContentInsets` <div className="label ios">iOS</div>

내비게이션 바 또는 탭 바/툴바 뒤에 위치한 스크롤 뷰의 콘텐츠 inset을 iOS가 자동으로 조정할지 여부를 제어합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `automaticallyAdjustKeyboardInsets` <div className="label ios">iOS</div>

키보드 크기가 변경될 때 ScrollView가 `contentInset`과 `scrollViewInsets`를 자동으로 조정할지 여부를 제어합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `automaticallyAdjustsScrollIndicatorInsets` <div className="label ios">iOS</div>

iOS가 스크롤 인디케이터 inset을 자동으로 조정할지 여부를 제어합니다. Apple의 [해당 속성 문서](https://developer.apple.com/documentation/uikit/uiscrollview/3198043-automaticallyadjustsscrollindica)를 참고하세요.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `bounces` <div className="label ios">iOS</div>

`true`일 때, 스크롤 방향의 축을 따라 콘텐츠가 스크롤 뷰보다 큰 경우 끝에 도달하면 바운스됩니다. `false`이면 `alwaysBounce*` props가 `true`이더라도 모든 바운스가 비활성화됩니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `bouncesZoom` <div className="label ios">iOS</div>

`true`일 때, 제스처로 최소/최대 값을 초과하는 줌이 가능하며 제스처가 끝나면 최소/최대 값으로 애니메이션됩니다. 그렇지 않으면 줌이 제한값을 초과하지 않습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `canCancelContentTouches` <div className="label ios">iOS</div>

`false`이면, 추적이 시작된 후 터치가 이동하더라도 드래그를 시도하지 않습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `centerContent` <div className="label ios">iOS</div>

`true`일 때, 콘텐츠가 스크롤 뷰 경계보다 작으면 스크롤 뷰가 콘텐츠를 자동으로 중앙에 배치합니다. 콘텐츠가 스크롤 뷰보다 큰 경우 이 속성은 효과가 없습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `contentContainerStyle`

모든 자식 뷰를 감싸는 스크롤 뷰 콘텐츠 컨테이너에 적용될 스타일입니다. 예시:

```
return (
  <ScrollView contentContainerStyle={styles.contentContainer}>
  </ScrollView>
);
...
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
```

| 타입                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `contentInset` <div className="label ios">iOS</div>

스크롤 뷰 콘텐츠가 스크롤 뷰 가장자리로부터 inset되는 양입니다.

| 타입                                                                 | 기본값                                   |
| -------------------------------------------------------------------- | ---------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` | `{top: 0, left: 0, bottom: 0, right: 0}` |

---

### `contentInsetAdjustmentBehavior` <div className="label ios">iOS</div>

이 속성은 스크롤 뷰의 콘텐츠 영역을 수정하는 데 safe area inset이 사용되는 방식을 지정합니다. iOS 11 이상에서 사용 가능합니다.

| 타입                                                           | 기본값    |
| -------------------------------------------------------------- | --------- |
| enum(`'automatic'`, `'scrollableAxes'`, `'never'`, `'always'`) | `'never'` |

---

### `contentOffset`

시작 스크롤 오프셋을 수동으로 설정하는 데 사용합니다.

| 타입  | 기본값         |
| ----- | -------------- |
| Point | `{x: 0, y: 0}` |

---

### `decelerationRate`

사용자가 손가락을 뗀 후 스크롤 뷰가 얼마나 빠르게 감속하는지를 결정하는 부동소수점 숫자입니다. `UIScrollViewDecelerationRateNormal` 및 `UIScrollViewDecelerationRateFast`에 해당하는 iOS 설정과 일치하는 문자열 단축키 `"normal"` 및 `"fast"`를 사용할 수도 있습니다.

- `'normal'` iOS에서 0.998, Android에서 0.985.
- `'fast'`, iOS에서 0.99, Android에서 0.9.

| 타입                               | 기본값     |
| ---------------------------------- | ---------- |
| enum(`'fast'`, `'normal'`), number | `'normal'` |

---

### `directionalLockEnabled` <div className="label ios">iOS</div>

`true`일 때, ScrollView는 드래그 중에 수직 또는 수평 스크롤 중 하나로만 잠기려 합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `disableIntervalMomentum`

`true`일 때, 제스처 속도에 관계없이 스크롤 뷰는 릴리스 시점의 스크롤 위치 기준으로 다음 인덱스에서 멈춥니다. 이는 페이지가 수평 ScrollView 너비 또는 수직 ScrollView 높이보다 작을 때 페이지 매김에 사용할 수 있습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `disableScrollViewPanResponder`

`true`일 때, ScrollView의 기본 JS pan responder가 비활성화되고, ScrollView 내부 터치에 대한 전체 제어권이 자식 컴포넌트에 위임됩니다. 이는 `snapToInterval`이 활성화된 경우에 특히 유용하며, 일반적인 터치 패턴을 따르지 않습니다. `snapToInterval` 없이 일반 ScrollView에서는 사용하지 마세요. 스크롤 중 예기치 않은 터치가 발생할 수 있습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `endFillColor` <div className="label android">Android</div>

스크롤 뷰가 콘텐츠보다 더 많은 공간을 차지하는 경우가 있습니다. 이런 경우 이 prop은 불필요한 오버드로를 방지하기 위해 배경을 설정하는 대신 스크롤 뷰의 나머지 부분을 색상으로 채웁니다. 이는 일반적인 경우에는 필요하지 않은 고급 최적화입니다.

| 타입            |
| --------------- |
| [color](colors) |

---

### `fadingEdgeLength` <div className="label android">Android</div>

스크롤 콘텐츠의 가장자리를 페이드 아웃합니다.

값이 `0`보다 크면, 현재 스크롤 방향과 위치에 따라 페이딩 가장자리가 설정되어 더 많은 콘텐츠가 있음을 나타냅니다.

| 타입                                               | 기본값 |
| -------------------------------------------------- | ------- |
| number<hr />object: `{start: number, end: number}` | `0`     |

---

### `horizontal`

`true`일 때, 스크롤 뷰의 자식들이 세로 열 대신 가로 행으로 정렬됩니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `indicatorStyle` <div className="label ios">iOS</div>

스크롤 인디케이터의 스타일입니다.

- `'default'`는 `black`과 동일합니다.
- `'black'`, 스크롤 인디케이터가 `black`입니다. 밝은 배경에 적합한 스타일입니다.
- `'white'`, 스크롤 인디케이터가 `white`입니다. 어두운 배경에 적합한 스타일입니다.

| 타입                                    | 기본값      |
| --------------------------------------- | ----------- |
| enum(`'default'`, `'black'`, `'white'`) | `'default'` |

---

### `invertStickyHeaders`

고정 헤더가 ScrollView의 상단 대신 하단에 고정되어야 하는 경우입니다. 일반적으로 반전된 ScrollView와 함께 사용합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `keyboardDismissMode`

드래그에 대한 응답으로 키보드가 해제되는 방식을 결정합니다.

- `'none'`, 드래그해도 키보드가 해제되지 않습니다.
- `'on-drag'`, 드래그가 시작될 때 키보드가 해제됩니다.

**iOS 전용**

- `'interactive'`, 키보드가 드래그와 상호작용하여 터치와 동기화되어 움직이며, 위로 드래그하면 해제가 취소됩니다. Android에서는 지원되지 않으며 `'none'`과 동일하게 동작합니다.

| 타입                                                                                                                                                            | 기본값   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum(`'none'`, `'on-drag'`) <div className="label android">Android</div><hr />enum(`'none'`, `'on-drag'`, `'interactive'`) <div className="label ios">iOS</div> | `'none'` |

---

### `keyboardShouldPersistTaps`

탭 후 키보드가 계속 표시되어야 하는 시점을 결정합니다.

- `'never'` 키보드가 표시된 상태에서 포커스된 텍스트 입력 외부를 탭하면 키보드가 해제됩니다. 이 경우 자식 요소는 탭을 받지 않습니다.
- `'always'`, 키보드가 자동으로 해제되지 않으며, 스크롤 뷰는 탭을 잡지 않지만 스크롤 뷰의 자식 요소는 탭을 잡을 수 있습니다.
- `'handled'`, 탭이 스크롤 뷰의 자식 요소에 의해 처리되었거나(또는 조상이 캡처한 경우) 키보드가 자동으로 해제되지 않습니다.
- `false`, **_deprecated(더 이상 권장되지 않음)_**, 대신 `'never'`를 사용하세요.
- `true`, **_deprecated(더 이상 권장되지 않음)_**, 대신 `'always'`를 사용하세요.

| 타입                                                      | 기본값    |
| --------------------------------------------------------- | --------- |
| enum(`'always'`, `'never'`, `'handled'`, `false`, `true`) | `'never'` |

---

### `maintainVisibleContentPosition`

설정하면, 스크롤 뷰는 현재 보이는 항목 중 `minIndexForVisible` 이상에 있는 첫 번째 자식의 위치가 변경되지 않도록 스크롤 위치를 조정합니다. 이는 양방향으로 콘텐츠를 로드하는 목록(예: 채팅 스레드)에서 유용하며, 새 메시지가 수신될 때 스크롤 위치가 갑자기 이동하는 것을 방지합니다. `0` 값이 일반적이지만, 로딩 스피너나 위치를 유지하지 않아야 하는 다른 콘텐츠를 건너뛰기 위해 `1`과 같은 다른 값을 사용할 수도 있습니다.

선택적 `autoscrollToTopThreshold`는 조정 전에 사용자가 상단 임계값 내에 있었던 경우 조정 후 콘텐츠가 자동으로 맨 위로 스크롤되도록 할 수 있습니다. 이는 새 메시지가 표시되기를 원하지만 사용자가 위로 많이 스크롤하여 아래로 많이 이동하면 방해가 되는 채팅 유사 애플리케이션에도 유용합니다.

주의 사항 1: 이 기능이 활성화된 상태에서 스크롤 뷰의 요소를 재정렬하면 화면 떨림이나 끊김이 발생할 수 있습니다. 수정이 가능하지만 현재는 계획이 없습니다. 지금은 이 기능을 사용하는 ScrollView 또는 목록의 콘텐츠를 재정렬하지 마세요.

주의 사항 2: 이는 네이티브 코드에서 `contentOffset`과 `frame.origin`을 사용하여 가시성을 계산합니다. 가려짐, 변환 및 기타 복잡한 요소는 콘텐츠가 "보이는지" 여부를 계산할 때 고려되지 않습니다.

| 타입                                                                     |
| ------------------------------------------------------------------------ |
| object: `{minIndexForVisible: number, autoscrollToTopThreshold: number}` |

---

### `maximumZoomScale` <div className="label ios">iOS</div>

허용되는 최대 줌 배율입니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `1.0`   |

---

### `minimumZoomScale` <div className="label ios">iOS</div>

허용되는 최소 줌 배율입니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `1.0`   |

---

### `nestedScrollEnabled` <div className="label android">Android</div>

Android API 레벨 21 이상에서 중첩 스크롤을 활성화합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `onContentSizeChange`

ScrollView의 스크롤 가능한 콘텐츠 뷰가 변경될 때 호출됩니다.

핸들러 함수는 두 개의 매개변수를 받습니다: 콘텐츠 너비와 콘텐츠 높이 `(contentWidth, contentHeight)`.

이 ScrollView가 렌더링하는 콘텐츠 컨테이너에 연결된 onLayout 핸들러를 사용하여 구현됩니다.

| 타입     |
| -------- |
| function |

---

### `onMomentumScrollBegin`

모멘텀 스크롤이 시작될 때(ScrollView가 미끄러지기 시작할 때 발생하는 스크롤) 호출됩니다.

| 타입     |
| -------- |
| function |

---

### `onMomentumScrollEnd`

모멘텀 스크롤이 종료될 때(ScrollView가 미끄러져 멈출 때 발생하는 스크롤) 호출됩니다.

| 타입     |
| -------- |
| function |

---

### `onScroll`

스크롤 중 프레임당 최대 한 번 발생합니다. 이벤트는 다음과 같은 형태를 가집니다(타입이 지정되지 않은 모든 값은 숫자입니다):

```js
{
  nativeEvent: {
    contentInset: {bottom, left, right, top},
    contentOffset: {x, y},
    contentSize: {height, width},
    layoutMeasurement: {height, width},
    velocity: {x, y},
    responderIgnoreScroll: boolean,
    zoomScale,
    // iOS only
    targetContentOffset: {x, y}
  }
}
```

| 타입     |
| -------- |
| function |

---

### `onScrollBeginDrag`

사용자가 스크롤 뷰를 드래그하기 시작할 때 호출됩니다.

| 타입     |
| -------- |
| function |

---

### `onScrollEndDrag`

사용자가 스크롤 뷰 드래그를 멈추고 정지하거나 미끄러지기 시작할 때 호출됩니다.

| 타입     |
| -------- |
| function |

---

### `onScrollToTop` <div className="label ios">iOS</div>

상태 표시줄을 탭한 후 스크롤 뷰가 맨 위로 스크롤될 때 발생합니다.

| 타입     |
| -------- |
| function |

---

### `overScrollMode` <div className="label android">Android</div>

overScroll 모드의 기본값을 재정의하는 데 사용합니다.

가능한 값:

- `'auto'` - 콘텐츠가 의미 있게 스크롤될 만큼 충분히 큰 경우에만 사용자가 이 뷰를 오버스크롤할 수 있습니다.
- `'always'` - 항상 사용자가 이 뷰를 오버스크롤할 수 있습니다.
- `'never'` - 사용자가 이 뷰를 오버스크롤할 수 없습니다.

| 타입                                  | 기본값   |
| ------------------------------------- | -------- |
| enum(`'auto'`, `'always'`, `'never'`) | `'auto'` |

---

### `pagingEnabled`

`true`일 때, 스크롤 중에 스크롤 뷰 크기의 배수에서 멈춥니다. 수평 페이지 매김에 사용할 수 있습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `persistentScrollbar` <div className="label android">Android</div>

스크롤바가 사용되지 않을 때 투명해지지 않도록 합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `pinchGestureEnabled` <div className="label ios">iOS</div>

`true`일 때, ScrollView에서 핀치 제스처로 확대/축소할 수 있습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `refreshControl`

ScrollView에 당겨서 새로 고침 기능을 제공하는 데 사용되는 RefreshControl 컴포넌트입니다. 수직 ScrollView에서만 작동합니다(`horizontal` prop이 `false`여야 합니다).

[RefreshControl](refreshcontrol)을 참고하세요.

| 타입    |
| ------- |
| element |

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

### `scrollEnabled`

`false`이면, 터치 상호작용으로 뷰를 스크롤할 수 없습니다.

`scrollTo`를 호출하면 뷰를 항상 스크롤할 수 있습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `scrollEventThrottle`

스크롤 중 스크롤 이벤트가 발생하는 빈도를 제한하며, ms 단위의 시간 간격으로 지정합니다. 스크롤에 대한 응답으로 비용이 많이 드는 작업을 수행할 때 유용할 수 있습니다. `16` 이하의 값은 기기의 주사율에 관계없이 스로틀링을 비활성화합니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `0`     |

---

### `scrollIndicatorInsets` <div className="label ios">iOS</div>

스크롤 뷰 인디케이터가 스크롤 뷰 가장자리로부터 inset되는 양입니다. 일반적으로 `contentInset`과 동일한 값으로 설정해야 합니다.

| 타입                                                                 | 기본값                                   |
| -------------------------------------------------------------------- | ---------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` | `{top: 0, left: 0, bottom: 0, right: 0}` |

---

### `scrollPerfTag` <div className="label android">Android</div>

이 스크롤 뷰의 스크롤 성능을 로그에 기록하는 데 사용되는 태그입니다. 모멘텀 이벤트가 강제로 켜집니다(sendMomentumEvents 참조). 기본적으로는 아무것도 하지 않으며 유용하게 사용하려면 커스텀 네이티브 FpsListener를 구현해야 합니다.

| 타입   |
| ------ |
| string |

---

### `scrollsChildToFocus` <div className="label android">Android</div>

`true`일 때, ScrollView는 포커스된 자식이 보이도록 자동으로 스크롤합니다. 이 동작을 비활성화하고 포커스 변경 시 스크롤 위치를 수동으로 제어하려면 `false`로 설정하세요.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `scrollToOverflowEnabled` <div className="label ios">iOS</div>

`true`일 때, 스크롤 뷰를 콘텐츠 크기를 초과하여 프로그래밍 방식으로 스크롤할 수 있습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `scrollsToTop` <div className="label ios">iOS</div>

`true`일 때, 상태 표시줄을 탭하면 스크롤 뷰가 맨 위로 스크롤됩니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `showsHorizontalScrollIndicator`

`true`일 때, 수평 스크롤 인디케이터를 표시합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `showsVerticalScrollIndicator`

`true`일 때, 수직 스크롤 인디케이터를 표시합니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `snapToAlignment`

`snapToInterval`이 설정된 경우, `snapToAlignment`는 스냅과 스크롤 뷰의 관계를 정의합니다.

가능한 값:

- `'start'`는 왼쪽(수평) 또는 상단(수직)에 스냅을 정렬합니다.
- `'center'`는 가운데에 스냅을 정렬합니다.
- `'end'`는 오른쪽(수평) 또는 하단(수직)에 스냅을 정렬합니다.

| 타입                                 | 기본값    |
| ------------------------------------ | --------- |
| enum(`'start'`, `'center'`, `'end'`) | `'start'` |

---

### `snapToEnd`

`snapToOffsets`와 함께 사용합니다. 기본적으로 목록의 끝은 스냅 오프셋으로 계산됩니다. `snapToEnd`를 `false`로 설정하면 이 동작을 비활성화하고 목록이 끝과 마지막 `snapToOffsets` 오프셋 사이에서 자유롭게 스크롤되도록 할 수 있습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `snapToInterval`

설정하면, 스크롤 뷰가 `snapToInterval` 값의 배수에서 멈춥니다. 스크롤 뷰보다 작은 길이를 가진 자식들을 페이지 방식으로 탐색하는 데 사용할 수 있습니다. 일반적으로 `snapToAlignment` 및 `decelerationRate="fast"`와 함께 사용합니다. 덜 구성 가능한 `pagingEnabled` prop을 재정의합니다.

| 타입   |
| ------ |
| number |

---

### `snapToOffsets`

설정하면, 스크롤 뷰가 정의된 오프셋에서 멈춥니다. 스크롤 뷰보다 작은 다양한 크기의 자식들을 페이지 방식으로 탐색하는 데 사용할 수 있습니다. 일반적으로 `decelerationRate="fast"`와 함께 사용합니다. 덜 구성 가능한 `pagingEnabled` 및 `snapToInterval` props를 재정의합니다.

| 타입            |
| --------------- |
| array of number |

---

### `snapToStart`

`snapToOffsets`와 함께 사용합니다. 기본적으로 목록의 시작은 스냅 오프셋으로 계산됩니다. `snapToStart`를 `false`로 설정하면 이 동작을 비활성화하고 목록이 시작과 첫 번째 `snapToOffsets` 오프셋 사이에서 자유롭게 스크롤되도록 할 수 있습니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `true`  |

---

### `stickyHeaderHiddenOnScroll`

`true`로 설정하면, 목록을 아래로 스크롤할 때 고정 헤더가 숨겨지고 위로 스크롤할 때 목록 상단에 도킹됩니다.

| 타입 | 기본값 |
| ---- | ------- |
| bool | `false` |

---

### `stickyHeaderIndices`

스크롤 시 화면 상단에 도킹될 자식을 결정하는 자식 인덱스의 배열입니다. 예를 들어 `stickyHeaderIndices={[0]}`을 전달하면 첫 번째 자식이 스크롤 뷰 상단에 고정됩니다. [x,y,z]처럼 사용하여 여러 항목이 상단에 있을 때 고정되게 할 수도 있습니다. 이 속성은 `horizontal={true}`와 함께 지원되지 않습니다.

| 타입            |
| --------------- |
| array of number |

---

### `zoomScale` <div className="label ios">iOS</div>

스크롤 뷰 콘텐츠의 현재 배율입니다.

| 타입   | 기본값 |
| ------ | ------- |
| number | `1.0`   |

---

## 메서드

### `flashScrollIndicators()`

```tsx
flashScrollIndicators();
```

스크롤 인디케이터를 잠깐 표시합니다.

---

### `scrollTo()`

```tsx
scrollTo(
  options?: {x?: number, y?: number, animated?: boolean} | number,
  deprecatedX?: number,
  deprecatedAnimated?: boolean,
);
```

주어진 x, y 오프셋으로 즉시 또는 부드러운 애니메이션으로 스크롤합니다.

**예시:**

`scrollTo({x: 0, y: 0, animated: true})`

:::note
이 함수의 특이한 서명은 역사적인 이유로 options 객체 대신 별도의 인수도 허용하기 때문입니다. 이는 모호함(x 앞에 y) 때문에 deprecated(더 이상 권장되지 않음)이며 사용하지 않아야 합니다.
:::

---

### `scrollToEnd()`

```tsx
scrollToEnd(options?: {animated?: boolean});
```

수직 ScrollView이면 맨 아래로, 수평 ScrollView이면 맨 오른쪽으로 스크롤합니다.

부드러운 애니메이션 스크롤은 `scrollToEnd({animated: true})`, 즉시 스크롤은 `scrollToEnd({animated: false})`를 사용하세요. 옵션이 전달되지 않으면 `animated`의 기본값은 `true`입니다.
