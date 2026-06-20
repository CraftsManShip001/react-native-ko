---
id: release-levels
title: 릴리즈 레벨
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native는 커뮤니티에 개별 신규 기능이 안정적인 릴리즈에 포함되기 전, 설계 및 구현이 거의 완료된 시점부터 즉시 채택할 수 있는 기능을 제공합니다. 이 접근 방식을 **릴리즈 레벨**이라고 합니다.

React Native의 릴리즈 레벨을 설정하면, React Native 인스턴스가 Feature Flags를 `EXPERIMENTAL`, `CANARY`, 또는 `STABLE` 모드로 초기화됩니다.

:::note
이 접근 방식은 [React의 Canary 및 Experimental 릴리즈](https://react.dev/blog/2023/05/03/react-canaries)와 유사하지만, 한 가지 중요한 차이점이 있습니다. 릴리즈 레벨에 관계없이 동일한 버전의 React JS와 React Native 코드가 사용됩니다.  
React Native는 릴리즈 레벨이 안정 릴리즈와 nightly 릴리즈 모두에서 사용 가능하기 때문에 `@canary` 또는 `@experimental` NPM 태그를 사용하지 않습니다.
:::

또한, 릴리즈 레벨을 `EXPERIMENTAL` 또는 `CANARY`로 설정하더라도, react-native가 React 버전을 사용하는 방식으로 인해 `react@nightly` 또는 `react@canary`가 사용되지는 않습니다([자세한 내용은 여기에서 확인할 수 있습니다](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Renderer/README.md#react--react-native-versions)).

## 각 릴리즈 레벨의 사용 시점

- **`STABLE`**:
  - 미출시 기능에 대한 조기 접근이 필요하지 않은 모든 프로덕션 앱 및 라이브러리에 사용하세요.
  - 안정 릴리즈 및 nightly 릴리즈의 기본 레벨입니다.
- **`CANARY`:**
  - 프레임워크 작성자, 고급 앱 개발자이거나, 안정 버전에 출시되기 전에 새로운 기능을 테스트하거나 채택해야 하는 경우에 사용하세요.
  - 프로덕션 또는 사용자 대상 애플리케이션에는 권장하지 않습니다.
- **`EXPERIMENTAL`:**
  - 개발 초기 단계의 새로운 기능을 테스트하고 피드백을 제공하기 위한 목적으로만 사용하세요.
  - 프로덕션 또는 사용자 대상 애플리케이션에는 권장하지 않습니다.

## Canary 및 Experimental을 사용하여 React Native 초기화하는 방법

### Android

`DefaultNewArchitectureEntryPoint` 클래스에는 이제 `releaseLevel` 속성이 있습니다(기본값: `STABLE`).  
Feature Flag 시스템은 이 속성을 사용하여 선택한 릴리즈 레벨에 적합한 Feature Flags 집합을 선택합니다.

```kotlin title="Example usage"
DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.CANARY
DefaultNewArchitectureEntryPoint.load()
```

빌드 시스템은 각 릴리즈 레벨에 대해 서로 다른 Feature Flag 오버라이드 클래스를 생성하여, 각 단계에서 올바른 기능이 활성화되도록 합니다.

### iOS

`RCTReactNativeFactory` 클래스에는 이제 `releaseLevel` 매개변수를 받는 이니셜라이저가 있습니다. Feature Flag 설정은 이 매개변수를 사용하여 올바른 Feature Flag 오버라이드를 선택합니다.

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">
  
```objc title="AppDelegate.mm"
[[RCTReactNativeFactory alloc] initWithDelegate:delegate releaseLevel:Canary];
```

</TabItem>
<TabItem value="swift">
  
```swift title="AppDelegate.swift"
let factory = RCTReactNativeFactory(delegate: delegate, releaseLevel: RCTReleaseLevel.Canary)
```

</TabItem>
</Tabs>

이 시스템은 앱 인스턴스당 하나의 릴리즈 레벨만 활성화되도록 보장하며, 서로 다른 릴리즈 레벨로 여러 팩토리가 생성될 경우 크래시가 발생합니다.
