import { fromEvent } from 'rxjs';
import format from 'date-fns/format';

import { author } from '../consts';

fromEvent(window, 'DOMContentLoaded').subscribe(() => console.log(format(new Date()), 'DOMContentLoaded'));
console.log('created by', author);
