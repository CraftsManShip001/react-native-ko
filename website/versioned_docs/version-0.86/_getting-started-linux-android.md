## 의존성 설치

Node, React Native 커맨드 라인 인터페이스, JDK, Android Studio가 필요합니다.

앱 개발에는 원하는 편집기를 자유롭게 사용할 수 있지만, Android용 React Native 앱을 빌드하는 데 필요한 툴링을 설정하려면 Android Studio를 설치해야 합니다.

<h3>Node</h3>

[리눅스 배포판에 맞는 설치 안내](https://nodejs.org/en/download/package-manager/)를 따라 Node 22.11.0 이상을 설치하세요.

<h3>Java Development Kit</h3>

React Native는 현재 Java SE Development Kit (JDK) 버전 17을 권장합니다. 더 높은 JDK 버전을 사용하면 문제가 발생할 수 있습니다. [OpenJDK](https://openjdk.java.net)는 [AdoptOpenJDK](https://adoptopenjdk.net/) 또는 시스템 패키지 관리자를 통해 다운로드하고 설치할 수 있습니다.

<h3>Android 개발 환경</h3>

Android 개발이 처음이라면 개발 환경 설정이 다소 번거로울 수 있습니다. Android 개발에 이미 익숙하다면 몇 가지 항목만 설정하면 됩니다. 어느 경우든 다음 단계를 주의 깊게 따라 주세요.

<h4 id="android-studio">1. Android Studio 설치</h4>

[Android Studio를 다운로드하고 설치](https://developer.android.com/studio)하세요. Android Studio 설치 마법사에서 다음 항목의 체크박스가 모두 선택되어 있는지 확인하세요.

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

그런 다음 "Next"를 클릭하여 이 컴포넌트들을 모두 설치하세요.

:::note
체크박스가 회색으로 비활성화되어 있다면, 나중에 이 컴포넌트들을 설치할 수 있습니다.
:::

설정이 완료되고 시작 화면이 나타나면 다음 단계로 진행하세요.

<h4 id="android-sdk">2. Android SDK 설치</h4>

Android Studio는 기본값으로 최신 Android SDK를 설치합니다. 그러나 네이티브 코드로 React Native 앱을 빌드하려면 특히 `Android 15 (VanillaIceCream)` SDK가 필요합니다. 추가 Android SDK는 Android Studio의 SDK Manager를 통해 설치할 수 있습니다.

Android Studio를 열고 "Configure" 버튼을 클릭한 후 "SDK Manager"를 선택하세요.

:::tip
SDK Manager는 Android Studio의 "Settings" 대화상자에서 **Languages & Frameworks** → **Android SDK** 아래에서도 찾을 수 있습니다.
:::

SDK Manager에서 "SDK Platforms" 탭을 선택한 후, 오른쪽 하단의 "Show Package Details" 체크박스를 선택하세요. `Android 15 (VanillaIceCream)` 항목을 찾아 펼치고, 다음 항목이 선택되어 있는지 확인하세요.

- `Android SDK Platform 35`
- `Intel x86 Atom_64 System Image` 또는 `Google APIs Intel x86 Atom System Image`

다음으로 "SDK Tools" 탭을 선택하고 여기서도 "Show Package Details" 체크박스를 선택하세요. "Android SDK Build-Tools" 항목을 찾아 펼치고, `36.0.0`과 `Android SDK Command-line Tools (latest)`가 선택되어 있는지 확인하세요.

마지막으로 "Apply"를 클릭하여 Android SDK와 관련 빌드 도구를 다운로드하고 설치하세요.

<h4>3. ANDROID_HOME 환경 변수 설정</h4>

React Native 도구들이 네이티브 코드로 앱을 빌드하려면 몇 가지 환경 변수가 설정되어 있어야 합니다.

`$HOME/.bash_profile` 또는 `$HOME/.bashrc` 파일에 다음 줄을 추가하세요(`zsh`를 사용하는 경우 `~/.zprofile` 또는 `~/.zshrc`):

```shell
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

:::note
`.bash_profile`은 `bash`에 해당하는 파일입니다. 다른 셸을 사용하는 경우, 해당 셸의 설정 파일을 편집해야 합니다.
:::

`bash`의 경우 `source $HOME/.bash_profile`을, `source $HOME/.zprofile`을 입력하여 현재 셸에 설정을 로드하세요. `echo $ANDROID_HOME`을 실행하여 ANDROID_HOME이 설정되었는지 확인하고, `echo $PATH`를 실행하여 적절한 디렉토리가 PATH에 추가되었는지 확인하세요.

:::note
올바른 Android SDK 경로를 사용하고 있는지 확인하세요. Android Studio의 "Settings" 대화상자에서 **Languages & Frameworks** → **Android SDK** 아래에서 SDK의 실제 위치를 확인할 수 있습니다.
:::

<h3>Watchman</h3>

[Watchman 설치 가이드](https://facebook.github.io/watchman/docs/install#buildinstall)를 따라 소스에서 Watchman을 컴파일하고 설치하세요.

:::info
[Watchman](https://facebook.github.io/watchman/docs/install)은 Facebook에서 만든 파일 시스템 변경 감지 도구입니다. 더 나은 성능과 특정 엣지 케이스에서의 호환성 향상을 위해 설치를 강력히 권장합니다(즉, 설치 없이도 어느 정도 사용할 수 있지만, 결과는 다를 수 있으며, 지금 설치해두면 나중에 생길 수 있는 골칫거리를 예방할 수 있습니다).
:::

<h2>Android 기기 준비</h2>

React Native Android 앱을 실행하려면 Android 기기가 필요합니다. 실제 Android 기기를 사용하거나, 더 일반적으로는 컴퓨터에서 Android 기기를 에뮬레이션할 수 있는 Android Virtual Device를 사용할 수 있습니다.

어느 방법을 선택하든, 개발용 Android 앱을 실행할 수 있도록 기기를 준비해야 합니다.

<h3>실제 기기 사용</h3>

실제 Android 기기가 있다면, USB 케이블로 컴퓨터에 연결하고 [여기](running-on-device.md)의 안내를 따라 AVD 대신 개발에 사용할 수 있습니다.

<h3>가상 기기 사용</h3>

Android Studio로 `./AwesomeProject/android`를 열면 Android Studio 내의 "AVD Manager"를 열어 사용 가능한 Android Virtual Device (AVD) 목록을 확인할 수 있습니다. 다음과 같은 아이콘을 찾으세요.

<img src="/docs/assets/GettingStartedAndroidStudioAVD.svg" alt="Android Studio AVD Manager" width="100"/>

Android Studio를 최근에 설치했다면 [새 AVD를 생성](https://developer.android.com/studio/run/managing-avds.html)해야 할 가능성이 높습니다. "Create Virtual Device..."를 선택한 후 목록에서 아무 Phone을 선택하고 "Next"를 클릭한 다음, **VanillaIceCream** API Level 35 이미지를 선택하세요.

:::tip
성능 향상을 위해 시스템에서 [VM 가속](https://developer.android.com/studio/run/emulator-acceleration.html#vm-linux)을 설정하는 것을 권장합니다. 안내를 따른 후 AVD Manager로 돌아오세요.
:::

"Next"를 클릭한 후 "Finish"를 클릭하여 AVD를 생성하세요. 이제 AVD 옆의 초록색 삼각형 버튼을 클릭하여 실행할 수 있습니다.

<h3>완료!</h3>

축하합니다! 개발 환경 설정을 성공적으로 마쳤습니다.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>다음 단계</h2>

- 새로운 React Native 코드를 기존 애플리케이션에 추가하고 싶다면 [통합 가이드](integration-with-existing-apps.md)를 참고하세요.
- React Native에 대해 더 알고 싶다면 [React Native 소개](getting-started)를 참고하세요.
