import { SearchActions } from './cdnLibraries/search/actions';
import { SearchApi } from './cdnLibraries/search/api';
import { ChangeSearchPhraseReducer, SearchLibrariesSuccessReducer } from './cdnLibraries/search/reducers';
import { container } from './container';
import { MainReducer } from './mainApp/reducer';
import { ReducerAdapter } from './mainApp/ReducerAdapter';
import { Store } from './mainApp/store';
import { mainAppTypes } from './mainApp/types';
import { sharedTypes } from './sharedModels/types';

container.bind(sharedTypes.ReducerContributorDepth2).to(ChangeSearchPhraseReducer);
container.bind(sharedTypes.ReducerContributorDepth2).to(SearchLibrariesSuccessReducer);
container.bind(mainAppTypes.MainReducer).to(MainReducer).inSingletonScope();
container.bind(mainAppTypes.Store).to(Store).inSingletonScope();
container.bind(SearchActions).toSelf();
container.bind(SearchApi).toSelf();
container.bind(ReducerAdapter).toSelf();

export { container };
