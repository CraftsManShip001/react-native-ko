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
import FoxFact from './FoxFact';

import styles from './styles.module.css';

function Platforms() {
  return (
    <Section>
      <SectionTitle
        title="React로 Android, iOS 등 다양한 플랫폼의 네이티브 앱을 만드세요"
        description={
          <>
            React Native는 React 개발의 장점을 네이티브 개발에 그대로
            가져옵니다.
            <br />
            사용자 인터페이스 구축을 위한 최고 수준의 JavaScript 라이브러리입니다.
          </>
        }
      />
      <div className={styles.platformsContainer}>
        <div className={styles.featureContainer}>
          <div className={styles.codeEditor}>
            <div className={styles.codeEditorTitleContainer}>index.js</div>
            <div className={styles.codeEditorContentContainer}>
              <pre>
                <span style={{color: 'var(--home-code-red)'}}>function</span>{' '}
                <span style={{color: 'var(--home-code-purple'}}>
                  HomeScreen
                </span>
                {`()`}
                {` {`} <br />
                <span
                  style={{color: 'var(--home-code-red)'}}>{`  return `}</span>
                {`(`} <br />
                {`    <`}
                <span style={{color: 'var(--home-code-green)'}}>View</span>
                {`>`} <br />
                {`      <`}
                <span style={{color: 'var(--home-code-green)'}}>{`Text`}</span>
                {`>`} Hello World 👋 🌍!{`</`}
                <span style={{color: 'var(--home-code-green)'}}>{`Text`}</span>
                {`>`}
                <br />
                {`    </`}
                <span style={{color: 'var(--home-code-green)'}}>View</span>
                {`>`} <br />
                {`  );`} <br />
                {`}`}
              </pre>
            </div>
          </div>
          <div className={styles.deviceContainer}>
            <ThemedImage
              sources={{
                light: useBaseUrl('/img/homepage/devices.png'),
                dark: useBaseUrl('/img/homepage/devices-dark.png'),
              }}
              className={styles.devices}
              alt="Android 기기와 iOS 기기"
            />
          </div>
        </div>
      </div>
      <div className={styles.foxFactContainer}>
        <FoxFact className={styles.fox} />
        <p>
          <strong>JavaScript로 작성하고, 네이티브 코드로 렌더링됩니다.</strong>{' '}
          React 기본 요소가 네이티브 플랫폼 UI로 렌더링되므로, 여러분의 앱은
          다른 앱과 동일한 네이티브 플랫폼 API를 사용합니다.
        </p>
      </div>
    </Section>
  );
}

export default Platforms;
