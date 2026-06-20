---
id: testing-overview
title: 테스팅
author: Vojtech Novak
authorURL: 'https://twitter.com/vonovak'
description: 이 가이드는 React Native 개발자에게 테스팅의 핵심 개념, 좋은 테스트 작성 방법, 그리고 워크플로우에 통합할 수 있는 테스트 유형을 소개합니다.
---

코드베이스가 확장될수록, 예상치 못한 작은 오류와 엣지 케이스가 더 큰 장애로 이어질 수 있습니다. 버그는 나쁜 사용자 경험으로 이어지고 궁극적으로 비즈니스 손실을 초래합니다. 취약한 프로그래밍을 방지하는 한 가지 방법은 코드를 배포하기 전에 테스트하는 것입니다.

이 가이드에서는 정적 분석부터 엔드투엔드 테스트까지, 앱이 예상대로 동작하는지 확인하는 다양한 자동화 방법을 다룹니다.

<img src="/docs/assets/diagram_testing.svg" alt="테스팅은 수정, 테스트, 그리고 릴리스로 통과하거나 다시 테스트로 되돌아가는 사이클입니다." />

## 왜 테스트를 해야 하나요

우리는 인간이고, 인간은 실수를 합니다. 테스팅은 이러한 실수를 발견하고 코드가 올바르게 동작하는지 검증하는 데 도움이 되기 때문에 중요합니다. 더욱 중요한 것은, 테스팅을 통해 새로운 기능을 추가하거나, 기존 기능을 리팩터링하거나, 프로젝트의 주요 의존성을 업그레이드할 때에도 코드가 계속 작동함을 보장할 수 있다는 점입니다.

테스팅에는 당신이 생각하는 것보다 더 많은 가치가 있습니다. 코드의 버그를 수정하는 가장 좋은 방법 중 하나는 버그를 노출하는 실패하는 테스트를 작성하는 것입니다. 그런 다음 버그를 수정하고 테스트를 다시 실행했을 때 통과하면, 버그가 수정되어 코드베이스에 다시 도입되지 않는다는 것을 의미합니다.

테스트는 팀에 합류하는 신규 인원을 위한 문서 역할도 할 수 있습니다. 코드베이스를 한 번도 본 적 없는 사람들에게는 테스트를 읽는 것이 기존 코드가 어떻게 동작하는지 이해하는 데 도움이 됩니다.

마지막으로, 자동화된 테스팅이 많을수록 수동 <abbr title="Quality Assurance">QA</abbr>에 소요되는 시간이 줄어들어 귀중한 시간을 확보할 수 있습니다.

## 정적 분석

코드 품질을 향상시키는 첫 번째 단계는 정적 분석 도구를 사용하기 시작하는 것입니다. 정적 분석은 코드를 작성하는 동안 오류를 검사하지만, 해당 코드를 실행하지는 않습니다.

- **린터(Linters)**는 코드를 분석하여 사용되지 않는 코드와 같은 일반적인 오류를 잡아내고, 설정에 따라 공백 대신 탭을 사용하는 것과 같은 스타일 가이드 위반을 표시하여 함정을 피하는 데 도움을 줍니다.
- **타입 체크**는 함수에 전달하는 구조가 함수가 받도록 설계된 것과 일치하는지 확인하여, 예를 들어 숫자를 기대하는 카운팅 함수에 문자열을 전달하는 것을 방지합니다.

