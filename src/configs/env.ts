/* Application Settings */
export let PORT = 3001;
if (process.env.PORT) {
    PORT = Number(process.env.PORT) || PORT;
}
export let LOG_LVL = 'debug';
if (process.env.LOG_LVL) {
    LOG_LVL = process.env.LOG_LVL;
}

/* Service Settings */
export let ROUTE_PATH = '/';
if (process.env.ROUTE_PATH) {
    ROUTE_PATH = process.env.ROUTE_PATH;
}
export let SITE_NAME = 'localhost';
if (process.env.SITE_NAME) {
    SITE_NAME = String(process.env.SITE_NAME);
}
export let BASE_URL = `//${SITE_NAME}${ROUTE_PATH}`;
export let X_POWERED_BY = 'REST-Application';
if (process.env.X_POWERED_BY) {
    X_POWERED_BY = String(process.env.X_POWERED_BY);
}

/* Ebay Settings */
export let AUTH_TOKEN = ''
if (process.env.AUTH_TOKEN) {
    AUTH_TOKEN = String(process.env.AUTH_TOKEN);
}
