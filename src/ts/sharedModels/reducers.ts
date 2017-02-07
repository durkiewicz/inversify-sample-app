import { Effect } from 'redux-loop';

import { GlobalModel } from './globalModel';

export type ReducingFunction<T> = f.Func2<GlobalModel, T, GlobalModel | [GlobalModel, Effect]>;

export interface ReducerContributor<T> {
    actionType: symbol;
    reduce: ReducingFunction<T>;
}
