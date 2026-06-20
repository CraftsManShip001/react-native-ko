---
id: fabric-native-components-ios
title: 'Fabric Native Components: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

이제 웹 뷰를 렌더링하기 위한 iOS 플랫폼 코드를 작성할 차례입니다. 따라야 할 단계는 다음과 같습니다.

- Codegen 실행.
- `RCTWebView` 코드 작성
- 애플리케이션에 `RCTWebView` 등록

### 1. Codegen 실행

[수동으로 실행](the-new-architecture/codegen-cli)할 수도 있지만, 컴포넌트를 데모할 애플리케이션을 통해 실행하는 것이 더 간단합니다.

```bash
cd ios
bundle install
bundle exec pod install
```

중요한 점은 Codegen의 로그 출력이 보인다는 것입니다. 이 출력을 Xcode에서 WebView 네이티브 컴포넌트를 빌드하는 데 사용할 것입니다.

:::warning
생성된 코드를 저장소에 커밋하는 것에 주의해야 합니다. 생성된 코드는 React Native의 각 버전에 종속적입니다. npm [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies)를 사용하여 React Native 버전과의 호환성을 제한하세요.
:::

### 3. `RCTWebView` 작성

다음 **5단계**를 통해 Xcode에서 iOS 프로젝트를 준비해야 합니다.

1. CocoaPods가 생성한 Xcode Workspace를 엽니다.

```bash
cd ios
open Demo.xcworkspace
```

<img className="half-size" alt="Open Xcode Workspace" src="/docs/assets/fabric-native-components/1.webp" />

2. 앱을 우클릭하고 <code>New Group</code>을 선택한 후, 새 그룹의 이름을 `WebView`로 지정합니다.

<img className="half-size" alt="Right click on app and select New Group" src="/docs/assets/fabric-native-components/2.webp" />

3. `WebView` 그룹에서 <code>New</code>→<code>File from Template</code>을 생성합니다.

<img className="half-size" alt="Create a new file using the Cocoa Touch Class template" src="/docs/assets/fabric-native-components/3.webp" />

4. <code>Objective-C File</code> 템플릿을 사용하고, 이름을 <code>RCTWebView</code>로 지정합니다.

<img className="half-size" alt="Create an Objective-C RCTWebView class" src="/docs/assets/fabric-native-components/4.webp" />

5. 4단계를 반복하여 `RCTWebView.h`라는 헤더 파일을 생성합니다.

6. <code>RCTWebView.m</code>을 <code>RCTWebView.mm</code>으로 이름을 바꿔 Objective-C++ 파일로 만듭니다.

```text title="Demo/ios"
Podfile
...
Demo
├── AppDelegate.swift
...
// highlight-start
├── RCTWebView.h
└── RCTWebView.mm
// highlight-end
```

헤더 파일과 구현 파일을 생성한 후, 구현을 시작할 수 있습니다.

다음은 컴포넌트 인터페이스를 선언하는 `RCTWebView.h` 파일의 코드입니다.

```objc title="Demo/RCTWebView/RCTWebView.h"
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTWebView : RCTViewComponentView

// You would declare native methods you'd want to access from the view here

@end

NS_ASSUME_NONNULL_END
```

이 클래스는 `RCTViewComponentView` 클래스를 상속하는 `RCTWebView`를 정의합니다. 이는 모든 네이티브 컴포넌트의 기반 클래스이며 React Native가 제공합니다.

구현 파일(`RCTWebView.mm`)의 코드는 다음과 같습니다.

