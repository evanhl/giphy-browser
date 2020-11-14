import withQuery from 'with-query';

const URL_ROOT = 'https://api.giphy.com/v1/gifs';
const API_KEY = 'bSPxkV28XtgbNGdLBO097zYUHnIjmOOw';
const PAGE_SIZE = 25;

const getParamsForFetch = function(page: number) {
    return {
        limit: PAGE_SIZE,
        offset: PAGE_SIZE * page,
        rating: 'g',
        lang: 'en',
        api_key: API_KEY
    }
}

export const fetchTrending = function(page: number) {
    return window.fetch(withQuery(`${URL_ROOT}/trending`, {
        ...getParamsForFetch(page)
    }));
}

export const fetchSearch = function(page: number, q: string): Promise<Response> {
    return window.fetch(withQuery(`${URL_ROOT}/search`, {
        q,
        ...getParamsForFetch(page)
    }));
}

export const fetchGifById = function(id: string) {
    return window.fetch(withQuery(`${URL_ROOT}/${id}`, {
        api_key: API_KEY
    }));
}