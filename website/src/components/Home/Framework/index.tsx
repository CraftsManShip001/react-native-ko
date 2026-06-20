/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

function Framework() {
  return (
    <Section>
      <SectionTitle
        title="프레임워크로 빠르게 시작하세요"
        description={
          <>
            React Native는 React 프로그래밍 패러다임을 Android, iOS 등의
            플랫폼으로 가져옵니다. 라우팅 방식이나 다양한 플랫폼 API 접근
            방법을 강요하지 않습니다. React Native로 새 앱을 만들 때는{' '}
            <a href="https://expo.dev">Expo</a>와 같은 프레임워크를 권장합니다.
          </>
        }
      />
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <ThemedImage
            sources={{
              light: '/img/homepage/file-based-routing.png',
              dark: '/img/homepage/file-based-routing-dark.png',
            }}
            className={styles.cardImage}
            alt="화면과 내비게이션을 나타내는 폴더와 파일로 구성된 파일 시스템"
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>파일 기반 라우팅</h4>
            <p className={styles.cardDescription}>
              파일 시스템을 활용해 최소한의 코드로 스택, 모달, 드로어, 탭
              화면을 만들어 보세요.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <ThemedImage
            sources={{
              light: useBaseUrl('/img/homepage/libraries.png'),
              dark: useBaseUrl('/img/homepage/libraries-dark.png'),
            }}
            alt="라이브러리, SDK, 네이티브 코드를 나타내는 아이콘 그리드"
            className={styles.cardImage}
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>
              라이브러리, SDK, 네이티브 코드 자유롭게 활용
            </h4>
            <p className={styles.cardDescription}>
              네이티브 변경 사항을 자동 생성하거나 직접 네이티브 코드를
              작성하세요. 50개 이상의 모듈로 앱을 완성하세요.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <ThemedImage
            sources={{
              light: useBaseUrl('/img/homepage/tools.png'),
              dark: useBaseUrl('/img/homepage/tools-dark.png'),
            }}
            className={styles.cardImage}
            alt="디버깅, 성능 등 개발자 도구 토글 목록"
          />
          <div className={styles.cardContent}>
            <h4 className={styles.cardTitle}>개발자 도구</h4>
            <p className={styles.cardDescription}>
              Expo Go로 빠르게 시작하고, 네이티브 변경이 필요한 앱에는
              Expo 도구를 추가하는 모듈인 expo-dev-client로 이어가세요.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Framework;
