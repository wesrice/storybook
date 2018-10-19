import React from 'react';
// import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import {
  text,
  // number,
  // boolean,
  // color,
  // select,
  // radios,
  // array,
  // date,
  // button,
  // object,
  // files,
} from '@storybook/addon-knobs2';

storiesOf('new knobs', module)
  .add('shiny', ({ className }) => <div className={className} />, {
    className: text('initial'),
  })
  .add(
    'cool',
    ({ className, change }) => (
      <input
        className={className}
        initialValue={className}
        onChange={e => change({ className: e.target.value })}
      />
    ),
    {
      className: text('initial'),
    }
  );
