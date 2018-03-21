import React, {Component} from 'react';
import { SearchBar, WhiteSpace,NavBar ,Icon} from 'antd-mobile';
import {HOST} from "../../../../const/host";
import { Link } from 'react-router-dom';
class Searchs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div className="sub-title">
                <div className="visit-plan" >
                    <div className="visit-smile">
                        <NavBar
                            mode="dark"

                            
                        >搜索</NavBar>
                    </div>

                </div>
                <SearchBar placeholder="点击查询" ref={ref => this.autoFocusInst = ref} />
                <WhiteSpace />
            </div>
        )
    }
}

export default Searchs