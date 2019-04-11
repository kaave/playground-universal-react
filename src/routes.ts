import { Component } from 'react';
import { Dispatch } from 'redux';
import { RouteConfig } from 'react-router-config';

import { Meta } from '~/value-objects/meta';
import { App, meta as AppMeta } from './containers/App';
import { IndexPage, meta as IndexMeta } from './components/pages/Index';
import { DemoPage, meta as DemoMeta } from './components/pages/demo';
import { types as Counts } from './reduxes/actions/counts';

export type RunDispatch = (dispatch: Dispatch, params?: any) => void;
export type RouteConfigWithLoadData = {
  runDispatch?: RunDispatch;
  routes?: RouteConfigWithLoadData[];
  meta?: Meta;
} & RouteConfig;

export const routes: RouteConfigWithLoadData[] = [
  {
    component: App as any,
    path: '/',
    meta: AppMeta,
    routes: [
      { component: IndexPage, path: '/', exact: true, meta: IndexMeta },
      {
        component: IndexPage,
        path: '/increment',
        exact: true,
        runDispatch: (dispatch: Dispatch) => dispatch({ type: Counts.asyncIncrement }),
        meta: IndexMeta,
      },
      {
        component: IndexPage,
        path: '/add/:count',
        exact: true,
        runDispatch: (dispatch: Dispatch, params: any) =>
          dispatch({ type: Counts.add, payload: parseInt(params.count, 10) || 0 }),
        meta: IndexMeta,
      },
      { component: DemoPage, path: '/demo', exact: true, meta: DemoMeta },
    ],
  },
];
