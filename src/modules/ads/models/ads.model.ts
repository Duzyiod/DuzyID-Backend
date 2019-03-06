import { v4 as uuid } from 'uuid';
import * as _ from 'lodash';
import { Model } from '../../../helpers/model';
import { ModelError } from '../../../helpers/errors/errors';

import { ProductModel, ProductSources } from './product.model';
import { EbayProductModel } from './ebay.model';

export type AdsButton = { src: string, position: ['top' | 'middle' | 'bottom', 'left' | 'right'] };
export const BUTTON_SRC = 'https://d1o176s0aoq15o.cloudfront.net/duzy-id-btn.png';

/**
 * Class that describes the sctucture of Ad preset
 */
export class AdsModel extends Model {
    public id: string;
    public source: ProductSources;
    private _button?: AdsButton;
    public ecommerce: ProductModel[];

    public get button(): AdsButton {
        if (this._button && this._button.src) {
            return this._button;
        }

        return {
            src: BUTTON_SRC,
            position: ['top', 'right'],
        };
    }

    public set button(value) {
        if (
            typeof value === 'object' &&
            typeof value.src === 'string' &&
            value.position instanceof Array &&
            value.position.length === 2
        ) {
            this._button = value;
        } else {
            throw new ModelError('button has to include reuired fields');
        }
    }

    constructor(ads: { source: ProductSources; button?: AdsButton; ecommerce: ProductModel[]; } & object) {
        super(ads);
        if (
            _.isNil(ads.source) ||
            _.isNil(ads.button) ||
            !_.isArray(ads.ecommerce)
        ) {
            throw new ModelError('Required fields: source, button, ecommerce');
        }

        this.id = _.get(ads, 'id', uuid());
        this.source = ads.source;
        this.button = ads.button;
        this.ecommerce = _.map(ads.ecommerce, item => {
            if (item.source === 'ebay') {
                return new EbayProductModel(item);
            }
            throw new ModelError('Unsupported type of product');
        });
    }

    get shortView() {
        return {
            id: this.id,
            button: this.source,
            ecommerce: this.ecommerce.map(e => e.shortView),
        };
    }
}