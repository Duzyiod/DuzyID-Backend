import { Model, get, getMap } from '../../helpers/model';
import { MockModel, mockModel, mockNotUUID, mockUUID, mockBaseObject } from '../mocks/helpers/model.mock';
import { expect, assert } from 'chai';

describe('helpers/model', function () {
    describe('constructor', function () {
        it('should not return an error', function () {
            const createInstance = function () {
                return new MockModel(mockModel);
            };

            expect(createInstance).to.not.throw();
        });
    });

    describe('shortView', function () {
        const model: Model = new MockModel(mockModel);

        const shortView: any = model.shortView;

        it('check availability and types of return parameters', function () {
            expect(shortView).to.have.property('id').to.be.a('string');
        });
    });

    describe('ids', function () {
        it('should return an error', function () {
            const ids = function () { return MockModel.ids(mockNotUUID); }

            expect(ids).to.throw();
        });

        it('should return array result', function () {
            const ids = MockModel.ids(mockUUID);

            expect(ids).to.be.a('array');
        });
    });

    describe('shortViewList', function () {
        const models: Model[] = [new MockModel(mockModel), new MockModel(mockModel)];

        const shortViewList: object[] = MockModel.shortViewList(models);

        it('check availability and types of return parameters', function () {
            expect(shortViewList).to.be.a('array');

            for (const item of shortViewList) {
                expect(item).to.be.a('object');
                expect(item).to.have.property('id').to.be.a('string');
            }
        });
    });

    describe('get<T>', function () {
        it('should return an object value', function () {
            const value: string = get(mockBaseObject, 'id', String);

            expect(value).to.be.a('string');
        });

        it('should return null', function () {
            const value: string = get(mockBaseObject, 'undefined', String);

            expect(value).to.be.a('null');
        });
    });

    describe('getMap<T>', function () {
        it('should return an object value', function () {
            const value: string[] = getMap(mockBaseObject, 'items', String);

            expect(value).to.be.a('array');
            assert.isNotEmpty(value);
            assert.lengthOf(value, 2);
        });

        it('should return empty array', function () {
            const value: string[] = getMap(mockBaseObject, 'id', String);

            expect(value).to.be.a('array');
            assert.isEmpty(value);
        });
    });
});