

import { Router } from 'express';

import { router as ads } from '../modules/ads';

export const router = Router();

router.use('/ads', ads);
