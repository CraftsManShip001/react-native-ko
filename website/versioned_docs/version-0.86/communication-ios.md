---
id: communication-ios
title: 네이티브와 React Native 간의 통신
---

[기존 앱과의 통합 가이드](integration-with-existing-apps)와 [네이티브 UI 컴포넌트 가이드](legacy/native-components-ios)에서는 React Native를 네이티브 컴포넌트에 임베드하는 방법과 그 반대 방법을 알아봤습니다. 네이티브 컴포넌트와 React Native 컴포넌트를 혼용하다 보면, 결국 이 두 세계 사이에서 통신해야 하는 필요성이 생깁니다. 이를 달성하는 몇 가지 방법은 다른 가이드에서 이미 언급한 바 있습니다. 이 문서는 사용 가능한 기법들을 정리합니다.

## 소개

React Native는 React에서 영감을 받았으므로, 정보 흐름의 기본 아이디어도 유사합니다. React에서의 흐름은 단방향입니다. 컴포넌트 계층 구조를 유지하며, 각 컴포넌트는 오직 부모와 자신의 내부 state에만 의존합니다. 이를 props로 구현합니다. 데이터는 부모에서 자식으로 하향식으로 전달됩니다. 만약 상위 컴포넌트가 하위 컴포넌트의 state에 의존해야 한다면, 하위 컴포넌트가 상위 컴포넌트를 업데이트할 때 사용할 콜백을 전달해야 합니다.

React Native에도 동일한 개념이 적용됩니다. 애플리케이션을 순수하게 프레임워크 안에서만 구축하는 한, props와 콜백으로 앱을 구동할 수 있습니다. 그러나 React Native와 네이티브 컴포넌트를 혼용할 때는, 두 세계 간에 정보를 전달할 수 있는 특수한 크로스 언어 메커니즘이 필요합니다.

## Properties

Properties는 컴포넌트 간 통신에서 가장 직관적인 방법입니다. 따라서 네이티브에서 React Native로, 그리고 React Native에서 네이티브로 properties를 전달하는 방법이 필요합니다.

### 네이티브에서 React Native로 properties 전달하기

네이티브 컴포넌트에 React Native 뷰를 임베드하려면 `RCTRootView`를 사용합니다. `RCTRootView`는 React Native 앱을 담는 `UIView`입니다. 또한 네이티브 측과 호스팅된 앱 사이의 인터페이스를 제공합니다.

`RCTRootView`에는 React Native 앱에 임의의 properties를 전달할 수 있는 초기화 메서드가 있습니다. `initialProperties` 파라미터는 `NSDictionary` 인스턴스여야 합니다. 딕셔너리는 내부적으로 JSON 객체로 변환되어 최상위 JS 컴포넌트에서 참조할 수 있습니다.

```objectivec
NSArray *imageList = @[@"https://dummyimage.com/600x400/ffffff/000000.png",
                       @"https://dummyimage.com/600x400/000000/ffffff.png"];

NSDictionary *props = @{@"images" : imageList};

RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                 moduleName:@"ImageBrowserApp"
                                          initialProperties:props];
```

```tsx
import {View, Image} from 'react-native';

export default class ImageBrowserApp extends React.Component {
  renderImage(imgURI) {
    return <Image source={{uri: imgURI}} />;
  }
  render() {
    return <View>{this.props.images.map(this.renderImage)}</View>;
  }
}
```

`RCTRootView`는 읽기-쓰기 가능한 `appProperties` 프로퍼티도 제공합니다. `appProperties`가 설정되면, React Native 앱은 새로운 properties로 다시 렌더링됩니다. 업데이트는 새로 업데이트된 properties가 이전 것과 다를 때만 수행됩니다.

```objectivec
NSArray *imageList = @[@"https://dummyimage.com/600x400/ff0000/000000.png",
                       @"https://dummyimage.com/600x400/ffffff/ff0000.png"];

rootView.appProperties = @{@"images" : imageList};
```

properties는 언제든지 업데이트해도 괜찮습니다. 그러나 업데이트는 메인 스레드에서 수행해야 합니다. 게터(getter)는 어느 스레드에서나 사용할 수 있습니다.

:::note
현재, 브리지 시작 중에 appProperties를 설정하면 변경 사항이 손실될 수 있는 알려진 이슈가 있습니다. 자세한 내용은 https://github.com/facebook/react-native/issues/20115 를 참고하세요.
:::

한 번에 일부 properties만 업데이트하는 방법은 없습니다. 직접 래퍼(wrapper)를 만들어 구현하는 것을 권장합니다.

### React Native에서 네이티브로 properties 전달하기

