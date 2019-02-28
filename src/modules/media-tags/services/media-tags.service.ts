/**
 * this is the CRUD access to MediaTags we store in our system.
 * It is only hase a list of MediaTags. Not execution of them.
 */
const Datastore = require('nedb-promise'); // бикоз

import * as env from '../../../configs/env';
import { InstanceError, NotExistsError } from '../../../helpers/errors/errors';
import { MediaTagsModel } from '../models/media-tags.model';

const db = new Datastore({ filename: env.DB_STORE_FILE, autoload: true });

/* Public */
/**
 * Finds Medias by filter
 * @param filters Mongo filter query
 * @throws {Error}
 */
export async function find(filters: any = {}): Promise<MediaTagsModel[]> {
    const mediaTagsModels = await db.find(filters);

    return mediaTagsModels.map((doc: any) => new MediaTagsModel(doc));
}

/**
 * Finds MediaTags by it's Id
 * @param id Media ID
 * @returns Found MediaTags model object
 * @throws {NotExistsError|Error}
 */
export async function findById(id: string): Promise<MediaTagsModel> {
    const mediaTagsModels = await find({ id });

    if (mediaTagsModels.length === 1) {
        return mediaTagsModels[0];
    }

    throw new NotExistsError('MediaTags not found');
}

/**
 * Creates MediaTagsModel in DB
 * @param mediaTagsModel MediaTagsModel instance to be stored in DB
 * @returns Inserted MediaTagsModel
 * @throws {InstanceError|Error}
 */
export async function create(mediaTagsModel: MediaTagsModel) {
    if (mediaTagsModel instanceof MediaTagsModel === false) {
        throw new InstanceError();
    }

    await db.insert(mediaTagsModel.dbView);

    return mediaTagsModel;
}

/**
 * Updates MediaTagsModel in DB
 * @param mediaTagsModel MediaTagsModel instance to be stored in DB
 * @returns Updated MediaTagsModel
 * @throws {InstanceError|Error}
 */
export async function update(mediaTagsModel: MediaTagsModel) {
    if (mediaTagsModel instanceof MediaTagsModel === false) {
        throw new InstanceError();
    }

    await db.update({ id: mediaTagsModel.id }, mediaTagsModel.dbView);

    return mediaTagsModel;
}

/**
 * Removes MediaTagsModel from DB
 * @param mediaTagsModel MediaTagsModel instance to be destroyed in DB
 * @returns Removed MediaTagsModel
 * @throws {InstanceError|Error}
 */
export async function remove(mediaTagsModel: MediaTagsModel) {
    if (mediaTagsModel instanceof MediaTagsModel === false) {
        throw new InstanceError();
    }

    await db.remove({ id: mediaTagsModel.id });

    return mediaTagsModel;
}
