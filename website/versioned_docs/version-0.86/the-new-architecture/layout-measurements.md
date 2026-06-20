# 레이아웃 측정

때로는 전체 레이아웃에 변경 사항을 적용하거나 결정을 내리고 특정 로직을 호출하기 위해 현재 레이아웃을 측정해야 할 때가 있습니다.

React Native는 뷰의 측정값을 알기 위한 몇 가지 네이티브 메서드를 제공합니다.

이러한 메서드를 호출하는 가장 좋은 방법은 `useLayoutEffect` 훅에서 사용하는 것입니다. 이렇게 하면 측정의 가장 최신 값을 얻을 수 있고, 측정값이 계산되는 동일한 프레임에서 변경 사항을 적용할 수 있습니다.

일반적인 코드는 다음과 같습니다:

```tsx
function AComponent(children) {
  const targetRef = useRef(null)

  useLayoutEffect(() => {
    targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
      //do something with the measurements
    });
  }, [ /* add dependencies here */]);

  return (
    <View ref={targetRef}>
     {children}
    <View />
  );
}
```

:::note
여기서 설명하는 메서드들은 React Native가 제공하는 대부분의 기본 컴포넌트에서 사용할 수 있습니다. 그러나 네이티브 뷰가 직접적으로 지원하지 않는 복합 컴포넌트에서는 사용할 수 _없습니다_. 이는 일반적으로 앱에서 직접 정의하는 대부분의 컴포넌트를 포함합니다.
:::

## measure(callback)

뷰포트에서 주어진 뷰의 화면상 위치(`x` 및 `y`), `width`, `height`를 결정합니다. 비동기 콜백을 통해 값을 반환합니다. 성공하면 콜백이 다음 인수와 함께 호출됩니다:

- `x`: 뷰포트에서 측정된 뷰의 원점(왼쪽 상단 모서리)의 `x` 좌표.
- `y`: 뷰포트에서 측정된 뷰의 원점(왼쪽 상단 모서리)의 `y` 좌표.
- `width`: 뷰의 `width`.
- `height`: 뷰의 `height`.
- `pageX`: 뷰포트(일반적으로 전체 화면)에서 뷰의 `x` 좌표.
- `pageY`: 뷰포트(일반적으로 전체 화면)에서 뷰의 `y` 좌표.

또한 `measure()`가 반환하는 `width`와 `height`는 뷰포트에서 컴포넌트의 `width`와 `height`입니다.

## measureInWindow(callback)

현재 윈도우에서 주어진 뷰의 위치(`x` 및 `y`)를 결정하고 비동기 콜백을 통해 값을 반환합니다. React 루트 뷰가 다른 네이티브 뷰에 임베딩된 경우 절대 좌표를 반환합니다. 성공하면 콜백이 다음 인수와 함께 호출됩니다:

- `x`: 현재 윈도우에서 뷰의 `x` 좌표.
- `y`: 현재 윈도우에서 뷰의 `y` 좌표.
- `width`: 뷰의 `width`.
- `height`: 뷰의 `height`.
