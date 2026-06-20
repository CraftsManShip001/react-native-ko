/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import Home from '../components/Home';

const Index = () => {
  return (
    <Layout
      description="React를 사용하여 Android, iOS 등 다양한 플랫폼의 네이티브 앱을 개발하는 프레임워크"
      wrapperClassName="homepage">
      <Head>
        <title>React Native · 한 번 배우면, 어디서나.</title>
        <meta
          property="og:title"
          content="React Native · 한 번 배우면, 어디서나."
        />
        <meta
          property="twitter:title"
          content="React Native · 한 번 배우면, 어디서나."
        />
      </Head>
      <Home />
    </Layout>
  );
};

export default Index;
