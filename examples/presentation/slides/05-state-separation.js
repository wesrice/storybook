import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import { SyntaxHighlighter } from '@storybook/components';

import Heading from '../components/heading';
import { CodePage, TitlePage } from '../components/page';
import Switcher, { Expander } from '../components/switcher';
import * as Carousels from '../components/accordion/implementations';

const { items } = Carousels;

storiesOf('Slides|state separation', module)
  .add('design an api', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        Design an API for your component so encapsulates the UI Pattern, no more, no less.
      </Heading>
    </TitlePage>
  ))
  .add('know the pattern', () => (
    <TitlePage>
      <Heading type="sub" mods={['centered']}>
        remember:
      </Heading>
      <Heading type="main" mods={['centered']}>
        to abstract correctly you must understand the problem well 🐉
      </Heading>
    </TitlePage>
  ))
  .add('the definition', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        A `/(carousel|tabs|accordion)/` component should should toggle activity of
        list-items/children
      </Heading>
    </TitlePage>
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
    <TitlePage>
      <SyntaxHighlighter copyable={false}>{`
        import React, { useState } from 'react';

        const Switcher = ({ initial, children }) => {
          const [actives, setActives] = useState(initial);
          return children({ actives, setActives });
        };
      `}</SyntaxHighlighter>
    </TitlePage>
  ));
