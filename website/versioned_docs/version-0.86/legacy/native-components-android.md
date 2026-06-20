---
id: native-components-android
title: Android 네이티브 UI 컴포넌트
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

최신 앱에서 바로 사용할 수 있는 수많은 네이티브 UI 위젯이 있습니다. 일부는 플랫폼의 일부이고, 일부는 서드파티 라이브러리로 제공되며, 또 다른 일부는 이전 앱에서 직접 작성한 것일 수도 있습니다. React Native에는 `ScrollView` 및 `TextInput`과 같이 가장 중요한 플랫폼 컴포넌트가 이미 래핑되어 있지만, 전부 다 포함되어 있지는 않으며, 직접 이전 앱을 위해 작성한 컴포넌트는 포함되어 있지 않습니다. 다행히도, 이러한 기존 컴포넌트를 래핑하여 React Native 애플리케이션과 원활하게 통합할 수 있습니다.

네이티브 모듈 가이드와 마찬가지로, 이 가이드도 Android SDK 프로그래밍에 어느 정도 익숙하다고 가정하는 심화 가이드입니다. 이 가이드는 React Native 핵심 라이브러리에서 사용 가능한 기존 `ImageView` 컴포넌트의 일부 구현 방법을 안내함으로써 네이티브 UI 컴포넌트를 빌드하는 방법을 보여줍니다.

:::info
하나의 명령으로 네이티브 컴포넌트가 포함된 로컬 라이브러리를 설정할 수도 있습니다. 자세한 내용은 [로컬 라이브러리 설정](local-library-setup) 가이드를 참조하세요.
:::

## ImageView 예시

이 예시에서는 JavaScript에서 ImageView를 사용할 수 있도록 하기 위한 구현 요구 사항을 살펴봅니다.

네이티브 뷰는 `ViewManager` 또는 더 일반적으로 `SimpleViewManager`를 확장하여 생성하고 조작합니다. `SimpleViewManager`는 배경색, 투명도, Flexbox 레이아웃과 같은 공통 속성을 적용하기 때문에 이 경우에 편리합니다.

이 서브클래스들은 본질적으로 싱글톤입니다. 브리지에 의해 각 인스턴스가 하나만 생성됩니다. `NativeViewHierarchyManager`에 네이티브 뷰를 전송하고, `NativeViewHierarchyManager`는 필요에 따라 뷰의 속성을 설정하고 업데이트하기 위해 다시 서브클래스에 위임합니다. `ViewManager`는 또한 일반적으로 뷰의 델리게이트가 되어 브리지를 통해 JavaScript로 이벤트를 전송합니다.

뷰를 전송하려면:

1. ViewManager 서브클래스를 생성합니다.
2. `createViewInstance` 메서드를 구현합니다.
3. `@ReactProp` (또는 `@ReactPropGroup`) 어노테이션을 사용하여 뷰 속성 setter를 노출합니다.
4. 애플리케이션 패키지의 `createViewManagers`에 매니저를 등록합니다.
5. JavaScript 모듈을 구현합니다.

### 1. `ViewManager` 서브클래스 생성

이 예시에서는 `SimpleViewManager`의 타입 `ReactImageView`를 확장하는 뷰 매니저 클래스 `ReactImageManager`를 만듭니다. `ReactImageView`는 매니저가 관리하는 객체의 타입이며, 커스텀 네이티브 뷰가 됩니다. `getName`이 반환하는 이름은 JavaScript에서 네이티브 뷰 타입을 참조하는 데 사용됩니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
class ReactImageManager(
    private val callerContext: ReactApplicationContext
) : SimpleViewManager<ReactImageView>() {

  override fun getName() = REACT_CLASS

  companion object {
    const val REACT_CLASS = "RCTImageView"
  }
}
```

</TabItem>
<TabItem value="java">

```java
public class ReactImageManager extends SimpleViewManager<ReactImageView> {

  public static final String REACT_CLASS = "RCTImageView";
  ReactApplicationContext mCallerContext;

