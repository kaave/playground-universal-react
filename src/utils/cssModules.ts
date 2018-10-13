import CSSModules from 'react-css-modules';

// tslint:disable-next-line ban-types
export default function(component: Function, styles: { [className: string]: string }) {
  return CSSModules(component, styles, { allowMultiple: true });
}
