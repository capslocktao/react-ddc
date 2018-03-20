import React, {Component} from 'react';
import { SearchBar, WhiteSpace } from 'antd-mobile';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div>
                <SearchBar placeholder="点击查询" ref={ref => this.autoFocusInst = ref} />
                <WhiteSpace />
            </div>
        )
    }
}

export default Search