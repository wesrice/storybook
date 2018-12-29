import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@storybook/components';
import { document } from 'global';

import { SAVE_FILE_EVENT_ID, STORY_EVENT_ID } from './events';

const getLocationKeys = locationsMap =>
  locationsMap
    ? Array.from(Object.keys(locationsMap)).sort(
        (key1, key2) => locationsMap[key1].startLoc.line - locationsMap[key2].startLoc.line
      )
    : [];

export default class StoryPanel extends Component {
  state = { source: '// 🦄 Looking for it, hold on tight', lineDecorations: [] };

  componentDidMount() {
    this.mounted = true;
    const { channel } = this.props;

    channel.on(STORY_EVENT_ID, this.listener);
  }

  componentDidUpdate() {
    if (this.selectedStoryRef) {
      this.selectedStoryRef.scrollIntoView();
    }
  }

  componentWillUnmount() {
    const { channel } = this.props;

    channel.removeListener(STORY_EVENT_ID, this.listener);
  }

  setSelectedStoryRef = ref => {
    this.selectedStoryRef = ref;
  };

  listener = ({ fileName, source, currentLocation, locationsMap }) => {
    const locationsKeys = getLocationKeys(locationsMap);

    this.setState({
      fileName,
      source,
      currentLocation,
      locationsMap, // eslint-disable-line react/no-unused-state
      locationsKeys, // eslint-disable-line react/no-unused-state
    });
  };

  editorDidMount = (editor, monaco) => {
    editor.addAction({
      id: 'save-the-selected-story-in-source-file',
      label: '🇸 Save the selected story in source file',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
        // chord
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_X, monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S)
      ],
      precondition: null,
      keybindingContext: null,
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: (thisEditor) => {
        const { fileName } = this.state;
        const { channel } = this.props;
        const content = thisEditor.getModel().getValue();
        channel.emit(SAVE_FILE_EVENT_ID, {
          fileName, content
        });
        return null;
      }
    });
  }

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

    if (!this.state.lineDecorations.length){
      const styleSheet = Array.from(document.styleSheets).slice(-1)[0];
      styleSheet.insertRule('.editableLine{background-color: #c6ff0040;}', 0);
    }
    const lineDecorations = editor.deltaDecorations(
      this.state.lineDecorations,
      [
        {
          range: new monaco.Range(startLoc.line, startLoc.col, endLoc.line, endLoc.col),
          options: { isWholeLine: false, inlineClassName: 'editableLine' },
        },
      ]
    )
    if (lineDecorations[0] !== this.state.lineDecorations[0]) this.setState({lineDecorations});

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

    return active ? <Editor source={source}
                            componentDidMount={this.editorDidMount}
                            changePosition={this.changePosition} /> : null;
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
