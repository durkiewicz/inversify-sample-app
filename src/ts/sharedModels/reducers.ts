import { Effect } from 'redux-loop';

import { GlobalModel } from './globalModel';

type GeneralReducingFunction<ActionPayload, ModelType> = f.Func2<ModelType, ActionPayload, ModelType | [ModelType, Effect]>;

export type ReducingFunction<ActionPayload> = GeneralReducingFunction<ActionPayload, GlobalModel>;

export interface ReducerContributor<ActionPayload> {
    actionType: symbol;
    reduce: ReducingFunction<ActionPayload>;
}

export interface ReducerContributorDepth1<ActionPayload, K extends keyof GlobalModel> {
    actionType: symbol;
    selector: K;
    reduce: GeneralReducingFunction<ActionPayload, GlobalModel[K]>;
}

export interface ReducerContributorDepth2<ActionPayload, K1 extends keyof GlobalModel, K2 extends keyof GlobalModel[K1]> {
    actionType: symbol;
    selector: [K1, K2];
    reduce: GeneralReducingFunction<ActionPayload, GlobalModel[K1][K2]>;
}
