import { AdsButton } from '../../../../modules/media-tags/models/media-tags.model';

export const mockAdsButton: AdsButton = { src: 'src', position: ['top', 'left'] };

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
    previewUrl: 'previewUrl',
    videoUrl: 'videoUrl',
    categoryId: 1,
    tags: ['one', 'two'],
    button: mockAdsButton
};

