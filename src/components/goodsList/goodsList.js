import React, {Component} from 'react';
import {WingBlank} from "antd-mobile";
import './goodsList.less';
class GoodsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    componentDidMount(){
        console.log(this.props);
    }

    render() {
        return (
            <div className="goods-list">
                {
                    this.props.data.map(v=>
                        <div className="goods-item" key={v.id}>
                            <WingBlank>
                                <h1 className="title">{v.productName}</h1>
                                <div className="info">
                                    <div className="size"><span>型号</span>{v.modelSize}</div>
                                    <div className="price"><span>¥</span>{v.price}</div>
                                </div>
                                <div className="num">
                                    <span>数量</span><input type="text"/>
                                </div>

                            </WingBlank>

                        </div>
                    )
                }
            </div>
        )
    }
}

export default GoodsList