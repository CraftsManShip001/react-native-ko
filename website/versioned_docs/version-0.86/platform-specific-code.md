---
id: platform-specific-code
title: 플랫폼별 코드
---

크로스 플랫폼 앱을 빌드할 때, 가능한 한 많은 코드를 재사용하려고 합니다. 그러나 코드를 다르게 작성하는 것이 합리적인 시나리오가 발생할 수 있습니다. 예를 들어 Android와 iOS에 각각 별도의 시각적 컴포넌트를 구현하고 싶을 수 있습니다.

React Native는 코드를 플랫폼별로 구성하고 분리하는 두 가지 방법을 제공합니다:

- [`Platform` 모듈](platform-specific-code.md#platform-모듈) 사용.
- [플랫폼별 파일 확장자](platform-specific-code.md#플랫폼별-확장자) 사용.

특정 컴포넌트에는 한 플랫폼에서만 작동하는 props가 있을 수 있습니다. 이러한 props는 모두 `@platform`으로 표시되어 있으며 웹사이트에서 옆에 작은 배지가 표시됩니다.

## Platform 모듈

React Native는 앱이 실행 중인 플랫폼을 감지하는 모듈을 제공합니다. 감지 로직을 사용하여 플랫폼별 코드를 구현할 수 있습니다. 컴포넌트의 일부만 플랫폼에 따라 달라지는 경우 이 옵션을 사용하세요.

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```

`Platform.OS`는 iOS에서 실행 시 `ios`, Android에서 실행 시 `android`가 됩니다.

또한 `Platform.select` 메서드를 사용할 수 있으며, 이 메서드는 키가 `'ios' | 'android' | 'native' | 'default'` 중 하나인 객체를 받아 현재 실행 중인 플랫폼에 가장 적합한 값을 반환합니다. 즉, 휴대폰에서 실행 중이라면 `ios`와 `android` 키가 우선적으로 적용됩니다. 이 키들이 지정되지 않은 경우 `native` 키가 사용되고, 그 다음 `default` 키가 사용됩니다.

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'green',
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue',
      },
    }),
  },
});
```

이렇게 하면 컨테이너는 모든 플랫폼에서 `flex: 1`을 가지며, iOS에서는 빨간색 배경, Android에서는 초록색 배경, 다른 플랫폼에서는 파란색 배경을 가집니다.

`any` 값을 허용하므로, 아래와 같이 플랫폼별 컴포넌트를 반환하는 데도 사용할 수 있습니다:

```tsx
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```

```tsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```

### Android 버전 감지 <div className="label android">Android</div>

Android에서는 `Platform` 모듈을 사용하여 앱이 실행 중인 Android 플랫폼의 버전을 감지할 수도 있습니다:

```tsx
import {Platform} from 'react-native';

if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```

**참고**: `Version`은 Android OS 버전이 아닌 Android API 버전으로 설정됩니다. 매핑을 확인하려면 [Android 버전 역사](https://en.wikipedia.org/wiki/Android_version_history#Overview)를 참조하세요.

### iOS 버전 감지 <div className="label ios">iOS</div>

iOS에서 `Version`은 `-[UIDevice systemVersion]`의 결과값이며, 운영체제의 현재 버전을 나타내는 문자열입니다. 시스템 버전의 예시는 "10.3"입니다. 예를 들어 iOS에서 주요 버전 번호를 감지하려면:

```tsx
import {Platform} from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```

## 플랫폼별 확장자

플랫폼별 코드가 더 복잡한 경우, 코드를 별도의 파일로 분리하는 것을 고려해야 합니다. React Native는 파일에 `.ios.` 또는 `.android.` 확장자가 있을 때 이를 감지하여 다른 컴포넌트에서 필요할 때 해당 플랫폼에 맞는 파일을 로드합니다.

예를 들어, 프로젝트에 다음과 같은 파일이 있다고 가정해 보세요:

```shell
BigButton.ios.js
BigButton.android.js
```

그러면 다음과 같이 컴포넌트를 import할 수 있습니다:

```tsx
import BigButton from './BigButton';
```

React Native는 실행 중인 플랫폼에 따라 자동으로 올바른 파일을 선택합니다.

## 네이티브별 확장자(즉, NodeJS 및 웹과 코드 공유)

Android/iOS 차이가 없지만 NodeJS/웹과 React Native 간에 모듈을 공유해야 하는 경우 `.native.js` 확장자를 사용할 수도 있습니다. 이는 React Native와 ReactJS 간에 공통 코드를 공유하는 프로젝트에 특히 유용합니다.

예를 들어, 프로젝트에 다음과 같은 파일이 있다고 가정해 보세요:

```shell
Container.js # picked up by webpack, Rollup or any other Web bundler
Container.native.js # picked up by the React Native bundler for both Android and iOS (Metro)
```

다음과 같이 `.native` 확장자 없이 import할 수 있습니다:

```tsx
import Container from './Container';
```

**팁:** 프로덕션 번들에서 사용되지 않는 코드를 방지하여 최종 번들 크기를 줄이기 위해 `.native.js` 확장자를 무시하도록 웹 번들러를 구성하세요.
