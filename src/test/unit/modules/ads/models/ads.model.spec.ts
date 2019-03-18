import { chai } from '../../../../setup';

import { AdsModel } from '../../../../../modules/ads/models/ads.model';
import { mockProductSources, mockAdsButton, mockProductModel } from '../../../mocks/modules/ads/models/ads.model.mock';

const { expect } = chai;

describe('modules/ads/models/ads.model', function () {

    describe('constructor', function () {
        it('should not return an error', function () {
            const createInstance = function () {
                return new AdsModel({ source: mockProductSources, button: mockAdsButton, ecommerce: [mockProductModel] })
            };

            expect(createInstance).to.not.throw();
        });
    });

    describe('get button', function () {
        const model: AdsModel = new AdsModel({ source: mockProductSources, button: mockAdsButton, ecommerce: [mockProductModel] });

        const button: any = model.button;

        it('check availability and types of return parameters', function () {
            expect(button).to.have.property('src').to.be.a('string');
            expect(button).to.have.property('position').to.be.a('array');
        });
    });

    describe('set button', function () {
        const model: AdsModel = new AdsModel({ source: mockProductSources, button: mockAdsButton, ecommerce: [mockProductModel] });

        it('should not return an error', function () {
            const set = function () { model.button = mockAdsButton };

            expect(set).to.not.throw();
        });
    });

    describe('shortView', function () {
        const model: AdsModel = new AdsModel({ source: mockProductSources, button: mockAdsButton, ecommerce: [mockProductModel] });

        const shortView: any = model.shortView;

        it('check availability and types of return parameters', function () {
            expect(shortView).to.have.property('id').to.be.a('string');
            expect(shortView).to.have.property('button').to.be.a('string');
            expect(shortView).to.have.property('ecommerce').to.be.a('array');
        });
    });

});