import { Effect } from 'redux-loop';

import { GlobalModel } from './globalModel';

type GeneralReducingFunction<ActionPayload, ModelType> = f.Func2<ModelType, ActionPayload, ModelType | [ModelType, Effect]>;

export type ReducingFunction<ActionPayload> = GeneralReducingFunction<ActionPayload, GlobalModel>;

export interface ReducerContributor<ActionPayload> {
    actionType: symbol;
    reduce: ReducingFunction<ActionPayload>;
}

export interface ReducerContributorDepth1<ActionPayload, T extends keyof GlobalModel> {
    actionType: symbol;
    selector: T;
    reduce: GeneralReducingFunction<ActionPayload, GlobalModel[T]>;
}
