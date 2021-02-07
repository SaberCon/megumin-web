export const assert = (condition: boolean, message: string = '') => {
    if (!condition) {
        throw Error(`Assert failed: ${message}`);
    }
};