---
id: native-modules-ios
title: iOS Native Modules
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<NativeDeprecated />

iOS 네이티브 모듈에 오신 것을 환영합니다. 네이티브 모듈이 무엇인지에 대한 소개는 [네이티브 모듈 소개](native-modules-intro)를 먼저 읽어보세요.

## Calendar 네이티브 모듈 만들기

다음 가이드에서는 JavaScript에서 Apple의 캘린더 API에 접근할 수 있게 해주는 네이티브 모듈 `CalendarModule`을 만들어보겠습니다. 가이드가 끝나면 JavaScript에서 `CalendarModule.createCalendarEvent('Dinner Party', 'My House');`를 호출하여 캘린더 이벤트를 생성하는 네이티브 메서드를 실행할 수 있게 됩니다.

### 설정

시작하려면 Xcode에서 React Native 애플리케이션 내의 iOS 프로젝트를 여세요. React Native 앱에서 iOS 프로젝트는 다음 위치에 있습니다.

<figure>
  <img src="/docs/assets/native-modules-ios-open-project.png" width="500" alt="Image of opening up an iOS project within a React Native app inside of Xcode." />
  <figcaption>iOS 프로젝트를 찾을 수 있는 위치</figcaption>
</figure>

네이티브 코드를 작성할 때는 Xcode를 사용하는 것을 권장합니다. Xcode는 iOS 개발을 위해 만들어졌으며, 코드 문법과 같은 사소한 에러를 빠르게 해결하는 데 도움이 됩니다.

### 커스텀 네이티브 모듈 파일 만들기

첫 번째 단계는 주요 커스텀 네이티브 모듈 헤더 파일과 구현 파일을 만드는 것입니다. `RCTCalendarModule.h`라는 새 파일을 만드세요.

<figure>
  <img src="/docs/assets/native-modules-ios-add-class.png" width="500" alt="Image of creating a class called  RCTCalendarModule.h." />
  <figcaption>AppDelegate와 같은 폴더에 커스텀 네이티브 모듈 파일을 만드는 방법</figcaption>
</figure>

그리고 다음 내용을 추가하세요.

```objectivec
//  RCTCalendarModule.h
#import <React/RCTBridgeModule.h>
@interface RCTCalendarModule : NSObject <RCTBridgeModule>
@end

```

캘린더 네이티브 모듈을 만들고 있으므로 클래스 이름을 `RCTCalendarModule`로 지정합니다. 빌드하는 네이티브 모듈에 맞는 이름을 자유롭게 사용할 수 있습니다. Java나 C++과 달리 ObjC는 언어 수준의 네임스페이스 지원이 없기 때문에, 관례적으로 클래스 이름 앞에 하위 문자열을 붙입니다. 이는 애플리케이션 이름이나 인프라 이름의 약자일 수 있습니다. 이 예시에서 RCT는 React를 의미합니다.

아래에서 볼 수 있듯이, CalendarModule 클래스는 `RCTBridgeModule` 프로토콜을 구현합니다. 네이티브 모듈은 `RCTBridgeModule` 프로토콜을 구현하는 Objective-C 클래스입니다.

다음으로 네이티브 모듈 구현을 시작합니다. Xcode에서 cocoa touch class를 사용하여 같은 폴더에 해당 구현 파일 `RCTCalendarModule.m`을 만들고 다음 내용을 추가하세요.

```objectivec
// RCTCalendarModule.m
#import "RCTCalendarModule.h"

@implementation RCTCalendarModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

@end

```

### 모듈 이름

현재 `RCTCalendarModule.m` 네이티브 모듈에는 네이티브 모듈 클래스를 React Native에 내보내고 등록하는 `RCT_EXPORT_MODULE` 매크로만 포함되어 있습니다. `RCT_EXPORT_MODULE` 매크로는 JavaScript 코드에서 모듈에 접근할 때 사용할 이름을 지정하는 선택적 인수도 받습니다.

이 인수는 문자열 리터럴이 아닙니다. 아래 예시에서는 `RCT_EXPORT_MODULE("CalendarModuleFoo")`가 아니라 `RCT_EXPORT_MODULE(CalendarModuleFoo)`가 전달됩니다.

