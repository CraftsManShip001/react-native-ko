---
id: using-a-scrollview
title: ScrollView 사용하기
---

[ScrollView](scrollview.md)는 여러 컴포넌트와 뷰를 포함할 수 있는 범용 스크롤 컨테이너입니다. 스크롤 가능한 항목들은 서로 다른 타입이어도 되며, 수직 및 수평(`horizontal` props 설정)으로 스크롤할 수 있습니다.

이 예시에서는 이미지와 텍스트가 혼합된 수직 `ScrollView`를 만듭니다.

```SnackPlayer name=Using%20ScrollView
import {Image, ScrollView, Text} from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

const App = () => (
  <ScrollView>
    <Text style={{fontSize: 96}}>Scroll me plz</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>If you like</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>Scrolling down</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>What's the best</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 96}}>Framework around?</Text>
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Image source={logo} />
    <Text style={{fontSize: 80}}>React Native</Text>
  </ScrollView>
);

export default App;
```

ScrollView는 `pagingEnabled` props를 사용하여 스와이프 제스처로 뷰를 페이지 단위로 넘길 수 있도록 설정할 수 있습니다. Android에서는 [ViewPager](https://github.com/react-native-community/react-native-viewpager) 컴포넌트를 사용하여 뷰 간의 수평 스와이프를 구현할 수도 있습니다.

iOS에서는 단일 항목을 가진 ScrollView를 사용하여 사용자가 콘텐츠를 확대/축소할 수 있게 할 수 있습니다. `maximumZoomScale`과 `minimumZoomScale` props를 설정하면 사용자가 핀치 및 확장 제스처로 확대/축소할 수 있습니다.

ScrollView는 제한된 크기의 소수 항목을 표시하는 데 가장 적합합니다. `ScrollView`의 모든 요소와 뷰는 현재 화면에 표시되지 않더라도 렌더링됩니다. 화면에 표시되지 않는 긴 목록이 있는 경우에는 `FlatList`를 사용해야 합니다. 다음으로 [리스트 뷰에 대해 알아보겠습니다](using-a-listview.md).
