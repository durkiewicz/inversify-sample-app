import { initialSearchState } from '../cdnLibraries/search/model';

export const initialGlobalModel = {
    search: initialSearchState,
};

export type GlobalModel = typeof initialGlobalModel;
