import * as React from 'react';

// import CSSModules from '~/utils/cssModules';
// import styles from './style.css';
import * as Meta from '~/value-objects/meta';
import { updateMetaService } from '~/services/updateMetaService';

export const meta: Meta.Meta = Meta.create({
  title: 'demo page',
  description: 'demo page description',
});

export default class DemoPage extends React.Component {
  componentDidMount() {
    updateMetaService(meta);
  }

  render() {
    return (
      <section styleName="Demo" className="Demo">
        demo
      </section>
    );
  }
}

// export default CSSModules(DemoPage, styles) as () => JSX.Element;
