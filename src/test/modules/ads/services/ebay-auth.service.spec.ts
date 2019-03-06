import setTestEnv from './../../../env.test'
setTestEnv();

import request from 'request-promise-native';
import sinon from 'sinon';
import { expect } from 'chai';
import { getToken, expireToken } from '../../../../modules/ads/services/ebay-auth.service';
import { mockJSON } from '../../../mocks/modules/ads/services/ebay-auth.service.mock'

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