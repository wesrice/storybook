import React from 'react';
import { storiesOf } from '@storybook/react';

import { TitlePage } from '../components/page';
import Heading from '../components/heading';
import Hr from '../components/hr';

storiesOf('Slides|intro', module)
  .add('start', () => (
    <TitlePage>
      <Heading type="main">Writing better components using Storybook</Heading>
    </TitlePage>
  ))
  .add('title', () => (
    <TitlePage>
      <Heading type="main">Writing apps is hard 😞</Heading>
    </TitlePage>
  ))
  .add('questions - estimation', () => (
    <TitlePage>
      <Heading type="main">How often are your estimations correct?</Heading>
    </TitlePage>
  ))
  .add('questions - decomposing', () => (
    <TitlePage>
      <Heading type="main">
        Is de-composing your big application into smaller applications to answer?
      </Heading>
    </TitlePage>
  ))
  .add('the danger', () => (
    <TitlePage>
      <Heading type="main">Distributed monolith 😱</Heading>
    </TitlePage>
  ))
  .add('questions - decomposing2', () => (
    <TitlePage>
      <Heading type="main">
        Is de-composing your big application into smaller applications to answer? 🤔
      </Heading>
    </TitlePage>
  ))
  .add('yes', () => <Heading type="sub">🎊 yes 🎉</Heading>)
  .add('thank you', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        👋
      </Heading>
      <Heading type="main">Thank you for your time!</Heading>
    </TitlePage>
  ))
  .add('about me', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        👨‍💻
      </Heading>
      <Heading type="section" mods={['centered']}>
        Norbert de Langen
      </Heading>
      <Hr />
      <center>
        <p>Full-time open-source maintainer of Storybook</p>
        <p>&</p>
        <p>Developer Advocate at Chroma</p>
        <p>&</p>
        <p>Farther, Husband</p>
        <p>&</p>
        <p>I have no idea what I'm doing</p>
      </center>
      <Hr />
      <center>
        <p>
          🦆 <a href="https://twitter.com/ndelangen">@norbertdelangen</a>
        </p>
        <p>
          💌 <a href="mailto:ndelangen@me.com">ndelangen@me.com</a>
        </p>
      </center>
    </TitlePage>
  ));
