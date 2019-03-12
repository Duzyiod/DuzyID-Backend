import { chai, sinon, request, initServer, resetTestDB, deleteTestDB } from '../setup';

import { mockMediaTagsModel } from '../unit/mocks/modules/media-tags/service/media-tags.service.mock';
import * as mediaTagsService from '../../modules/media-tags/services/media-tags.service';

const { expect } = chai;

describe('modules/media-tags/controllers/media-tags.controller', function () {
    after(function () {
        deleteTestDB();
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
            resetTestDB();
        });

        it('should get media object. Code: 200', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(async function () {
                    return mockMediaTagsModel;
                });

            const mediaId = 1;

            request(this.httpServer.server)
                .get(`/media-tags/${mediaId}`)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.be.not.empty;
                    done();
                });
        });

        it('should get error not find object. Code: 404', function (done) {
            const mediaId = 1;

            request(this.httpServer.server)
                .get(`/media-tags/${mediaId}`)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(404);
                    expect(res.body.error).to.be.an('object');
                    expect(res.body.error).to.be.not.empty;
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
            resetTestDB();
        });

        it('should get and create media object. Code: 201', function (done) {
            const mediaId = 1;

            const mockFormModifyObj = mockMediaTagsModel.shortView;

            request(this.httpServer.server)
                .put(`/media-tags/${mediaId}`)
                .send(mockFormModifyObj)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(201);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.be.not.empty;
                    done();
                });
        });

        it('should get and update media object. Code: 202', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(async function () {
                    return mockMediaTagsModel;
                });

            const mediaId = 1;

            const mockFormModifyObj = mockMediaTagsModel.shortView;
            const newCategoryId = 2; // init id 1
            mockFormModifyObj.categoryId = newCategoryId;

            request(this.httpServer.server)
                .put(`/media-tags/${mediaId}`)
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

        it('should get error validation. Code: 422', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(async function () {
                    return mockMediaTagsModel;
                });

            const mediaId = 1;

            const mockFormObj = {};
            const lengthRequiredParams = (Object.keys(mockMediaTagsModel.shortView).length) - 1; //because field "id" is not required

            request(this.httpServer.server)
                .put(`/media-tags/${mediaId}`)
                .send(mockFormObj)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(422);
                    expect(res.body.error).to.be.an('object');
                    expect(res.body.error).to.be.not.empty;
                    expect(res.body.error.errors).to.be.an('array');
                    expect(res.body.error.errors).to.have.lengthOf(lengthRequiredParams);
                    done();
                });
        });

        it('should return error. Code: 500', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'create')
                .callsFake(async function () {
                    throw new Error();
                });

            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(async function () {
                    return null;
                });

            const mediaId = 1;

            const mockFormModifyObj = mockMediaTagsModel.shortView;

            request(this.httpServer.server)
                .put(`/media-tags/${mediaId}`)
                .send(mockFormModifyObj)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(500);
                    expect(res.body.error).to.be.an('object');
                    expect(res.body.error).to.be.not.empty;
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
            resetTestDB();
        });

        it('should delete and get delete media object. Code: 200', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'findById')
                .callsFake(async function () {
                    return mockMediaTagsModel;
                });

            this.sandbox
                .stub(mediaTagsService, 'remove')
                .callsFake(async function () {
                    return true;
                });

            const mediaId = 1;

            request(this.httpServer.server)
                .delete(`/media-tags/${mediaId}`)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.be.not.empty;
                    done();
                });
        });

        it('should return error. Code: 500', function (done) {
            this.sandbox
                .stub(mediaTagsService, 'remove')
                .callsFake(async function () {
                    throw new Error();
                });

            const mediaId = 1;

            const mockFormModifyObj = mockMediaTagsModel.shortView;

            request(this.httpServer.server)
                .delete(`/media-tags/${mediaId}`)
                .end(function (err: any, res: any) {
                    expect(res.statusCode).to.equal(500);
                    expect(res.body.error).to.be.an('object');
                    expect(res.body.error).to.be.not.empty;
                    done();
                });
        });
    });
});