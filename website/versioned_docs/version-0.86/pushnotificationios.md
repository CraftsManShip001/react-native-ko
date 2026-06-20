---
id: pushnotificationios
title: '🗑️ PushNotificationIOS'
---

:::warning Deprecated
대신 [커뮤니티 패키지](https://reactnative.directory/?search=notification) 중 하나를 사용하세요.
:::

<div className="banner-native-code-required">
  <h3>Projects with Native Code Only</h3>
  <p>The following section only applies to projects with native code exposed. If you are using the managed Expo workflow, see the guide on <a href="https://docs.expo.dev/versions/latest/sdk/notifications/">Notifications</a> in the Expo documentation for the appropriate alternative.</p>
</div>

알림 예약 및 권한 관리를 포함하여 앱의 알림을 처리합니다.

---

## 시작하기

푸시 알림을 활성화하려면, [Apple에서 알림을 구성](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server)하고 서버 측 시스템을 설정하세요.

그런 다음 프로젝트에서 [원격 알림을 활성화](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app#2980038)하세요. 이 작업을 통해 필요한 설정이 자동으로 활성화됩니다.

### `register` 이벤트 지원 활성화

`AppDelegate.m`에 다음을 추가하세요:

```objectivec
#import <React/RCTPushNotificationManager.h>
```

그런 다음 원격 알림 등록 이벤트를 처리하기 위해 아래 코드를 구현하세요:

```objectivec
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 // This will trigger 'register' events on PushNotificationIOS
 [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 // This will trigger 'registrationError' events on PushNotificationIOS
 [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
}
```

### 알림 처리

`AppDelegate`에서 `UNUserNotificationCenterDelegate`를 구현해야 합니다:

```objectivec
#import <UserNotifications/UserNotifications.h>

@interface YourAppDelegate () <UNUserNotificationCenterDelegate>
@end
```

앱 실행 시 delegate를 설정하세요:

```objectivec
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  ...
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

  return YES;
}
```

#### 포그라운드 알림

앱이 포그라운드 상태일 때 수신되는 알림을 처리하려면 `userNotificationCenter:willPresentNotification:withCompletionHandler:`를 구현하세요. completionHandler를 사용하여 알림을 사용자에게 표시할지 결정하고 이에 따라 `RCTPushNotificationManager`에 알립니다:

```objectivec
// Called when a notification is delivered to a foreground app.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS
  [RCTPushNotificationManager didReceiveNotification:notification];
  // Decide if and how the notification will be shown to the user
  completionHandler(UNNotificationPresentationOptionNone);
}
```

#### 백그라운드 알림

알림이 탭되었을 때를 처리하려면 `userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:`를 구현하세요. 일반적으로 사용자가 탭하여 앱을 열 때 백그라운드 알림에 대해 호출됩니다. 단, `userNotificationCenter:willPresentNotification:withCompletionHandler:`에서 포그라운드 알림을 표시하도록 설정한 경우, 이 메서드는 포그라운드 알림이 탭될 때도 호출됩니다. 이 경우 두 콜백 중 하나에서만 `RCTPushNotificationManager`에 알려야 합니다.

탭된 알림으로 인해 앱이 실행된 경우 `setInitialNotification:`을 호출하세요. 알림이 `userNotificationCenter:willPresentNotification:withCompletionHandler:`에서 이미 처리되지 않은 경우 `didReceiveNotification:`도 함께 호출하세요:

```objectivec
- (void)  userNotificationCenter:(UNUserNotificationCenter *)center
  didReceiveNotificationResponse:(UNNotificationResponse *)response
           withCompletionHandler:(void (^)(void))completionHandler
{
  // This condition passes if the notification was tapped to launch the app
  if ([response.actionIdentifier isEqualToString:UNNotificationDefaultActionIdentifier]) {
    // Allow the notification to be retrieved on the JS side using getInitialNotification()
    [RCTPushNotificationManager setInitialNotification:response.notification];
  }
  // This will trigger 'notification' and 'localNotification' events on PushNotificationIOS
  [RCTPushNotificationManager didReceiveNotification:response.notification];
  completionHandler();
}
```

---

# Reference

## Methods

### `presentLocalNotification()`

```tsx
static presentLocalNotification(details: PresentLocalNotificationDetails);
```

즉시 표시할 로컬 알림을 예약합니다.

**매개변수:**

| Name    | Type   | Required | Description    |
| ------- | ------ | -------- | -------------- |
| details | object | Yes      | 아래 참고하세요. |

`details`는 다음을 포함하는 객체입니다:

- `alertTitle` : 알림 경고의 제목으로 표시되는 텍스트입니다.
- `alertBody` : 알림 경고에 표시되는 메시지입니다.
- `userInfo` : 추가 알림 데이터를 포함하는 객체입니다(선택).
- `category` : 이 알림의 카테고리로, 액션 가능한 알림에 필요합니다(선택). 예: 답글 또는 좋아요와 같은 추가 액션이 있는 알림.
- `applicationIconBadgeNumber` 앱 아이콘에 표시할 숫자입니다. 이 속성의 기본값은 0이며, 이는 배지가 표시되지 않음을 의미합니다(선택).
- `isSilent` : true이면 알림이 소리 없이 표시됩니다(선택).
- `soundName` : 알림이 발생할 때 재생되는 소리입니다(선택).
- `alertAction` : DEPRECATED. iOS의 레거시 UILocalNotification에 사용되었습니다.

---

### `scheduleLocalNotification()`

```tsx
static scheduleLocalNotification(details: ScheduleLocalNotificationDetails);
```

나중에 표시할 로컬 알림을 예약합니다.

**매개변수:**

| Name    | Type   | Required | Description    |
| ------- | ------ | -------- | -------------- |
| details | object | Yes      | 아래 참고하세요. |

`details`는 다음을 포함하는 객체입니다:

- `alertTitle` : 알림 경고의 제목으로 표시되는 텍스트입니다.
- `alertBody` : 알림 경고에 표시되는 메시지입니다.
- `fireDate` : 알림이 발생할 시점입니다. `fireDate` 또는 `fireIntervalSeconds`를 사용하여 알림을 예약하되, `fireDate`가 우선합니다.
- `fireIntervalSeconds` : 지금으로부터 알림을 표시할 초 단위 시간입니다.
- `userInfo` : 추가 알림 데이터를 포함하는 객체입니다(선택).
- `category` : 이 알림의 카테고리로, 액션 가능한 알림에 필요합니다(선택). 예: 답글 또는 좋아요와 같은 추가 액션이 있는 알림.
- `applicationIconBadgeNumber` 앱 아이콘에 표시할 숫자입니다. 이 속성의 기본값은 0이며, 이는 배지가 표시되지 않음을 의미합니다(선택).
- `isSilent` : true이면 알림이 소리 없이 표시됩니다(선택).
- `soundName` : 알림이 발생할 때 재생되는 소리입니다(선택).
- `alertAction` : DEPRECATED. iOS의 레거시 UILocalNotification에 사용되었습니다.
- `repeatInterval` : DEPRECATED. 대신 `fireDate` 또는 `fireIntervalSeconds`를 사용하세요.

---

### `cancelAllLocalNotifications()`

```tsx
static cancelAllLocalNotifications();
```

예약된 모든 로컬 알림을 취소합니다.

---

### `removeAllDeliveredNotifications()`

```tsx
static removeAllDeliveredNotifications();
```

알림 센터에서 전달된 모든 알림을 제거합니다.

---

### `getDeliveredNotifications()`

```tsx
static getDeliveredNotifications(callback: (notifications: Object[]) => void);
```

현재 알림 센터에 표시되어 있는 앱 알림 목록을 제공합니다.

**매개변수:**

| Name     | Type     | Required | Description                                    |
| -------- | -------- | -------- | ---------------------------------------------- |
| callback | function | Yes      | 전달된 알림의 배열을 수신하는 함수입니다. |

전달된 알림은 다음을 포함하는 객체입니다:

- `identifier` : 이 알림의 식별자입니다.
- `title` : 이 알림의 제목입니다.
- `body` : 이 알림의 본문입니다.
- `category` : 이 알림의 카테고리입니다(선택).
- `userInfo` : 추가 알림 데이터를 포함하는 객체입니다(선택).
- `thread-id` : 이 알림의 스레드 식별자입니다(있는 경우).

---

### `removeDeliveredNotifications()`

```tsx
static removeDeliveredNotifications(identifiers: string[]);
```

알림 센터에서 지정된 알림을 제거합니다.

**매개변수:**

| Name        | Type  | Required | Description                  |
| ----------- | ----- | -------- | ---------------------------- |
| identifiers | array | Yes      | 알림 식별자의 배열입니다. |

---

### `setApplicationIconBadgeNumber()`

```tsx
static setApplicationIconBadgeNumber(num: number);
```

홈 화면에 있는 앱 아이콘의 배지 숫자를 설정합니다.

**매개변수:**

| Name   | Type   | Required | Description              |
| ------ | ------ | -------- | ------------------------ |
| number | number | Yes      | 앱 아이콘의 배지 숫자입니다. |

---

### `getApplicationIconBadgeNumber()`

```tsx
static getApplicationIconBadgeNumber(callback: (num: number) => void);
```

홈 화면에 있는 앱 아이콘의 현재 배지 숫자를 가져옵니다.

**매개변수:**

| Name     | Type     | Required | Description                              |
| -------- | -------- | -------- | ---------------------------------------- |
| callback | function | Yes      | 현재 배지 숫자를 처리하는 함수입니다. |

---

### `cancelLocalNotifications()`

```tsx
static cancelLocalNotifications(userInfo: Object);
```

제공된 `userInfo`의 필드와 일치하는 예약된 로컬 알림을 모두 취소합니다.

**매개변수:**

| Name     | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| userInfo | object | No       |             |

---

### `getScheduledLocalNotifications()`

```tsx
static getScheduledLocalNotifications(
  callback: (notifications: ScheduleLocalNotificationDetails[]) => void,
);
```

현재 예약된 로컬 알림 목록을 가져옵니다.

**매개변수:**

| Name     | Type     | Required | Description                                                      |
| -------- | -------- | -------- | ---------------------------------------------------------------- |
| callback | function | Yes      | 로컬 알림을 설명하는 객체의 배열을 처리하는 함수입니다. |

---

### `addEventListener()`

```tsx
static addEventListener(
  type: PushNotificationEventName,
  handler:
    | ((notification: PushNotification) => void)
    | ((deviceToken: string) => void)
    | ((error: {message: string; code: number; details: any}) => void),
);
```

로컬 알림, 원격 알림 및 알림 등록 결과를 포함한 알림 이벤트에 리스너를 연결합니다.

**매개변수:**

| Name    | Type     | Required | Description                             |
| ------- | -------- | -------- | --------------------------------------- |
| type    | string   | Yes      | 수신할 이벤트 유형입니다. 아래 참고하세요. |
| handler | function | Yes      | 리스너입니다.                            |

유효한 이벤트 유형은 다음과 같습니다:

- `notification` : 원격 알림이 수신될 때 발생합니다. 핸들러는 `PushNotificationIOS` 인스턴스와 함께 호출됩니다. 포그라운드에서 수신된 알림이나 백그라운드에서 탭하여 앱을 열 때의 알림을 처리합니다.
- `localNotification` : 로컬 알림이 수신될 때 발생합니다. 핸들러는 `PushNotificationIOS` 인스턴스와 함께 호출됩니다. 포그라운드에서 수신된 알림이나 백그라운드에서 탭하여 앱을 열 때의 알림을 처리합니다.
- `register`: 사용자가 원격 알림 등록에 성공할 때 발생합니다. 핸들러는 deviceToken을 나타내는 16진수 문자열과 함께 호출됩니다.
- `registrationError`: 사용자가 원격 알림 등록에 실패할 때 발생합니다. 일반적으로 APNS 문제나 기기가 시뮬레이터인 경우 발생합니다. 핸들러는 `{message: string, code: number, details: any}`와 함께 호출됩니다.

---

### `removeEventListener()`

```tsx
static removeEventListener(
  type: PushNotificationEventName,
);
```

이벤트 리스너를 제거합니다. 메모리 누수를 방지하기 위해 `componentWillUnmount`에서 호출하세요.

**매개변수:**

| Name | Type   | Required | Description                                         |
| ---- | ------ | -------- | --------------------------------------------------- |
| type | string | Yes      | 이벤트 유형입니다. 옵션은 `addEventListener()`를 참고하세요. |

---

### `requestPermissions()`

```tsx
static requestPermissions(permissions?: PushNotificationPermissions[]);
```

iOS에 알림 권한을 요청하여 사용자에게 다이얼로그 박스를 표시합니다. 기본적으로 모든 알림 권한을 요청하지만, 선택적으로 요청할 권한을 지정할 수 있습니다. 지원되는 권한은 다음과 같습니다:

- `alert`
- `badge`
- `sound`

메서드에 맵이 제공되면 truthy 값을 가진 권한만 요청됩니다.

이 메서드는 사용자가 요청을 수락하거나 거부하거나, 권한이 이전에 거부된 경우 resolve되는 Promise를 반환합니다. Promise는 요청이 완료된 후 권한 상태로 resolve됩니다.

**매개변수:**

| Name        | Type  | Required | Description            |
| ----------- | ----- | -------- | ---------------------- |
| permissions | array | No       | alert, badge, 또는 sound |

---

### `abandonPermissions()`

```tsx
static abandonPermissions();
```

Apple Push Notification service를 통해 수신되는 모든 원격 알림의 등록을 해제합니다.

이 메서드는 앱의 새 버전에서 모든 유형의 원격 알림 지원이 제거되는 경우와 같은 드문 상황에서만 호출해야 합니다. 사용자는 설정 앱을 통해 앱의 원격 알림 수신을 일시적으로 차단할 수 있습니다. 이 메서드로 등록 해제된 앱은 언제든지 다시 등록할 수 있습니다.

---

### `checkPermissions()`

```tsx
static checkPermissions(
  callback: (permissions: PushNotificationPermissions) => void,
);
```

현재 활성화된 푸시 권한을 확인합니다.

**매개변수:**

| Name     | Type     | Required | Description    |
| -------- | -------- | -------- | -------------- |
| callback | function | Yes      | 아래 참고하세요. |

`callback`은 `permissions` 객체와 함께 호출됩니다:

- `alert: boolean`
- `badge: boolean`
- `sound: boolean`

---

### `getInitialNotification()`

```tsx
static getInitialNotification(): Promise<PushNotification | null>;
```

이 메서드는 Promise를 반환합니다. 앱이 푸시 알림으로 실행된 경우, 이 Promise는 탭된 알림에 대한 `PushNotificationIOS` 유형의 객체로 resolve됩니다. 그렇지 않으면 `null`로 resolve됩니다.

---

### `getAuthorizationStatus()`

```tsx
static getAuthorizationStatus(): Promise<number>;
```

이 메서드는 현재 알림 인증 상태로 resolve되는 Promise를 반환합니다. 가능한 값은 [UNAuthorizationStatus](https://developer.apple.com/documentation/usernotifications/unauthorizationstatus?language=objc)를 참고하세요.

---

### `finish()`

```tsx
finish(result: string);
```

이 메서드는 [`application:didReceiveRemoteNotification:fetchCompletionHandler:`](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application?language=objc)를 통해 수신된 원격 알림에 사용할 수 있습니다. 단, 이 메서드는 `UNUserNotificationCenterDelegate`로 대체되었으며, `application:didReceiveRemoteNotification:fetchCompletionHandler:`와 `UNUserNotificationCenterDelegate`의 새로운 핸들러가 모두 구현된 경우 더 이상 호출되지 않습니다.

어떤 이유로 아직 `application:didReceiveRemoteNotification:fetchCompletionHandler:`에 의존하고 있다면, iOS 측에서 이벤트 처리를 설정해야 합니다:

```objectivec
- (void)           application:(UIApplication *)application
  didReceiveRemoteNotification:(NSDictionary *)userInfo
        fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))handler
{
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:handler];
}
```

JS 측에서 알림 처리가 완료되면 `finish()`를 호출하여 네이티브 완료 핸들러를 실행하세요. 이 블록을 호출할 때 작업 결과를 가장 잘 설명하는 fetch result 값을 전달하세요. 가능한 값 목록은 `PushNotificationIOS.FetchResult`를 참고하세요.

`application:didReceiveRemoteNotification:fetchCompletionHandler:`를 사용하는 경우, 이 핸들러를 _반드시_ 호출해야 하며 가능한 한 빨리 호출해야 합니다. 자세한 내용은 [공식 문서](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application?language=objc)를 참고하세요.

---

### `getMessage()`

```tsx
getMessage(): string | Object;
```

알림의 주요 메시지 문자열을 가져오는 `getAlert`의 별칭입니다.

---

### `getSound()`

```tsx
getSound(): string;
```

`aps` 객체에서 사운드 문자열을 가져옵니다. 로컬 알림의 경우 `null`입니다.

---

### `getCategory()`

```tsx
getCategory(): string;
```

`aps` 객체에서 카테고리 문자열을 가져옵니다.

---

### `getAlert()`

```tsx
getAlert(): string | Object;
```

`aps` 객체에서 알림의 주요 메시지를 가져옵니다. 별칭 `getMessage()`도 참고하세요.

---

### `getContentAvailable()`

```tsx
getContentAvailable(): number;
```

`aps` 객체에서 content-available 숫자를 가져옵니다.

---

### `getBadgeCount()`

```tsx
getBadgeCount(): number;
```

`aps` 객체에서 배지 카운트 숫자를 가져옵니다.

---

### `getData()`

```tsx
getData(): Object;
```

알림의 데이터 객체를 가져옵니다.

---

### `getThreadID()`

```tsx
getThreadID();
```

알림의 스레드 ID를 가져옵니다.
