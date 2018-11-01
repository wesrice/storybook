import React from 'react';
import { storiesOf } from '@storybook/react';

import { CodePage, TitlePage } from '../components/page';
import Heading from '../components/heading';

import * as Carousels from '../components/accordion/implementations';

const { items } = Carousels;

storiesOf('Slides|examples', module)
  .add('react component', () => (
    <TitlePage>
      <Heading type="main">They abstract a section of UI</Heading>
      <p>right? 🙄</p>
    </TitlePage>
  ))
  .add('sort of', () => (
    <TitlePage>
      <p>Sort of 🤷‍</p>
    </TitlePage>
  ))
  .add('definition of a component', () => (
    <TitlePage>
      <Heading type="main">React components should abstract a UI pattern/concept.</Heading>
      <p>This is different from "a section of visible UI".</p>
    </TitlePage>
  ))
  .add('ui concept', () => (
    <TitlePage>
      <Heading type="main">
        UI concepts <strong>can</strong> be visible.
      </Heading>
      <p>This is different from "a section of visible UI".</p>
    </TitlePage>
  ))
  .add('encapsulate', () => (
    <TitlePage>
      A well implemented UI concept should abstract/isolate that particular concept and nothing
      else.
      <br />
      Remember, if you abstract too much, it will likely result in complexity later.
    </TitlePage>
  ));

storiesOf('Slides|examples', module)
  .add('more usecases', () => (
    <CodePage scope={{ Accordion: Carousels.Standard, items }}>{`
      <Accordion items={items} />
    `}</CodePage>
  ))
  .add('moore usecases', () => (
    <CodePage scope={{ Accordion: Carousels.Above, items }}>{`
      <Accordion items={items} above={true} />
    `}</CodePage>
  ))
  .add('mooore usecases', () => (
    <CodePage scope={{ Accordion: Carousels.Right, items }}>{`
      <Accordion items={items} position="right" />
    `}</CodePage>
  ))
  .add('please stop', () => (
    <CodePage scope={{ Accordion: Carousels.SinglePreventClose, items }}>{`
      <Accordion
        items={items}
        position="below"
        single={true}
        preventClose={true}
        openTrigger="focus"
        closeTrigger="blur"
        titleClassName="acc-title"
        contentsClassName="acc-contents"
        onTrigger={() => {}}
        closeClassName="acc-closed"
        openClassName="acc-open"
        renderExpandAllButton={true}
      />
    `}</CodePage>
  ))
  .add('alternative', () => (
    <CodePage scope={{ AccordionBottomSingle: Carousels.SinglePreventClose, items }}>{`
      <AccordionBottomSingle items={items} />
    `}</CodePage>
  ));
