import { RequestHandler, Request, Response, NextFunction } from 'express';
import Validator from 'week-validator';
import isUrl from 'is-url';
import { InvalidFormError, ServerError } from '../../../helpers/errors/errors';

/* Public */
export const getProducts = <RequestHandler>async function getProducts(req: Request & { form: any }, res: Response, next: NextFunction) {
    try {
        const val = new Validator();

        val.field('tags', [
            Validator.required,
            Validator.validator(Array.isArray).message('tags must be in string array'),
        ]);

        val.array('tags', [
            Validator.filter((field: any) => String(field)),
        ]);

        val.field('button',[
            Validator.required,
        ]);

        val.field('button.position', [
            Validator.required,
            Validator.validator((field: [string, string]) => {
                return ['top', 'middle', 'bottom'].includes(field[0]) && ['left', 'right'].includes(field[1]);
            }),
        ]);
        val.field('button.src', [
            Validator.required,
            Validator.validator(isUrl),
        ]);

        req.form = await val.validate(req.query);
        next();
    } catch (err) {
        if (err instanceof Validator.ValidationError) {
            return next(new InvalidFormError(err.fields));
        }
        return next(new ServerError());
    }
}