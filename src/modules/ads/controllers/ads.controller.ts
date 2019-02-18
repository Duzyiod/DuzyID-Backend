import { RequestHandler, Request, Response, NextFunction } from 'express';

import * as ebayService from '../services/ebay.service';
import { AdsModel } from '../models/ads.model'

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