import { Effect } from 'redux-loop';

import { GlobalModel } from './globalModel';

export type ReducingFunction<ActionPayload> = f.Func2<GlobalModel, ActionPayload, GlobalModel | [GlobalModel, Effect]>;

export interface ReducerContributor<ActionPayload> {
    actionType: symbol;
    reduce: ReducingFunction<ActionPayload>;
}
