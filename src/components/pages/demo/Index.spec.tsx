import * as React from 'react';
import { shallow } from 'enzyme';

import Demo from './Index';

describe('<Demo />', () => {
  it('render "demo" string', () => {
    const renderer = shallow(<Demo />);
    expect(renderer.text().indexOf('demo') !== -1).toBeTruthy();
  });
});
