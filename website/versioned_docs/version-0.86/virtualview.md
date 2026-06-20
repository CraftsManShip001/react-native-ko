---
id: virtualview
title: VirtualView 🧪
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

<ExperimentalAPIWarning />

`VirtualView`는 [`View`](view)와 유사하게 동작하는 핵심 컴포넌트입니다.

[`ScrollView`](scrollview)의 하위 컴포넌트일 때, 스크롤 뷰포트에 의해 가려질 경우 메모리 사용을 줄이기 위한 추가적인 가상화 기능을 갖습니다.

```tsx
<ScrollView>
  <VirtualView>
    <Text>Hello world!</Text>
  </VirtualView>
</ScrollView>
```

상위 [`ScrollView`](scrollview)가 없는 `VirtualView`는 가상화 기능을 갖지 않습니다.

## 가상화

`VirtualView`가 [`ScrollView`](scrollview)의 가시 영역을 벗어나면 숨겨집니다. 숨겨진 상태에서 `VirtualView`는 가장 최근 레이아웃을 캐시하고 자식 컴포넌트들을 언마운트할 수 있으며, 이 과정을 가상화라고 합니다.

`VirtualView`가 [`ScrollView`](scrollview)의 가시 영역으로 돌아오면 다시 보입니다. 보이는 상태에서는 자식 컴포넌트들이 _반드시_ 렌더링됩니다. 이 보장은 자식 컴포넌트들이 렌더링될 때까지 `VirtualView`를 드러낼 다음 프레임의 렌더링을 메인 스레드에서 차단함으로써 유지됩니다.

<img src="/docs/assets/d_virtualview_modes.svg" width="700" alt="VirtualView 모드 및 임계값 다이어그램." />