```objectivec
// To export a module named CalendarModuleFoo
RCT_EXPORT_MODULE(CalendarModuleFoo);
```

그러면 JS에서 다음과 같이 네이티브 모듈에 접근할 수 있습니다.

```tsx
const {CalendarModuleFoo} = ReactNative.NativeModules;
```

이름을 지정하지 않으면 JavaScript 모듈 이름이 "RCT" 또는 "RK" 접두사가 제거된 Objective-C 클래스 이름과 일치합니다.

아래 예시를 따라 인수 없이 `RCT_EXPORT_MODULE`을 호출합니다. 결과적으로 모듈은 RCT가 제거된 Objective-C 클래스 이름인 `CalendarModule`이라는 이름으로 React Native에 노출됩니다.

```objectivec
// Without passing in a name this will export the native module name as the Objective-C class name with "RCT" removed
RCT_EXPORT_MODULE();
```

그러면 JS에서 다음과 같이 네이티브 모듈에 접근할 수 있습니다.

```tsx
const {CalendarModule} = ReactNative.NativeModules;
```

### JavaScript에 네이티브 메서드 내보내기

React Native는 명시적으로 지시하지 않는 한 네이티브 모듈의 어떤 메서드도 JavaScript에 노출하지 않습니다. `RCT_EXPORT_METHOD` 매크로를 사용하여 노출할 수 있습니다. `RCT_EXPORT_METHOD` 매크로로 작성된 메서드는 비동기적이며 반환 타입은 항상 void입니다. `RCT_EXPORT_METHOD` 메서드에서 JavaScript로 결과를 전달하려면 콜백이나 이벤트 emit을 사용할 수 있습니다(아래에서 다룹니다). `RCT_EXPORT_METHOD` 매크로를 사용하여 `CalendarModule` 네이티브 모듈의 네이티브 메서드를 설정해봅시다. 이름을 `createCalendarEvent()`로 지정하고, 지금은 이름과 위치를 문자열로 받도록 합니다. 인수 타입 옵션은 곧 다룰 것입니다.

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
}
```

:::note
`RCT_EXPORT_METHOD` 매크로는 메서드가 RCT 인수 변환에 의존하지 않는 한 TurboModules에서는 필요하지 않습니다(아래 인수 타입 참조). 궁극적으로 React Native는 `RCT_EXPORT_MACRO,`를 제거할 예정이므로 `RCTConvert` 사용을 권장하지 않습니다. 대신 메서드 본문 내에서 인수 변환을 수행할 수 있습니다.
:::

`createCalendarEvent()` 메서드의 기능을 구현하기 전에, React Native 애플리케이션의 JavaScript에서 호출되었는지 확인할 수 있도록 메서드에 콘솔 로그를 추가합니다. React의 `RCTLog` API를 사용합니다. 파일 상단에 해당 헤더를 임포트한 다음 로그 호출을 추가하세요.

```objectivec
#import <React/RCTLog.h>
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
{
 RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}
```

### 동기 메서드

`RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD`를 사용하여 동기 네이티브 메서드를 만들 수 있습니다.

```objectivec
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getName)
{
return [[UIDevice currentDevice] name];
}
```

이 메서드의 반환 타입은 객체 타입(id)이어야 하며 JSON으로 직렬화 가능해야 합니다. 즉 훅은 nil 또는 JSON 값(예: NSNumber, NSString, NSArray, NSDictionary)만 반환할 수 있습니다.

현재로서는 동기 메서드 사용을 권장하지 않습니다. 메서드를 동기적으로 호출하면 심각한 성능 저하가 발생하고 네이티브 모듈에 스레딩 관련 버그가 생길 수 있기 때문입니다. 또한 `RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD`를 사용하면 앱에서 Google Chrome 디버거를 더 이상 사용할 수 없다는 점에 유의하세요. 이는 동기 메서드가 JS VM과 앱 사이의 메모리 공유를 필요로 하기 때문입니다. Google Chrome 디버거를 사용할 때 React Native는 Google Chrome 내의 JS VM에서 실행되며 WebSocket을 통해 모바일 기기와 비동기로 통신합니다.

### 빌드 결과 테스트하기

이 시점에서 iOS의 네이티브 모듈에 대한 기본 스캐폴딩을 설정했습니다. 네이티브 모듈에 접근하고 JavaScript에서 내보낸 메서드를 호출하여 테스트해보세요.

애플리케이션에서 네이티브 모듈의 `createCalendarEvent()` 메서드 호출을 추가하고 싶은 위치를 찾으세요. 아래는 앱에 추가할 수 있는 컴포넌트 `NewModuleButton`의 예시입니다. `NewModuleButton`의 `onPress()` 함수 안에서 네이티브 모듈을 호출할 수 있습니다.

```tsx
import {Button} from 'react-native';

