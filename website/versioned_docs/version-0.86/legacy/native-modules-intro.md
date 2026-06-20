---
id: native-modules-intro
title: 네이티브 모듈 소개
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

React Native 앱은 때로 JavaScript에서 기본적으로 제공되지 않는 네이티브 플랫폼 API에 접근해야 할 수 있습니다. 예를 들어 Apple Pay나 Google Pay에 접근하는 네이티브 API가 이에 해당합니다. 혹은 기존의 Objective-C, Swift, Java 또는 C++ 라이브러리를 JavaScript로 재구현하지 않고 재사용하거나, 이미지 처리와 같은 작업을 위해 고성능 멀티스레드 코드를 작성하고 싶을 수도 있습니다.

NativeModule 시스템은 Java/Objective-C/C++ (네이티브) 클래스의 인스턴스를 JavaScript(JS) 객체로 노출하여, JS 내에서 임의의 네이티브 코드를 실행할 수 있게 합니다. 이 기능이 일반적인 개발 과정에서 필요하리라고 기대하지는 않지만, 반드시 존재해야 하는 기능입니다. React Native가 JS 앱에 필요한 네이티브 API를 내보내지 않는 경우, 직접 내보낼 수 있어야 합니다!

## 네이티브 모듈 설정

React Native 애플리케이션에 네이티브 모듈을 작성하는 방법에는 여러 가지가 있습니다.

1. React Native 애플리케이션에서 임포트할 수 있는 로컬 라이브러리를 만드는 방법. 자세한 내용은 [로컬 라이브러리 만들기](local-library-setup) 가이드를 참고하세요.
2. React Native 애플리케이션의 iOS/Android 프로젝트 내에 직접 작성하는 방법
3. 자신 또는 다른 React Native 애플리케이션에서 의존성으로 설치할 수 있는 NPM 패키지로 배포하는 방법.

이 가이드에서는 먼저 React Native 애플리케이션 내에 직접 네이티브 모듈을 구현하는 방법을 안내합니다. 단, 다음 가이드에서 빌드하는 네이티브 모듈은 NPM 패키지로도 배포할 수 있습니다. NPM 패키지로 배포하는 데 관심이 있다면 [네이티브 모듈을 NPM 패키지로 설정하기](native-modules-setup) 가이드를 확인하세요.

## 시작하기

다음 섹션에서는 React Native 애플리케이션 내에 직접 네이티브 모듈을 빌드하는 방법을 안내합니다. 시작하기 전에 작업할 React Native 애플리케이션이 필요합니다. 아직 없다면 [여기](../getting-started)의 단계를 따라 React Native 애플리케이션을 설정하세요.

React Native 애플리케이션에서 JavaScript를 사용해 iOS/Android 네이티브 캘린더 API에 접근하여 캘린더 이벤트를 생성하고 싶다고 가정해봅시다. React Native는 네이티브 캘린더 라이브러리와 통신하는 JavaScript API를 제공하지 않습니다. 하지만 네이티브 모듈을 통해 네이티브 캘린더 API와 통신하는 네이티브 코드를 작성할 수 있습니다. 그런 다음 React Native 애플리케이션에서 JavaScript를 통해 해당 네이티브 코드를 호출할 수 있습니다.

다음 섹션에서는 [Android](native-modules-android)와 [iOS](native-modules-ios) 모두를 위한 Calendar 네이티브 모듈을 만들어보겠습니다.
