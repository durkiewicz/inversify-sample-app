import { injectable } from 'inversify';
import * as _ from 'lodash';
import { Effects, loop } from 'redux-loop';

import { ReducerContributorDepth1 } from '../../sharedModels/reducers';
import { CHANGE_SEARCH_PHRASE, SEARCH_LIBRARIES, searchLibrariesSuccess } from './actions';
import { SearchApi, SearchApiResults } from './api';
import { SearchState } from './model';

@injectable()
export class ChangeSearchPhraseReducer implements ReducerContributorDepth1<string, 'search'> {
    public readonly actionType = CHANGE_SEARCH_PHRASE;
    public readonly selector = 'search';

    constructor(
        private api: SearchApi,
    ) { }

    public reduce(model: SearchState, phrase: string) {
        const result = _.clone(model);
        result.phrase = phrase;
        return loop(result, this.effect(phrase));
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
export class SearchLibrariesSuccessReducer implements ReducerContributorDepth1<SearchApiResults, 'search'> {
    public readonly actionType = SEARCH_LIBRARIES.succeed;
    public readonly selector = 'search';

    public reduce(model: SearchState, results: SearchApiResults) {
        const result = _.clone(model);
        result.results = results.results;
        return result;
    }
}