const NewModuleButton = () => {
  const onPress = () => {
    console.log('We will invoke the native module here!');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
```

JavaScript에서 네이티브 모듈에 접근하려면 먼저 React Native에서 `NativeModules`를 임포트해야 합니다.

```tsx
import {NativeModules} from 'react-native';
```

그런 다음 `NativeModules`에서 `CalendarModule` 네이티브 모듈에 접근할 수 있습니다.

```tsx
const {CalendarModule} = NativeModules;
```

이제 CalendarModule 네이티브 모듈을 사용할 수 있으므로 네이티브 메서드 `createCalendarEvent()`를 호출할 수 있습니다. 아래에서 `NewModuleButton`의 `onPress()` 메서드에 추가합니다.

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent('testName', 'testLocation');
};
```

마지막 단계는 최신 네이티브 코드(새 네이티브 모듈 포함!)를 사용할 수 있도록 React Native 앱을 다시 빌드하는 것입니다. React Native 애플리케이션이 위치한 커맨드라인에서 다음을 실행하세요.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios
```

</TabItem>
</Tabs>

### 반복하며 빌드하기

이 가이드를 진행하면서 네이티브 모듈을 반복 작업할 때는, JavaScript에서 최신 변경사항에 접근하려면 애플리케이션을 네이티브 방식으로 다시 빌드해야 합니다. 작성 중인 코드가 애플리케이션의 네이티브 부분에 위치하기 때문입니다. React Native의 metro 번들러는 JavaScript 변경사항을 감시하고 JS 번들을 즉시 재빌드하지만, 네이티브 코드에 대해서는 그렇게 하지 않습니다. 따라서 최신 네이티브 변경사항을 테스트하려면 위의 명령을 사용하여 다시 빌드해야 합니다.

### 요약✨

이제 JavaScript에서 네이티브 모듈의 `createCalendarEvent()` 메서드를 호출할 수 있어야 합니다. 함수에서 `RCTLog`를 사용하고 있으므로, [앱에서 디버그 모드를 활성화](https://reactnative.dev/docs/debugging#chrome-developer-tools)하고 Chrome의 JS 콘솔이나 모바일 앱 디버거 Flipper에서 확인하여 네이티브 메서드가 호출되고 있는지 검증할 수 있습니다. 네이티브 모듈 메서드를 호출할 때마다 `RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);` 메시지가 표시되어야 합니다.

<figure>
  <img src="/docs/assets/native-modules-ios-logs.png" width="1000" alt="Image of logs." />
  <figcaption>Flipper의 iOS 로그</figcaption>
</figure>

이 시점에서 iOS 네이티브 모듈을 만들고 React Native 애플리케이션의 JavaScript에서 해당 모듈의 메서드를 호출했습니다. 네이티브 모듈 메서드가 받는 인수 타입, 네이티브 모듈 내에서 콜백 및 Promise 설정 방법 등에 대해 더 알아볼 수 있습니다.

## Calendar 네이티브 모듈을 넘어서

### 더 나은 네이티브 모듈 내보내기

위처럼 `NativeModules`에서 네이티브 모듈을 꺼내 임포트하는 방식은 다소 번거롭습니다.

네이티브 모듈 사용자가 매번 이 작업을 할 필요가 없도록 모듈을 위한 JavaScript 래퍼를 만들 수 있습니다. 다음 내용으로 NativeCalendarModule.js라는 새 JavaScript 파일을 만드세요.

```tsx
/**
* This exposes the native CalendarModule module as a JS module. This has a
* function 'createCalendarEvent' which takes the following parameters:

* 1. String name: A string representing the name of the event
* 2. String location: A string representing the location of the event
*/
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
export default CalendarModule;
```

이 JavaScript 파일은 JavaScript 측 기능을 추가하기에도 좋은 위치입니다. 예를 들어 TypeScript와 같은 타입 시스템을 사용한다면 여기에 네이티브 모듈에 대한 타입 어노테이션을 추가할 수 있습니다. React Native는 아직 네이티브에서 JS로의 타입 안전성을 지원하지 않지만, 이러한 타입 어노테이션을 통해 모든 JS 코드가 타입-세이프해집니다. 이는 향후 타입-세이프 네이티브 모듈로 전환하기도 더 쉽게 해줍니다. 아래는 Calendar Module에 타입 안전성을 추가하는 예시입니다.

```tsx
/**
 * This exposes the native CalendarModule module as a JS module. This has a
 * function 'createCalendarEvent' which takes the following parameters:
 *
 * 1. String name: A string representing the name of the event
 * 2. String location: A string representing the location of the event
 */
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
interface CalendarInterface {
  createCalendarEvent(name: string, location: string): void;
}
export default CalendarModule as CalendarInterface;
```

다른 JavaScript 파일에서는 다음과 같이 네이티브 모듈에 접근하고 메서드를 호출할 수 있습니다.

```tsx
import NativeCalendarModule from './NativeCalendarModule';
NativeCalendarModule.createCalendarEvent('foo', 'bar');
```

:::note
이 코드는 `CalendarModule`을 임포트하는 위치가 `NativeCalendarModule.js`와 같은 계층 구조에 있다고 가정합니다. 필요에 따라 상대 경로 임포트를 업데이트하세요.
:::

### 인수 타입

네이티브 모듈 메서드가 JavaScript에서 호출되면, React Native는 JS 객체의 인수를 Objective-C/Swift 객체 형태로 변환합니다. 예를 들어 Objective-C 네이티브 모듈 메서드가 NSNumber를 받는다면, JS에서는 숫자로 메서드를 호출해야 합니다. React Native가 변환을 처리합니다. 아래는 네이티브 모듈 메서드에서 지원하는 인수 타입과 이에 매핑되는 JavaScript 동등 타입 목록입니다.

| Objective-C                                   | JavaScript         |
| --------------------------------------------- | ------------------ |
| NSString                                      | string, ?string    |
| BOOL                                          | boolean            |
| double                                        | number             |
| NSNumber                                      | ?number            |
| NSArray                                       | Array, ?Array      |
| NSDictionary                                  | Object, ?Object    |
| RCTResponseSenderBlock                        | Function (success) |
| RCTResponseSenderBlock, RCTResponseErrorBlock | Function (failure) |
| RCTPromiseResolveBlock, RCTPromiseRejectBlock | Promise            |

:::info
다음 타입은 현재 지원되지만 TurboModules에서는 지원되지 않을 예정입니다. 사용을 피하세요.

- Function (failure) -> RCTResponseErrorBlock
- Number -> NSInteger
- Number -> CGFloat
- Number -> float
  :::

iOS의 경우, `RCTConvert` 클래스에서 지원하는 모든 인수 타입으로 네이티브 모듈 메서드를 작성할 수도 있습니다(지원 목록은 [RCTConvert](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTConvert.h) 참조). RCTConvert 헬퍼 함수는 모두 JSON 값을 입력으로 받고 네이티브 Objective-C 타입 또는 클래스에 매핑합니다.

### 상수 내보내기

네이티브 모듈은 네이티브 메서드 `constantsToExport()`를 오버라이드하여 상수를 내보낼 수 있습니다. 아래에서 `constantsToExport()`를 오버라이드하고, JavaScript에서 다음과 같이 접근할 수 있는 기본 이벤트 이름 속성이 포함된 Dictionary를 반환합니다.

```objectivec
- (NSDictionary *)constantsToExport
{
 return @{ @"DEFAULT_EVENT_NAME": @"New Event" };
}
```

그런 다음 JS에서 네이티브 모듈의 `getConstants()`를 호출하여 상수에 접근할 수 있습니다.

```tsx
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
console.log(DEFAULT_EVENT_NAME);
```

기술적으로는 `constantsToExport()`에서 내보낸 상수를 `NativeModule` 객체에서 직접 접근할 수도 있습니다. 그러나 이는 TurboModules에서 더 이상 지원되지 않으므로, 향후 필요한 마이그레이션을 피하기 위해 위의 접근 방식으로 전환할 것을 권장합니다.

:::note
상수는 초기화 시에만 내보내집니다. 따라서 런타임에 `constantsToExport()` 값을 변경해도 JavaScript 환경에는 반영되지 않습니다.
:::

iOS의 경우, `constantsToExport()`를 오버라이드하면 JavaScript 코드가 실행되기 전에 모듈을 메인 스레드에서 초기화해야 하는지 React Native에 알리기 위해 `+ requiresMainQueueSetup`도 구현해야 합니다. 그렇지 않으면 향후 `+ requiresMainQueueSetup:`으로 명시적으로 옵트아웃하지 않으면 모듈이 백그라운드 스레드에서 초기화될 수 있다는 경고가 표시됩니다. 모듈이 UIKit에 접근할 필요가 없다면 `+ requiresMainQueueSetup`에 NO로 응답해야 합니다.

### 콜백

네이티브 모듈은 콜백이라는 특별한 종류의 인수도 지원합니다. 콜백은 비동기 메서드에서 Objective-C에서 JavaScript로 데이터를 전달하는 데 사용됩니다. 네이티브 측에서 비동기적으로 JS를 실행하는 데도 사용할 수 있습니다.

iOS에서 콜백은 `RCTResponseSenderBlock` 타입을 사용하여 구현됩니다. 아래에서 콜백 파라미터 `myCallBack`이 `createCalendarEventMethod()`에 추가됩니다.

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
                location:(NSString *)location
                myCallback:(RCTResponseSenderBlock)callback)

```

그런 다음 배열에 담아 JavaScript로 전달하려는 결과를 제공하여 네이티브 함수에서 콜백을 호출할 수 있습니다. `RCTResponseSenderBlock`은 JavaScript 콜백에 전달할 파라미터 배열 하나만 받습니다. 아래에서는 이전 호출에서 생성된 이벤트의 ID를 반환합니다.

:::info
콜백은 네이티브 함수가 완료된 직후에 호출되지 않는다는 점을 강조하는 것이 중요합니다. 통신이 비동기적으로 이루어짐을 기억하세요.
:::

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
 NSInteger eventId = ...
 callback(@[@(eventId)]);

 RCTLogInfo(@"Pretending to create an event %@ at %@", title, location);
}