  public ReactImageManager(ReactApplicationContext reactContext) {
    mCallerContext = reactContext;
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }
}
```

</TabItem>
</Tabs>

### 2. `createViewInstance` 메서드 구현

뷰는 `createViewInstance` 메서드에서 생성됩니다. 뷰는 기본 state로 초기화되어야 하며, 이후 `updateView` 호출을 통해 속성이 설정됩니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
  override fun createViewInstance(context: ThemedReactContext) =
      ReactImageView(context, Fresco.newDraweeControllerBuilder(), null, callerContext)
```

</TabItem>
<TabItem value="java">

```java
  @Override
  public ReactImageView createViewInstance(ThemedReactContext context) {
    return new ReactImageView(context, Fresco.newDraweeControllerBuilder(), null, mCallerContext);
  }
```

</TabItem>
</Tabs>

### 3. `@ReactProp` (또는 `@ReactPropGroup`) 어노테이션을 사용하여 뷰 속성 setter 노출

JavaScript에 반영될 속성은 `@ReactProp` (또는 `@ReactPropGroup`)으로 어노테이션된 setter 메서드로 노출되어야 합니다. setter 메서드는 업데이트할 뷰(현재 뷰 타입)를 첫 번째 인수로, 속성 값을 두 번째 인수로 받아야 합니다. setter는 public이어야 하며 값을 반환하지 않아야 합니다(즉, Java에서는 반환 타입이 `void`이고 Kotlin에서는 `Unit`이어야 합니다). JS에 전송되는 속성 타입은 setter의 값 인수 타입을 기반으로 자동으로 결정됩니다. 현재 지원되는 값 타입(Java 기준)은 다음과 같습니다: `boolean`, `int`, `float`, `double`, `String`, `Boolean`, `Integer`, `ReadableArray`, `ReadableMap`. Kotlin에서 대응하는 타입은 `Boolean`, `Int`, `Float`, `Double`, `String`, `ReadableArray`, `ReadableMap`입니다.

`@ReactProp` 어노테이션에는 `String` 타입의 필수 인수 `name`이 있습니다. setter 메서드에 연결된 `@ReactProp` 어노테이션에 할당된 이름은 JS 측에서 속성을 참조하는 데 사용됩니다.

`name` 외에도, `@ReactProp` 어노테이션은 다음과 같은 선택적 인수를 취할 수 있습니다: `defaultBoolean`, `defaultInt`, `defaultFloat`. 이 인수들은 해당 타입(Java에서는 각각 `boolean`, `int`, `float`, Kotlin에서는 `Boolean`, `Int`, `Float`)이어야 하며, setter가 참조하는 속성이 컴포넌트에서 제거된 경우 setter 메서드에 전달됩니다. "기본값"은 원시 타입에만 제공되며, setter가 복잡한 타입인 경우 해당 속성이 제거될 때 `null`이 기본값으로 제공됩니다.

`@ReactPropGroup` 어노테이션이 있는 메서드의 setter 선언 요구 사항은 `@ReactProp`와 다릅니다. 자세한 내용은 `@ReactPropGroup` 어노테이션 클래스 문서를 참조하세요. **중요!** ReactJS에서 속성 값을 업데이트하면 setter 메서드가 호출됩니다. 컴포넌트를 업데이트하는 방법 중 하나는 이전에 설정된 속성을 제거하는 것입니다. 이 경우에도 setter 메서드가 호출되어 뷰 매니저에 속성이 변경되었음을 알립니다. 이때 "기본값"이 제공됩니다(원시 타입의 경우 `@ReactProp` 어노테이션의 `defaultBoolean`, `defaultFloat` 등 인수를 사용하여 "기본값"을 지정할 수 있으며, 복잡한 타입의 경우 setter가 `null`로 설정된 값과 함께 호출됩니다).

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
  @ReactProp(name = "src")
  fun setSrc(view: ReactImageView, sources: ReadableArray?) {
    view.setSource(sources)
  }

  @ReactProp(name = "borderRadius", defaultFloat = 0f)
  override fun setBorderRadius(view: ReactImageView, borderRadius: Float) {
    view.setBorderRadius(borderRadius)
  }

  @ReactProp(name = ViewProps.RESIZE_MODE)
  fun setResizeMode(view: ReactImageView, resizeMode: String?) {
    view.setScaleType(ImageResizeMode.toScaleType(resizeMode))
  }
