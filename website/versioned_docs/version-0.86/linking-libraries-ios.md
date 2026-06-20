---
id: linking-libraries-ios
title: 라이브러리 링크하기
---

모든 앱이 모든 네이티브 기능을 사용하는 것은 아니며, 이러한 기능을 모두 지원하는 코드를 포함하면 바이너리 크기에 영향을 줄 수 있습니다. 하지만 필요할 때마다 이러한 기능을 추가할 수 있도록 지원하고 싶었습니다.

이를 위해 이러한 기능들을 독립적인 정적 라이브러리로 제공하고 있습니다.

대부분의 라이브러리는 두 개의 파일을 드래그하는 것만으로 빠르게 연결할 수 있으며, 세 번째 단계가 필요한 경우도 있지만 그 이상은 필요하지 않습니다.

:::note
React Native와 함께 제공하는 모든 라이브러리는 저장소 루트의 `Libraries` 폴더에 있습니다. 일부는 순수 JavaScript로 작성되어 있어 `require`만 하면 됩니다.
다른 라이브러리는 일부 네이티브 코드에도 의존하는데, 이 경우 해당 파일을 앱에 추가해야 합니다. 그렇지 않으면 라이브러리를 사용하려 할 때 앱에서 오류가 발생합니다.
:::

## 네이티브 코드가 포함된 라이브러리를 링크하는 몇 가지 단계

### 자동 링크

네이티브 의존성이 있는 라이브러리를 설치합니다:

```shell
npm install <library-with-native-dependencies> --save
```

:::info
이 단계에서 `--save` 또는 `--save-dev` 플래그는 매우 중요합니다. React Native는 `package.json` 파일의 `dependencies`와 `devDependencies`를 기반으로 라이브러리를 링크합니다.
:::

이것으로 끝입니다! 다음번에 앱을 빌드할 때 [자동 링크(autolinking)](https://github.com/react-native-community/cli/blob/main/docs/autolinking.md) 메커니즘 덕분에 네이티브 코드가 자동으로 링크됩니다.

### 수동 링크

#### Step 1

라이브러리에 네이티브 코드가 있다면 해당 폴더 내에 `.xcodeproj` 파일이 있어야 합니다. 이 파일을 Xcode의 프로젝트로 드래그하세요(보통 Xcode의 `Libraries` 그룹 아래).

![](/docs/assets/AddToLibraries.png)

#### Step 2

메인 프로젝트 파일(`.xcodeproj`를 나타내는 파일)을 클릭하고 `Build Phases`를 선택한 다음, 가져오려는 라이브러리의 `Products` 폴더에서 정적 라이브러리를 `Link Binary With Libraries`로 드래그하세요.

![](/docs/assets/AddToBuildPhases.png)

#### Step 3

모든 라이브러리에 이 단계가 필요한 것은 아닙니다. 다음을 고려해야 합니다:

_컴파일 시 라이브러리의 내용을 알아야 하는가?_

즉, 이 라이브러리를 네이티브 측에서 사용하는지 아니면 JavaScript에서만 사용하는지를 의미합니다. JavaScript에서만 사용한다면 이 단계를 건너뛰어도 됩니다!

네이티브에서 호출해야 한다면 라이브러리의 헤더를 알아야 합니다. 이를 위해 프로젝트 파일로 이동하여 `Build Settings`를 선택하고 `Header Search Paths`를 검색하세요. 그곳에 라이브러리 경로를 추가해야 합니다. (이 문서에서 예전에는 `recursive`를 사용하도록 권장했지만, 특히 CocoaPods와 함께 사용할 때 미묘한 빌드 오류를 일으킬 수 있어 더 이상 권장하지 않습니다.)

![](/docs/assets/AddToSearchPaths.png)
