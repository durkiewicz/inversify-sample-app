import { injectable, multiInject } from 'inversify';
import { Effect, Effects, loop } from 'redux-loop';

import { GenericAction } from '../sharedModels/actions';
import { GlobalModel, initialGlobalModel } from '../sharedModels/globalModel';
import { ReducerContributor, ReducingFunction } from '../sharedModels/reducers';
import { sharedTypes } from '../sharedModels/types';
import * as Optional from '../utils/Optional';

type Loop = [GlobalModel, Effect];

const performReduction = (actionPayload: any) => (acc: Loop, f: ReducingFunction<any>) => {
    const [oldState, oldEffect] = acc;
    const result = f(oldState, actionPayload);
    if (result instanceof Array) {
        const [newState, effect] = result;
        return loop(newState, Effects.batch([ oldEffect, effect]));
    }
    return [result, Effects.none()] as Loop;
};

@injectable()
export class MainReducer {
    private mapOfReducersOrNull: Map<symbol, ReducingFunction<any>[]> | null;

    constructor(
        @multiInject(sharedTypes.ReducerContributor)
        private contributors: ReducerContributor<any>[],
    ) {
    }

    public getReducer() {
        return (state = initialGlobalModel, action: GenericAction<any>) =>
            Optional.ofNullable(this.mapOfReducers.get(action.type))
                .map(functions =>
                    functions.reduce(
                        performReduction(action.payload),
                        [state, Effects.none()] as [GlobalModel, Effect],
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
        this.contributors.forEach(c => {
            const functions = Optional.ofNullable(result.get(c.actionType))
                .orElse([]);
            result.set(c.actionType, functions.concat(c.reduce.bind(c)));
        });
        return result;
    }
}
