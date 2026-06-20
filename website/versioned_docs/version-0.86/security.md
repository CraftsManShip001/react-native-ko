---
id: security
title: 보안
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

앱을 개발할 때 보안은 종종 간과되곤 합니다. 완전히 뚫리지 않는 소프트웨어를 만드는 것은 불가능하다는 것이 사실입니다—완전히 뚫리지 않는 자물쇠는 아직 발명되지 않았습니다(결국 은행 금고도 털리긴 합니다). 그러나 악의적인 공격에 노출되거나 보안 취약점이 드러날 확률은 애플리케이션을 보호하려는 노력에 반비례합니다. 일반 자물쇠는 따 열 수 있지만, 그래도 캐비닛 고리보다는 훨씬 통과하기 어렵습니다!

<img src="/docs/assets/d_security_chart.svg" width={283} alt=" " style={{float: 'right'}} />

이 가이드에서는 민감한 정보 저장, 인증, 네트워크 보안에 대한 모범 사례와 앱을 보호하는 데 도움이 되는 도구에 대해 알아봅니다. 이것은 비행 전 체크리스트가 아니라, 각각 앱과 사용자를 더욱 보호하는 데 도움이 되는 옵션의 카탈로그입니다.

## 민감한 정보 저장

앱 코드에 민감한 API 키를 절대 저장하지 마세요. 코드에 포함된 모든 것은 앱 번들을 검사하는 누구에게나 일반 텍스트로 접근될 수 있습니다. [react-native-dotenv](https://github.com/goatandsheep/react-native-dotenv)와 [react-native-config](https://github.com/luggit/react-native-config/) 같은 도구는 API 엔드포인트와 같은 환경별 변수를 추가하는 데 유용하지만, 비밀과 API 키를 포함할 수 있는 서버 측 환경 변수와 혼동해서는 안 됩니다.

앱에서 어떤 리소스에 접근하기 위해 API 키나 비밀이 반드시 필요하다면, 가장 안전한 방법은 앱과 리소스 사이에 오케스트레이션 레이어를 구축하는 것입니다. 이는 필요한 API 키나 비밀로 요청을 전달할 수 있는 서버리스 함수(예: AWS Lambda 또는 Google Cloud Functions 사용)일 수 있습니다. 서버 측 코드의 비밀은 앱 코드의 비밀처럼 API 소비자가 접근할 수 없습니다.

**영구 저장되는 사용자 데이터의 경우, 민감도에 따라 적절한 저장 유형을 선택하세요.** 앱이 사용되면서 오프라인 지원, 네트워크 요청 감소, 또는 사용자가 매번 재인증하지 않도록 세션 간 액세스 토큰을 저장하는 등 기기에 데이터를 저장해야 할 필요성을 자주 느끼게 됩니다.

:::info
**영구 저장 vs 비영구 저장** — 영구 저장된 데이터는 기기 디스크에 기록되어, 다른 네트워크 요청이나 사용자 재입력 없이도 앱 시작 시 읽을 수 있습니다. 그러나 이로 인해 공격자가 해당 데이터에 접근하기 더 쉬워질 수 있습니다. 비영구 저장된 데이터는 디스크에 기록되지 않으므로 접근할 데이터가 없습니다!
:::

### Async Storage

[Async Storage](https://github.com/react-native-async-storage/async-storage)는 React Native를 위한 커뮤니티 유지 관리 모듈로, 비동기적이고 암호화되지 않은 키-값 저장소를 제공합니다. Async Storage는 앱 간에 공유되지 않습니다. 모든 앱은 자체 샌드박스 환경을 가지며 다른 앱의 데이터에 접근할 수 없습니다.

| **Async Storage 사용 권장 시...**     | **Async Storage 사용 금지 항목...** |
| --------------------------------------------- | ---------------------------------- |
| 앱 실행 간 비민감 데이터 유지                 | 토큰 저장                          |
| Redux state 유지                              | 비밀                               |
| GraphQL state 유지                            |                                    |
| 전역 앱 변수 저장                             |                                    |

#### 개발자 노트

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["web"])}>

<TabItem value="web">

:::note
Async Storage는 웹의 Local Storage에 해당하는 React Native 기능입니다.
:::

</TabItem>
</Tabs>

### 보안 저장소

React Native는 민감한 데이터를 저장하는 방법을 기본 제공하지 않습니다. 그러나 Android와 iOS 플랫폼을 위한 기존 솔루션들이 있습니다.

#### iOS - Keychain Services

