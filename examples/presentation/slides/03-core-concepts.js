import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '../components/heading';

storiesOf('Slides|core', module).add('concepts', () => (
  <Fragment>
    <Heading type="main">Abstraction, Isolation, Autonomy</Heading>
  </Fragment>
));

storiesOf('Slides|core', module)
  .add('abstraction', () => (
    <Fragment>
      <Heading type="main">Good abstraction is the 🔑 to good software</Heading>
      <p>
        If you create abstractions where you shouldn't you'll get <strong>complexity</strong>
      </p>
      <p>
        If you don't create abstractions where you should you'll get <strong>complexity</strong>
      </p>
    </Fragment>
  ))
  .add('knight', () => (
    <Fragment>
      <Heading type="main">If developers are like 🤺 fighting complexity...</Heading>
    </Fragment>
  ))
  .add('dragon', () => (
    <Fragment>
      <Heading type="main">Complexity is the 🐉</Heading>
      <p>If we fail to ⚔️ it effectively, we feed it.</p>
    </Fragment>
  ))
  .add('understanding', () => (
    <Fragment>
      <Heading type="main">To create correct abstractions</Heading>
      <p>We must understand the problem well</p>
    </Fragment>
  ))
  .add('art of war', () => (
    <Fragment>
      <blockquote>
        “If you know the enemy and know yourself, you need not fear the result of a hundred battles.
        <br />
        If you know yourself but not the enemy, for every victory gained you will also suffer a
        defeat.
        <br />
        If you know neither the enemy nor yourself, you will succumb in every battle.”
      </blockquote>
      <p>― Sun Tzu, The Art of War</p>
    </Fragment>
  ));

storiesOf('Slides|core', module)
  .add('isolation', () => (
    <Fragment>
      <Heading type="main">Isolation is the possible result of good abstraction</Heading>
    </Fragment>
  ))
  .add('swappable', () => (
    <Fragment>
      <Heading type="main">An isolated component can be swapped by a similar one 🔃</Heading>
    </Fragment>
  ))
  .add('API', () => (
    <Fragment>
      <Heading type="main">The API of your component</Heading>
      <p>Isolated pieces will have some API for communication</p>
      <p>
        It's this api, <em>the props if you will,</em> that will determine if your component will be
        😍 or 🤬.
      </p>
    </Fragment>
  ))
  .add('how much', () => (
    <Fragment>
      <Heading type="main">The trade off in isolation ⚖️</Heading>
      <p>If your component isolates too much...</p>
      <p>
        The API will either have to grow to compensate for it's multitude of use-cases; increasing
        the <strong>complexity</strong>.
      </p>
    </Fragment>
  ));

storiesOf('Slides|core', module)
  .add('conclusion', () => (
    <Fragment>
      <p>When components:</p>
      <ul>
        <li>Abstract the right amount of stuff</li>
        <li>Isolate enough but to too much</li>
        <li>Have a good API to do things</li>
      </ul>
      <p>then...</p>
    </Fragment>
  ))
  .add('less changes', () => (
    <Fragment>
      <Heading type="main">They won't have to change as often</Heading>
      <p>And when they do, their use-cases are limited 👌</p>
    </Fragment>
  ))
  .add('re-use', () => (
    <Fragment>
      <Heading type="main">It's easier to re-use 👏</Heading>
    </Fragment>
  ))
  .add('autonomy', () => (
    <Fragment>
      <Heading type="main">Autonomy</Heading>
    </Fragment>
  ));
