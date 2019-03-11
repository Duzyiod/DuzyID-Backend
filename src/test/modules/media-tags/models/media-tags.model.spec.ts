import { chai } from '../../../setup';

import { MediaTagsModel } from '../../../../modules/media-tags/models/media-tags.model';
import { mockAdsButton, mediaTags } from '../../../mocks/modules/media-tags/models/media-tags.model.mock';

const { expect } = chai;

describe('modules/media-tags/models/media-tags.model', function () {

    describe('constructor', function () {
        it('should not return an error', function () {
            const createInstance = function () {
                return new MediaTagsModel(mediaTags)
            };

            expect(createInstance).to.not.throw();
        });
    });

    describe('get button', function () {
        const model: MediaTagsModel = new MediaTagsModel(mediaTags);

        const button: any = model.button;

        it('check availability and types of return parameters', function () {
            expect(button).to.have.property('src').to.be.a('string');
            expect(button).to.have.property('position').to.be.a('array');
        });
    });

    describe('set button', function () {
        const model: MediaTagsModel = new MediaTagsModel(mediaTags);

        it('should not return an error', function () {
            const set = function () { model.button = mockAdsButton };

            expect(set).to.not.throw();
        });
    });

    describe('shortView', function () {
        const model: MediaTagsModel = new MediaTagsModel(mediaTags);

        const shortView: any = model.shortView;

        it('check availability and types of return parameters', function () {
            expect(shortView).to.have.property('id').to.be.a('string');
            expect(shortView).to.have.property('previewUrl').to.be.a('string');
            expect(shortView).to.have.property('videoUrl').to.be.a('string');
            expect(shortView).to.have.property('categoryId').to.be.a('number');
            expect(shortView).to.have.property('tags').to.be.a('array');
            expect(shortView).to.have.property('button');
            expect(shortView.button).to.have.property('src').to.be.a('string');
            expect(shortView.button).to.have.property('position').to.be.a('array');
        });
    });

    describe('dbView', function () {
        const model: MediaTagsModel = new MediaTagsModel(mediaTags);

        const shortView: any = model.dbView;

        it('check availability and types of return parameters', function () {
            expect(shortView).to.have.property('_id').to.be.a('string');
            expect(shortView).to.have.property('id').to.be.a('string');
            expect(shortView).to.have.property('previewUrl').to.be.a('string');
            expect(shortView).to.have.property('videoUrl').to.be.a('string');
            expect(shortView).to.have.property('categoryId').to.be.a('number');
            expect(shortView).to.have.property('tags').to.be.a('array');
            expect(shortView).to.have.property('button');
            expect(shortView.button).to.have.property('src').to.be.a('string');
            expect(shortView.button).to.have.property('position').to.be.a('array');
        });
    });

});