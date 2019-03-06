import setTestEnv from './../../../env.test'
setTestEnv();

import sinon from 'sinon';
import { assert, expect } from 'chai';
import { find, findById, create, update, remove } from '../../../../modules/media-tags/services/media-tags.service';
import { mediaTags } from '../../../mocks/modules/media-tags/media-tags.model.mock';
import { MediaTagsModel } from '../../../../modules/media-tags/models/media-tags.model';

describe('modules/media-tags/services/media-tags.services', function () {
    describe('find', function () {
        it('should return array and check count items in array', async function () {
            await find();
        });
    });
});