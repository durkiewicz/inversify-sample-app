import { injectable, multiInject, optional } from 'inversify';
import { Effect, Effects, loop } from 'redux-loop';

import { GenericAction } from '../sharedModels/actions';
import { GlobalModel, initialGlobalModel } from '../sharedModels/globalModel';
import { ReducerContributor, ReducerContributorDepth1, ReducingFunction } from '../sharedModels/reducers';
import { sharedTypes } from '../sharedModels/types';
import * as Optional from '../utils/Optional';
import { ReducerAdapter } from './ReducerAdapter';

type Loop = [GlobalModel, Effect];

const performReduction = (actionPayload: any) => (acc: Loop, f: ReducingFunction<any>) => {
    const [oldState, oldEffect] = acc;
    const result = f(oldState, actionPayload);
    if (result instanceof Array) {
        const [newState, effect] = result;
        return loop(newState, Effects.batch([ oldEffect, effect]));
    }
    return loop(result, Effects.none());
};

@injectable()
export class MainReducer {
    private mapOfReducersOrNull: Map<symbol, ReducingFunction<any>[]> | null;

    constructor(
        private adapter: ReducerAdapter,
        @optional() @multiInject(sharedTypes.ReducerContributor)
        private contributors: ReducerContributor<any>[],
        @optional() @multiInject(sharedTypes.ReducerContributorDepth1)
        private contributors1: ReducerContributorDepth1<any, any>[],
    ) {
    }

    public getReducer() {
        return (state = initialGlobalModel, action: GenericAction<any>) =>
            Optional.ofNullable(this.mapOfReducers.get(action.type))
                .map(functions =>
                    functions.reduce(
                        performReduction(action.payload),
                        loop(state, Effects.none()),
                    ),
                )
                .orElse([state, Effects.none()]);
    }

    private get mapOfReducers() {
        if (this.mapOfReducersOrNull == null) {
            this.mapOfReducersOrNull = this.buildMapOfReducers();
        }
        return this.mapOfReducersOrNull;
    }

    private buildMapOfReducers() {
        const result = new Map<symbol, ReducingFunction<any>[]>();
        this.allContributors.forEach(c => {
            const functions = Optional.ofNullable(result.get(c.actionType))
                .orElse([]);
            result.set(c.actionType, functions.concat(c.reduce.bind(c)));
        });
        return result;
    }

    private get allContributors() {
        return this.contributors
            .concat(this.contributors1.map(this.adapter.adaptDepth1, this));
    }
}
