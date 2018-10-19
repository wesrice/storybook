import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import styled from '@emotion/styled';

// import { ActionBar, ActionButton, Button, Select, Field } from '@storybook/components';
import { STORY_RENDERED } from '@storybook/core-events';

// import { CHANGE, RESET } from './constants';
import * as S from './components';

export default class ViewportPanel extends Component {
  mounted = false;

  listeners = {
    [STORY_RENDERED]: story => {
      console.log('yeej');
      this.setState({ story });
    },
  };

  state = {
    story: {},
  };

  componentDidMount() {
    this.mounted = true;
    const { channel } = this.props;

    Object.entries(this.listeners).forEach(([k, v]) => {
      debugger;
      channel.addPeerListener(k, v);
    });
  }

  // componentWillUnmount() {
  //   this.mounted = false;
  //   const { channel } = this.props;

  //   this.unsubscribeFromOnStory();
  // }

  render() {
    const { story } = this.state;
    return (
      <S.Container>
        ...
        {story.id}
        ...
      </S.Container>
    );
  }
}