:::note
향후 개발에서, 숨겨진 `VirtualView`는 메모리 오버헤드를 균형 있게 유지하면서 가능한 한 오랫동안 state를 보존하기 위해 [`<Activity mode="hidden">`](https://react.dev/reference/react/Activity)에서 자식 컴포넌트들을 렌더링할 수 있습니다.
:::

### 메인 스레드 차단

이는 React Native의 기능 세트에서 React 컴포넌트를 렌더링하는 것이 메인 스레드를 차단할 수 있는 최초의 경우입니다. 이는 [새로운 아키텍처](/architecture/landing-page)에 의해 가능해진 새로운 기능입니다!

메인 스레드를 차단하면 [`FlatList`](flatlist)와 같은 컴포넌트를 사용할 때 때때로 발생하는 빈 프레임의 깜빡임을 방지하여 더 나은 사용자 경험을 제공할 수 있습니다. 또한 메인 스레드 우선순위를 사용하여 더 나은 성능을 가능하게 할 수 있으며, 이는 일반적으로 더 높은 성능의 코어에서도 실행됩니다.

그러나 메인 스레드를 차단하는 것은 트레이드오프도 수반합니다. `VirtualView`의 자식 컴포넌트들을 마운트하는 것과 같은 업데이트 작업이 완료되는 데 너무 오래 걸리면 이제 프레임이 드롭될 수 있습니다. 두세 개 이상의 프레임이 드롭되면 앱이 느리고 반응하지 않는 느낌을 주어 사용자 경험이 저하될 수 있습니다. 너무 많은 프레임이 드롭되면 운영 체제가 앱이 응답하지 않는다는 모달을 표시하거나 앱을 종료할 수도 있습니다!

:::warning
DevTools는 현재 메인 스레드에서 JavaScript 디버깅을 지원하지 않습니다. 이는 메인 스레드에서 실행되는 `onModeChange`에서 호출된 코드를 디버깅하기 위해 중단점을 사용하는 경우 디버거가 멈출 수 있음을 의미합니다.

다른 모든 JavaScript 코드 디버깅은 예상대로 작동해야 합니다. 저희는 `VirtualView`를 React Native의 안정 채널로 출시하기 전에 이 간극을 해소하기 위해 노력하고 있습니다.
:::

### 사전 렌더링

`VirtualView`는 필요하기 전에 더 일찍 렌더링함으로써 드롭된 프레임의 단점을 완화하면서 메인 스레드 렌더링의 이점을 누릴 수 있게 합니다. 이를 "사전 렌더링"이라고 합니다.

기본적으로 각 `VirtualView`는 [`ScrollView`](scrollview)의 가시 영역에 접근할 때 자식 컴포넌트들을 사전 렌더링합니다. 이 경우 자식 컴포넌트들은 낮은 우선순위로 백그라운드 스레드에서 렌더링됩니다([전환](https://react.dev/reference/react/startTransition) 사용). 이를 통해 메인 스레드와 React가 더 높은 우선순위로 다른 중요한 사용자 인터랙션을 처리할 수 있습니다.

:::note
`VirtualView`의 사전 렌더링 로직은 현재 설정이 불가능합니다. 이를 결정하는 알고리즘은 활발히 설계가 반복되고 있으며 향후 릴리스에서 변경될 가능성이 높습니다.
:::

---

## Props

### `children`

이 `VirtualView` 내부에 렌더링할 콘텐츠입니다.

| 타입                     |
| ------------------------ |
| [React Node](react-node) |

---

### `onModeChange`

`VirtualView`가 자식 컴포넌트들을 렌더링하는 방식이 변경될 때 호출됩니다.

콜백이 제공된 경우, 내부 state 변경에 따라 다른 스레드와 우선순위에서 호출될 수 있습니다. 이는 이벤트의 `mode` 속성을 확인하여 감지할 수 있습니다:

- `mode`가 [`VirtualViewMode.Visible`](#virtualviewmode)이면, 콜백은 즉시 우선순위로 메인 스레드에서 호출됩니다.
- `mode`가 [`VirtualViewMode.Prerender`](#virtualviewmode) 또는 [`VirtualViewMode.Hidden`](#virtualviewmode)이면, 콜백은 전환 우선순위로 백그라운드 스레드에서 호출됩니다.

콜백은 동일한 `mode` 값으로 연속적으로 호출되지 않습니다. 그러나 이벤트 순서에 대한 보장은 거의 없습니다. 또한 자식 컴포넌트들이 성공적으로 사전 렌더링된 경우, 보이게 되더라도 [`VirtualViewMode.Visible`](#virtualviewmode)로 콜백이 호출되지 않을 수 있습니다.

| 타입                                               |
| -------------------------------------------------- |
| `md ([ModeChangeEvent](#modechangeevent)) => void` |

---

### `nativeID`

네이티브 클래스에서 이 뷰를 찾기 위한 식별자입니다.

| 타입   |
| ------ |
| string |

---

### `style`

| 타입                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

## 타입 정의

### `ModeChangeEvent`

[`onModeChange`](#onmodechange)에 제공되는 인수입니다.

| 타입   |
| ------ |
| object |

**속성:**

| 이름          | 타입                                | 설명                                                                                       |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| mode          | [VirtualViewMode](#virtualviewmode) | `VirtualView`의 새 모드.                                                                    |
| target        | element                             | 이 이벤트를 발생시키는 `VirtualView`.                                                                |
| targetRect    | [Rect](rect)                        | 가장 가까운 상위 `ScrollView`에 상대적인 `target`의 레이아웃.                                 |
| thresholdRect | [Rect](rect)                        | 이 이벤트를 트리거한 임계값의 레이아웃으로, 가장 가까운 상위 `ScrollView`에 상대적입니다. |

:::note
예를 들어, `VirtualView`가 [`ScrollView`](scrollview)의 가시 영역에 진입하는 경우...

- `mode`는 [`VirtualViewMode.Visible`](#virtualviewmode)이 됩니다.
- `thresholdRect`는 가장 가까운 상위 [`ScrollView`](scrollview)의 가시 뷰포트를 설명합니다.
- `targetRect`는 `thresholdRect`와 겹치는 `target`의 레이아웃입니다(즉, [`ScrollView`](scrollview)의 가시 영역 내에 있습니다).

:::

### `VirtualViewMode`

`VirtualView`의 가능한 모드입니다.

| 이름      | 값    | 설명                                    |
| --------- | ----- | ---------------------------------------------- |
| Visible   | `0`   | 대상 뷰가 보입니다.                        |
| Prerender | `1`   | 대상 뷰가 숨겨져 있지만 사전 렌더링될 수 있습니다. |
| Hidden    | `2`   | 대상 뷰가 숨겨져 있습니다.                         |

---

## 정적 메서드

### `createHiddenVirtualView()`

```tsx
static createHiddenVirtualView(height: number): typeof VirtualView;
```

`VirtualView`는 상위 [`ScrollView`](scrollview)에 의해 처음에 가려지더라도 자식 컴포넌트들을 처음에 보이는 상태로 렌더링합니다. 이는 컴포넌트가 처음 렌더링될 때 상위 [`ScrollView`](scrollview)의 존재는 물론 크기와 스크롤 위치도 알 수 없기 때문입니다.

고급 사용 사례의 경우, `createHiddenVirtualView()`는 제공된 예상 레이아웃으로 처음에 숨겨진 `VirtualView`를 렌더링하는 컴포넌트를 생성합니다.

```tsx
const HiddenVirtualView = createHiddenVirtualView(100);

<ScrollView>
  <HiddenVirtualView>
    <Text>Hello world!</Text>
  </HiddenVirtualView>
</ScrollView>;
```

**파라미터:**

| 이름                                                        | 타입   | 설명                                            |
| ----------------------------------------------------------- | ------ | ------------------------------------------------------ |
| height <div className="label basic required">Required</div> | number | 처음 렌더링되는 `VirtualView`의 예상 높이. |
