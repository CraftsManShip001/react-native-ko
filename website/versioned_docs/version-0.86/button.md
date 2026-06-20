---
id: button
title: Button
---

모든 플랫폼에서 멋지게 렌더링되는 기본 버튼 컴포넌트입니다. 최소한의 커스터마이징을 지원합니다.

이 버튼이 앱에 맞지 않는다면, [Pressable](pressable)을 사용해 직접 버튼을 만들 수 있습니다. 참고로 [Button 컴포넌트의 소스 코드](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/Button.js)를 살펴보세요.

```tsx
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

## 예시

```SnackPlayer name=Button%20Example&ext=js
import {StyleSheet, Button, View, Text, Alert, Platform} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Separator = () => <View style={styles.separator} />;

function showAlert(message) {
  if (Platform.OS === 'web') {
    window.alert(message);
  } else {
    Alert.alert(message);
  }
}

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          The title and onPress handler are required. It is recommended to set
          accessibilityLabel to help make your app usable by everyone.
        </Text>
        <Button
          title="Press me"
          onPress={() => showAlert('Simple Button pressed')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          Adjust the color in a way that looks standard on each platform. On
          iOS, the color prop controls the color of the text. On Android, the
          color adjusts the background color of the button.
        </Text>
        <Button
          title="Press me"
          color="#f194ff"
          onPress={() => showAlert('Button with adjusted color pressed')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          All interaction for the component are disabled.
        </Text>
        <Button
          title="Press me"
          disabled
          onPress={() => showAlert('Cannot press this one')}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          This layout strategy lets the title define the width of the button.
        </Text>
        <View style={styles.fixToText}>
          <Button
            title="Left button"
            onPress={() => showAlert('Left button pressed')}
          />
          <Button
            title="Right button"
            onPress={() => showAlert('Right button pressed')}
          />
        </View>
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
```

---

# 레퍼런스

## Props

### <div className="label required basic">Required</div>**`onPress`**

사용자가 버튼을 탭할 때 호출되는 핸들러입니다.

| Type                                           |
| ---------------------------------------------- |
| `md ({nativeEvent: [PressEvent](pressevent)})` |

---

### <div className="label required basic">Required</div>**`title`**

버튼 내부에 표시할 텍스트입니다. Android에서는 주어진 title이 대문자로 변환됩니다.

| Type   |
| ------ |
| string |

---

### `accessibilityLabel`

시각 장애인 접근성 기능을 위해 표시할 텍스트입니다.

| Type   |
| ------ |
| string |

---

### `accessibilityLanguage` <div className="label ios">iOS</div>

사용자가 요소와 상호작용할 때 스크린 리더가 사용해야 하는 언어를 나타내는 값입니다. [BCP 47 규격](https://www.rfc-editor.org/info/bcp47)을 따라야 합니다.

자세한 내용은 [iOS `accessibilityLanguage` 문서](https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage)를 참조하세요.

| Type   |
| ------ |
| string |

---

### `accessibilityActions`

접근성 액션을 사용하면 보조 기술이 프로그래밍 방식으로 컴포넌트의 액션을 호출할 수 있습니다. `accessibilityActions` 속성에는 액션 객체 목록이 포함되어야 합니다. 각 액션 객체는 name과 label 필드를 포함해야 합니다.

자세한 내용은 [접근성 가이드](accessibility.md#접근성-액션)를 참조하세요.

| Type  | Required |
| ----- | -------- |
| array | No       |

---

### `onAccessibilityAction`

사용자가 접근성 액션을 수행할 때 호출됩니다. 이 함수의 유일한 인수는 수행할 액션의 이름을 포함하는 이벤트입니다.

자세한 내용은 [접근성 가이드](accessibility.md#접근성-액션)를 참조하세요.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `color`

텍스트의 색상(iOS), 또는 버튼의 배경 색상(Android)입니다.

```mdx-code-block
export function ColorDefaults() {
  return (
    <>
      <ins style={{ background: "#2196F3" }} className="color-box" />{" "}<code>'#2196F3'</code>
      {" "}<div className="label android">Android</div>
      <hr />
      <ins style={{ background: "#007AFF" }} className="color-box" />{" "}<code>'#007AFF'</code>
      {" "}<div className="label ios">iOS</div>
    </>
  );
}
```

| Type            | Default          |
| --------------- | ---------------- |
| [color](colors) | <ColorDefaults/> |

---

### `disabled`

`true`이면 이 컴포넌트의 모든 상호작용을 비활성화합니다.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `hasTVPreferredFocus` <div className="label tv">TV</div>

TV 우선 포커스입니다.

| Type | Default |
| ---- | ------- |
| bool | `false` |

---

### `nextFocusDown` <div className="label android">Android</div><div className="label tv">TV</div>

사용자가 아래쪽으로 탐색할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusDown)를 참조하세요.

| Type   |
| ------ |
| number |

---

### `nextFocusForward` <div className="label android">Android</div><div className="label tv">TV</div>

사용자가 앞쪽으로 탐색할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusForward)를 참조하세요.

| Type   |
| ------ |
| number |

---

### `nextFocusLeft` <div className="label android">Android</div><div className="label tv">TV</div>

사용자가 왼쪽으로 탐색할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusLeft)를 참조하세요.

| Type   |
| ------ |
| number |

---

### `nextFocusRight` <div className="label android">Android</div><div className="label tv">TV</div>

사용자가 오른쪽으로 탐색할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusRight)를 참조하세요.

| Type   |
| ------ |
| number |

---

### `nextFocusUp` <div className="label android">Android</div><div className="label tv">TV</div>

사용자가 위쪽으로 탐색할 때 포커스를 받을 다음 뷰를 지정합니다. [Android 문서](https://developer.android.com/reference/android/view/View.html#attr_android:nextFocusUp)를 참조하세요.

| Type   |
| ------ |
| number |

---

### `testID`

엔드-투-엔드 테스트에서 이 뷰를 찾는 데 사용됩니다.

| Type   |
| ------ |
| string |

---

### `touchSoundDisabled` <div className="label android">Android</div>

`true`이면 터치 시 시스템 사운드를 재생하지 않습니다.

| Type    | Default |
| ------- | ------- |
| boolean | `false` |
