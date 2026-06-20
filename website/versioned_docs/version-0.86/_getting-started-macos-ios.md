import ThemedImage from '@theme/ThemedImage';

## 의존성 설치

Node, Watchman, React Native 커맨드 라인 인터페이스, Xcode, 그리고 CocoaPods가 필요합니다.

앱을 개발할 때 원하는 편집기를 자유롭게 사용할 수 있지만, iOS용 React Native 앱을 빌드하는 데 필요한 툴링을 설정하려면 Xcode를 설치해야 합니다.

### Node & Watchman

[Homebrew](https://brew.sh/)를 사용하여 Node와 Watchman을 설치하는 것을 권장합니다. Homebrew를 설치한 후 터미널에서 다음 명령어를 실행하세요:

```shell
brew install node
brew install watchman
```

시스템에 이미 Node가 설치되어 있다면 Node 22.11.0 이상인지 확인하세요.

[Watchman](https://facebook.github.io/watchman)은 파일시스템의 변경 사항을 감시하는 Facebook이 만든 도구입니다. 더 나은 성능을 위해 설치하는 것을 강력히 권장합니다.

### Xcode

**최신 버전**의 Xcode를 사용하세요.

Xcode를 설치하는 가장 쉬운 방법은 [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)를 이용하는 것입니다. Xcode를 설치하면 iOS 시뮬레이터와 iOS 앱을 빌드하는 데 필요한 모든 도구가 함께 설치됩니다.

#### Command Line Tools

Xcode Command Line Tools도 설치해야 합니다. Xcode를 열고 Xcode 메뉴에서 **Settings... (또는 Preferences...)**를 선택하세요. Locations 패널로 이동하여 Command Line Tools 드롭다운에서 가장 최신 버전을 선택하여 도구를 설치하세요.

<ThemedImage
alt="Xcode Command Line Tools configuration"
sources={{
    light: '/docs/assets/GettingStartedXcodeCommandLineTools.png',
    dark: '/docs/assets/GettingStartedXcodeCommandLineToolsDark.png',
  }}
/>

#### Xcode에서 iOS 시뮬레이터 설치

시뮬레이터를 설치하려면 **Xcode > Settings... (또는 Preferences...)**를 열고 **Platforms (또는 Components)** 탭을 선택하세요. 사용하려는 iOS 버전에 맞는 시뮬레이터를 선택하세요.

Xcode 버전 14.0 이상을 사용하여 시뮬레이터를 설치하는 경우 **Xcode > Settings > Platforms** 탭을 열고 "+" 아이콘을 클릭한 후 **iOS…** 옵션을 선택하세요.

#### CocoaPods

[CocoaPods](https://cocoapods.org/)는 iOS에서 사용 가능한 의존성 관리 시스템 중 하나입니다. CocoaPods는 Ruby [gem](https://en.wikipedia.org/wiki/RubyGems)입니다. 최신 버전의 macOS에 포함된 Ruby 버전을 사용하여 CocoaPods를 설치할 수 있습니다.

자세한 내용은 [CocoaPods 시작 가이드](https://guides.cocoapods.org/using/getting-started.html)를 방문하세요.

### [선택 사항] 환경 설정

React Native 버전 0.69부터 템플릿에서 제공하는 `.xcode.env` 파일을 사용하여 Xcode 환경을 설정할 수 있습니다.

`.xcode.env` 파일에는 `NODE_BINARY` 변수에 `node` 실행 파일의 경로를 내보내는 환경 변수가 포함되어 있습니다.
이는 빌드 인프라를 시스템 버전의 `node`로부터 분리하는 **권장 방식**입니다. 기본값과 다른 경우 자신만의 경로 또는 `node` 버전 관리자로 이 변수를 커스터마이즈하세요.

이 외에도 다른 환경 변수를 추가하고 빌드 스크립트 단계에서 `.xcode.env` 파일을 소스로 불러올 수 있습니다. 특정 환경이 필요한 스크립트를 실행해야 한다면 이 방식이 **권장 방식**입니다: 빌드 단계를 특정 환경으로부터 분리할 수 있습니다.

:::info
[NVM](https://nvm.sh/) (Node.js 버전 설치 및 전환을 돕는 명령어)과 [zsh](https://ohmyz.sh/)를 이미 사용하고 있다면 Xcode가 Node 실행 파일을 찾을 수 있도록 NVM을 초기화하는 코드를 `~/.zshrc`에서 `~/.zshenv` 파일로 이동하는 것이 좋습니다:

```zsh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

Xcode 프로젝트의 모든 "shell script build phase"가 `/bin/zsh`를 셸로 사용하도록 설정하는 것도 고려해 보세요.
:::

<h3>완료!</h3>

축하합니다! 개발 환경 설정을 성공적으로 완료했습니다.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>다음 단계</h2>

- 이 새로운 React Native 코드를 기존 애플리케이션에 추가하려면 [통합 가이드](integration-with-existing-apps.md)를 확인하세요.
- React Native에 대해 더 알고 싶다면 [React Native 소개](getting-started)를 확인하세요.
