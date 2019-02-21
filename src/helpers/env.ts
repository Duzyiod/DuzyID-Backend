export function getEnv<T>(name: string, constructor: (value: any) => T, otherwise: any = undefined, mute = false): T {
    if (name in process.env) {
        return constructor(process.env[name]);
    }
    if (otherwise === undefined && mute === false) {
        throw new Error(`Environment variable '${name}' required to be set.`);
    }
    return constructor(otherwise);
}
