---
id: image
title: Image
---

네트워크 이미지, 정적 리소스, 임시 로컬 이미지, 카메라 롤과 같은 로컬 디스크의 이미지 등 다양한 유형의 이미지를 표시하기 위한 React 컴포넌트입니다.

이 예시는 로컬 저장소에서 이미지를 가져와 표시하는 방법과 네트워크에서 이미지를 가져오는 방법, 심지어 `'data:'` URI 스킴으로 제공된 데이터에서 이미지를 표시하는 방법을 보여줍니다.

:::note
네트워크 이미지와 데이터 이미지의 경우, 이미지의 치수를 수동으로 지정해야 합니다!
:::

## 예시

```SnackPlayer name=Image%20Example
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const DisplayAnImage = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Image
        style={styles.logo}
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default DisplayAnImage;
```

이미지에 `style`을 추가할 수도 있습니다.

```SnackPlayer name=Styled%20Image%20Example
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch',
  },
});

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.stretch}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

export default DisplayAnImageWithStyle;
```

## Android에서의 GIF 및 WebP 지원

네이티브 코드를 직접 빌드하는 경우, GIF와 WebP는 Android에서 기본적으로 지원되지 않습니다.

앱의 요구 사항에 따라 `android/app/build.gradle`에 일부 선택적 모듈을 추가해야 합니다.

```groovy
dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

  // For animated GIF support
  implementation 'com.facebook.fresco:animated-gif:3.6.0'

  // For WebP support, including animated WebP
  implementation 'com.facebook.fresco:animated-webp:3.6.0'
  implementation 'com.facebook.fresco:webpsupport:3.6.0'

  // For WebP support, without animations
  implementation 'com.facebook.fresco:webpsupport:3.6.0'
}
```

