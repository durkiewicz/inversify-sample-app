import * as React from 'react';
import {
    hashHistory,
    Route,
    Router,
} from 'react-router';

import { SearchPanel } from './cdnLibraries/search/SearchPanel';
import { containerComponent } from './sharedComponents/ContainerComponent';

export const routes = (
    <Router history={ hashHistory }>
        <Route path='/' component={containerComponent(s => s.search, SearchPanel)}/>
    </Router>
);
