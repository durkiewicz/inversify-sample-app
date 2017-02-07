import * as React from 'react';

import { lazyInject } from '../container';

import { Store } from '../mainApp/store';
import { mainAppTypes } from '../mainApp/types';
import { GlobalModel } from '../sharedModels/globalModel';

interface ContainerComponentProps {
    component: React.ComponentClass<GlobalModel>;
}

export class ContainerComponent extends React.Component<ContainerComponentProps, GlobalModel> {
    @lazyInject(mainAppTypes.Store)
    private store: Store;
    private unsubscribe: f.Action;

    constructor(props: ContainerComponentProps) {
        super(props);
        this.state = this.store.state;
    }

    public render() {
        const Component = this.props.component;
        return <Component {...this.state}/>;
    }

    protected componentWillMount() {
        this.unsubscribe = this.store.onStateChange(() => this.setState(this.store.state));
    }

    protected componentWillUnmount() {
        this.unsubscribe();
    }
}
