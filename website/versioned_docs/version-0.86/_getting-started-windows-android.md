<h2>의존성 설치</h2>

Node, React Native 커맨드 라인 인터페이스, JDK, 그리고 Android Studio가 필요합니다.

앱을 개발할 때 원하는 편집기를 자유롭게 사용할 수 있지만, Android용 React Native 앱을 빌드하는 데 필요한 툴링을 설정하려면 Android Studio를 설치해야 합니다.

<h3 id="jdk">Node, JDK</h3>

Windows용 인기 패키지 관리자인 [Chocolatey](https://chocolatey.org/install)를 통해 Node를 설치하는 것을 권장합니다.

Node의 LTS 버전을 사용하는 것이 권장됩니다. 여러 버전 간에 전환하고 싶다면 Windows용 Node 버전 관리자인 [nvm-windows](https://github.com/coreybutler/nvm-windows)를 통해 Node를 설치할 수 있습니다.

React Native는 [Java SE Development Kit (JDK)](https://openjdk.java.net/projects/jdk/17/)도 필요하며, 이 또한 Chocolatey를 사용하여 설치할 수 있습니다.

관리자 명령 프롬프트를 열고(명령 프롬프트를 오른쪽 클릭하여 "관리자 권한으로 실행" 선택), 다음 명령어를 실행하세요:

```powershell
choco install -y nodejs-lts microsoft-openjdk17
```

시스템에 이미 Node가 설치되어 있다면 Node 22.11.0 이상인지 확인하세요. 이미 JDK가 있다면 JDK17을 권장합니다. 상위 버전의 JDK를 사용할 경우 문제가 발생할 수 있습니다.

:::note
[Node 다운로드 페이지](https://nodejs.org/en/download/)에서 추가 설치 옵션을 찾을 수 있습니다.
:::

:::info
최신 버전의 Java Development Kit를 사용하는 경우 프로젝트의 Gradle 버전을 변경하여 JDK를 인식할 수 있도록 해야 합니다. `{project root folder}\android\gradle\wrapper\gradle-wrapper.properties`로 이동하여 `distributionUrl` 값을 변경해 Gradle 버전을 업그레이드할 수 있습니다. [여기서 Gradle 최신 릴리즈를 확인](https://gradle.org/releases/)할 수 있습니다.
:::

<h3>Android 개발 환경</h3>

Android 개발이 처음이라면 개발 환경 설정이 다소 번거로울 수 있습니다. 이미 Android 개발에 익숙하다면 몇 가지 설정이 필요할 수 있습니다. 어느 경우든 다음 단계를 주의 깊게 따르세요.

<h4 id="android-studio">1. Android Studio 설치</h4>

[Android Studio를 다운로드하고 설치합니다](https://developer.android.com/studio). Android Studio 설치 마법사에서 다음 항목들이 모두 체크되어 있는지 확인하세요:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`
- Hyper-V를 아직 사용하지 않는 경우: `Performance (Intel ® HAXM)` ([AMD 또는 Hyper-V는 여기를 참조](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html))

그런 다음 "Next"를 클릭하여 이 컴포넌트들을 모두 설치하세요.

:::note
체크박스가 회색으로 표시되는 경우, 나중에 이 컴포넌트들을 설치할 기회가 있습니다.
:::

설정이 완료되고 Welcome 화면이 나타나면 다음 단계로 진행하세요.

<h4 id="android-sdk">2. Android SDK 설치</h4>

Android Studio는 기본적으로 최신 Android SDK를 설치합니다. 그러나 네이티브 코드를 사용하여 React Native 앱을 빌드하려면 특히 `Android 15 (VanillaIceCream)` SDK가 필요합니다. Android Studio의 SDK Manager를 통해 추가 Android SDK를 설치할 수 있습니다.

이를 위해 Android Studio를 열고 "More Actions" 버튼을 클릭한 후 "SDK Manager"를 선택하세요.

![Android Studio Welcome](/docs/assets/GettingStartedAndroidStudioWelcomeWindows.png)

:::tip
SDK Manager는 Android Studio "Settings" 대화상자의 **Languages & Frameworks** → **Android SDK**에서도 찾을 수 있습니다.
:::

SDK Manager에서 "SDK Platforms" 탭을 선택한 다음 오른쪽 하단의 "Show Package Details" 체크박스를 선택하세요. `Android 15 (VanillaIceCream)` 항목을 찾아 펼친 후 다음 항목들이 체크되어 있는지 확인하세요:

- `Android SDK Platform 35`
- `Intel x86 Atom_64 System Image` 또는 `Google APIs Intel x86 Atom System Image`

다음으로 "SDK Tools" 탭을 선택하고 "Show Package Details" 체크박스도 선택하세요. `Android SDK Build-Tools` 항목을 찾아 펼친 후 `36.0.0`과 `Android SDK Command-line Tools (latest)`가 선택되어 있는지 확인하세요.

마지막으로 "Apply"를 클릭하여 Android SDK와 관련 빌드 도구를 다운로드하고 설치하세요.

<h4>3. ANDROID_HOME 환경 변수 설정</h4>

React Native 도구가 네이티브 코드로 앱을 빌드하려면 몇 가지 환경 변수를 설정해야 합니다.

1. **Windows 제어판**을 엽니다.
2. **사용자 계정**을 클릭하고 다시 **사용자 계정**을 클릭합니다.
3. **내 환경 변수 변경**을 클릭합니다.
4. **새로 만들기...**를 클릭하여 Android SDK 경로를 가리키는 새 `ANDROID_HOME` 사용자 변수를 생성합니다:

![ANDROID_HOME Environment Variable](/docs/assets/GettingStartedAndroidEnvironmentVariableANDROID_HOME.png)

SDK는 기본적으로 다음 위치에 설치됩니다:

```powershell
%LOCALAPPDATA%\Android\Sdk
```

Android Studio "Settings" 대화상자의 **Languages & Frameworks** → **Android SDK**에서 SDK의 실제 위치를 찾을 수 있습니다.

다음 단계로 진행하기 전에 새 환경 변수가 로드되도록 새 명령 프롬프트 창을 여세요.

1. powershell을 엽니다.
2. **Get-ChildItem -Path Env:\\**를 powershell에 복사하여 붙여넣습니다.
3. `ANDROID_HOME`이 추가되었는지 확인합니다.

<h4>4. platform-tools를 Path에 추가</h4>

1. **Windows 제어판**을 엽니다.
2. **사용자 계정**을 클릭하고 다시 **사용자 계정**을 클릭합니다.
3. **내 환경 변수 변경**을 클릭합니다.
4. **Path** 변수를 선택합니다.
5. **편집**을 클릭합니다.
6. **새로 만들기**를 클릭하고 platform-tools 경로를 목록에 추가합니다.

이 폴더의 기본 위치는 다음과 같습니다:

```powershell
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

<h2>Android 기기 준비</h2>

React Native Android 앱을 실행하려면 Android 기기가 필요합니다. 물리적인 Android 기기를 사용하거나, 더 일반적으로는 컴퓨터에서 Android 기기를 에뮬레이션할 수 있는 Android Virtual Device를 사용할 수 있습니다.

어느 방법을 선택하든 개발을 위해 Android 앱을 실행할 수 있도록 기기를 준비해야 합니다.

<h3>물리적 기기 사용</h3>

물리적 Android 기기가 있다면 USB 케이블로 컴퓨터에 연결하고 [여기](running-on-device.md)의 안내를 따라 AVD 대신 개발에 사용할 수 있습니다.

<h3>가상 기기 사용</h3>

Android Studio로 `./AwesomeProject/android`를 열면 Android Studio 내의 "AVD Manager"를 통해 사용 가능한 Android Virtual Devices(AVD) 목록을 볼 수 있습니다. 다음과 같은 아이콘을 찾으세요:

<img src="/docs/assets/GettingStartedAndroidStudioAVD.svg" alt="Android Studio AVD Manager" width="100"/>

Android Studio를 최근에 설치했다면 [새 AVD를 생성](https://developer.android.com/studio/run/managing-avds.html)해야 할 가능성이 높습니다. "Create Virtual Device..."를 선택한 후 목록에서 임의의 Phone을 선택하고 "Next"를 클릭한 다음 **VanillaIceCream** API Level 35 이미지를 선택하세요.

:::note
HAXM이 설치되지 않은 경우 "Install HAXM"을 클릭하거나 [이 안내](https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows)를 따라 설정한 후 AVD Manager로 돌아가세요.
:::

"Next"를 클릭한 후 "Finish"를 클릭하여 AVD를 생성하세요. 이제 AVD 옆의 녹색 삼각형 버튼을 클릭하여 실행할 수 있습니다.

<h3>완료!</h3>

축하합니다! 개발 환경 설정을 성공적으로 완료했습니다.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>다음 단계</h2>

- 이 새로운 React Native 코드를 기존 애플리케이션에 추가하려면 [통합 가이드](integration-with-existing-apps.md)를 확인하세요.
- React Native에 대해 더 알고 싶다면 [React Native 소개](getting-started)를 확인하세요.
