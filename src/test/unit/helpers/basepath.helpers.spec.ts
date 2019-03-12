import { chai, sinon } from '../../setup';
import { basepath } from '../../../helpers/rest/basepath';

const { expect, assert } = chai;

describe('helpers/rest/basepath', function () {

    describe('basepath', function () {
        it('should add concat string in key basePath', function () {
            const spyNextFn = sinon.spy();

            const baseUrl = 'baseUrl';
            const path = 'baseUrl';

            const fakeRequestObj = {
                basePath: null,
                baseUrl,
                path,
            };

            const fakeResponseObj = {};

            // @ts-ignore
            basepath(fakeRequestObj, fakeResponseObj, spyNextFn);

            expect(fakeRequestObj.basePath).to.be.not.an('null');
            expect(fakeRequestObj.basePath).to.be.an('string');
            expect(fakeRequestObj.basePath).to.be.equal(baseUrl + path);
            assert.isTrue(spyNextFn.called);
        });
    });
});