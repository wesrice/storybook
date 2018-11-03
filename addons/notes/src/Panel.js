import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { SyntaxHighlighter, Placeholder } from '@storybook/components';
import Markdown from 'markdown-to-jsx';
import Events from '@storybook/core-events';
import { EVENT_ID } from './shared';

const Panel = styled.div({
  padding: 10,
  boxSizing: 'border-box',
  width: '100%',
});

const blockflow = {
  padding: 0,
  margin: 0,
  marginBottom: 10,
  '&:last-child': {
    marginBottom: 0,
  },
};

const Separator = styled.hr(blockflow, {
  border: '0 none',
  borderBottom: '1px dashed silver',
});

const Table = styled.table(blockflow, {
  margin: 0,
  padding: 0,
  borderCollapse: 'collapse',
  width: '100%',

  '& thead': {
    background: 'silver',
  },

  '& th': {
    textAlign: 'left',
  },

  '& tr:nth-child(odd) > td, & tr:nth-child(odd) > th': {
    background: 'rgba(0,0,0,0.1)',
  },

  '& td, & th': {
    padding: '2px 10px',
    borderRight: '1px solid rgba(0,0,0,0.1)',
  },
  '& td:last-child, & th:last-child': {
    borderRight: '0 none',
    padding: '2px 10px',
    font: 'inherit',
    color: 'inherit',
    lineHeight: 'inherit',
    fontSize: 'inherit',
  },
});

const BlockQuote = styled.blockquote(blockflow, {
  padding: 0,
  marginLeft: 10,
  borderLeft: '4px solid silver',
  paddingLeft: 10,
});

const P = styled.p(blockflow);
const H1 = styled.h1(blockflow);
const H2 = styled.h2(blockflow, { marginTop: 20 });
const H3 = styled.h3(blockflow, { marginTop: 20 });
const H4 = styled.h4(blockflow, { marginTop: 20 });
const H5 = styled.h5(blockflow, { marginTop: 20 });
const H6 = styled.h6(blockflow, { marginTop: 20 });

const A = styled.a({
  color: '#6DABF5',
});

export default class NotesPanel extends React.Component {
  state = {
    markdown: '',
  };

  // use our SyntaxHighlighter component in place of a <code> element when
  // converting markdown to react elements
  markdownOpts = {
    overrides: {
      code: SyntaxHighlighter,
      hr: () => <Separator />,
      table: props => <Table {...props} />,
      blockquote: props => <BlockQuote {...props} />,
      p: props => <P {...props} />,
      h1: props => <H1 {...props} />,
      h2: props => <H2 {...props} />,
      h3: props => <H3 {...props} />,
      h4: props => <H4 {...props} />,
      h5: props => <H5 {...props} />,
      h6: props => <H6 {...props} />,
      a: props => <A {...props} />,
    },
  };

  componentDidMount() {
    this.mounted = true;
    const { channel } = this.props;

    channel.on(EVENT_ID, this.onAddNotes);
    channel.on(Events.SET_CURRENT_STORY, this.clearNotes);
  }

  componentWillUnmount() {
    this.mounted = false;
    const { channel } = this.props;

    this.stopListeningOnStory();
    channel.removeListener('storybook/notes/add_notes', this.onAddNotes);
  }

  onAddNotes = markdown => {
    this.setState({ markdown });
  };

  clearNotes = () => {
    this.setState({ markdown: '' });
  };

  render() {
    const { active } = this.props;
    const { markdown } = this.state;

    if (!active) {
      return null;
    }

    return markdown ? (
      <Panel className="addon-notes-container">
        <Markdown options={this.markdownOpts}>{markdown}</Markdown>
      </Panel>
    ) : (
      <Placeholder>There is no info/note</Placeholder>
    );
  }
}

NotesPanel.propTypes = {
  active: PropTypes.bool.isRequired,
  channel: PropTypes.shape({
    on: PropTypes.func,
    emit: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
  api: PropTypes.shape({
    onStory: PropTypes.func,
    getQueryParam: PropTypes.func,
    setQueryParams: PropTypes.func,
  }).isRequired,
};
