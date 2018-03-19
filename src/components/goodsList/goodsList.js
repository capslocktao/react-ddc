import React, {Component} from 'react';
import './goodsList.less';
class GoodsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div className="goods-list">
                {
                    this.props.data.map(v=>
                        <div className="goods-item">
                            <h1 className="title">{v.productName}</h1>
                            <div className="info">
                                <div className="size">{v.modelSize}</div>
                                <div className="size">{v.price}</div>
                            </div>
                            <div className="num">
                                <span>数量</span><input type="text"/>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default GoodsList