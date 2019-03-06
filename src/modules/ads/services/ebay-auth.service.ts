/**
 * The service that provides a query to BrowseAPI of ebay for finding and mapping products
 * @memberof Ads
 */
import request from 'request-promise-native';
import * as env from '../../../configs/env';

// It stays only on App instance level
export let accessToken: string | null = null;

export async function getToken(): Promise<string> {
    if (accessToken !== null) {
        return accessToken;
    }

    const authHeader = Buffer.from(`${env.EBAY_APP_ID}:${env.EBAY_APP_CERT}`).toString("base64");
    const path = 'oauth2/token';
    const body = await request.post({
        url: `${env.EBAY_API_IDENTITY_URL}${path}`,
        headers: {
            'Authorization': `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            grant_type: "client_credentials",
            scope: 'https://api.ebay.com/oauth/api_scope',
        },
    });

    const data = JSON.parse(body);

    accessToken = data.access_token;
    expireToken(data.expires_in);

    return data.access_token;
}

export function expireToken(sec: number) {
    setTimeout(() => accessToken = null, sec * 1000);
}