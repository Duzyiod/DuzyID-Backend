import { Model } from '../../../helpers/model';

export const mockModel = {};

export class MockModel extends Model {
    public id = 'id';

    constructor(model: object) {
        super(model);
    }

    get shortView() {
        return { id: this.id };
    }
};

export const mockNotUUID: string[] = [
    '861a5414',
    '9a6c6cab'
];

export const mockUUID: string[] = [
    '861a5414-6606-4851-9817-ed0186430d16',
    '9a6c6cab-3210-4444-a6e9-7717e1a51add'
];

export const mockBaseObject = { 'id': 'id', 'items': ['one', 'two'] }