# 부록

## I. 용어

- **Spec** - Turbo Native Module 또는 Fabric Native 컴포넌트의 API를 설명하는 TypeScript 또는 Flow 코드입니다. **Codegen**이 보일러플레이트 코드를 생성하는 데 사용됩니다.

- **Native Modules** - 사용자를 위한 사용자 인터페이스(UI)가 없는 네이티브 라이브러리입니다. 영구 저장소, 알림, 네트워크 이벤트 등이 예시입니다. 이것들은 함수와 객체로서 JavaScript 애플리케이션 코드에서 접근할 수 있습니다.
- **Native Component** - React 컴포넌트를 통해 애플리케이션 JavaScript 코드에서 사용할 수 있는 네이티브 플랫폼 View입니다.

- **Legacy Native Components** - 구 React Native 아키텍처에서 실행되는 컴포넌트입니다.
- **Legacy Native Modules** - 구 React Native 아키텍처에서 실행되는 모듈입니다.

## II. Codegen 타입

다음 표를 각 플랫폼에서 지원되는 타입과 그것이 매핑되는 것에 대한 참조로 사용할 수 있습니다:

| Flow                                                                       | TypeScript                                          | Flow Nullable Support                                   | TypeScript Nullable Support                          | Android (Java)                       | iOS (ObjC)                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| `string`                                                                   | `string`                                            | `?string`                                               | <code>string &#124; null</code>                      | `string`                             | `NSString`                                                     |
| `boolean`                                                                  | `boolean`                                           | `?boolean`                                              | <code>boolean &#124; null</code>                     | `Boolean`                            | `NSNumber`                                                     |
| Object Literal<br /><code>&#123;&#124; foo: string, ...&#124;&#125;</code> | <code>&#123; foo: string, ...&#125; as const</code> | <code>?&#123;&#124; foo: string, ...&#124;&#125;</code> | <code>?&#123; foo: string, ...&#125; as const</code> | \-                                   | \-                                                             |
| Object [[1](#참고)]                                                       | Object [[1](#참고)]                                | `?Object`                                               | <code>Object &#124; null</code>                      | `ReadableMap`                        | `@` (untyped dictionary)                                       |
| <code>Array&lt;T&gt;</code>                                                | <code>Array&lt;T&gt;</code>                         | <code>?Array&lt;T&gt;</code>                            | <code>Array&lt;T&gt; &#124; null</code>              | `ReadableArray`                      | `NSArray` (or `RCTConvertVecToArray` when used inside objects) |
| `Function`                                                                 | `Function`                                          | `?Function`                                             | <code>Function &#124; null</code>                    | \-                                   | \-                                                             |
| <code>Promise&lt;T&gt;</code>                                              | <code>Promise&lt;T&gt;</code>                       | <code>?Promise&lt;T&gt;</code>                          | <code>Promise&lt;T&gt; &#124; null</code>            | `com.facebook.react.bridge.Promise`  | `RCTPromiseResolve` and `RCTPromiseRejectBlock`                |
| Type Unions<br /><code>'SUCCESS'&#124;'FAIL'</code>                        | Type Unions<br /><code>'SUCCESS'&#124;'FAIL'</code> | Only as callbacks                                       |                                                      | \-                                   | \-                                                             |
| Callbacks<br />`() =>`                                                     | Callbacks<br />`() =>`                              | Yes                                                     |                                                      | `com.facebook.react.bridge.Callback` | `RCTResponseSenderBlock`                                       |
| `number`                                                                   | `number`                                            | No                                                      |                                                      | `double`                             | `NSNumber`                                                     |

### 참고:

<b>[1]</b> Object 대신 Object 리터럴을 사용하는 것을 강력히 권장합니다.

:::info
React Native의 핵심 모듈에 대한 JavaScript 사양을 참조하는 것도 유용할 수 있습니다. 이것들은 React Native 저장소의 `Libraries/` 디렉토리 안에 있습니다.
:::
