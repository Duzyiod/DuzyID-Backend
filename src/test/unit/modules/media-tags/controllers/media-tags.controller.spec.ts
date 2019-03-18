import { chai, sinon } from '../../../../setup';

import { mockMediaTagsModel } from '../../../mocks/modules/media-tags/service/media-tags.service.mock';
import * as mediaTagsService from '../../../../../modules/media-tags/services/media-tags.service';
import { load } from '../../../../../modules/media-tags/controllers/media-tags.controller';

const { expect, assert } = chai;

describe('modules/media-tags/controllers/media-tags.controller', function () {

    describe('load', function () {
        beforeEach(function () {
            this.sandbox = sinon.createSandbox();
        });

        afterEach(function () {
            this.sandbox.restore();
        });

        it('should add object in media object', async function () {
            const spyNextFn = sinon.spy();

            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(async function () {
                    return mockMediaTagsModel;
                });

            const fakeRequestObj = {
                params: { mediaId: 'id' },
                media: {},
            };

            const fakeResponseObj = {};

            // @ts-ignore
            await load(fakeRequestObj, fakeResponseObj, spyNextFn);

            expect(fakeRequestObj.media).to.be.an('object');
            expect(fakeRequestObj.media).to.be.not.empty;
            assert.isTrue(spyNextFn.called);
        });

        it('should return error object', function (done) {
            const stubNextFn = sinon.stub().throws();

            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(async function () {
                    return mockMediaTagsModel;
                });

            const fakeRequestObj = {
                params: { mediaId: 'id' },
                media: {},
            };

            const fakeResponseObj = {};

            // @ts-ignore
            load(fakeRequestObj, fakeResponseObj, stubNextFn).then(() => done('failed')).catch(() => done());
        });
    });
});