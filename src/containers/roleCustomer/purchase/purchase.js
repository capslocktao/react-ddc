import React, {Component} from 'react';
import { NavBar, Icon,WhiteSpace } from 'antd-mobile';
class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goods:[
                {
                    productName:"纸尿裤",
                    modelSize:"NB",
                    price:"200"
                },
                {
                    productName:"纸尿裤",
                    modelSize:"S",
                    price:"200"
                },
                {
                    productName:"纸尿裤大号",
                    modelSize:"XXL",
                    price:"210"
                },
                {
                    productName:"纸尿裤",
                    modelSize:"XL",
                    price:"150"
                },
                {
                    productName:"纸尿裤",
                    modelSize:"L",
                    price:"200"
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
                    <WhiteSpace>

                    </WhiteSpace>
                </div>
            </div>
        )
    }
}

export default Purchase