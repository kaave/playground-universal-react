import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { DemoPage } from './Index';

storiesOf('demo', module).add('demo!', () => <DemoPage />);
