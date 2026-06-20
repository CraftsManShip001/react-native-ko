---
id: signed-apk-android
title: Google Play 스토어에 게시하기
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Android는 모든 앱을 설치하기 전에 인증서로 디지털 서명하도록 요구합니다. [Google Play 스토어](https://play.google.com/store)를 통해 Android 앱을 배포하려면 릴리즈 키로 서명해야 하며, 이 키는 이후 모든 업데이트에도 사용해야 합니다. 2017년부터 [App Signing by Google Play](https://developer.android.com/studio/publish/app-signing#app-signing-google-play) 기능 덕분에 Google Play가 릴리즈 서명을 자동으로 관리할 수 있게 되었습니다. 그러나 앱 바이너리를 Google Play에 업로드하기 전에 업로드 키로 서명해야 합니다. Android 개발자 문서의 [앱 서명하기](https://developer.android.com/tools/publishing/app-signing.html) 페이지에서 이 주제를 자세히 설명합니다. 이 가이드는 그 과정을 간략히 다루고, JavaScript 번들을 패키징하는 데 필요한 단계들을 나열합니다.

:::info
Expo를 사용 중이라면, Google Play 스토어에 앱을 빌드하고 제출하기 위한 Expo 가이드 [앱 스토어에 배포하기](https://docs.expo.dev/distribution/app-stores/)를 참고하세요. 이 가이드는 모든 React Native 앱에서 배포 프로세스를 자동화하는 데 활용할 수 있습니다.
:::

## 업로드 키 생성하기

`keytool`을 사용하여 개인 서명 키를 생성할 수 있습니다.

### Windows

Windows에서 `keytool`은 관리자 권한으로 `C:\Program Files\Java\jdkx.x.x_x\bin`에서 실행해야 합니다.

```shell
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

이 명령은 키스토어와 키에 대한 비밀번호와 키의 식별 이름(Distinguished Name) 필드를 묻습니다. 그런 다음 `my-upload-key.keystore`라는 파일로 키스토어를 생성합니다.

키스토어는 10000일 동안 유효한 단일 키를 포함합니다. 별칭(alias)은 나중에 앱에 서명할 때 사용할 이름이므로 꼭 기억해 두세요.

### macOS

macOS에서 JDK bin 폴더의 위치를 모른다면 다음 명령으로 찾을 수 있습니다.

```shell
/usr/libexec/java_home
```

이 명령은 JDK 디렉토리를 출력하며, 다음과 같은 형태입니다.

```shell
/Library/Java/JavaVirtualMachines/jdkX.X.X_XXX.jdk/Contents/Home
```

`cd /your/jdk/path` 명령으로 해당 디렉토리로 이동한 후, 아래와 같이 sudo 권한으로 keytool 명령을 실행하세요.

```shell
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

:::caution
키스토어 파일을 반드시 비공개로 유지하세요. 업로드 키를 분실하거나 유출된 경우 [이 지침을 따르세요](https://support.google.com/googleplay/android-developer/answer/7384423#reset).
:::

## Gradle 변수 설정하기

1. 프로젝트 폴더의 `android/app` 디렉토리에 `my-upload-key.keystore` 파일을 놓으세요.
2. `~/.gradle/gradle.properties` 또는 `android/gradle.properties` 파일을 편집하고, 다음을 추가하세요(`*****`를 올바른 키스토어 비밀번호, 별칭, 키 비밀번호로 교체하세요).

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

이것들은 전역 Gradle 변수로, 나중에 Gradle 설정에서 앱 서명에 사용할 수 있습니다.

:::note[git 사용에 관한 참고사항]
위의 Gradle 변수를 `android/gradle.properties` 대신 `~/.gradle/gradle.properties`에 저장하면 git에 체크인되는 것을 방지할 수 있습니다. 변수를 추가하기 전에 사용자 홈 디렉토리에 `~/.gradle/gradle.properties` 파일을 먼저 생성해야 할 수도 있습니다.
:::

:::note[보안에 관한 참고사항]
비밀번호를 평문으로 저장하고 싶지 않고 macOS를 사용 중이라면, [키체인 접근 앱에 자격 증명을 저장](https://pilloxa.gitlab.io/posts/safer-passwords-in-gradle/)할 수도 있습니다. 그러면 `~/.gradle/gradle.properties`의 마지막 두 줄을 생략할 수 있습니다.
:::

## 앱의 Gradle 설정에 서명 설정 추가하기

마지막 설정 단계는 업로드 키를 사용하여 릴리즈 빌드에 서명하도록 설정하는 것입니다. 프로젝트 폴더의 `android/app/build.gradle` 파일을 편집하고 서명 설정을 추가하세요.

```groovy
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

## 릴리즈 AAB 생성하기

터미널에서 다음 명령을 실행하세요.

```shell
npx react-native build-android --mode=release
```

이 명령은 내부적으로 Gradle의 `bundleRelease`를 사용하여 앱 실행에 필요한 모든 JavaScript를 AAB([Android App Bundle](https://developer.android.com/guide/app-bundle))로 번들링합니다. JavaScript 번들 및/또는 드로어블 리소스가 번들링되는 방식을 변경해야 하는 경우(예: 기본 파일/폴더 이름이나 프로젝트의 전반적인 구조를 변경한 경우) `android/app/build.gradle`을 확인하여 이러한 변경사항을 반영하도록 업데이트하는 방법을 살펴보세요.

:::note
`gradle.properties`에 `org.gradle.configureondemand=true`가 포함되어 있지 않은지 확인하세요. 이 옵션이 있으면 릴리즈 빌드 시 JS와 에셋이 앱 바이너리에 번들링되지 않습니다.
:::

생성된 AAB는 `android/app/build/outputs/bundle/release/app-release.aab`에서 찾을 수 있으며, Google Play에 업로드할 준비가 된 상태입니다.

Google Play가 AAB 형식을 수락하려면 Google Play Console에서 앱에 대한 App Signing by Google Play 설정이 필요합니다. App Signing by Google Play를 사용하지 않는 기존 앱을 업데이트하는 경우, [마이그레이션 섹션](#이전-android-react-native-앱을-app-signing-by-google-play로-마이그레이션하기)에서 해당 설정을 변경하는 방법을 확인하세요.

## 앱의 릴리즈 빌드 테스트하기

Play 스토어에 릴리즈 빌드를 업로드하기 전에 철저히 테스트해야 합니다. 먼저 기존에 설치된 이전 버전의 앱을 제거하세요. 프로젝트 루트에서 다음 명령을 사용하여 기기에 설치하세요.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android -- --mode="release"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android --mode release
```

</TabItem>
</Tabs>

`--mode release`는 위에서 설명한 대로 서명을 설정한 경우에만 사용할 수 있습니다.

모든 프레임워크와 JavaScript 코드가 APK의 에셋에 번들링되어 있으므로 실행 중인 번들러 인스턴스를 종료할 수 있습니다.

## 다른 스토어에 게시하기

기본적으로 생성된 APK는 `x86`, `x86_64`, `ARMv7a`, `ARM64-v8a` CPU 아키텍처에 대한 네이티브 코드를 모두 포함합니다. 이를 통해 거의 모든 Android 기기에서 실행할 수 있는 APK를 쉽게 공유할 수 있습니다. 그러나 이로 인해 모든 기기에 사용되지 않는 네이티브 코드가 포함되어 APK 크기가 불필요하게 커지는 단점이 있습니다.

`android/app/build.gradle` 파일에 다음 줄을 추가하여 각 CPU별 APK를 생성할 수 있습니다.

```diff
android {

    splits {
        abi {
            reset()
            enable true
            universalApk false
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
        }
    }

}
```

[Amazon AppStore](https://developer.amazon.com/docs/app-submission/device-filtering-and-compatibility.html)나 [F-Droid](https://f-droid.org/en/)처럼 기기 타겟팅을 지원하는 마켓에 이 파일들을 업로드하면 사용자가 자동으로 적합한 APK를 받게 됩니다. 단일 앱에 대해 여러 APK를 지원하지 않는 [APKFiles](https://www.apkfiles.com/)와 같은 다른 마켓에 업로드하려면, `universalApk false` 줄을 `true`로 변경하여 두 CPU 바이너리가 모두 포함된 기본 범용 APK를 생성하세요.

공식 Android 문서의 [이 페이지](https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions)에서 제안하는 대로 서로 다른 버전 코드도 설정해야 한다는 점을 참고하세요.

## APK 크기를 줄이기 위한 Proguard 활성화(선택 사항)

Proguard는 APK 크기를 약간 줄일 수 있는 도구입니다. 앱이 사용하지 않는 React Native Java 바이트코드(및 그 의존성)의 일부를 제거하는 방식으로 동작합니다.

:::caution[중요]
Proguard를 활성화한 경우 앱을 철저히 테스트하세요. Proguard는 종종 사용 중인 각 네이티브 라이브러리에 대한 특별한 설정이 필요합니다. `app/proguard-rules.pro`를 참고하세요.
:::

Proguard를 활성화하려면 `android/app/build.gradle`을 편집하세요.

```groovy
/**
 * Run Proguard to shrink the Java bytecode in release builds.
 */
def enableProguardInReleaseBuilds = true
```

## 이전 Android React Native 앱을 App Signing by Google Play로 마이그레이션하기

이전 버전의 React Native에서 마이그레이션하는 경우, 앱이 App Signing by Google Play 기능을 사용하지 않을 수 있습니다. 자동 앱 분할과 같은 기능을 활용하기 위해 이를 활성화하는 것을 권장합니다. 기존 서명 방식에서 마이그레이션하려면 먼저 [새 업로드 키를 생성](#업로드-키-생성하기)한 다음, `android/app/build.gradle`의 릴리즈 서명 설정을 릴리즈 키 대신 업로드 키를 사용하도록 교체해야 합니다([gradle에 서명 설정 추가하기](#앱의-gradle-설정에-서명-설정-추가하기) 섹션 참고). 완료되면 [Google Play 도움말 웹사이트의 지침](https://support.google.com/googleplay/android-developer/answer/7384423)에 따라 원래 릴리즈 키를 Google Play에 전송하세요.

## 기본 권한

기본적으로 거의 모든 앱이 인터넷을 사용하므로 `INTERNET` 권한이 Android 앱에 추가됩니다. `SYSTEM_ALERT_WINDOW` 권한은 디버그 모드에서 Android APK에 추가되지만 프로덕션에서는 제거됩니다.
