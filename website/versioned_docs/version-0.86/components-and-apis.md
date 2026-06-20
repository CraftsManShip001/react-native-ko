---
id: components-and-apis
title: 핵심 컴포넌트 및 API
---

React Native는 앱에서 바로 사용할 수 있는 다양한 내장 [핵심 컴포넌트](intro-react-native-components)를 제공합니다. 왼쪽 사이드바(또는 좁은 화면에서는 위쪽 메뉴)에서 모두 찾아볼 수 있습니다. 어디서부터 시작해야 할지 모르겠다면, 다음 카테고리를 살펴보세요.

- [기본 컴포넌트](components-and-apis#기본-컴포넌트)
- [사용자 인터페이스](components-and-apis#사용자-인터페이스)
- [목록 뷰](components-and-apis#목록-뷰)
- [Android 전용](components-and-apis#android-컴포넌트-및-api)
- [iOS 전용](components-and-apis#ios-컴포넌트-및-api)
- [기타](components-and-apis#기타)

React Native에 번들로 포함된 컴포넌트와 API에만 국한될 필요는 없습니다. React Native에는 수천 명의 개발자 커뮤니티가 있습니다. 특정 기능을 하는 라이브러리를 찾고 있다면 [라이브러리 찾기 가이드](libraries#라이브러리-찾기)를 참고하세요.

## 기본 컴포넌트

대부분의 앱은 이 기본 컴포넌트 중 하나 이상을 사용하게 됩니다.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./view">
      <h3>View</h3>
      <p>UI를 구축하기 위한 가장 기본적인 컴포넌트입니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./text">
      <h3>Text</h3>
      <p>텍스트를 표시하는 컴포넌트입니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./image">
      <h3>Image</h3>
      <p>이미지를 표시하는 컴포넌트입니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./textinput">
      <h3>TextInput</h3>
      <p>키보드를 통해 앱에 텍스트를 입력하는 컴포넌트입니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./pressable">
      <h3>Pressable</h3>
      <p>자식 컴포넌트의 다양한 단계의 누름 상호작용을 감지할 수 있는 래퍼 컴포넌트입니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./scrollview">
      <h3>ScrollView</h3>
      <p>여러 컴포넌트와 뷰를 호스팅할 수 있는 스크롤 가능한 컨테이너를 제공합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./stylesheet">
      <h3>StyleSheet</h3>
      <p>CSS 스타일시트와 유사한 추상화 레이어를 제공합니다.</p>
    </a>
  </div>
</div>

## 사용자 인터페이스

이 일반적인 사용자 인터페이스 컨트롤들은 모든 플랫폼에서 렌더링됩니다.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./button">
      <h3>Button</h3>
      <p>어느 플랫폼에서나 멋지게 렌더링되어야 하는 터치 처리를 위한 기본 버튼 컴포넌트입니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./switch">
      <h3>Switch</h3>
      <p>불리언 입력을 렌더링합니다.</p>
    </a>
  </div>
</div>

## 목록 뷰

더 일반적인 [`ScrollView`](./scrollview)와 달리, 다음 목록 뷰 컴포넌트들은 현재 화면에 표시되는 요소만 렌더링합니다. 따라서 긴 데이터 목록을 표시하는 데 성능적으로 유리한 선택입니다.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./flatlist">
      <h3>FlatList</h3>
      <p>성능 좋은 스크롤 가능한 목록을 렌더링하는 컴포넌트입니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./sectionlist">
      <h3>SectionList</h3>
      <p><code>FlatList</code>와 비슷하지만 섹션이 있는 목록을 위한 컴포넌트입니다.</p>
    </a>
  </div>
</div>

## Android 컴포넌트 및 API

다음 컴포넌트들의 많은 부분은 일반적으로 사용되는 Android 클래스의 래퍼를 제공합니다.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./backhandler">
      <h3>BackHandler</h3>
      <p>뒤로 탐색을 위한 하드웨어 버튼 누름을 감지합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./drawerlayoutandroid">
      <h3>DrawerLayoutAndroid</h3>
      <p>Android에서 <code>DrawerLayout</code>을 렌더링합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./permissionsandroid">
      <h3>PermissionsAndroid</h3>
      <p>Android M에서 도입된 권한 모델에 대한 접근을 제공합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./toastandroid">
      <h3>ToastAndroid</h3>
      <p>Android Toast 알림을 생성합니다.</p>
    </a>
  </div>
</div>

## iOS 컴포넌트 및 API

다음 컴포넌트들의 많은 부분은 일반적으로 사용되는 UIKit 클래스의 래퍼를 제공합니다.

<div className="component-grid component-grid-border">
  <div className="component">
    <a href="./actionsheetios">
      <h3>ActionSheetIOS</h3>
      <p>iOS 액션 시트 또는 공유 시트를 표시하는 API입니다.</p>
    </a>
  </div>
</div>

## 기타

이 컴포넌트들은 특정 애플리케이션에 유용할 수 있습니다. 컴포넌트와 API의 전체 목록은 왼쪽 사이드바(또는 좁은 화면에서는 위쪽 메뉴)를 확인하세요.

<div className="component-grid">
  <div className="component">
    <a href="./activityindicator">
      <h3>ActivityIndicator</h3>
      <p>원형 로딩 인디케이터를 표시합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./alert">
      <h3>Alert</h3>
      <p>지정된 제목과 메시지로 알림 대화상자를 실행합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./animated">
      <h3>Animated</h3>
      <p>쉽게 구축하고 유지 관리할 수 있는 유연하고 강력한 애니메이션을 만드는 라이브러리입니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./dimensions">
      <h3>Dimensions</h3>
      <p>기기 치수를 가져오는 인터페이스를 제공합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./keyboardavoidingview">
      <h3>KeyboardAvoidingView</h3>
      <p>가상 키보드를 자동으로 피하는 뷰를 제공합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./linking">
      <h3>Linking</h3>
      <p>수신 및 발신 앱 링크 모두와 상호작용하는 일반 인터페이스를 제공합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./modal">
      <h3>Modal</h3>
      <p>둘러싸는 뷰 위에 콘텐츠를 표시하는 간단한 방법을 제공합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./pixelratio">
      <h3>PixelRatio</h3>
      <p>기기 픽셀 밀도에 대한 접근을 제공합니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./refreshcontrol">
      <h3>RefreshControl</h3>
      <p>이 컴포넌트는 <code>ScrollView</code> 내부에서 당겨서 새로 고침 기능을 추가하는 데 사용됩니다.</p>
    </a>
  </div>
  <div className="component">
    <a href="./statusbar">
      <h3>StatusBar</h3>
      <p>앱 상태 표시줄을 제어하는 컴포넌트입니다.</p>
    </a>
  </div>
</div>
