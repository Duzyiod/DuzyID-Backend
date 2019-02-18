/**
 * Custom router instance to share events beetween modules
 */
import { Router as _Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { EventEmitter } from 'events';

/* Public */
export class CrossAppEventEmitter {
    private emitter = new EventEmitter();

    public on(event: string, ...args: any[]) {
        for (const arg of args) {
            this.emitter.on(event, arg);
        }
    }

    public off(event: string, ...args: any[]) {
        for (const arg of args) {
            this.emitter.off(event, arg);
        }
    }

    public emit(event: string, ...args: any[]) {
        console.info(`EVENT \x1b[35m${event}\x1b[0m has been triggered \x1b[35m${this.emitter.listenerCount(event)}\x1b[0m subscriptions`);
        this.emitter.emit(event, ...args);
    }

    info() {
        const events = (this.emitter.eventNames() as string[]).sort((a: string, b: string) => {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        });

        for (const event of events) {
            console.info(`\x1b[35m${event}\x1b[0m has \x1b[35m${this.emitter.listenerCount(event)}\x1b[0m subscriptions`);
        }

        if (events.length === 0) {
            console.info('No listener subscribed');
        }
    }
}

export const crossAppEventEmitter = new CrossAppEventEmitter();

export function Router(): ExtendedRouter {
    const _router = _Router() as ExtendedRouter;

    _router.use(emitter as RequestHandler);

    _router.whenOff = whenOff;
    _router.when = when;

    return _router;
}

export function info() {
    return crossAppEventEmitter.info();
}

/* Private */
/**
 * Add listener to triggering events
 * @param event Event name
 * @param args Listener function
 */
function when(event: string, ...args: Function[]) {
    crossAppEventEmitter.on(event, ...args);
}
/**
 * Add listener to triggering events
 * @param event Event name
 * @param args Listener function
 */
function whenOff(event: string, ...args: Function[]) {
    crossAppEventEmitter.off(event, ...args);
}

function emitter(req: Request & { trigger: Function }, res: Response, next: NextFunction) {
    req.trigger = (event: string, ...args: any[]) => crossAppEventEmitter.emit(event, req, res, ...args);

    next();
}

interface ExtendedRouter extends _Router {
     when: (event: string, ...args: Function[]) => void;
     whenOff: (event: string, ...args: Function[]) => void;
}
