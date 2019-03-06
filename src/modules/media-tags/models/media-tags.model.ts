import * as _ from 'lodash';
import { Model, get, getMap } from '../../../helpers/model';
import { ModelError } from '../../../helpers/errors/errors';

export type AdsButton = { src: string, position: ['top' | 'bottom', 'left' | 'right'] };
export const BUTTON_SRC = 'https://d1o176s0aoq15o.cloudfront.net/duzy-id-btn.png';

export class MediaTagsModel extends Model {
    public id: string;
    public previewUrl: string;
    public videoUrl: string;
    public categoryId: number;
    public tags: string[];

    private _button?: AdsButton;
    public get button(): AdsButton {
        if (this._button && this._button.src) {
            return this._button;
        }
        return {
            src: BUTTON_SRC,
            position: ['top', 'right'],
        };
    }

    public set button(value) {
        if (
            typeof value === 'object' &&
            typeof value.src === 'string' &&
            value.position instanceof Array &&
            value.position.length === 2
        ) {
            this._button = value;
        } else {
            throw new ModelError('button has to include reuired fields');
        }
    }

    constructor(mediaTags: { [x: string]: any }) {
        super(mediaTags);

        this.id = get(mediaTags, 'id', String);

        this.previewUrl = get(mediaTags, 'previewUrl', String);
        this.videoUrl = get(mediaTags, 'videoUrl', String);

        this.categoryId = get(mediaTags, 'categoryId', Number);

        this.tags = _.uniq(getMap(mediaTags, 'tags', String));

        this.button = mediaTags.button;
    }

    public get shortView() {
        return {
            id: this.id,
            previewUrl: this.previewUrl,
            videoUrl: this.videoUrl,
            categoryId: this.categoryId,
            tags: this.tags,
            button: this.button,
        };
    }

    public get dbView() {
        return {
            _id: this.id,
            ...this.shortView,
        };
    }
}