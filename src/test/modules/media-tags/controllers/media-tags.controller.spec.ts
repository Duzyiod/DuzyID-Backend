import { chai, sinon, request, initServer } from '../../../setup';

import { mockMediaTagsModel } from '../../../mocks/modules/media-tags/service/media-tags.service.mock';
import * as mediaTagsService from '../../../../modules/media-tags/services/media-tags.service';
import { load } from '../../../../modules/media-tags/controllers/media-tags.controller';

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
                .callsFake(function () {
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
                .callsFake(function () {
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

    describe('#GET /media-tags/:mediaId media', function () {
        before(function () {
            this.httpServer = initServer();
        });

        after(function () {
            this.httpServer.serverClose();
        });

        beforeEach(function () {
            this.sandbox = sinon.createSandbox();
        });

        afterEach(function () {
            this.sandbox.restore();
        });

        it('should get media object', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(function () {
                    return mockMediaTagsModel;
                });

            request(this.httpServer.server)
                .get('/media-tags/1')
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.be.not.empty;
                    done();
                });
        });
    });

    describe('#PUT /media-tags/:mediaId media', function () {
        before(function () {
            this.httpServer = initServer();
        });

        after(function () {
            this.httpServer.serverClose();
        });

        beforeEach(function () {
            this.sandbox = sinon.createSandbox();
        });

        afterEach(function () {
            this.sandbox.restore();
        });

        it('should get and set media object', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(async function () {
                    return mockMediaTagsModel;
                });

            const mockFormModifyObj = mockMediaTagsModel.shortView;
            const newCategoryId = 2; // init id 1
            mockFormModifyObj.categoryId = newCategoryId;

            request(this.httpServer.server)
                .put('/media-tags/1')
                .send(mockFormModifyObj)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(202);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.be.not.empty;
                    expect(res.body.data).to.have.property('categoryId').to.be.a('number');
                    expect(res.body.data.categoryId).to.be.equal(newCategoryId);
                    done();
                });
        });
    });

    describe('#DELETE /media-tags/:mediaId media', function () {
        before(function () {
            this.httpServer = initServer();
        });

        after(function () {
            this.httpServer.serverClose();
        });

        beforeEach(function () {
            this.sandbox = sinon.createSandbox();
        });

        afterEach(function () {
            this.sandbox.restore();
        });

        it('should delete and get delete media object', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(function () {
                    return mockMediaTagsModel;
                });

            request(this.httpServer.server)
                .delete('/media-tags/1')
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.be.not.empty;
                    done();
                });
        });
    });
});