:::note
위에 나열된 버전은 제때 업데이트되지 않을 수 있습니다. 특정 태그 버전에서 사용 중인 fresco 버전을 확인하려면 메인 저장소의 [`packages/react-native/gradle/libs.versions.toml`](https://github.com/facebook/react-native/blob/main/packages/react-native/gradle/libs.versions.toml)을 확인하세요.
:::

---

# 레퍼런스

## Props

### [View Props](view.md#props)

[View Props](view#props)를 상속합니다.

---

### `accessible`

`true`이면 이미지가 접근성 요소임을 나타냅니다.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `accessibilityLabel`

사용자가 이미지와 상호작용할 때 스크린 리더가 읽는 텍스트입니다.

| Type   |
| ------ |
| string |

---

### `alt`

이미지의 대체 텍스트 설명을 정의하는 문자열로, 사용자가 이미지와 상호작용할 때 스크린 리더가 읽습니다. 이를 사용하면 이 요소가 자동으로 접근 가능한 요소로 표시됩니다.

| Type   |
| ------ |
| string |

---

### `blurRadius`

blurRadius: 이미지에 추가된 블러 필터의 블러 반경입니다.

| Type   |
| ------ |
| number |

:::tip
iOS에서는 `blurRadius`를 `5` 이상으로 늘려야 합니다.
:::

---

### `capInsets` <div className="label ios">iOS</div>

이미지 크기를 조정할 때 `capInsets`에 지정된 크기의 모서리는 고정 크기로 유지되지만, 이미지의 중앙 콘텐츠와 테두리는 늘어납니다. 이는 크기 조정 가능한 둥근 버튼, 그림자 및 기타 크기 조정 가능한 에셋을 만드는 데 유용합니다. 자세한 내용은 [Apple 공식 문서](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets)를 참조하세요.

| Type         |
| ------------ |
| [Rect](rect) |

---

### `crossOrigin`

이미지 리소스를 가져올 때 사용할 CORS 모드를 지정하는 키워드 문자열입니다. HTML의 crossorigin 속성과 유사하게 동작합니다.

- `anonymous`: 이미지 요청에서 사용자 자격 증명을 교환하지 않습니다.
- `use-credentials`: 이미지 요청에서 `Access-Control-Allow-Credentials` 헤더 값을 `true`로 설정합니다.

| Type                                     | Default       |
| ---------------------------------------- | ------------- |
| enum(`'anonymous'`, `'use-credentials'`) | `'anonymous'` |

---

### `defaultSource`

이미지 소스를 로딩하는 동안 표시할 정적 이미지입니다.

| Type                             |
| -------------------------------- |
| [ImageSource](image#imagesource) |

:::note
Android에서는 디버그 빌드에서 defaultSource props가 무시됩니다.
:::

---

### `fadeDuration` <div className="label android">Android</div>

페이드 애니메이션 지속 시간(밀리초)입니다.

| Type   | Default |
| ------ | ------- |
| number | `300`   |

---

### `height`

이미지 컴포넌트의 높이입니다.

| Type   |
| ------ |
| number |

---

### `loadingIndicatorSource`

`source`와 유사하게, 이 속성은 이미지의 로딩 인디케이터를 렌더링하는 데 사용되는 리소스를 나타냅니다. 로딩 인디케이터는 이미지가 표시될 준비가 될 때까지, 일반적으로 이미지가 다운로드된 후까지 표시됩니다.

| Type                                                  |
| ----------------------------------------------------- |
| [ImageSource](image#imagesource) (`uri` only), number |

---

### `onError`

로드 오류 시 호출됩니다.

| Type                                |
| ----------------------------------- |
| (`{nativeEvent: {error} }`) => void |

---

### `onLayout`

마운트 시 및 레이아웃 변경 시 호출됩니다.

| Type                                                    |
| ------------------------------------------------------- |
| `md ({nativeEvent: [LayoutEvent](layoutevent)} => void` |

---

### `onLoad`

로드가 성공적으로 완료되면 호출됩니다.

**예시:** `onLoad={({nativeEvent: {source: {width, height}}}) => setImageRealSize({width, height})}`

| Type                                                                |
| ------------------------------------------------------------------- |
| `md ({nativeEvent: [ImageLoadEvent](image#imageloadevent)} => void` |

---

### `onLoadEnd`

로드 성공 또는 실패 시 호출됩니다.

| Type       |
| ---------- |
| () => void |

---

### `onLoadStart`

로드 시작 시 호출됩니다.

**예시:** `onLoadStart={() => this.setState({loading: true})}`

| Type       |
| ---------- |
| () => void |

---

### `onPartialLoad` <div className="label ios">iOS</div>

이미지의 부분 로드가 완료되면 호출됩니다. "부분 로드"의 정의는 로더마다 다르지만 점진적 JPEG 로드를 위한 것입니다.

| Type       |
| ---------- |
| () => void |

---

### `onProgress`

다운로드 진행 시 호출됩니다.

| Type                                        |
| ------------------------------------------- |
| (`{nativeEvent: {loaded, total} }`) => void |

---

### `progressiveRenderingEnabled` <div className="label android">Android</div>

`true`이면 점진적 JPEG 스트리밍을 활성화합니다 - https://frescolib.org/docs/progressive-jpegs.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `referrerPolicy`

리소스를 가져올 때 사용할 referrer를 나타내는 문자열입니다. 이미지 요청의 `Referrer-Policy` 헤더 값을 설정합니다. HTML의 `referrerpolicy` 속성과 유사하게 동작합니다.

| Type                                                                                                                                                                                     | Default                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| enum(`'no-referrer'`, `'no-referrer-when-downgrade'`, `'origin'`, `'origin-when-cross-origin'`, `'same-origin'`, `'strict-origin'`, `'strict-origin-when-cross-origin'`, `'unsafe-url'`) | `'strict-origin-when-cross-origin'` |

---

### `ref`

마운트 시 [element node](element-nodes)가 할당될 ref 세터입니다.

---

### `resizeMethod` <div className="label android">Android</div>

이미지의 치수가 이미지 뷰의 치수와 다를 때 이미지 크기를 조정하는 데 사용해야 하는 메커니즘입니다. 기본값은 `auto`입니다.

- `auto`: 휴리스틱을 사용하여 `resize`와 `scale` 중에서 선택합니다.

- `resize`: 이미지가 디코딩되기 전에 메모리에서 인코딩된 이미지를 변경하는 소프트웨어 작업입니다. 이미지가 뷰보다 훨씬 큰 경우 `scale` 대신 사용해야 합니다.

- `scale`: 이미지가 축소되거나 확대되어 그려집니다. `resize`와 비교하여 `scale`은 더 빠르고(일반적으로 하드웨어 가속) 더 높은 품질의 이미지를 생성합니다. 이미지가 뷰보다 작은 경우 사용해야 합니다. 이미지가 뷰보다 약간 큰 경우에도 사용해야 합니다.

- `none`: 샘플링이 수행되지 않으며 이미지가 전체 해상도로 표시됩니다. 메모리를 너무 많이 소비하는 이미지를 렌더링하려고 할 때 Android가 런타임 예외를 발생시키므로 안전하지 않다고 간주되어 드문 경우에만 사용해야 합니다.

`resize`와 `scale`에 대한 자세한 내용은 https://frescolib.org/docs/resizing에서 확인할 수 있습니다.

| Type                                            | Default  |
| ----------------------------------------------- | -------- |
| enum(`'auto'`, `'resize'`, `'scale'`, `'none'`) | `'auto'` |

---

### `resizeMode`

프레임이 원본 이미지 치수와 일치하지 않을 때 이미지 크기를 조정하는 방법을 결정합니다. 기본값은 `cover`입니다.

- `cover`: 이미지를 균일하게 확대/축소하여(이미지의 종횡비 유지) 다음 조건을 만족합니다.
  - 이미지의 두 치수(너비와 높이) 모두 뷰의 해당 치수(패딩 제외)보다 크거나 같습니다.
  - 확대/축소된 이미지의 적어도 하나의 치수가 뷰의 해당 치수(패딩 제외)와 같습니다.

- `contain`: 이미지를 균일하게 확대/축소하여(이미지의 종횡비 유지) 이미지의 두 치수(너비와 높이) 모두 뷰의 해당 치수(패딩 제외)보다 작거나 같도록 합니다.

- `stretch`: 너비와 높이를 독립적으로 확대/축소합니다. 이로 인해 src의 종횡비가 변경될 수 있습니다.

- `repeat`: 뷰의 프레임을 덮도록 이미지를 반복합니다. 이미지는 크기와 종횡비를 유지하지만, 뷰보다 큰 경우에는 뷰 안에 포함되도록 균일하게 축소됩니다.

- `center`: 두 치수 모두에서 뷰의 중앙에 이미지를 배치합니다. 이미지가 뷰보다 큰 경우 뷰 안에 포함되도록 균일하게 축소됩니다.

| Type                                                              | Default   |
| ----------------------------------------------------------------- | --------- |
| enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` |

---

### `resizeMultiplier` <div className="label android">Android</div>

`resizeMethod`가 `resize`로 설정된 경우, 대상 치수에 이 값을 곱합니다. `scale` 메서드를 사용하여 나머지 크기 조정을 수행합니다. 기본값 `1.0`은 비트맵 크기가 대상 치수에 맞도록 설계됨을 의미합니다. `1.0`보다 큰 배수는 리사이즈 옵션을 대상 치수보다 크게 설정하고, 결과 비트맵은 하드웨어 크기에서 축소됩니다. 기본값은 `1.0`입니다.

이 props는 대상 치수가 매우 작고 소스 이미지가 상당히 큰 경우에 가장 유용합니다. `resize` 리사이즈 메서드는 다운샘플링을 수행하며 소스와 대상 이미지 크기 사이에서 상당한 이미지 품질이 손실되어 흐릿한 이미지가 발생하는 경우가 많습니다. 배수를 사용하면 디코딩된 이미지가 대상 크기보다 약간 크지만 소스 이미지보다 작습니다(소스 이미지가 충분히 큰 경우). 이를 통해 앨리어싱 아티팩트가 배수된 이미지의 스케일링 작업을 통해 가짜 품질을 생성할 수 있습니다.

소스 이미지 치수가 200x200이고 대상 치수가 24x24인 경우, `resizeMultiplier`를 `2.0`으로 설정하면 Fresco가 이미지를 48x48로 다운샘플링하도록 지시합니다. Fresco는 가장 가까운 2의 거듭제곱(즉, 50x50)을 선택하여 해당 크기의 비트맵으로 이미지를 디코딩합니다. 배수 없이는 가장 가까운 2의 거듭제곱이 25x25가 됩니다. 결과 이미지는 시스템에 의해 축소됩니다.

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

### `source`

이미지 소스(원격 URL 또는 로컬 파일 리소스)입니다.

이 props에는 너비와 높이, 그리고 잠재적으로 scale/기타 URI 인수와 함께 지정된 여러 원격 URL을 포함할 수도 있습니다. 네이티브 측에서는 이미지 컨테이너의 측정된 크기를 기반으로 표시할 최적의 `uri`를 선택합니다. 네트워크 요청이 로컬 캐시와 상호작용하는 방식을 제어하기 위해 `cache` 속성을 추가할 수 있습니다. (자세한 내용은 [이미지 캐시 제어](images#캐시-제어)를 참조하세요.)

현재 지원되는 형식은 `png`, `jpg`, `jpeg`, `bmp`, `gif`, `webp`, `psd`(iOS만 해당)입니다. 또한 iOS는 여러 RAW 이미지 형식을 지원합니다. 지원되는 카메라 모델의 현재 목록은 Apple 문서를 참조하세요(iOS 12의 경우 https://support.apple.com/en-ca/HT208967 참조).

`webp` 형식은 JavaScript 코드와 함께 번들로 제공될 때만 iOS에서 지원된다는 점에 유의하세요.

| Type                             |
| -------------------------------- |
| [ImageSource](image#imagesource) |

---

### `src`

이미지의 원격 URL을 나타내는 문자열입니다. 이 props는 `source` props보다 우선순위가 높습니다.

**예시:** `src={'https://reactnative.dev/img/tiny_logo.png'}`

| Type   |
| ------ |
| string |

---

### `srcSet`

가능한 후보 이미지 소스의 쉼표로 구분된 목록을 나타내는 문자열입니다. 각 이미지 소스에는 이미지의 URL과 픽셀 밀도 설명자가 포함됩니다. 설명자가 지정되지 않은 경우 기본값은 `1x` 설명자입니다.

`srcSet`에 `1x` 설명자가 없는 경우, `src`의 값이 `1x` 설명자를 가진 이미지 소스로 사용됩니다(제공된 경우).

이 props는 `src` 및 `source` props보다 모두 우선순위가 높습니다.

**예시:** `srcSet={'https://reactnative.dev/img/tiny_logo.png 1x, https://reactnative.dev/img/header_logo.svg 2x'}`

| Type   |
| ------ |
| string |

---

### `style`

| Type                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Image Style Props](image-style-props#props), [Layout Props](layout-props#props), [Shadow Props](shadow-props#props), [Transforms](transforms) |

---

### `testID`

UI 자동화 테스트 스크립트에서 사용하기 위한 이 요소의 고유 식별자입니다.

| Type   |
| ------ |
| string |

---

### `tintColor`

투명하지 않은 모든 픽셀의 색상을 `tintColor`로 변경합니다.

| Type               |
| ------------------ |
| [color](colors.md) |

---

### `width`

이미지 컴포넌트의 너비입니다.

| Type   |
| ------ |
| number |

## 메서드

### `abortPrefetch()` <div className="label android">Android</div>

```tsx
static abortPrefetch(requestId: number);
```

프리페치 요청을 중단합니다.

**파라미터:**

| Name                                                           | Type   | Description                             |
| -------------------------------------------------------------- | ------ | --------------------------------------- |
| requestId <div className="label basic required">Required</div> | number | Request id as returned by `prefetch()`. |

---

### `getSize()`

```tsx
static getSize(uri: string): Promise<{width: number, height: number}>;
```

이미지를 표시하기 전에 이미지의 너비와 높이(픽셀 단위)를 가져옵니다. 이미지를 찾을 수 없거나 다운로드에 실패하면 이 메서드가 실패할 수 있습니다.

이미지 치수를 가져오려면 이미지를 먼저 로드하거나 다운로드해야 할 수 있으며, 이후 캐시됩니다. 즉, 원칙적으로 이 메서드를 사용하여 이미지를 미리 로드할 수 있지만 이 목적에 최적화되어 있지 않으며 향후 이미지 데이터를 완전히 로드/다운로드하지 않는 방식으로 구현될 수 있습니다. 이미지를 미리 로드하는 올바르고 지원되는 방법은 별도의 API로 제공될 예정입니다.

**파라미터:**

| <div className="wideColumn">Name</div>                   | Type   | Description                |
| -------------------------------------------------------- | ------ | -------------------------- |
| uri <div className="label basic required">Required</div> | string | The location of the image. |

---

### `getSizeWithHeaders()`

```tsx
static getSizeWithHeaders(
  uri: string,
  headers: {[index: string]: string}
): Promise<{width: number, height: number}>;
```

이미지를 표시하기 전에 요청에 대한 헤더를 제공하는 기능과 함께 이미지의 너비와 높이(픽셀 단위)를 가져옵니다. 이미지를 찾을 수 없거나 다운로드에 실패하면 이 메서드가 실패할 수 있습니다. 또한 정적 이미지 리소스에는 작동하지 않습니다.

이미지 치수를 가져오려면 이미지를 먼저 로드하거나 다운로드해야 할 수 있으며, 이후 캐시됩니다. 즉, 원칙적으로 이 메서드를 사용하여 이미지를 미리 로드할 수 있지만 이 목적에 최적화되어 있지 않으며 향후 이미지 데이터를 완전히 로드/다운로드하지 않는 방식으로 구현될 수 있습니다. 이미지를 미리 로드하는 올바르고 지원되는 방법은 별도의 API로 제공될 예정입니다.

**파라미터:**

| <div className="wideColumn">Name</div>                       | Type   | Description                  |
| ------------------------------------------------------------ | ------ | ---------------------------- |
| uri <div className="label basic required">Required</div>     | string | The location of the image.   |
| headers <div className="label basic required">Required</div> | object | The headers for the request. |

---

### `prefetch()`

```tsx
await Image.prefetch(url);
```

나중에 사용하기 위해 원격 이미지를 디스크 캐시에 다운로드하여 미리 가져옵니다. 불리언으로 resolve되는 Promise를 반환합니다.

**파라미터:**

| Name                                                     | Type                                                  | Description                                            |
| -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| url <div className="label basic required">Required</div> | string                                                | The remote location of the image.                      |
| callback                                                 | function <div className="label android">Android</div> | The function that will be called with the `requestId`. |

---

### `queryCache()`

```tsx
static queryCache(
  urls: string[],
): Promise<Record<string, 'memory' | 'disk' | 'disk/memory'>>;
```

캐시를 조회합니다. URL에서 "disk", "memory" 또는 "disk/memory"와 같은 캐시 상태로의 매핑으로 resolve되는 Promise를 반환합니다. 요청된 URL이 매핑에 없으면 캐시에 없다는 의미입니다.

**파라미터:**

| Name                                                      | Type  | Description                                |
| --------------------------------------------------------- | ----- | ------------------------------------------ |
| urls <div className="label basic required">Required</div> | array | List of image URLs to check the cache for. |

---

### `resolveAssetSource()`

```tsx
static resolveAssetSource(source: ImageSourcePropType): {
  height: number;
  width: number;
  scale: number;
  uri: string;
};
```

에셋 참조를 `uri`, `scale`, `width`, `height` 속성을 가진 객체로 resolve합니다.

**파라미터:**

| <div className="wideColumn">Name</div>                      | Type                                     | Description                                                                  |
| ----------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- |
| source <div className="label basic required">Required</div> | [ImageSource](image#imagesource), number | A number (opaque type returned by `require('./foo.png')`) or an ImageSource. |

## 타입 정의

### ImageCacheEnum <div className="label ios">iOS</div>

잠재적으로 캐시된 응답에 대한 캐시 처리 또는 전략을 설정하는 데 사용할 수 있는 열거형입니다.

| Type                                                               | Default     |
| ------------------------------------------------------------------ | ----------- |
| enum(`'default'`, `'reload'`, `'force-cache'`, `'only-if-cached'`) | `'default'` |

- `default`: 네이티브 플랫폼의 기본 전략을 사용합니다.
- `reload`: URL의 데이터는 원본 소스에서 로드됩니다. 기존 캐시 데이터는 URL 로드 요청을 처리하는 데 사용되지 않아야 합니다.
- `force-cache`: 기존 캐시된 데이터는 나이나 만료 날짜에 관계없이 요청을 처리하는 데 사용됩니다. 요청에 해당하는 캐시에 기존 데이터가 없는 경우 데이터는 원본 소스에서 로드됩니다.
- `only-if-cached`: 기존 캐시 데이터는 나이나 만료 날짜에 관계없이 요청을 처리하는 데 사용됩니다. URL 로드 요청에 해당하는 캐시에 기존 데이터가 없으면 원본 소스에서 데이터를 로드하려는 시도가 이루어지지 않으며 로드는 실패한 것으로 간주됩니다.

### ImageLoadEvent

`onLoad` 콜백에서 반환되는 객체입니다.

| Type   |
| ------ |
| object |

**속성:**

| Name   | Type   | Description                         |
| ------ | ------ | ----------------------------------- |
| source | object | The [source object](#source-object) |

#### Source Object

**속성:**

| Name   | Type   | Description                                                  |
| ------ | ------ | ------------------------------------------------------------ |
| width  | number | The width of loaded image.                                   |
| height | number | The height of loaded image.                                  |
| uri    | string | A string representing the resource identifier for the image. |

### ImageSource

| Type                             |
| -------------------------------- |
| object, array of objects, number |

**속성(객체 또는 객체 배열로 전달하는 경우):**

| <div className="wideColumn">Name</div>     | Type                                       | Description                                                                                                                                                                          |
| ------------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| uri                                        | string                                     | A string representing the resource identifier for the image, which could be an http address, a local file path, or the name of a static image resource.                              |
| width                                      | number                                     | Can be specified if known at build time, in which case the value will be used to set the default `<Image/>` component dimension.                                                     |
| height                                     | number                                     | Can be specified if known at build time, in which case the value will be used to set the default `<Image/>` component dimension.                                                     |
| scale                                      | number                                     | Used to indicate the scale factor of the image. Defaults to `1.0` if unspecified, meaning that one image pixel equates to one display point / DIP.                                   |
| bundle<div className="label ios">iOS</div> | string                                     | The iOS asset bundle which the image is included in. This will default to `[NSBundle mainBundle]` if not set.                                                                        |
| method                                     | string                                     | The HTTP Method to use. Defaults to `'GET'` if not specified.                                                                                                                        |
| headers                                    | object                                     | An object representing the HTTP headers to send along with the request for a remote image.                                                                                           |
| body                                       | string                                     | The HTTP body to send with the request. This must be a valid UTF-8 string, and will be sent exactly as specified, with no additional encoding (e.g. URL-escaping or base64) applied. |
| cache<div className="label ios">iOS</div>  | [ImageCacheEnum](image#imagecacheenum-ios) | Determines how the requests handles potentially cached responses.                                                                                                                    |

**숫자로 전달하는 경우:**

- `number` - `require('./image.jpg')`와 같은 방식으로 반환되는 불투명 타입입니다.
