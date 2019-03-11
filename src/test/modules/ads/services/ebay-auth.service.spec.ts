import { chai, sinon } from '../../../setup';

import request from 'request-promise-native';
import { getToken, expireToken } from '../../../../modules/ads/services/ebay-auth.service';
import { mockJSON } from '../../../mocks/modules/ads/services/ebay-auth.service.mock'

const { expect } = chai;

describe('modules/ads/services/ebay-auth.service', function () {
    describe('getToken', function () {
        beforeEach(function () {
            this.sandbox = sinon.createSandbox();
        });

        afterEach(function () {
            this.sandbox.restore();
        });

        it('should return string', async function () {
            this.sandbox
                .stub(request, 'post')
                .callsFake(function () {
                    return mockJSON;
                });

            const token = await getToken();

            expect(token).to.be.a('string');
        });
    });

    describe('expireToken', function () {
        it('should return undefined', async function () {
            const value = await expireToken(1);

            expect(value).to.be.a('undefined');
        });
    });
});