---
id: running-on-simulator-ios
title: Running On Simulator
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 시뮬레이터 시작하기

React Native 프로젝트를 초기화한 후, 새로 생성된 프로젝트 디렉토리 안에서 다음 명령어를 실행할 수 있습니다.

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios
```

</TabItem>
</Tabs>

모든 설정이 올바르게 되어 있다면, 잠시 후 iOS Simulator에서 새 앱이 실행되는 것을 볼 수 있습니다.

## 디바이스 지정하기

`--simulator` 플래그 뒤에 디바이스 이름을 문자열로 입력하여 시뮬레이터에서 실행할 디바이스를 지정할 수 있습니다. 기본값은 `"iPhone 14"`입니다. iPhone SE (3세대)에서 앱을 실행하려면 다음 명령어를 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --simulator="iPhone SE (3rd generation)"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --simulator "iPhone SE (3rd generation)"
```

</TabItem>
</Tabs>

디바이스 이름은 Xcode에서 사용 가능한 디바이스 목록에 해당합니다. 콘솔에서 `xcrun simctl list devices`를 실행하여 사용 가능한 디바이스를 확인할 수 있습니다.

### 디바이스 버전 지정하기

여러 iOS 버전이 설치되어 있는 경우, 적절한 버전도 함께 지정해야 합니다. 예를 들어, iPhone 14 Pro (16.0)에서 앱을 실행하려면 다음 명령어를 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --simulator="iPhone 14 Pro (16.0)"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --simulator "iPhone 14 Pro (16.0)"
```

</TabItem>
</Tabs>

## UDID 지정하기

`xcrun simctl list devices` 명령어에서 반환된 디바이스 UDID를 지정할 수 있습니다. 예를 들어, UDID `AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA`로 앱을 실행하려면 다음 명령어를 실행하세요:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run ios -- --udid="AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

</TabItem>
<TabItem value="yarn">

```shell
yarn ios --udid "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA"
```

</TabItem>
</Tabs>
