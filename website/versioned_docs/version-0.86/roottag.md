---
id: roottag
title: RootTag
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`RootTag`는 React Native 서피스의 네이티브 루트 뷰(즉, Android의 `ReactRootView` 또는 iOS의 `RCTRootView` 인스턴스)에 할당되는 불투명한 식별자입니다. 간단히 말해, 서피스 식별자입니다.

## RootTag는 언제 사용하나요?

대부분의 React Native 개발자는 `RootTag`를 다룰 필요가 없을 것입니다.

`RootTag`는 앱이 **여러 개의 React Native 루트 뷰**를 렌더링하고, 서피스에 따라 네이티브 API 호출을 다르게 처리해야 할 때 유용합니다. 예를 들어, 앱이 네이티브 내비게이션을 사용하고 각 화면이 별도의 React Native 루트 뷰인 경우가 이에 해당합니다.

네이티브 내비게이션에서는 모든 React Native 루트 뷰가 플랫폼의 내비게이션 뷰(예: Android의 `Activity`, iOS의 `UINavigationViewController`)에서 렌더링됩니다. 이를 통해 네이티브 외관과 내비게이션 전환 같은 플랫폼의 내비게이션 패러다임을 활용할 수 있습니다. 네이티브 내비게이션 API와 상호작용하는 기능은 [네이티브 모듈](https://reactnative.dev/docs/native-modules-intro)을 통해 React Native에 노출될 수 있습니다.

예를 들어, 화면의 제목 표시줄을 업데이트하려면 내비게이션 모듈의 API인 `setTitle("Updated Title")`을 호출해야 하지만, 스택에서 어느 화면을 업데이트할지 알아야 합니다. 여기서 루트 뷰와 이를 호스팅하는 컨테이너를 식별하기 위해 `RootTag`가 필요합니다.

`RootTag`의 또 다른 사용 사례는 앱이 특정 JavaScript 호출을 발생한 루트 뷰를 기반으로 네이티브에 귀속시켜야 할 때입니다. 서로 다른 서피스에서 오는 호출의 출처를 구분하기 위해 `RootTag`가 필요합니다.

## RootTag에 접근하는 방법 (필요한 경우)

버전 0.65 이하에서는 RootTag가 [레거시 컨텍스트](https://github.com/facebook/react-native/blob/v0.64.1/Libraries/ReactNative/AppContainer.js#L56)를 통해 접근됩니다. React 18 이후에 도입될 Concurrent 기능을 위해 React Native를 준비하는 과정에서, 0.66부터는 `RootTagContext`를 통해 최신 [Context API](https://react.dev/reference/react/createContext)로 마이그레이션하고 있습니다. 버전 0.65는 개발자들이 호출 지점을 마이그레이션할 시간을 갖도록 레거시 컨텍스트와 권장되는 `RootTagContext`를 모두 지원합니다. 하위 호환성 변경 사항 요약을 참고하세요.

`RootTagContext`를 통해 `RootTag`에 접근하는 방법입니다.

```js
import {RootTagContext} from 'react-native';
import NativeAnalytics from 'native-analytics';
import NativeNavigation from 'native-navigation';

function ScreenA() {
  const rootTag = useContext(RootTagContext);

  const updateTitle = title => {
    NativeNavigation.setTitle(rootTag, title);
  };

  const handleOneEvent = () => {
    NativeAnalytics.logEvent(rootTag, 'one_event');
  };

  // ...
}

class ScreenB extends React.Component {
  static contextType: typeof RootTagContext = RootTagContext;

  updateTitle(title) {
    NativeNavigation.setTitle(this.context, title);
  }

  handleOneEvent() {
    NativeAnalytics.logEvent(this.context, 'one_event');
  }

  // ...
}
```

[클래스](https://react.dev/reference/react/Component#static-contexttype)와 [훅](https://react.dev/reference/react/useContext)에 대한 Context API는 React 문서에서 더 자세히 알아볼 수 있습니다.

### 0.65의 하위 호환성 변경 사항

`RootTagContext`는 이전에 `unstable_RootTagContext`라는 이름으로 불렸으며, 0.65에서 `RootTagContext`로 변경되었습니다. 코드베이스에서 `unstable_RootTagContext`를 사용하고 있다면 업데이트하세요.

### 0.66의 하위 호환성 변경 사항

`RootTag`에 대한 레거시 컨텍스트 접근 방식이 제거되고 `RootTagContext`로 대체됩니다. 0.65부터는 개발자들이 `RootTag` 접근 방식을 `RootTagContext`로 선제적으로 마이그레이션할 것을 권장합니다.

## 향후 계획

새로운 React Native 아키텍처가 진행됨에 따라 `RootTag`에 대한 향후 반복 작업이 있을 것이며, `RootTag` 타입을 불투명하게 유지하고 React Native 코드베이스에서 혼란이 발생하지 않도록 할 예정입니다. RootTag가 현재 숫자를 별칭으로 사용한다는 사실에 의존하지 마세요! 앱이 RootTag에 의존하는 경우, [여기](https://github.com/facebook/react-native/blob/main/CHANGELOG.md)에서 확인할 수 있는 버전 변경 로그를 주시하세요.
