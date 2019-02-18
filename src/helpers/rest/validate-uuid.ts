/**
 * Middleware generator for param validation if uuid or not.
 * Returns 404 if not.
 */
import { isUUID } from 'validator';
import { Request, Response, NextFunction } from 'express';

/* Public */
export async function ifUUID(req: Request, res: Response, next: NextFunction, uuiid: string) {
    if (isUUID(uuiid)) {
        next();
    } else {
        next('route');
    }
}
