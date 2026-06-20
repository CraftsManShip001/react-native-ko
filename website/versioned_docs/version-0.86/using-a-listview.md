---
id: using-a-listview
title: 리스트 뷰 사용하기
---

React Native는 데이터 목록을 표시하기 위한 컴포넌트 모음을 제공합니다. 일반적으로 [FlatList](flatlist.md) 또는 [SectionList](sectionlist.md)를 사용하게 됩니다.

`FlatList` 컴포넌트는 변경되지만 유사한 구조를 가진 데이터의 스크롤 가능한 목록을 표시합니다. `FlatList`는 시간이 지남에 따라 항목 수가 변경될 수 있는 긴 데이터 목록에 적합합니다. 보다 범용적인 [`ScrollView`](using-a-scrollview.md)와 달리, `FlatList`는 모든 요소를 한 번에 렌더링하지 않고 현재 화면에 표시되는 요소만 렌더링합니다.

`FlatList` 컴포넌트에는 `data`와 `renderItem` 두 가지 props가 필요합니다. `data`는 목록의 정보 소스입니다. `renderItem`은 소스에서 하나의 항목을 가져와 렌더링할 형식화된 컴포넌트를 반환합니다.

이 예시는 하드코딩된 데이터로 기본 `FlatList`를 생성합니다. `data` props의 각 항목은 `Text` 컴포넌트로 렌더링됩니다. `FlatListBasics` 컴포넌트는 `FlatList`와 모든 `Text` 컴포넌트를 렌더링합니다.

```SnackPlayer name=FlatList%20Basics
import {FlatList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
};

export default FlatListBasics;
```

iOS의 `UITableView`와 유사하게 섹션 헤더와 함께 논리적인 섹션으로 나뉜 데이터 집합을 렌더링하려면 [SectionList](sectionlist.md)를 사용하세요.

```SnackPlayer name=SectionList%20Basics
import {SectionList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const SectionListBasics = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
          {
            title: 'J',
            data: [
              'Jackson',
              'James',
              'Jillian',
              'Jimmy',
              'Joel',
              'John',
              'Julie',
            ],
          },
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
      />
    </View>
  );
};

export default SectionListBasics;
```

리스트 뷰의 가장 일반적인 사용 사례 중 하나는 서버에서 가져온 데이터를 표시하는 것입니다. 이를 위해서는 [React Native의 네트워킹에 대해 알아봐야](network.md) 합니다.
