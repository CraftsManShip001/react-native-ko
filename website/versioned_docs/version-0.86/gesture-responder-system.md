---
id: gesture-responder-system
title: Gesture Responder System
---

제스처 리스폰더 시스템은 앱에서 제스처의 생명주기를 관리합니다. 앱이 사용자의 의도를 파악하는 동안 터치는 여러 단계를 거칠 수 있습니다. 예를 들어, 앱은 터치가 스크롤인지, 위젯을 슬라이드하는 것인지, 아니면 탭인지를 판단해야 합니다. 이는 터치가 지속되는 동안에도 변경될 수 있습니다. 또한 여러 터치가 동시에 발생할 수도 있습니다.

터치 리스폰더 시스템은 컴포넌트가 부모 또는 자식 컴포넌트에 대한 추가적인 지식 없이도 이러한 터치 상호작용을 협상할 수 있도록 하기 위해 필요합니다.

### 모범 사례

앱이 훌륭한 느낌을 주려면, 모든 동작이 다음 속성을 가져야 합니다:

- 피드백/하이라이트 — 사용자가 터치를 처리 중인 대상과 제스처를 놓았을 때 일어날 일을 보여줍니다.
- 취소 가능성 — 동작을 수행하는 중에 사용자가 손가락을 드래그해 터치 도중에 동작을 중단할 수 있어야 합니다.

이러한 기능은 실수에 대한 두려움 없이 자유롭게 실험하고 상호작용할 수 있도록 해주기 때문에 사용자가 앱을 사용하는 동안 더 편안함을 느끼게 합니다.

### TouchableHighlight와 Touchable\*

리스폰더 시스템은 사용하기 복잡할 수 있습니다. 그래서 "탭 가능한" 것들을 위한 추상화된 `Touchable` 구현을 제공합니다. 이는 리스폰더 시스템을 사용하며 탭 상호작용을 선언적으로 구성할 수 있게 해줍니다. 웹에서 버튼이나 링크를 사용할 곳이라면 어디든 `TouchableHighlight`를 사용하세요.

## Responder Lifecycle

뷰는 올바른 협상 메서드를 구현하여 터치 리스폰더가 될 수 있습니다. 뷰가 리스폰더가 되길 원하는지 묻는 두 가지 메서드가 있습니다:

- `View.props.onStartShouldSetResponder: evt => true,` — 이 뷰가 터치 시작 시 리스폰더가 되길 원합니까?
- `View.props.onMoveShouldSetResponder: evt => true,` — 이 뷰가 리스폰더가 아닐 때 View에서 모든 터치 이동 시 호출됩니다: 이 뷰가 터치 응답성을 "가져가길" 원합니까?

View가 true를 반환하고 리스폰더가 되려고 시도하면 다음 중 하나가 발생합니다:

- `View.props.onResponderGrant: evt => {}` — View가 이제 터치 이벤트에 응답하고 있습니다. 사용자에게 무슨 일이 일어나고 있는지 하이라이트하고 보여줄 시간입니다.
- `View.props.onResponderReject: evt => {}` — 지금 다른 무언가가 리스폰더이며 해제하지 않습니다.

뷰가 응답 중인 경우 다음 핸들러가 호출될 수 있습니다:

- `View.props.onResponderMove: evt => {}` — 사용자가 손가락을 움직이고 있습니다.
- `View.props.onResponderRelease: evt => {}` — 터치가 끝날 때, 즉 "touchUp" 시 발생합니다.
- `View.props.onResponderTerminationRequest: evt => true` — 다른 무언가가 리스폰더가 되길 원합니다. 이 뷰가 리스폰더를 해제해야 합니까? true를 반환하면 해제를 허용합니다.
- `View.props.onResponderTerminate: evt => {}` — View에서 리스폰더가 가져갔습니다. `onResponderTerminationRequest` 호출 후 다른 뷰에 의해 가져갈 수도 있고, iOS에서 컨트롤 센터/알림 센터처럼 OS가 묻지 않고 가져갈 수도 있습니다.

`evt`는 다음 형태의 합성 터치 이벤트입니다:

- `nativeEvent`
  - `changedTouches` — 마지막 이벤트 이후 변경된 모든 터치 이벤트의 배열
  - `identifier` — 터치의 ID
  - `locationX` — 요소에 대한 상대적인 터치의 X 위치
  - `locationY` — 요소에 대한 상대적인 터치의 Y 위치
  - `pageX` — 루트 요소에 대한 상대적인 터치의 X 위치
  - `pageY` — 루트 요소에 대한 상대적인 터치의 Y 위치
  - `target` — 터치 이벤트를 받는 요소의 노드 ID
  - `timestamp` — 속도 계산에 유용한 터치의 시간 식별자
  - `touches` — 화면의 모든 현재 터치의 배열

### Capture ShouldSet 핸들러

`onStartShouldSetResponder`와 `onMoveShouldSetResponder`는 가장 깊은 노드가 먼저 호출되는 버블링 패턴으로 호출됩니다. 즉, 여러 View가 `*ShouldSetResponder` 핸들러에 대해 true를 반환하면 가장 깊은 컴포넌트가 리스폰더가 됩니다. 이는 모든 컨트롤과 버튼을 사용 가능하게 만들기 때문에 대부분의 경우 바람직합니다.

하지만 때로는 부모가 리스폰더가 되도록 만들고 싶을 수 있습니다. 이는 캡처 단계를 사용해 처리할 수 있습니다. 리스폰더 시스템이 가장 깊은 컴포넌트에서 버블링하기 전에, 캡처 단계를 수행하며 `on*ShouldSetResponderCapture`를 발생시킵니다. 따라서 부모 View가 터치 시작 시 자식 요소가 리스폰더가 되는 것을 막으려면, true를 반환하는 `onStartShouldSetResponderCapture` 핸들러를 가져야 합니다.

- `View.props.onStartShouldSetResponderCapture: evt => true,`
- `View.props.onMoveShouldSetResponderCapture: evt => true,`

### PanResponder

더 높은 수준의 제스처 해석을 위해서는 [PanResponder](panresponder.md)를 참고하세요.
