---
id: communication-android
title: 네이티브와 React Native 간의 통신
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[기존 앱과의 통합 가이드](integration-with-existing-apps)와 [네이티브 UI 컴포넌트 가이드](legacy/native-components-android)에서 React Native를 네이티브 컴포넌트에 임베드하는 방법과 그 반대의 방법을 배웁니다. 네이티브와 React Native 컴포넌트를 혼합하여 사용할 때, 결국 이 두 세계 간의 통신이 필요한 상황이 생깁니다. 이를 달성하는 몇 가지 방법은 다른 가이드에서 이미 언급되었습니다. 이 문서에서는 사용 가능한 기술들을 요약합니다.

## 소개

React Native는 React에서 영감을 받았기 때문에, 정보 흐름의 기본 개념이 유사합니다. React에서의 흐름은 단방향입니다. 컴포넌트 계층 구조를 유지하며, 각 컴포넌트는 자신의 부모와 내부 state에만 의존합니다. 이를 props로 구현합니다. 데이터는 부모에서 자식으로 하향식으로 전달됩니다. 상위 컴포넌트가 하위 컴포넌트의 state에 의존하는 경우, 하위 컴포넌트가 상위 컴포넌트를 업데이트하는 데 사용할 콜백을 전달해야 합니다.

동일한 개념이 React Native에도 적용됩니다. 프레임워크 내에서만 애플리케이션을 구축하는 한, props와 콜백으로 앱을 구동할 수 있습니다. 그러나 React Native와 네이티브 컴포넌트를 혼합할 때는, 이들 사이에 정보를 전달할 수 있도록 하는 특정한 크로스 언어 메커니즘이 필요합니다.

## Properties

Properties는 컴포넌트 간 통신에서 가장 간단한 방법입니다. 따라서 네이티브에서 React Native로, 그리고 React Native에서 네이티브로 properties를 전달할 방법이 필요합니다.

### 네이티브에서 React Native로 properties 전달하기

메인 액티비티에서 `ReactActivityDelegate`의 커스텀 구현을 제공하여 React Native 앱에 properties를 전달할 수 있습니다. 이 구현은 원하는 properties를 담은 `Bundle`을 반환하도록 `getLaunchOptions`를 오버라이드해야 합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
public class MainActivity extends ReactActivity {
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected Bundle getLaunchOptions() {
        Bundle initialProperties = new Bundle();
        ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
                "https://dummyimage.com/600x400/ffffff/000000.png",
                "https://dummyimage.com/600x400/000000/ffffff.png"
        ));
        initialProperties.putStringArrayList("images", imageList);
        return initialProperties;
      }
    };
  }
}
```

</TabItem>

<TabItem value="kotlin">

```kotlin
class MainActivity : ReactActivity() {
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : ReactActivityDelegate(this, mainComponentName) {
            override fun getLaunchOptions(): Bundle {
                val imageList = arrayListOf("https://dummyimage.com/600x400/ffffff/000000.png", "https://dummyimage.com/600x400/000000/ffffff.png")
                val initialProperties = Bundle().apply { putStringArrayList("images", imageList) }
                return initialProperties
            }
        }
    }
}
```

</TabItem>
</Tabs>

```tsx
import {View, Image} from 'react-native';

export default class ImageBrowserApp extends React.Component {
  renderImage(imgURI) {
    return <Image source={{uri: imgURI}} />;
  }
  render() {
    return <View>{this.props.images.map(this.renderImage)}</View>;
  }
}
```

`ReactRootView`는 읽기-쓰기 속성인 `appProperties`를 제공합니다. `appProperties`가 설정되면 React Native 앱은 새로운 properties로 다시 렌더링됩니다. 업데이트는 새롭게 업데이트된 properties가 이전 properties와 다를 때만 수행됩니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```java
Bundle updatedProps = mReactRootView.getAppProperties();
ArrayList<String> imageList = new ArrayList<String>(Arrays.asList(
        "https://dummyimage.com/600x400/ff0000/000000.png",
        "https://dummyimage.com/600x400/ffffff/ff0000.png"
));
updatedProps.putStringArrayList("images", imageList);

