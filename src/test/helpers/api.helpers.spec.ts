import { chai, sinon } from '../setup';
import { restful, handleError } from '../../helpers/rest/api';

const { expect, assert } = chai;

describe('helpers/rest/api', function () {
    describe('restful', function () {
        it('should return an function', function () {
            const result = restful();

            expect(result).to.be.a('function');
        });
    });

    describe('handleError', function () {

        beforeEach(function () {
            this.sandbox = sinon.createSandbox();
        });

        afterEach(function () {
            this.sandbox.restore();
        });

        it('should add object in Response object and call spy function', function () {
            const spyNextFn = sinon.spy();
            const spyJsonFn = sinon.spy();

            const fakeRequestObj = {};

            const fakeResponseObj = {
                sendHttpError: false,
                statusCode: null,
                json: spyJsonFn
            };

            const fakeError = true;

            // @ts-ignore
            handleError(fakeError, fakeRequestObj, fakeResponseObj, spyNextFn);

            expect(fakeResponseObj.statusCode).to.be.a('number');

            assert.isTrue(spyJsonFn.called);
            expect(spyJsonFn.args[0][0]).to.have.property('error').to.be.equal(fakeError);
            expect(spyJsonFn.args[0][0]).to.have.property('data').to.be.a('null');
        });

        it('should call send error fn', function () {
            const spyNextFn = sinon.spy();
            const spyJsonFn = sinon.spy();
            const spySendHttpErrorFn = sinon.spy();

            const fakeRequestObj = {};

            const fakeResponseObj = {
                sendHttpError: spySendHttpErrorFn,
                statusCode: null,
                json: spyJsonFn
            };

            const fakeError = 'fakeError';

            // @ts-ignore
            handleError(fakeError, fakeRequestObj, fakeResponseObj, spyNextFn);

            assert.isTrue(spySendHttpErrorFn.called);
            expect(spySendHttpErrorFn.args[0][0]).to.be.equal(fakeError);
        });

        it('should call send error fn and pass in the argument HttpError', function () {
            const spyNextFn = sinon.spy();
            const spyJsonFn = sinon.spy();
            const spySendHttpErrorFn = sinon.spy();

            const fakeRequestObj = {};

            const fakeResponseObj = {
                sendHttpError: spySendHttpErrorFn,
                statusCode: null,
                json: spyJsonFn
            };

            const fakeError = false;

            // @ts-ignore
            handleError(fakeError, fakeRequestObj, fakeResponseObj, spyNextFn);

            assert.isTrue(spySendHttpErrorFn.called);
            expect(spySendHttpErrorFn.args[0][0]).to.be.an('error');
        });
    });
});