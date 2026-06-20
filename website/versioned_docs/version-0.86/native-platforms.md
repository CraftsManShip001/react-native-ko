---
id: native-platform
title: Native Platform
---

애플리케이션은 react-native나 커뮤니티에서 관리하는 수백 개의 [서드파티 라이브러리](https://reactnative.directory/)에서 직접 제공하지 않는 플랫폼 기능에 접근해야 할 수 있습니다. 기존의 Objective-C, Swift, Java, Kotlin 또는 C++ 코드를 JavaScript 런타임에서 재사용하고 싶을 수도 있습니다. 이유가 무엇이든, React Native는 네이티브 코드를 JavaScript 애플리케이션 코드에 연결하는 강력한 API 세트를 제공합니다.

이 가이드에서는 다음을 소개합니다:

- **Native Modules:** 사용자를 위한 사용자 인터페이스(UI)가 없는 네이티브 라이브러리. 예로는 영구 저장소, 알림, 네트워크 이벤트 등이 있습니다. 이것들은 JavaScript 함수와 객체로 사용자에게 제공됩니다.
- **Native Component:** React 컴포넌트를 통해 애플리케이션의 JavaScript 코드에서 사용할 수 있는 네이티브 플랫폼 뷰, 위젯 및 컨트롤러.

:::note
이전에 다음 내용에 익숙하셨을 수 있습니다:

- [레거시 Native Modules](./legacy/native-modules-intro);
- [레거시 Native Components](./legacy/native-components-android);

이것들은 deprecated(더 이상 권장되지 않음)된 네이티브 모듈 및 컴포넌트 API입니다. 인터롭 레이어 덕분에 새로운 아키텍처에서도 이러한 레거시 라이브러리를 계속 사용할 수 있습니다. 다음 사항을 고려해보세요:

- 대안 라이브러리 사용,
- 새로운 아키텍처를 기본으로 지원하는 최신 라이브러리 버전으로 업그레이드, 또는
- 이러한 라이브러리를 직접 Turbo Native Modules 또는 Fabric Native Components로 포팅.

:::

1. Native Modules
   - [Android & iOS](turbo-native-modules.md)
   - [Cross-Platform with C++](the-new-architecture/pure-cxx-modules.md)
   - [Advanced: Custom C++ Types](the-new-architecture/custom-cxx-types.md)
2. Fabric Native Components
   - [Android & iOS](fabric-native-components.md)
