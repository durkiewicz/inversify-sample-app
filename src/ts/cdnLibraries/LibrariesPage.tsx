import * as React from 'react';

import { ContainerComponent } from '../sharedComponents/ContainerComponent';
import { SearchPanel } from './search/SearchPanel';

export class LibrariesPage extends React.Component<{}, void> {
    public render() {
        return <ContainerComponent component={SearchPanel}/>;
    }
}
