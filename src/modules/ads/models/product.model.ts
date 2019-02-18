import { Model } from '../../../helpers/model';

export type ProductSources = 'ebay';

/**
 * Explains basic products parameters to be included
 */
export abstract class ProductModel extends Model {
    public abstract itemId: string;
    public abstract title: string;
    public abstract imageUrl: string;
    public abstract price: { value: number; currency: string };
    public abstract itemHref: string;
    public abstract source: ProductSources;

    public get shortView() {
        return {
            id: this.itemId,
            itemId: this.itemId,
            title: this.title,
            imageUrl: this.imageUrl,
            price: this.price,
            itemHref: this.itemHref,
            source: this.source,
        };
    }
}