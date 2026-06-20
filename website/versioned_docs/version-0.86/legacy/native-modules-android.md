---
id: native-modules-android
title: Android Native Modules
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<NativeDeprecated />

Android 네이티브 모듈에 오신 것을 환영합니다. 네이티브 모듈이 무엇인지에 대한 소개는 [네이티브 모듈 소개](native-modules-intro)를 먼저 읽어보세요.

## Calendar 네이티브 모듈 만들기

다음 가이드에서는 JavaScript에서 Android의 캘린더 API에 접근할 수 있게 해주는 네이티브 모듈 `CalendarModule`을 만들어보겠습니다. 가이드가 끝나면 JavaScript에서 `CalendarModule.createCalendarEvent('Dinner Party', 'My House');`를 호출하여 캘린더 이벤트를 생성하는 Java/Kotlin 메서드를 실행할 수 있게 됩니다.

### 설정

시작하려면 Android Studio에서 React Native 애플리케이션 내의 Android 프로젝트를 여세요. React Native 앱에서 Android 프로젝트는 다음 위치에 있습니다.

<figure>
  <img src="/docs/assets/native-modules-android-open-project.png" width="500" alt="Image of opening up an Android project within a React Native app inside of Android Studio." />
  <figcaption>Android 프로젝트를 찾을 수 있는 위치</figcaption>
</figure>

네이티브 코드를 작성할 때는 Android Studio를 사용하는 것을 권장합니다. Android Studio는 Android 개발을 위해 만들어진 IDE로, 코드 문법 오류와 같은 사소한 문제를 빠르게 해결하는 데 도움이 됩니다.

