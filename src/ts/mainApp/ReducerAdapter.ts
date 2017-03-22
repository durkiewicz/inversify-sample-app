import * as _ from 'lodash';
import { Effect, isLoop, loop } from 'redux-loop';

import { injectable } from 'inversify';
import { GlobalModel } from '../sharedModels/globalModel';
import { ReducerContributor, ReducerContributorDepth1, ReducerContributorDepth2 } from '../sharedModels/reducers';

function stateOrLoop<T, K extends keyof T>
(
    newState: T,
    selector: K,
    result: T[K] | [T[K], Effect],
) {
    if (result instanceof Array && isLoop(result)) {
        const [newSubState, effect] = result;
        newState[selector] = newSubState;
        return loop(newState, effect);
    } else {
        newState[selector] = result as T[K];
        return newState;
    }
}

function useDeeperReducer<ActionPayload, T, K extends keyof T>
(
    state: T,
    payload: ActionPayload,
    reduce: f.Func2<T[K], ActionPayload, T[K]>,
    selector: K,
) {
    const newState = _.clone(state);
    const result = reduce(newState[selector], payload);
    return stateOrLoop(newState, selector, result);
}

@injectable()
export class ReducerAdapter {
    public adaptDepth1<ActionPayload, K extends keyof GlobalModel>(r: ReducerContributorDepth1<ActionPayload, K>) {
        const adapted: ReducerContributor<ActionPayload> = {
            actionType: r.actionType,
            reduce(state, payload) {
                return useDeeperReducer(state, payload, r.reduce.bind(r), r.selector);
            },
        };
        return adapted;
    }

    public adaptDepth2
    <ActionPayload, K1 extends keyof GlobalModel, K2 extends keyof GlobalModel[K1]>
    (
        r: ReducerContributorDepth2<ActionPayload, K1, K2>,
    ) {
        const adapted: ReducerContributorDepth1<ActionPayload, K1> = {
            actionType: r.actionType,
            selector: r.selector[0],
            reduce(state, payload) {
                return useDeeperReducer(state, payload, r.reduce.bind(r), r.selector[1]);
            },
        };
        return this.adaptDepth1(adapted);
    }
}