```

</TabItem>
<TabItem value="java">

```java
  @ReactProp(name = "src")
  public void setSrc(ReactImageView view, @Nullable ReadableArray sources) {
    view.setSource(sources);
  }

  @ReactProp(name = "borderRadius", defaultFloat = 0f)
  public void setBorderRadius(ReactImageView view, float borderRadius) {
    view.setBorderRadius(borderRadius);
  }

  @ReactProp(name = ViewProps.RESIZE_MODE)
  public void setResizeMode(ReactImageView view, @Nullable String resizeMode) {
    view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
  }
```

</TabItem>
</Tabs>

### 4. `ViewManager` 등록

마지막 단계는 ViewManager를 애플리케이션에 등록하는 것으로, [네이티브 모듈](native-modules-android.md)과 유사하게 애플리케이션 패키지 멤버 함수 `createViewManagers`를 통해 이루어집니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
  override fun createViewManagers(
      reactContext: ReactApplicationContext
  ) = listOf(ReactImageManager(reactContext))
```

</TabItem>
<TabItem value="java">

```java
  @Override
  public List<ViewManager> createViewManagers(
                            ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
      new ReactImageManager(reactContext)
    );
  }
```

</TabItem>
</Tabs>

### 5. JavaScript 모듈 구현

마지막 단계는 새 뷰의 사용자를 위해 Java/Kotlin과 JavaScript 사이의 인터페이스 레이어를 정의하는 JavaScript 모듈을 만드는 것입니다. 이 모듈에서 컴포넌트 인터페이스를 문서화하는 것을 권장합니다(예: TypeScript, Flow, 또는 일반 주석 사용).

```tsx title="ImageView.tsx"
import {requireNativeComponent} from 'react-native';

/**
 * Composes `View`.
 *
 * - src: Array<{url: string}>
 * - borderRadius: number
 * - resizeMode: 'cover' | 'contain' | 'stretch'
 */
export default requireNativeComponent('RCTImageView');
```

`requireNativeComponent` 함수는 네이티브 뷰의 이름을 받습니다. 컴포넌트가 더 복잡한 작업(예: 커스텀 이벤트 처리)을 수행해야 하는 경우, 네이티브 컴포넌트를 다른 React 컴포넌트로 감싸야 합니다. 이는 아래의 `MyCustomView` 예시에서 설명됩니다.

## 이벤트

이제 JS에서 자유롭게 제어할 수 있는 네이티브 뷰 컴포넌트를 노출하는 방법을 알았습니다. 하지만 핀치 줌이나 패닝과 같은 사용자 이벤트는 어떻게 처리할까요? 네이티브 이벤트가 발생하면 네이티브 코드는 뷰의 JavaScript 표현에 이벤트를 발행해야 하며, 두 뷰는 `getId()` 메서드에서 반환된 값으로 연결됩니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
class MyCustomView(context: Context) : View(context) {
  ...
  fun onReceiveNativeEvent() {
    val event = Arguments.createMap().apply {
      putString("message", "MyMessage")
    }
    val reactContext = context as ReactContext
    reactContext
        .getJSModule(RCTEventEmitter::class.java)
        .receiveEvent(id, "topChange", event)
  }
}
```

</TabItem>
<TabItem value="java">

```java
class MyCustomView extends View {
   ...
   public void onReceiveNativeEvent() {
      WritableMap event = Arguments.createMap();
      event.putString("message", "MyMessage");
      ReactContext reactContext = (ReactContext)getContext();
      reactContext
          .getJSModule(RCTEventEmitter.class)
          .receiveEvent(getId(), "topChange", event);
    }
}
```

</TabItem>
</Tabs>

`topChange` 이벤트 이름을 JavaScript의 `onChange` 콜백 prop에 매핑하려면, `ViewManager`의 `getExportedCustomBubblingEventTypeConstants` 메서드를 재정의하여 등록합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
class ReactImageManager : SimpleViewManager<MyCustomView>() {
  ...
  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return mapOf(
      "topChange" to mapOf(
        "phasedRegistrationNames" to mapOf(
          "bubbled" to "onChange"
        )
      )
    )
  }
}
```

</TabItem>
<TabItem value="java">

