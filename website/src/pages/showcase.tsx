/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import type users from '../../showcase.json';
import IconExternalLink from '../theme/Icon/ExternalLink';
import ThemedImage from '@theme/ThemedImage';

type UserAppType = (typeof users)[keyof typeof users][number];

const renderApp = (app: UserAppType, i: number) => (
  <AppBox app={app} key={`app-${app.name}-${i}`} />
);

function Section({
  children,
  background = 'light',
}: React.PropsWithChildren<{background?: 'light' | 'dark'}>) {
  return <section className={`Section ${background}`}>{children}</section>;
}

const AppBox = ({app}: {app: UserAppType}) => {
  const imgSource = useBaseUrl(
    app.icon.startsWith('http') ? app.icon : 'img/showcase/' + app.icon
  );

  return (
    <div className="showcase">
      <div className="iconBox">
        <img src={imgSource} alt={app.name} className="iconBackground" />
        <img src={imgSource} alt={app.name} className="icon" />
      </div>
      <div className="showcaseContent">
        <div>
          <h3>{app.name}</h3>
          {renderLinks(app)}
        </div>
        {'infoTitle' in app && app.infoLink && (
          <a
            className="articleButton"
            href={app.infoLink}
            target="_blank"
            title={app.infoTitle}>
            더 알아보기{' '}
            <IconExternalLink width={12} height={12} style={{opacity: 0.5}} />
          </a>
        )}
      </div>
    </div>
  );
};

const renderLinks = (app: UserAppType) => {
  const links = [
    app.linkAppStore ? (
      <a key="ios" href={app.linkAppStore} target="_blank">
        iOS
      </a>
    ) : null,
    app.linkPlayStore ? (
      <a key="android" href={app.linkPlayStore} target="_blank">
        Android
      </a>
    ) : null,
    'linkDesktop' in app && app.linkDesktop ? (
      <a key="desktop" href={app.linkDesktop} target="_blank">
        Desktop
      </a>
    ) : null,
    'linkMetaQuest' in app && app.linkMetaQuest ? (
      <a key="quest" href={app.linkMetaQuest} target="_blank">
        Meta&nbsp;Quest
      </a>
    ) : null,
  ]
    .filter(Boolean)
    .flatMap((link, i) =>
      i === 0 ? [link] : [<span key={i}> • </span>, link]
    );

  if (links.length === 0) {
    return <p />;
  }

  return <p className="showcaseLinks">{links}</p>;
};

const randomizeApps = apps =>
  [...apps].filter(app => !app.group).sort(() => 0.5 - Math.random());

