import { chai, resetTestDB, deleteTestDB } from '../../../setup';

import {
    mockMediaTagsModel,
    getMediaTagsService
} from '../../../mocks/modules/media-tags/service/media-tags.service.mock';

const { expect, assert } = chai;

describe('modules/media-tags/services/media-tags.service', function () {
    after(function () {
        deleteTestDB();
    });

    describe('create', function () {
        afterEach(function () {
            resetTestDB();
        });

        it('should return created item', async function () {
            const { create } = getMediaTagsService();

            const result = await create(mockMediaTagsModel);

            expect(result).to.be.a('object');
        });
    });

    describe('find', function () {
        afterEach(function () {
            resetTestDB();
        });

        it('should return items at array', async function () {
            const { create, find } = getMediaTagsService();

            await create(mockMediaTagsModel);

            const result = await find();

            expect(result).to.be.a('array');
            assert.lengthOf(result, 1);
        });

        it('should return empty array', async function () {
            const { find } = getMediaTagsService();

            const result = await find();

            expect(result).to.be.a('array');
            assert.lengthOf(result, 0);
        });
    });

    describe('findById', function () {
        afterEach(function () {
            resetTestDB();
        });

        it('should return items at object', async function () {
            const { create, findById } = getMediaTagsService();

            const itemId = 'id';

            await create(mockMediaTagsModel);
            const result = await findById(itemId);

            expect(result).to.be.a('object');
        });

        it('should return error', function (done) {
            const { findById } = getMediaTagsService();

            const itemId = 'id';

            findById(itemId).then(() => done('failed')).catch(() => done());
        });
    });

    describe('update', function () {
        afterEach(function () {
            resetTestDB();
        });

        it('should return updated item and check params and values', async function () {
            const { create, update } = getMediaTagsService();

            const result = await create(mockMediaTagsModel);

            const updateValue = 'idUpdate';

            result.id = updateValue;

            const updateResult = await update(result);

            expect(updateResult).to.be.a('object');
            expect(updateResult).to.have.property('id', updateValue).to.be.a('string');
        });
    });

    describe('remove', function () {
        after(function () {
            resetTestDB();
        });

        const id = 'id';
        let findByIdFn: any = null;

        it('should return removed element', async function () {
            const { create, remove, findById } = getMediaTagsService();
            findByIdFn = findById
            const result = await create(mockMediaTagsModel);

            const removeResult = await remove(result);

            expect(removeResult).to.be.a('object');
        });

        it('should not find removed item', function (done) {
            findByIdFn(id).then(() => done('failed')).catch(() => done());
        });
    });
});