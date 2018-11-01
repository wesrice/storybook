import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';

import Heading from '../components/heading';

storiesOf('Slides|stories', module)
  .add('story 1', () => (
    <Fragment>
      <Heading type="main">Company 1 💼</Heading>
      <p>building a SAAS</p>
      <p>3 teams, each team is responsible for a section or the app</p>
      <p>as time progresses...</p>
      <ul>
        <li>teams are making making requests to eachother</li>
        <li>blocking each other, wasting time and money</li>
        <li>tentions between teams rise</li>
      </ul>
    </Fragment>
  ))
  .add('story 2', () => (
    <Fragment>
      <Heading type="main">Company 2 💰</Heading>
      <p>building a financial</p>
      <p>18 teams</p>
      <p>1 team is responsible for infrastructure</p>
      <p>1 team is responsible for back end APIs</p>
      <p>1 team is responsible for common UI</p>
      <p>as time progresses...</p>
      <ul>
        <li>dev-teams are less concerned about going to production</li>
        <li>
          when things go wrong in either of the 3 service-teams, this creates problems everywhere
        </li>
        <li>large groups of people dependent on a few individuals</li>
      </ul>
    </Fragment>
  ))
  .add('commonalities', () => (
    <Fragment>
      <Heading type="main">
        What are the commonalities between these these stories and building UIs in general?
      </Heading>
    </Fragment>
  ));
