---
id: build-speed
title: 빌드 속도 향상하기
---

React Native 앱을 빌드하는 것은 **비용이 많이 들고** 개발자의 시간을 몇 분씩 소모할 수 있습니다.
프로젝트가 커지고 여러 React Native 개발자가 있는 대규모 조직에서는 이 문제가 더욱 심각해질 수 있습니다.

이러한 성능 저하를 완화하기 위해, 이 페이지에서는 **빌드 시간을 개선하는 방법**에 대한 몇 가지 제안을 공유합니다.

:::info

이 제안들은 네이티브 빌드 도구의 작동 방식에 대한 어느 정도의 이해가 필요한 고급 기능입니다.

:::

## 개발 중 하나의 ABI만 빌드하기 (Android 전용)

로컬에서 Android 앱을 빌드할 때, 기본적으로 4개의 [애플리케이션 바이너리 인터페이스(ABI)](https://developer.android.com/ndk/guides/abis)를 모두 빌드합니다: `armeabi-v7a`, `arm64-v8a`, `x86`, `x86_64`.

그러나 로컬에서 빌드하면서 에뮬레이터나 실제 기기에서 테스트하는 경우 모두 빌드할 필요는 없습니다.

이렇게 하면 **네이티브 빌드 시간**을 약 75% 단축할 수 있습니다.

React Native CLI를 사용하는 경우, `run-android` 명령에 `--active-arch-only` 플래그를 추가할 수 있습니다. 이 플래그는 실행 중인 에뮬레이터나 연결된 기기에서 올바른 ABI를 선택하도록 합니다. 이 방식이 제대로 작동하는지 확인하려면 콘솔에서 `info Detected architectures arm64-v8a`와 같은 메시지를 볼 수 있습니다.

```
$ yarn react-native run-android --active-arch-only

[ ... ]
info Running jetifier to migrate libraries to AndroidX. You can disable it using "--no-jetifier" flag.
Jetifier found 1037 file(s) to forward-jetify. Using 32 workers...
info JS server already running.
info Detected architectures arm64-v8a
info Installing the app...
```

이 메커니즘은 `reactNativeArchitectures` Gradle 속성에 의존합니다.

따라서 CLI 없이 커맨드라인에서 직접 Gradle로 빌드하는 경우, 다음과 같이 빌드할 ABI를 지정할 수 있습니다:

```
$ ./gradlew :app:assembleDebug -PreactNativeArchitectures=x86,x86_64
```

이는 CI에서 Android 앱을 빌드하면서 매트릭스를 사용해 서로 다른 아키텍처 빌드를 병렬화하려는 경우에 유용합니다.

원하는 경우, 프로젝트의 [최상위 폴더](https://github.com/facebook/react-native/blob/19cf70266eb8ca151aa0cc46ac4c09cb987b2ceb/template/android/gradle.properties#L30-L33)에 있는 `gradle.properties` 파일을 사용해 이 값을 로컬에서 재정의할 수도 있습니다:

```
# Use this property to specify which architecture you want to build.
# You can also override it from the CLI using
# ./gradlew <task> -PreactNativeArchitectures=x86_64
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

앱의 **릴리스 버전**을 빌드할 때는 이 플래그를 제거하는 것을 잊지 마세요. 일상적인 개발 워크플로우에서 사용하는 ABI만이 아닌 모든 ABI에서 작동하는 apk/앱 번들을 빌드해야 합니다.

## Configuration Caching 활성화하기 (Android 전용)

React Native 0.79부터 Gradle Configuration Caching을 활성화할 수도 있습니다.

`yarn android`로 Android 빌드를 실행하면, 두 단계([출처](https://docs.gradle.org/current/userguide/build_lifecycle.html))로 구성된 Gradle 빌드가 실행됩니다:

- 구성 단계: 모든 `.gradle` 파일이 평가됩니다.
- 실행 단계: 태스크가 실제로 실행되어 Java/Kotlin 코드가 컴파일됩니다.

이제 Configuration Caching을 활성화할 수 있으며, 이를 통해 이후 빌드에서 구성 단계를 건너뛸 수 있습니다.

이는 네이티브 코드를 자주 변경할 때 빌드 시간을 개선하는 데 유익합니다.

예를 들어, 네이티브 코드를 변경한 후 RN-Tester를 다시 빌드하는 속도가 얼마나 빨라지는지 확인할 수 있습니다:

![gradle config caching](/docs/assets/gradle-config-caching.gif)

`android/gradle.properties` 파일에 다음 줄을 추가하여 Gradle Configuration Caching을 활성화할 수 있습니다:

```
org.gradle.configuration-cache=true
```

Configuration Caching에 대한 더 많은 정보는 [공식 Gradle 문서](https://docs.gradle.org/current/userguide/configuration_cache.html)를 참조하세요.

## Maven 미러 사용하기 (Android 전용)

Android 앱을 빌드할 때, Gradle 빌드는 Maven Central 및 인터넷의 다른 저장소에서 필요한 의존성을 다운로드해야 합니다.

조직에서 Maven 저장소 미러를 운영하는 경우, 인터넷 대신 미러에서 아티팩트를 다운로드하여 빌드 속도를 높일 수 있으므로 사용을 고려해 보세요.

`android/gradle.properties` 파일에서 `exclusiveEnterpriseRepository` 속성을 지정하여 미러를 구성할 수 있습니다:

```diff
# Use this property to enable or disable the Hermes JS engine.
# If set to false, you will be using JSC instead.
hermesEnabled=true

# Use this property to configure a Maven enterprise repository
# that will be used exclusively to fetch all of your dependencies.
+exclusiveEnterpriseRepository=https://my.internal.proxy.net/
```

이 속성을 설정하면 빌드가 다른 저장소가 아닌 지정된 저장소에서만 **독점적으로** 의존성을 가져옵니다.

## 컴파일러 캐시 사용하기

C++ 또는 Objective-C 네이티브 빌드를 자주 실행하는 경우 **컴파일러 캐시**를 사용하면 이점을 얻을 수 있습니다.

구체적으로 로컬 컴파일러 캐시와 분산 컴파일러 캐시 두 가지 유형의 캐시를 사용할 수 있습니다.

### 로컬 캐시

:::info
다음 지침은 **Android와 iOS 모두**에 적용됩니다.
Android 앱만 빌드하는 경우 바로 사용할 수 있습니다.
iOS 앱도 빌드하는 경우, 아래 [Xcode 전용 설정](#xcode-전용-설정) 섹션의 지침을 따르세요.
:::

네이티브 빌드의 컴파일을 캐시하기 위해 [**ccache**](https://ccache.dev/)를 사용하는 것을 권장합니다.
Ccache는 C++ 컴파일러를 래핑하여 컴파일 결과를 저장하고, 중간 컴파일 결과가 이미 저장된 경우 컴파일을 건너뜁니다.

Ccache는 대부분의 운영 체제의 패키지 매니저에서 사용할 수 있습니다. macOS에서는 `brew install ccache`로 ccache를 설치할 수 있습니다.
또는 [공식 설치 지침](https://github.com/ccache/ccache/blob/master/doc/install.md)을 따라 소스에서 설치할 수 있습니다.

그런 다음 두 번의 클린 빌드를 수행할 수 있습니다(예: Android에서 먼저 `yarn react-native run-android`를 실행하고, `android/app/build` 폴더를 삭제한 후 첫 번째 명령을 다시 실행합니다). 두 번째 빌드가 첫 번째보다 훨씬 빠른 것을 알 수 있습니다(몇 분이 아닌 몇 초가 걸려야 합니다).
빌드 중에 `ccache -s`로 `ccache`가 올바르게 작동하는지 확인하고 캐시 히트/미스 비율을 확인할 수 있습니다.

```
$ ccache -s
Summary:
  Hits:             196 /  3068 (6.39 %)
    Direct:           0 /  3068 (0.00 %)
    Preprocessed:   196 /  3068 (6.39 %)
  Misses:          2872
    Direct:        3068
    Preprocessed:  2872
  Uncacheable:        1
Primary storage:
  Hits:             196 /  6136 (3.19 %)
  Misses:          5940
  Cache size (GB): 0.60 / 20.00 (3.00 %)
```

`ccache`는 모든 빌드에 걸쳐 통계를 집계합니다. 빌드 전에 `ccache --zero-stats`를 사용하여 통계를 초기화하고 캐시 히트 비율을 확인할 수 있습니다.

캐시를 초기화해야 하는 경우 `ccache --clear`로 수행할 수 있습니다.

#### Xcode 전용 설정

`ccache`가 iOS와 Xcode에서 올바르게 작동하려면 `ios/Podfile`에서 React Native의 ccache 지원을 활성화해야 합니다.

에디터에서 `ios/Podfile`을 열고 `ccache_enabled` 줄의 주석을 해제합니다.

```ruby
  post_install do |installer|
    # https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202
    react_native_post_install(
      installer,
      config[:reactNativePath],
      :mac_catalyst_enabled => false,
      # TODO: Uncomment the line below
      :ccache_enabled => true
    )
  end
```

#### CI에서 이 방법 사용하기

Ccache는 macOS에서 캐시를 저장하기 위해 `/Users/$USER/Library/Caches/ccache` 폴더를 사용합니다.
따라서 CI에서도 해당 폴더를 저장 및 복원하여 빌드 속도를 높일 수 있습니다.

그러나 주의해야 할 사항이 있습니다:

1. CI에서는 오염된 캐시 문제를 방지하기 위해 완전한 클린 빌드를 수행하는 것을 권장합니다. 이전 단락에서 언급한 방식을 따른다면 4개의 서로 다른 ABI에서 네이티브 빌드를 병렬화할 수 있으며 CI에서 `ccache`가 필요하지 않을 가능성이 높습니다.

2. `ccache`는 캐시 히트를 계산하기 위해 타임스탬프에 의존합니다. CI 실행마다 파일이 다시 다운로드되므로 CI에서는 제대로 작동하지 않습니다. 이를 해결하려면 타임스탬프 대신 [파일 내용을 해싱](https://ccache.dev/manual/4.3.html)하는 `compiler_check content` 옵션을 사용해야 합니다.

### 분산 캐시

로컬 캐시와 유사하게, 네이티브 빌드를 위한 분산 캐시 사용도 고려할 수 있습니다.
이는 자주 네이티브 빌드를 수행하는 대규모 조직에서 특히 유용합니다.

이를 위해 [sccache](https://github.com/mozilla/sccache)를 사용하는 것을 권장합니다.
이 도구의 설정 및 사용 방법은 sccache [분산 컴파일 빠른 시작](https://github.com/mozilla/sccache/blob/main/docs/DistributedQuickstart.md)을 참조하세요.
