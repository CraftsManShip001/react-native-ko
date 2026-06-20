---
id: share
title: Share
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 예시

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Example&supportedPlatforms=ios,android&ext=js
import {Alert, Share, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Button onPress={onShare} title="Share" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ShareExample;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Example&supportedPlatforms=ios,android&ext=tsx
import {Alert, Share, Button} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Button onPress={onShare} title="Share" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ShareExample;
```

</TabItem>
</Tabs>

# 레퍼런스

## 메서드

### `share()`

```tsx
static share(content: ShareContent, options?: ShareOptions);
```

텍스트 콘텐츠를 공유하기 위한 다이얼로그를 엽니다.

iOS에서는 `action`과 `activityType`을 포함하는 객체로 이행(resolve)되는 Promise를 반환합니다. 사용자가 다이얼로그를 닫은 경우에도 Promise는 `action`이 `Share.dismissedAction`이고 나머지 키는 undefined인 상태로 이행됩니다. 일부 공유 옵션은 iOS 시뮬레이터에서 표시되지 않거나 작동하지 않을 수 있습니다.

Android에서는 항상 `action`이 `Share.sharedAction`인 상태로 이행되는 Promise를 반환합니다.

**속성:**

| Name                                                         | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| content <div className="label basic required">Required</div> | object | `message` - 공유할 메시지<br/>`url` - 공유할 URL <div className="label ios">iOS</div><br/>`title` - 메시지 제목 <div className="label android">Android</div><hr/>`url`과 `message` 중 하나 이상이 필수입니다.                                                                                                                                                          |
| options                                                      | object | `dialogTitle` <div className="label android">Android</div><br/>`excludedActivityTypes` <div className="label ios">iOS</div><br/>`subject` - 이메일로 공유할 제목 <div className="label ios">iOS</div><br/>`tintColor` <div className="label ios">iOS</div><br/>`anchor` - 액션 시트가 고정될 노드 (iPad에서 사용) <div className="label ios">iOS</div> |

---

## 속성

### `sharedAction`

```tsx
static sharedAction: 'sharedAction';
```

콘텐츠가 성공적으로 공유되었습니다.

---

### `dismissedAction` <div className="label ios">iOS</div>

```tsx
static dismissedAction: 'dismissedAction';
```

다이얼로그가 닫혔습니다.
