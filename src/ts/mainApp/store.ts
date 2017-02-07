import { inject, injectable } from 'inversify';
import { Action, createStore, Store as ReduxStore } from 'redux';
import { install } from 'redux-loop';

import { GlobalModel, initialGlobalModel } from '../sharedModels/globalModel';
import { MainReducer } from './reducer';
import { mainAppTypes } from './types';

@injectable()
export class Store {
    // TODO: remove static
    private static storeValue: ReduxStore<any> | undefined;

    constructor(
        @inject(mainAppTypes.MainReducer)
        private mainReducer: MainReducer,
    ) {
    }

    private get store() {
        if (Store.storeValue == null) {
            Store.storeValue = createStore(this.mainReducer.getReducer(), initialGlobalModel, install());
        }
        return Store.storeValue;
    }

    public dispatch<T extends Action>(action: T) {
        return this.store.dispatch(action);
    }

    public onStateChange(listener: f.Action) {
        return this.store.subscribe(listener);
    }

    get state(): GlobalModel {
        return this.store.getState();
    }
}
