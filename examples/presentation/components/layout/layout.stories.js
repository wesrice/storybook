import React from 'react';
import { storiesOf } from '@storybook/react';

import SideBySide from './side-by-side';
import WrappingInline from './wrapping-inline';
import Placeholder from './placeholder';

storiesOf('Components|Layout', module)
  .add('side by side', () => (
    <SideBySide>
      <Placeholder color="hotpink">content</Placeholder>
      <Placeholder color="deepskyblue">content</Placeholder>
    </SideBySide>
  ))
  .add('wrapping line', () => (
    <WrappingInline>
      <Placeholder color="hotpink">content</Placeholder>
      <Placeholder color="deepskyblue">content</Placeholder>
      <Placeholder color="orangered">content</Placeholder>
      <Placeholder color="deeppink">content</Placeholder>
    </WrappingInline>
  ))
  .add('wrapping line aligned', () => (
    <WrappingInline align="center">
      <Placeholder color="hotpink">content</Placeholder>
      <Placeholder color="deepskyblue">content</Placeholder>
      <Placeholder color="orangered">content</Placeholder>
      <Placeholder color="deeppink">content</Placeholder>
    </WrappingInline>
  ));
