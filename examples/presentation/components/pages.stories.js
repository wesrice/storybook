import React from 'react';
import { storiesOf } from '@storybook/react';

import { TitlePage, IsolatedPage, CodePage } from './page';

storiesOf('Components|Page', module)
  .add('TitlePage', () => <TitlePage>Content</TitlePage>)
  .add('IsolatedPage', () => <IsolatedPage>Content</IsolatedPage>)
  .add('CodePage', () => (
    <CodePage>{`
      <div>Content</div>
    `}</CodePage>
  ));
