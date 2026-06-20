---
id: fast-refresh
title: Fast Refresh
---

Fast Refresh는 React 컴포넌트의 변경 사항에 대해 거의 즉각적인 피드백을 받을 수 있게 해주는 React Native 기능입니다. Fast Refresh는 기본값으로 활성화되어 있으며, [React Native 개발자 메뉴](/docs/debugging)에서 "Enable Fast Refresh"를 토글할 수 있습니다. Fast Refresh가 활성화된 상태에서 대부분의 편집은 1~2초 내에 반영됩니다.

## 작동 방식

- **React 컴포넌트만 내보내는** 모듈을 편집하면, Fast Refresh는 해당 모듈의 코드만 업데이트하고 컴포넌트를 다시 렌더링합니다. 스타일, 렌더링 로직, 이벤트 핸들러, effects 등 해당 파일의 모든 것을 편집할 수 있습니다.
- React 컴포넌트가 _아닌_ 내보내기가 포함된 모듈을 편집하면, Fast Refresh는 해당 모듈과 이를 가져오는 다른 모듈을 모두 다시 실행합니다. 예를 들어 `Button.js`와 `Modal.js`가 모두 `Theme.js`를 가져오는 경우, `Theme.js`를 편집하면 두 컴포넌트가 모두 업데이트됩니다.
- 마지막으로, **React 트리 외부의 모듈이 가져오는 파일을 편집**하면, Fast Refresh는 **전체 리로드로 폴백합니다**. React 컴포넌트를 렌더링하지만 **React 컴포넌트가 아닌** 모듈이 가져오는 값도 내보내는 파일이 있을 수 있습니다. 예를 들어, 컴포넌트가 상수를 내보내고 React가 아닌 유틸리티 모듈이 이를 가져오는 경우가 있습니다. 이 경우 상수를 별도 파일로 분리하고 두 파일 모두에서 가져오는 것을 고려하세요. 이렇게 하면 Fast Refresh가 다시 작동할 것입니다. 다른 경우도 대체로 비슷한 방식으로 해결할 수 있습니다.

## 오류 복원력

Fast Refresh 세션 중에 **문법 오류**가 발생하면 오류를 수정하고 파일을 다시 저장하면 됩니다. redbox가 사라집니다. 문법 오류가 있는 모듈은 실행이 방지되므로 앱을 리로드할 필요가 없습니다.

**모듈 초기화 중 런타임 오류**가 발생하면(예: `StyleSheet.create` 대신 `Style.create`를 입력하는 경우), 오류를 수정하면 Fast Refresh 세션이 계속됩니다. redbox가 사라지고 모듈이 업데이트됩니다.

**컴포넌트 내부에서 런타임 오류**가 발생하는 실수를 하면, 오류를 수정한 후 Fast Refresh 세션이 _역시_ 계속됩니다. 이 경우 React는 업데이트된 코드를 사용하여 애플리케이션을 다시 마운트합니다.

앱에 [error boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)가 있다면(프로덕션에서의 우아한 실패를 위해 좋은 방법입니다), redbox 다음 편집 시 렌더링을 다시 시도합니다. 이런 의미에서 error boundary가 있으면 항상 루트 앱 화면으로 돌아가는 것을 방지할 수 있습니다. 하지만 error boundary가 _너무_ 세분화되어서는 안 됩니다. error boundary는 프로덕션에서 React가 사용하며, 항상 의도적으로 설계되어야 합니다.

## 제한 사항

Fast Refresh는 편집 중인 컴포넌트의 로컬 React state를 보존하려고 시도하지만, 안전한 경우에만 그렇게 합니다. 파일을 편집할 때마다 로컬 state가 초기화되는 몇 가지 이유가 있습니다.

- 클래스 컴포넌트는 로컬 state가 보존되지 않습니다(함수 컴포넌트와 Hooks만 state를 보존합니다).
- 편집 중인 모듈에 React 컴포넌트 외에 _다른_ 내보내기가 있을 수 있습니다.
- 때때로 모듈이 `createNavigationContainer(MyScreen)`처럼 고차 컴포넌트 호출의 결과를 내보내는 경우가 있습니다. 반환된 컴포넌트가 클래스인 경우 state가 초기화됩니다.

장기적으로 코드베이스가 함수 컴포넌트와 Hooks로 더 많이 이동함에 따라 더 많은 경우에 state가 보존될 것으로 기대할 수 있습니다.

## 팁

- Fast Refresh는 기본값으로 함수 컴포넌트(및 Hooks)의 React 로컬 state를 보존합니다.
- 때로는 state를 강제로 초기화하고 컴포넌트를 다시 마운트하고 싶을 수 있습니다. 예를 들어, 마운트 시에만 발생하는 애니메이션을 조정하는 경우 유용할 수 있습니다. 이를 위해 편집 중인 파일의 어디에든 `// @refresh reset`을 추가할 수 있습니다. 이 지시어는 해당 파일에만 적용되며, 매 편집마다 해당 파일에 정의된 컴포넌트를 다시 마운트하도록 Fast Refresh에 지시합니다.

## Fast Refresh와 Hooks

가능한 경우, Fast Refresh는 편집 사이에 컴포넌트의 state를 보존하려고 시도합니다. 특히 `useState`와 `useRef`는 인수나 Hook 호출 순서를 변경하지 않는 한 이전 값을 유지합니다.

`useEffect`, `useMemo`, `useCallback`과 같은 의존성이 있는 Hooks는 Fast Refresh 중에 _항상_ 업데이트됩니다. Fast Refresh가 진행되는 동안 의존성 목록은 무시됩니다.

예를 들어, `useMemo(() => x * 2, [x])`를 `useMemo(() => x * 10, [x])`로 편집하면, `x`(의존성)가 변경되지 않았더라도 다시 실행됩니다. React가 그렇게 하지 않으면 편집 내용이 화면에 반영되지 않을 것입니다!

때로는 이로 인해 예상치 못한 결과가 발생할 수 있습니다. 예를 들어, 빈 의존성 배열을 가진 `useEffect`도 Fast Refresh 중에 한 번 다시 실행됩니다. 하지만 Fast Refresh 없이도 `useEffect`가 가끔 다시 실행되는 것에 견고한 코드를 작성하는 것은 좋은 습관입니다. 이렇게 하면 나중에 새 의존성을 추가하기가 더 쉬워집니다.
