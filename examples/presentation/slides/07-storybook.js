import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import {
  withKnobs,
  withKnobsOptions,
  text,
  number,
  boolean,
  color,
  select,
  radios,
  array,
  date,
  button,
  object,
  files,
} from '@storybook/addon-knobs';

import { Logo } from '@storybook/components';
import Heading from '../components/heading';

storiesOf('Slides|storybook', module)
  .addDecorator(
    withKnobs({
      escapeHTML: false,
    })
  )
  .add('embrace components', () => (
    <Fragment>
      <p>Key take away</p>
      <Heading type="main">Embrace using components beyond the visual 🤗</Heading>
    </Fragment>
  ))
  .add('too many components', () => (
    <Fragment>
      <p>problem:</p>
      <Heading type="main">so many components! 🤯</Heading>
    </Fragment>
  ))
  .add('enter storybook', () => {
    const bool = boolean('colored', true);
    // const bool = true;
    return (
      <Fragment>
        <p>solution:</p>
        {bool ? <Logo colored /> : <Logo />}
      </Fragment>
    );
  });
