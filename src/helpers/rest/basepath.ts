/**
 * Adds to reqest `req.basePath` param returning original url
 * without search params.
 */

import { Request, Response, NextFunction, RequestHandler} from 'express';

/* Public */
/**
 * Adds `req.basePath` to Request.
 */
export const basepath = <RequestHandler>function basepath(req: Request & { basePath: string }, res: Response, next: NextFunction) {
    req.basePath = req.baseUrl + req.path;
    next();
}
