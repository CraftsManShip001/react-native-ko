/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useState} from 'react';

import Section from '../Section';
import SectionTitle from '../SectionTitle';

import styles from './styles.module.css';

enum VideoId {
  Why = 'wUDeLT6WXnQ',
  Keynote2025 = 'NiYwlvXsBKw',
  Keynote2024 = 'Q5SMmKb7qVI',
  FB2019 = 'NCAY0HIfrwc',
}

function Watch() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <Section>
      <SectionTitle
        title="보고 배우세요"
        description={
          <>
            React 팀의 발표를 보며 React Native를 최대한 활용하는 방법을
            배워보세요.
            <br />
            최신 소식은{' '}
            <a href="https://bsky.app/profile/reactnative.dev">
              Bluesky
            </a>와{' '}
            <a href="https://twitter.com/intent/follow?screen_name=reactnative&region=follow_link">
              X
            </a>
            에서 확인하세요.
          </>
        }
      />
      <div className={styles.videos}>
        <div
          role="button"
          aria-label="재생: Why React Native?"
          className={[
            styles.videoContainer,
            playingId === VideoId.Why
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId(VideoId.Why)}>
          {playingId === VideoId.Why ? (
            <iframe
              src={`https://www.youtube.com/embed/${VideoId.Why}?autoplay=1`}
              title="쉽게 설명하는 React Native"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${VideoId.Why}/maxresdefault.jpg`}
              alt="쉽게 설명하는 React Native"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>왜 React Native인가?</h4>
            <p>1:42</p>
          </div>
        </div>
        <div
          role="button"
          aria-label="재생: React Conf 2025 React Native Keynote"
          className={[
            styles.videoContainer,
            playingId === VideoId.Keynote2025
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId(VideoId.Keynote2025)}>
          {playingId === VideoId.Keynote2025 ? (
            <iframe
              src={`https://www.youtube.com/embed/${VideoId.Keynote2025}?autoplay=1`}
              title="React Conf 2025 React Native Keynote"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${VideoId.Keynote2025}/maxresdefault.jpg`}
              alt="React Conf 2025 React Native Keynote"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>
              React Conf 2025
              <br />
              React Native Keynote
            </h4>
            <p>55:13</p>
          </div>
        </div>
        <div
          role="button"
          aria-label="재생: React Conf 2024 React Native Keynote"
          className={[
            styles.videoContainer,
            playingId === VideoId.Keynote2024
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId(VideoId.Keynote2024)}>
          {playingId === VideoId.Keynote2024 ? (
            <iframe
              src={`https://www.youtube.com/embed/${VideoId.Keynote2024}?autoplay=1`}
              title="React Conf 2024 React Native Keynote"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${VideoId.Keynote2024}/maxresdefault.jpg`}
              alt="React Conf 2024 React Native Keynote"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>
              React Conf 2024
              <br />
              React Native Keynote
            </h4>
            <p>55:14</p>
          </div>
        </div>
        <div
          role="button"
          aria-label="재생: FB 2019: Mobile innovation with React Native"
          className={[
            styles.videoContainer,
            playingId === VideoId.FB2019
              ? styles.videoContainerPlaying
              : styles.videoContainerHover,
          ].join(' ')}
          onClick={() => setPlayingId(VideoId.FB2019)}>
          {playingId === VideoId.FB2019 ? (
            <iframe
              src={`https://www.youtube.com/embed/${VideoId.FB2019}?autoplay=1`}
              title="React Native, ComponentKit, Litho로 모바일 혁신"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          ) : (
            <img
              src={`https://img.youtube.com/vi/${VideoId.FB2019}/maxresdefault.jpg`}
              alt="React Native, ComponentKit, Litho로 모바일 혁신"
              className={styles.video}
            />
          )}
          <div className={styles.videoInfo}>
            <h4>
              FB 2019
              <br />
              React Native로 모바일 혁신
            </h4>
            <p>45:29</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Watch;