```java
public class ReactImageManager extends SimpleViewManager<MyCustomView> {
    ...
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put(
            "topChange",
            MapBuilder.of(
                "phasedRegistrationNames",
                MapBuilder.of("bubbled", "onChange")
            )
        ).build();
    }
}
```

</TabItem>
</Tabs>

이 콜백은 원시 이벤트와 함께 호출되며, 일반적으로 래퍼 컴포넌트에서 처리하여 더 단순한 API를 만듭니다.

```tsx {8-11,13-17} title="MyCustomView.tsx"
import {useCallback} from 'react';
import {requireNativeComponent} from 'react-native';

const RCTMyCustomView = requireNativeComponent('RCTMyCustomView');

export default function MyCustomView(props: {
  // ...
  /**
   * Callback that is called continuously when the user is dragging the map.
   */
  onChangeMessage: (message: string) => unknown;
}) {
  const onChange = useCallback(
    event => {
      props.onChangeMessage?.(event.nativeEvent.message);
    },
    [props.onChangeMessage],
  );

  return <RCTMyCustomView {...props} onChange={onChange} />;
}
```

## Android Fragment 통합 예시

기존 네이티브 UI 요소를 React Native 앱에 통합하려면 Android Fragment를 사용하여 `ViewManager`에서 `View`를 반환하는 것보다 네이티브 컴포넌트에 대한 더 세밀한 제어가 필요할 수 있습니다. `onViewCreated`, `onPause`, `onResume`과 같은 [생명주기 메서드](https://developer.android.com/guide/fragments/lifecycle)를 활용하여 뷰에 연결된 커스텀 로직을 추가하려는 경우 이 방법이 필요합니다. 다음 단계를 통해 구현 방법을 알아봅니다.

### 1. 예시 커스텀 뷰 생성

먼저 `FrameLayout`을 확장하는 `CustomView` 클래스를 만듭니다(이 뷰의 내용은 렌더링하려는 어떤 뷰든 될 수 있습니다).

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin title="CustomView.kt"
// replace with your package
package com.mypackage

import android.content.Context
import android.graphics.Color
import android.widget.FrameLayout
import android.widget.TextView

class CustomView(context: Context) : FrameLayout(context) {
  init {
    // set padding and background color
    setPadding(16,16,16,16)
    setBackgroundColor(Color.parseColor("#5FD3F3"))

    // add default text view
    addView(TextView(context).apply {
      text = "Welcome to Android Fragments with React Native."
    })
  }
}
```

</TabItem>
<TabItem value="java">

```java title="CustomView.java"
// replace with your package
package com.mypackage;

import android.content.Context;
import android.graphics.Color;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;

public class CustomView extends FrameLayout {
  public CustomView(@NonNull Context context) {
    super(context);
    // set padding and background color
    this.setPadding(16,16,16,16);
    this.setBackgroundColor(Color.parseColor("#5FD3F3"));

    // add default text view
    TextView text = new TextView(context);
    text.setText("Welcome to Android Fragments with React Native.");
    this.addView(text);
  }
}
```

</TabItem>
</Tabs>

### 2. `Fragment` 생성

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin title="MyFragment.kt"
// replace with your package
package com.mypackage

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment

// replace with your view's import
import com.mypackage.CustomView

class MyFragment : Fragment() {
  private lateinit var customView: CustomView

  override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
    super.onCreateView(inflater, container, savedInstanceState)
    customView = CustomView(requireNotNull(context))
    return customView // this CustomView could be any view that you want to render
  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    // do any logic that should happen in an `onCreate` method, e.g:
    // customView.onCreate(savedInstanceState);
  }

  override fun onPause() {
    super.onPause()
    // do any logic that should happen in an `onPause` method
    // e.g.: customView.onPause();
  }

  override fun onResume() {
    super.onResume()
    // do any logic that should happen in an `onResume` method
    // e.g.: customView.onResume();
  }

  override fun onDestroy() {
    super.onDestroy()
    // do any logic that should happen in an `onDestroy` method
    // e.g.: customView.onDestroy();
  }
}
```

</TabItem>
<TabItem value="java">

```java title="MyFragment.java"
// replace with your package
package com.mypackage;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.fragment.app.Fragment;

// replace with your view's import
import com.mypackage.CustomView;

public class MyFragment extends Fragment {
    CustomView customView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
        super.onCreateView(inflater, parent, savedInstanceState);
        customView = new CustomView(this.getContext());
        return customView; // this CustomView could be any view that you want to render
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        // do any logic that should happen in an `onCreate` method, e.g:
        // customView.onCreate(savedInstanceState);
    }

    @Override
    public void onPause() {
        super.onPause();
        // do any logic that should happen in an `onPause` method
        // e.g.: customView.onPause();
    }

    @Override
    public void onResume() {
        super.onResume();
       // do any logic that should happen in an `onResume` method
       // e.g.: customView.onResume();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        // do any logic that should happen in an `onDestroy` method
        // e.g.: customView.onDestroy();
    }
}
```

</TabItem>
</Tabs>

### 3. `ViewManager` 서브클래스 생성

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin title="MyViewManager.kt"
// replace with your package
package com.mypackage

import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactPropGroup

class MyViewManager(
    private val reactContext: ReactApplicationContext
) : ViewGroupManager<FrameLayout>() {
  private var propWidth: Int? = null
  private var propHeight: Int? = null

  override fun getName() = REACT_CLASS

  /**
   * Return a FrameLayout which will later hold the Fragment
   */
  override fun createViewInstance(reactContext: ThemedReactContext) =
      FrameLayout(reactContext)

  /**
   * Map the "create" command to an integer
   */
  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  /**
   * Handle "create" command (called from JS) and call createFragment method
   */
  override fun receiveCommand(
      root: FrameLayout,
      commandId: String,
      args: ReadableArray?
  ) {
    super.receiveCommand(root, commandId, args)
    val reactNativeViewId = requireNotNull(args).getInt(0)

    when (commandId.toInt()) {
      COMMAND_CREATE -> createFragment(root, reactNativeViewId)
    }
  }

  @ReactPropGroup(names = ["width", "height"], customType = "Style")
  fun setStyle(view: FrameLayout, index: Int, value: Int) {
    if (index == 0) propWidth = value
    if (index == 1) propHeight = value
  }

  /**
   * Replace your React Native view with a custom fragment
   */
  fun createFragment(root: FrameLayout, reactNativeViewId: Int) {
    val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
    setupLayout(parentView)

    val myFragment = MyFragment()
    val activity = reactContext.currentActivity as FragmentActivity
    activity.supportFragmentManager
        .beginTransaction()
        .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
        .commit()
  }

  fun setupLayout(view: View) {
    Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
      override fun doFrame(frameTimeNanos: Long) {
        manuallyLayoutChildren(view)
        view.viewTreeObserver.dispatchOnGlobalLayout()
        Choreographer.getInstance().postFrameCallback(this)
      }
    })
  }

  /**
   * Layout all children properly
   */
  private fun manuallyLayoutChildren(view: View) {
    // propWidth and propHeight coming from react-native props
    val width = requireNotNull(propWidth)
    val height = requireNotNull(propHeight)

    view.measure(
        View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
        View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY))

    view.layout(0, 0, width, height)
  }

  companion object {
    private const val REACT_CLASS = "MyViewManager"
    private const val COMMAND_CREATE = 1
  }
}
```

</TabItem>
<TabItem value="java">

```java title="MyViewManager.java"
// replace with your package
package com.mypackage;

