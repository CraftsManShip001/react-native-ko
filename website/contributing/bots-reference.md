---
title: 봇 레퍼런스
---

## pull-bot

이 풀 리퀘스트 린터 봇은 풀 리퀘스트가 생성될 때마다 기본적인 검사를 수행합니다. 설명에서 테스트 계획이나 changelog를 찾을 수 없거나, 풀 리퀘스트가 `main` 브랜치를 대상으로 열리지 않은 경우 풀 리퀘스트에 댓글을 남길 수 있습니다. 이 봇은 [Danger](https://danger.systems)를 사용하며, 설정은 핵심 저장소의 [`dangerfile.js`](https://github.com/facebook/react-native/blob/main/packages/react-native-bots/dangerfile.js)에서 확인할 수 있습니다.

## analysis-bot

코드 분석 봇은 풀 리퀘스트에 커밋이 추가될 때마다 Prettier, eslint, Flow와 같은 도구에서 피드백을 수집합니다. 이러한 도구 중 하나라도 코드에서 문제를 발견하면, 봇은 풀 리퀘스트에 인라인 리뷰 댓글로 해당 내용을 추가합니다. 설정은 핵심 저장소의 [`analyze_code.sh`](https://github.com/facebook/react-native/blob/main/scripts/circleci/analyze_code.sh) 파일에서 확인할 수 있습니다.

## label-actions

이슈 또는 풀 리퀘스트에 레이블이 붙었을 때 해당 레이블에 따라 동작을 수행하는 봇입니다. [`.github/workflows/on-issue-labeled.yml`](https://github.com/facebook/react-native/blob/main/.github/workflows/on-issue-labeled.yml)에서 설정합니다.

## github-actions

GitHub 워크플로우에 정의된 동작을 수행하는 봇입니다. 워크플로우는 [`.github/workflows`](https://github.com/facebook/react-native/tree/main/.github/workflows)에서 설정합니다.

## facebook-github-bot

Facebook GitHub 봇은 Meta의 여러 오픈 소스 프로젝트에서 사용됩니다. React Native의 경우, 풀 리퀘스트가 Facebook의 내부 소스 관리 시스템으로 성공적으로 임포트된 후 `main`에 머지 커밋을 푸시할 때 이 봇을 주로 만나게 됩니다. 또한 기여자 라이선스 동의(CLA)가 누락된 경우 작성자에게 알려주기도 합니다.

## react-native-bot

React Native 봇은 이 위키에 설명된 여러 프로세스를 자동화하는 데 도움을 주는 도구입니다. [`hramos/react-native-bot`](https://github.com/hramos/react-native-bot)에서 설정합니다.
