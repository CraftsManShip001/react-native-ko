---
id: publishing-to-app-store
title: Apple App Store에 배포하기
---

import ThemedImage from '@theme/ThemedImage';

배포 과정은 일반적인 네이티브 iOS 앱과 동일하지만, 몇 가지 추가적으로 고려해야 할 사항이 있습니다.

:::info
Expo를 사용하고 있다면, 앱을 빌드하고 Apple App Store에 제출하는 방법에 대한 Expo 가이드 [App Stores에 배포하기](https://docs.expo.dev/distribution/app-stores/)를 참고하세요. 이 가이드는 모든 React Native 앱에서 배포 프로세스를 자동화하는 데 활용할 수 있습니다.
:::

### 1. 릴리스 스킴 구성

App Store 배포용 앱을 빌드하려면 Xcode에서 `Release` 스킴을 사용해야 합니다. `Release`로 빌드된 앱은 인앱 개발자 메뉴가 자동으로 비활성화되어, 프로덕션 환경에서 사용자가 실수로 메뉴에 접근하는 것을 방지합니다. 또한 JavaScript가 로컬에 번들링되므로, 컴퓨터에 연결하지 않은 상태에서도 기기에 앱을 설치하고 테스트할 수 있습니다.

`Release` 스킴을 사용하도록 앱을 구성하려면 **Product** → **Scheme** → **Edit Scheme**으로 이동하세요. 사이드바에서 **Run** 탭을 선택한 다음, **Build Configuration** 드롭다운을 `Release`로 설정하세요.

<ThemedImage
alt="Docusaurus themed image"
sources={{
    light: '/docs/assets/ConfigureReleaseScheme.png',
    dark: '/docs/assets/ConfigureReleaseSchemeDark.png',
  }}
/>

#### 팁

정적 번들은 Debug 모드에서도 실제 기기를 대상으로 빌드할 때마다 생성됩니다. 시간을 절약하려면 Xcode Build Phase의 `Bundle React Native code and images` 쉘 스크립트에 다음 내용을 추가하여 Debug에서 번들 생성을 비활성화하세요:

```shell
 if [ "${CONFIGURATION}" == "Debug" ]; then
  export SKIP_BUNDLING=true
 fi
```

### 2. 릴리스용 앱 빌드

이제 <kbd>Cmd ⌘</kbd> + <kbd>B</kbd>를 누르거나 메뉴 바에서 **Product** → **Build**를 선택하여 릴리스용 앱을 빌드할 수 있습니다. 릴리스 빌드가 완료되면 베타 테스터에게 앱을 배포하거나 App Store에 제출할 수 있습니다.

:::info
`React Native CLI`의 `--mode` 옵션에 `Release` 값을 사용하여 이 작업을 수행할 수도 있습니다(예: 프로젝트 루트에서 `npm run ios -- --mode="Release"` 또는 `yarn ios --mode Release`).
:::

테스트가 완료되고 App Store에 게시할 준비가 되면, 아래 가이드를 따르세요.

- 터미널을 열고 앱의 iOS 폴더로 이동한 후 `open .`을 입력합니다.
- YOUR_APP_NAME.xcworkspace를 더블 클릭합니다. Xcode가 실행됩니다.
- `Product` → `Archive`를 클릭합니다. 기기를 "Any iOS Device (arm64)"로 설정되어 있는지 확인하세요.

:::note
Bundle Identifier를 확인하고 Apple Developer Dashboard의 Identifiers에서 생성한 것과 정확히 일치하는지 확인하세요.
:::

- 아카이브가 완료되면, 아카이브 창에서 `Distribute App`을 클릭합니다.
- (App Store에 게시하려면) 이제 `App Store Connect`를 클릭합니다.
- `Upload` → 모든 체크박스가 선택되어 있는지 확인한 후 `Next`를 클릭합니다.
- 필요에 따라 `Automatically manage signing` 또는 `Manually manage signing` 중 하나를 선택합니다.
- `Upload`를 클릭합니다.
- 이제 App Store Connect의 TestFlight에서 확인할 수 있습니다.

필요한 정보를 입력하고 Build 섹션에서 앱의 빌드를 선택한 후 `Save` → `Submit For Review`를 클릭합니다.

### 3. 스크린샷

Apple Store는 최신 기기에 대한 스크린샷을 요구합니다. 해당 기기에 대한 참고 사항은 [여기](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications/)에서 확인할 수 있습니다. 일부 디스플레이 크기의 스크린샷은 다른 크기의 스크린샷이 제공된 경우 필수가 아닐 수 있습니다.
