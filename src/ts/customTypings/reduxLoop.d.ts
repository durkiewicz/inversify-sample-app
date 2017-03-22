declare module 'redux-loop' {
    import {Action, Reducer, StoreEnhancer, StoreCreator} from 'redux';
    interface Dispatch<S> {
        <A extends Action>(action: A): Promise<void>;
    }
    type EnhancedStore<S> = {
        dispatch: Dispatch<S>;
        getState(): S;
    }
    
    type BatchEffect = { type: 'BATCH' };
    type PromiseEffect = { type: 'PROMISE' };
    type ConstantEffect = { type: 'CONSTANT' };
    type NoneEffect = { type: "NONE" };
    type Effect = BatchEffect | PromiseEffect | ConstantEffect | NoneEffect;
    type EnhancedReducer<S> = <A extends Action>(state: S, action: A) => S | [S, Effect]
    type EnhancedStoreCreator = <S>(reducer: EnhancedReducer<S>, initialState: S, enhancer?: StoreEnhancer<S>) => EnhancedStore<S>
    type Enhancer = (store: StoreCreator) => EnhancedStoreCreator;
    function install(): StoreEnhancer<any>;

    function loop<S>(state: S, effect: Effect): [S, Effect];

    function isLoop<S>(potentialLoop: any): potentialLoop is [S, Effect];

    namespace Effects {
        interface PromiseEffectFactory {
            <TAction extends Action>(fn: () => Promise<TAction>): PromiseEffect;
            <TAction extends Action, A1>(fn: (a1: A1) => Promise<TAction>, a1: A1): PromiseEffect;
            <TAction extends Action, A1, A2>(fn: (a1: A1, a2: A2) => Promise<TAction>, a1: A1, a2: A2): PromiseEffect;
            <TAction extends Action, A1, A2, A3>(fn: (a1: A1, a2: A2, a3: A3) => Promise<TAction>, a1: A1, a2: A2, a3: A3): PromiseEffect;
            <TAction extends Action, A1, A2, A3, A4>(fn: (a1: A1, a2: A2, a3: A3, a4: A4) => Promise<TAction>, a1: A1, a2: A2, a3: A3, a4: A4): PromiseEffect;
        }

        const batch: (effects: Effect[]) => BatchEffect;
        const promise: PromiseEffectFactory;
        const constant: (action: Action) => ConstantEffect;
        const none: () => NoneEffect;
    }
}
