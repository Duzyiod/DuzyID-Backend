import request from 'request-promise-native';
import sinon from 'sinon';
import { expect } from 'chai';
import { getToken, expireToken } from '../modules/ads/services/ebay-auth.service';


describe('modules/ads/services/ebay-auth.service', function () {

    beforeEach(function () {
        this.sandbox = sinon.sandbox.create()
    });

    afterEach(function () {
        this.sandbox.restore()
    });

    describe('getToken', function () {
        it('should not return an error', function () {
            const test = sinon.stub(request, 'post').yieldsTo("success", [1, 2, 3]);;

        });
    });
});