import * as React from 'react';
import { shallow } from 'enzyme';

import { DemoPage } from './Index';

describe('<DemoPage />', () => {
  it('render "demo" string', () => {
    const renderer = shallow(<DemoPage />);
    expect(renderer.text().indexOf('demo') !== -1).toBeTruthy();
  });
});
