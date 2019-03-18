/**
 * The service that provides a query to BrowseAPI of ebay for finding and mapping products
 * @memberof Ads
 */
import { EbayProductModel } from '../models/ebay.model';
import * as request from './requestToEbay';

/**
 * Search items from ebay based of keyworks
 * 
 * @public
 * @param tags Searching kayworks
 * @param limit Amount of items to be displayed
 * @returns Formated products list
 */
export async function search(tags: string[], limit = 5): Promise<EbayProductModel[]> {
    const result: EbayProductModel[] = [];
    const found = await request.requestToEbayBrowseAPI('item_summary/search', { q: tags.join(' '), limit: limit.toString() });

    if (found.itemSummaries && found.itemSummaries.length) {
        for (const itemSummary of found.itemSummaries) {
            result.push(EbayProductModel.buildProduct(itemSummary));
        }
    }

    return result;
}