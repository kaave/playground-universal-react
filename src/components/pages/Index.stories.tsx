import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { HelmetProvider } from 'react-helmet-async';

import Index from './Index';

storiesOf('Index', module).add('Index!', () => (
  <HelmetProvider>
    <Index />
  </HelmetProvider>
));
