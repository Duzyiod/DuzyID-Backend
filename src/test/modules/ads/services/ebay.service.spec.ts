import setTestEnv from './../../../env.test'
setTestEnv();

import sinon from 'sinon';
import { assert, expect } from 'chai';
import { search } from '../../../../modules/ads/services/ebay.service';
import * as request from '../../../../modules/ads/services/requestToEbay';
import { mockFound, mockTags } from '../../../mocks/modules/ads/services/ebay.service.mock';

describe('modules/ads/services/ebay.service', function () {
    describe('search', function () {
        beforeEach(function () {
            this.sandbox = sinon.createSandbox();
        });

        afterEach(function () {
            this.sandbox.restore();
        });

        it('should return array and check count items in array', async function () {
            this.sandbox
                .stub(request, 'requestToEbayBrowseAPI')
                .callsFake(function () {
                    return mockFound;
                });

            const products = await search(mockTags);

            expect(products).to.be.a('array');
            assert.lengthOf(products, 2);
        });
    });
});