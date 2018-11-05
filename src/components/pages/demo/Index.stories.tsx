import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { HelmetProvider } from 'react-helmet-async';

import Demo from './Index';

storiesOf('demo', module).add('demo!', () => (
  <HelmetProvider>
    <Demo />
  </HelmetProvider>
));
