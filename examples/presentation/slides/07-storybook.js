import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Logo } from '@storybook/components';

import { TitlePage } from '../components/page';
import Heading from '../components/heading';

storiesOf('Slides|storybook', module)
  .addDecorator(
    withKnobs({
      escapeHTML: false,
    })
  )
  .add('embrace components', () => (
    <TitlePage>
      <Heading type="sub" mods={['centered']}>
        Key take away
      </Heading>
      <Heading type="main" mods={['centered']}>
        Embrace using components beyond the visual 🤗
      </Heading>
    </TitlePage>
  ))
  .add('too many components', () => (
    <TitlePage>
      <Heading type="sub" mods={['centered']}>
        problem:
      </Heading>
      <Heading type="main" mods={['centered']}>
        so many components! 🤯
      </Heading>
    </TitlePage>
  ))
  .add('enter storybook', () => {
    const bool = boolean('colored', true);
    // const bool = true;
    return (
      <TitlePage>
        <Heading type="sub" mods={['centered']}>
          solution:
        </Heading>
        {bool ? <Logo colored /> : <Logo />}
      </TitlePage>
    );
  });
