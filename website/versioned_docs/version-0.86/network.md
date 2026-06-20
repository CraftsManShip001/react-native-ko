---
id: network
title: Networking
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

많은 모바일 앱은 원격 URL에서 리소스를 불러와야 합니다. REST API에 POST 요청을 보내거나, 다른 서버에서 정적 콘텐츠 일부를 가져와야 할 수도 있습니다.

## Fetch 사용하기

React Native는 네트워킹 요구에 맞는 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)를 제공합니다. 이전에 `XMLHttpRequest`나 다른 네트워킹 API를 사용해 본 경험이 있다면 Fetch가 친숙하게 느껴질 것입니다. 추가 정보는 MDN의 [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 가이드를 참고하세요.

### 요청 보내기

임의의 URL에서 콘텐츠를 가져오려면 fetch에 URL을 전달하면 됩니다:

```ts
fetch('https://mywebsite.com/mydata.json');
```

Fetch는 HTTP 요청을 커스터마이즈할 수 있는 선택적 두 번째 인수도 받습니다. 추가 헤더를 지정하거나 POST 요청을 보낼 수 있습니다:

```ts
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  }),
});
```

전체 속성 목록은 [Fetch Request 문서](https://developer.mozilla.org/en-US/docs/Web/API/Request)를 확인하세요.

### 응답 처리하기

위 예시는 요청을 보내는 방법을 보여줍니다. 대부분의 경우 응답으로 무언가를 처리해야 합니다.

네트워킹은 본질적으로 비동기 작업입니다. Fetch 메서드는 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 반환하므로 비동기 방식으로 동작하는 코드를 작성하기 쉽습니다:

```ts
const getMoviesFromApi = () => {
  return fetch('https://reactnative.dev/movies.json')
    .then(response => response.json())
    .then(json => {
      return json.movies;
    })
    .catch(error => {
      console.error(error);
    });
};
```

React Native 앱에서 `async` / `await` 문법을 사용할 수도 있습니다:

```ts
const getMoviesFromApiAsync = async () => {
  try {
    const response = await fetch(
      'https://reactnative.dev/movies.json',
    );
    const json = await response.json();
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};
```

`fetch`에서 발생할 수 있는 오류를 반드시 catch하세요. 그렇지 않으면 오류가 자동으로 무시됩니다.

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Fetch%20Example&ext=js
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Fetch%20Example&ext=tsx
import {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

type Movie = {
  id: string;
  title: string;
  releaseYear: string;
};

type MoviesResponse = {
  title: string;
  description: string;
  movies: Movie[];
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Movie[]>([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = (await response.json()) as MoviesResponse;
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;
```

</TabItem>
</Tabs>

:::info
기본적으로 iOS 9.0 이상에서는 App Transport Security(ATS)를 적용합니다. ATS는 모든 HTTP 연결에 HTTPS를 요구합니다. 일반 텍스트 URL(`http`로 시작하는 URL)에서 데이터를 가져와야 한다면 먼저 [ATS 예외를 추가](integration-with-existing-apps.md)해야 합니다. 접근해야 할 도메인을 미리 알고 있다면 해당 도메인에만 예외를 추가하는 것이 더 안전합니다. 런타임까지 도메인을 알 수 없는 경우에는 [ATS를 완전히 비활성화](publishing-to-app-store.md)할 수 있습니다. 단, 2017년 1월부터 [Apple의 App Store 심사에서 ATS 비활성화에 대한 합당한 사유를 요구합니다](https://forums.developer.apple.com/thread/48979). 자세한 내용은 [Apple 문서](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW33)를 참고하세요.
:::

:::tip
Android의 경우 API Level 28부터 일반 텍스트 트래픽이 기본적으로 차단됩니다. 앱 매니페스트 파일에서 [`android:usesCleartextTraffic`](https://developer.android.com/guide/topics/manifest/application-element#usesCleartextTraffic)을 설정하면 이 동작을 재정의할 수 있습니다.
:::

## 다른 네트워킹 라이브러리 사용하기

[XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)는 React Native에 내장되어 있습니다. 이를 통해 [frisbee](https://github.com/niftylettuce/frisbee)나 [axios](https://github.com/axios/axios) 같이 XMLHttpRequest에 의존하는 서드 파티 라이브러리를 사용하거나, 원한다면 XMLHttpRequest API를 직접 사용할 수도 있습니다.

```ts
const request = new XMLHttpRequest();
request.onreadystatechange = e => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', request.responseText);
  } else {
    console.warn('error');
  }
};

request.open('GET', 'https://mywebsite.com/endpoint/');
request.send();
```

:::warning Caution
XMLHttpRequest의 보안 모델은 웹과 다릅니다. 네이티브 앱에는 [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 개념이 없기 때문입니다.
:::

## WebSocket 지원

React Native는 단일 TCP 연결로 전이중 통신 채널을 제공하는 프로토콜인 [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)도 지원합니다.

```ts
const ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {
  // connection opened
  ws.send('something'); // send a message
};

ws.onmessage = e => {
  // a message was received
  console.log(e.data);
};

ws.onerror = e => {
  // an error occurred
  console.log(e.message);
};

ws.onclose = e => {
  // connection closed
  console.log(e.code, e.reason);
};
```

## `fetch`와 쿠키 기반 인증의 알려진 문제

현재 `fetch`에서 작동하지 않는 옵션들은 다음과 같습니다:

- `redirect:manual`
- `credentials:omit`

* Android에서 동일한 이름의 헤더가 있으면 마지막 것만 남습니다. 임시 해결책은 여기에서 확인할 수 있습니다: https://github.com/facebook/react-native/issues/18837#issuecomment-398779994.
* 쿠키 기반 인증은 현재 불안정합니다. 관련 이슈는 여기에서 확인할 수 있습니다: https://github.com/facebook/react-native/issues/23185
* iOS에서 최소한으로, `302`를 통해 리다이렉트될 때 `Set-Cookie` 헤더가 있으면 쿠키가 제대로 설정되지 않습니다. 리다이렉트를 수동으로 처리할 수 없으므로, 리다이렉트가 만료된 세션의 결과일 경우 무한 요청이 발생하는 상황이 생길 수 있습니다.

## iOS에서 NSURLSession 설정하기

일부 애플리케이션에서는 iOS에서 실행되는 React Native 애플리케이션의 네트워크 요청에 사용되는 기본 `NSURLSession`에 대해 커스텀 `NSURLSessionConfiguration`을 제공하는 것이 적합할 수 있습니다. 예를 들어, 앱에서 오는 모든 네트워크 요청에 커스텀 사용자 에이전트 문자열을 설정하거나 `NSURLSession`에 임시 `NSURLSessionConfiguration`을 제공해야 할 수 있습니다. `RCTSetCustomNSURLSessionConfigurationProvider` 함수를 사용하면 이러한 커스터마이즈가 가능합니다. `RCTSetCustomNSURLSessionConfigurationProvider`를 호출할 파일에 다음 import를 추가하는 것을 잊지 마세요:

```objectivec
#import <React/RCTHTTPRequestHandler.h>
```

`RCTSetCustomNSURLSessionConfigurationProvider`는 React에서 필요할 때 즉시 사용할 수 있도록 애플리케이션 생명주기 초기에 호출되어야 합니다. 예를 들면:

```objectivec
-(void)application:(__unused UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

  // set RCTSetCustomNSURLSessionConfigurationProvider
  RCTSetCustomNSURLSessionConfigurationProvider(^NSURLSessionConfiguration *{
     NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
     // configure the session
     return configuration;
  });

  // set up React
  _bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
}
```