또한 Java/Kotlin 코드를 반복 작업할 때 빌드 속도를 높이기 위해 [Gradle Daemon](https://docs.gradle.org/2.9/userguide/gradle_daemon.html)을 활성화하는 것을 권장합니다.

### 커스텀 네이티브 모듈 파일 만들기

첫 번째 단계는 `android/app/src/main/java/com/your-app-name/` 폴더 안에 (`CalendarModule.java` 또는 `CalendarModule.kt`) Java/Kotlin 파일을 만드는 것입니다(폴더는 Kotlin과 Java 모두 동일합니다). 이 Java/Kotlin 파일에 네이티브 모듈 Java/Kotlin 클래스가 포함됩니다.

<figure>
  <img src="/docs/assets/native-modules-android-add-class.png" width="700" alt="Image of adding a class called CalendarModule.java within the Android Studio." />
  <figcaption>CalendarModule 클래스를 추가하는 방법</figcaption>
</figure>

그런 다음 다음 내용을 추가하세요.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
package com.your-apps-package-name; // replace your-apps-package-name with your app's package name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
   CalendarModule(ReactApplicationContext context) {
       super(context);
   }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
package com.your-apps-package-name; // replace your-apps-package-name with your app's package name
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {...}
```

</TabItem>
</Tabs>

보시다시피 `CalendarModule` 클래스는 `ReactContextBaseJavaModule` 클래스를 상속합니다. Android에서 Java/Kotlin 네이티브 모듈은 `ReactContextBaseJavaModule`을 상속하고 JavaScript에서 필요한 기능을 구현하는 클래스로 작성됩니다.

:::note
기술적으로 Java/Kotlin 클래스는 React Native에서 네이티브 모듈로 인식되기 위해 `BaseJavaModule` 클래스만 상속하거나 `NativeModule` 인터페이스만 구현해도 됩니다.

그러나 위에서 보여준 것처럼 `ReactContextBaseJavaModule`을 사용하는 것을 권장합니다. `ReactContextBaseJavaModule`은 액티비티 라이프사이클 메서드에 연결해야 하는 네이티브 모듈에 유용한 `ReactApplicationContext`(RAC)에 대한 접근을 제공합니다. 또한 `ReactContextBaseJavaModule`을 사용하면 향후 네이티브 모듈을 타입-세이프하게 만들기가 더 쉬워집니다. 향후 릴리즈에서 제공될 네이티브 모듈 타입 안전성을 위해 React Native는 각 네이티브 모듈의 JavaScript 스펙을 참고하여 `ReactContextBaseJavaModule`을 상속하는 추상 기본 클래스를 생성합니다.
:::

### 모듈 이름

Android의 모든 Java/Kotlin 네이티브 모듈은 `getName()` 메서드를 구현해야 합니다. 이 메서드는 네이티브 모듈의 이름을 나타내는 문자열을 반환합니다. 그러면 해당 이름을 사용하여 JavaScript에서 네이티브 모듈에 접근할 수 있습니다. 예를 들어, 아래 코드 스니펫에서 `getName()`은 `"CalendarModule"`을 반환합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
// add to CalendarModule.java
@Override
public String getName() {
   return "CalendarModule";
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
// add to CalendarModule.kt
override fun getName() = "CalendarModule"
```

</TabItem>
</Tabs>

그러면 JS에서 다음과 같이 네이티브 모듈에 접근할 수 있습니다.

```tsx
const {CalendarModule} = ReactNative.NativeModules;
```

### JavaScript에 네이티브 메서드 내보내기

다음으로 캘린더 이벤트를 생성하고 JavaScript에서 호출할 수 있는 메서드를 네이티브 모듈에 추가해야 합니다. JavaScript에서 호출하려는 모든 네이티브 모듈 메서드는 `@ReactMethod`로 어노테이션을 달아야 합니다.

`CalendarModule.createCalendarEvent()`를 통해 JS에서 호출할 수 있는 `CalendarModule`의 `createCalendarEvent()` 메서드를 설정합니다. 지금은 메서드가 이름과 위치를 문자열로 받습니다. 인수 타입 옵션은 곧 다룰 것입니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod
public void createCalendarEvent(String name, String location) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod fun createCalendarEvent(name: String, location: String) {}
```

</TabItem>
</Tabs>

애플리케이션에서 호출했을 때 메서드가 실행되었는지 확인할 수 있도록 메서드에 디버그 로그를 추가하세요. 아래는 Android util 패키지에서 [Log](https://developer.android.com/reference/android/util/Log) 클래스를 임포트하고 사용하는 예시입니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import android.util.Log;

@ReactMethod
public void createCalendarEvent(String name, String location) {
   Log.d("CalendarModule", "Create event called with name: " + name
   + " and location: " + location);
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import android.util.Log

@ReactMethod
fun createCalendarEvent(name: String, location: String) {
    Log.d("CalendarModule", "Create event called with name: $name and location: $location")
}
```

</TabItem>
</Tabs>

네이티브 모듈 구현을 완료하고 JavaScript에 연결하면 [이 단계](https://developer.android.com/studio/debug/am-logcat.html)를 따라 앱의 로그를 확인할 수 있습니다.

### 동기 메서드

네이티브 메서드에 `isBlockingSynchronousMethod = true`를 전달하여 동기 메서드로 표시할 수 있습니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod(isBlockingSynchronousMethod = true)
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod(isBlockingSynchronousMethod = true)
```

</TabItem>
</Tabs>

현재로서는 이 방법을 권장하지 않습니다. 메서드를 동기적으로 호출하면 심각한 성능 저하가 발생하고 네이티브 모듈에 스레딩 관련 버그가 생길 수 있기 때문입니다. 또한 `isBlockingSynchronousMethod`를 활성화하면 앱에서 Google Chrome 디버거를 더 이상 사용할 수 없다는 점에 유의하세요. 이는 동기 메서드가 JS VM과 앱 사이의 메모리 공유를 필요로 하기 때문입니다. Google Chrome 디버거를 사용할 때 React Native는 Google Chrome 내의 JS VM에서 실행되며 WebSocket을 통해 모바일 기기와 비동기로 통신합니다.

### 모듈 등록 (Android 전용)

네이티브 모듈을 작성했으면 React Native에 등록해야 합니다. 이를 위해 네이티브 모듈을 `ReactPackage`에 추가하고 `ReactPackage`를 React Native에 등록해야 합니다. 초기화 시 React Native는 모든 패키지를 순회하며 각 `ReactPackage`에 대해 내부의 각 네이티브 모듈을 등록합니다.

React Native는 `ReactPackage`의 `createNativeModules()` 메서드를 호출하여 등록할 네이티브 모듈 목록을 가져옵니다. Android에서 모듈이 `createNativeModules`에서 인스턴스화되어 반환되지 않으면 JavaScript에서 사용할 수 없습니다.

`ReactPackage`에 네이티브 모듈을 추가하려면 먼저 `android/app/src/main/java/com/your-app-name/` 폴더 안에 `ReactPackage`를 구현하는 새 Java/Kotlin 클래스(`MyAppPackage.java` 또는 `MyAppPackage.kt`)를 만드세요.

그런 다음 다음 내용을 추가하세요.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
package com.your-app-name; // replace your-app-name with your app's name
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();

       modules.add(new CalendarModule(reactContext));

       return modules;
   }

}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
package com.your-app-name // replace your-app-name with your app's name

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class MyAppPackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(CalendarModule(reactContext)).toMutableList()
}
```

</TabItem>
</Tabs>

이 파일은 앞서 만든 네이티브 모듈인 `CalendarModule`을 임포트합니다. 그런 다음 `createNativeModules()` 함수 내에서 `CalendarModule`을 인스턴스화하고 등록할 `NativeModules` 목록에 담아 반환합니다. 이후에 더 많은 네이티브 모듈을 추가한다면 여기서도 인스턴스화하여 목록에 추가할 수 있습니다.

:::note
이 방식으로 네이티브 모듈을 등록하면 애플리케이션 시작 시 모든 네이티브 모듈을 즉시 초기화하므로 앱의 시작 시간이 늘어납니다. 대안으로 [TurboReactPackage](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/TurboReactPackage.kt)를 사용할 수 있습니다. TurboReactPackage는 인스턴스화된 네이티브 모듈 객체 목록을 반환하는 `createNativeModules` 대신, 필요할 때 네이티브 모듈 객체를 생성하는 `getModule(String name, ReactApplicationContext rac)` 메서드를 구현합니다. TurboReactPackage는 현재 구현이 다소 복잡합니다. `getModule()` 메서드 외에도, 패키지가 인스턴스화할 수 있는 모든 네이티브 모듈 목록과 이를 인스턴스화하는 함수를 반환하는 `getReactModuleInfoProvider()` 메서드를 구현해야 합니다. 예시는 [여기](https://github.com/facebook/react-native/blob/8ac467c51b94c82d81930b4802b2978c85539925/ReactAndroid/src/main/java/com/facebook/react/CoreModulesPackage.java#L86-L165)를 참고하세요. TurboReactPackage를 사용하면 앱 시작 시간을 단축할 수 있지만, 현재는 작성이 다소 번거롭습니다. 따라서 TurboReactPackage 사용 시 주의하여 진행하세요.
:::

`CalendarModule` 패키지를 등록하려면 `MyAppPackage`를 ReactNativeHost의 `getPackages()` 메서드가 반환하는 패키지 목록에 추가해야 합니다. `android/app/src/main/java/com/your-app-name/` 경로에 있는 `MainApplication.java` 또는 `MainApplication.kt` 파일을 여세요.

ReactNativeHost의 `getPackages()` 메서드를 찾아 `getPackages()`가 반환하는 패키지 목록에 패키지를 추가하세요.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
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
<TabItem value="kotlin">

```kotlin
override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // add(MyReactNativePackage())
        add(MyAppPackage())
    }
```

</TabItem>
</Tabs>

이제 Android 네이티브 모듈을 성공적으로 등록했습니다!

### 빌드 결과 테스트하기

이 시점에서 Android의 네이티브 모듈에 대한 기본 스캐폴딩을 설정했습니다. 네이티브 모듈에 접근하고 JavaScript에서 내보낸 메서드를 호출하여 테스트해보세요.

애플리케이션에서 네이티브 모듈의 `createCalendarEvent()` 메서드 호출을 추가하고 싶은 위치를 찾으세요. 아래는 앱에 추가할 수 있는 컴포넌트 `NewModuleButton`의 예시입니다. `NewModuleButton`의 `onPress()` 함수 안에서 네이티브 모듈을 호출할 수 있습니다.

```tsx
import {NativeModules, Button} from 'react-native';

const NewModuleButton = () => {
  const onPress = () => {
    console.log('We will invoke the native module here!');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
```

JavaScript에서 네이티브 모듈에 접근하려면 먼저 React Native에서 `NativeModules`를 임포트해야 합니다.

```tsx
import {NativeModules} from 'react-native';
```

그런 다음 `NativeModules`에서 `CalendarModule` 네이티브 모듈에 접근할 수 있습니다.

```tsx
const {CalendarModule} = NativeModules;
```

이제 CalendarModule 네이티브 모듈을 사용할 수 있으므로 네이티브 메서드 `createCalendarEvent()`를 호출할 수 있습니다. 아래에서 `NewModuleButton`의 `onPress()` 메서드에 추가합니다.

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent('testName', 'testLocation');
};
```

마지막 단계는 최신 네이티브 코드(새 네이티브 모듈 포함!)를 사용할 수 있도록 React Native 앱을 다시 빌드하는 것입니다. React Native 애플리케이션이 위치한 커맨드라인에서 다음을 실행하세요.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

### 반복하며 빌드하기

이 가이드를 진행하면서 네이티브 모듈을 반복 작업할 때는, JavaScript에서 최신 변경사항에 접근하려면 애플리케이션을 네이티브 방식으로 다시 빌드해야 합니다. 작성 중인 코드가 애플리케이션의 네이티브 부분에 위치하기 때문입니다. React Native의 metro 번들러는 JavaScript 변경사항을 감시하고 즉시 재빌드하지만, 네이티브 코드에 대해서는 그렇게 하지 않습니다. 따라서 최신 네이티브 변경사항을 테스트하려면 위의 명령을 사용하여 다시 빌드해야 합니다.

### 요약✨

이제 앱에서 네이티브 모듈의 `createCalendarEvent()` 메서드를 호출할 수 있어야 합니다. 예시에서는 `NewModuleButton`을 눌러 이를 실행합니다. `createCalendarEvent()` 메서드에 설정한 로그를 확인하여 이를 검증할 수 있습니다. [이 단계](https://developer.android.com/studio/debug/am-logcat.html)를 따라 앱에서 ADB 로그를 확인하세요. 그러면 `Log.d` 메시지(예시에서는 "Create event called with name: testName and location: testLocation")를 검색하여 네이티브 모듈 메서드를 호출할 때마다 메시지가 로그에 남는 것을 확인할 수 있습니다.

<figure>
  <img src="/docs/assets/native-modules-android-logs.png" width="1000" alt="Image of logs." />
  <figcaption>Android Studio의 ADB 로그</figcaption>
</figure>

이 시점에서 Android 네이티브 모듈을 만들고 React Native 애플리케이션의 JavaScript에서 네이티브 메서드를 호출했습니다. 네이티브 모듈 메서드에서 사용 가능한 인수 타입, 콜백 및 Promise 설정 방법 등에 대해 더 알아볼 수 있습니다.

## Calendar 네이티브 모듈을 넘어서

### 더 나은 네이티브 모듈 내보내기

위처럼 `NativeModules`에서 네이티브 모듈을 꺼내 임포트하는 방식은 다소 번거롭습니다.

네이티브 모듈 사용자가 매번 이 작업을 할 필요가 없도록 모듈을 위한 JavaScript 래퍼를 만들 수 있습니다. 다음 내용으로 `CalendarModule.js`라는 새 JavaScript 파일을 만드세요.

```tsx
/**
* This exposes the native CalendarModule module as a JS module. This has a
* function 'createCalendarEvent' which takes the following parameters:

* 1. String name: A string representing the name of the event
* 2. String location: A string representing the location of the event
*/
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
export default CalendarModule;
```

이 JavaScript 파일은 JavaScript 측 기능을 추가하기에도 좋은 위치입니다. 예를 들어 TypeScript와 같은 타입 시스템을 사용한다면 여기에 네이티브 모듈에 대한 타입 어노테이션을 추가할 수 있습니다. React Native는 아직 네이티브에서 JS로의 타입 안전성을 지원하지 않지만, 모든 JS 코드가 타입-세이프해집니다. 또한 향후 타입-세이프 네이티브 모듈로 전환하기도 더 쉬워집니다. 아래는 CalendarModule에 타입 안전성을 추가하는 예시입니다.

```tsx
/**
 * This exposes the native CalendarModule module as a JS module. This has a
 * function 'createCalendarEvent' which takes the following parameters:
 *
 * 1. String name: A string representing the name of the event
 * 2. String location: A string representing the location of the event
 */
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
interface CalendarInterface {
  createCalendarEvent(name: string, location: string): void;
}
export default CalendarModule as CalendarInterface;
```

다른 JavaScript 파일에서는 다음과 같이 네이티브 모듈에 접근하고 메서드를 호출할 수 있습니다.

```tsx
import CalendarModule from './CalendarModule';
CalendarModule.createCalendarEvent('foo', 'bar');
```

:::note
이 코드는 `CalendarModule`을 임포트하는 위치가 `CalendarModule.js`와 같은 계층 구조에 있다고 가정합니다. 필요에 따라 상대 경로 임포트를 업데이트하세요.
:::

### 인수 타입

네이티브 모듈 메서드가 JavaScript에서 호출되면, React Native는 JS 객체의 인수를 Java/Kotlin 객체 형태로 변환합니다. 예를 들어 Java 네이티브 모듈 메서드가 double을 받는다면, JS에서는 숫자로 메서드를 호출해야 합니다. React Native가 변환을 처리합니다. 아래는 네이티브 모듈 메서드에서 지원하는 인수 타입과 이에 매핑되는 JavaScript 동등 타입 목록입니다.

| Java          | Kotlin        | JavaScript |
| ------------- | ------------- | ---------- |
| Boolean       | Boolean       | ?boolean   |
| boolean       |               | boolean    |
| Double        | Double        | ?number    |
| double        |               | number     |
| String        | String        | string     |
| Callback      | Callback      | Function   |
| Promise       | Promise       | Promise    |
| ReadableMap   | ReadableMap   | Object     |
| ReadableArray | ReadableArray | Array      |

:::info
다음 타입은 현재 지원되지만 TurboModules에서는 지원되지 않을 예정입니다. 사용을 피하세요.

- Integer Java/Kotlin -> ?number
- Float Java/Kotlin -> ?number
- int Java -> number
- float Java -> number
  :::

위 목록에 없는 인수 타입의 경우 변환을 직접 처리해야 합니다. 예를 들어 Android에서는 `Date` 변환이 기본 제공되지 않습니다. 다음과 같이 네이티브 메서드 내에서 `Date` 타입으로의 변환을 직접 처리할 수 있습니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
    String dateFormat = "yyyy-MM-dd";
    SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
    Calendar eStartDate = Calendar.getInstance();
    try {
        eStartDate.setTime(sdf.parse(startDate));
    }

```

</TabItem>
<TabItem value="kotlin">

```kotlin
    val dateFormat = "yyyy-MM-dd"
    val sdf = SimpleDateFormat(dateFormat, Locale.US)
    val eStartDate = Calendar.getInstance()
    try {
        sdf.parse(startDate)?.let {
            eStartDate.time = it
        }
    }
```

</TabItem>
</Tabs>

### 상수 내보내기

네이티브 모듈은 JS에서 사용 가능한 네이티브 메서드 `getConstants()`를 구현하여 상수를 내보낼 수 있습니다. 아래에서 `getConstants()`를 구현하고 JavaScript에서 접근할 수 있는 `DEFAULT_EVENT_NAME` 상수를 담은 Map을 반환합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
public Map<String, Object> getConstants() {
   final Map<String, Object> constants = new HashMap<>();
   constants.put("DEFAULT_EVENT_NAME", "New Event");
   return constants;
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun getConstants(): MutableMap<String, Any> =
    hashMapOf("DEFAULT_EVENT_NAME" to "New Event")
```

</TabItem>
</Tabs>

그런 다음 JS에서 네이티브 모듈의 `getConstants`를 호출하여 상수에 접근할 수 있습니다.

```tsx
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
console.log(DEFAULT_EVENT_NAME);
```

기술적으로는 `getConstants()`에서 내보낸 상수를 네이티브 모듈 객체에서 직접 접근할 수도 있습니다. 그러나 이는 TurboModules에서 더 이상 지원되지 않으므로, 향후 필요한 마이그레이션을 피하기 위해 위의 접근 방식으로 전환할 것을 권장합니다.

:::note
현재 상수는 초기화 시에만 내보내집니다. 따라서 런타임에 `getConstants` 값을 변경해도 JavaScript 환경에는 반영되지 않습니다. 이는 Turbomodules에서 변경될 예정입니다. Turbomodules에서는 `getConstants()`가 일반 네이티브 모듈 메서드가 되어 각 호출마다 네이티브 측에 접근합니다.
:::

### 콜백

네이티브 모듈은 콜백이라는 특별한 종류의 인수도 지원합니다. 콜백은 비동기 메서드에서 Java/Kotlin에서 JavaScript로 데이터를 전달하는 데 사용됩니다. 네이티브 측에서 비동기적으로 JavaScript를 실행하는 데도 사용할 수 있습니다.

콜백이 있는 네이티브 모듈 메서드를 만들려면 먼저 `Callback` 인터페이스를 임포트한 다음, 네이티브 모듈 메서드에 `Callback` 타입의 새 파라미터를 추가하세요. 콜백 인수에는 TurboModules에서 곧 해소될 몇 가지 특이 사항이 있습니다. 첫째, 함수 인수로 콜백을 두 개만 가질 수 있습니다(성공 콜백과 실패 콜백). 또한 네이티브 모듈 메서드 호출의 마지막 인수가 함수인 경우 성공 콜백으로 처리되고, 마지막에서 두 번째 인수가 함수인 경우 실패 콜백으로 처리됩니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import com.facebook.react.bridge.Callback;

@ReactMethod
public void createCalendarEvent(String name, String location, Callback callBack) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import com.facebook.react.bridge.Callback

@ReactMethod fun createCalendarEvent(name: String, location: String, callback: Callback) {}
```

</TabItem>
</Tabs>

Java/Kotlin 메서드에서 JavaScript에 전달하려는 데이터를 제공하여 콜백을 호출할 수 있습니다. 네이티브 코드에서 JavaScript로는 직렬화 가능한 데이터만 전달할 수 있습니다. 네이티브 객체를 반환해야 하는 경우 `WriteableMaps`를 사용하고, 컬렉션을 사용해야 하는 경우 `WritableArrays`를 사용하세요. 또한 콜백은 네이티브 함수가 완료된 직후에 호출되지 않는다는 점도 중요합니다. 아래에서는 이전 호출에서 생성된 이벤트의 ID가 콜백에 전달됩니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
  @ReactMethod
   public void createCalendarEvent(String name, String location, Callback callBack) {
       Integer eventId = ...
       callBack.invoke(eventId);
   }
```

</TabItem>
<TabItem value="kotlin">

```kotlin
  @ReactMethod
  fun createCalendarEvent(name: String, location: String, callback: Callback) {
      val eventId = ...
      callback.invoke(eventId)
  }
```

</TabItem>
</Tabs>

그러면 JavaScript에서 다음과 같이 이 메서드에 접근할 수 있습니다.

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'Party',
    'My House',
    eventId => {
      console.log(`Created a new event with id ${eventId}`);
    },
  );
};
```

또 중요한 점은 네이티브 모듈 메서드는 하나의 콜백을 한 번만 호출할 수 있다는 것입니다. 즉 성공 콜백이나 실패 콜백 중 하나만 호출할 수 있으며, 각 콜백은 최대 한 번만 호출할 수 있습니다. 단, 네이티브 모듈은 콜백을 저장해두었다가 나중에 호출할 수 있습니다.

콜백으로 에러를 처리하는 방법에는 두 가지가 있습니다. 첫 번째는 Node의 관례를 따라 콜백에 전달된 첫 번째 인수를 에러 객체로 처리하는 것입니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
  @ReactMethod
   public void createCalendarEvent(String name, String location, Callback callBack) {
       Integer eventId = ...
       callBack.invoke(null, eventId);
   }
```

</TabItem>
<TabItem value="kotlin">

```kotlin
  @ReactMethod
  fun createCalendarEvent(name: String, location: String, callback: Callback) {
      val eventId = ...
      callback.invoke(null, eventId)
  }
```

</TabItem>
</Tabs>

그런 다음 JavaScript에서 첫 번째 인수를 확인하여 에러가 전달되었는지 확인할 수 있습니다.

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'testName',
    'testLocation',
    (error, eventId) => {
      if (error) {
        console.error(`Error found! ${error}`);
      }
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

또 다른 방법은 onSuccess와 onFailure 콜백을 사용하는 것입니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod
public void createCalendarEvent(String name, String location, Callback myFailureCallback, Callback mySuccessCallback) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod
  fun createCalendarEvent(
      name: String,
      location: String,
      myFailureCallback: Callback,
      mySuccessCallback: Callback
  ) {}
```

</TabItem>
</Tabs>

그러면 JavaScript에서 에러와 성공 응답에 대해 별도의 콜백을 추가할 수 있습니다.

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'testName',
    'testLocation',
    error => {
      console.error(`Error found! ${error}`);
    },
    eventId => {
      console.log(`event id ${eventId} returned`);
    },
  );
};
```

### Promise

네이티브 모듈은 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 이행할 수도 있으며, 특히 ES2016의 [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) 문법을 사용할 때 JavaScript를 단순화할 수 있습니다. 네이티브 모듈 Java/Kotlin 메서드의 마지막 파라미터가 Promise인 경우, 해당 JS 메서드는 JS Promise 객체를 반환합니다.

위 코드를 콜백 대신 Promise를 사용하도록 리팩터링하면 다음과 같습니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import com.facebook.react.bridge.Promise;

@ReactMethod
public void createCalendarEvent(String name, String location, Promise promise) {
    try {
        Integer eventId = ...
        promise.resolve(eventId);
    } catch(Exception e) {
        promise.reject("Create Event Error", e);
    }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import com.facebook.react.bridge.Promise

@ReactMethod
fun createCalendarEvent(name: String, location: String, promise: Promise) {
    try {
        val eventId = ...
        promise.resolve(eventId)
    } catch (e: Throwable) {
        promise.reject("Create Event Error", e)
    }
}
```

</TabItem>
</Tabs>

:::note
콜백과 마찬가지로, 네이티브 모듈 메서드는 Promise를 거부하거나 이행할 수 있지만 둘 다는 불가능하며, 최대 한 번만 할 수 있습니다. 즉 성공 콜백이나 실패 콜백 중 하나만 호출할 수 있으며, 각 콜백은 최대 한 번만 호출할 수 있습니다. 단, 네이티브 모듈은 콜백을 저장해두었다가 나중에 호출할 수 있습니다.
:::

이 메서드의 JavaScript 대응 부분은 Promise를 반환합니다. 즉 async 함수 내에서 `await` 키워드를 사용하여 호출하고 결과를 기다릴 수 있습니다.

```tsx
const onSubmit = async () => {
  try {
    const eventId = await CalendarModule.createCalendarEvent(
      'Party',
      'My House',
    );
    console.log(`Created a new event with id ${eventId}`);
  } catch (e) {
    console.error(e);
  }
};
```

reject 메서드는 다음 인수의 다양한 조합을 받습니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
String code, String message, WritableMap userInfo, Throwable throwable
```

</TabItem>
<TabItem value="kotlin">

```kotlin
code: String, message: String, userInfo: WritableMap, throwable: Throwable
```

</TabItem>
</Tabs>

자세한 내용은 `Promise.java` 인터페이스를 [여기](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/bridge/Promise.kt)에서 확인할 수 있습니다. `userInfo`가 제공되지 않으면 ReactNative는 이를 null로 설정합니다. 나머지 파라미터에 대해 React Native는 기본값을 사용합니다. `message` 인수는 에러 호출 스택 상단에 표시되는 에러 `message`를 제공합니다. 아래는 Java/Kotlin에서의 다음 reject 호출에서 JavaScript에 표시되는 에러 메시지 예시입니다.

Java/Kotlin reject 호출:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
promise.reject("Create Event error", "Error parsing date", e);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
promise.reject("Create Event error", "Error parsing date", e)
```

</TabItem>
</Tabs>

Promise가 거부될 때 React Native 앱의 에러 메시지:

<figure>
  <img src="/docs/assets/native-modules-android-errorscreen.png" width="200" alt="Image of error message in React Native app." />
  <figcaption>에러 메시지 이미지</figcaption>
</figure>

### JavaScript로 이벤트 보내기

네이티브 모듈은 직접 호출되지 않고도 JavaScript에 이벤트를 신호로 보낼 수 있습니다. 예를 들어 네이티브 Android 캘린더 앱의 캘린더 이벤트가 곧 발생한다는 알림을 JavaScript에 보내고 싶을 수 있습니다. 이를 수행하는 가장 쉬운 방법은 아래 코드 스니펫처럼 `ReactContext`에서 얻을 수 있는 `RCTDeviceEventEmitter`를 사용하는 것입니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
...
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
...
private void sendEvent(ReactContext reactContext,
                      String eventName,
                      @Nullable WritableMap params) {
 reactContext
     .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
     .emit(eventName, params);
}

private int listenerCount = 0;

@ReactMethod
public void addListener(String eventName) {
  if (listenerCount == 0) {
    // Set up any upstream listeners or background tasks as necessary
  }

  listenerCount += 1;
}

@ReactMethod
public void removeListeners(Integer count) {
  listenerCount -= count;
  if (listenerCount == 0) {
    // Remove upstream listeners, stop unnecessary background tasks
  }
}
...
WritableMap params = Arguments.createMap();
params.putString("eventProperty", "someValue");
...
sendEvent(reactContext, "EventReminder", params);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
...
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
...

private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
}

