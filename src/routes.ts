import { Dispatch } from 'redux';
import { RouteConfig } from 'react-router-config';

import App from './containers/App';
import IndexPages from './components/pages/Index';
import DemoPages from './components/pages/demo';
import { types as Counts } from './reduxes/actions/counts';

export interface RouteConfigWithLoadData extends RouteConfig {
  runDispatch?: (dispatch: Dispatch, params?: any) => void;
  routes?: RouteConfigWithLoadData[];
}

export default [
  ({
    component: App,
    routes: [
      { component: IndexPages, path: '/', exact: true },
      {
        component: IndexPages,
        path: '/increment',
        exact: true,
        runDispatch: (dispatch: Dispatch) => dispatch({ type: Counts.asyncIncrement }),
      },
      {
        component: IndexPages,
        path: '/add/:count',
        exact: true,
        runDispatch: (dispatch: Dispatch, params: any) =>
          dispatch({ type: Counts.add, payload: parseInt(params.count, 10) || 0 }),
      },
      { component: DemoPages, path: '/demo', exact: true },
    ],
  } as unknown) as RouteConfigWithLoadData,
] as RouteConfigWithLoadData[];
