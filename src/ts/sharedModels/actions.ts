export interface GenericAction<T> {
    type: symbol;
    payload: T;
}

export function asyncActions(baseName: string) {
    return {
        fail: Symbol(baseName + '_FAIL'),
        start: Symbol(baseName + '_START'),
        succeed: Symbol(baseName + '_SUCCEED'),
    };
}

export const payloadAction = <T> (type: symbol) => (payload: T) => {
    return {
        type,
        payload,
    };
};
