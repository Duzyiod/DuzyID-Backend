import { RequestHandler, Request, Response, NextFunction } from 'express';

import { MediaTagsModel } from '../models/media-tags.model';
import * as mediaTagsService from '../services/media-tags.service';

/* Public */
export const load = <RequestHandler>async function load(req: Request & { form: any, media: MediaTagsModel }, res: Response, next: NextFunction) {
    try {
        const { mediaId } = req.params;
        const media = await mediaTagsService.findById(mediaId);

        req.media = media;

        next();
    } catch (err) {
        next(err);
    }
}

export const getMedia = <RequestHandler>async function getMedia(req: Request & { form: object, media: MediaTagsModel }, res: Response, next: NextFunction) {
    try {
        res.send({
            error: null,
            data: req.media.shortView,
        });
    } catch (err) {
        next(err);
    }
}

export const setMedia = <RequestHandler>async function setMedia(req: Request & { form: object }, res: Response, next: NextFunction) {
    try {
        const { mediaId } = req.params;
        const { form } = req;
        let media = await mediaTagsService.findById(mediaId).catch(err => null);

        if (media === null) {
            media = new MediaTagsModel({ id: mediaId, ...form });
            await mediaTagsService.create(media);

            res.statusCode = 201;
        } else {
            media = new MediaTagsModel({ id: mediaId, ...form });
            await mediaTagsService.update(media);
        }

        res.send({
            error: null,
            data: media.shortView,
        });
    } catch (err) {
        next(err);
    }
}

export const removeMedia = <RequestHandler>async function removeMedia(req: Request & { form: object, media: MediaTagsModel }, res: Response, next: NextFunction) {
    try {
        await mediaTagsService.remove(req.media);

        res.send({
            error: null,
            data: req.media.shortView,
        });
    } catch (err) {
        next(err);
    }
}