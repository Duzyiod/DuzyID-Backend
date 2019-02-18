import { Request, Response, NextFunction, Router, RequestHandler, ErrorRequestHandler } from 'express';

export const router = Router();

import * as env from '../configs/env';

import { HttpError } from '../helpers/errors/http-error';
import { logger } from '../helpers/rest/morgan';
import { info as subscriptionsInfo } from '../helpers/rest/router';
import { middleware } from '../helpers/errors/http-error';
import { restful, handleError } from '../helpers/rest/api';
import { basepath } from '../helpers/rest/basepath';

import { router as modules } from './modules';

// Error handling definition
router.use(middleware);

// Apply defaults for API responses
router.use(restful(true));
// API(router);

// Set basePath param to simplify access controll
router.use(basepath);

// This is express logger
router.use(logger);

// Run modules
router.use(env.ROUTE_PATH, modules);

// Informate subscriptions
subscriptionsInfo();

// catch 404 and forward to error handler
router.use((req: Request, res: Response, next: NextFunction) => {
    throw new HttpError(404, 'Not Found');
});

router.use(handleError);
