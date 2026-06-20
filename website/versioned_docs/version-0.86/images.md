---
id: images
title: Images
---

## 정적 이미지 리소스

React Native는 Android 및 iOS 앱에서 이미지와 기타 미디어 에셋을 관리하는 통합된 방법을 제공합니다. 앱에 정적 이미지를 추가하려면 소스 코드 트리의 어딘가에 파일을 배치하고 다음과 같이 참조하세요.

```tsx
<Image source={require('./my-icon.png')} />
```

이미지 이름은 JS 모듈이 해석되는 방식과 동일하게 처리됩니다. 위 예시에서 번들러는 해당 컴포넌트와 동일한 폴더에서 `my-icon.png`를 찾습니다.

다양한 화면 밀도에 맞는 이미지를 제공하기 위해 `@2x` 및 `@3x` 접미사를 사용할 수 있습니다. 다음과 같은 파일 구조가 있다면:

```
.
├── button.js
└── img
    ├── check.png
    ├── check@2x.png
    └── check@3x.png
```

...그리고 `button.js` 코드에 다음이 포함되어 있을 때:

```tsx
<Image source={require('./img/check.png')} />
```

...번들러는 기기의 화면 밀도에 맞는 이미지를 번들링하여 제공합니다. 예를 들어, iPhone 7에서는 `check@2x.png`가 사용되고, iPhone 7 Plus 또는 Nexus 5에서는 `check@3x.png`가 사용됩니다. 화면 밀도에 맞는 이미지가 없는 경우 가장 근접한 옵션이 선택됩니다.

Windows에서는 프로젝트에 새 이미지를 추가할 경우 번들러를 다시 시작해야 할 수 있습니다.

이 방식의 장점은 다음과 같습니다:

