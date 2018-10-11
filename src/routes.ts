import { RouteConfig } from 'react-router-config';

import App from './containers/App';
import IndexPages from './components/pages/Index';
import DemoPages, { loadData as DemoPageLoadData } from './components/pages/demo';

export interface RouteConfigWithLoadData extends RouteConfig {
  loadData?: () => Promise<{}>;
  routes?: RouteConfigWithLoadData[];
}

export default [
  {
    component: App,
    routes: [
      { component: IndexPages, path: '/', exact: true },
      { component: DemoPages, path: '/demo', exact: true, loadData: DemoPageLoadData },
    ],
  },
] as RouteConfigWithLoadData[];
