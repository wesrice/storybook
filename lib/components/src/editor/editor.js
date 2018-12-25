import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import PropTypes from 'prop-types';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
      changePosition: props.changePosition,
      onChange: props.onChange || this.onChange,
    };
    this.editorDidMount = this.editorDidMount.bind(this);
  }

  componentWillReceiveProps({ source, changePosition } = {}) {
    // , nextContext) {
    const { source: currentSource, changePosition: currentChangePosition } = this.state;
    this.setState({
      source: source || currentSource,
      changePosition: changePosition || currentChangePosition || (() => {}),
    });
  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e); // eslint-disable-line no-console
  };

  editorDidMount = (editor, monaco) => {
    const { changePosition } = this.state;
    editor.onDidChangeCursorPosition(e => changePosition(e, editor, monaco));
    editor.focus();
  };

  render() {
    const { source, onChange } = this.state;

    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <MonacoEditor
        width="100%"
        height="250"
        language="javascript"
        theme="vs-dark"
        value={source}
        options={options}
        onChange={onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}

Editor.propTypes = {
  source: PropTypes.string,
  changePosition: PropTypes.func,
  onChange: PropTypes.func,
};

Editor.defaultProps = {
  source: '// no snippet found',
  changePosition: () => {},
  onChange: null,
};