import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

public class MyViewManager extends ViewGroupManager<FrameLayout> {

  public static final String REACT_CLASS = "MyViewManager";
  public final int COMMAND_CREATE = 1;
  private int propWidth;
  private int propHeight;

  ReactApplicationContext reactContext;

  public MyViewManager(ReactApplicationContext reactContext) {
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  /**
   * Return a FrameLayout which will later hold the Fragment
   */
  @Override
  public FrameLayout createViewInstance(ThemedReactContext reactContext) {
    return new FrameLayout(reactContext);
  }

  /**
   * Map the "create" command to an integer
   */
  @Nullable
  @Override
  public Map<String, Integer> getCommandsMap() {
    return MapBuilder.of("create", COMMAND_CREATE);
  }

  /**
   * Handle "create" command (called from JS) and call createFragment method
   */
  @Override
  public void receiveCommand(
    @NonNull FrameLayout root,
    String commandId,
    @Nullable ReadableArray args
  ) {
    super.receiveCommand(root, commandId, args);
    int reactNativeViewId = args.getInt(0);
    int commandIdInt = Integer.parseInt(commandId);

    switch (commandIdInt) {
      case COMMAND_CREATE:
        createFragment(root, reactNativeViewId);
        break;
      default: {}
    }
  }

  @ReactPropGroup(names = {"width", "height"}, customType = "Style")
  public void setStyle(FrameLayout view, int index, Integer value) {
    if (index == 0) {
      propWidth = value;
    }

    if (index == 1) {
      propHeight = value;
    }
  }

  /**
   * Replace your React Native view with a custom fragment
   */
  public void createFragment(FrameLayout root, int reactNativeViewId) {
    ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
    setupLayout(parentView);

    final MyFragment myFragment = new MyFragment();
    FragmentActivity activity = (FragmentActivity) reactContext.getCurrentActivity();
    activity.getSupportFragmentManager()
            .beginTransaction()
            .replace(reactNativeViewId, myFragment, String.valueOf(reactNativeViewId))
            .commit();
  }

  public void setupLayout(View view) {
    Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
      @Override
      public void doFrame(long frameTimeNanos) {
        manuallyLayoutChildren(view);
        view.getViewTreeObserver().dispatchOnGlobalLayout();
        Choreographer.getInstance().postFrameCallback(this);
      }
    });
  }

  /**
   * Layout all children properly
   */
  public void manuallyLayoutChildren(View view) {
      // propWidth and propHeight coming from react-native props
      int width = propWidth;
      int height = propHeight;

      view.measure(
              View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
              View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));

      view.layout(0, 0, width, height);
  }
}
```

</TabItem>
</Tabs>

### 4. `ViewManager` 등록

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin title="MyPackage.kt"
// replace with your package
package com.mypackage

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class MyPackage : ReactPackage {
  ...
  override fun createViewManagers(
      reactContext: ReactApplicationContext
  ) = listOf(MyViewManager(reactContext))
}
```