private var listenerCount = 0

@ReactMethod
fun addListener(eventName: String) {
  if (listenerCount == 0) {
    // Set up any upstream listeners or background tasks as necessary
  }

  listenerCount += 1
}

@ReactMethod
fun removeListeners(count: Int) {
  listenerCount -= count
  if (listenerCount == 0) {
    // Remove upstream listeners, stop unnecessary background tasks
  }
}
...
val params = Arguments.createMap().apply {
    putString("eventProperty", "someValue")
}
...
sendEvent(reactContext, "EventReminder", params)
```

</TabItem>
</Tabs>

JavaScript 모듈은 [NativeEventEmitter](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/EventEmitter/NativeEventEmitter.js) 클래스의 `addListener`를 통해 이벤트를 수신하도록 등록할 수 있습니다.

```tsx
import {NativeEventEmitter, NativeModules} from 'react-native';
...
useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    let eventListener = eventEmitter.addListener('EventReminder', event => {
      console.log(event.eventProperty) // "someValue"
    });

    // Removes the listener once unmounted
    return () => {
      eventListener.remove();
    };
  }, []);
```

### startActivityForResult에서 액티비티 결과 가져오기

`startActivityForResult`로 시작한 액티비티에서 결과를 가져오려면 `onActivityResult`를 리스닝해야 합니다. 이를 위해 `BaseActivityEventListener`를 상속하거나 `ActivityEventListener`를 구현해야 합니다. API 변경에 더 잘 대응하기 때문에 전자를 권장합니다. 그런 다음 다음과 같이 모듈 생성자에서 리스너를 등록해야 합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
reactContext.addActivityEventListener(mActivityResultListener);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
reactContext.addActivityEventListener(mActivityResultListener);
```

