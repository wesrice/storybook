import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '../components/heading';
import { CodePage, TitlePage } from '../components/page';
import Placeholder from '../components/layout/placeholder';
import SideBySide from '../components/layout/side-by-side';

storiesOf('Slides|layout separation', module)
  .add('encapsulation again', () => (
    <TitlePage>
      <Heading type="main">Encapsulates the UI Pattern, no more, no less.</Heading>
    </TitlePage>
  ))
  .add('layout as a pattern', () => (
    <TitlePage>
      <Heading type="main">Sometimes a UI pattern can be as simple as "I want this layout"</Heading>
    </TitlePage>
  ))
  .add('layout as a pattern', () => (
    <CodePage scope={{ Layout: SideBySide, Placeholder }}>{`
      <Layout>
        <Placeholder color="hotpink">content</Placeholder>
        <Placeholder color="deepskyblue">content</Placeholder>
      </Layout>
    `}</CodePage>
  ));
