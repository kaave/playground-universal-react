import { Dispatch } from 'redux';
import { RouteConfig } from 'react-router-config';

import { Meta } from '~/value-objects/meta';
import App, { meta as AppMeta } from './containers/App';
import IndexPages, { meta as IndexMeta } from './components/pages/Index';
import { DemoPage, meta as DemoMeta } from './components/pages/demo';
import { types as Counts } from './reduxes/actions/counts';

export type RunDispatch = (dispatch: Dispatch, params?: any) => void;
export interface RouteConfigWithLoadData extends RouteConfig {
  runDispatch?: RunDispatch;
  routes?: RouteConfigWithLoadData[];
  meta?: Meta;
}

export default [
  ({
    component: App,
    path: '/',
    meta: AppMeta,
    routes: [
      { component: IndexPages, path: '/', exact: true, meta: IndexMeta },
      {
        component: IndexPages,
        path: '/increment',
        exact: true,
        runDispatch: (dispatch: Dispatch) => dispatch({ type: Counts.asyncIncrement }),
        meta: IndexMeta,
      },
      {
        component: IndexPages,
        path: '/add/:count',
        exact: true,
        runDispatch: (dispatch: Dispatch, params: any) =>
          dispatch({ type: Counts.add, payload: parseInt(params.count, 10) || 0 }),
        meta: IndexMeta,
      },
      { component: DemoPage, path: '/demo', exact: true, meta: DemoMeta },
    ],
  } as unknown) as RouteConfigWithLoadData,
] as RouteConfigWithLoadData[];
