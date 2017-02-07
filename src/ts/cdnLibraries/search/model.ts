import { SearchApiResult } from './api';

export const initialSearchState = {
    phrase: '',
    results: [] as SearchApiResult[],
};

export type SearchState = typeof initialSearchState;
