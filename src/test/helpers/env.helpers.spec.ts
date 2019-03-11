import { chai } from '../setup';
import { getEnv } from '../../helpers/env';

const { expect } = chai;

describe('helpers/env', function () {
    describe('getEnv', function () {
        it('should return an value', function () {
            const envName = 'PORT'; // test env init in file setup.ts
            const envValue = process.env[envName];
            const result = getEnv(envName, String);

            expect(result).to.be.a('string');
            expect(result).to.be.equal(envValue);
        });

        it('should return an error', function () {
            const fakeEnvName = 'PORT_FAKE';
            const constructor: any = String;

            expect(getEnv.bind(fakeEnvName, constructor)).to.be.throw();
        });

        it('should return an error because arg mute true', function () {
            const envName = 'PORT'; // test env init in file setup.ts
            const constructor: any = String;
            const otherwiseValue = 'otherwise value';

            expect(getEnv.bind(envName, constructor, otherwiseValue, true)).to.be.throw();
        });

        it('should return otherwise value', function () {
            const fakeEnvName = 'PORT_FAKE';
            const otherwiseValue = 'otherwise value';

            const result = getEnv(fakeEnvName, String, otherwiseValue);

            expect(result).to.be.a('string');
            expect(result).to.be.equal(otherwiseValue);
        });
    });
});