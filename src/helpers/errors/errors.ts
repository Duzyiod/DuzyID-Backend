/**
 * Here is a repo of most common Errors that can be used accross application
 */
import { HttpError } from './http-error';

/* Public */
/**
 * Object exists but should not.
 */
export class ExistsError extends HttpError {
    constructor(message: string, ...args: any) {
        super(409, message, ...args);
    }
}
/**
 * Object does not exist.
 */
export class NotExistsError extends HttpError {
    constructor(message: string, ...args: any) {
        super(404, message, ...args);
    }
}
/**
 * Object does not exist.
 */
export class InvalidFormError extends HttpError {
    constructor(fields: object, ...args: any) {
        super(422, 'Invalid Form', fields, ...args);
    }
}
/**
 * Object access denied.
 */
export class ForbiddenError extends HttpError {
    constructor(message: string, ...args: any) {
        super(403, message, ...args);
    }
}
/**
 * Object access denied.
 */
export class BannedError extends HttpError {
    constructor(message: string = 'Your account is banned', ...args: any) {
        super(418, message, ...args);
    }
}
/**
 * Internal Server Error
 */
export class ServerError extends HttpError {
    constructor(message?: string, ...args: any) {
        super(500, 'Internal Server Error', ...args);
        console.error(message);
    }
}
/**
 * Database querying error
 */
export class DatabaseError extends ServerError {
}
/**
 * Unexpected instace error
 */
export class InstanceError extends ServerError {
}
/**
 * Model definition error
 */
export class ModelError extends ServerError {
}
