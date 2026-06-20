---
id: height-and-width
title: 높이와 너비
---

컴포넌트의 높이와 너비는 화면에서의 크기를 결정합니다.

## 고정 치수

컴포넌트의 치수를 설정하는 일반적인 방법은 스타일에 고정된 `width`와 `height`를 추가하는 것입니다. React Native의 모든 치수는 단위가 없으며, 밀도 독립적 픽셀을 나타냅니다.

```SnackPlayer name=Height%20and%20Width
import {View} from 'react-native';

const FixedDimensionsBasics = () => {
  return (
    <View>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'powderblue',
        }}
      />
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'skyblue',
        }}
      />
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: 'steelblue',
        }}
      />
    </View>
  );
};

export default FixedDimensionsBasics;
```

이 방식으로 치수를 설정하는 것은 크기가 항상 특정 포인트 수로 고정되어야 하고 화면 크기에 따라 계산되지 않아야 하는 컴포넌트에서 일반적입니다.

:::caution
포인트에서 물리적 측정 단위로의 범용적인 매핑은 없습니다. 즉, 고정 치수를 가진 컴포넌트는 서로 다른 기기와 화면 크기에서 물리적 크기가 다를 수 있습니다. 하지만 대부분의 사용 사례에서는 이 차이를 느끼기 어렵습니다.
:::

## Flex 치수

컴포넌트의 스타일에 `flex`를 사용하면 컴포넌트가 사용 가능한 공간에 따라 동적으로 확장되거나 축소됩니다. 일반적으로 `flex: 1`을 사용하며, 이는 컴포넌트가 같은 부모를 가진 다른 컴포넌트와 공간을 균등하게 나누어 사용 가능한 모든 공간을 채우도록 합니다. `flex` 값이 클수록 형제 컴포넌트에 비해 더 많은 공간을 차지하게 됩니다.

:::info
컴포넌트는 부모의 치수가 `0`보다 큰 경우에만 사용 가능한 공간을 채울 수 있습니다. 부모에 고정된 `width`와 `height` 또는 `flex`가 없으면 부모의 치수는 `0`이 되며 `flex` 자식 컴포넌트는 보이지 않습니다.
:::

```SnackPlayer name=Flex%20Dimensions
import {View} from 'react-native';

const FlexDimensionsBasics = () => {
  return (
    // Try removing the `flex: 1` on the parent View.
    // The parent will not have dimensions, so the children can't expand.
    // What if you add `height: 300` instead of `flex: 1`?
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'powderblue'}} />
      <View style={{flex: 2, backgroundColor: 'skyblue'}} />
      <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    </View>
  );
};

export default FlexDimensionsBasics;
```

컴포넌트의 크기를 제어할 수 있게 되면, 다음 단계는 [화면에서 레이아웃을 배치하는 방법](flexbox.md)을 배우는 것입니다.

## 퍼센트 치수

화면의 특정 부분을 채우고 싶지만 `flex` 레이아웃을 _사용하고 싶지 않은_ 경우, 컴포넌트 스타일에 **퍼센트 값**을 사용할 수 _있습니다_. flex 치수와 마찬가지로 퍼센트 치수는 크기가 정의된 부모가 필요합니다.

```SnackPlayer name=Percentage%20Dimensions
import {View} from 'react-native';

const PercentageDimensionsBasics = () => {
  // Try removing the `height: '100%'` on the parent View.
  // The parent will not have dimensions, so the children can't expand.
  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          height: '15%',
          backgroundColor: 'powderblue',
        }}
      />
      <View
        style={{
          width: '66%',
          height: '35%',
          backgroundColor: 'skyblue',
        }}
      />
      <View
        style={{
          width: '33%',
          height: '50%',
          backgroundColor: 'steelblue',
        }}
      />
    </View>
  );
};

export default PercentageDimensionsBasics;
```
