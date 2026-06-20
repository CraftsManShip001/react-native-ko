---
id: actionsheetios
title: ActionSheetIOS
---

iOS 네이티브 [Action Sheet](https://developer.apple.com/design/human-interface-guidelines/action-sheets) 컴포넌트를 표시합니다.

## 예시

```SnackPlayer name=ActionSheetIOS%20Example&supportedPlatforms=ios
import {useState} from 'react';
import {ActionSheetIOS, Button, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [result, setResult] = useState('🔮');

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Generate number', 'Reset'],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult(String(Math.floor(Math.random() * 100) + 1));
        } else if (buttonIndex === 2) {
          setResult('🔮');
        }
      },
    );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.result}>{result}</Text>
        <Button onPress={onPress} title="Show Action Sheet" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  result: {
    fontSize: 64,
    textAlign: 'center',
  },
});

export default App;
```

# 레퍼런스

## 메서드

### `showActionSheetWithOptions()`

```tsx
static showActionSheetWithOptions: (
  options: ActionSheetIOSOptions,
  callback: (buttonIndex: number) => void,
);
```

iOS 액션 시트를 표시합니다. `options` 객체는 다음 중 하나 이상을 포함해야 합니다:

- `options` (문자열 배열) - 버튼 제목 목록 (필수)
- `cancelButtonIndex` (int) - `options`에서 취소 버튼의 인덱스
- `cancelButtonTintColor` (string) - 취소 버튼의 텍스트 색상을 변경하는 데 사용되는 [색상](colors)
- `destructiveButtonIndex` (int 또는 int 배열) - `options`에서 파괴적 버튼의 인덱스
- `title` (string) - 액션 시트 상단에 표시할 제목
- `message` (string) - 제목 아래에 표시할 메시지
- `anchor` (number) - 액션 시트를 고정할 노드 (iPad에서 사용)
- `tintColor` (string) - 비파괴적 버튼 제목에 사용되는 [색상](colors)
- `disabledButtonIndices` (숫자 배열) - 비활성화할 버튼 인덱스 목록
- `userInterfaceStyle` (string) - 액션 시트에 사용되는 인터페이스 스타일로, `light` 또는 `dark`로 설정할 수 있으며, 설정하지 않으면 기본 시스템 스타일이 사용됩니다

'callback' 함수는 선택된 항목의 0 기반 인덱스를 파라미터로 받습니다.

최소 예시:

```tsx
ActionSheetIOS.showActionSheetWithOptions(
  {
    options: ['Cancel', 'Remove'],
    destructiveButtonIndex: 1,
    cancelButtonIndex: 0,
  },
  buttonIndex => {
    if (buttonIndex === 1) {
      /* destructive action */
    }
  },
);
```

---

### `dismissActionSheet()`

```tsx
static dismissActionSheet();
```

가장 위에 표시된 iOS 액션 시트를 닫습니다. 액션 시트가 없으면 경고가 표시됩니다.

---

### `showShareActionSheetWithOptions()`

```tsx
static showShareActionSheetWithOptions: (
  options: ShareActionSheetIOSOptions,
  failureCallback: (error: Error) => void,
  successCallback: (success: boolean, method: string) => void,
);
```

iOS 공유 시트를 표시합니다. `options` 객체는 `message`와 `url` 중 하나 또는 둘 다를 포함해야 하며, 추가적으로 `subject`나 `excludedActivityTypes`를 포함할 수 있습니다:

- `url` (string) - 공유할 URL
- `message` (string) - 공유할 메시지
- `subject` (string) - 메시지의 제목
- `excludedActivityTypes` (배열) - ActionSheet에서 제외할 활동들

:::note
`url`이 로컬 파일을 가리키거나 base64로 인코딩된 URI인 경우, 해당 파일이 로드되어 직접 공유됩니다. 이 방법으로 이미지, 동영상, PDF 파일 등을 공유할 수 있습니다. `url`이 원격 파일이나 주소를 가리키는 경우, [RFC 2396](https://www.ietf.org/rfc/rfc2396.txt)에 설명된 URL 형식을 따라야 합니다. 예를 들어, 적절한 프로토콜(HTTP/HTTPS) 없는 웹 URL은 공유되지 않습니다.
:::

'failureCallback' 함수는 오류 객체 하나를 파라미터로 받습니다. 이 객체에 정의된 유일한 속성은 `string` 타입의 선택적 `stack` 속성입니다.

'successCallback' 함수는 두 개의 파라미터를 받습니다:

- 성공 또는 실패를 나타내는 불리언 값
- 성공한 경우, 공유 방법을 나타내는 문자열
