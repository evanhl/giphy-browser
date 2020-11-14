import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchSearch, fetchTrending } from './GiphyApi';
import ThumbnailList from './ThumbnailList';
import debounce from 'debounce';

const DEBOUNCE_INTERVAL = 200;

type GiphyBrowserState = {
    isLoaded: boolean,
    items: Array<any>,
    q: string,
    page: number,
    isLastPage: boolean
}

class GiphyBrowser extends React.Component<any, GiphyBrowserState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            q: '',
            page: 0,
            isLastPage: false
        };

        this.qChanged = this.qChanged.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.fetchData = debounce(this.fetchData.bind(this), DEBOUNCE_INTERVAL);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.q} onChange={this.qChanged} className="search-box" placeholder="Search for GIFs">
                </input>
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={!this.state.isLastPage}
                    loader={null}
                >
                    <ThumbnailList items={this.state.items} isLoaded={this.state.isLoaded}></ThumbnailList>
                </InfiniteScroll>
            </div>
        );
    }

    qChanged(evt: React.ChangeEvent<HTMLInputElement>) {
        const q = evt.target.value;
        this.setState({ q });
        this.fetchData(q);
    }

    fetchData(q: string) {
        let fetchCall;

        if (q.length) {
            fetchCall = fetchSearch(0, q);
        } else {
            fetchCall = fetchTrending(0);
        }

        fetchCall
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                // TODO: handle error
                () => {}
            );
    }

    fetchMoreData() {
        const { q, page } = this.state;

        let fetchCall;

        if (q.length) {
            fetchCall = fetchSearch(page + 1, q);
        } else {
            fetchCall = fetchTrending(page + 1);
        }

        fetchCall
            .then(res => res.json())
            .then(
                (result) => {
                    const { offset, count, total_count } = result.pagination;
                    this.setState({
                        isLoaded: true,
                        items: this.state.items.concat(result.data),
                        page: page + 1,
                        isLastPage: offset + count > total_count
                    });
                },
                // TODO: handle error
                () => {}
            );
    }

    componentDidMount() {
        this.fetchData(this.state.q);
    }
}

export default GiphyBrowser;
