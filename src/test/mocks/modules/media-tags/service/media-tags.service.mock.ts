import { mediaTags } from '../models/media-tags.model.mock';
import { MediaTagsModel } from '../../../../../modules/media-tags/models/media-tags.model';

export const mockMediaTagsModel = new MediaTagsModel(mediaTags);

const pathToMediaTagsService = '../../../../../modules/media-tags/services/media-tags.service';

export const getMediaTagsService = () => {
    delete require.cache[require.resolve(pathToMediaTagsService)];
    return require(pathToMediaTagsService);
};