---
id: navigation
title: 화면 간 내비게이션
---

모바일 앱은 단일 화면으로만 구성되는 경우가 거의 없습니다. 여러 화면의 표시와 화면 간 전환을 관리하는 것은 일반적으로 내비게이터(navigator)라고 알려진 것이 담당합니다.

이 가이드는 React Native에서 사용할 수 있는 다양한 내비게이션 컴포넌트를 다룹니다. 내비게이션을 처음 시작하는 경우 [React Navigation](navigation.md#react-navigation)을 사용하는 것이 좋습니다. React Navigation은 Android와 iOS 모두에서 일반적인 스택 내비게이션 및 탭 내비게이션 패턴을 표시하는 기능과 함께 간단한 내비게이션 솔루션을 제공합니다.

이미 네이티브로 내비게이션을 관리하는 앱에 React Native를 통합하거나 React Navigation의 대안을 찾고 있다면, 다음 라이브러리가 두 플랫폼 모두에서 네이티브 내비게이션을 제공합니다: [react-native-navigation](https://github.com/wix/react-native-navigation).

## React Navigation

내비게이션을 위한 커뮤니티 솔루션은 개발자가 몇 줄의 코드로 앱의 화면을 설정할 수 있게 해주는 독립 라이브러리입니다.

### 스타터 템플릿

새 프로젝트를 시작하는 경우 React Navigation 템플릿을 사용하여 [Expo](https://expo.dev/)로 새 프로젝트를 빠르게 설정할 수 있습니다:

```shell
npx create-expo-app@latest --template react-navigation/template
```

시작 방법에 대한 자세한 내용은 프로젝트의 `README.md`를 참조하세요.

### 설치 및 설정

먼저 프로젝트에 설치해야 합니다:

```shell
npm install @react-navigation/native @react-navigation/native-stack
```

다음으로, 필수 피어 의존성을 설치합니다. 프로젝트가 Expo 관리형 프로젝트인지 베어 React Native 프로젝트인지에 따라 다른 명령을 실행해야 합니다.

- Expo 관리형 프로젝트의 경우 `expo`로 의존성을 설치하세요:

  ```shell
  npx expo install react-native-screens react-native-safe-area-context
  ```

- 베어 React Native 프로젝트의 경우 `npm`으로 의존성을 설치하세요:

  ```shell
  npm install react-native-screens react-native-safe-area-context
  ```

  베어 React Native 프로젝트에서 iOS를 사용하는 경우 [CocoaPods](https://cocoapods.org/)가 설치되어 있는지 확인하세요. 그런 다음 설치를 완료하기 위해 pods를 설치하세요:

  ```shell
  cd ios
  pod install
  cd ..
  ```

의존성을 설치하고 구성한 후 프로젝트를 React Navigation을 사용하도록 설정할 수 있습니다.

React Navigation을 사용할 때 앱에 [navigators](https://reactnavigation.org/docs/glossary-of-terms#navigator)를 구성합니다. 내비게이터는 앱의 화면 간 전환을 처리하고 헤더, 탭 바 등의 UI를 제공합니다.

이제 기기/시뮬레이터에서 앱을 빌드하고 실행할 준비가 되었습니다.

### 사용법

이제 홈 화면과 프로필 화면이 있는 앱을 만들 수 있습니다:

```tsx title="App.tsx"
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {title: 'Welcome'},
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
```

이 예시에서 `RootStack`은 `createNativeStackNavigator`의 `screens` 속성에 정의된 2개의 화면(`Home`과 `Profile`)을 가진 내비게이터입니다. 마찬가지로 원하는 만큼 화면을 정의할 수 있습니다.

각 화면의 `options` 속성에서 화면 제목 같은 옵션을 지정할 수 있습니다. 각 화면 정의에는 React 컴포넌트 또는 다른 내비게이터인 `screen` 속성도 필요합니다.

각 화면 컴포넌트 내에서 `useNavigation` 훅을 사용하여 다른 화면으로 링크하는 다양한 메서드가 있는 `navigation` 객체를 가져올 수 있습니다. 예를 들어 `navigation.navigate`를 사용하여 `Profile` 화면으로 이동할 수 있습니다:

```tsx title="HomeScreen.tsx"
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
}
```

```tsx title="ProfileScreen.tsx"
export default function ProfileScreen({route}) {
  return <Text>This is {route.params.name}'s profile</Text>;
}
```

이 `native-stack` 내비게이터는 네이티브 API를 사용합니다: iOS에서는 `UINavigationController`, Android에서는 `Fragment`를 사용하므로 `createNativeStackNavigator`로 빌드된 내비게이션은 해당 API 위에 네이티브로 빌드된 앱과 동일하게 동작하고 유사한 성능 특성을 가집니다.

React Navigation에는 탭 및 드로어와 같은 다양한 종류의 내비게이터 패키지도 있습니다. 이를 사용하여 앱에서 다양한 패턴을 구현할 수 있습니다.

React Navigation에 대한 완전한 소개는 [React Navigation 시작하기 가이드](https://reactnavigation.org/docs/getting-started)를 따라 진행하세요.
