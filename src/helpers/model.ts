import * as _ from 'lodash';
import { ModelError } from './errors/errors';
import { isUUID } from 'validator';

/**
 * Abstract model with common features
 */
export abstract class Model {
    public abstract id: string;

    constructor(model: object) {
        if (_.isNil(model)) {
            throw new ModelError('Requires initial object');
        }
    }

    abstract get shortView(): object & { id: string; };

    static ids(ids: string[]) {
        if (
            Array.isArray(ids) === false
            || _.some(ids, id => isUUID(id) === false)
        ) {
            throw new ModelError('Required fields empty');
        }
        return _.uniq(ids.map(id => String(id)));
    }

    /**
     * Get full list as `.shortView`
     * @param {Model[]} models List of model instances
     */
    static shortViewList(models: Model[]) {
        return models.map(map);

        function map(model: Model) {
            if (model instanceof Model) {
                return model.shortView;
            }
            return model;
        }
    }
}