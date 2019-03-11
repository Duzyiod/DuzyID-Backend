import { Router } from 'express';

import { router as ads } from '../modules/ads';
import { router as mediaTags } from '../modules/media-tags';

export const router = Router();

router.use('/ads', ads);
router.use('/media-tags', mediaTags);