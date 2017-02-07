import * as React from 'react';
import {
    hashHistory,
    Route,
    Router,
} from 'react-router';

import { LibrariesPage } from './cdnLibraries/LibrariesPage';

export const routes = (
    <Router history={ hashHistory }>
        <Route path='/' component={LibrariesPage}/>
    </Router>
);
