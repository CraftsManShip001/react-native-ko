---
id: timers
title: Timers
---

타이머는 애플리케이션의 중요한 구성 요소이며, React Native는 [브라우저 타이머](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals)를 구현합니다.

## Timers

- `setTimeout` 및 `clearTimeout`
- `setInterval` 및 `clearInterval`
- `setImmediate` 및 `clearImmediate`
- `requestAnimationFrame` 및 `cancelAnimationFrame`

`requestAnimationFrame(fn)`은 `setTimeout(fn, 0)`과 동일하지 않습니다. 전자는 모든 프레임이 플러시된 후에 실행되는 반면, 후자는 가능한 한 빠르게 실행됩니다 (iPhone 5S에서 초당 1000회 이상).

`setImmediate`는 현재 JavaScript 실행 블록이 끝날 때, 네이티브로 배치 응답을 보내기 직전에 실행됩니다. `setImmediate` 콜백 안에서 `setImmediate`를 호출하면 중간에 네이티브로 제어권을 반환하지 않고 즉시 실행됩니다.

`Promise` 구현은 비동기 구현으로 `setImmediate`를 사용합니다.

:::note
Android에서 디버깅할 때, 디버거와 기기의 시간이 어긋나 있으면 애니메이션, 이벤트 동작 등이 제대로 작동하지 않거나 결과가 부정확할 수 있습니다.
디버거 머신에서 ``adb shell "date `date +%m%d%H%M%Y.%S%3N`"``를 실행하여 이를 수정하세요. 실제 기기에서 사용하려면 루트 권한이 필요합니다.
:::

## InteractionManager

:::warning Deprecated
`InteractionManager`의 동작은 `setImmediate`와 동일하게 변경되었으므로, 대신 `setImmediate`를 사용하세요.
:::

잘 만들어진 네이티브 앱이 부드럽게 느껴지는 이유 중 하나는 인터랙션과 애니메이션 중에 비용이 많이 드는 작업을 피하기 때문입니다. React Native에는 현재 단일 JS 실행 스레드만 존재한다는 제한이 있지만, `InteractionManager`를 사용하면 오래 걸리는 작업을 모든 인터랙션/애니메이션이 완료된 후에 시작되도록 예약할 수 있습니다.

애플리케이션은 다음과 같이 인터랙션 이후에 실행될 태스크를 예약할 수 있습니다.

```ts
InteractionManager.runAfterInteractions(() => {
  // ...long-running synchronous task...
});
```

다른 스케줄링 대안과 비교하면 다음과 같습니다.

- requestAnimationFrame(): 시간이 지남에 따라 뷰를 애니메이션화하는 코드에 사용합니다.
- setImmediate/setTimeout/setInterval(): 나중에 코드를 실행하지만, 애니메이션이 지연될 수 있습니다.
- runAfterInteractions(): 활성 애니메이션을 지연시키지 않고 나중에 코드를 실행합니다.

터치 처리 시스템은 하나 이상의 활성 터치를 '인터랙션'으로 간주하며, 모든 터치가 종료되거나 취소될 때까지 `runAfterInteractions()` 콜백을 지연시킵니다.

`InteractionManager`는 또한 애니메이션 시작 시 인터랙션 '핸들'을 생성하고, 완료 시 이를 해제하는 방식으로 애플리케이션이 애니메이션을 등록할 수 있도록 합니다.

```ts
const handle = InteractionManager.createInteractionHandle();
// run animation... (`runAfterInteractions` tasks are queued)
// later, on animation completion:
InteractionManager.clearInteractionHandle(handle);
// queued tasks run if all handles were cleared
```
