/**
 * Routes of Ads pulling module
 * @memberof Ads
 */
import { Router } from '../../helpers/rest/router';

import * as mediaTagsController from '../media-tags/controllers/media-tags.controller';
import * as adsController from './controllers/ads.controller';
import * as adsValidator from './validators/ads.validator';

export const router = Router();

/* Routes */
router.get('/', adsValidator.getProducts, adsController.getProducts);
router.get('/by-media-tags/:mediaId', mediaTagsController.load, adsController.getProductByMedia);