```

그러면 JavaScript에서 다음을 사용하여 이 메서드에 접근할 수 있습니다.

```tsx
const onSubmit = () => {
  CalendarModule.createCalendarEvent(
    'Party',
    '04-12-2020',
    eventId => {
      console.log(`Created a new event with id ${eventId}`);
    },
  );
};
```

네이티브 모듈은 콜백을 한 번만 호출해야 합니다. 단, 콜백을 저장해두었다가 나중에 호출할 수 있습니다. 이 패턴은 delegate가 필요한 iOS API를 래핑하는 데 자주 사용됩니다. 예시는 [`RCTAlertManager`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/CoreModules/RCTAlertManager.mm)를 참조하세요. 콜백이 한 번도 호출되지 않으면 메모리 누수가 발생합니다.

콜백으로 에러를 처리하는 방법에는 두 가지가 있습니다. 첫 번째는 Node의 관례를 따라 콜백 배열에 전달된 첫 번째 인수를 에러 객체로 처리하는 것입니다.

```objectivec
RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title location:(NSString *)location callback: (RCTResponseSenderBlock)callback)
{
  NSNumber *eventId = [NSNumber numberWithInt:123];
  callback(@[[NSNull null], eventId]);
}
```

그런 다음 JavaScript에서 첫 번째 인수를 확인하여 에러가 전달되었는지 확인할 수 있습니다.

```tsx
const onPress = () => {
  CalendarModule.createCalendarEventCallback(
    'testName',
    'testLocation',
    (error, eventId) => {
      if (error) {
        console.error(`Error found! ${error}`);
      }
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

또 다른 방법은 onFailure와 onSuccess 두 개의 별도 콜백을 사용하는 것입니다.

```objectivec
RCT_EXPORT_METHOD(createCalendarEventCallback:(NSString *)title
                  location:(NSString *)location
                  errorCallback: (RCTResponseSenderBlock)errorCallback
                  successCallback: (RCTResponseSenderBlock)successCallback)
{
  @try {
    NSNumber *eventId = [NSNumber numberWithInt:123];
    successCallback(@[eventId]);
  }

  @catch ( NSException *e ) {
    errorCallback(@[e]);
  }
}
```

그러면 JavaScript에서 에러와 성공 응답에 대해 별도의 콜백을 추가할 수 있습니다.

```tsx
const onPress = () => {
  CalendarModule.createCalendarEventCallback(
    'testName',
    'testLocation',
    error => {
      console.error(`Error found! ${error}`);
    },
    eventId => {
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

JavaScript로 에러와 유사한 객체를 전달하려면 [`RCTUtils.h.`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTUtils.h)의 `RCTMakeError`를 사용하세요. 현재는 Error 형태의 딕셔너리만 JavaScript에 전달하지만, React Native는 향후 자동으로 실제 JavaScript Error 객체를 생성하는 것을 목표로 합니다. `NSError \* object`를 받는 에러 콜백으로 사용되는 `RCTResponseErrorBlock` 인수를 제공할 수도 있습니다. 이 인수 타입은 TurboModules에서 지원되지 않을 예정입니다.

### Promise

네이티브 모듈은 Promise를 이행할 수도 있으며, 특히 ES2016의 `async/await` 문법을 사용할 때 JavaScript를 단순화할 수 있습니다. 네이티브 모듈 메서드의 마지막 파라미터가 `RCTPromiseResolveBlock`과 `RCTPromiseRejectBlock`인 경우, 해당 JS 메서드는 JS Promise 객체를 반환합니다.

위 코드를 콜백 대신 Promise를 사용하도록 리팩터링하면 다음과 같습니다.

```objectivec
RCT_EXPORT_METHOD(createCalendarEvent:(NSString *)title
                 location:(NSString *)location
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
 NSInteger eventId = createCalendarEvent();
 if (eventId) {
    resolve(@(eventId));
  } else {
    reject(@"event_failure", @"no event id returned", nil);
  }
}

```

이 메서드의 JavaScript 대응 부분은 Promise를 반환합니다. 즉 async 함수 내에서 `await` 키워드를 사용하여 호출하고 결과를 기다릴 수 있습니다.

```tsx
const onSubmit = async () => {
  try {
    const eventId = await CalendarModule.createCalendarEvent(
      'Party',
      'my house',
    );
    console.log(`Created a new event with id ${eventId}`);
  } catch (e) {
    console.error(e);
  }
};
```

### JavaScript로 이벤트 보내기

네이티브 모듈은 직접 호출되지 않고도 JavaScript에 이벤트를 신호로 보낼 수 있습니다. 예를 들어 네이티브 iOS 캘린더 앱의 캘린더 이벤트가 곧 발생한다는 알림을 JavaScript에 보내고 싶을 수 있습니다. 이를 수행하는 권장 방법은 `RCTEventEmitter`를 서브클래싱하고 `supportedEvents`를 구현하고 self의 `sendEventWithName`을 호출하는 것입니다.

`RCTEventEmitter`를 임포트하고 `RCTEventEmitter`를 서브클래싱하도록 헤더 클래스를 업데이트하세요.

```objectivec
//  CalendarModule.h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface CalendarModule : RCTEventEmitter <RCTBridgeModule>
@end

```

JavaScript 코드는 모듈 주위에 새 `NativeEventEmitter` 인스턴스를 생성하여 이러한 이벤트를 구독할 수 있습니다.

리스너가 없는 상태에서 이벤트를 emit하여 불필요하게 리소스를 소모하면 경고가 표시됩니다. 이를 방지하고 모듈의 작업 부하를 최적화(예: 업스트림 알림 구독 취소 또는 백그라운드 태스크 일시 중지)하려면 `RCTEventEmitter` 서브클래스에서 `startObserving`과 `stopObserving`을 오버라이드할 수 있습니다.

```objectivec
@implementation CalendarModule
{
  bool hasListeners;
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  if (hasListeners) {// Only send events if anyone is listening
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  }
}

```

### 스레딩

네이티브 모듈이 자체 메서드 큐를 제공하지 않는 한, 어떤 스레드에서 호출되는지에 대한 가정을 하지 않아야 합니다. 현재 네이티브 모듈이 메서드 큐를 제공하지 않으면 React Native가 별도의 GCD 큐를 생성하고 해당 큐에서 메서드를 호출합니다. 이는 구현 세부 사항이며 변경될 수 있습니다. 네이티브 모듈에 대해 메서드 큐를 명시적으로 제공하려면 네이티브 모듈에서 `(dispatch_queue_t) methodQueue` 메서드를 오버라이드하세요. 예를 들어 메인 스레드 전용 iOS API를 사용해야 하는 경우 다음과 같이 지정해야 합니다.

```objectivec
- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
```

마찬가지로, 작업 완료에 오랜 시간이 걸릴 수 있는 경우 네이티브 모듈은 작업을 실행할 자체 큐를 지정할 수 있습니다. 현재 React Native는 네이티브 모듈에 별도의 메서드 큐를 제공하지만, 이는 의존해서는 안 되는 구현 세부 사항입니다. 자체 메서드 큐를 제공하지 않으면 향후 네이티브 모듈의 장시간 실행 작업이 다른 관련 없는 네이티브 모듈에서 실행 중인 비동기 호출을 차단할 수 있습니다. 예를 들어 여기서 `RCTAsyncLocalStorage` 모듈은 자체 큐를 생성하여 React 큐가 잠재적으로 느린 디스크 접근을 기다리며 차단되지 않도록 합니다.

```objectivec
- (dispatch_queue_t)methodQueue
{
 return dispatch_queue_create("com.facebook.React.AsyncLocalStorageQueue", DISPATCH_QUEUE_SERIAL);
}
```

지정된 `methodQueue`는 모듈의 모든 메서드에서 공유됩니다. 메서드 중 하나만 장시간 실행되는 경우(또는 다른 이유로 다른 메서드와 다른 큐에서 실행해야 하는 경우), 메서드 내부에서 `dispatch_async`를 사용하여 다른 큐에서 특정 메서드의 코드를 수행할 수 있으며, 이는 다른 메서드에 영향을 주지 않습니다.

```objectivec
RCT_EXPORT_METHOD(doSomethingExpensive:(NSString *)param callback:(RCTResponseSenderBlock)callback)
{
 dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
   // Call long-running code on background thread
   ...
   // You can invoke callback from any thread/queue
   callback(@[...]);
 });
}

```

:::info[Sharing dispatch queues between modules]
`methodQueue` 메서드는 모듈이 초기화될 때 한 번 호출되며 이후 React Native가 보유합니다. 따라서 모듈 내에서 큐를 사용하려는 경우가 아니라면 큐에 대한 참조를 직접 유지할 필요가 없습니다. 단, 여러 모듈 간에 동일한 큐를 공유하려면 각 모듈에 대해 동일한 큐 인스턴스를 보유하고 반환하는지 확인해야 합니다.
:::

### 의존성 주입

React Native는 등록된 모든 네이티브 모듈을 자동으로 생성하고 초기화합니다. 그러나 의존성을 주입하기 위해 자체 모듈 인스턴스를 직접 만들고 초기화하고 싶을 수도 있습니다.

이를 위해 `RCTBridgeDelegate` 프로토콜을 구현하는 클래스를 만들고, 해당 delegate를 인수로 `RCTBridge`를 초기화한 다음, 초기화된 브리지로 `RCTRootView`를 초기화할 수 있습니다.

```objectivec
id<RCTBridgeDelegate> moduleInitialiser = [[classThatImplementsRCTBridgeDelegate alloc] init];

RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:moduleInitialiser launchOptions:nil];

