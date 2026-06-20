---
id: out-of-tree-platforms
title: 트리 외부 플랫폼
---

React Native는 Android와 iOS 기기만을 위한 것이 아닙니다. 파트너와 커뮤니티는 다음과 같은 다른 플랫폼에 React Native를 적용하는 프로젝트를 유지 관리하고 있습니다.

**파트너 제공**

- [React Native macOS](https://github.com/microsoft/react-native-macos) - macOS와 Cocoa를 위한 React Native.
- [React Native Windows](https://github.com/microsoft/react-native-windows) - Microsoft의 Universal Windows Platform(UWP)을 위한 React Native.
- [React Native visionOS](https://github.com/callstack/react-native-visionos) - Apple의 visionOS를 위한 React Native.

**커뮤니티 제공**

- [React Native tvOS](https://github.com/react-native-tvos/react-native-tvos) - Apple TV와 Android TV 기기를 위한 React Native.
- [React Native Web](https://github.com/necolas/react-native-web) - React DOM을 사용하여 웹에서 동작하는 React Native.
- [React Native Skia](https://github.com/react-native-skia/react-native-skia) - 렌더러로 [Skia](https://skia.org/)를 사용하는 React Native. 현재 Linux와 macOS를 지원합니다.

## 자신만의 React Native 플랫폼 만들기

React Native 플랫폼을 처음부터 만드는 과정은 아직 문서화가 잘 되어 있지 않습니다. 새로운 아키텍처와 [Fabric](/architecture/fabric-renderer)의 목표 중 하나는 플랫폼 유지 관리를 더 쉽게 만드는 것입니다.

### 번들링

React Native 0.57부터 React Native의 JavaScript 번들러인 [Metro](https://metrobundler.dev/)에 자신의 React Native 플랫폼을 등록할 수 있습니다. 이는 `npx react-native bundle`에 `--platform example`을 전달하면 `.example.js` 접미사를 가진 JavaScript 파일을 찾는다는 것을 의미합니다.

RNPM에 플랫폼을 등록하려면 모듈의 이름이 다음 패턴 중 하나와 일치해야 합니다.

- `react-native-example` - `react-native-`로 시작하는 모든 최상위 모듈을 검색합니다.
- `@org/react-native-example` - 모든 스코프 아래 `react-native-`로 시작하는 모듈을 검색합니다.
- `@react-native-example/module` - `@react-native-`로 시작하는 이름의 스코프 아래 모든 모듈을 검색합니다.

또한 `package.json`에 다음과 같은 항목이 있어야 합니다.

```json
{
  "rnpm": {
    "haste": {
      "providesModuleNodeModules": ["react-native-example"],
      "platforms": ["example"]
    }
  }
}
```

`"providesModuleNodeModules"`는 Haste 모듈 검색 경로에 추가될 모듈의 배열이며, `"platforms"`는 유효한 플랫폼으로 추가될 플랫폼 접미사의 배열입니다.
