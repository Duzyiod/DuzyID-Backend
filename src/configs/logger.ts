import * as env from './env';

export const levels: { [x: string]: number } = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
};

const LOG_LVL = env.LOG_LVL.toLowerCase();
const level = levels[LOG_LVL] === undefined ? 5 : levels[LOG_LVL];

if (level < levels.warn) {
    console.warn = () => undefined;
}
if (level < levels.info) {
    console.info = () => undefined;
}
if (level < levels.verbose) {
    console.log = () => undefined;
}
if (level < levels.debug) {
    console.debug = () => undefined;
}
