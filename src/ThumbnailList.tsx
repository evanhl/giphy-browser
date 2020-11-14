import React from 'react';
import { Link } from "react-router-dom";

type ThumbnailListProps = {
    isLoaded: boolean,
    items: Array<any>
}

class ThumbnailList extends React.Component<ThumbnailListProps, any> {

    render() {
        if (this.props.isLoaded) {
            return (
                    <ul className="thumbnail-list">
                            {this.props.items.map((item) => 
                                <Link to={`/gif/${item.id}`}>
                                    <li className="thumbnail-item" key={item.id} onClick={this.viewThumbnail}>
                                        <img className="thumbnail" 
                                            src={item.images.fixed_height.url} 
                                            width={item.images.fixed_height.width}
                                            height={item.images.fixed_height.height}
                                            alt={item.title}
                                            title={item.title}
                                        ></img>
                                    </li>
                                </Link>
                            )}
                    </ul>
            );
        } else {
            return <h1>Loading...</h1>;
        }
    }

    viewThumbnail(evt: React.MouseEvent) {
        console.log(evt);
    }
}

export default ThumbnailList;
