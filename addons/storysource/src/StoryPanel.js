import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@storybook/components';

import { EVENT_ID } from './events';

const getLocationKeys = locationsMap =>
  locationsMap
    ? Array.from(Object.keys(locationsMap)).sort(
        (key1, key2) => locationsMap[key1].startLoc.line - locationsMap[key2].startLoc.line
      )
    : [];

export default class StoryPanel extends Component {
  state = { source: '// 🦄 Looking for it, hold on tight' };

  componentDidMount() {
    this.mounted = true;
    const { channel } = this.props;

    channel.on(EVENT_ID, this.listener);
  }

  componentDidUpdate() {
    if (this.selectedStoryRef) {
      this.selectedStoryRef.scrollIntoView();
    }
  }

  componentWillUnmount() {
    const { channel } = this.props;

    channel.removeListener(EVENT_ID, this.listener);
  }

  setSelectedStoryRef = ref => {
    this.selectedStoryRef = ref;
  };

  listener = ({ source, currentLocation, locationsMap }) => {
    const locationsKeys = getLocationKeys(locationsMap);

    this.setState({
      source,
      currentLocation,
      locationsMap, // eslint-disable-line react/no-unused-state
      locationsKeys, // eslint-disable-line react/no-unused-state
    });
  };

  updateSource = ({ newSource }) => {
    const {
      source,
      currentLocation: {
        startLoc: { line: startLocLine, col: startLocCol },
        endLoc: { line: endLocLine, col: endLocCol },
      },
    } = this.state;
    const sourceLines = source.split('\n');
    const newFileSource =
      sourceLines.slice(0, Math.max(0, startLocLine - 1)).join('\n') +
      (startLocLine === 0 ? '' : '\n') +
      sourceLines[startLocLine - 1].substring(0, startLocCol) +
      newSource.substring(startLocCol, newSource.lastIndexOf(')') + 1) +
      (newSource.endsWith('\n') ? '\n' : '') +
      sourceLines[endLocLine - 1].substring(endLocCol + 1) +
      sourceLines.slice(Math.min(sourceLines.length - 1, endLocLine)).join('\n');

    const newEndLocLine = startLocLine + newSource.split('\n').length - 1;
    const newEndLocCol = newSource.split('\n').slice(-1).length;

    this.setState({
      source: newFileSource,
      currentLocation: {
        startLoc: { col: startLocCol, line: startLocLine },
        endLoc: { col: newEndLocCol, line: newEndLocLine },
      },
    });
  };

  changePosition = (e, editor, monaco) => {
    const {
      currentLocation: { startLoc, endLoc },
    } = this.state;

    editor.deltaDecorations(
      [],
      [
        {
          range: new monaco.Range(startLoc.col, startLoc.line, endLoc.col, endLoc.line),
          options: { isWholeLine: true, linesDecorationsClassName: 'breakpointStyle' },
        },
      ]
    );

    if (
      e.position.lineNumber < startLoc.line ||
      (e.position.lineNumber === startLoc.line && e.position.column < startLoc.col)
    )
      editor.setPosition({
        lineNumber: startLoc.line,
        column: startLoc.col,
      });
    if (
      e.position.lineNumber > endLoc.line ||
      (e.position.lineNumber === endLoc.line && e.position.column > endLoc.col)
    )
      editor.setPosition({
        lineNumber: endLoc.line,
        column: endLoc.col,
      });
  };

  render = () => {
    const { active } = this.props;
    const { source } = this.state;

    return active ? <Editor source={source} changePosition={this.changePosition} /> : null;
  };
}

StoryPanel.propTypes = {
  active: PropTypes.bool.isRequired,
  api: PropTypes.shape({
    selectStory: PropTypes.func.isRequired,
  }).isRequired,
  channel: PropTypes.shape({
    emit: PropTypes.func,
    on: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
};
