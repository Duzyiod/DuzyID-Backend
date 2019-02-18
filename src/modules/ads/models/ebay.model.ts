import * as _ from 'lodash';
import { ModelError } from '../../../helpers/errors/errors';

import { ProductModel, ProductSources } from './product.model';

/**
 * Ebay product model
 */
export class EbayProductModel extends ProductModel {
    public id: string;
    public itemId: string;
    public title: string;
    public imageUrl: string;
    public price: { value: number; currency: string };
    public itemHref: string;
    public source: ProductSources;

    constructor(product: any) {
        super(product);
        if (
            _.isNil(product.itemId) ||
            _.isNil(product.title) ||
            _.isNil(product.itemHref) ||
            _.isNil(product.price) || _.isNil(product.price.value) || _.isNil(product.price.currency)
        ) {
            throw new ModelError('Required fields failed');
        }

        this.id = product.itemId;
        this.itemId = product.itemId;
        this.title = product.title;
        this.imageUrl = product.imageUrl;
        this.price = product.price;
        this.itemHref = product.itemHref;

        this.source = 'ebay';
    }

    /**
     * Converst ebay source data into Product instance
     * @param ebayProduct ebay search object
     */
    public static buildProduct(ebayProduct: any) {
        let preset: any = {};

        preset.itemId = _.get(ebayProduct, 'itemId', null);
        preset.title = _.get(ebayProduct, 'title', null);
        preset.imageUrl = _.get(ebayProduct, 'image.imageUrl', null);
        preset.price = {
            value: Number(_.get(ebayProduct, 'price.value', null)),
            currency: _.get(ebayProduct, 'price.currency', null),
        };
        preset.itemHref = _.get(ebayProduct, 'itemHref', null);

        return new EbayProductModel(preset);
    }
}
