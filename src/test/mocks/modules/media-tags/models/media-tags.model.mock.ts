import { AdsButton } from '../../../../../modules/media-tags/models/media-tags.model';

export const mockAdsButton: AdsButton = { src: 'https://ButtonSrc.com/', position: ['top', 'left'] };

type MediaTags = {
    id: string,
    previewUrl: string,
    videoUrl: string,
    categoryId: number,
    tags: string[],
    button: AdsButton
}

export const mediaTags: MediaTags = {
    id: 'id',
    previewUrl: 'https://previewUrl.com/',
    videoUrl: 'https://previewUrl.com/',
    categoryId: 1,
    tags: ['one', 'two'],
    button: mockAdsButton
};

