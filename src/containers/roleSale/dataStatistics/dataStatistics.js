import React, {Component} from 'react';
import "./dataStatistics.less";
import { NavBar,Icon } from "antd-mobile";
import { HOST } from "../../../const/host";
class DataStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div className="data-statistics">
                <div className="data-statistics-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>{
                            this.props.history.push(`${HOST}/index/salesUserCenter`)
                        }}
                    >
                        数据统计
                    </NavBar>
                </div>
            </div>
        )
    }
}

export default DataStatistics