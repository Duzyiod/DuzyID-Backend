import { chai } from '../../../setup';

import { EbayProductModel } from '../../../../modules/ads/models/ebay.model';
import { mockProductModel } from '../../../mocks/modules/ads/models/ebay.model.mock';

const { expect } = chai;

describe('modules/ads/models/ebay.model', function () {

    describe('constructor', function () {
        it('should not return an error', function () {
            const createInstance = function () {
                return new EbayProductModel(mockProductModel)
            };

            expect(createInstance).to.not.throw();
        });
    });

    describe('buildProduct', function () {
        const model: EbayProductModel = new EbayProductModel(mockProductModel);

        const buildProduct: EbayProductModel = EbayProductModel.buildProduct(model);

        it('check type of return instance', function () {
            expect(buildProduct instanceof EbayProductModel).to.be.equal(true);
        });
    });
});