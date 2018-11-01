import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '../components/heading';

storiesOf('Slides|intro', module)
  .add('start', () => (
    <Fragment>
      <Heading type="main">Writing better components using Storybook</Heading>
    </Fragment>
  ))
  .add('title', () => (
    <Fragment>
      <Heading type="main">Writing apps is hard 😞</Heading>
    </Fragment>
  ))
  .add('questions - estimation', () => (
    <Fragment>
      <Heading type="main">How often are your estimations correct?</Heading>
    </Fragment>
  ))
  .add('questions - decomposing', () => (
    <Fragment>
      <Heading type="main">
        Is de-composing your big application into smaller applications to answer?
      </Heading>
    </Fragment>
  ))
  .add('the danger', () => (
    <Fragment>
      <Heading type="main">Distributed monolith 😱</Heading>
    </Fragment>
  ))
  .add('questions - decomposing2', () => (
    <Fragment>
      <Heading type="main">
        Is de-composing your big application into smaller applications to answer? 🤔
      </Heading>
    </Fragment>
  ))
  .add('yes', () => <div>🎊 yes 🎉</div>)
  .add('thank you', () => (
    <Fragment>
      <p>👋</p>
      <Heading type="main">Thank you for your time!</Heading>
    </Fragment>
  ))
  .add('about me', () => (
    <Fragment>
      <div>Norbert de Langen</div>
      <p>Full-time open-source maintainer of Storybook</p>
      <p>Developer Advocate at Chroma</p>
    </Fragment>
  ));
