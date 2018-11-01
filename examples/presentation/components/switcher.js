import React, { useState, Children } from 'react';

import { AccordionButton, AccordionItem, AccordionContents, Indicator } from './accordion/common';

const Switcher = ({ initial, children }) => {
  const [actives, setActives] = useState(initial);
  const toggle = index => {
    const l = actives.slice();
    l[index] = !l[index];
    setActives(l);
  };

  return children({ actives, setActives, toggle });
};

const Expander = ({ active, onClick, children }) => {
  const content = Children.toArray(children);
  return (
    <AccordionItem direction="vertical">
      <AccordionButton isOpen={active} onClick={onClick}>
        <Indicator>{active ? '➕' : '➖'}</Indicator> {content[0]}
      </AccordionButton>
      <AccordionContents isOpen={active}>{content[1]}</AccordionContents>
    </AccordionItem>
  );
};

export { Switcher as default, Expander };