```objc title="Demo/RCTWebView/RCTWebView.mm"
#import "RCTWebView.h"

#import <react/renderer/components/AppSpec/ComponentDescriptors.h>
#import <react/renderer/components/AppSpec/EventEmitters.h>
#import <react/renderer/components/AppSpec/Props.h>
#import <react/renderer/components/AppSpec/RCTComponentViewHelpers.h>
// highlight-next-line
#import <WebKit/WebKit.h>

using namespace facebook::react;

@interface RCTWebView () <RCTCustomWebViewViewProtocol, WKNavigationDelegate>
@end

@implementation RCTWebView {
  NSURL * _sourceURL;
  WKWebView * _webView;
}

-(instancetype)init
{
  if(self = [super init]) {
    // highlight-start
    _webView = [WKWebView new];
    _webView.navigationDelegate = self;
    [self addSubview:_webView];
    // highlight-end
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<CustomWebViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<CustomWebViewProps const>(props);

  // Handle your props here
  if (oldViewProps.sourceURL != newViewProps.sourceURL) {
    NSString *urlString = [NSString stringWithCString:newViewProps.sourceURL.c_str() encoding:NSUTF8StringEncoding];
    _sourceURL = [NSURL URLWithString:urlString];
    // highlight-start
    if ([self urlIsValid:newViewProps.sourceURL]) {
      [_webView loadRequest:[NSURLRequest requestWithURL:_sourceURL]];
    }
    // highlight-end
  }

  [super updateProps:props oldProps:oldProps];
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  _webView.frame = self.bounds;

}

#pragma mark - WKNavigationDelegate

// highlight-start
-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Success};
  self.eventEmitter.onScriptLoaded(result);
}

- (BOOL)urlIsValid:(std::string)propString
{
  if (propString.length() > 0 && !_sourceURL) {
    CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Error};

    self.eventEmitter.onScriptLoaded(result);
    return NO;
  }
  return YES;
}

// Event emitter convenience method
- (const CustomWebViewEventEmitter &)eventEmitter
{
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
}
// highlight-end

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
}

@end
```

이 코드는 Objective-C++로 작성되었으며 다음과 같은 다양한 세부 사항을 포함합니다.

- `@interface`는 두 가지 프로토콜을 구현합니다.
  - Codegen에 의해 생성된 `RCTCustomWebViewViewProtocol`;
  - 웹 뷰 탐색 이벤트를 처리하기 위해 WebKit 프레임워크가 제공하는 `WKNavigationDelegate`;
- `WKWebView`를 인스턴스화하고 서브뷰에 추가하며 `navigationDelegate`를 설정하는 `init` 메서드;
- 컴포넌트의 props가 변경될 때 React Native가 호출하는 `updateProps` 메서드;
- 커스텀 뷰의 레이아웃 방식을 설명하는 `layoutSubviews` 메서드;
- `WKWebView`가 페이지 로딩을 완료했을 때 처리할 내용을 다루는 `webView:didFinishNavigation:` 메서드;
- props로 받은 URL이 유효한지 확인하는 `urlIsValid:(std::string)propString` 메서드;
- 강타입 `eventEmitter` 인스턴스를 가져오는 유틸리티 메서드인 `eventEmitter`;
- Codegen이 생성한 `ComponentDescriptor`를 반환하는 `componentDescriptorProvider`;

#### WebKit 프레임워크 추가

:::note
이 단계는 웹 뷰를 생성하기 때문에만 필요합니다. iOS의 웹 컴포넌트는 Apple이 제공하는 WebKit 프레임워크에 링크되어야 합니다. 컴포넌트가 웹 특정 기능에 접근할 필요가 없다면 이 단계를 건너뛸 수 있습니다.
:::

웹 뷰는 Apple이 Xcode 및 기기와 함께 제공하는 프레임워크 중 하나인 WebKit을 통해 제공되는 일부 기능에 접근해야 합니다.
`RCTWebView.mm`에 추가된 `#import <WebKit/WebKit.h>` 줄을 통해 네이티브 코드에서 확인할 수 있습니다.

앱에서 WebKit 프레임워크를 링크하려면 다음 단계를 따르세요.

1. Xcode에서 프로젝트를 클릭합니다.
2. 앱 타겟을 선택합니다.
3. General 탭을 선택합니다.
4. _"Frameworks, Libraries, and Embedded Contents"_ 섹션을 찾을 때까지 아래로 스크롤한 후 `+` 버튼을 누릅니다.

<img className="half-size" alt="Add webkit framework to your app 1" src="/docs/assets/AddWebKitFramework1.png" />

5. 검색창에서 WebKit으로 필터링합니다.
6. WebKit 프레임워크를 선택합니다.
7. Add를 클릭합니다.

<img className="half-size" alt="Add webkit framework to your app 2" src="/docs/assets/AddWebKitFramework2.png" />
