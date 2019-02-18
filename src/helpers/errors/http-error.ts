import * as httpStatus from 'http-status';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export type ModifiedResponse = Response & { sendHttpError: Function };

export class HttpError extends Error {
    public message: string;
    public status: number;
    private errors: any;

    constructor(status: number, message?: string, ...args: any) {
        super(message);
        this.message = message || (httpStatus as any)[status] || httpStatus[500];
        this.status = status;

        if (args[0]) {
            [this.errors] = args;
        }
    }

    public toJSON() {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors,
        };
    }
}

export const middleware = <RequestHandler>function middleware(req: Request, res: ModifiedResponse, next: NextFunction) {
    res.sendHttpError = (error: any) => sendHttpError(error, res);
    next();
}

/* Private */
function sendHttpError(error: HttpError, res: Response) {
    if (error instanceof Error && error instanceof HttpError === false && error.stack !== undefined) {
        console.error(
            error.stack
                .split('\n')
                .map((e: string) => e.trim())
                .slice(0, 7),
        );
    }
    if (error instanceof HttpError === false) {
        let statusCode = 500;
        let status = httpStatus[500];
        if (typeof error === 'number' && error in httpStatus) {
            statusCode = error;
            status = httpStatus[error];
        }
        // eslint-disable-next-line no-param-reassign
        error = new HttpError(statusCode, status);
    }

    res.statusMessage = error.message;
    res.statusCode = error.status;
    res.json({ error, data: null });
}
