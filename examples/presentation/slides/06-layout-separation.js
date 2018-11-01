import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '../components/heading';
import { CodePage } from '../components/page';
import Placeholder from '../components/layout/placeholder';
import Layout1 from '../components/layout/layout1';

storiesOf('Slides|layout separation', module)
  .add('encapsulation again', () => (
    <Fragment>
      <Heading type="main">Encapsulates the UI Pattern, no more, no less.</Heading>
    </Fragment>
  ))
  .add('layout as a pattern', () => (
    <Fragment>
      <Heading type="main">Sometimes a UI pattern can be as simple as "I want this layout"</Heading>
    </Fragment>
  ))
  .add('layout as a pattern', () => (
    <Fragment>
      <CodePage scope={{ Layout: Layout1, Placeholder }}>{`
        <Layout>
          <Placeholder color="hotpink">content</Placeholder>
          <Placeholder color="deepskyblue">content</Placeholder>
        </Layout>
      `}</CodePage>
    </Fragment>
  ));
