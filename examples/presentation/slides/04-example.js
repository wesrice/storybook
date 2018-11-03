import React from 'react';
import { storiesOf } from '@storybook/react';

import { CodePage, TitlePage } from '../components/page';
import Heading from '../components/heading';
import Hr from '../components/hr';

import * as Carousels from '../components/accordion/implementations';

const { items } = Carousels;

storiesOf('Slides|examples', module)
  .add('react component', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        ⚛️ components abstract a section of UI
      </Heading>
      <Hr />
      <Heading type="sub" mods={['centered']}>
        right? 🙄
      </Heading>
    </TitlePage>
  ))
  .add('sort of', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        Sort of 🤷‍
      </Heading>
    </TitlePage>
  ))
  .add('definition of a component', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        Components should abstract a UI <strong>pattern/concept</strong>.
      </Heading>
      <Hr />
      <Heading type="sub" mods={['centered']}>
        This is different from "a section of visible UI".
      </Heading>
    </TitlePage>
  ))
  .add('ui concept', () => (
    <TitlePage>
      <Heading type="main" mods={['centered']}>
        UI concepts <strong>can</strong> be visible.
      </Heading>
      <Hr />
      <Heading type="sub" mods={['centered']}>
        But they can also provide data / state / layout / styles etc..
      </Heading>
    </TitlePage>
  ))
  .add('encapsulate', () => (
    <TitlePage>
      <Heading type="sub" mods={['centered']}>
        A well implemented UI concept should abstract/isolate
        <br />
        <strong>that particular concept and nothing else</strong>.
      </Heading>
      <Hr />
      <Heading type="sub" mods={['centered']}>
        Remember, if you abstract too much, it will likely result in complexity later.
      </Heading>
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