</TabItem>
</Tabs>

이제 다음 메서드를 구현하여 `onActivityResult`를 리스닝할 수 있습니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
public void onActivityResult(
 final Activity activity,
 final int requestCode,
 final int resultCode,
 final Intent intent) {
 // Your logic here
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun onActivityResult(
    activity: Activity?,
    requestCode: Int,
    resultCode: Int,
    intent: Intent?
) {
    // Your logic here
}
```

</TabItem>
</Tabs>

이를 시연하기 위해 기본적인 이미지 선택기를 구현해보겠습니다. 이미지 선택기는 JavaScript에 `pickImage` 메서드를 노출하며, 호출 시 이미지 경로를 반환합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```kotlin
public class ImagePickerModule extends ReactContextBaseJavaModule {

  private static final int IMAGE_PICKER_REQUEST = 1;
  private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
  private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
  private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
  private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";

  private Promise mPickerPromise;

  private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
      if (requestCode == IMAGE_PICKER_REQUEST) {
        if (mPickerPromise != null) {
          if (resultCode == Activity.RESULT_CANCELED) {
            mPickerPromise.reject(E_PICKER_CANCELLED, "Image picker was cancelled");
          } else if (resultCode == Activity.RESULT_OK) {
            Uri uri = intent.getData();

            if (uri == null) {
              mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found");
            } else {
              mPickerPromise.resolve(uri.toString());
            }
          }

          mPickerPromise = null;
        }
      }
    }
  };

  ImagePickerModule(ReactApplicationContext reactContext) {
    super(reactContext);

    // Add the listener for `onActivityResult`
    reactContext.addActivityEventListener(mActivityEventListener);
  }

  @Override
  public String getName() {
    return "ImagePickerModule";
  }

  @ReactMethod
  public void pickImage(final Promise promise) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
      return;
    }

    // Store the promise to resolve/reject when picker returns data
    mPickerPromise = promise;

    try {
      final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

      galleryIntent.setType("image/*");

      final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");

      currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST);
    } catch (Exception e) {
      mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER, e);
      mPickerPromise = null;
    }
  }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
class ImagePickerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var pickerPromise: Promise? = null

    private val activityEventListener =
        object : BaseActivityEventListener() {
            override fun onActivityResult(
                activity: Activity?,
                requestCode: Int,
                resultCode: Int,
                intent: Intent?
            ) {
                if (requestCode == IMAGE_PICKER_REQUEST) {
                    pickerPromise?.let { promise ->
                        when (resultCode) {
                            Activity.RESULT_CANCELED ->
                                promise.reject(E_PICKER_CANCELLED, "Image picker was cancelled")
                            Activity.RESULT_OK -> {
                                val uri = intent?.data

                                uri?.let { promise.resolve(uri.toString())}
                                    ?: promise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found")
                            }
                        }

                        pickerPromise = null
                    }
                }
            }
        }

    init {
        reactContext.addActivityEventListener(activityEventListener)
    }

    override fun getName() = "ImagePickerModule"

    @ReactMethod
    fun pickImage(promise: Promise) {
        val activity = currentActivity

        if (activity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
            return
        }

        pickerPromise = promise

        try {
            val galleryIntent = Intent(Intent.ACTION_PICK).apply { type = "image\/*" }

            val chooserIntent = Intent.createChooser(galleryIntent, "Pick an image")

            activity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST)
        } catch (t: Throwable) {
            pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER, t)
            pickerPromise = null
        }
    }

    companion object {
        const val IMAGE_PICKER_REQUEST = 1
        const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
        const val E_PICKER_CANCELLED = "E_PICKER_CANCELLED"
        const val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
        const val E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND"
    }
}
```

</TabItem>
</Tabs>

### 라이프사이클 이벤트 리스닝

`onResume`, `onPause` 등 액티비티의 LifeCycle 이벤트를 리스닝하는 방법은 `ActivityEventListener`를 구현하는 방법과 매우 유사합니다. 모듈은 `LifecycleEventListener`를 구현해야 합니다. 그런 다음 다음과 같이 모듈 생성자에서 리스너를 등록해야 합니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
reactContext.addLifecycleEventListener(this);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
reactContext.addLifecycleEventListener(this)
```

</TabItem>
</Tabs>

이제 다음 메서드를 구현하여 액티비티의 LifeCycle 이벤트를 리스닝할 수 있습니다.

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
public void onHostResume() {
   // Activity `onResume`
}
@Override
public void onHostPause() {
   // Activity `onPause`
}
@Override
public void onHostDestroy() {
   // Activity `onDestroy`
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun onHostResume() {
    // Activity `onResume`
}

override fun onHostPause() {
    // Activity `onPause`
}

override fun onHostDestroy() {
    // Activity `onDestroy`
}
```

</TabItem>
</Tabs>

### 스레딩

현재 Android에서 모든 네이티브 모듈 비동기 메서드는 하나의 스레드에서 실행됩니다. 네이티브 모듈은 호출되는 스레드에 대해 가정하지 않아야 하며, 현재 할당은 향후 변경될 수 있습니다. 블로킹 호출이 필요한 경우 무거운 작업은 내부적으로 관리되는 워커 스레드로 디스패치하고, 모든 콜백은 해당 스레드에서 분산되어야 합니다.
