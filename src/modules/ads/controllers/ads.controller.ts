import { RequestHandler, Request, Response, NextFunction } from 'express';
import _isEmpty from "lodash/isEmpty";

import * as ebayService from '../services/ebay.service';
import { AdsModel } from '../models/ads.model'
import { MediaTagsModel } from '../../media-tags/models/media-tags.model';

/* Public */
export const getProducts = <RequestHandler>async function getProducts(req: Request & { form: any }, res: Response, next: NextFunction) {
    try {
        const { tags, button } = req.form;
        const products = await ebayService.search(tags, 5);

        const result = new AdsModel({
            source: 'ebay',
            ecommerce: products,
            button,
        });

        res.send({
            error: null,
            data: result.shortView,
        });
    } catch (err) {
        next(err);
    }
}

export const getProductByMedia = <RequestHandler>async function getProductByMedia(req: Request & { form: any, media: MediaTagsModel }, res: Response, next: NextFunction) {
    try {
        const { tags, button } = req.media;

        if (_isEmpty(tags)) {
            return res.send({
                error: null,
                data: [],
            });
        }

        const products = await ebayService.search(tags, 5);

        const result = new AdsModel({
            source: 'ebay',
            ecommerce: products,
            button,
        });

        res.send({
            error: null,
            data: result.shortView,
        });
    } catch (err) {
        next(err);
    }
}