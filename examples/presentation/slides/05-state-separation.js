import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import { SyntaxHighlighter } from '@storybook/components';

import Heading from '../components/heading';
import { CodePage } from '../components/page';
import Switcher, { Expander } from '../components/switcher';
import * as Carousels from '../components/accordion/implementations';

const { items } = Carousels;

storiesOf('Slides|state separation', module)
  .add('design an api', () => (
    <Fragment>
      <Heading type="main">
        Design an API for your component so encapsulates the UI Pattern, no more, no less.
      </Heading>
    </Fragment>
  ))
  .add('know the pattern', () => (
    <Fragment>
      <p>remember:</p>
      <Heading type="main">to abstract correctly you must understand the problem well 🐉</Heading>
    </Fragment>
  ))
  .add('the definition', () => (
    <Fragment>
      <Heading type="main">
        A `/(carousel|tabs|accordion)/` component should should toggle activity of
        list-items/children
      </Heading>
    </Fragment>
  ))
  .add('switcher intro', () => (
    <CodePage scope={{ Switcher, Fragment, VerticalExpander: Expander, items }}>{`
      <Switcher initial={[1,0,0]}>
        {({ actives, toggle }) => (
          <Fragment>
            {items.map((item, index) => (
              <VerticalExpander key={item.title} active={actives[index]} onClick={() => toggle(index)}>
                <Fragment>{item.title}</Fragment>
                <Fragment>{item.contents}</Fragment>
              </VerticalExpander>
            ))}
          </Fragment>
        )}
      </Switcher>
    `}</CodePage>
  ))
  .add('switcher proof', () => (
    <CodePage scope={{ Switcher, Fragment, VerticalExpander: Expander, items }}>{`
      <Switcher initial={[1,0,0]}>
        {({ actives, setActives }) => {
          const set = index => {
            const l = actives.slice().fill(0);
            l[index] = 1;
            setActives(l);
          };

          return (
            <Fragment>
              {items.map((item, index) => (
                <VerticalExpander key={item.title} active={actives[index]} onClick={() => set(index)}>
                  <Fragment>{item.title}</Fragment>
                  <Fragment>{item.contents}</Fragment>
                </VerticalExpander>
              ))}
            </Fragment>
          )
        }}
      </Switcher>
    `}</CodePage>
  ))
  .add('final switcher', () => (
    <Fragment>
      <SyntaxHighlighter copyable={false}>{`
        import React, { useState } from 'react';

        const Switcher = ({ initial, children }) => {
          const [actives, setActives] = useState(initial);
          return children({ actives, setActives });
        };
      `}</SyntaxHighlighter>
    </Fragment>
  ));
