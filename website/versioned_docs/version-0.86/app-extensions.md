---
id: app-extensions
title: App Extensions
---

App Extensions를 사용하면 메인 앱 외부에서 커스텀 기능과 콘텐츠를 제공할 수 있습니다. iOS에는 다양한 유형의 App Extensions가 있으며, 이는 모두 [App Extension Programming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/index.html#//apple_ref/doc/uid/TP40014214-CH20-SW1)에서 다루고 있습니다. 이 가이드에서는 iOS에서 App Extensions를 활용하는 방법을 간략하게 살펴보겠습니다.

## 익스텐션에서의 메모리 사용

이러한 익스텐션은 일반 앱 샌드박스 외부에서 로드되므로, 여러 App Extensions가 동시에 로드될 가능성이 높습니다. 예상할 수 있듯이, 이러한 익스텐션에는 작은 메모리 사용 제한이 있습니다. App Extensions를 개발할 때 이 점을 염두에 두세요. 실제 기기에서 애플리케이션을 테스트하는 것은 항상 강력히 권장되며, App Extensions를 개발할 때는 더욱 그렇습니다: 개발자들은 iOS 시뮬레이터에서는 익스텐션이 정상적으로 작동하지만 실제 기기에서는 로드되지 않는다는 사용자 보고를 받는 경우가 너무 자주 있습니다.

### Today 위젯

Today 위젯의 메모리 제한은 16MB입니다. React Native를 사용하는 Today 위젯 구현은 메모리 사용량이 너무 높은 경향이 있어 불안정하게 작동할 수 있습니다. Today 위젯이 메모리 제한을 초과하는지 여부는 'Unable to Load' 메시지가 표시되면 알 수 있습니다:

![](/docs/assets/TodayWidgetUnableToLoad.jpg)

항상 실제 기기에서 App Extensions를 테스트해야 하지만, 특히 Today 위젯을 다룰 때는 이것으로 충분하지 않을 수 있음을 알아야 합니다. 디버그 구성 빌드는 메모리 제한을 초과할 가능성이 더 높은 반면, 릴리스 구성 빌드는 즉시 실패하지 않습니다. 릴리스 구성 빌드가 16MB 제한에 매우 가까울 가능성이 높으므로 [Xcode의 Instruments](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/index.html)를 사용하여 실제 메모리 사용량을 분석할 것을 강력히 권장합니다. 이러한 상황에서 API에서 데이터를 가져오는 것과 같은 일반적인 작업을 수행하면 16MB 제한을 쉽게 초과할 수 있습니다.

React Native Today 위젯 구현의 제한을 실험하려면 [react-native-today-widget](https://github.com/matejkriz/react-native-today-widget/)의 예제 프로젝트를 확장해 보세요.

### 기타 App Extensions

다른 유형의 App Extensions는 Today 위젯보다 더 높은 메모리 제한을 가집니다. 예를 들어, 커스텀 키보드 익스텐션은 48MB로 제한되고, 공유 익스텐션은 120MB로 제한됩니다. React Native로 이러한 App Extensions를 구현하는 것이 더 실현 가능합니다. 개념 증명의 한 예로 [react-native-ios-share-extension](https://github.com/andrewsardone/react-native-ios-share-extension)이 있습니다.
