import { SearchActions } from './cdnLibraries/search/actions';
import { SearchApi, SearchApiResults } from './cdnLibraries/search/api';
import { ChangeSearchPhraseReducer, SearchLibrariesSuccessReducer } from './cdnLibraries/search/reducers';
import { container } from './container';
import { MainReducer } from './mainApp/reducer';
import { Store } from './mainApp/store';
import { mainAppTypes } from './mainApp/types';
import { ReducerContributor } from './sharedModels/reducers';
import { sharedTypes } from './sharedModels/types';

container.bind<ReducerContributor<string>>(sharedTypes.ReducerContributor).to(ChangeSearchPhraseReducer);
container.bind<ReducerContributor<SearchApiResults>>(sharedTypes.ReducerContributor).to(SearchLibrariesSuccessReducer);
container.bind(mainAppTypes.MainReducer).to(MainReducer);
container.bind(mainAppTypes.Store).to(Store);
container.bind(SearchActions).toSelf();
container.bind(SearchApi).toSelf();

export { container };
