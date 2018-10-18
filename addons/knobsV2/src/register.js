import React from 'react';
import addons, { types } from '@storybook/addons';

import { ADDON_ID, PANEL_ID } from './constants';
import Panel from './Panel';

function init() {
  addons.register(ADDON_ID, api => {
    const channel = addons.getChannel();

    addons.add(PANEL_ID, {
      type: types.PANEL,
      title: 'Knobs V2',
      // eslint-disable-next-line react/prop-types
      render: ({ active }) => (active ? <Panel channel={channel} api={api} /> : null),
    });
  });
}

export { init };
