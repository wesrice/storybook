import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import { SyntaxHighlighter } from '@storybook/components';

import Heading from '../components/heading';
import Hr from '../components/hr';
import { CodePage, TitlePage } from '../components/page';
import Switcher, { Expander } from '../components/switcher';
import * as Carousels from '../components/accordion/implementations';
import { AccordionButton, Indicator } from '../components/accordion/common';

const { items } = Carousels;

storiesOf('Slides|state separation', module)
  .add('design an api', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        Design an API for your component so encapsulates the UI Pattern
      </Heading>
      <Hr />
      <Heading type="sub" mods={['centered']}>
        no more, no less.
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
        A <em style={{ color: 'hotpink' }}>`/(carousel|tabs|accordion)/`</em> component
      </Heading>
      <Heading type="main" mods={['centered']}>
        should should toggle activity of list-items/children
      </Heading>
    </TitlePage>
  ))
  .add('switcher intro', () => (
    <CodePage
      scope={{
        Switcher,
        Fragment,
        VerticalExpander: Expander,
        Trigger: AccordionButton,
        Indicator,
        items,
      }}
    >{`
      <Switcher initial={[1,0,0]}>
        {({ actives, toggle }) => (
          <Fragment>
            {items.map((item, index) => (
              <VerticalExpander key={item.title} active={actives[index]} onClick={() => toggle(index)}>
                <Trigger>
                  <Indicator>{actives[index] ? '➕' : '➖'}</Indicator>
                  {item.title}
                </Trigger>
                <Fragment>{item.contents}</Fragment>
              </VerticalExpander>
            ))}
          </Fragment>
        )}
      </Switcher>
    `}</CodePage>
  ))
  .add('switcher proof', () => (
    <CodePage
      scope={{
        Switcher,
        Fragment,
        VerticalExpander: Expander,
        Trigger: AccordionButton,
        Indicator,
        items,
      }}
    >{`
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
                  <Trigger>
                    <Indicator>{actives[index] ? '➕' : '➖'}</Indicator>
                    {item.title}
                  </Trigger>
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
