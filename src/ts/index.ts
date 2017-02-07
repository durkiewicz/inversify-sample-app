/* tslint:disable-next-line */
/// <reference path='../../typings/index.d.ts'/>

import * as ReactDOM from 'react-dom';
import 'reflect-metadata';

import './inversify.config';
import { routes } from './routes';
import * as Optional from './utils/Optional';

Optional.ofNullable(document.getElementById('app'))
    .ifPresent(el => ReactDOM.render(routes, el));