const Showcase = () => {
  const {siteConfig} = useDocusaurusContext();
  const {meta, microsoft, shopify, wix, amazon, others} = siteConfig
    .customFields.users as typeof users;
  const [pinnedRandomizedApps, setPinnedRandomizedApps] = useState([]);
  const [randomizedApps, setRandomizedApps] = useState([]);

  useEffect(() => {
    setRandomizedApps(randomizeApps(others.filter(app => !app.pinned)));
    setPinnedRandomizedApps(randomizeApps(others.filter(app => app.pinned)));
  }, []);

  return (
    <Layout
      title="쇼케이스"
      description="수천 개의 앱이 React Native를 사용하고 있습니다. 이 앱들을 확인해 보세요!">
      <Section background="dark">
        <div className="sectionContainer headerContainer">
          <h1>
            누가 <span>React Native</span>를 사용하나요?
          </h1>
          <p>
            Fortune 500대 기업부터 주목받는 스타트업까지, 수천 개의 앱이 React Native를 사용하고 있습니다. React Native로 무엇을 만들 수 있는지 궁금하다면, 이 앱들을 확인해 보세요!
          </p>
        </div>
      </Section>
      <Section>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Meta logo"
              width={140}
              sources={{
                light: useBaseUrl('/img/showcase/meta_positive_primary.svg'),
                dark: useBaseUrl('/img/showcase/meta_negative_primary.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            React Native는 Facebook Marketplace, Messenger Desktop, Ads Manager부터 Meta Quest 앱까지, Meta의 제품 생태계 내 모바일·웹·데스크톱 경험을 만들어가고 있습니다.
          </p>
          <div className="logos">{meta.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Microsoft logo"
              width={180}
              sources={{
                light: useBaseUrl('/img/showcase/microsoft-logo-gray.png'),
                dark: useBaseUrl('/img/showcase/microsoft-logo-white.png'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Microsoft는 React Native의 강점을 활용해 잘 알려진 여러 앱에서 뛰어난 사용자 경험을 제공하고 있습니다.
            <br />
            Microsoft는 모바일 플랫폼에 그치지 않고 데스크톱도 React Native로 지원합니다! React Native Windows 및 macOS에 대한 자세한 내용은{' '}
            <a
              href="https://microsoft.github.io/react-native-windows/resources-showcase"
              target="_blank">
              전용 쇼케이스
            </a>{' '}
            에서 확인하세요.
          </p>
          <div className="logos">{microsoft.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Amazon logo"
              width={140}
              sources={{
                light: useBaseUrl('/img/showcase/amazon_logo_lightbg.png'),
                dark: useBaseUrl('/img/showcase/amazon_logo_darkbg.png'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Amazon은 2016년부터 React Native를 활용해 인기 있는 모바일 앱에 새로운 기능을 빠르게 제공해 왔습니다. 또한 Kindle 전자책 단말기처럼 고객에게 사랑받는 기기 지원에도 React Native를 사용하고 있습니다.
          </p>
          <div className="logos">{amazon.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Shopify logo"
              width={160}
              sources={{
                light: useBaseUrl('/img/showcase/shopify_logo_whitebg.svg'),
                dark: useBaseUrl('/img/showcase/shopify_logo_darkbg.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Shopify의 모든 모바일 앱은 React Native로 제작되었습니다. Shopify의 React Native 개발에 대한 자세한 내용은{' '}
            <a href="https://shopify.engineering/topics/mobile" target="_blank">
              블로그
            </a>
            에서 확인하세요.
          </p>
          <div className="logos">{shopify.map(renderApp)}</div>
        </div>
        <div className="showcaseSection">
          <h2 className="withLogo">
            <ThemedImage
              alt="Wix logo"
              width={80}
              sources={{
                light: useBaseUrl('/img/showcase/wix_logo_lightbg.svg'),
                dark: useBaseUrl('/img/showcase/wix_logo_darkbg.svg'),
              }}
            />
          </h2>
          <p className="showcaseSectionDescription">
            Wix는 세계에서 가장 큰 React Native 코드베이스 중 하나를 보유하며 개발 커뮤니티와 오랜 역사를 함께해 왔고 다양한 오픈 소스 프로젝트를 관리하고 있습니다. Wix는 React Native의 초기 도입자로, 전체 애플리케이션 제품군에 React Native를 활용하고 있습니다.
          </p>
          <div className="logos">{wix.map(renderApp)}</div>
        </div>
        <div className="showcaseSection showcaseCustomers">
          <h2>사용자 쇼케이스</h2>
          <div className="logos">
            {pinnedRandomizedApps.map(renderApp)}
            {randomizedApps.map(renderApp)}
          </div>
        </div>
      </Section>
      <Section background="dark">
        <div className="sectionContainer footerContainer">
          <a
            className="formButton"
            href="https://forms.gle/BdNf3v5hemV9D5c86"
            target="_blank">
            이 양식을 작성하여 쇼케이스에 신청하세요
          </a>
          <p>
            엄선된 오픈 소스 React Native 앱 목록은{' '}
            <a
              key="demo-apps"
              href="https://github.com/ReactNativeNews/React-Native-Apps">
              이 목록
            </a>
            을 확인해 보세요. <a href="https://infinite.red">Infinite Red</a>에서 관리하고 있습니다.
          </p>
        </div>
      </Section>
    </Layout>
  );
};

export default Showcase;
