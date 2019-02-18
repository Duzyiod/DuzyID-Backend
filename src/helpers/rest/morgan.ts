import * as _ from 'lodash';
import morgan from 'morgan';

export const logger = morgan('dev', { stream: { write: (...args: any[]) => console.log(...args.map(e => _.trim(e, '\n'))) } });
