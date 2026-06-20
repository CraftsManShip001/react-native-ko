---
id: native-components-ios
title: iOS 네이티브 UI 컴포넌트
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

최신 앱에서 바로 사용할 수 있는 수많은 네이티브 UI 위젯이 있습니다. 일부는 플랫폼의 일부이고, 일부는 서드파티 라이브러리로 제공되며, 또 다른 일부는 이전 앱에서 직접 작성한 것일 수도 있습니다. React Native에는 `ScrollView` 및 `TextInput`과 같이 가장 중요한 플랫폼 컴포넌트가 이미 래핑되어 있지만, 전부 다 포함되어 있지는 않으며, 직접 이전 앱을 위해 작성한 컴포넌트는 포함되어 있지 않습니다. 다행히도, 이러한 기존 컴포넌트를 래핑하여 React Native 애플리케이션과 원활하게 통합할 수 있습니다.

네이티브 모듈 가이드와 마찬가지로, 이 가이드도 iOS 프로그래밍에 어느 정도 익숙하다고 가정하는 심화 가이드입니다. 이 가이드는 React Native 핵심 라이브러리에서 사용 가능한 기존 `MapView` 컴포넌트의 일부 구현 방법을 안내함으로써 네이티브 UI 컴포넌트를 빌드하는 방법을 보여줍니다.

## iOS MapView 예시

