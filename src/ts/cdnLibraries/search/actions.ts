import { inject, injectable } from 'inversify';

import { Store } from '../../mainApp/store';
import { mainAppTypes } from '../../mainApp/types';
import { asyncActions, payloadAction } from '../../sharedModels/actions';
import { SearchApiResults } from './api';

export const CHANGE_SEARCH_PHRASE = Symbol('CHANGE_SEARCH_PHRASE');
export const SEARCH_LIBRARIES = asyncActions('SEARCH_LIBRARIES');

export const searchLibrariesSuccess = payloadAction<SearchApiResults>(SEARCH_LIBRARIES.succeed);

@injectable()
export class SearchActions {
    constructor(
        @inject(mainAppTypes.Store)
        private store: Store,
    ) {
    }

    public searchLibraries(phrase: string) {
        this.store.dispatch({
            payload: phrase,
            type: CHANGE_SEARCH_PHRASE,
        });
    }
}
