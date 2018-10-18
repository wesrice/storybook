import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import styled from '@emotion/styled';

// import { ActionBar, ActionButton, Button, Select, Field } from '@storybook/components';

// import { CHANGE, RESET } from './constants';
import * as S from './components';

export default class ViewportPanel extends Component {
  mounted = false;

  componentDidMount() {
    this.mounted = true;
    const { channel, api } = this.props;

    this.unsubscribeFromOnStory = api.onStory(story => {
      console.log(story);
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    const { channel } = this.props;

    this.unsubscribeFromOnStory();
  }

  render() {
    const { active } = this.props;

    return active ? <S.Container>Hi</S.Container> : null;
  }
}
