import { injectable } from 'inversify';

export interface SearchApiResult {
    latest: string;
    name: string;
}

export interface SearchApiResponse {
    total: number;
    results: SearchApiResult[];
}

@injectable()
export class SearchApi {
    public search(phrase: string): Promise<SearchApiResponse> {
        return fetch('https://api.cdnjs.com/libraries?search=' + encodeURIComponent(phrase))
            .then(res => res.json() as Promise<SearchApiResponse>);
    }
}
