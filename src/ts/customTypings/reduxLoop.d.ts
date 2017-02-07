declare module 'redux-loop' {
    import {Action, Reducer, StoreEnhancer, StoreCreator} from 'redux';
    interface Dispatch<S> {
        <A extends Action>(action: A): Promise<void>;
    }
    type EnhancedStore<S> = {
        dispatch: Dispatch<S>;
        getState(): S;
    }
    // TODO: Extend these types and add other effect types
    type BatchEffect = { type: 'BATCH' };
    type PromiseEffect = { type: 'PROMISE' };
    type ConstantEffect = { type: 'CONSTANT' };
    type NoneEffect = { type: "NONE" };
    type Effect = BatchEffect | PromiseEffect | ConstantEffect | NoneEffect;
    type EnhancedReducer<S> = <A extends Action>(state: S, action: A) => S | [S, Effect]
    type EnhancedStoreCreator = <S>(reducer: EnhancedReducer<S>, initialState: S, enhancer?: StoreEnhancer<S>) => EnhancedStore<S>
    type Enhancer = (store: StoreCreator) => EnhancedStoreCreator;
    // function install(): Enhancer;
    function install(): StoreEnhancer<any>;

    function loop<S>(state: S, effect: Effect): [S, Effect]

    namespace Effects {
        const batch: (effects: Effect[]) => BatchEffect;
        // TODO: How to type args depending on function passed in?
        // Not sure this is possible, we should change this to a type
        // safe friendly API.
        const promise: (fn: Function, arg1: any) => PromiseEffect;
        // TODO: This Action should be constrained by the Action type
        // passed into the reducer. This may require changing the API.
        const constant: (action: Action) => ConstantEffect;

        const none: () => NoneEffect;
    }
}
