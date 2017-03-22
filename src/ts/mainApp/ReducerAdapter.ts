import * as _ from 'lodash';
import { loop } from 'redux-loop';

import { injectable } from 'inversify';
import { GlobalModel } from '../sharedModels/globalModel';
import { ReducerContributor, ReducerContributorDepth1 } from '../sharedModels/reducers';

@injectable()
export class ReducerAdapter {
    public adaptDepth1<ActionPayload, T extends keyof GlobalModel>(r: ReducerContributorDepth1<ActionPayload, T>) {
        const adapted: ReducerContributor<ActionPayload> = {
            actionType: r.actionType,
            reduce(state, payload) {
                const newState = _.clone(state);
                const result = r.reduce(newState[r.selector], payload);
                if (result instanceof Array) {
                    const [newSubState, effect] = result;
                    newState[r.selector] = newSubState;
                    return loop(newState, effect);
                } else {
                    newState[r.selector] = result;
                    return newState;
                }
            },
        };
        return adapted;
    }
}
