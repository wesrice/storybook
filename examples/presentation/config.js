import React from 'react';
import styled from '@emotion/styled';
import ThemeProvider from '@emotion/provider';

import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/components';

import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import centered from '@storybook/addon-centered';

import 'react-chromatic/storybook-addon';

const Reset = styled.div(({ theme }) => ({
  fontFamily: theme.mainTextFace,
  color: theme.mainTextColor,
  WebkitFontSmoothing: 'antialiased',
  fontSize: theme.mainTextSize,
}));

addParameters({
  options: {
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: '|',
  },
});
addDecorator(story => <Reset>{story()}</Reset>);
addDecorator(centered);
addDecorator(story => <ThemeProvider theme={themes.normal}>{story()}</ThemeProvider>);

configureViewport({
  viewports: {
    ...INITIAL_VIEWPORTS,
  },
});

function importAll(req) {
  req.keys().forEach(filename => req(filename));
}

function loadStories() {
  let req;

  req = require.context('./components', true, /\.stories\.js$/);
  importAll(req);

  req = require.context('./slides', true, /\.js$/);
  importAll(req);

  req = require.context('./other', true, /\.js$/);
  importAll(req);
}

configure(loadStories, module);
