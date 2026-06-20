/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ThemedImage from '@theme/ThemedImage';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

function Native() {
  return (
    <Section>
      <SectionTitle
        title="모두를 위한 네이티브 개발"
        description={
          <>
            React Native로 진정한 네이티브 앱을 만들 수 있으며, 사용자 경험을
            타협하지 않습니다. 플랫폼에 구애받지 않는 핵심 네이티브 컴포넌트인{' '}
            <code>View</code>, <code>Text</code>, <code>Image</code> 등을
            제공하며, 이는 각 플랫폼의 네이티브 UI 빌딩 블록에 직접 매핑됩니다.
          </>
        }
      />
      <ThemedImage
        sources={{
          light: '/img/homepage/dissection.png',
          dark: '/img/homepage/dissection-dark.png',
        }}
        className={styles.flyoutIllustration}
        alt="View, ScrollView 등 네이티브 요소를 가리키는 React Native UI"
      />
    </Section>
  );
}

export default Native;
