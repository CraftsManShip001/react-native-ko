---
title: 소스에서 빌드하는 방법
---

새로운 기능/버그 수정 작업을 하거나, 아직 릴리즈되지 않은 최신 기능을 사용해 보거나, 코어에 병합할 수 없는 패치를 포함한 자체 포크를 유지 관리하려면 소스에서 React Native를 빌드해야 합니다.

## Android

### 사전 요구사항

소스에서 빌드하려면 Android SDK가 설치되어 있어야 합니다. [개발 환경 설정](/docs/environment-setup) 가이드를 따랐다면 이미 준비가 되어 있을 것입니다.

NDK 특정 버전이나 CMake 같은 다른 도구를 별도로 설치할 필요는 없습니다. Android SDK가 빌드에 필요한 것들을 **자동으로 다운로드**합니다.

### 프로젝트를 나이틀리 버전으로 설정하기

React Native의 최신 수정 사항과 기능을 사용하려면 다음 명령으로 프로젝트를 나이틀리 버전으로 업데이트할 수 있습니다.

```
yarn add react-native@nightly
```

이렇게 하면 매일 밤 최신 변경 사항과 함께 릴리즈되는 나이틀리 버전의 React Native를 사용하도록 프로젝트가 업데이트됩니다.

### 소스에서 빌드하도록 프로젝트 업데이트하기

안정 릴리즈와 나이틀리 모두 **사전 컴파일된** 아티팩트를 사용하게 됩니다. 대신 소스에서 빌드하도록 전환하여 프레임워크에 대한 변경 사항을 직접 테스트하려면 `android/settings.gradle` 파일을 다음과 같이 수정해야 합니다.

```diff
  // ...
  include ':app'
  includeBuild('../node_modules/@react-native/gradle-plugin')

+ includeBuild('../node_modules/react-native') {
+     dependencySubstitution {
+         substitute(module("com.facebook.react:react-android")).using(project(":packages:react-native:ReactAndroid"))
+         substitute(module("com.facebook.react:react-native")).using(project(":packages:react-native:ReactAndroid"))
+         substitute(module("com.facebook.react:hermes-android")).using(project(":packages:react-native:ReactAndroid:hermes-engine"))
+         substitute(module("com.facebook.react:hermes-engine")).using(project(":packages:react-native:ReactAndroid:hermes-engine"))
+     }
+ }
```

### 추가 참고 사항

소스에서 빌드하면 특히 첫 번째 빌드는 ~200 MB의 아티팩트를 다운로드하고 네이티브 코드를 컴파일해야 하므로 시간이 오래 걸릴 수 있습니다.

저장소에서 `react-native` 버전을 업데이트할 때마다 빌드 디렉토리가 삭제되고 모든 파일이 다시 다운로드될 수 있습니다.
이를 방지하려면 `~/.gradle/init.gradle` 파일을 수정하여 빌드 디렉토리 경로를 변경하는 것이 좋습니다.

```groovy
gradle.projectsLoaded {
    rootProject.allprojects {
        buildDir = "/path/to/build/directory/${rootProject.name}/${project.name}"
    }
}
```

## 배경

React Native를 사용하는 권장 방법은 항상 최신 버전으로 업데이트하는 것입니다. 이전 버전에 대한 지원은 [지원 정책](https://github.com/reactwg/react-native-releases/#releases-support-policy)에 설명되어 있습니다.

소스에서 빌드하는 방법은 풀 리퀘스트를 React Native에 제출하기 전에 수정 사항을 엔드투엔드로 테스트하는 데 사용해야 하며, 장기적으로는 이 방식을 권장하지 않습니다. 특히 React Native를 포크하거나 항상 소스에서 빌드하도록 설정을 전환하면 업데이트하기 더 어려운 프로젝트가 되고 전반적으로 개발 경험이 저하됩니다.
