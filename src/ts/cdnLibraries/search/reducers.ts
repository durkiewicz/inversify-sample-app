import { injectable } from 'inversify';
import * as _ from 'lodash';
import { Effects, loop } from 'redux-loop';

import { GlobalModel } from '../../sharedModels/globalModel';
import { ReducerContributor } from '../../sharedModels/reducers';
import { CHANGE_SEARCH_PHRASE, SEARCH_LIBRARIES, searchLibrariesSuccess } from './actions';
import { SearchApi, SearchApiResults } from './api';

@injectable()
export class ChangeSearchPhraseReducer implements ReducerContributor<string> {
    public readonly actionType = CHANGE_SEARCH_PHRASE;

    constructor(
        private api: SearchApi,
    ) { }

    public reduce(model: GlobalModel, phrase: string) {
        const result = _.clone(model);
        result.search = _.clone(result.search);
        result.search.phrase = phrase;
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
export class SearchLibrariesSuccessReducer implements ReducerContributor<SearchApiResults> {
    public readonly actionType = SEARCH_LIBRARIES.succeed;

    public reduce(model: GlobalModel, results: SearchApiResults) {
        const result = _.clone(model);
        result.search = _.clone(result.search);
        result.search.results = results.results;
        return result;
    }
}
