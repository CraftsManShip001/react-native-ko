## 의존성 설치

Node, Watchman, React Native 커맨드 라인 인터페이스, JDK, 그리고 Android Studio가 필요합니다.

앱을 개발할 때 원하는 편집기를 자유롭게 사용할 수 있지만, Android용 React Native 앱을 빌드하는 데 필요한 툴링을 설정하려면 Android Studio를 설치해야 합니다.

<h3>Node &amp; Watchman</h3>

[Homebrew](https://brew.sh/)를 사용하여 Node와 Watchman을 설치하는 것을 권장합니다. Homebrew를 설치한 후 터미널에서 다음 명령어를 실행하세요:

```shell
brew install node
brew install watchman
```

시스템에 이미 Node가 설치되어 있다면 Node 22.11.0 이상인지 확인하세요.

[Watchman](https://facebook.github.io/watchman)은 파일시스템의 변경 사항을 감시하는 Facebook이 만든 도구입니다. 더 나은 성능을 위해 설치하는 것을 강력히 권장합니다.

<h3>Java Development Kit</h3>

[Homebrew](https://brew.sh/)를 사용하여 Azul **Zulu**라는 OpenJDK 배포판을 설치하는 것을 권장합니다. Homebrew를 설치한 후 터미널에서 다음 명령어를 실행하세요:

```shell
brew install --cask zulu@17

# Get path to where cask was installed to find the JDK installer
brew info --cask zulu@17

# ==> zulu@17: <version number>
# https://www.azul.com/downloads/
# Installed
# /opt/homebrew/Caskroom/zulu@17/<version number> (185.8MB) (note that the path is /usr/local/Caskroom on non-Apple Silicon Macs)
# Installed using the formulae.brew.sh API on 2024-06-06 at 10:00:00

# Navigate to the folder
open /opt/homebrew/Caskroom/zulu@17/<version number> # or /usr/local/Caskroom/zulu@17/<version number>
```

Finder가 열리면 `Double-Click to Install Azul Zulu JDK 17.pkg` 패키지를 더블클릭하여 JDK를 설치하세요.

JDK 설치 후 `~/.zshrc` (또는 `~/.bash_profile`)에 `JAVA_HOME` 환경 변수를 추가하거나 업데이트하세요.

위 단계를 따랐다면 JDK는 보통 `/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home`에 위치합니다:

```shell
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

Zulu OpenJDK 배포판은 **Intel 및 M1 Mac 모두**를 위한 JDK를 제공합니다. 이를 통해 Intel 기반 JDK를 사용할 때보다 M1 Mac에서 빌드 속도가 더 빨라집니다.

시스템에 이미 JDK가 설치되어 있다면 JDK 17을 권장합니다. 상위 버전의 JDK를 사용할 경우 문제가 발생할 수 있습니다.

<h3>Android 개발 환경</h3>

Android 개발이 처음이라면 개발 환경 설정이 다소 번거로울 수 있습니다. 이미 Android 개발에 익숙하다면 몇 가지 설정이 필요할 수 있습니다. 어느 경우든 다음 단계를 주의 깊게 따르세요.

<h4 id="android-studio">1. Android Studio 설치</h4>

[Android Studio를 다운로드하고 설치합니다](https://developer.android.com/studio). Android Studio 설치 마법사에서 다음 항목들이 모두 체크되어 있는지 확인하세요:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

그런 다음 "Next"를 클릭하여 이 컴포넌트들을 모두 설치하세요.

:::note
체크박스가 회색으로 표시되는 경우, 나중에 이 컴포넌트들을 설치할 기회가 있습니다.
:::

설정이 완료되고 Welcome 화면이 나타나면 다음 단계로 진행하세요.

<h4 id="android-sdk">2. Android SDK 설치</h4>

Android Studio는 기본적으로 최신 Android SDK를 설치합니다. 그러나 네이티브 코드를 사용하여 React Native 앱을 빌드하려면 특히 `Android 15 (VanillaIceCream)` SDK가 필요합니다. Android Studio의 SDK Manager를 통해 추가 Android SDK를 설치할 수 있습니다.

이를 위해 Android Studio를 열고 "More Actions" 버튼을 클릭한 후 "SDK Manager"를 선택하세요.

![Android Studio Welcome](/docs/assets/GettingStartedAndroidStudioWelcomeMacOS.png)

:::tip
SDK Manager는 Android Studio "Settings" 대화상자의 **Languages & Frameworks** → **Android SDK**에서도 찾을 수 있습니다.
:::

SDK Manager에서 "SDK Platforms" 탭을 선택한 다음 오른쪽 하단의 "Show Package Details" 체크박스를 선택하세요. `Android 15 (VanillaIceCream)` 항목을 찾아 펼친 후 다음 항목들이 체크되어 있는지 확인하세요:

- `Android SDK Platform 35`
- `Intel x86 Atom_64 System Image` 또는 `Google APIs Intel x86 Atom System Image` 또는 (Apple M1 Silicon의 경우) `Google APIs ARM 64 v8a System Image`

다음으로 "SDK Tools" 탭을 선택하고 "Show Package Details" 체크박스도 선택하세요. "Android SDK Build-Tools" 항목을 찾아 펼친 후 `36.0.0`과 `Android SDK Command-line Tools (latest)`가 선택되어 있는지 확인하세요.

마지막으로 "Apply"를 클릭하여 Android SDK와 관련 빌드 도구를 다운로드하고 설치하세요.

<h4>3. ANDROID_HOME 환경 변수 설정</h4>

React Native 도구가 네이티브 코드로 앱을 빌드하려면 몇 가지 환경 변수를 설정해야 합니다.

`~/.zprofile` 또는 `~/.zshrc` (`bash`를 사용하는 경우 `~/.bash_profile` 또는 `~/.bashrc`) 설정 파일에 다음 줄을 추가하세요:

```shell
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

`source ~/.zprofile` (또는 `bash`의 경우 `source ~/.bash_profile`)을 실행하여 현재 셸에 설정을 로드하세요. `echo $ANDROID_HOME`을 실행하여 ANDROID_HOME이 설정되었는지, `echo $PATH`를 실행하여 적절한 디렉토리가 경로에 추가되었는지 확인하세요.

:::note
올바른 Android SDK 경로를 사용하고 있는지 확인하세요. Android Studio "Settings" 대화상자의 **Languages & Frameworks** → **Android SDK**에서 SDK의 실제 위치를 찾을 수 있습니다.
:::

<h2>Android 기기 준비</h2>

React Native Android 앱을 실행하려면 Android 기기가 필요합니다. 물리적인 Android 기기를 사용하거나, 더 일반적으로는 컴퓨터에서 Android 기기를 에뮬레이션할 수 있는 Android Virtual Device를 사용할 수 있습니다.

어느 방법을 선택하든 개발을 위해 Android 앱을 실행할 수 있도록 기기를 준비해야 합니다.

<h3>물리적 기기 사용</h3>

물리적 Android 기기가 있다면 USB 케이블로 컴퓨터에 연결하고 [여기](running-on-device.md)의 안내를 따라 AVD 대신 개발에 사용할 수 있습니다.

<h3>가상 기기 사용</h3>

Android Studio로 `./AwesomeProject/android`를 열면 Android Studio 내의 "AVD Manager"를 통해 사용 가능한 Android Virtual Devices(AVD) 목록을 볼 수 있습니다. 다음과 같은 아이콘을 찾으세요:

<img src="/docs/assets/GettingStartedAndroidStudioAVD.svg" alt="Android Studio AVD Manager" width="100"/>

Android Studio를 최근에 설치했다면 [새 AVD를 생성](https://developer.android.com/studio/run/managing-avds.html)해야 할 가능성이 높습니다. "Create Virtual Device..."를 선택한 후 목록에서 임의의 Phone을 선택하고 "Next"를 클릭한 다음 **VanillaIceCream** API Level 35 이미지를 선택하세요.

"Next"를 클릭한 후 "Finish"를 클릭하여 AVD를 생성하세요. 이제 AVD 옆의 녹색 삼각형 버튼을 클릭하여 실행할 수 있습니다.

<h3>완료!</h3>

축하합니다! 개발 환경 설정을 성공적으로 완료했습니다.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>다음 단계</h2>

- 이 새로운 React Native 코드를 기존 애플리케이션에 추가하려면 [통합 가이드](integration-with-existing-apps.md)를 확인하세요.
- React Native에 대해 더 알고 싶다면 [React Native 소개](getting-started)를 확인하세요.
