---
id: global-PerformanceObserver
title: PerformanceObserver
---

웹 명세에 정의된 전역 [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) 클래스입니다.

## 예시

```ts
const observer = new PerformanceObserver(
  (list, observer, options) => {
    for (const entry of list.getEntries()) {
      console.log(
        'Received entry with type',
        entry.entryType,
        'and name',
        entry.name,
        'that started at',
        entry.startTime,
        'and took',
        entry.duration,
        'ms',
      );
    }
  },
);

observer.observe({entryTypes: ['mark', 'measure']});
```

---

# 레퍼런스

## 생성자

### `PerformanceObserver()`

[MDN의 문서](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/PerformanceObserver)를 참조하세요.

## 정적 프로퍼티

### `supportedEntryTypes`

[MDN의 문서](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/supportedEntryTypes)를 참조하세요.

`['mark', 'measure', 'event', 'longtask', 'resource']`를 반환합니다.

## 인스턴스 메서드

### `observe()`

[MDN의 문서](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/observe)를 참조하세요.

### `disconnect()`

[MDN의 문서](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/disconnect)를 참조하세요.
