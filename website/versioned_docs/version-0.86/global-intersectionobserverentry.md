---
id: global-intersectionobserverentry
title: IntersectionObserverEntry 🧪
---

import CanaryAPIWarning from './\_canary-channel-api-warning.mdx';

<CanaryAPIWarning />

웹 명세에 정의된 [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) 인터페이스입니다. 특정 전환 시점에서 대상 요소와 루트 컨테이너 간의 교차 상태를 설명합니다.

`IntersectionObserverEntry`의 인스턴스는 [`IntersectionObserver`](global-intersectionobserver) 콜백의 `entries` 파라미터로 전달됩니다.

---

# Reference

## 인스턴스 프로퍼티

### `boundingClientRect`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/boundingClientRect)를 참조하세요.

대상 요소의 경계 사각형을 `DOMRectReadOnly`로 반환합니다.

### `intersectionRatio`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRatio)를 참조하세요.

`boundingClientRect`에 대한 `intersectionRect`의 비율을 반환합니다.

### `intersectionRect`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/intersectionRect)를 참조하세요.

대상의 가시 영역을 나타내는 `DOMRectReadOnly`를 반환합니다.

### `isIntersecting`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/isIntersecting)를 참조하세요.

대상 요소가 intersection observer의 루트와 교차하는 경우 `true`인 불리언 값입니다. `true`이면 `IntersectionObserverEntry`는 교차 상태로의 전환을 설명하고, `false`이면 교차 상태에서 비교차 상태로의 전환임을 나타냅니다.

### `rnRootIntersectionRatio` ⚠️

:::warning Non-standard
이것은 React Native 전용 확장입니다.
:::

`rootBounds`에 대한 `intersectionRect`의 비율을 반환합니다.

```ts
get rnRootIntersectionRatio(): number;
```

이는 `intersectionRatio`와 유사하지만, 대상의 경계 박스가 아닌 루트의 경계 박스를 기준으로 계산됩니다. `rnRootThreshold` 옵션에 대응하며, 대상 요소가 루트 영역의 몇 퍼센트를 차지하는지 확인할 수 있습니다.

### `rootBounds`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/rootBounds)를 참조하세요.

intersection observer의 루트에 대한 `DOMRectReadOnly`를 반환합니다.

### `target`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/target)를 참조하세요.

루트와의 교차 상태가 변경된 `Element`입니다.

### `time`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/time)를 참조하세요.

`IntersectionObserver`의 시간 기점을 기준으로 교차가 기록된 시각을 나타내는 `DOMHighResTimeStamp`입니다.