mReactRootView.setAppProperties(updatedProps);
```

</TabItem>

<TabItem value="kotlin">

```kotlin
var updatedProps: Bundle = reactRootView.getAppProperties()
var imageList = arrayListOf("https://dummyimage.com/600x400/ff0000/000000.png", "https://dummyimage.com/600x400/ffffff/ff0000.png")
```

</TabItem>

</Tabs>

언제든지 properties를 업데이트하는 것은 괜찮습니다. 단, 업데이트는 메인 스레드에서 수행해야 합니다. getter는 어떤 스레드에서도 사용할 수 있습니다.

한 번에 일부 properties만 업데이트할 방법은 없습니다. 이 경우 자체 래퍼로 구현하는 것을 권장합니다.

:::info
현재, 최상위 RN 컴포넌트의 JS 함수 `componentWillUpdateProps`는 props 업데이트 후에 호출되지 않습니다. 그러나 `componentDidMount` 함수에서 새로운 props에 접근할 수 있습니다.
:::

### React Native에서 네이티브로 properties 전달하기

네이티브 컴포넌트의 properties 노출 문제는 [이 문서](legacy/native-components-android#3-reactprop-또는-reactpropgroup-어노테이션을-사용하여-뷰-속성-setter-노출)에서 자세히 다루고 있습니다. 간단히 말해, JavaScript에 반영되어야 하는 properties는 `@ReactProp` 어노테이션이 붙은 setter 메서드로 노출해야 하며, 그런 다음 React Native에서 해당 컴포넌트를 일반 React Native 컴포넌트인 것처럼 사용할 수 있습니다.

### Properties의 한계

크로스 언어 properties의 주요 단점은 콜백을 지원하지 않는다는 점으로, 이로 인해 상향식 데이터 바인딩을 처리할 수 없습니다. JS 액션의 결과로 네이티브 부모 뷰에서 제거하고 싶은 작은 RN 뷰가 있다고 상상해 보세요. props로는 그렇게 할 방법이 없습니다. 정보가 상향식으로 전달되어야 하기 때문입니다.

크로스 언어 콜백 방식([여기에 설명됨](legacy/native-modules-android#콜백))이 있지만, 이러한 콜백이 항상 필요한 것은 아닙니다. 주요 문제는 이들이 properties로 전달되도록 의도되지 않았다는 점입니다. 오히려 이 메커니즘은 JS에서 네이티브 액션을 트리거하고, JS에서 해당 액션의 결과를 처리할 수 있게 합니다.

## 크로스 언어 상호작용의 다른 방법 (이벤트와 네이티브 모듈)

이전 챕터에서 언급했듯이, properties를 사용하는 것에는 몇 가지 제한이 있습니다. 때로는 properties만으로는 앱의 로직을 구동하기에 충분하지 않으며, 더 많은 유연성을 제공하는 솔루션이 필요합니다. 이 챕터에서는 React Native에서 사용 가능한 다른 통신 기술들을 다룹니다. 이 기술들은 내부 통신(RN의 JS와 네이티브 레이어 간)과 외부 통신(RN과 앱의 '순수 네이티브' 부분 간) 모두에 사용할 수 있습니다.

React Native는 크로스 언어 함수 호출을 수행할 수 있게 해줍니다. JS에서 커스텀 네이티브 코드를 실행하거나 그 반대도 가능합니다. 안타깝게도, 작업하는 측에 따라 동일한 목표를 달성하는 방식이 다릅니다. 네이티브에서는 이벤트 메커니즘을 사용하여 JS에서 핸들러 함수의 실행을 예약하는 반면, React Native에서는 네이티브 모듈이 내보내는 메서드를 직접 호출합니다.

### 네이티브에서 React Native 함수 호출하기 (이벤트)

이벤트는 [이 문서](legacy/native-components-android#이벤트)에서 자세히 설명합니다. 이벤트는 별도의 스레드에서 처리되기 때문에, 이벤트를 사용하면 실행 시간에 대한 보장이 없다는 점에 유의하세요.

이벤트는 강력합니다. 왜냐하면 React Native 컴포넌트에 대한 참조 없이도 변경할 수 있기 때문입니다. 그러나 이벤트를 사용할 때 빠질 수 있는 몇 가지 함정이 있습니다.

- 이벤트는 어디서든 전송될 수 있기 때문에, 프로젝트에 스파게티식 의존성을 도입할 수 있습니다.
- 이벤트는 네임스페이스를 공유하므로, 이름 충돌이 발생할 수 있습니다. 충돌은 정적으로 감지되지 않아 디버깅이 어렵습니다.
- 동일한 React Native 컴포넌트의 여러 인스턴스를 사용하고, 이벤트 관점에서 이들을 구분하고 싶다면, 식별자를 도입하고 이벤트와 함께 전달해야 할 가능성이 높습니다(네이티브 뷰의 `reactTag`를 식별자로 사용할 수 있습니다).

### React Native에서 네이티브 함수 호출하기 (네이티브 모듈)

네이티브 모듈은 JS에서 사용 가능한 Java/Kotlin 클래스입니다. 일반적으로 JS 브리지당 각 모듈의 인스턴스가 하나씩 생성됩니다. 네이티브 모듈은 임의의 함수와 상수를 React Native에 내보낼 수 있습니다. [이 문서](legacy/native-modules-android)에서 자세히 다루고 있습니다.

:::warning
모든 네이티브 모듈은 동일한 네임스페이스를 공유합니다. 새로운 모듈을 생성할 때 이름 충돌에 주의하세요.
:::
