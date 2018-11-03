import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';

import { withNotes } from '@storybook/addon-notes';

import SideBySide from './side-by-side';
import WrappingInline from './wrapping-inline';
import Placeholder from './placeholder';

const Holder = styled.div({
  margin: 10,
  border: '1px dashed deepskyblue',
});

// console.log(require('./readme.md'));

storiesOf('Components|Layout', module)
  .addDecorator(withNotes)
  .addParameters({
    notes: { markdown: require('./readme.md') },
  })
  .add('side by side', () => (
    <Holder>
      <SideBySide>
        <Placeholder color="hotpink">content 1</Placeholder>
        <Placeholder color="deepskyblue">content 2</Placeholder>
      </SideBySide>
    </Holder>
  ))
  .add('wrapping line', () => (
    <Holder>
      <WrappingInline>
        <Placeholder inline color="hotpink">
          content 1
        </Placeholder>
        <Placeholder inline color="deepskyblue">
          content 2
        </Placeholder>
        <Placeholder inline color="orangered">
          content 3
        </Placeholder>
        <Placeholder inline color="deeppink">
          content 4
        </Placeholder>
      </WrappingInline>
    </Holder>
  ))
  .add('wrapping line aligned', () => (
    <Holder>
      <WrappingInline align="center">
        <Placeholder inline color="hotpink">
          content 1
        </Placeholder>
        <Placeholder inline color="deepskyblue">
          content 2
        </Placeholder>
        <Placeholder inline color="orangered">
          content 3
        </Placeholder>
        <Placeholder inline color="deeppink">
          content 4
        </Placeholder>
      </WrappingInline>
    </Holder>
  ));