</TabItem>
<TabItem value="java">

```java title="MyPackage.java"
// replace with your package
package com.mypackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.List;

public class MyPackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Arrays.<ViewManager>asList(
            new MyViewManager(reactContext)
       );
   }

}
```

</TabItem>
</Tabs>

### 5. `Package` 등록

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin title="MainApplication.kt"
override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // add(MyReactNativePackage())
        add(MyAppPackage())
    }
```

</TabItem>
<TabItem value="java">

```java title="MainApplication.java"
@Override
protected List<ReactPackage> getPackages() {
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // Packages that cannot be autolinked yet can be added manually here, for example:
    // packages.add(new MyReactNativePackage());
    packages.add(new MyAppPackage());
    return packages;
}
```

</TabItem>
</Tabs>

### 6. JavaScript 모듈 구현

I. 커스텀 View 매니저로 시작합니다.

```tsx title="MyViewManager.tsx"
import {requireNativeComponent} from 'react-native';

export const MyViewManager =
  requireNativeComponent('MyViewManager');
```

II. 그런 다음 `create` 메서드를 호출하는 커스텀 View를 구현합니다.

```tsx title="MyView.tsx"
import {useEffect, useRef} from 'react';
import {
  PixelRatio,
  UIManager,
  findNodeHandle,
} from 'react-native';

import {MyViewManager} from './my-view-manager';

const createFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.MyViewManager.Commands.create.toString(),
    [viewId],
  );

export const MyView = () => {
  const ref = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  return (
    <MyViewManager
      style={{
        // converts dpi to px, provide desired height
        height: PixelRatio.getPixelSizeForLayoutSize(200),
        // converts dpi to px, provide desired width
        width: PixelRatio.getPixelSizeForLayoutSize(200),
      }}
      ref={ref}
    />
  );
};
```

`@ReactProp` (또는 `@ReactPropGroup`) 어노테이션을 사용하여 속성 setter를 노출하려면 위의 [ImageView 예시](#imageview-예시)를 참조하세요.
