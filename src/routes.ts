import { RouteConfig } from 'react-router-config';

import IndexPages from './components/pages/Index';
import DemoPages from './components/pages/demo/';

export default [
  { component: IndexPages, path: '/', exact: true },
  { component: DemoPages, path: '/demo/', exact: true },
] as RouteConfig[];
