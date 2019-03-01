import { RequestHandler, Request, Response, NextFunction } from 'express';
import Validator from 'week-validator';
import { isInteger } from 'lodash';
import isUrl from 'is-url';
import * as env from '../../../configs/env';
import { InvalidFormError, ServerError } from '../../../helpers/errors/errors';

/* Public */
export const setMedia = <RequestHandler>async function setMedia(req: Request & { form: any }, res: Response, next: NextFunction) {
    try {
        const val = new Validator();

        val.field('previewUrl', [
            Validator.required,
            Validator.validator(isUrl),
        ]);
        val.field('videoUrl', [
            Validator.required,
            Validator.validator(isUrl),
        ]);
        val.field('categoryId', [
            Validator.required,
            Validator.validator(isInteger).message('categoryId must be in integer'),
        ]);

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
            Validator.default(['top', 'right']),
            Validator.validator((field: [string, string]) => {
                return ['top', 'bottom'].includes(field[0]) && ['left', 'right'].includes(field[1]);
            }),
        ]);
        val.field('button.src', [
            Validator.default(env.DEFAULT_BUTTON_SRC),
            Validator.validator(isUrl),
        ]);

        req.form = await val.validate(req.body);

        next();
    } catch (err) {
        if (err instanceof <any>Validator.ValidationError) {
            return next(new InvalidFormError(err.fields));
        }
        return next(new ServerError());
    }
}
