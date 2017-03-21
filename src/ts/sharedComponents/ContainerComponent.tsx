import * as React from 'react';

import { lazyInject } from '../container';

import { Store } from '../mainApp/store';
import { mainAppTypes } from '../mainApp/types';
import { GlobalModel } from '../sharedModels/globalModel';

export function containerComponent<T>(selector: f.Func1<GlobalModel, T>, Component: React.ComponentClass<T>) {
    class ContainerComponent extends React.Component<{}, GlobalModel> {
        @lazyInject(mainAppTypes.Store)
        private store: Store;

        private unsubscribe: f.Action;

        constructor(props: {}) {
            super(props);
            this.state = this.store.state;
        }

        public render() {
            const props = selector(this.state);
            return <Component {...props}/>;
        }

        protected componentWillMount() {
            this.unsubscribe = this.store.onStateChange(() => this.setState(this.store.state));
        }

        protected componentWillUnmount() {
            this.unsubscribe();
        }
    }

    return ContainerComponent;
}
