import * as env from '../../../configs/env';
import request from 'request-promise-native';
import { getToken } from './ebay-auth.service';

/**
* Makes a query to ebay Browse API
* 
* @private
* @param path Request API path
* @param params searching params in object
*/
export async function requestToEbayBrowseAPI(path: string, params: { [x: string]: string }) {
    const authToken = await getToken();
    const body = await request.get({
        method: 'GET',
        url: `${env.EBAY_API_BROWSE_URL}${path}`,
        qs: params,
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>',
        }
    });

    return JSON.parse(body);
}