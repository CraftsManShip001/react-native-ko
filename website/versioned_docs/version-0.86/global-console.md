---
id: global-console
title: console
---

:::warning
🚧 이 페이지는 작업 중입니다. 자세한 내용은 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/console)를 참고하세요.
:::

웹 사양에 정의된 전역 `console` 객체입니다.

---

## 메서드

### `timeStamp()`

```tsx
console.timeStamp(
  label: string,
  start?: string | number,
  end?: string | number,
  trackName?: string,
  trackGroup?: string,
  color?: DevToolsColor
): void;
```

`console.timeStamp` API를 사용하면 Performance 패널 타임라인에 사용자 지정 타이밍 항목을 추가할 수 있습니다.

**파라미터:**

| Name       | Type               | Required | Description                                                                                                                                                                                                                                                                                                   |
| ---------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label      | `string`           | Yes      | 타이밍 항목의 레이블입니다.                                                                                                                                                                                                                                                                               |
| start      | `string \| number` | No       | <ul><li>문자열인 경우, `console.timeStamp`로 이전에 기록된 타임스탬프의 이름입니다.</li><li>숫자인 경우, [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)입니다. 예를 들어, `performance.now()`의 반환값입니다.</li><li>undefined인 경우, 현재 시간이 사용됩니다.</li></ul> |
| end        | `string \| number` | No       | <ul><li>문자열인 경우, `console.timeStamp`로 이전에 기록된 타임스탬프의 이름입니다.</li><li>숫자인 경우, [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)입니다. 예를 들어, `performance.now()`의 반환값입니다.</li><li>undefined인 경우, 현재 시간이 사용됩니다.</li></ul> |
| trackName  | `string`           | No       | 사용자 지정 트랙의 이름입니다.                                                                                                                                                                                                                                                                                 |
| trackGroup | `string`           | No       | 트랙 그룹의 이름입니다.                                                                                                                                                                                                                                                                                  |
| color      | `DevToolsColor`    | No       | 항목의 색상입니다.                                                                                                                                                                                                                                                                                       |

```tsx
type DevToolsColor =
  | 'primary'
  | 'primary-light'
  | 'primary-dark'
  | 'secondary'
  | 'secondary-light'
  | 'secondary-dark'
  | 'tertiary'
  | 'tertiary-light'
  | 'tertiary-dark'
  | 'warning'
  | 'error';
```
