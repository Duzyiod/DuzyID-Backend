import { AdsButton } from '../../../../modules/ads/models/ads.model';
import { ProductModel, ProductSources } from '../../../../modules/ads/models/product.model'

export const mockModel = {};
export const mockProductSources: ProductSources = 'ebay';
export const mockAdsButton: AdsButton = { src: 'src', position: ['top', 'left'] };

class mockProductModelClass extends ProductModel {
    public id = 'id';
    public itemId = 'itemId';
    public title = 'title';
    public imageUrl = 'imageUrl';
    public price = { value: 1, currency: 'currency' };
    public itemHref = 'itemHref';
    public source = mockProductSources;

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

export const mockProductModel: ProductModel = new mockProductModelClass(mockModel);