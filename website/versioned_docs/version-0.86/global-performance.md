---
id: global-performance
title: performance
---

웹 명세에 정의된 전역 [`performance`](https://developer.mozilla.org/en-US/docs/Web/API/Window/performance) 객체입니다.

---

# Reference

## 인스턴스 프로퍼티

### `eventCounts`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/eventCounts)를 참조하세요.

### `memory`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory)를 참조하세요.

### `rnStartupTiming` ⚠️

:::warning Non-standard
이것은 React Native 전용 확장입니다.
:::

애플리케이션의 시작 시간에 관한 정보를 제공합니다.

```ts
get rnStartupTiming(): ReactNativeStartupTiming;
```

`ReactNativeStartupTiming` 인터페이스는 다음 필드를 제공합니다.

| Name                                     | Type           | Description                                               |
| ---------------------------------------- | -------------- | --------------------------------------------------------- |
| `startTime`                              | number \| void | React Native 런타임 초기화가 시작된 시각입니다. |
| `executeJavaScriptBundleEntryPointStart` | number \| void | 애플리케이션 번들 실행이 시작된 시각입니다. |
| `endTime`                                | number \| void | React Native 런타임 초기화가 완전히 완료된 시각입니다. |

### `timeOrigin`

:::warning Partial support
앱 시작 시점으로부터의 밀리초 대신, UNIX 에포크부터 시스템 부팅 시점까지의 밀리초를 제공합니다.
:::

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin)를 참조하세요.

## 인스턴스 메서드

### `clearMarks()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMarks)를 참조하세요.

### `clearMeasures()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMeasures)를 참조하세요.

### `getEntries()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries)를 참조하세요.

### `getEntriesByName()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByName)를 참조하세요.

### `getEntriesByType()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)를 참조하세요.

### `mark()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark)를 참조하세요.

### `measure()`

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure)를 참조하세요.

### `now()`

:::warning Partial support
앱 시작 시점으로부터의 밀리초 대신, 시스템 부팅 시점으로부터의 밀리초를 제공합니다.
:::

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)를 참조하세요.
