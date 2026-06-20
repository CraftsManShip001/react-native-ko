---
id: running-on-device
title: Running On Device
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

앱을 사용자에게 배포하기 전에 실제 디바이스에서 테스트하는 것은 항상 좋은 생각입니다. 이 문서는 디바이스에서 React Native 앱을 실행하고 프로덕션 준비를 하기 위한 필요한 단계들을 안내합니다.

:::tip
`create-expo-app`을 사용하여 프로젝트를 설정한 경우, `npm start`를 실행할 때 표시되는 QR 코드를 스캔하여 Expo Go에서 디바이스에 앱을 실행할 수 있습니다. 자세한 내용은 Expo의 [디바이스에서 프로젝트 실행하기](https://docs.expo.dev/get-started/expo-go/) 가이드를 참고하세요.
:::

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

## Android 디바이스에서 앱 실행하기

#### 개발 OS

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

[//]: # 'macOS, Android'

### 1. USB 디버깅 활성화하기

대부분의 Android 디바이스는 기본적으로 Google Play에서 다운로드한 앱만 설치하고 실행할 수 있습니다. 개발 중에 앱을 설치하려면 디바이스에서 USB 디버깅을 활성화해야 합니다.

디바이스에서 USB 디버깅을 활성화하려면 먼저 **설정** → **휴대전화 정보** → **소프트웨어 정보**로 이동하여 하단의 `빌드 번호` 항목을 7번 탭하여 "개발자 옵션" 메뉴를 활성화해야 합니다. 그런 다음 **설정** → **개발자 옵션**으로 돌아가서 "USB 디버깅"을 활성화할 수 있습니다.

### 2. USB로 디바이스 연결하기

이제 React Native 프로젝트를 실행할 Android 디바이스를 설정해봅시다. USB 케이블을 사용하여 디바이스를 개발 머신에 연결하세요.

`adb devices`를 실행하여 디바이스가 ADB(Android Debug Bridge)에 올바르게 연결되어 있는지 확인하세요.

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

오른쪽 열에 `device`가 표시되면 디바이스가 연결된 것입니다. **한 번에 하나의 디바이스만** 연결되어 있어야 합니다.

:::note
목록에 `unauthorized`가 표시되면 `adb reverse tcp:8081 tcp:8081`을 실행하고 디바이스에서 USB 디버깅 허용을 누르세요.
:::

### 3. 앱 실행하기

프로젝트 루트에서 다음 명령어를 명령 프롬프트에 입력하여 디바이스에 앱을 설치하고 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

:::note
"bridge configuration isn't available" 오류가 발생하면 [adb reverse 사용하기](running-on-device.md#방법-1-adb-reverse-사용하기-권장)를 참고하세요.
:::

:::tip
`React Native CLI`를 사용하여 `release` 빌드를 생성하고 실행할 수도 있습니다(예: 프로젝트 루트에서 `yarn android --mode release`).
:::

<h2>개발 서버에 연결하기</h2>

개발 머신에서 실행 중인 개발 서버에 연결하여 디바이스에서 빠르게 반복 작업을 할 수도 있습니다. USB 케이블 또는 Wi-Fi 네트워크에 접근할 수 있는지에 따라 여러 방법을 사용할 수 있습니다.

### 방법 1: adb reverse 사용하기 (권장)

디바이스가 Android 5.0 (Lollipop) 이상을 실행 중이고, USB 디버깅이 활성화되어 있으며, 개발 머신에 USB로 연결되어 있는 경우 이 방법을 사용할 수 있습니다.

명령 프롬프트에서 다음을 실행하세요:

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

디바이스 이름을 찾으려면 다음 adb 명령어를 실행하세요:

```shell
$ adb devices
```

이제 [Dev Menu](debugging.md#dev-menu-열기)에서 Fast Refresh를 활성화할 수 있습니다. JavaScript 코드가 변경될 때마다 앱이 다시 로드됩니다.

### 방법 2: Wi-Fi로 연결하기

Wi-Fi를 통해 개발 서버에 연결할 수도 있습니다. USB 케이블을 사용하여 디바이스에 앱을 먼저 설치해야 하지만, 설치가 완료된 후에는 다음 지침에 따라 무선으로 디버깅할 수 있습니다. 진행하기 전에 개발 머신의 현재 IP 주소가 필요합니다.

IP 주소는 **시스템 설정(또는 시스템 환경설정)** → **네트워크**에서 확인할 수 있습니다.

1. 노트북과 휴대폰이 **동일한** Wi-Fi 네트워크에 연결되어 있는지 확인하세요.
2. 디바이스에서 React Native 앱을 여세요.
3. [오류가 있는 빨간 화면](debugging.md#logbox)이 표시될 것입니다. 괜찮습니다. 다음 단계에서 해결됩니다.
4. 앱 내 [Dev Menu](debugging.md#dev-menu-열기)를 여세요.
5. **Dev Settings** → **Debug server host & port for device**로 이동하세요.
6. 머신의 IP 주소와 로컬 개발 서버의 포트를 입력하세요(예: `10.0.1.1:8081`).
7. **Dev Menu**로 돌아가서 **Reload JS**를 선택하세요.

이제 [Dev Menu](debugging.md#dev-menu-열기)에서 Fast Refresh를 활성화할 수 있습니다. JavaScript 코드가 변경될 때마다 앱이 다시 로드됩니다.

## 프로덕션용 앱 빌드하기

React Native를 사용하여 훌륭한 앱을 만들었고, 이제 Play Store에 출시하고 싶을 것입니다. 이 과정은 다른 네이티브 Android 앱과 동일하며, 몇 가지 추가 고려 사항이 있습니다. [서명된 APK 생성하기](signed-apk-android.md) 가이드를 따라 자세히 알아보세요.

</TabItem>
<TabItem value="windows">

[//]: # 'Windows, Android'

### 1. USB 디버깅 활성화하기

대부분의 Android 디바이스는 기본적으로 Google Play에서 다운로드한 앱만 설치하고 실행할 수 있습니다. 개발 중에 앱을 설치하려면 디바이스에서 USB 디버깅을 활성화해야 합니다.

디바이스에서 USB 디버깅을 활성화하려면 먼저 **설정** → **휴대전화 정보** → **소프트웨어 정보**로 이동하여 하단의 `빌드 번호` 항목을 7번 탭하여 "개발자 옵션" 메뉴를 활성화해야 합니다. 그런 다음 **설정** → **개발자 옵션**으로 돌아가서 "USB 디버깅"을 활성화할 수 있습니다.

### 2. USB로 디바이스 연결하기

이제 React Native 프로젝트를 실행할 Android 디바이스를 설정해봅시다. USB 케이블을 사용하여 디바이스를 개발 머신에 연결하세요.

`adb devices`를 실행하여 디바이스가 ADB(Android Debug Bridge)에 올바르게 연결되어 있는지 확인하세요.

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

오른쪽 열에 `device`가 표시되면 디바이스가 연결된 것입니다. **한 번에 하나의 디바이스만** 연결되어 있어야 합니다.

### 3. 앱 실행하기

프로젝트 루트에서 다음 명령어를 명령 프롬프트에 입력하여 디바이스에 앱을 설치하고 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

:::tip
`React Native CLI`를 사용하여 `release` 빌드를 생성하고 실행할 수도 있습니다(예: 프로젝트 루트에서 `yarn android --mode release`).
:::

<h2>개발 서버에 연결하기</h2>

개발 머신에서 실행 중인 개발 서버에 연결하여 디바이스에서 빠르게 반복 작업을 할 수도 있습니다. USB 케이블 또는 Wi-Fi 네트워크에 접근할 수 있는지에 따라 여러 방법을 사용할 수 있습니다.

### 방법 1: adb reverse 사용하기 (권장)

디바이스가 Android 5.0 (Lollipop) 이상을 실행 중이고, USB 디버깅이 활성화되어 있으며, 개발 머신에 USB로 연결되어 있는 경우 이 방법을 사용할 수 있습니다.

명령 프롬프트에서 다음을 실행하세요:

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

디바이스 이름을 찾으려면 다음 adb 명령어를 실행하세요:

```shell
$ adb devices
```

이제 [Dev Menu](debugging.md#dev-menu-열기)에서 Fast Refresh를 활성화할 수 있습니다. JavaScript 코드가 변경될 때마다 앱이 다시 로드됩니다.

### 방법 2: Wi-Fi로 연결하기

Wi-Fi를 통해 개발 서버에 연결할 수도 있습니다. USB 케이블을 사용하여 디바이스에 앱을 먼저 설치해야 하지만, 설치가 완료된 후에는 다음 지침에 따라 무선으로 디버깅할 수 있습니다. 진행하기 전에 개발 머신의 현재 IP 주소가 필요합니다.

명령 프롬프트를 열고 `ipconfig`를 입력하여 머신의 IP 주소를 확인하세요([자세한 정보](https://windows.microsoft.com/en-us/windows/using-command-line-tools-networking-information)).

1. 노트북과 휴대폰이 **동일한** Wi-Fi 네트워크에 연결되어 있는지 확인하세요.
2. 디바이스에서 React Native 앱을 여세요.
3. [오류가 있는 빨간 화면](debugging.md#logbox)이 표시될 것입니다. 괜찮습니다. 다음 단계에서 해결됩니다.
4. 앱 내 [Dev Menu](debugging.md#dev-menu-열기)를 여세요.
5. **Dev Settings** → **Debug server host & port for device**로 이동하세요.
6. 머신의 IP 주소와 로컬 개발 서버의 포트를 입력하세요(예: `10.0.1.1:8081`).
7. **Dev Menu**로 돌아가서 **Reload JS**를 선택하세요.

이제 [Dev Menu](debugging.md#dev-menu-열기)에서 Fast Refresh를 활성화할 수 있습니다. JavaScript 코드가 변경될 때마다 앱이 다시 로드됩니다.

## 프로덕션용 앱 빌드하기

React Native를 사용하여 훌륭한 앱을 만들었고, 이제 Play Store에 출시하고 싶을 것입니다. 이 과정은 다른 네이티브 Android 앱과 동일하며, 몇 가지 추가 고려 사항이 있습니다. [서명된 APK 생성하기](signed-apk-android.md) 가이드를 따라 자세히 알아보세요.

</TabItem>
<TabItem value="linux">

[//]: # 'Linux, Android'

### 1. USB 디버깅 활성화하기

대부분의 Android 디바이스는 기본적으로 Google Play에서 다운로드한 앱만 설치하고 실행할 수 있습니다. 개발 중에 앱을 설치하려면 디바이스에서 USB 디버깅을 활성화해야 합니다.

디바이스에서 USB 디버깅을 활성화하려면 먼저 **설정** → **휴대전화 정보** → **소프트웨어 정보**로 이동하여 하단의 `빌드 번호` 항목을 7번 탭하여 "개발자 옵션" 메뉴를 활성화해야 합니다. 그런 다음 **설정** → **개발자 옵션**으로 돌아가서 "USB 디버깅"을 활성화할 수 있습니다.

### 2. USB로 디바이스 연결하기

이제 React Native 프로젝트를 실행할 Android 디바이스를 설정해봅시다. USB 케이블을 사용하여 디바이스를 개발 머신에 연결하세요.

다음으로, `lsusb`를 사용하여 제조사 코드를 확인하세요(mac에서는 먼저 [lsusb를 설치](https://github.com/jlhonora/lsusb)해야 합니다). `lsusb`는 다음과 같은 내용을 출력해야 합니다:

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 003: ID 22b8:2e76 Motorola PCS
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

이 줄들은 현재 머신에 연결된 USB 디바이스를 나타냅니다.

휴대폰을 나타내는 줄을 찾으세요. 확실하지 않은 경우, 휴대폰의 플러그를 뽑고 명령어를 다시 실행해보세요:

```bash
$ lsusb
Bus 002 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 001 Device 002: ID 8087:0024 Intel Corp. Integrated Rate Matching Hub
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
Bus 004 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
Bus 003 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```

휴대폰을 제거한 후, 휴대폰 모델명("Motorola PCS")이 포함된 줄이 목록에서 사라진 것을 확인할 수 있습니다. 이것이 우리가 찾는 줄입니다.

`Bus 001 Device 003: ID 22b8:2e76 Motorola PCS`

위 줄에서 디바이스 ID의 처음 네 자리를 가져오세요:

`22b8:2e76`

이 경우 `22b8`입니다. 이것이 Motorola의 식별자입니다.

이를 udev 규칙에 입력하여 실행할 수 있도록 해야 합니다:

```shell
echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="22b8", MODE="0666", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules
```

위 명령어에서 얻은 식별자로 `22b8`을 교체하세요.

이제 `adb devices`를 실행하여 디바이스가 ADB(Android Debug Bridge)에 올바르게 연결되어 있는지 확인하세요.

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

오른쪽 열에 `device`가 표시되면 디바이스가 연결된 것입니다. **한 번에 하나의 디바이스만** 연결되어 있어야 합니다.

### 3. 앱 실행하기

프로젝트 루트에서 다음 명령어를 명령 프롬프트에 입력하여 디바이스에 앱을 설치하고 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

:::note
"bridge configuration isn't available" 오류가 발생하면 [adb reverse 사용하기](running-on-device.md#방법-1-adb-reverse-사용하기-권장)를 참고하세요.
:::

:::tip
`React Native CLI`를 사용하여 `release` 빌드를 생성하고 실행할 수도 있습니다(예: 프로젝트 루트에서 `yarn android --mode release`).
:::

<h2>개발 서버에 연결하기</h2>

개발 머신에서 실행 중인 개발 서버에 연결하여 디바이스에서 빠르게 반복 작업을 할 수도 있습니다. USB 케이블 또는 Wi-Fi 네트워크에 접근할 수 있는지에 따라 여러 방법을 사용할 수 있습니다.

### 방법 1: adb reverse 사용하기 (권장)

디바이스가 Android 5.0 (Lollipop) 이상을 실행 중이고, USB 디버깅이 활성화되어 있으며, 개발 머신에 USB로 연결되어 있는 경우 이 방법을 사용할 수 있습니다.

명령 프롬프트에서 다음을 실행하세요:

```shell
$ adb -s <device name> reverse tcp:8081 tcp:8081
```

디바이스 이름을 찾으려면 다음 adb 명령어를 실행하세요:

```shell
$ adb devices
```

이제 [Dev Menu](debugging.md#dev-menu-열기)에서 Fast Refresh를 활성화할 수 있습니다. JavaScript 코드가 변경될 때마다 앱이 다시 로드됩니다.

### 방법 2: Wi-Fi로 연결하기

Wi-Fi를 통해 개발 서버에 연결할 수도 있습니다. USB 케이블을 사용하여 디바이스에 앱을 먼저 설치해야 하지만, 설치가 완료된 후에는 다음 지침에 따라 무선으로 디버깅할 수 있습니다. 진행하기 전에 개발 머신의 현재 IP 주소가 필요합니다.

터미널을 열고 `/sbin/ifconfig`를 입력하여 머신의 IP 주소를 확인하세요.

1. 노트북과 휴대폰이 **동일한** Wi-Fi 네트워크에 연결되어 있는지 확인하세요.
2. 디바이스에서 React Native 앱을 여세요.
3. [오류가 있는 빨간 화면](debugging.md#logbox)이 표시될 것입니다. 괜찮습니다. 다음 단계에서 해결됩니다.
4. 앱 내 [Dev Menu](debugging.md#dev-menu-열기)를 여세요.
5. **Dev Settings** → **Debug server host & port for device**로 이동하세요.
6. 머신의 IP 주소와 로컬 개발 서버의 포트를 입력하세요(예: `10.0.1.1:8081`).
7. **Dev Menu**로 돌아가서 **Reload JS**를 선택하세요.

이제 [Dev Menu](debugging.md#dev-menu-열기)에서 Fast Refresh를 활성화할 수 있습니다. JavaScript 코드가 변경될 때마다 앱이 다시 로드됩니다.

## 프로덕션용 앱 빌드하기

React Native를 사용하여 훌륭한 앱을 만들었고, 이제 Play Store에 출시하고 싶을 것입니다. 이 과정은 다른 네이티브 Android 앱과 동일하며, 몇 가지 추가 고려 사항이 있습니다. [서명된 APK 생성하기](signed-apk-android.md) 가이드를 따라 자세히 알아보세요.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="ios">

## iOS 디바이스에서 앱 실행하기

#### 개발 OS

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

[//]: # 'macOS, iOS'

### 1. USB로 디바이스 연결하기

USB to Lightning 또는 USB-C 케이블을 사용하여 iOS 디바이스를 Mac에 연결하세요. 프로젝트의 `ios` 폴더로 이동한 다음, Xcode를 사용하여 `.xcodeproj` 파일을 열거나, CocoaPods를 사용 중인 경우 `.xcworkspace` 파일을 여세요.

iOS 디바이스에서 처음으로 앱을 실행하는 경우, 개발을 위해 디바이스를 등록해야 할 수 있습니다. Xcode의 메뉴 바에서 **Product** 메뉴를 열고 **Destination**으로 이동하세요. 목록에서 디바이스를 찾아 선택하세요. 그러면 Xcode가 개발을 위해 디바이스를 등록합니다.

### 2. 코드 서명 설정하기

아직 [Apple Developer 계정](https://developer.apple.com/)이 없다면 등록하세요.

Xcode Project Navigator에서 프로젝트를 선택한 다음 메인 타겟(프로젝트와 동일한 이름을 가짐)을 선택하세요. "General" 탭을 찾으세요. "Signing"으로 이동하여 Team 드롭다운에서 Apple Developer 계정 또는 팀이 선택되어 있는지 확인하세요. 테스트 타겟(Tests로 끝나며 메인 타겟 아래에 있음)에도 동일하게 수행하세요.

프로젝트의 **Tests** 타겟에 대해서도 이 단계를 **반복**하세요.

![](/docs/assets/RunningOnDeviceCodeSigning.png)

### 3. 앱 빌드 및 실행하기

모든 설정이 올바르게 되어 있다면, 디바이스가 Xcode 툴바의 빌드 타겟으로 표시되고 Devices 패널(<kbd>Shift ⇧</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>2</kbd>)에도 나타납니다. **Build and run** 버튼(<kbd>Cmd ⌘</kbd> + <kbd>R</kbd>)을 누르거나 **Product** 메뉴에서 **Run**을 선택할 수 있습니다. 잠시 후 앱이 디바이스에서 실행됩니다.

![](/docs/assets/RunningOnDeviceReady.png)

:::note
문제가 발생하면 Apple의 [디바이스에서 앱 실행하기](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html#//apple_ref/doc/uid/TP40012582-CH27-SW4) 문서를 참고하세요.
:::

<h2>개발 서버에 연결하기</h2>

개발 서버를 사용하여 디바이스에서 빠르게 반복 작업을 할 수도 있습니다. 컴퓨터와 동일한 Wi-Fi 네트워크에 연결되어 있기만 하면 됩니다. 디바이스를 흔들어 [Dev Menu](debugging.md#dev-menu-열기)를 열고 Fast Refresh를 활성화하세요. JavaScript 코드가 변경될 때마다 앱이 다시 로드됩니다.

![](/docs/assets/debugging-dev-menu-083.jpg)

### 문제 해결

:::tip
문제가 있는 경우 Mac과 디바이스가 동일한 네트워크에 있고 서로 통신할 수 있는지 확인하세요. 캡티브 포털이 있는 많은 개방형 무선 네트워크는 네트워크의 다른 디바이스와 통신하지 못하도록 구성되어 있습니다. 이 경우 디바이스의 개인 핫스팟 기능을 사용할 수 있습니다. USB를 통해 Mac에서 디바이스로 인터넷(Wi-Fi/이더넷) 연결을 공유하고 이 터널을 통해 번들러에 연결하면 매우 빠른 전송 속도를 얻을 수 있습니다.
:::

개발 서버에 연결을 시도할 때 다음과 같은 오류가 있는 [빨간 화면](debugging.md#logbox)이 표시될 수 있습니다:

:::note
`http://localhost:8081/debugger-proxy?role=client`에 대한 연결이 시간 초과되었습니다. node 프록시를 실행 중인가요? 디바이스에서 실행 중인 경우, `RCTWebSocketExecutor.m`에 올바른 IP 주소가 있는지 확인하세요.
:::

이 문제를 해결하려면 다음 사항을 확인하세요.

#### 1. Wi-Fi 네트워크

노트북과 휴대폰이 **동일한** Wi-Fi 네트워크에 연결되어 있는지 확인하세요.

#### 2. IP 주소

빌드 스크립트가 머신의 IP 주소를 올바르게 감지했는지 확인하세요(예: `10.0.1.123`).

![](/docs/assets/XcodeBuildIP.png)

**Report navigator** 탭을 열고, 마지막 **Build**를 선택한 다음 IP 주소 뒤에 `IP=`를 검색하세요. 앱에 포함된 IP 주소가 머신의 IP 주소와 일치해야 합니다.

## 프로덕션용 앱 빌드하기

React Native를 사용하여 훌륭한 앱을 만들었고, 이제 App Store에 출시하고 싶을 것입니다. 이 과정은 다른 네이티브 iOS 앱과 동일하며, 몇 가지 추가 고려 사항이 있습니다. [Apple App Store에 게시하기](publishing-to-app-store.md) 가이드를 따라 자세히 알아보세요.

</TabItem>
<TabItem value="windows">

[//]: # 'Windows, iOS'

:::info
iOS 디바이스용 앱을 빌드하려면 Mac이 필요합니다. 또는 [환경 설정 가이드](environment-setup)를 참고하여 Expo CLI를 사용하여 앱을 빌드하는 방법을 알아볼 수 있습니다. Expo CLI를 사용하면 Expo 클라이언트 앱으로 앱을 실행할 수 있습니다.
:::

</TabItem>
<TabItem value="linux">

[//]: # 'Linux, iOS'

:::info
iOS 디바이스용 앱을 빌드하려면 Mac이 필요합니다. 또는 [환경 설정 가이드](environment-setup)를 참고하여 Expo CLI를 사용하여 앱을 빌드하는 방법을 알아볼 수 있습니다. Expo CLI를 사용하면 Expo 클라이언트 앱으로 앱을 실행할 수 있습니다.
:::

</TabItem>
</Tabs>

</TabItem>
</Tabs>
