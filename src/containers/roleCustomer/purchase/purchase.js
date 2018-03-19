import React, {Component} from 'react';
import { NavBar, Icon,WhiteSpace } from 'antd-mobile';
import GoodsList from "../../../components/goodsList/goodsList";
import './purchase.less';
class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods:[
                {
                    productName:"纸尿裤",
                    modelSize:"NB",
                    price:"200",
                    id:1
                },
                {
                    productName:"纸尿裤",
                    modelSize:"S",
                    price:"200",
                    id:2
                },
                {
                    productName:"纸尿裤大号",
                    modelSize:"XXL",
                    price:"210",
                    id:3
                },
                {
                    productName:"纸尿裤",
                    modelSize:"XL",
                    price:"150",
                    id:4
                },
                {
                    productName:"纸尿裤",
                    modelSize:"L",
                    price:"200",
                    id:5
                }
            ]
        };
    };

    render() {
        return (
            <div className="purchase">
                <NavBar
                    mode="dark"
                    rightContent={
                        <Icon type="check" />
                    }
                >商品采购</NavBar>
                <div className="pruchase-body">
                    <GoodsList data={this.state.goods}/>
                </div>
            </div>
        )
    }
}

export default Purchase