import { inject, injectable } from 'inversify';
import { Action, createStore, Store as ReduxStore } from 'redux';
import { install } from 'redux-loop';

import { GlobalModel, initialGlobalModel } from '../sharedModels/globalModel';
import { MainReducer } from './reducer';
import { mainAppTypes } from './types';

@injectable()
export class Store {
    private storeOrNull: ReduxStore<any> | undefined;

    constructor(
        @inject(mainAppTypes.MainReducer)
        private mainReducer: MainReducer,
    ) {
    }

    private get store() {
        if (this.storeOrNull == null) {
            this.storeOrNull = createStore(this.mainReducer.getReducer(), initialGlobalModel, install());
        }
        return this.storeOrNull;
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
