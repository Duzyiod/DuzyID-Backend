/**
 * Creates requires headers and statuses for different requests
 * based on REST specs. Also, resricting incoming and outgoung
 * data typs.
 */
import { Router, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import * as env from '../../configs/env';
import { HttpError, ModifiedResponse } from '../errors/http-error';
import { ErrorRequestHandler } from 'express-serve-static-core';

/* Public */
/**
 * Adding defults to API routing
 *
 * @param {Router} router Express router
 * @param {Boolean} cors Cross-origin request support
 */
export function restful(cors = true) {
    const router = Router();
    // Body parsing rule
    router.use(bodyParser.json({ limit: '2mb' }));

    // Set default response headers
    router.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Content-Type', 'application/json');
        res.header('X-Powered-By', env.X_POWERED_BY);
        next();
    });

    // Support CORS ir required
    if (cors) {
        router.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Token');
            res.header('Access-Control-Expose-Headers', 'Content-Type, Accept, Token');
            next();
        });
    }

    router.options('*', (req: Request, res: Response, next: NextFunction) => {
        res.statusCode = 200;
        res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
        res.send();
    });
    /**
     * GET request default status is 200 OK.
     */
    router.get('*', (req: Request, res: Response, next: NextFunction) => {
        res.statusCode = 200;
        next();
    });
    /**
     * POST request default status is 201 Created.
     */
    router.post('*', (req: Request, res: Response, next: NextFunction) => {
        res.statusCode = 201;
        next();
    });
    /**
     * PUT request default status is 202 Updated.
     */
    router.put('*', (req: Request, res: Response, next: NextFunction) => {
        res.statusCode = 202;
        next();
    });
    /**
     * PATCH request default status is 202 Updated.
     */
    router.patch('*', (req: Request, res: Response, next: NextFunction) => {
        res.statusCode = 202;
        next();
    });
    /**
     * DELETE request default status is 200 OK.
     */
    router.delete('*', (req: Request, res: Response, next: NextFunction) => {
        res.statusCode = 200;
        next();
    });

    return router;
}

/**
 * Support handling errors.
 */
export const handleError = <ErrorRequestHandler>function(err: any, req: Request, res: ModifiedResponse, next: NextFunction) {
    /* eslint-disable no-param-reassign */
    if (!err) {
        err = new HttpError(404);
    }

    if (res.sendHttpError) {
        res.sendHttpError(err);
    } else {
        res.statusCode = 404;
        res.json({
            error: err,
            data: null,
        });
    }
    /* eslint-enable */
}
