---
id: debugging-release-builds
title: Debugging Release Builds
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 스택 트레이스 심볼리케이션

React Native 앱이 릴리즈 빌드에서 처리되지 않은 예외를 발생시키면, 출력이 난독화되어 읽기 어려울 수 있습니다.

```shell
07-15 10:58:25.820 18979 18998 E AndroidRuntime: FATAL EXCEPTION: mqt_native_modules
07-15 10:58:25.820 18979 18998 E AndroidRuntime: Process: com.awesomeproject, PID: 18979 07-15 10:58:25.820 18979 18998 E AndroidRuntime: com.facebook.react.common.JavascriptException: Failed, js engine: hermes, stack:
07-15 10:58:25.820 18979 18998 E AndroidRuntime: p@1:132161
07-15 10:58:25.820 18979 18998 E AndroidRuntime: p@1:132084
07-15 10:58:25.820 18979 18998 E AndroidRuntime: f@1:131854
07-15 10:58:25.820 18979 18998 E AndroidRuntime: anonymous@1:131119
```

위 스택 트레이스에서 `p@1:132161`과 같은 항목은 축소된 함수명과 바이트코드 오프셋입니다. 이 호출을 디버깅하려면 파일명, 줄 번호, 함수명 형태(예: `AwesomeProject/App.js:54:initializeMap`)로 변환해야 합니다. 이 과정을 **심볼리케이션(symbolication)**이라고 합니다.

스택 트레이스와 생성된 소스 맵을 [`metro-symbolicate`](https://www.npmjs.com/package/metro-symbolicate)에 전달하면 위와 같이 축소된 함수명과 바이트코드를 심볼리케이션할 수 있습니다.

### 소스 맵 활성화

스택 트레이스를 심볼리케이션하려면 소스 맵이 필요합니다. 대상 플랫폼의 빌드 설정에서 소스 맵이 활성화되어 있는지 확인하세요.

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

:::info
Android에서는 소스 맵이 기본적으로 **활성화**되어 있습니다.
:::

소스 맵 생성을 활성화하려면 `android/app/build.gradle`에 다음 `hermesFlags`가 포함되어 있는지 확인하세요.

```groovy
react {
    hermesFlags = ["-O", "-output-source-map"]
}
```

올바르게 설정되었다면 Metro 빌드 출력에서 소스 맵의 출력 위치를 확인할 수 있습니다.

```text
Writing bundle output to:, android/app/build/generated/assets/react/release/index.android.bundle
Writing sourcemap output to:, android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
```

</TabItem>
<TabItem value="ios">

:::info
iOS에서는 소스 맵이 기본적으로 **비활성화**되어 있습니다. 다음 안내에 따라 활성화하세요.
:::

소스 맵 생성을 활성화하려면:

- Xcode를 열고 "Bundle React Native code and images" 빌드 단계를 편집하세요.
- 다른 export 구문 위에 원하는 출력 경로를 지정한 `SOURCEMAP_FILE` 항목을 추가하세요.

```diff
+ export SOURCEMAP_FILE="$(pwd)/../main.jsbundle.map"
  WITH_ENVIRONMENT="../node_modules/react-native/scripts/xcode/with-environment.sh"
```

올바르게 설정되었다면 Metro 빌드 출력에서 소스 맵의 출력 위치를 확인할 수 있습니다.

```text
Writing bundle output to:, Build/Intermediates.noindex/ArchiveIntermediates/application/BuildProductsPath/Release-iphoneos/main.jsbundle
Writing sourcemap output to:, Build/Intermediates.noindex/ArchiveIntermediates/application/BuildProductsPath/Release-iphoneos/main.jsbundle.map
```

</TabItem>
</Tabs>

### `metro-symbolicate` 사용하기

소스 맵이 생성되면 스택 트레이스를 변환할 수 있습니다.

```shell
# Print usage instructions
npx metro-symbolicate

# From a file containing the stack trace
npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map < stacktrace.txt

# From adb logcat (Android)
adb logcat -d | npx metro-symbolicate android/app/build/generated/sourcemaps/react/release/index.android.bundle.map
```

### 소스 맵 관련 참고 사항

- 빌드 프로세스에서 여러 소스 맵이 생성될 수 있습니다. 예시에 표시된 위치에 있는 소스 맵을 사용해야 합니다.
- 사용하는 소스 맵이 크래시가 발생한 앱의 정확한 커밋에 해당하는 것인지 확인하세요. 소스 코드의 작은 변경도 오프셋에 큰 차이를 초래할 수 있습니다.
- `metro-symbolicate`가 즉시 성공으로 종료된다면, 입력이 터미널이 아닌 파이프나 리디렉션으로 전달되고 있는지 확인하세요.
