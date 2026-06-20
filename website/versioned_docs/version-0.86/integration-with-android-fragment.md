---
id: integration-with-android-fragment
title: Android Fragment과의 통합
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[기존 앱과의 통합](/docs/integration-with-existing-apps) 가이드는 React Native 앱 전체를 기존 Android 앱의 **Activity**로 통합하는 방법을 설명합니다.

기존 앱의 **Fragment** 내에서 React Native 컴포넌트를 사용하려면 추가적인 설정이 필요합니다.

### 1. 앱에 React Native 추가하기

[기존 앱과의 통합](/docs/integration-with-existing-apps) 가이드를 끝까지 따라 진행하여, 전체 화면 Activity에서 React Native 앱을 안전하게 실행할 수 있는지 확인하세요.

### 2. React Native Fragment를 위한 FrameLayout 추가하기

이 예제에서는 `FrameLayout`을 사용하여 Activity에 React Native Fragment를 추가합니다. 이 방법은 충분히 유연하며, Bottom Sheets나 Tab Layouts 같은 다른 레이아웃에서도 React Native를 사용할 수 있도록 응용할 수 있습니다.

먼저 Activity의 레이아웃(예: `res/layouts` 폴더의 `main_activity.xml`)에 id, width, height가 지정된 `<FrameLayout>`을 추가하세요. 이 레이아웃이 React Native Fragment를 렌더링하는 위치가 됩니다.

```xml
<FrameLayout
    android:id="@+id/react_native_fragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

### 3. 호스트 Activity가 `DefaultHardwareBackBtnHandler`를 구현하도록 설정하기

호스트 Activity는 `ReactActivity`가 아니므로, 뒤로 가기 버튼 누름 이벤트를 처리하기 위해 `DefaultHardwareBackBtnHandler` 인터페이스를 구현해야 합니다.
이는 React Native가 뒤로 가기 버튼 누름 이벤트를 처리하는 데 필요합니다.

호스트 Activity로 이동하여 `DefaultHardwareBackBtnHandler` 인터페이스를 구현하는지 확인하세요.

:::warning Deprecated
`Activity.onBackPressed()`는 API 레벨 33부터 [deprecated](<https://developer.android.com/reference/android/app/Activity#onBackPressed()>)되었습니다. API 레벨 36을 대상으로 하는 Android 16 기기에서는 이 메서드가 [더 이상 호출되지 않으며](https://developer.android.com/about/versions/16/behavior-changes-16#predictive-back) 대신 [OnBackPressedDispatcher](https://developer.android.com/reference/androidx/activity/OnBackPressedDispatcher)를 사용해야 합니다.
:::

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```diff
package <your-package-here>

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
+import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

+class MainActivity : AppCompatActivity() {
+class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
            // Handle button click
        }
    }

+   override fun invokeDefaultOnBackPressed() {
+       onBackPressedDispatcher.onBackPressed()
+   }
}
```

</TabItem>
<TabItem value="java">

```diff
package <your-package-here>;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
+import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

-class MainActivity extends AppCompatActivity {
+class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        findViewById(R.id.button_appcompose).setOnClickListener(button -> {
            // Handle button click
        });
    }

+   @Override
+   public void invokeDefaultOnBackPressed() {
+       getOnBackPressedDispatcher().onBackPressed();
+   }
}
```

</TabItem>
</Tabs>

### 4. FrameLayout에 React Native Fragment 추가하기

마지막으로, Activity를 업데이트하여 FrameLayout에 React Native Fragment를 추가합니다.
이 예제에서는 Activity에 `sample_button` id를 가진 버튼이 있으며, 클릭 시 FrameLayout에 React Native Fragment가 렌더링된다고 가정합니다.

Activity의 `onCreate` 메서드를 다음과 같이 업데이트하세요.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```diff
package <your-package-here>

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
+import com.facebook.react.ReactFragment
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

public class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
+           val reactNativeFragment = ReactFragment.Builder()
+               .setComponentName("HelloWorld")
+               .setLaunchOptions(Bundle().apply { putString("message", "my value") })
+               .build()
+           supportFragmentManager
+               .beginTransaction()
+               .add(R.id.react_native_fragment, reactNativeFragment)
+               .commit()
        }
    }

   override fun invokeDefaultOnBackPressed() {
       super.onBackPressed()
   }
}
```

</TabItem>
<TabItem value="java">

```diff
package <your-package-here>;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
+import com.facebook.react.ReactFragment;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        findViewById(R.id.button_appcompose).setOnClickListener(button -> {
+           Bundle launchOptions = new Bundle();
+           launchOptions.putString("message", "my value");
+
+           ReactFragment fragment = new ReactFragment.Builder()
+                   .setComponentName("HelloWorld")
+                   .setLaunchOptions(launchOptions)
+                   .build();
+           getSupportFragmentManager()
+                   .beginTransaction()
+                   .add(R.id.react_native_fragment, fragment)
+                   .commit();
        });
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

</TabItem>
</Tabs>

위의 코드를 살펴보겠습니다.

`ReactFragment.Builder()`를 사용하여 새로운 `ReactFragment`를 생성하고, `supportFragmentManager`를 사용하여 해당 Fragment를 `FrameLayout`에 추가합니다.

빌더 내부에서 Fragment 생성 방법을 커스터마이즈할 수 있습니다.

- `setComponentName`은 렌더링할 컴포넌트의 이름입니다. `index.js`의 `registerComponent` 메서드 내에 지정된 문자열과 동일합니다.
- `setLaunchOptions`는 컴포넌트에 초기 props를 전달하는 선택적 메서드입니다. 사용하지 않는 경우 제거해도 됩니다.

### 5. 통합 테스트하기

`yarn start`를 실행하여 번들러를 시작한 다음, Android Studio에서 Android 앱을 실행하세요. 앱이 개발 서버에서 JavaScript/TypeScript 코드를 로드하여 Activity의 React Native Fragment에 표시되어야 합니다.

앱은 다음과 같이 표시됩니다.

![스크린샷](/docs/assets/EmbeddedAppAndroidFragmentVideo.gif)
