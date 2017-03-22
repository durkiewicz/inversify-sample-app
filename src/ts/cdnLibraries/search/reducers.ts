import { injectable } from 'inversify';
import { Effects, loop } from 'redux-loop';

import { ReducerContributorDepth2 } from '../../sharedModels/reducers';
import { CHANGE_SEARCH_PHRASE, SEARCH_LIBRARIES, searchLibrariesSuccess } from './actions';
import { SearchApi, SearchApiResponse, SearchApiResult } from './api';

@injectable()
export class ChangeSearchPhraseReducer implements ReducerContributorDepth2<string, 'search', 'phrase'> {
    public readonly actionType = CHANGE_SEARCH_PHRASE;
    public readonly selector: ['search', 'phrase'] = ['search', 'phrase'];

    constructor(
        private api: SearchApi,
    ) { }

    public reduce(_0: string, phrase: string) {
        return loop(phrase, this.effect(phrase));
    }

    private effect(phrase: string) {
        if (phrase.length > 2) {
            return Effects.promise(() =>
                this.api.search(phrase)
                    .then(searchLibrariesSuccess),
            );
        }
        return Effects.none();
    }
}

@injectable()
export class SearchLibrariesSuccessReducer implements ReducerContributorDepth2<SearchApiResponse, 'search', 'results'> {
    public readonly actionType = SEARCH_LIBRARIES.succeed;
    public readonly selector: ['search', 'results'] = ['search', 'results'];

    public reduce(_0: SearchApiResult[], response: SearchApiResponse) {
        return response.results;
    }
}
