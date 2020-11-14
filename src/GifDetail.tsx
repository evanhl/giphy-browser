import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { fetchGifById } from './GiphyApi';

type GifDetailState = {
    isLoaded: boolean,
    item: any
};

type GifDetailParams = {
    gifId: string
}

class GifDetail extends React.Component<RouteComponentProps<GifDetailParams>, GifDetailState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoaded: false,
            item: null
        };
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <h1>{this.state.item.title}</h1>
                    <img src={this.state.item.images.original.url}></img>
                </div>
            );
        } else {
            // Assume loading state for now since we're not handling error states
            return (
                <div>
                    <h1>Loading GIF...</h1>
                </div>
            );
        }
    }

    componentDidMount() {
        fetchGifById(this.props.match.params.gifId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        item: result.data,
                        isLoaded: true,
                    });
                },
                // TODO: handle error
                () => {}
            );
    }
}

export default withRouter(GifDetail);