앱에 인터랙티브 지도를 추가하고 싶다고 가정해 봅시다. [`MKMapView`](https://developer.apple.com/library/prerelease/mac/documentation/MapKit/Reference/MKMapView_Class/index.html)를 사용하면 JavaScript에서 사용할 수 있도록 만들기만 하면 됩니다.

네이티브 뷰는 `RCTViewManager`의 서브클래스에 의해 생성되고 조작됩니다. 이 서브클래스들은 뷰 컨트롤러와 기능이 비슷하지만, 본질적으로 싱글톤입니다. 브리지에 의해 각 인스턴스가 하나만 생성됩니다. `RCTUIManager`에 네이티브 뷰를 노출하고, `RCTUIManager`는 필요에 따라 뷰의 속성을 설정하고 업데이트하기 위해 다시 서브클래스에 위임합니다. `RCTViewManager`는 또한 일반적으로 뷰의 델리게이트가 되어 브리지를 통해 JavaScript로 이벤트를 전송합니다.

뷰를 노출하려면:

- `RCTViewManager`를 서브클래싱하여 컴포넌트용 매니저를 만듭니다.
- `RCT_EXPORT_MODULE()` 마커 매크로를 추가합니다.
- `-(UIView *)view` 메서드를 구현합니다.

```objectivec title='RNTMapManager.m'
#import <MapKit/MapKit.h>

#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end
```

:::note
`-view` 메서드를 통해 노출하는 `UIView` 인스턴스에 `frame` 또는 `backgroundColor` 속성을 설정하지 마세요.
React Native는 JavaScript 컴포넌트의 레이아웃 props와 일치하도록 커스텀 클래스에서 설정한 값을 덮어씁니다.
이러한 수준의 제어가 필요하다면 스타일을 지정하려는 `UIView` 인스턴스를 다른 `UIView`로 감싸고 래퍼 `UIView`를 반환하는 것이 좋습니다.
자세한 내용은 [Issue 2948](https://github.com/facebook/react-native/issues/2948)을 참조하세요.
:::

:::info
위 예시에서 클래스 이름에 `RNT` 접두사를 사용했습니다. 접두사는 다른 프레임워크와의 이름 충돌을 피하기 위해 사용합니다.
Apple 프레임워크는 두 글자 접두사를 사용하고, React Native는 `RCT`를 접두사로 사용합니다. 이름 충돌을 피하기 위해 자신의 클래스에서는 `RCT`가 아닌 세 글자 접두사를 사용하는 것을 권장합니다.
:::

그런 다음 이를 사용 가능한 React 컴포넌트로 만들기 위해 약간의 JavaScript가 필요합니다.

```tsx {3} title="MapView.tsx"
import {requireNativeComponent} from 'react-native';

export default requireNativeComponent('RNTMap');
```

`requireNativeComponent` 함수는 `RNTMap`을 자동으로 `RNTMapManager`로 해석하고 JavaScript에서 사용할 수 있도록 네이티브 뷰를 내보냅니다.

```tsx title="MyApp.tsx"
import MapView from './MapView.tsx';

export default function MyApp() {
  return <MapView style={{flex: 1}} />;
}
```

:::note
렌더링할 때 뷰를 늘리는 것을 잊지 마세요. 그렇지 않으면 빈 화면만 표시됩니다.
:::

이제 JavaScript에서 핀치 줌 및 기타 네이티브 제스처 지원을 포함한 완전히 작동하는 네이티브 지도 뷰 컴포넌트가 생겼습니다. 아직은 JavaScript에서 제어할 수 없습니다.

## 속성

이 컴포넌트를 더 유용하게 만들기 위해 먼저 일부 네이티브 속성을 브리지로 연결할 수 있습니다. 줌을 비활성화하고 표시되는 영역을 지정할 수 있도록 한다고 가정해 봅시다. 줌 비활성화는 불리언이므로 다음 한 줄을 추가합니다.

```objectivec title='RNTMapManager.m'
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
```

타입을 `BOOL`로 명시적으로 지정합니다. React Native는 브리지를 통해 통신할 때 `RCTConvert`를 내부적으로 사용하여 다양한 데이터 타입을 변환하며, 잘못된 값이 있으면 편리한 "RedBox" 오류를 표시하여 문제를 즉시 알 수 있습니다. 이처럼 단순한 경우에는 이 매크로가 전체 구현을 처리해 줍니다.

이제 실제로 줌을 비활성화하려면 JavaScript에서 속성을 설정합니다.

```tsx {4} title="MyApp.tsx"
import MapView from './MapView.tsx';

export default function MyApp() {
  return <MapView zoomEnabled={false} style={{flex: 1}} />;
}
```

MapView 컴포넌트의 속성(및 허용하는 값)을 문서화하기 위해 래퍼 컴포넌트를 추가하고 TypeScript로 인터페이스를 문서화합니다.

```tsx {6-9} title="MapView.tsx"
import {requireNativeComponent} from 'react-native';

const RNTMap = requireNativeComponent('RNTMap');

export default function MapView(props: {
  /**
   * Whether the user may use pinch gestures to zoom in and out.
   */
  zoomEnabled?: boolean;
}) {
  return <RNTMap {...props} />;
}
```

이제 작업할 수 있는 잘 문서화된 래퍼 컴포넌트가 생겼습니다.

다음으로, 더 복잡한 `region` prop을 추가해 봅시다. 네이티브 코드를 먼저 추가합니다.

```objectivec title='RNTMapManager.m'
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}
```

이전의 `BOOL` 경우보다 더 복잡합니다. 이제 변환 함수가 필요한 `MKCoordinateRegion` 타입이 있고, JS에서 영역을 설정할 때 뷰가 애니메이션되도록 커스텀 코드가 있습니다. 함수 본문 내에서 `json`은 JS에서 전달된 원시 값을 가리킵니다. 또한 매니저의 뷰 인스턴스에 접근할 수 있는 `view` 변수와, JS가 null 센티넬을 보낼 때 속성을 기본값으로 재설정하는 데 사용하는 `defaultView`가 있습니다.

뷰에 대해 원하는 변환 함수를 작성할 수 있습니다. 다음은 `RCTConvert`의 카테고리를 통한 `MKCoordinateRegion` 구현입니다. ReactNative의 기존 카테고리인 `RCTConvert+CoreLocation`을 사용합니다.

```objectivec title='RNTMapManager.m'
#import "RCTConvert+Mapkit.h"
```

```objectivec title='RCTConvert+Mapkit.h'
#import <MapKit/MapKit.h>
#import <React/RCTConvert.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTConvert+CoreLocation.h>

@interface RCTConvert (Mapkit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json;
+ (MKCoordinateRegion)MKCoordinateRegion:(id)json;

@end

@implementation RCTConvert(MapKit)

+ (MKCoordinateSpan)MKCoordinateSpan:(id)json
{
  json = [self NSDictionary:json];
  return (MKCoordinateSpan){
    [self CLLocationDegrees:json[@"latitudeDelta"]],
    [self CLLocationDegrees:json[@"longitudeDelta"]]
  };
}

+ (MKCoordinateRegion)MKCoordinateRegion:(id)json
{
  return (MKCoordinateRegion){
    [self CLLocationCoordinate2D:json],
    [self MKCoordinateSpan:json]
  };
}

@end
```

이 변환 함수들은 키가 누락되거나 다른 개발자 오류가 발생할 때 "RedBox" 오류를 표시하고 표준 초기화 값을 반환하여 JS에서 전달하는 모든 JSON을 안전하게 처리하도록 설계되었습니다.

`region` prop 지원을 마무리하기 위해 TypeScript로 문서화합니다.

```tsx {6-25} title="MapView.tsx"
import {requireNativeComponent} from 'react-native';

const RNTMap = requireNativeComponent('RNTMap');

export default function MapView(props: {
  /**
   * The region to be displayed by the map.
   *
   * The region is defined by the center coordinates and the span of
   * coordinates to display.
   */
  region?: {
    /**
     * Coordinates for the center of the map.
     */
    latitude: number;
    longitude: number;

    /**
     * Distance between the minimum and the maximum latitude/longitude
     * to be displayed.
     */
    latitudeDelta: number;
    longitudeDelta: number;
  };
  /**
   * Whether the user may use pinch gestures to zoom in and out.
   */
  zoomEnabled?: boolean;
}) {
  return <RNTMap {...props} />;
}
```

이제 `MapView`에 `region` prop을 제공할 수 있습니다.

```tsx {4-9,12} title="MyApp.tsx"
import MapView from './MapView.tsx';

export default function MyApp() {
  const region = {
    latitude: 37.48,
    longitude: -122.16,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  return (
    <MapView
      region={region}
      zoomEnabled={false}
      style={{flex: 1}}
    />
  );
}
```

## 이벤트

이제 JS에서 자유롭게 제어할 수 있는 네이티브 지도 컴포넌트가 생겼습니다. 하지만 핀치 줌이나 패닝으로 표시 영역을 변경하는 것과 같은 사용자 이벤트는 어떻게 처리할까요?

지금까지는 매니저의 `-(UIView *)view` 메서드에서 `MKMapView` 인스턴스만 반환했습니다. `MKMapView`에 새 속성을 추가할 수 없으므로 `MKMapView`의 새 서브클래스를 만들어 뷰로 사용해야 합니다. 이 서브클래스에 `onRegionChange` 콜백을 추가할 수 있습니다.

```objectivec title='RNTMapView.h'
#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView

@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;

@end
```

```objectivec title='RNTMapView.m'
#import "RNTMapView.h"

@implementation RNTMapView

@end
```

모든 `RCTBubblingEventBlock`은 `on`으로 시작해야 합니다. 다음으로, `RNTMapManager`에 이벤트 핸들러 속성을 선언하고, 노출하는 모든 뷰의 델리게이트로 설정하고, 네이티브 뷰에서 이벤트 핸들러 블록을 호출하여 JS로 이벤트를 전달합니다.

```objectivec {9,17,31-48} title='RNTMapManager.m'
#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

#import "RNTMapView.h"
#import "RCTConvert+Mapkit.h"

@interface RNTMapManager : RCTViewManager <MKMapViewDelegate>
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}

- (UIView *)view
{
  RNTMapView *map = [RNTMapView new];
  map.delegate = self;
  return map;
}

#pragma mark MKMapViewDelegate

- (void)mapView:(RNTMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
  if (!mapView.onRegionChange) {
    return;
  }

  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
    @"region": @{
      @"latitude": @(region.center.latitude),
      @"longitude": @(region.center.longitude),
      @"latitudeDelta": @(region.span.latitudeDelta),
      @"longitudeDelta": @(region.span.longitudeDelta),
    }
  });
}
@end
```

델리게이트 메서드 `-mapView:regionDidChangeAnimated:`에서 이벤트 핸들러 블록이 영역 데이터와 함께 해당 뷰에서 호출됩니다. `onRegionChange` 이벤트 핸들러 블록을 호출하면 JavaScript에서 동일한 콜백 prop이 호출됩니다. 이 콜백은 원시 이벤트와 함께 호출되며, 일반적으로 래퍼 컴포넌트에서 처리하여 API를 단순화합니다.

```tsx {3-10,14-17,19} title="MapView.tsx"
// ...

type RegionChangeEvent = {
  nativeEvent: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export default function MapView(props: {
  // ...
  /**
   * Callback that is called continuously when the user is dragging the map.
   */
  onRegionChange: (event: RegionChangeEvent) => unknown;
}) {
  return <RNTMap {...props} onRegionChange={onRegionChange} />;
}
```

```tsx {6-9,14} title="MyApp.tsx"
import MapView from './MapView.tsx';

export default function MyApp() {
  // ...

  const onRegionChange = useCallback(event => {
    const {region} = event.nativeEvent;
    // Do something with `region.latitude`, etc.
  });

  return (
    <MapView
      // ...
      onRegionChange={onRegionChange}
    />
  );
}
```

## 여러 네이티브 뷰 처리

React Native 뷰는 뷰 트리에서 둘 이상의 자식 뷰를 가질 수 있습니다. 예를 들면:

```tsx
<View>
  <MyNativeView />
  <MyNativeView />
  <Button />
</View>
```

이 예시에서 `MyNativeView` 클래스는 `NativeComponent`의 래퍼이며, iOS 플랫폼에서 호출될 메서드를 노출합니다. `MyNativeView`는 `MyNativeView.ios.js`에 정의되어 있으며 `NativeComponent`의 프록시 메서드를 포함합니다.

사용자가 버튼 클릭과 같이 컴포넌트와 상호 작용할 때 `MyNativeView`의 `backgroundColor`가 변경됩니다. 이 경우 `UIManager`는 어떤 `MyNativeView`를 처리해야 하고 어떤 것이 `backgroundColor`를 변경해야 하는지 알 수 없습니다. 아래에서 이 문제에 대한 해결책을 찾을 수 있습니다.

```tsx
<View>
  <MyNativeView ref={this.myNativeReference} />
  <MyNativeView ref={this.myNativeReference2} />
  <Button
    onPress={() => {
      this.myNativeReference.callNativeMethod();
    }}
  />
</View>
```

이제 위의 컴포넌트에는 특정 `MyNativeView`에 대한 참조가 있어 특정 `MyNativeView` 인스턴스를 사용할 수 있습니다. 이제 버튼이 어떤 `MyNativeView`의 `backgroundColor`를 변경할지 제어할 수 있습니다. 이 예시에서 `callNativeMethod`가 `backgroundColor`를 변경한다고 가정합니다.

```tsx title="MyNativeView.ios.tsx"
class MyNativeView extends React.Component {
  callNativeMethod = () => {
    UIManager.dispatchViewManagerCommand(
      ReactNative.findNodeHandle(this),
      UIManager.getViewManagerConfig('RNCMyNativeView').Commands
        .callNativeMethod,
      [],
    );
  };

  render() {
    return <NativeComponent ref={NATIVE_COMPONENT_REF} />;
  }
}
```

`callNativeMethod`는 예를 들어 `backgroundColor`를 변경하는 커스텀 iOS 메서드이며 `MyNativeView`를 통해 노출됩니다. 이 메서드는 3개의 매개변수가 필요한 `UIManager.dispatchViewManagerCommand`를 사용합니다.

- `(nonnull NSNumber \*)reactTag`  -  React 뷰의 id.
- `commandID:(NSInteger)commandID`  -  호출해야 하는 네이티브 메서드의 Id
- `commandArgs:(NSArray<id> \*)commandArgs`  -  JS에서 네이티브로 전달할 수 있는 네이티브 메서드의 인수.

```objectivec title='RNCMyNativeViewManager.m'
#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTLog.h>

RCT_EXPORT_METHOD(callNativeMethod:(nonnull NSNumber*) reactTag) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        NativeView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[NativeView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        [view callNativeMethod];
    }];

}
```

여기서 `callNativeMethod`는 `RNCMyNativeViewManager.m` 파일에 정의되어 있으며 `(nonnull NSNumber*) reactTag`라는 하나의 매개변수만 포함합니다. 이 내보낸 함수는 `viewRegistry` 매개변수를 포함하는 `addUIBlock`을 사용하여 특정 뷰를 찾고, `reactTag`를 기반으로 컴포넌트를 반환하여 올바른 컴포넌트에서 메서드를 호출할 수 있습니다.

## 스타일

모든 네이티브 React 뷰는 `UIView`의 서브클래스이므로 대부분의 스타일 속성은 기대한 대로 바로 작동합니다. 하지만 일부 컴포넌트는 기본 스타일이 필요합니다. 예를 들어 고정 크기인 `UIDatePicker`가 그러합니다. 이 기본 스타일은 레이아웃 알고리즘이 예상대로 작동하기 위해 중요하지만, 컴포넌트를 사용할 때 기본 스타일을 재정의할 수 있어야 합니다. `DatePickerIOS`는 유연한 스타일을 가진 추가 뷰로 네이티브 컴포넌트를 감싸고, 내부 네이티브 컴포넌트에는 고정 스타일(네이티브에서 전달된 상수로 생성)을 사용하여 이를 처리합니다.

```tsx title="DatePickerIOS.ios.tsx"
import {UIManager} from 'react-native';
const RCTDatePickerIOSConsts = UIManager.RCTDatePicker.Constants;
...
  render: function() {
    return (
      <View style={this.props.style}>
        <RCTDatePickerIOS
          ref={DATEPICKER}
          style={styles.rkDatePickerIOS}
          ...
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  rkDatePickerIOS: {
    height: RCTDatePickerIOSConsts.ComponentHeight,
    width: RCTDatePickerIOSConsts.ComponentWidth,
  },
});
```

`RCTDatePickerIOSConsts` 상수는 다음과 같이 네이티브 컴포넌트의 실제 프레임을 가져와 네이티브에서 내보냅니다.

```objectivec title='RCTDatePickerManager.m'
- (NSDictionary *)constantsToExport
{
  UIDatePicker *dp = [[UIDatePicker alloc] init];
  [dp layoutIfNeeded];

  return @{
    @"ComponentHeight": @(CGRectGetHeight(dp.frame)),
    @"ComponentWidth": @(CGRectGetWidth(dp.frame)),
    @"DatePickerModes": @{
      @"time": @(UIDatePickerModeTime),
      @"date": @(UIDatePickerModeDate),
      @"datetime": @(UIDatePickerModeDateAndTime),
    }
  };
}
```

이 가이드에서는 커스텀 네이티브 컴포넌트를 브리지로 연결하는 많은 측면을 다루었지만, 서브뷰를 삽입하고 레이아웃하기 위한 커스텀 훅과 같이 고려해야 할 사항이 더 많습니다. 더 깊이 알아보려면 구현된 일부 컴포넌트의 [소스 코드](https://github.com/facebook/react-native/tree/main/packages/react-native/React/Views)를 확인하세요.
