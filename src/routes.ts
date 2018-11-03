import { Dispatch } from 'redux';
import { RouteConfig } from 'react-router-config';

import App from './containers/App';
import IndexPages from './components/pages/Index';
import DemoPages, { loadData as DemoPageLoadData } from './components/pages/demo';
import { types as Counts } from './reduxes/actions/counts';

export interface RouteConfigWithLoadData extends RouteConfig {
  runDispatch?: (dispatch: Dispatch) => void;
  routes?: RouteConfigWithLoadData[];
}

export default [
  {
    component: App,
    routes: [
      { component: IndexPages, path: '/', exact: true },
      {
        component: IndexPages,
        path: '/increment',
        exact: true,
        runDispatch: dispatch => {
          dispatch({ type: Counts.asyncIncrement });
        },
      },
      { component: DemoPages, path: '/demo', exact: true, loadData: DemoPageLoadData },
    ],
  },
] as RouteConfigWithLoadData[];
