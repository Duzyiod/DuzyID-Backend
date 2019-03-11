import { chai, sinon, request, initServer } from '../../../setup';

import { mockMediaTagsModel } from '../../../mocks/modules/media-tags/service/media-tags.service.mock';
import * as mediaTagsService from '../../../../modules/media-tags/services/media-tags.service';
import * as requestToEbay from '../../../../modules/ads/services/requestToEbay';

const { expect } = chai;

describe('modules/ads/controllers/ads.controllers', function () {

    describe('#GET / products', function () {
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

            this.sandbox
                .stub(requestToEbay, 'requestToEbayBrowseAPI')
                .callsFake(function () {
                    return {};
                });

            const mockFormModifyObj = mockMediaTagsModel.shortView;

            request(this.httpServer.server)
                .get('/ads/')
                .query(mockFormModifyObj)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.be.not.empty;
                    done();
                });
        });
    });

    describe('#GET /by-media-tags/:mediaId', function () {
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

            this.sandbox
                .stub(requestToEbay, 'requestToEbayBrowseAPI')
                .callsFake(function () {
                    return {};
                });

            const mockFormModifyObj = mockMediaTagsModel.shortView;

            request(this.httpServer.server)
                .get('/ads/by-media-tags/1')
                .query(mockFormModifyObj)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.be.not.empty;
                    done();
                });
        });
    });
});