네이티브 컴포넌트의 properties 노출 문제는 [이 문서](legacy/native-components-ios#속성)에서 자세히 다룹니다. 요약하면, 커스텀 네이티브 컴포넌트에서 `RCT_CUSTOM_VIEW_PROPERTY` 매크로로 properties를 export하고, 해당 컴포넌트가 일반 React Native 컴포넌트인 것처럼 React Native에서 사용하면 됩니다.

### Properties의 한계

크로스 언어 properties의 주된 단점은 콜백을 지원하지 않는다는 것입니다. 콜백이 있어야 상향식 데이터 바인딩을 처리할 수 있습니다. JS 액션의 결과로 네이티브 부모 뷰에서 소형 RN 뷰를 제거하고 싶다고 가정해 봅시다. 정보가 하위에서 상위로 전달되어야 하므로 props만으로는 이를 구현할 수 없습니다.

비록 크로스 언어 콜백의 한 형태([여기](legacy/native-modules-ios#콜백)에 설명됨)가 있지만, 이 콜백이 항상 필요한 것은 아닙니다. 주된 문제는 이 콜백이 properties로 전달되도록 설계되지 않았다는 점입니다. 오히려 이 메커니즘은 JS에서 네이티브 액션을 트리거하고, JS에서 그 결과를 처리할 수 있게 해줍니다.

## 크로스 언어 상호작용의 다른 방법 (이벤트와 네이티브 모듈)

이전 챕터에서 언급했듯이, properties 사용에는 몇 가지 한계가 있습니다. 때로는 properties만으로는 앱의 로직을 구동하기에 부족하며, 더 많은 유연성을 제공하는 솔루션이 필요합니다. 이 챕터에서는 React Native에서 사용 가능한 다른 통신 기법들을 다룹니다. 이 기법들은 내부 통신(RN의 JS와 네이티브 레이어 사이)뿐만 아니라 외부 통신(RN과 앱의 '순수 네이티브' 부분 사이)에도 사용할 수 있습니다.

React Native는 크로스 언어 함수 호출을 지원합니다. JS에서 커스텀 네이티브 코드를 실행하거나 그 반대도 가능합니다. 안타깝게도, 작업하는 측에 따라 동일한 목표를 다른 방식으로 달성합니다. 네이티브 측에서는 이벤트 메커니즘을 사용하여 JS의 핸들러 함수 실행을 예약하고, React Native 측에서는 네이티브 모듈이 export한 메서드를 직접 호출합니다.

### 네이티브에서 React Native 함수 호출하기 (이벤트)

이벤트는 [이 문서](legacy/native-components-ios#이벤트)에서 자세히 설명합니다. 이벤트는 별도의 스레드에서 처리되므로 실행 시간에 대한 보장이 없다는 점에 유의하세요.

이벤트는 강력합니다. 참조 없이 React Native 컴포넌트를 변경할 수 있게 해주기 때문입니다. 그러나 이벤트를 사용할 때 주의해야 할 몇 가지 함정이 있습니다.

- 이벤트는 어디서나 전송될 수 있으므로 프로젝트에 스파게티식 의존성을 도입할 수 있습니다.
- 이벤트는 네임스페이스를 공유하므로 이름 충돌이 발생할 수 있습니다. 충돌은 정적으로 감지되지 않아 디버깅이 어렵습니다.
- 동일한 React Native 컴포넌트의 여러 인스턴스를 사용하면서 이벤트 관점에서 이들을 구분하려면, 식별자를 도입하고 이벤트와 함께 전달해야 할 가능성이 높습니다(네이티브 뷰의 `reactTag`를 식별자로 사용할 수 있습니다).

React Native에 네이티브를 임베드할 때 흔히 사용하는 패턴은, 네이티브 컴포넌트의 RCTViewManager를 뷰의 델리게이트로 만들어 브리지를 통해 JavaScript로 이벤트를 다시 전송하는 것입니다. 이렇게 하면 관련 이벤트 호출이 한 곳에 집중됩니다.

### React Native에서 네이티브 함수 호출하기 (네이티브 모듈)

네이티브 모듈은 JS에서 사용 가능한 Objective-C 클래스입니다. 일반적으로 각 모듈의 인스턴스는 JS 브리지당 하나씩 생성됩니다. 임의의 함수와 상수를 React Native에 export할 수 있습니다. 자세한 내용은 [이 문서](legacy/native-modules-ios)에서 확인하세요.

네이티브 모듈이 싱글톤이라는 점은 임베딩 컨텍스트에서 이 메커니즘을 제한합니다. 네이티브 뷰에 임베드된 React Native 컴포넌트가 있고, 네이티브 부모 뷰를 업데이트하고 싶다고 가정해 봅시다. 네이티브 모듈 메커니즘을 사용하면, 예상되는 인수뿐만 아니라 부모 네이티브 뷰의 식별자도 받는 함수를 export해야 합니다. 그 식별자를 사용해 부모 뷰에 대한 참조를 가져와 업데이트합니다. 즉, 모듈에서 식별자와 네이티브 뷰 간의 매핑을 유지해야 합니다.

이 솔루션이 복잡하긴 하지만, 모든 React Native 뷰를 관리하는 내부 React Native 클래스인 `RCTUIManager`에서 실제로 사용됩니다.

네이티브 모듈은 기존 네이티브 라이브러리를 JS에 노출하는 데도 사용될 수 있습니다. [Geolocation 라이브러리](https://github.com/michalchudziak/react-native-geolocation)가 이 아이디어의 실제 사례입니다.

:::caution
모든 네이티브 모듈은 동일한 네임스페이스를 공유합니다. 새 모듈을 만들 때 이름 충돌에 주의하세요.
:::

## 레이아웃 계산 흐름

네이티브와 React Native를 통합할 때는 두 가지 서로 다른 레이아웃 시스템을 조율하는 방법도 필요합니다. 이 섹션에서는 일반적인 레이아웃 문제를 다루고 이를 해결하기 위한 메커니즘을 간략히 설명합니다.

### React Native에 임베드된 네이티브 컴포넌트의 레이아웃

이 경우는 [이 문서](legacy/native-components-ios#스타일)에서 다룹니다. 요약하면, 모든 네이티브 react 뷰는 `UIView`의 서브클래스이므로, 대부분의 스타일 및 크기 속성은 기대한 대로 기본적으로 동작합니다.

### 네이티브에 임베드된 React Native 컴포넌트의 레이아웃

#### 고정 크기의 React Native 콘텐츠

일반적인 시나리오는 고정 크기의 React Native 앱이 있고, 그 크기가 네이티브 측에 알려져 있는 경우입니다. 특히 전체 화면 React Native 뷰가 이 경우에 해당합니다. 더 작은 루트 뷰를 원한다면 RCTRootView의 frame을 명시적으로 설정할 수 있습니다.

예를 들어, RN 앱의 높이를 200(논리적) 픽셀로, 너비를 호스팅 뷰의 너비와 동일하게 만들려면 다음과 같이 할 수 있습니다.

```objectivec title='SomeViewController.m'
- (void)viewDidLoad
{
  [...]
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:appName
                                            initialProperties:props];
  rootView.frame = CGRectMake(0, 0, self.view.width, 200);
  [self.view addSubview:rootView];
}
```

고정 크기의 루트 뷰가 있는 경우, JS 측에서 그 경계를 준수해야 합니다. 즉, React Native 콘텐츠가 고정 크기의 루트 뷰 안에 포함될 수 있도록 해야 합니다. 이를 보장하는 가장 쉬운 방법은 Flexbox 레이아웃을 사용하는 것입니다. 절대 위치 지정을 사용하고 React 컴포넌트가 루트 뷰의 경계 밖에 표시되면 네이티브 뷰와 겹쳐져 일부 기능이 예기치 않게 동작할 수 있습니다. 예를 들어 'TouchableHighlight'는 루트 뷰의 경계 밖에서는 터치를 하이라이트하지 않습니다.

루트 뷰의 frame 프로퍼티를 다시 설정하여 크기를 동적으로 업데이트하는 것도 완전히 괜찮습니다. React Native가 콘텐츠의 레이아웃을 처리합니다.

#### 유연한 크기의 React Native 콘텐츠

경우에 따라 처음에는 크기를 알 수 없는 콘텐츠를 렌더링하고 싶을 수 있습니다. 크기가 JS에서 동적으로 정의된다고 가정해 봅시다. 이 문제에는 두 가지 해결책이 있습니다.

1. React Native 뷰를 `ScrollView` 컴포넌트로 감쌀 수 있습니다. 이렇게 하면 콘텐츠를 항상 사용할 수 있고 네이티브 뷰와 겹치지 않습니다.
2. React Native는 JS에서 RN 앱의 크기를 결정하고 이를 호스팅 `RCTRootView`의 소유자에게 제공할 수 있게 해줍니다. 소유자는 서브뷰를 다시 배치하고 UI를 일관되게 유지할 책임이 있습니다. 이를 `RCTRootView`의 유연성 모드로 달성합니다.

`RCTRootView`는 4가지 크기 유연성 모드를 지원합니다.

```objectivec title='RCTRootView.h'
typedef NS_ENUM(NSInteger, RCTRootViewSizeFlexibility) {
  RCTRootViewSizeFlexibilityNone = 0,
  RCTRootViewSizeFlexibilityWidth,
  RCTRootViewSizeFlexibilityHeight,
  RCTRootViewSizeFlexibilityWidthAndHeight,
};
```

`RCTRootViewSizeFlexibilityNone`은 기본값으로, 루트 뷰의 크기를 고정합니다(하지만 `setFrame:`으로 업데이트할 수는 있습니다). 나머지 세 가지 모드는 React Native 콘텐츠의 크기 업데이트를 추적할 수 있게 해줍니다. 예를 들어, 모드를 `RCTRootViewSizeFlexibilityHeight`로 설정하면 React Native가 콘텐츠의 높이를 측정하고 그 정보를 `RCTRootView`의 델리게이트에 전달합니다. 델리게이트 내에서 루트 뷰의 frame 설정을 포함한 임의의 액션을 수행하여 콘텐츠가 맞도록 할 수 있습니다. 델리게이트는 콘텐츠 크기가 변경될 때만 호출됩니다.

:::caution
JS와 네이티브 양쪽에서 동시에 특정 차원을 유연하게 만들면 정의되지 않은 동작이 발생합니다. 예를 들어, 호스팅 `RCTRootView`에 `RCTRootViewSizeFlexibilityWidth`를 사용하는 동시에 최상위 React 컴포넌트의 너비를 (`flexbox`로) 유연하게 만들지 마세요.
:::

예시를 살펴보겠습니다.

```objectivec title='FlexibleSizeExampleView.m'
- (instancetype)initWithFrame:(CGRect)frame
{
  [...]

  _rootView = [[RCTRootView alloc] initWithBridge:bridge
  moduleName:@"FlexibilityExampleApp"
  initialProperties:@{}];

  _rootView.delegate = self;
  _rootView.sizeFlexibility = RCTRootViewSizeFlexibilityHeight;
  _rootView.frame = CGRectMake(0, 0, self.frame.size.width, 0);
}

#pragma mark - RCTRootViewDelegate
- (void)rootViewDidChangeIntrinsicSize:(RCTRootView *)rootView
{
  CGRect newFrame = rootView.frame;
  newFrame.size = rootView.intrinsicContentSize;

  rootView.frame = newFrame;
}
```

이 예시에는 루트 뷰를 담는 `FlexibleSizeExampleView` 뷰가 있습니다. 루트 뷰를 만들고 초기화한 다음 델리게이트를 설정합니다. 델리게이트가 크기 업데이트를 처리합니다. 그런 다음 루트 뷰의 크기 유연성을 `RCTRootViewSizeFlexibilityHeight`로 설정합니다. 이는 React Native 콘텐츠가 높이를 변경할 때마다 `rootViewDidChangeIntrinsicSize:` 메서드가 호출된다는 의미입니다. 마지막으로 루트 뷰의 너비와 위치를 설정합니다. 높이도 설정하지만, 높이를 RN에 의존하도록 만들었으므로 효과가 없습니다.

예시의 전체 소스 코드는 [여기](https://github.com/facebook/react-native/blob/main/packages/rn-tester/RNTester/NativeExampleViews/FlexibleSizeExampleView.mm)에서 확인할 수 있습니다.

루트 뷰의 크기 유연성 모드를 동적으로 변경하는 것도 괜찮습니다. 루트 뷰의 유연성 모드를 변경하면 레이아웃 재계산이 예약되고, 콘텐츠 크기가 파악되면 델리게이트의 `rootViewDidChangeIntrinsicSize:` 메서드가 호출됩니다.

:::note
React Native 레이아웃 계산은 별도의 스레드에서 수행되는 반면, 네이티브 UI 뷰 업데이트는 메인 스레드에서 이루어집니다.
이로 인해 네이티브와 React Native 사이에 일시적인 UI 불일치가 발생할 수 있습니다. 이는 알려진 문제이며, 저희 팀이 서로 다른 소스에서 오는 UI 업데이트 동기화를 작업 중입니다.
:::

:::note
React Native는 루트 뷰가 다른 뷰의 서브뷰가 될 때까지 레이아웃 계산을 수행하지 않습니다.
크기가 파악될 때까지 React Native 뷰를 숨기고 싶다면, 루트 뷰를 서브뷰로 추가하되 처음에는 숨긴 상태로 만드세요(`UIView`의 `hidden` 프로퍼티를 사용). 그런 다음 델리게이트 메서드에서 가시성을 변경하세요.
:::