React Native에는 기본적으로 두 가지 도구가 설정되어 있습니다: 린팅을 위한 [ESLint](https://eslint.org/)와 타입 체크를 위한 [TypeScript](typescript)입니다.

## 테스트 가능한 코드 작성하기

테스트를 시작하려면 먼저 테스트 가능한 코드를 작성해야 합니다. 항공기 제조 공정을 생각해보세요. 복잡한 시스템들이 모두 잘 작동하는지 보여주기 위해 어떤 모델이 처음 이륙하기 전에, 개별 부품들이 안전하고 올바르게 기능하는지 보장하기 위해 테스트됩니다. 예를 들어, 날개는 극한 하중 하에서 구부려서 테스트하고, 엔진 부품은 내구성을 테스트하며, 앞유리는 조류 충돌 시뮬레이션에 대해 테스트합니다.

소프트웨어도 마찬가지입니다. 전체 프로그램을 많은 코드 줄로 이루어진 하나의 거대한 파일에 작성하는 대신, 조합된 전체를 테스트할 때보다 더 철저하게 테스트할 수 있는 여러 작은 모듈로 코드를 작성합니다. 이런 방식으로, 테스트 가능한 코드를 작성하는 것은 깔끔하고 모듈화된 코드를 작성하는 것과 맞닿아 있습니다.

앱을 더 테스트 가능하게 만들려면, Redux, MobX 또는 다른 솔루션을 사용하는지에 관계없이 앱의 뷰 부분인 React 컴포넌트를 비즈니스 로직 및 앱 state와 분리하는 것부터 시작하세요. 이 방식으로 React 컴포넌트에 의존해서는 안 되는 비즈니스 로직 테스팅을 컴포넌트 자체와 독립적으로 유지할 수 있으며, 컴포넌트의 역할은 주로 앱의 UI를 렌더링하는 것입니다!

이론적으로, 모든 로직과 데이터 페칭을 컴포넌트 밖으로 이동시킬 수도 있습니다. 이 방식으로 컴포넌트는 오직 렌더링에만 전념하게 됩니다. state는 컴포넌트와 완전히 독립적이 됩니다. 앱의 로직은 React 컴포넌트 없이도 동작할 것입니다!

:::tip
테스트 가능한 코드라는 주제를 다른 학습 자료에서 더 깊이 탐구해보시기를 권장합니다.
:::

## 테스트 작성하기

테스트 가능한 코드를 작성한 후에는 실제 테스트를 작성할 차례입니다! React Native의 기본 템플릿은 [Jest](https://jestjs.io) 테스팅 프레임워크와 함께 제공됩니다. 이 환경에 맞게 조정된 프리셋이 포함되어 있어, 설정 및 목(mock) 조정 없이 바로 생산적으로 작업할 수 있습니다. [목에 대해서는 나중에 다룹니다](#목킹mocking). Jest를 사용하여 이 가이드에서 소개하는 모든 유형의 테스트를 작성할 수 있습니다.

:::note
테스트 주도 개발(TDD)을 한다면, 실제로 테스트를 먼저 작성합니다! 그 방식으로 코드의 테스트 가능성이 보장됩니다.
:::

### 테스트 구조화하기

테스트는 짧아야 하며 이상적으로는 한 가지만 테스트해야 합니다. Jest로 작성된 유닛 테스트 예제부터 시작해 봅시다:

```js
it('given a date in the past, colorForDueDate() returns red', () => {
  expect(colorForDueDate('2000-10-20')).toBe('red');
});
```

테스트는 [`it`](https://jestjs.io/docs/en/api#testname-fn-timeout) 함수에 전달된 문자열로 설명됩니다. 무엇이 테스트되고 있는지 명확하도록 설명을 신중하게 작성하세요. 다음 내용을 포함하도록 최선을 다하세요:

1. **Given(주어진 조건)** - 어떤 전제 조건
2. **When(실행)** - 테스트하는 함수가 실행하는 어떤 액션
3. **Then(결과)** - 예상되는 결과

이것은 AAA(Arrange, Act, Assert)라고도 알려져 있습니다.

Jest는 테스트를 구조화하는 데 도움이 되는 [`describe`](https://jestjs.io/docs/en/api#describename-fn) 함수를 제공합니다. `describe`를 사용하여 하나의 기능에 속하는 모든 테스트를 그룹화하세요. 필요하다면 describe를 중첩할 수 있습니다. 자주 사용하게 될 다른 함수로는 테스트하는 객체를 설정하는 데 사용할 수 있는 [`beforeEach`](https://jestjs.io/docs/en/api#beforeeachfn-timeout) 또는 [`beforeAll`](https://jestjs.io/docs/en/api#beforeallfn-timeout)이 있습니다. 자세한 내용은 [Jest API 레퍼런스](https://jestjs.io/docs/en/api)를 참고하세요.

테스트에 많은 단계나 많은 검증이 있다면, 여러 개의 작은 테스트로 분리하는 것이 좋습니다. 또한 테스트가 서로 완전히 독립적인지 확인하세요. 스위트의 각 테스트는 다른 테스트를 먼저 실행하지 않고도 단독으로 실행 가능해야 합니다. 반대로, 모든 테스트를 함께 실행하는 경우 첫 번째 테스트가 두 번째 테스트의 출력에 영향을 미쳐서는 안 됩니다.

마지막으로, 개발자로서 우리는 코드가 잘 동작하고 충돌하지 않기를 좋아합니다. 테스트의 경우, 이는 종종 반대입니다. 실패한 테스트를 _좋은 것_으로 생각하세요! 테스트가 실패하면 대개 무언가 잘못되었다는 것을 의미합니다. 이것은 사용자에게 영향을 미치기 전에 문제를 수정할 기회를 제공합니다.

## 유닛 테스트

유닛 테스트는 개별 함수나 클래스와 같이 가장 작은 코드 단위를 다룹니다.

테스트하는 객체에 의존성이 있는 경우, 다음 단락에서 설명하는 것처럼 종종 목(mock)으로 대체해야 합니다.

유닛 테스트의 장점은 빠르게 작성하고 실행할 수 있다는 것입니다. 따라서 작업하면서 테스트가 통과하는지에 대한 빠른 피드백을 얻을 수 있습니다. Jest는 편집 중인 코드와 관련된 테스트를 지속적으로 실행하는 옵션도 있습니다: [Watch 모드](https://jestjs.io/docs/en/cli#watch).

<img src="/docs/assets/p_tests-unit.svg" alt=" " />

### 목킹(Mocking)

때로는 테스트하는 객체에 외부 의존성이 있을 때 그것을 "목(mock)으로 대체"하고 싶을 것입니다. "목킹"은 코드의 일부 의존성을 자체 구현으로 교체하는 것입니다.

:::info
일반적으로 테스트에서 실제 객체를 사용하는 것이 목을 사용하는 것보다 더 좋지만, 불가능한 상황도 있습니다. 예를 들어: JS 유닛 테스트가 Java 또는 Objective-C로 작성된 네이티브 모듈에 의존하는 경우입니다.
:::

현재 도시의 날씨를 보여주는 앱을 작성하고 있으며, 날씨 정보를 제공하는 외부 서비스나 다른 의존성을 사용하고 있다고 가정해 봅시다. 서비스가 비가 온다고 알려주면 비구름이 있는 이미지를 보여주고 싶습니다. 테스트에서 해당 서비스를 호출하고 싶지 않은 이유는:

- 네트워크 요청이 포함되어 테스트가 느리고 불안정해질 수 있습니다.
- 서비스가 테스트를 실행할 때마다 다른 데이터를 반환할 수 있습니다.
- 실제로 테스트를 실행해야 할 때 서드파티 서비스가 오프라인 상태일 수 있습니다!

따라서 서비스의 목 구현을 제공하여 수천 줄의 코드와 인터넷에 연결된 온도계를 효과적으로 대체할 수 있습니다!

:::note
Jest는 함수 수준부터 모듈 수준 목킹까지 [목킹 지원](https://jestjs.io/docs/en/mock-functions#mocking-modules)을 제공합니다.
:::

## 통합 테스트

더 큰 소프트웨어 시스템을 작성할 때, 개별 구성 요소들은 서로 상호작용해야 합니다. 유닛 테스팅에서 유닛이 다른 유닛에 의존하는 경우, 때로는 의존성을 목으로 대체하여 가짜로 교체하게 됩니다.

통합 테스팅에서는 실제 개별 유닛들이 (앱에서와 동일하게) 결합되어 함께 테스트되어 협력이 예상대로 작동하는지 확인합니다. 여기서 목킹이 발생하지 않는다는 것은 아닙니다. 여전히 목이 필요하겠지만(예: 날씨 서비스와의 통신을 목으로 대체), 유닛 테스팅보다는 훨씬 적게 필요합니다.

:::info
통합 테스팅의 의미에 관한 용어가 항상 일관되지는 않다는 점에 유의하세요. 또한 유닛 테스트와 통합 테스트의 경계가 항상 명확하지 않을 수 있습니다. 이 가이드에서는 다음의 경우에 테스트가 "통합 테스팅"에 해당합니다:

- 위에서 설명한 것처럼 앱의 여러 모듈을 결합하는 경우
- 외부 시스템을 사용하는 경우
- 다른 애플리케이션(예: 날씨 서비스 API)에 네트워크 요청을 하는 경우
- 어떤 종류의 파일 또는 데이터베이스 <abbr title="Input/Output">I/O</abbr>를 수행하는 경우
  :::

<img src="/docs/assets/p_tests-integration.svg" alt=" " />

## 컴포넌트 테스트

React 컴포넌트는 앱을 렌더링하는 역할을 담당하며, 사용자는 그 출력과 직접 상호작용합니다. 앱의 비즈니스 로직이 높은 테스트 커버리지를 가지고 올바르더라도, 컴포넌트 테스트 없이는 사용자에게 깨진 UI를 제공할 수도 있습니다. 컴포넌트 테스트는 유닛 테스트와 통합 테스트 모두에 해당할 수 있지만, React Native의 핵심적인 부분이기 때문에 별도로 다룹니다.

React 컴포넌트를 테스트할 때 테스트하고 싶은 두 가지 사항이 있습니다:

- 상호작용: 사용자가 상호작용할 때 컴포넌트가 올바르게 동작하는지 확인(예: 사용자가 버튼을 누를 때)
- 렌더링: React가 사용하는 컴포넌트 렌더링 출력이 올바른지 확인(예: 버튼의 외관과 UI에서의 위치)

예를 들어, `onPress` 리스너가 있는 버튼이 있다면, 버튼이 올바르게 표시되는지와 버튼 탭이 컴포넌트에 의해 올바르게 처리되는지 모두 테스트하고 싶을 것입니다.

이를 테스트하는 데 도움이 되는 여러 라이브러리가 있습니다:

- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)는 React의 테스트 렌더러를 기반으로 구축되며 다음 단락에서 설명하는 `fireEvent`와 `query` API를 추가합니다.
- [Deprecated] React의 [Test Renderer](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#deprecated-react-test-renderer)는 핵심과 함께 개발되며, DOM이나 네이티브 모바일 환경에 의존하지 않고 React 컴포넌트를 순수 JavaScript 객체로 렌더링하는 데 사용할 수 있는 React 렌더러를 제공합니다.

:::warning
컴포넌트 테스트는 Node.js 환경에서 실행되는 JavaScript 테스트일 뿐입니다. React Native 컴포넌트를 지원하는 iOS, Android 또는 다른 플랫폼 코드는 고려하지 않습니다. 따라서 사용자에게 모든 것이 작동한다는 100% 확신을 줄 수 없습니다. iOS 또는 Android 코드에 버그가 있다면 발견하지 못할 것입니다.
:::

<img src="/docs/assets/p_tests-component.svg" alt=" " />

### 사용자 상호작용 테스트하기

일부 UI를 렌더링하는 것 외에도, 컴포넌트는 `TextInput`의 `onChangeText`나 `Button`의 `onPress`와 같은 이벤트를 처리합니다. 다른 함수와 이벤트 콜백도 포함할 수 있습니다. 다음 예제를 고려해보세요:

```tsx
function GroceryShoppingList() {
  const [groceryItem, setGroceryItem] = useState('');
  const [items, setItems] = useState<string[]>([]);

  const addNewItemToShoppingList = useCallback(() => {
    setItems([groceryItem, ...items]);
    setGroceryItem('');
  }, [groceryItem, items]);

  return (
    <>
      <TextInput
        value={groceryItem}
        placeholder="Enter grocery item"
        onChangeText={text => setGroceryItem(text)}
      />
      <Button
        title="Add the item to list"
        onPress={addNewItemToShoppingList}
      />
      {items.map(item => (
        <Text key={item}>{item}</Text>
      ))}
    </>
  );
}
```

사용자 상호작용을 테스트할 때, 사용자 관점에서 컴포넌트를 테스트하세요. 페이지에 무엇이 있나요? 상호작용할 때 무엇이 바뀌나요?

경험 법칙으로, 사용자가 보거나 들을 수 있는 것을 사용하는 것을 선호하세요:

- 렌더링된 텍스트나 [접근성 헬퍼](https://reactnative.dev/docs/accessibility#accessibility-properties)를 사용하여 검증하세요.

반대로 다음은 피해야 합니다:

- 컴포넌트 props나 state에 대한 검증
- testID 쿼리

props나 state와 같은 구현 세부 사항을 테스트하는 것을 피하세요. 그런 테스트는 동작하지만, 사용자가 컴포넌트와 상호작용하는 방식에 맞춰져 있지 않으며, 리팩터링(예: 일부 이름을 변경하거나 클래스 컴포넌트를 훅으로 재작성하는 경우)으로 인해 깨지는 경향이 있습니다.

:::info
React 클래스 컴포넌트는 특히 내부 state, props 또는 이벤트 핸들러와 같은 구현 세부 사항을 테스트하기 쉽습니다. 구현 세부 사항을 테스트하는 것을 피하려면, 컴포넌트 내부에 _더 어렵게_ 의존하게 만드는 훅이 있는 함수 컴포넌트를 사용하는 것을 선호하세요.
:::

[React Native Testing Library](https://callstack.github.io/react-native-testing-library/)와 같은 컴포넌트 테스팅 라이브러리는 제공된 API를 신중하게 선택하여 사용자 중심 테스트 작성을 용이하게 합니다. 다음 예제는 사용자가 컴포넌트와 상호작용하는 것을 시뮬레이션하는 `fireEvent` 메서드 `changeText`와 `press`를 사용하고, 렌더링된 출력에서 일치하는 `Text` 노드를 찾는 쿼리 함수 `getAllByText`를 사용합니다.

```tsx
test('given empty GroceryShoppingList, user can add an item to it', () => {
  const {getByPlaceholderText, getByText, getAllByText} = render(
    <GroceryShoppingList />,
  );

  fireEvent.changeText(
    getByPlaceholderText('Enter grocery item'),
    'banana',
  );
  fireEvent.press(getByText('Add the item to list'));

  const bananaElements = getAllByText('banana');
  expect(bananaElements).toHaveLength(1); // expect 'banana' to be on the list
});
```

이 예제는 함수를 호출할 때 state가 어떻게 바뀌는지 테스트하는 것이 아닙니다. 사용자가 `TextInput`에서 텍스트를 변경하고 `Button`을 누를 때 어떤 일이 발생하는지 테스트합니다!

### 렌더링 출력 테스트하기

[스냅샷 테스팅](https://jestjs.io/docs/en/snapshot-testing)은 Jest에서 지원하는 고급 테스팅 방식입니다. 매우 강력하고 저수준의 도구이므로 사용 시 각별한 주의가 필요합니다.

"컴포넌트 스냅샷"은 Jest에 내장된 커스텀 React 시리얼라이저가 생성하는 JSX와 유사한 문자열입니다. 이 시리얼라이저를 통해 Jest는 React 컴포넌트 트리를 사람이 읽을 수 있는 문자열로 변환합니다. 다시 말해, 컴포넌트 스냅샷은 테스트 실행 중에 _생성된_ 컴포넌트 렌더링 출력의 텍스트 표현입니다. 다음과 같이 보일 수 있습니다:

```tsx
<Text
  style={
    Object {
      "fontSize": 20,
      "textAlign": "center",
    }
  }>
  Welcome to React Native!
</Text>
```

스냅샷 테스팅에서는 일반적으로 먼저 컴포넌트를 구현한 후 스냅샷 테스트를 실행합니다. 그러면 스냅샷 테스트가 스냅샷을 생성하고 이를 레퍼런스 스냅샷으로 저장소의 파일에 저장합니다. **그 파일은 커밋되어 코드 리뷰 중에 검토됩니다.** 향후 컴포넌트 렌더링 출력에 변경이 생기면 스냅샷이 변경되어 테스트가 실패합니다. 그런 다음 테스트를 통과시키기 위해 저장된 레퍼런스 스냅샷을 업데이트해야 합니다. 그 변경 사항도 다시 커밋되고 리뷰되어야 합니다.

스냅샷에는 몇 가지 약점이 있습니다:

- 개발자나 리뷰어로서, 스냅샷의 변경이 의도된 것인지 버그의 증거인지 구별하기 어려울 수 있습니다. 특히 큰 스냅샷은 빠르게 이해하기 어려워지고 그 추가적인 가치가 낮아집니다.
- 스냅샷이 생성될 때, 렌더링된 출력이 실제로 잘못된 경우에도 해당 시점에 올바른 것으로 간주됩니다.
- 스냅샷이 실패할 때, 변경이 예상된 것인지 제대로 조사하지 않고 `--updateSnapshot` jest 옵션을 사용하여 업데이트하고 싶은 유혹이 생깁니다. 따라서 어느 정도의 개발자 규율이 필요합니다.

스냅샷 자체는 컴포넌트 렌더링 로직이 올바른지 보장하지 않으며, 예상치 못한 변경으로부터 보호하고 테스트 중인 React 트리의 컴포넌트가 예상된 props(스타일 등)를 받는지 확인하는 데 유용합니다.

작은 스냅샷만 사용하시기를 권장합니다([`no-large-snapshots` 규칙](https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-large-snapshots.md) 참고). 두 React 컴포넌트 state 사이의 _변경_을 테스트하려면 [`snapshot-diff`](https://github.com/jest-community/snapshot-diff)를 사용하세요. 확신이 없을 때는 이전 단락에서 설명한 명시적 검증을 선호하세요.

<img src="/docs/assets/p_tests-snapshot.svg" alt=" " />

## 엔드투엔드 테스트

엔드투엔드(E2E) 테스트에서는 사용자 관점에서 기기(또는 시뮬레이터/에뮬레이터)에서 앱이 예상대로 작동하는지 검증합니다.

이는 릴리스 설정으로 앱을 빌드하고 이에 대한 테스트를 실행하여 수행됩니다. E2E 테스트에서는 더 이상 React 컴포넌트, React Native API, Redux 스토어 또는 비즈니스 로직에 대해 생각하지 않습니다. 그것이 E2E 테스트의 목적이 아니며 E2E 테스팅 중에는 접근할 수도 없습니다.

대신, E2E 테스팅 라이브러리는 앱 화면에서 요소를 찾고 제어할 수 있게 해줍니다. 예를 들어, 실제 사용자와 동일한 방식으로 버튼을 _실제로_ 탭하거나 `TextInputs`에 텍스트를 입력할 수 있습니다. 그런 다음 특정 요소가 앱 화면에 존재하는지, 보이는지, 어떤 텍스트를 포함하는지 등에 대해 검증을 할 수 있습니다.

E2E 테스트는 앱의 일부가 작동한다는 가장 높은 수준의 확신을 제공합니다. 트레이드오프에는 다음이 포함됩니다:

- 다른 유형의 테스트에 비해 작성하는 데 더 많은 시간이 소요됩니다.
- 실행 속도가 더 느립니다.
- 불안정성(flakiness)에 더 취약합니다("불안정한(flaky)" 테스트는 코드 변경 없이 무작위로 통과하거나 실패하는 테스트입니다).

앱의 중요한 부분을 E2E 테스트로 커버하세요: 인증 흐름, 핵심 기능, 결제 등. 앱의 덜 중요한 부분에는 더 빠른 JS 테스트를 사용하세요. 테스트를 더 많이 추가할수록 확신이 높아지지만, 유지 관리 및 실행에 더 많은 시간을 소비하게 됩니다. 트레이드오프를 고려하고 자신에게 최선인 것을 결정하세요.

사용 가능한 여러 E2E 테스팅 도구가 있습니다: React Native 커뮤니티에서는 React Native 앱에 맞게 조정되어 있어 [Detox](https://github.com/wix/detox/)가 인기 있는 프레임워크입니다. iOS 및 Android 앱 공간에서 인기 있는 다른 라이브러리로는 [Appium](https://appium.io/) 또는 [Maestro](https://maestro.mobile.dev/)가 있습니다.

<img src="/docs/assets/p_tests-e2e.svg" alt=" " />

## 요약

이 가이드가 즐거웠고 무언가를 배웠기를 바랍니다. 앱을 테스트하는 방법은 많습니다. 처음에는 무엇을 사용할지 결정하기 어려울 수 있습니다. 그러나 훌륭한 React Native 앱에 테스트를 추가하기 시작하면 모든 것이 이해될 것이라고 믿습니다. 그러니 무엇을 기다리고 있나요? 커버리지를 높이세요!

### 링크

- [React 테스팅 개요](https://react.dev/reference/react/act)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest 문서](https://jestjs.io/docs/en/tutorial-react-native)
- [Detox](https://github.com/wix/detox/)
- [Appium](https://appium.io/)
- [Maestro](https://maestro.mobile.dev/)

---

_이 가이드는 원래 [Vojtech Novak](https://twitter.com/vonovak)이 전부 작성하고 기여했습니다._