1. Android와 iOS에서 동일한 시스템을 사용합니다.
2. 이미지가 JavaScript 코드와 동일한 폴더에 위치합니다. 컴포넌트가 자체적으로 완결됩니다.
3. 전역 네임스페이스가 없으므로 이름 충돌을 걱정할 필요가 없습니다.
4. 실제로 사용되는 이미지만 앱에 패키징됩니다.
5. 이미지를 추가하거나 변경할 때 앱을 다시 컴파일할 필요 없이 시뮬레이터를 평소처럼 새로 고침할 수 있습니다.
6. 번들러가 이미지 크기를 알고 있으므로 코드에서 중복 지정할 필요가 없습니다.
7. 이미지를 [npm](https://www.npmjs.com/) 패키지를 통해 배포할 수 있습니다.

이 기능이 동작하려면 `require`의 이미지 이름이 정적으로 알려져 있어야 합니다.

```tsx
// GOOD
<Image source={require('./my-icon.png')} />;

// BAD
const icon = this.props.active
  ? 'my-icon-active'
  : 'my-icon-inactive';
<Image source={require('./' + icon + '.png')} />;

// GOOD
const icon = this.props.active
  ? require('./my-icon-active.png')
  : require('./my-icon-inactive.png');
<Image source={icon} />;
```

이 방식으로 참조된 이미지 소스에는 Image의 크기(너비, 높이) 정보가 포함됩니다. 이미지를 동적으로 스케일링해야 하는 경우(예: flex를 통해), 스타일 속성에 `{width: undefined, height: undefined}`를 수동으로 설정해야 할 수 있습니다.

## 정적 비이미지 리소스

위에서 설명한 `require` 문법은 오디오, 비디오 또는 문서 파일을 프로젝트에 정적으로 포함하는 데에도 사용할 수 있습니다. `.mp3`, `.wav`, `.mp4`, `.mov`, `.html`, `.pdf` 등 대부분의 일반적인 파일 형식이 지원됩니다. 전체 목록은 [번들러 기본값](https://github.com/facebook/metro/blob/main/packages/metro-config/src/defaults/defaults.js#L16-L51)을 참조하세요.

[Metro 설정](https://metrobundler.dev/docs/configuration)의 [`assetExts` 리졸버 옵션](https://metrobundler.dev/docs/configuration#resolver-options)을 추가하여 다른 형식도 지원할 수 있습니다.

한 가지 주의할 점은, 비이미지 에셋에는 현재 크기 정보가 전달되지 않으므로 비디오는 `flexGrow` 대신 절대 위치 지정을 사용해야 한다는 것입니다. 이 제한은 Xcode 또는 Android의 Assets 폴더에 직접 연결된 비디오에는 해당되지 않습니다.

## 하이브리드 앱 리소스에서의 이미지

하이브리드 앱을 개발 중인 경우(일부 UI는 React Native, 일부 UI는 플랫폼 코드로 구성) 앱에 이미 번들링된 이미지를 계속 사용할 수 있습니다.

Xcode 에셋 카탈로그나 Android drawable 폴더에 포함된 이미지는 확장자 없이 이미지 이름을 사용하세요:

```tsx
<Image
  source={{uri: 'app_icon'}}
  style={{width: 40, height: 40}}
/>
```

Android assets 폴더의 이미지는 `asset:/` 스킴을 사용하세요:

```tsx
<Image
  source={{uri: 'asset:/app_icon.png'}}
  style={{width: 40, height: 40}}
/>
```

이 방식은 안전 검사를 제공하지 않습니다. 해당 이미지가 애플리케이션에서 사용 가능한지 직접 보장해야 합니다. 또한 이미지 크기를 수동으로 지정해야 합니다.

## 네트워크 이미지

앱에 표시할 이미지의 상당수는 컴파일 타임에 사용할 수 없거나, 바이너리 크기를 줄이기 위해 일부를 동적으로 로드해야 할 수 있습니다. 정적 리소스와 달리 _이미지의 크기를 수동으로 지정해야 합니다_. iOS에서 [App Transport Security](publishing-to-app-store.md) 요구사항을 충족하기 위해 https를 사용하는 것이 강력히 권장됩니다.

```tsx
// GOOD
<Image source={{uri: 'https://reactjs.org/logo-og.png'}}
       style={{width: 400, height: 400}} />

// BAD
<Image source={{uri: 'https://reactjs.org/logo-og.png'}} />
```

### 이미지 네트워크 요청

이미지 요청에 HTTP 메서드, 헤더 또는 바디를 설정하려면 source 객체에 해당 속성을 정의하면 됩니다:

```tsx
<Image
  source={{
    uri: 'https://reactjs.org/logo-og.png',
    method: 'POST',
    headers: {
      Pragma: 'no-cache',
    },
    body: 'Your Body goes here',
  }}
  style={{width: 400, height: 400}}
/>
```

## URI 데이터 이미지

REST API 호출에서 인코딩된 이미지 데이터를 받는 경우가 있을 수 있습니다. `'data:'` URI 스킴을 사용하여 이러한 이미지를 활용할 수 있습니다. 네트워크 리소스와 마찬가지로 _이미지의 크기를 수동으로 지정해야 합니다_.

:::info
이 방식은 DB에서 가져온 목록의 아이콘과 같이 매우 작고 동적인 이미지에만 권장됩니다.
:::

```tsx
// include at least width and height!
<Image
  style={{
    width: 51,
    height: 51,
    resizeMode: 'contain',
  }}
  source={{
    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
  }}
/>
```

### 캐시 제어

특정 상황에서는 이미지가 이미 로컬 캐시에 있는 경우에만 표시하고 싶을 수 있습니다. 예를 들어, 고해상도 이미지가 사용 가능해질 때까지 저해상도 플레이스홀더를 표시하는 경우입니다. 다른 경우에는 이미지가 오래된 것이어도 상관없이 대역폭을 절약하기 위해 오래된 이미지를 표시할 의향이 있을 수 있습니다. `cache` source 속성을 통해 네트워크 레이어가 캐시와 상호작용하는 방식을 제어할 수 있습니다.

- `default`: 네이티브 플랫폼의 기본 전략을 사용합니다.
- `reload`: URL의 데이터가 원본 소스에서 로드됩니다. URL 로드 요청을 충족하기 위해 기존 캐시 데이터를 사용하지 않습니다.
- `force-cache`: 기존 캐시 데이터가 요청을 충족하는 데 사용되며, 데이터의 만료 날짜나 경과 시간에 관계없이 적용됩니다. 요청에 해당하는 기존 캐시 데이터가 없는 경우 원본 소스에서 데이터를 로드합니다.
- `only-if-cached`: 기존 캐시 데이터가 요청을 충족하는 데 사용되며, 데이터의 만료 날짜나 경과 시간에 관계없이 적용됩니다. URL 로드 요청에 해당하는 캐시 데이터가 없는 경우 원본 소스에서 데이터를 로드하지 않으며 로드가 실패한 것으로 간주됩니다.

```tsx
<Image
  source={{
    uri: 'https://reactjs.org/logo-og.png',
    cache: 'only-if-cached',
  }}
  style={{width: 400, height: 400}}
/>
```

## 로컬 파일 시스템 이미지

`Images.xcassets` 외부에 있는 로컬 리소스 사용 예시는 [CameraRoll](https://github.com/react-native-community/react-native-cameraroll)을 참조하세요.

### Drawable 리소스

Android는 `xml` 파일 형식을 통해 [drawable 리소스](https://developer.android.com/guide/topics/resources/drawable-resource) 로드를 지원합니다. 즉, 아이콘 렌더링을 위한 [벡터 drawable](https://developer.android.com/develop/ui/views/graphics/vector-drawable-resources)이나 도형을 그리기 위한 [shape drawable](https://developer.android.com/guide/topics/resources/drawable-resource#Shape)을 사용할 수 있습니다. 이러한 리소스 타입은 다른 [정적 리소스](#정적-이미지-리소스)나 [하이브리드 리소스](#하이브리드-앱-리소스에서의-이미지)와 동일하게 가져와 사용할 수 있습니다. 이미지 크기는 수동으로 지정해야 합니다.

JS 코드와 함께 위치하는 정적 drawable의 경우 `require` 또는 `import` 문법을 사용합니다(둘 다 동일하게 동작합니다):

```tsx
<Image
  source={require('./img/my_icon.xml')}
  style={{width: 40, height: 40}}
/>
```

Android drawable 폴더(즉, `res/drawable`)에 포함된 drawable의 경우 확장자 없이 리소스 이름을 사용합니다:

```tsx
<Image
  source={{uri: 'my_icon'}}
  style={{width: 40, height: 40}}
/>
```

drawable 리소스와 다른 이미지 타입의 핵심 차이는, Android가 에셋을 패키징하기 위해 [Android Asset Packaging Tool (AAPT)](https://developer.android.com/tools/aapt2)을 실행해야 하므로 에셋이 Android 애플리케이션 컴파일 시점에 참조되어야 한다는 것입니다. AAPT가 생성하는 파일 형식인 바이너리 XML은 Metro로 네트워크를 통해 로드할 수 없습니다. 에셋의 디렉토리나 이름을 변경하면 Android 애플리케이션을 매번 다시 빌드해야 합니다.

#### XML drawable 리소스 생성

Android는 [Drawable resources](https://developer.android.com/guide/topics/resources/drawable-resource) 가이드에서 지원되는 각 drawable 리소스 타입에 대한 포괄적인 문서와 원시 XML 파일 예시를 제공합니다. Android Studio의 [Vector Asset Studio](https://developer.android.com/studio/write/vector-asset-studio)와 같은 도구를 사용하여 Scalable Vector Graphic (SVG) 및 Adobe Photoshop Document (PSD) 파일에서 벡터 drawable을 만들 수 있습니다.

:::info
XML 파일을 정적 이미지 리소스(즉, `import` 또는 `require` 문)로 처리하려면 생성한 XML 파일 내에서 다른 리소스를 참조하지 않도록 하세요. [색상 상태 목록](https://developer.android.com/guide/topics/resources/color-list-resource)이나 [치수 리소스](https://developer.android.com/guide/topics/resources/more-resources#Dimension)와 같이 다른 drawable이나 속성에 대한 참조를 활용하고 싶다면, drawable을 [하이브리드 리소스](#하이브리드-앱-리소스에서의-이미지)로 포함하고 이름으로 가져와야 합니다.
:::

### 최적의 Camera Roll 이미지

iOS는 Camera Roll에서 동일한 이미지의 여러 크기를 저장합니다. 성능상의 이유로 가능한 가장 근접한 이미지를 선택하는 것이 매우 중요합니다. 200x200 썸네일을 표시할 때 전체 품질의 3264x2448 이미지를 소스로 사용하는 것은 바람직하지 않습니다. 정확히 일치하는 이미지가 있으면 React Native가 그것을 선택하고, 없으면 근접한 크기에서 리사이징할 때 블러가 발생하지 않도록 적어도 50% 이상 큰 첫 번째 이미지를 사용합니다. 이 모든 과정이 기본으로 처리되므로 직접 구현하는 번거롭고 오류가 발생하기 쉬운 코드를 작성할 필요가 없습니다.

## 모든 것을 자동으로 크기 조정하지 않는 이유

_브라우저에서는_ 이미지에 크기를 지정하지 않으면 브라우저가 0x0 요소를 렌더링한 후 이미지를 다운로드하고 올바른 크기로 이미지를 렌더링합니다. 이 동작의 큰 문제는 이미지가 로드될 때 UI가 여기저기 이동하여 매우 좋지 않은 사용자 경험을 초래한다는 것입니다. 이를 [누적 레이아웃 이동(Cumulative Layout Shift)](https://web.dev/cls/)이라고 합니다.

_React Native에서는_ 이 동작이 의도적으로 구현되지 않았습니다. 개발자가 원격 이미지의 크기(또는 종횡비)를 미리 파악해야 하는 작업이 추가되지만, 이것이 더 나은 사용자 경험으로 이어진다고 생각합니다. `require('./my-icon.png')` 문법으로 앱 번들에서 로드된 정적 이미지는 마운트 시점에 크기를 즉시 알 수 있으므로 _자동으로 크기가 조정될 수 있습니다_.

예를 들어, `require('./my-icon.png')`의 결과는 다음과 같을 수 있습니다:

```tsx
{"__packager_asset":true,"uri":"my-icon.png","width":591,"height":573}
```

## 객체로서의 source

React Native에서 흥미로운 설계 결정 중 하나는 `src` 속성이 `source`로 명명되어 있고, 문자열이 아닌 `uri` 속성을 가진 객체를 받는다는 것입니다.

```tsx
<Image source={{uri: 'something.jpg'}} />
```

인프라 측면에서 보면, 이 객체에 메타데이터를 첨부할 수 있기 때문입니다. 예를 들어 `require('./my-icon.png')`를 사용하면 실제 위치와 크기에 대한 정보를 추가합니다(이 사실에 의존하지 마세요, 미래에 변경될 수 있습니다!). 또한 미래를 대비하는 설계이기도 합니다. 예를 들어, 언젠가 스프라이트를 지원하고 싶다면 `{uri: ...}` 대신 `{uri: ..., crop: {left: 10, top: 50, width: 20, height: 40}}`를 출력하여 기존의 모든 호출 위치에서 투명하게 스프라이팅을 지원할 수 있습니다.

사용자 측면에서는 이미지 크기와 같은 유용한 속성을 객체에 주석으로 달아 표시될 크기를 계산할 수 있습니다. 이미지에 대한 더 많은 정보를 저장하는 데이터 구조로 자유롭게 활용하세요.

## 중첩을 통한 배경 이미지

웹에 익숙한 개발자들이 자주 요청하는 기능은 `background-image`입니다. 이 사용 사례를 처리하기 위해 `<Image>`와 동일한 props를 가지며 그 위에 레이어링하고 싶은 자식 요소를 추가할 수 있는 `<ImageBackground>` 컴포넌트를 사용할 수 있습니다.

구현이 기본적이므로 일부 경우에는 `<ImageBackground>`를 사용하고 싶지 않을 수 있습니다. 더 자세한 내용은 `<ImageBackground>`의 [문서](imagebackground.md)를 참조하고, 필요한 경우 커스텀 컴포넌트를 만드세요.

```tsx
return (
  <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
    <Text>Inside</Text>
  </ImageBackground>
);
```

너비와 높이 스타일 속성을 반드시 지정해야 합니다.

## iOS 테두리 반경 스타일

iOS의 이미지 컴포넌트에서 다음과 같은 모서리별 테두리 반경 스타일 속성이 무시될 수 있습니다:

- `borderTopLeftRadius`
- `borderTopRightRadius`
- `borderBottomLeftRadius`
- `borderBottomRightRadius`

## 오프 스레드 디코딩

이미지 디코딩은 한 프레임 이상의 시간이 걸릴 수 있습니다. 디코딩이 메인 스레드에서 이루어지기 때문에 이것이 웹에서 프레임 드롭의 주요 원인 중 하나입니다. React Native에서는 이미지 디코딩이 별도의 스레드에서 수행됩니다. 실제로 이미지가 아직 다운로드되지 않은 경우를 처리해야 하므로, 디코딩 중에 몇 프레임 더 플레이스홀더를 표시해도 코드 변경이 필요하지 않습니다.

## iOS 이미지 캐시 한도 설정

iOS에서는 React Native의 기본 이미지 캐시 한도를 재정의하는 API를 제공합니다. 이는 네이티브 AppDelegate 코드 내에서(예: `didFinishLaunchingWithOptions` 내부) 호출해야 합니다.

```objectivec
RCTSetImageCacheLimits(4*1024*1024, 200*1024*1024);
```

**매개변수:**

| Name           | Type   | Required | Description             |
| -------------- | ------ | -------- | ----------------------- |
| imageSizeLimit | number | Yes      | Image cache size limit. |
| totalCostLimit | number | Yes      | Total cache cost limit. |

위 코드 예시에서 이미지 크기 한도는 4 MB로, 총 비용 한도는 200 MB로 설정됩니다.
