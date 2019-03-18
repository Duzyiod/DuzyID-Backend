/**
 * Routes of Ads Media tags module
 * @memberof MediaTags
 */
import { Router } from '../../helpers/rest/router';

import * as mediaTagsController from './controllers/media-tags.controller';
import * as mediaTagsValidator from './validators/media-tags.validator';

export const router = Router();

/* Routes */
router.get('/:mediaId', mediaTagsController.load, mediaTagsController.getMedia);
router.put('/:mediaId', mediaTagsValidator.setMedia, mediaTagsController.setMedia);
router.delete('/:mediaId', mediaTagsController.load, mediaTagsController.removeMedia);