---
id: linking
title: Linking
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`Linking`은 수신 및 발신 앱 링크 모두와 상호작용하기 위한 일반적인 인터페이스를 제공합니다.

모든 링크(URL)에는 URL 스킴이 있습니다. 일부 웹사이트는 `https://` 또는 `http://`로 시작하며, `http`가 URL 스킴입니다. 이를 간단히 스킴이라고 부르겠습니다.

`https` 외에도 `mailto` 스킴에도 익숙하실 것입니다. mailto 스킴이 있는 링크를 열면 운영체제가 설치된 메일 애플리케이션을 엽니다. 마찬가지로 전화 걸기와 SMS 전송을 위한 스킴도 있습니다. 아래에서 [기본 제공 URL 스킴](#기본-제공-url-스킴)에 대해 더 자세히 읽어보세요.

mailto 스킴을 사용하는 것처럼 커스텀 URL 스킴을 사용하여 다른 애플리케이션에 링크할 수 있습니다. 예를 들어, Slack에서 **Magic Link** 이메일을 받으면 **Launch Slack** 버튼은 `slack://secret/magic-login/other-secret`과 같은 href를 가진 앵커 태그입니다. Slack과 마찬가지로 운영체제에 커스텀 스킴을 처리하고 싶다고 알릴 수 있습니다. Slack 앱이 열리면 앱을 열 때 사용된 URL을 받습니다. 이를 딥 링크(deep linking)라고 합니다. 앱에서 [딥 링크를 가져오는 방법](#딥-링크-가져오기)에 대해 더 읽어보세요.

커스텀 URL 스킴이 모바일에서 애플리케이션을 여는 유일한 방법은 아닙니다. 예를 들어, 모바일에서 열 링크를 이메일로 보내고 싶다면 커스텀 URL 스킴은 이상적이지 않습니다. 사용자가 데스크톱에서 이메일을 열 수 있는데, 그 경우 링크가 작동하지 않기 때문입니다. 대신 `https://www.myapp.io/records/1234546`과 같은 표준 `https` 링크를 사용해야 합니다. 모바일에서는 이러한 링크를 앱을 열도록 설정할 수 있습니다. Android에서는 이 기능을 **딥 링크(Deep Links)**라고 하며, iOS에서는 **유니버설 링크(Universal Links)**라고 합니다.

### 기본 제공 URL 스킴

소개에서 언급했듯이, 모든 플랫폼에 존재하는 핵심 기능을 위한 몇 가지 URL 스킴이 있습니다. 다음은 전체 목록은 아니지만 가장 일반적으로 사용되는 스킴을 다룹니다.

| 스킴             | 설명                                               | iOS | Android |
| ---------------- | -------------------------------------------------- | --- | ------- |
| `mailto`         | 메일 앱 열기, 예: mailto: hello@world.dev          | ✅  | ✅      |
| `tel`            | 전화 앱 열기, 예: tel:+123456789                   | ✅  | ✅      |
| `sms`            | SMS 앱 열기, 예: sms:+123456789                    | ✅  | ✅      |
| `https` / `http` | 웹 브라우저 앱 열기, 예: https://expo.dev          | ✅  | ✅      |

### 딥 링크 활성화하기

<div className="banner-native-code-required">
  <h3>네이티브 코드가 있는 프로젝트만 해당</h3>
  <p>다음 섹션은 네이티브 코드가 노출된 프로젝트에만 적용됩니다. 관리형 Expo 워크플로를 사용하고 있다면 적절한 대안을 위해 Expo 문서의 <a href="https://docs.expo.dev/guides/linking/">Linking</a> 가이드를 참조하세요.</p>
</div>

앱에서 딥 링크를 활성화하려면 아래 가이드를 읽어보세요:

<Tabs groupId="syntax" queryString defaultValue={constants.defaultPlatform} values={constants.platforms}>
<TabItem value="android">

:::info
Android에서 딥 링크 지원을 추가하는 방법에 대한 지침은 [앱 콘텐츠에 딥 링크 활성화하기 - 딥 링크에 인텐트 필터 추가](https://developer.android.com/training/app-indexing/deep-linking.html#adding-filters)를 참조하세요.
:::

기존 MainActivity 인스턴스에서 인텐트를 수신하려면 `AndroidManifest.xml`에서 MainActivity의 `launchMode`를 `singleTask`로 설정할 수 있습니다. 자세한 내용은 [`<activity>`](https://developer.android.com/guide/topics/manifest/activity-element.html) 문서를 참조하세요.

```xml
<activity
  android:name=".MainActivity"
  android:launchMode="singleTask">
```

</TabItem>
<TabItem value="ios">

:::note
iOS에서는 [여기](linking-libraries-ios#step-3) 3단계에서 설명한 대로 `LinkingIOS` 폴더를 헤더 검색 경로에 추가해야 합니다. 앱 실행 중 수신 앱 링크를 수신하려면 `*AppDelegate.m`에 다음 줄을 추가해야 합니다:

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">

```objc title="AppDelegate.mm"
// iOS 9.x or newer
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
```

앱이 [유니버설 링크(Universal Links)](https://developer.apple.com/ios/universal-links/)를 사용하는 경우 다음 코드도 추가해야 합니다:

```objc title="AppDelegate.mm"
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}
```

</TabItem>
<TabItem value="swift">

```swift title="AppDelegate.swift"
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
  return RCTLinkingManager.application(app, open: url, options: options)
}
```

앱이 [유니버설 링크(Universal Links)](https://developer.apple.com/ios/universal-links/)를 사용하는 경우 다음 코드도 추가해야 합니다:

```swift title="AppDelegate.swift"
func application(
  _ application: UIApplication,
  continue userActivity: NSUserActivity,
  restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    return RCTLinkingManager.application(
      application,
      continue: userActivity,
      restorationHandler: restorationHandler
    )
  }
```

</TabItem>
</Tabs>

:::

</TabItem>
</Tabs>

### 딥 링크 처리하기

앱을 여는 URL을 처리하는 방법에는 두 가지가 있습니다.

#### 1. 앱이 이미 열려 있는 경우, 앱이 포그라운드로 전환되고 Linking 'url' 이벤트가 발생합니다

`Linking.addEventListener('url', callback)`으로 이러한 이벤트를 처리할 수 있습니다. 링크된 URL과 함께 `callback({url})`을 호출합니다.

#### 2. 앱이 열려 있지 않은 경우, 앱이 열리고 url이 initialURL로 전달됩니다

`Linking.getInitialURL()`로 이러한 이벤트를 처리할 수 있습니다. URL이 있는 경우 해당 URL로 resolve되는 Promise를 반환합니다.

---

## 예시

### 링크 및 딥 링크(유니버설 링크) 열기

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=js
import {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

const supportedURL = 'https://google.com';

const unsupportedURL = 'slack://open?team=123456';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
      <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=tsx
import {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

const supportedURL = 'https://google.com';

const unsupportedURL = 'slack://open?team=123456';

type OpenURLButtonProps = {
  url: string;
  children: string;
};

const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
      <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

### 커스텀 설정 열기

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=js
import {useCallback} from 'react';
import {Button, Linking, StyleSheet, View} from 'react-native';

const OpenSettingsButton = ({children}) => {
  const handlePress = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <OpenSettingsButton>Open Settings</OpenSettingsButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=tsx
import {useCallback} from 'react';
import {Button, Linking, StyleSheet, View} from 'react-native';

type OpenSettingsButtonProps = {
  children: string;
};

const OpenSettingsButton = ({children}: OpenSettingsButtonProps) => {
  const handlePress = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <OpenSettingsButton>Open Settings</OpenSettingsButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

### 딥 링크 가져오기

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=js
import {useState, useEffect} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return {url, processing};
};

const App = () => {
  const {url: initialUrl, processing} = useInitialURL();

  return (
    <View style={styles.container}>
      <Text>
        {processing
          ? 'Processing the initial url from a deep link'
          : `The deep link is: ${initialUrl || 'None'}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=ios,android&ext=tsx
import {useState, useEffect} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';

const useInitialURL = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  }, []);

  return {url, processing};
};

const App = () => {
  const {url: initialUrl, processing} = useInitialURL();

  return (
    <View style={styles.container}>
      <Text>
        {processing
          ? 'Processing the initial url from a deep link'
          : `The deep link is: ${initialUrl || 'None'}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

### 인텐트 전송하기 (Android)

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Linking%20Example&supportedPlatforms=android&ext=js
import {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

const SendIntentButton = ({action, extras, children}) => {
  const handlePress = useCallback(async () => {
    try {
      await Linking.sendIntent(action, extras);
    } catch (e) {
      Alert.alert(e.message);
    }
  }, [action, extras]);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <SendIntentButton action="android.intent.action.POWER_USAGE_SUMMARY">
        Power Usage Summary
      </SendIntentButton>
      <SendIntentButton
        action="android.settings.APP_NOTIFICATION_SETTINGS"
        extras={[
          {
            key: 'android.provider.extra.APP_PACKAGE',
            value: 'com.facebook.katana',
          },
        ]}>
        App Notification Settings
      </SendIntentButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Linking%20Example&ext=tsx
import {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View} from 'react-native';

type SendIntentButtonProps = {
  action: string;
  children: string;
  extras?: Array<{
    key: string;
    value: string | number | boolean;
  }>;
};

const SendIntentButton = ({
  action,
  extras,
  children,
}: SendIntentButtonProps) => {
  const handlePress = useCallback(async () => {
    try {
      await Linking.sendIntent(action, extras);
    } catch (e: any) {
      Alert.alert(e.message);
    }
  }, [action, extras]);

  return <Button title={children} onPress={handlePress} />;
};

const App = () => {
  return (
    <View style={styles.container}>
      <SendIntentButton action="android.intent.action.POWER_USAGE_SUMMARY">
        Power Usage Summary
      </SendIntentButton>
      <SendIntentButton
        action="android.settings.APP_NOTIFICATION_SETTINGS"
        extras={[
          {
            key: 'android.provider.extra.APP_PACKAGE',
            value: 'com.facebook.katana',
          },
        ]}>
        App Notification Settings
      </SendIntentButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

</TabItem>
</Tabs>

# 레퍼런스

## 메서드

### `addEventListener()`

```tsx
static addEventListener(
  type: 'url',
  handler: (event: {url: string}) => void,
): EmitterSubscription;
```

`url` 이벤트 타입을 수신하고 핸들러를 제공하여 Linking 변경사항에 대한 핸들러를 추가합니다.

---

### `canOpenURL()`

```tsx
static canOpenURL(url: string): Promise<boolean>;
```

설치된 앱이 주어진 URL을 처리할 수 있는지 여부를 확인합니다.

이 메서드는 `Promise` 객체를 반환합니다. 주어진 URL을 처리할 수 있는지 여부가 결정되면 promise가 resolve되고, 첫 번째 파라미터는 열 수 있는지 여부입니다.

Android에서 URL을 열 수 있는지 확인하는 것이 불가능하거나, Android 11(SDK 30)을 대상으로 할 때 `AndroidManifest.xml`에 관련 인텐트 쿼리를 지정하지 않은 경우 `Promise`는 reject됩니다. iOS에서도 마찬가지로, `Info.plist`의 `LSApplicationQueriesSchemes` 키에 특정 스킴을 추가하지 않은 경우 promise가 reject됩니다(아래 참조).

**파라미터:**

| 이름                                                     | 타입   | 설명             |
| -------------------------------------------------------- | ------ | ---------------- |
| url <div className="label basic required">Required</div> | string | 열 URL입니다.    |

:::note
웹 URL의 경우 프로토콜(`"http://"`, `"https://"`)을 반드시 올바르게 설정해야 합니다!
:::

:::warning
이 메서드는 iOS 9+에서 제한이 있습니다. [Apple 공식 문서](https://developer.apple.com/documentation/uikit/uiapplication/1622952-canopenurl)에 따르면:

- 앱이 이전 iOS 버전에 연결되어 있지만 iOS 9.0 이상에서 실행 중인 경우 이 메서드를 최대 50번 호출할 수 있습니다. 해당 한도에 도달하면 이후 호출은 항상 `false`로 resolve됩니다. 사용자가 앱을 재설치하거나 업그레이드하면 iOS가 한도를 초기화합니다.
- iOS 9부터는 앱에서 `Info.plist`에 `LSApplicationQueriesSchemes` 키를 제공해야 하며, 그렇지 않으면 `canOpenURL()`이 항상 `false`로 resolve됩니다.
  :::

:::info
Android 11(SDK 30)을 대상으로 할 때 `AndroidManifest.xml`에서 처리하려는 스킴에 대한 인텐트를 지정해야 합니다. 일반적인 인텐트 목록은 [여기](https://developer.android.com/guide/components/intents-common)에서 찾을 수 있습니다.

예를 들어 `https` 스킴을 처리하려면 매니페스트에 다음을 추가해야 합니다:

```
<manifest ...>
  <queries>
    <intent>
      <action android:name="android.intent.action.VIEW" />
      <data android:scheme="https"/>
    </intent>
  </queries>
</manifest>
```

:::

---

### `getInitialURL()`

```tsx
static getInitialURL(): Promise<string | null>;
```

앱 실행이 앱 링크에 의해 트리거된 경우 링크 URL을 반환하고, 그렇지 않으면 `null`을 반환합니다.

:::info
Android에서 딥 링크를 지원하려면 https://developer.android.com/training/app-indexing/deep-linking.html#handling-intents 를 참조하세요.
:::

:::tip
Remote JS 디버깅이 활성화되어 있을 때 `getInitialURL`이 `null`을 반환할 수 있습니다. 올바르게 전달되도록 디버거를 비활성화하세요.
:::

---

### `openSettings()`

```tsx
static openSettings(): Promise<void>;
```

설정 앱을 열고 앱의 커스텀 설정이 있는 경우 표시합니다.

---

### `openURL()`

```tsx
static openURL(url: string): Promise<any>;
```

설치된 앱 중 하나로 주어진 `url`을 열려고 시도합니다.

위치(예: Android의 경우 "geo:37.484847,-122.148386", iOS의 경우 "https://maps.apple.com/?ll=37.484847,-122.148386"), 연락처 또는 설치된 앱으로 열 수 있는 다른 URL을 사용할 수도 있습니다.

이 메서드는 `Promise` 객체를 반환합니다. 사용자가 열기 대화상자를 확인하거나 URL이 자동으로 열리면 promise가 resolve됩니다. 사용자가 열기 대화상자를 취소하거나 URL에 등록된 애플리케이션이 없으면 promise가 reject됩니다.

**파라미터:**

| 이름                                                     | 타입   | 설명             |
| -------------------------------------------------------- | ------ | ---------------- |
| url <div className="label basic required">Required</div> | string | 열 URL입니다.    |

:::note
시스템이 지정된 URL을 여는 방법을 알 수 없는 경우 이 메서드가 실패합니다. http(s)가 아닌 URL을 전달하는 경우 먼저 `canOpenURL()`을 확인하는 것이 좋습니다. 웹 URL의 경우 프로토콜(`"http://"`, `"https://"`)을 반드시 올바르게 설정해야 합니다!
:::

:::warning
이 메서드는 시뮬레이터에서 다르게 동작할 수 있습니다. 예를 들어 iOS 시뮬레이터에서는 다이얼러 앱에 접근할 수 없으므로 `"tel:"` 링크를 처리할 수 없습니다.
:::

---

### `sendIntent()` <div className="label android">Android</div>

```tsx
static sendIntent(
  action: string,
  extras?: Array<{key: string; value: string | number | boolean}>,
): Promise<void>;
```

extras와 함께 Android 인텐트를 실행합니다.

**파라미터:**

| 이름                                                        | 타입                                                       |
| ----------------------------------------------------------- | ---------------------------------------------------------- |
| action <div className="label basic required">Required</div> | string                                                     |
| extras                                                      | `Array<{key: string, value: string ｜ number ｜ boolean}>` |
