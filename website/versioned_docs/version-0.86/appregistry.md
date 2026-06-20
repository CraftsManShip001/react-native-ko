---
id: appregistry
title: AppRegistry
---

<div className="banner-native-code-required">
  <h3>네이티브 코드가 포함된 프로젝트 필요</h3>
  <p>managed Expo 워크플로우를 사용하는 경우, <code>AppRegistry</code>에 등록되는 진입 컴포넌트는 항상 하나뿐이며 자동으로 처리됩니다(또는 <a href="https://docs.expo.dev/versions/latest/sdk/register-root-component/">registerRootComponent</a>를 통해 처리됩니다). 이 API를 직접 사용할 필요가 없습니다.</p>
</div>

`AppRegistry`는 모든 React Native 앱을 실행하기 위한 JS 진입점입니다. 앱의 루트 컴포넌트는 `AppRegistry.registerComponent`로 자신을 등록해야 하며, 그 후 네이티브 시스템이 앱의 번들을 로드하고 준비가 되면 `AppRegistry.runApplication`을 호출하여 실제로 앱을 실행합니다.

```tsx
import {Text, AppRegistry} from 'react-native';

const App = () => (
  <View>
    <Text>App1</Text>
  </View>
);

AppRegistry.registerComponent('Appname', () => App);
```

뷰가 소멸될 때 애플리케이션을 "중지"하려면, `runApplication`에 전달된 태그를 인수로 `AppRegistry.unmountApplicationComponentAtRootTag`를 호출하세요. 이 두 메서드는 항상 쌍으로 사용해야 합니다.

`AppRegistry`는 다른 모듈보다 JS 실행 환경이 먼저 설정될 수 있도록 `require` 시퀀스의 초반에 require해야 합니다.

---

# 레퍼런스

## 메서드

### `getAppKeys()`

```tsx
static getAppKeys(): string[];
```

문자열 배열을 반환합니다.

---

### `getRegistry()`

```tsx
static getRegistry(): {sections: string[]; runnables: Runnable[]};
```

