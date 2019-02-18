/**
 * The service that provides a query to BrowseAPI of ebay for finding and mapping products
 * @memberof Ads
 */
import request from 'request-promise-native';
import { EbayProductModel } from '../models/ebay.model';
import * as env from '../../../configs/env';

const API_URL = 'https://api.ebay.com/buy/browse/v1/';

/* Public */
/**
 * Search items from ebay based of keyworks
 * @param tags Searching kayworks
 * @param limit Amount of items to be displayed
 * @returns Formated products list
 */
export async function search(tags: string[], limit = 5): Promise<EbayProductModel[]> {
    const result: EbayProductModel[] = [];
    const found = await requestToEbayBrowseAPI('item_summary/search', { q: tags.join(' '), limit: limit.toString() });

    if (found.itemSummaries && found.itemSummaries.length) {
        for (const itemSummary of found.itemSummaries) {
            result.push(EbayProductModel.buildProduct(itemSummary));
        }
    }

    return result;
}

/* Private */
/**
 * Makes a query to ebay Browse API
 * @param path Request API path
 * @param params searching params in object
 */
async function requestToEbayBrowseAPI(path: string, params: { [x: string]: string }) {
    const body = await request({
        method:'GET',
        url: `${API_URL}${path}`,
        qs: params,
        headers: {
            'Authorization': `Bearer ${env.AUTH_TOKEN}`,
            'Content-Type': 'application/json',
            'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId>',

        }
    });

    return JSON.parse(body);
}