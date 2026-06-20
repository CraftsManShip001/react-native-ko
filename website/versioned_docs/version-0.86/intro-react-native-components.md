---
id: intro-react-native-components
title: 코어 컴포넌트와 네이티브 컴포넌트
description: 'React Native를 사용하면 네이티브 컴포넌트를 조합하여 앱 인터페이스를 구성할 수 있습니다. 편리하게도, 지금 바로 시작할 수 있는 코어 컴포넌트 세트가 함께 제공됩니다!'
---

import ThemedImage from '@theme/ThemedImage';

React Native는 [React](https://react.dev/)와 앱 플랫폼의 네이티브 기능을 사용하여 Android 및 iOS 애플리케이션을 빌드하기 위한 오픈 소스 프레임워크입니다. React Native를 사용하면 JavaScript로 플랫폼의 API에 접근할 수 있으며, React 컴포넌트(재사용 가능하고 중첩 가능한 코드 묶음)를 사용하여 UI의 외관과 동작을 기술할 수 있습니다. React에 대해서는 다음 섹션에서 더 자세히 알아볼 수 있습니다. 하지만 먼저, React Native에서 컴포넌트가 어떻게 동작하는지 살펴보겠습니다.

## 뷰와 모바일 개발

Android 및 iOS 개발에서 **뷰**는 UI의 기본 구성 요소입니다. 텍스트, 이미지를 표시하거나 사용자 입력에 응답할 수 있는 화면의 작은 직사각형 요소입니다. 텍스트 한 줄이나 버튼 같은 앱의 가장 작은 시각적 요소도 뷰의 일종입니다. 일부 뷰는 다른 뷰를 포함할 수 있습니다. 모든 것이 뷰로 이루어져 있습니다!

<figure>
  <img src="/docs/assets/diagram_ios-android-views.svg" width="1000" alt="뷰라는 원자적 요소 위에 구축된 Android 및 iOS 앱의 다이어그램." />
  <figcaption>Android 및 iOS 앱에서 사용되는 다양한 뷰의 일부 예시입니다.</figcaption>
</figure>

## 네이티브 컴포넌트

Android 개발에서는 Kotlin 또는 Java로 뷰를 작성하고, iOS 개발에서는 Swift 또는 Objective-C를 사용합니다. React Native를 사용하면 React 컴포넌트를 통해 JavaScript로 이러한 뷰를 호출할 수 있습니다. 런타임에 React Native는 해당 컴포넌트에 대응하는 Android 및 iOS 뷰를 생성합니다. React Native 컴포넌트는 Android 및 iOS와 동일한 뷰를 기반으로 하므로, React Native 앱은 다른 앱과 동일하게 보이고, 느껴지며, 동작합니다. 이러한 플랫폼 기반 컴포넌트를 **네이티브 컴포넌트**라고 합니다.

React Native는 오늘 바로 앱 빌드를 시작할 수 있는 필수적이고 즉시 사용 가능한 네이티브 컴포넌트 세트를 제공합니다. 이것이 React Native의 **코어 컴포넌트**입니다.

:::caution
이 문서는 레거시 API 세트를 참조하며 New Architecture를 반영하여 업데이트가 필요합니다.
:::
React Native는 앱의 고유한 요구에 맞춰 [Android](legacy/native-components-android.md)와 [iOS](legacy/native-components-ios.md) 용 네이티브 컴포넌트를 직접 빌드할 수도 있습니다. 또한 **커뮤니티가 기여한 컴포넌트** 생태계도 활발하게 성장하고 있습니다. [Native Directory](https://reactnative.directory)에서 커뮤니티가 만들어온 것들을 확인해 보세요.

## 코어 컴포넌트

React Native는 컨트롤부터 액티비티 인디케이터까지 다양한 코어 컴포넌트를 제공합니다. 모든 코어 컴포넌트는 [API 섹션에 문서화](components-and-apis)되어 있습니다. 주로 다음과 같은 코어 컴포넌트를 사용하게 됩니다.

| React Native UI 컴포넌트 | Android View   | iOS View         | 웹 유사체               | 설명                                                                                                  |
| ------------------------- | -------------- | ---------------- | ----------------------- | ----------------------------------------------------------------------------------------------------- |
| `<View>`                  | `<ViewGroup>`  | `<UIView>`       | 스크롤 불가 `<div>` | flexbox, 스타일, 일부 터치 처리 및 접근성 컨트롤을 지원하는 컨테이너 |
| `<Text>`                  | `<TextView>`   | `<UITextView>`   | `<p>`                   | 텍스트 문자열을 표시, 스타일 적용, 중첩하고 터치 이벤트도 처리합니다.                              |
| `<Image>`                 | `<ImageView>`  | `<UIImageView>`  | `<img>`                 | 다양한 유형의 이미지를 표시합니다.                                                                   |
| `<ScrollView>`            | `<ScrollView>` | `<UIScrollView>` | `<div>`                 | 여러 컴포넌트와 뷰를 포함할 수 있는 범용 스크롤 컨테이너입니다.                                    |
| `<TextInput>`             | `<EditText>`   | `<UITextField>`  | `<input type="text">`   | 사용자가 텍스트를 입력할 수 있게 합니다.                                                            |

다음 섹션에서는 이 코어 컴포넌트들을 조합하면서 React가 어떻게 동작하는지 배우게 됩니다. 지금 바로 여기서 사용해 보세요!

```SnackPlayer name=Hello%20World
import {View, Text, Image, ScrollView, TextInput} from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
};

export default App;
```

---

React Native는 React 컴포넌트와 동일한 API 구조를 사용하므로, 시작하려면 React 컴포넌트 API를 이해해야 합니다. [다음 섹션](intro-react)에서 이 주제에 대한 간략한 소개 또는 복습을 제공합니다. 그러나 이미 React에 익숙하다면 [다음 단계](handling-text-input)로 건너뛰어도 됩니다.

<ThemedImage
alt="React Native의 코어 컴포넌트가 React Native와 함께 제공되는 React 컴포넌트의 하위 집합임을 보여주는 다이어그램."
sources={{
  light: '/docs/assets/diagram_react-native-components.svg',
  dark: '/docs/assets/diagram_react-native-components_dark.svg',
}}
/>
