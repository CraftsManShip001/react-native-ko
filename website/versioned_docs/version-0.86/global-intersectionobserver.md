---
id: global-intersectionobserver
title: IntersectionObserver 🧪
---

import CanaryAPIWarning from './\_canary-channel-api-warning.mdx';

<CanaryAPIWarning />

웹 사양에 정의된 전역 [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) 인터페이스입니다. 대상 엘리먼트와 상위 엘리먼트 또는 최상위 문서의 뷰포트 간 교차 변화를 비동기적으로 관찰하는 방법을 제공합니다.

---

# 참고

## 생성자

### `IntersectionObserver()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)를 참고하세요.

대상 엘리먼트의 가시성이 하나 이상의 `threshold` 또는 `rnRootThreshold` 값을 넘을 때 지정된 콜백 함수를 실행하는 새 `IntersectionObserver` 객체를 생성합니다.

```ts
new IntersectionObserver(callback, options?)
```

#### 파라미터

**`callback`**

대상 엘리먼트의 가시 비율이 임계값을 넘을 때 호출되는 함수입니다. 콜백은 두 개의 파라미터를 받습니다:

- `entries`: [`IntersectionObserverEntry`](global-intersectionobserverentry) 객체의 배열로, 각각 해당 임계값에서 지정한 비율보다 더 많이 또는 더 적게 보이게 된 교차 변화를 나타냅니다.
- `observer`: 콜백을 호출한 `IntersectionObserver` 인스턴스입니다.

**`options`** (선택)

다음 속성을 가진 선택적 객체입니다:

| Name                 | Type                             | Description                                                                                                                                                                                                       |
| -------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `root`               | [Element](element-nodes) \| null | 대상의 상위 엘리먼트로, 이 엘리먼트의 바운딩 사각형이 뷰포트로 간주됩니다. 지정하지 않거나 `null`인 경우 루트 뷰포트가 기본값으로 사용됩니다.                                              |
| `rootMargin`         | string                           | 교차를 계산할 때 루트의 바운딩 박스에 추가할 오프셋 집합을 지정하는 문자열입니다. 기본값은 `"0px 0px 0px 0px"`입니다.                                                                      |
| `threshold`          | number \| number[]               | 관찰 대상의 교차 영역 대 전체 바운딩 박스 영역의 비율을 지정하는 단일 숫자 또는 0.0~1.0 사이의 숫자 배열입니다. `rnRootThreshold`가 설정되지 않은 경우 기본값은 `[0]`입니다. |
| `rnRootThreshold` ⚠️ | number \| number[]               | **React Native 전용.** 교차 영역 대 전체 루트 영역의 비율을 지정하는 단일 숫자 또는 0.0~1.0 사이의 숫자 배열입니다.                                                                     |

## 인스턴스 속성

### `root`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root)를 참고하세요.

교차를 테스트할 때 바운딩 박스로 사용되는 엘리먼트 또는 문서입니다.

### `rootMargin`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin)를 참고하세요.

교차를 계산할 때 루트의 바운딩 박스에 적용되는 오프셋 사각형입니다.

### `rnRootThresholds` ⚠️

:::warning Non-standard
이것은 React Native 전용 확장입니다.
:::

지정된 루트 뷰의 교차 영역 대 바운딩 박스 영역(기본값은 뷰포트)의 비율로 나타낸 루트 임계값 목록으로, 오름차순으로 정렬됩니다.

대상에 대한 알림은 `rnRootThresholds` 또는 `thresholds`에 지정된 임계값 중 하나라도 해당 대상에서 교차할 때 생성됩니다.

```ts
get rnRootThresholds(): ReadonlyArray<number> | null;
```

### `thresholds`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds)를 참고하세요.

관찰 대상의 교차 영역 대 바운딩 박스 영역의 비율로 나타낸 임계값 목록으로, 오름차순으로 정렬됩니다.

대상에 대한 알림은 `rnRootThresholds` 또는 `thresholds`에 지정된 임계값 중 하나라도 해당 대상에서 교차할 때 생성됩니다.

## 인스턴스 메서드

### `disconnect()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect)를 참고하세요.

`IntersectionObserver` 객체가 모든 대상 관찰을 중단합니다.

### `observe()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe)를 참고하세요.

`IntersectionObserver`가 대상 엘리먼트 관찰을 시작하도록 지시합니다.

### `takeRecords()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/takeRecords)를 참고하세요.

관찰 중인 모든 대상에 대한 `IntersectionObserverEntry` 객체의 배열을 반환합니다.

### `unobserve()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve)를 참고하세요.

`IntersectionObserver`가 특정 대상 엘리먼트 관찰을 중단하도록 지시합니다.
