import { chai, sinon } from '../setup';

const { expect, assert } = chai;

const getRouter = () => {
    const path = '../../helpers/rest/router';
    delete require.cache[require.resolve(path)];
    return require(path);
};

describe('helpers/rest/router', function () {
    describe('CrossAppEventEmitter on', function () {
        beforeEach(function () {
            this.router = getRouter();
        });

        it('should add event function from this variable', function () {
            const spyListener = sinon.spy();
            const eventName = 'testEventName';

            this.router.crossAppEventEmitter.on(eventName, spyListener);

            expect(this.router.crossAppEventEmitter.emitter._events).to.have.property(eventName).to.be.a('function');
        });
    });

    describe('CrossAppEventEmitter off', function () {
        beforeEach(function () {
            this.router = getRouter();
        });

        it('should remove event function from this variable', function () {
            const spyListener = sinon.spy();
            const eventName = 'testEventName';

            this.router.crossAppEventEmitter.on(eventName, spyListener);

            this.router.crossAppEventEmitter.off(eventName, spyListener);

            expect(this.router.crossAppEventEmitter.emitter._eventsCount).to.be.equal(0);
        });
    });

    describe('CrossAppEventEmitter emit', function () {
        beforeEach(function () {
            this.router = getRouter();
        });

        it('should call spy fn and return message', function () {
            const spyListener = sinon.spy();
            const eventName = 'testEventName';

            this.router.crossAppEventEmitter.on(eventName, spyListener);

            const message = 'oneArg';

            this.router.crossAppEventEmitter.emit(eventName, message);

            assert.isTrue(spyListener.called);
            assert.equal(spyListener.args[0][0], message);
        });
    });

    describe('Router', function () {
        beforeEach(function () {
            this.router = getRouter();
        });

        it('should return function', function () {
            const result = this.router.Router();

            expect(result).to.be.a('function');
        });
    });
});