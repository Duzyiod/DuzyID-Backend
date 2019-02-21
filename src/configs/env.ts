import { getEnv } from '../helpers/env';

/* Application Settings */
export let PORT = getEnv('PORT', Number, 3001);
export let LOG_LVL = getEnv('LOG_LVL', String, 'debug');

/* Service Settings */
export let ROUTE_PATH = getEnv('ROUTE_PATH', String, '/');
export let SITE_NAME = getEnv('SITE_NAME', String, 'localhost');
export let BASE_URL = `//${SITE_NAME}${ROUTE_PATH}`;
export let X_POWERED_BY = getEnv('X_POWERED_BY', String, 'REST-Application');

/* Ebay Settings */
export let EBAY_API_IDENTITY_URL = getEnv('EBAY_API_IDENTITY_URL', String, 'https://api.sandbox.ebay.com/identity/v1/');
export let EBAY_API_BROWSE_URL = getEnv('EBAY_API_BROWSE_URL', String, 'https://api.sandbox.ebay.com/buy/browse/v1/');
export let EBAY_APP_ID = getEnv('EBAY_APP_ID', String);
export let EBAY_APP_CERT = getEnv('EBAY_APP_CERT', String);