[Keychain Services](https://developer.apple.com/documentation/security/keychain_services)를 사용하면 사용자의 작은 민감한 정보를 안전하게 저장할 수 있습니다. Async Storage에 저장하기에 적합하지 않은 인증서, 토큰, 비밀번호 및 기타 민감한 정보를 저장하는 이상적인 장소입니다.

#### Android - Secure Shared Preferences

[Shared Preferences](https://developer.android.com/reference/android/content/SharedPreferences)는 영구 키-값 데이터 저장소의 Android 동등물입니다. **Shared Preferences의 데이터는 기본적으로 암호화되지 않지만**, [Encrypted Shared Preferences](https://developer.android.com/topic/security/data)는 Android용 Shared Preferences 클래스를 래핑하여 키와 값을 자동으로 암호화합니다.

#### Android - Keystore

[Android Keystore](https://developer.android.com/training/articles/keystore) 시스템을 사용하면 암호화 키를 컨테이너에 저장하여 기기에서 추출하기 더 어렵게 만들 수 있습니다.

iOS Keychain 서비스나 Android Secure Shared Preferences를 사용하려면 직접 브리지를 작성하거나 이를 래핑하여 통합된 API를 제공하는 라이브러리를 사용할 수 있습니다(위험은 본인이 감수). 고려할 수 있는 라이브러리:

- [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [react-native-keychain](https://github.com/oblador/react-native-keychain)

:::warning Caution
**의도치 않게 민감한 정보를 저장하거나 노출하지 않도록 주의하세요.** 예를 들어, 민감한 폼 데이터를 redux state에 저장하고 전체 state 트리를 Async Storage에 유지하거나, Sentry나 Crashlytics와 같은 애플리케이션 모니터링 서비스에 사용자 토큰과 개인 정보를 전송하는 경우에 우발적으로 발생할 수 있습니다.
:::

## 인증과 딥 링킹

<img src="/docs/assets/d_security_deep-linking.svg" width={225} alt=" " style={{float: 'right', margin: '0 0 1em 1em'}} />

모바일 앱은 웹에는 없는 고유한 취약점이 있습니다: **딥 링킹**. 딥 링킹은 외부 소스에서 네이티브 애플리케이션으로 직접 데이터를 전송하는 방법입니다. 딥 링크는 `app://`처럼 생겼으며, 여기서 `app`은 앱 스킴이고 // 이후의 모든 것이 요청을 처리하는 데 내부적으로 사용될 수 있습니다.

예를 들어, 이커머스 앱을 개발하는 경우 `app://products/1`을 사용하여 앱에 딥 링크하고 id가 1인 제품의 상세 페이지를 열 수 있습니다. 이를 웹의 URL과 유사하게 생각할 수 있지만, 한 가지 중요한 차이점이 있습니다:

딥 링크는 안전하지 않으므로 절대 민감한 정보를 딥 링크로 전송하지 마세요.

딥 링크가 안전하지 않은 이유는 URL 스킴을 등록하는 중앙화된 방법이 없기 때문입니다. 애플리케이션 개발자로서 iOS의 경우 [Xcode에서 구성](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app)하거나 Android의 경우 [인텐트를 추가](https://developer.android.com/training/app-links/deep-linking)하여 거의 모든 URL 스킴을 사용할 수 있습니다.

악의적인 애플리케이션이 동일한 스킴에 등록하여 딥 링크를 가로채고 링크에 포함된 데이터에 접근하는 것을 막을 수 없습니다. `app://products/1`과 같은 것을 전송하는 것은 해롭지 않지만, 토큰을 전송하는 것은 보안 위험입니다.

운영 체제에 링크를 열 애플리케이션이 두 개 이상 있는 경우, Android는 사용자에게 [모호성 해소 다이얼로그](https://developer.android.com/training/basics/intents/sending#disambiguation-dialog)를 표시하여 어느 애플리케이션으로 링크를 열지 선택하도록 요청합니다. 그러나 iOS에서는 운영 체제가 선택을 하므로 사용자는 전혀 모르게 됩니다. Apple은 이후 iOS 버전(iOS 11)에서 선착순 원칙을 도입하여 이 문제를 해결하려 했지만, 이 취약점은 여전히 다른 방식으로 악용될 수 있으며 [여기](https://thehackernews.com/2019/07/ios-custom-url-scheme.html)서 더 자세히 읽을 수 있습니다. [유니버설 링크](https://developer.apple.com/ios/universal-links/)를 사용하면 iOS에서 앱 내 콘텐츠에 안전하게 링크할 수 있습니다.

### OAuth2와 리다이렉트

OAuth2 인증 프로토콜은 현재 매우 인기가 있으며, 가장 완전하고 안전한 프로토콜로 알려져 있습니다. OpenID Connect 프로토콜도 이를 기반으로 합니다. OAuth2에서는 제3자를 통해 사용자를 인증하도록 요청합니다. 성공적으로 완료되면 제3자는 JWT(JSON Web Token)와 교환할 수 있는 인증 코드와 함께 요청 애플리케이션으로 리다이렉트됩니다. JWT는 웹에서 당사자 간에 정보를 안전하게 전송하기 위한 개방형 표준입니다.

웹에서 이 리다이렉트 단계는 안전합니다. 웹의 URL은 고유함이 보장되기 때문입니다. 앞서 언급했듯이 URL 스킴을 등록하는 중앙화된 방법이 없기 때문에 앱에서는 그렇지 않습니다. 이 보안 문제를 해결하기 위해 PKCE 형태의 추가 검사가 추가되어야 합니다.

"픽시"라고 발음되는 [PKCE](https://oauth.net/2/pkce/)는 Proof of Key Code Exchange의 약자로, OAuth 2 사양의 확장입니다. 인증 및 토큰 교환 요청이 동일한 클라이언트에서 오는지 확인하는 추가 보안 레이어를 추가합니다. PKCE는 [SHA 256](https://www.movable-type.co.uk/scripts/sha256.html) 암호화 해시 알고리즘을 사용합니다. SHA 256은 모든 크기의 텍스트나 파일에 대해 고유한 "서명"을 생성하지만:

- 입력 파일에 관계없이 항상 같은 길이
- 같은 입력에 대해 항상 같은 결과를 보장
- 단방향(즉, 역으로 분석하여 원본 입력을 알아낼 수 없음)

이제 두 가지 값이 있습니다:

- **code_verifier** - 클라이언트가 생성한 큰 임의 문자열
- **code_challenge** - code_verifier의 SHA 256

초기 `/authorize` 요청 중에 클라이언트는 메모리에 보관하는 `code_verifier`에 대한 `code_challenge`도 전송합니다. authorize 요청이 올바르게 반환된 후 클라이언트는 `code_challenge`를 생성하는 데 사용된 `code_verifier`도 전송합니다. IDP는 그런 다음 `code_challenge`를 계산하여 최초 `/authorize` 요청 시 설정된 값과 일치하는지 확인하고, 값이 일치하는 경우에만 액세스 토큰을 전송합니다.

이는 초기 인증 흐름을 트리거한 애플리케이션만이 인증 코드를 JWT와 성공적으로 교환할 수 있음을 보장합니다. 따라서 악의적인 애플리케이션이 인증 코드에 접근하더라도 그 자체로는 사용할 수 없습니다. 실제 동작을 보려면 [이 예시](https://aaronparecki.com/oauth-2-simplified/#mobile-apps)를 확인하세요.

네이티브 OAuth를 위해 고려할 수 있는 라이브러리는 [react-native-app-auth](https://github.com/FormidableLabs/react-native-app-auth)입니다. React-native-app-auth는 OAuth2 제공자와 통신하기 위한 SDK입니다. 네이티브 [AppAuth-iOS](https://github.com/openid/AppAuth-iOS) 및 [AppAuth-Android](https://github.com/openid/AppAuth-Android) 라이브러리를 래핑하며 PKCE를 지원할 수 있습니다.

:::note
`react-native-app-auth`는 Identity Provider가 지원하는 경우에만 PKCE를 지원할 수 있습니다.
:::

![OAuth2 with PKCE](/docs/assets/diagram_pkce.svg)

## 네트워크 보안

API는 항상 [SSL 암호화](https://www.ssl.com/faqs/faq-what-is-ssl/)를 사용해야 합니다. SSL 암호화는 요청된 데이터가 서버를 떠난 후 클라이언트에 도달하기 전에 일반 텍스트로 읽히는 것을 방지합니다. 엔드포인트가 `http://` 대신 `https://`로 시작하면 안전한 엔드포인트임을 알 수 있습니다.

### SSL 피닝

https 엔드포인트를 사용하더라도 데이터가 가로채기에 취약할 수 있습니다. https에서 클라이언트는 클라이언트에 미리 설치된 신뢰할 수 있는 인증 기관이 서명한 유효한 인증서를 서버가 제공할 수 있는 경우에만 서버를 신뢰합니다. 공격자는 사용자 기기에 악의적인 루트 CA 인증서를 설치하여 클라이언트가 공격자가 서명한 모든 인증서를 신뢰하도록 할 수 있습니다. 따라서 인증서에만 의존하면 여전히 [중간자 공격](https://en.wikipedia.org/wiki/Man-in-the-middle_attack)에 취약할 수 있습니다.

**SSL 피닝**은 이 공격을 방지하기 위해 클라이언트 측에서 사용할 수 있는 기술입니다. 개발 중에 신뢰할 수 있는 인증서 목록을 클라이언트에 내장(또는 피닝)하여 신뢰할 수 있는 인증서 중 하나로 서명된 요청만 수락하고 자체 서명된 인증서는 허용하지 않도록 합니다.

:::warning Caution
SSL 피닝을 사용할 때는 인증서 만료에 주의해야 합니다. 인증서는 1~2년마다 만료되며, 만료되면 앱과 서버 모두에서 업데이트해야 합니다. 서버의 인증서가 업데이트되는 즉시 이전 인증서가 내장된 앱은 작동을 멈춥니다.
:::

## 요약

보안을 처리하는 완벽한 방법은 없지만, 의식적인 노력과 성실함으로 애플리케이션의 보안 침해 가능성을 크게 줄이는 것이 가능합니다. 애플리케이션에 저장된 데이터의 민감도, 사용자 수, 해커가 계정에 접근했을 때 입힐 수 있는 피해에 비례하여 보안에 투자하세요. 그리고 기억하세요: 애초에 요청되지 않은 정보에 접근하는 것은 훨씬 더 어렵습니다.
