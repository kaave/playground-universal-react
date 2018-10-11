import { RouteConfig } from 'react-router-config';

import App from './containers/App';
import IndexPages from './components/pages/Index';
import DemoPages from './components/pages/demo/';

export default [
  {
    component: App,
    routes: [{ component: IndexPages, path: '/', exact: true }, { component: DemoPages, path: '/demo', exact: true }],
  },
] as RouteConfig[];
