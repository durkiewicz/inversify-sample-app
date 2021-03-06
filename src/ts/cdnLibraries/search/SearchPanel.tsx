import * as React from 'react';

import { lazyInject } from '../../container';
import { Input } from '../../sharedComponents/forms/Input';
import { SearchActions } from './actions';
import { SearchApiResult } from './api';
import { SearchState } from './model';

export class SearchPanel extends React.Component<SearchState, {}> {
    @lazyInject(SearchActions)
    private actions: SearchActions;

    public render() {
        return (
            <div className='container'>
                <h2>Search CDNJS libraries</h2>
                <Input
                    onChange={ ev => this.actions.searchLibraries(ev.target.value) }
                    value={this.props.phrase}
                    placeholder='Type something to search...'
                    />
                {this.renderResults()}
            </div>
        );
    }

    private renderResults() {
        const { results } = this.props;
        if (results.length === 0) {
            return null;
        }
        return (
            <ul className='collection'>
                {results.map(this.renderResultItem, this)}
            </ul>
        );
    }

    private renderResultItem(item: SearchApiResult, index: number) {
        return (
            <li key={index} className='collection-item'>
                {item.name}
            </li>
        );
    }
}
