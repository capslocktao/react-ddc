import React, {Component} from 'react';
import { NavBar, Icon ,WingBlank,List,InputItem,} from 'antd-mobile';
import { Link } from 'react-router-dom';
import "./dateils.less"
import {HOST} from "../../../../const/host";

class details extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.match.params.id)
    };
    render() {
        return (
            <div>
                <div>
                    <NavBar
                        mode="light"
                        leftContent={
                            <Link to={`${HOST}/index/orderManagement`}>
                                <Icon type="left" style={{ marginRight: '16px' }} />
                            </Link>
                        }
                    >订单详情</NavBar>
                </div>
                <WingBlank size={'sm'}>

                </WingBlank>
            </div>
        )
    }
}

export default details