[Registry](appregistry#registry) 객체를 반환합니다.

---

### `getRunnable()`

```tsx
static getRunnable(appKey: string): : Runnable | undefined;
```

[Runnable](appregistry#runnable) 객체를 반환합니다.

**파라미터:**

| 이름                                                        | 타입   |
| ----------------------------------------------------------- | ------ |
| appKey <div className="label basic required">Required</div> | string |

---

### `getSectionKeys()`

```tsx
static getSectionKeys(): string[];
```

문자열 배열을 반환합니다.

---

### `getSections()`

```tsx
static getSections(): Record<string, Runnable>;
```

[Runnables](appregistry#runnables) 객체를 반환합니다.

---

### `registerCancellableHeadlessTask()`

```tsx
static registerCancellableHeadlessTask(
  taskKey: string,
  taskProvider: TaskProvider,
  taskCancelProvider: TaskCancelProvider,
);
```

취소 가능한 헤드리스 태스크를 등록합니다. 헤드리스 태스크는 UI 없이 실행되는 코드 조각입니다.

**파라미터:**

| 이름                                                                                  | 타입                                                 | 설명                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey<br/><div className="label basic required two-lines">Required</div>            | string                                               | startHeadlessTask가 호출될 때 사용된 이 태스크 인스턴스의 네이티브 id입니다.                                                                                                                        |
| taskProvider<br/><div className="label basic required two-lines">Required</div>       | [TaskProvider](appregistry#taskprovider)             | 네이티브 측에서 전달된 데이터를 유일한 인수로 받아 Promise를 반환하는 함수입니다. Promise가 resolve되거나 reject되면 네이티브 측에 해당 이벤트가 통지되며, JS 컨텍스트를 소멸할 수도 있습니다.      |
| taskCancelProvider<br/><div className="label basic required two-lines">Required</div> | [TaskCancelProvider](appregistry#taskcancelprovider) | 인수를 받지 않고 void를 반환하는 함수입니다. 취소가 요청되면 taskProvider가 실행 중인 함수는 가능한 한 빨리 마무리하고 반환해야 합니다.                                                             |

---

### `registerComponent()`

```tsx
static registerComponent(
  appKey: string,
  getComponentFunc: ComponentProvider,
  section?: boolean,
): string;
```

**파라미터:**

| 이름                                                                   | 타입              |
| ---------------------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">Required</div>            | string            |
| componentProvider <div className="label basic required">Required</div> | ComponentProvider |
| section                                                                | boolean           |

---

### `registerConfig()`

```tsx
static registerConfig(config: AppConfig[]);
```

**파라미터:**

| 이름                                                        | 타입                                 |
| ----------------------------------------------------------- | ------------------------------------ |
| config <div className="label basic required">Required</div> | [AppConfig](appregistry#appconfig)[] |

---

### `registerHeadlessTask()`

```tsx
static registerHeadlessTask(
  taskKey: string,
  taskProvider: TaskProvider,
);
```

헤드리스 태스크를 등록합니다. 헤드리스 태스크는 UI 없이 실행되는 코드 조각입니다.

앱이 백그라운드에 있는 동안 JavaScript에서 태스크를 실행하는 방법입니다. 예를 들어 최신 데이터 동기화, 푸시 알림 처리, 음악 재생 등에 사용할 수 있습니다.

**파라미터:**

| 이름                                                                        | 타입                                     | 설명                                                                                                                                                                                           |
| --------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taskKey <div className="label basic required two-lines">Required</div>      | string                                   | startHeadlessTask가 호출될 때 사용된 이 태스크 인스턴스의 네이티브 id입니다.                                                                                                                   |
| taskProvider <div className="label basic required two-lines">Required</div> | [TaskProvider](appregistry#taskprovider) | 네이티브 측에서 전달된 데이터를 유일한 인수로 받아 Promise를 반환하는 함수입니다. Promise가 resolve되거나 reject되면 네이티브 측에 해당 이벤트가 통지되며, JS 컨텍스트를 소멸할 수도 있습니다. |

---

### `registerRunnable()`

```tsx
static registerRunnable(appKey: string, func: Runnable): string;
```

**파라미터:**

| 이름                                                        | 타입     |
| ----------------------------------------------------------- | -------- |
| appKey <div className="label basic required">Required</div> | string   |
| run <div className="label basic required">Required</div>    | function |

---

### `registerSection()`

```tsx
static registerSection(
  appKey: string,
  component: ComponentProvider,
);
```

**파라미터:**

| 이름                                                           | 타입              |
| -------------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">Required</div>    | string            |
| component <div className="label basic required">Required</div> | ComponentProvider |

---

### `runApplication()`

```tsx
static runApplication(appKey: string, appParameters: any): void;
```

JavaScript 번들을 로드하고 앱을 실행합니다.

**파라미터:**

| 이름                                                               | 타입   |
| ------------------------------------------------------------------ | ------ |
| appKey <div className="label basic required">Required</div>        | string |
| appParameters <div className="label basic required">Required</div> | any    |

---

### `setComponentProviderInstrumentationHook()`

```tsx
static setComponentProviderInstrumentationHook(
  hook: ComponentProviderInstrumentationHook,
);
```

**파라미터:**

| 이름                                                      | 타입     |
| --------------------------------------------------------- | -------- |
| hook <div className="label basic required">Required</div> | function |

유효한 `hook` 함수는 다음 인수를 받습니다:

| 이름                                                                         | 타입               |
| ---------------------------------------------------------------------------- | ------------------ |
| component <div className="label basic required">Required</div>               | ComponentProvider  |
| scopedPerformanceLogger <div className="label basic required">Required</div> | IPerformanceLogger |

이 함수는 반드시 React 컴포넌트를 반환해야 합니다.

---

### `setWrapperComponentProvider()`

```tsx
static setWrapperComponentProvider(
  provider: WrapperComponentProvider,
);
```

**파라미터:**

| 이름                                                          | 타입              |
| ------------------------------------------------------------- | ----------------- |
| provider <div className="label basic required">Required</div> | ComponentProvider |

---

### `startHeadlessTask()`

```tsx
static startHeadlessTask(
  taskId: number,
  taskKey: string,
  data: any,
);
```

네이티브 코드에서만 호출됩니다. 헤드리스 태스크를 시작합니다.

**파라미터:**

| 이름                                                         | 타입   | 설명                                                      |
| ------------------------------------------------------------ | ------ | --------------------------------------------------------- |
| taskId <div className="label basic required">Required</div>  | number | 이 태스크 인스턴스의 실행을 추적하기 위한 네이티브 id입니다. |
| taskKey <div className="label basic required">Required</div> | string | 시작할 태스크의 키입니다.                                  |
| data <div className="label basic required">Required</div>    | any    | 태스크에 전달할 데이터입니다.                              |

---

### `unmountApplicationComponentAtRootTag()`

```tsx
static unmountApplicationComponentAtRootTag(rootTag: number);
```

뷰가 소멸될 때 애플리케이션을 중지합니다.

**파라미터:**

| 이름                                                         | 타입   |
| ------------------------------------------------------------ | ------ |
| rootTag <div className="label basic required">Required</div> | number |

## 타입 정의

### AppConfig

`registerConfig` 메서드를 위한 애플리케이션 설정입니다.

| 타입   |
| ------ |
| object |

**프로퍼티:**

| 이름                                                        | 타입              |
| ----------------------------------------------------------- | ----------------- |
| appKey <div className="label basic required">Required</div> | string            |
| component                                                   | ComponentProvider |
| run                                                         | function          |
| section                                                     | boolean           |

:::note
모든 설정은 `component` 또는 `run` 함수 중 하나를 반드시 지정해야 합니다.
:::

### Registry

| 타입   |
| ------ |
| object |

**프로퍼티:**

| 이름      | 타입                                       |
| --------- | ------------------------------------------ |
| runnables | array of [Runnables](appregistry#runnable) |
| sections  | array of strings                           |

### Runnable

| 타입   |
| ------ |
| object |

**프로퍼티:**

| 이름      | 타입              |
| --------- | ----------------- |
| component | ComponentProvider |
| run       | function          |

### Runnables

`appKey`를 키로, [`Runnable`](appregistry#runnable) 타입을 값으로 갖는 객체입니다.

| 타입   |
| ------ |
| object |

### Task

`Task`는 임의의 데이터를 인수로 받아 `undefined`로 resolve되는 Promise를 반환하는 함수입니다.

| 타입     |
| -------- |
| function |

### TaskCanceller

`TaskCanceller`는 인수를 받지 않고 void를 반환하는 함수입니다.

| 타입     |
| -------- |
| function |

### TaskCancelProvider

유효한 `TaskCancelProvider`는 [`TaskCanceller`](appregistry#taskcanceller)를 반환하는 함수입니다.

| 타입     |
| -------- |
| function |

### TaskProvider

유효한 `TaskProvider`는 [`Task`](appregistry#task)를 반환하는 함수입니다.

| 타입     |
| -------- |
| function |
