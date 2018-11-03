import React from 'react';
import { storiesOf } from '@storybook/react';

import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import { Logo } from '@storybook/components';
import ChromaticLogo from '../other/chromatic';

import { TitlePage } from '../components/page';
import Heading from '../components/heading';
import Hr from '../components/hr';

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
      <Hr />
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
      <Hr />
      <Heading type="main" mods={['centered']}>
        So many components! 🤯
      </Heading>
    </TitlePage>
  ))
  .add('enter storybook', () => {
    const bool = boolean('colored', true);
    const width = text('width', '50vw');
    return (
      <TitlePage>
        <Heading type="sub" mods={['centered']}>
          solution:
        </Heading>
        {bool ? <Logo colored width={width} /> : <Logo width={width} />}
      </TitlePage>
    );
  })
  .add('add addons', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        Add your own addons
      </Heading>
    </TitlePage>
  ))
  .add('add tests', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        Get all stories snapshotted
      </Heading>
    </TitlePage>
  ))
  .add('add integration', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        Add visual review
      </Heading>
      <ChromaticLogo />
    </TitlePage>
  ))
  .add('add your own features', () => (
    <TitlePage>
      <center>
        <Logo colored width="200" />
      </center>
      <Heading type="sub" mods={['centered']}>
        is open source
      </Heading>
      <Hr />
      <Heading type="main" mods={['centered']}>
        We welcome your help
      </Heading>
    </TitlePage>
  ))
  .add('communities', () => (
    <TitlePage>
      <center>
        <Logo colored width="200" />
      </center>
      <Heading type="sub" mods={['centered']}>
        we support many frameworks
      </Heading>
      <Hr />
      <Heading type="main" mods={['centered']}>
        We're trying to build a tool for all UI developers
      </Heading>
      <Hr />
      <Heading type="sub" mods={['centered']}>
        and accessible for non-technical team members
      </Heading>
    </TitlePage>
  ));