RCTRootView *rootView = [[RCTRootView alloc]
                        initWithBridge:bridge
                            moduleName:kModuleName
                     initialProperties:nil];
```

### Swift 내보내기

Swift는 매크로를 지원하지 않으므로 React Native 내에서 JavaScript에 네이티브 모듈과 메서드를 노출하려면 다소 더 많은 설정이 필요합니다. 그러나 작동 방식은 거의 동일합니다. Swift 클래스로 동일한 `CalendarModule`이 있다고 가정해봅시다.

```swift
// CalendarModule.swift

@objc(CalendarModule)
class CalendarModule: NSObject {

 @objc(addEvent:location:date:)
 func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
   // Date is ready to use!
 }

 @objc
 func constantsToExport() -> [String: Any]! {
   return ["someKey": "someValue"]
 }

}
```

:::note
클래스와 함수가 Objective-C 런타임에 올바르게 내보내지도록 `@objc` 수식어를 사용하는 것이 중요합니다.
:::

그런 다음 필요한 정보를 React Native에 등록할 프라이빗 구현 파일을 만드세요.

```objectivec
// CalendarModuleBridge.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarModule, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)

@end
```

Swift와 Objective-C를 처음 접하는 분들을 위해, [iOS 프로젝트에서 두 언어를 혼합](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html)할 때는 Objective-C 파일을 Swift에 노출하는 브리징 헤더라고 불리는 추가 브리징 파일도 필요합니다. Xcode의 `File>New File` 메뉴 옵션을 통해 앱에 Swift 파일을 추가하면 Xcode가 이 헤더 파일을 생성해 주겠다고 제안합니다. 이 헤더 파일에서 `RCTBridgeModule.h`를 임포트해야 합니다.

```objectivec
// CalendarModule-Bridging-Header.h
#import <React/RCTBridgeModule.h>
```

`RCT_EXTERN_REMAP_MODULE`과 `_RCT_EXTERN_REMAP_METHOD`를 사용하여 내보내는 모듈이나 메서드의 JavaScript 이름을 변경할 수도 있습니다. 자세한 내용은 [`RCTBridgeModule`](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTBridgeModule.h)을 참조하세요.

:::note
서드파티 모듈을 만들 때 중요한 점: Swift를 포함한 정적 라이브러리는 Xcode 9 이상에서만 지원됩니다. 모듈에 포함하는 iOS 정적 라이브러리에서 Swift를 사용할 때 Xcode 프로젝트가 빌드되려면 메인 앱 프로젝트 자체에 Swift 코드와 브리징 헤더가 포함되어 있어야 합니다. 앱 프로젝트에 Swift 코드가 없는 경우, 빈 .swift 파일 하나와 빈 브리징 헤더를 추가하는 것이 해결 방법이 될 수 있습니다.
:::

### 예약된 메서드 이름

#### invalidate()

네이티브 모듈은 `invalidate()` 메서드를 구현하여 iOS의 [RCTInvalidating](https://github.com/facebook/react-native/blob/main/packages/react-native/React/Base/RCTInvalidating.h) 프로토콜을 준수할 수 있습니다. 이 메서드는 네이티브 브리지가 무효화될 때(예: devmode 리로드 시) [호출될 수 있습니다](https://github.com/facebook/react-native/blob/0.62-stable/ReactCommon/turbomodule/core/platform/ios/RCTTurboModuleManager.mm#L456). 네이티브 모듈에 필요한 정리 작업을 수행하기 위해 필요에 따라 이 메커니즘을 사용하세요.
