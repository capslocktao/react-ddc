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
                    id:1,
                    unit:"包"
                },
                {
                    productName:"纸尿裤",
                    modelSize:"S",
                    price:"200",
                    id:2,
                    unit:"包"
                },
                {
                    productName:"纸尿裤大号",
                    modelSize:"XXL",
                    price:"210",
                    id:3,
                    unit:"包"
                },
                {
                    productName:"纸尿裤",
                    modelSize:"XL",
                    price:"150",
                    id:4,
                    unit:"包"
                },
                {
                    productName:"纸尿裤",
                    modelSize:"XL",
                    price:"150",
                    id:6,
                    unit:"包"
                },
                {
                    productName:"纸尿裤",
                    modelSize:"L",
                    price:"200",
                    id:5,
                    unit:"包"
                }
            ],
            selectedGoods:[],
            nums:[]
        };
        this.selectGood = this.selectGood.bind(this)
        this.numChange = this.numChange.bind(this)
        this.submitOrder = this.submitOrder.bind(this)
    };
    selectGood(data){
        this.setState({
            selectedGoods:data
        })
    };
    numChange(data){
        this.setState({
            nums:data
        })
    }
    submitOrder(){
        console.log(this.state.selectedGoods);
        this.state.nums.forEach(v=>{
            v = parseInt(v)
        });
        this.state.goods.findIndex((v,i)=>{
            this.state.selectedGoods.forEach(k=>{
                if(k.id === v.id){
                    console.log(i);
                    k.num = this.state.nums[i]
                }
            })
        });

        console.log(this.state.selectedGoods)
    }
    render() {
        return (
            <div className="purchase">
                <div className="header">
                    <NavBar
                        mode="dark"
                        rightContent={
                            this.state.selectedGoods.length === 0?
                                "":
                            <div onClick={this.submitOrder}>
                                下单({this.state.selectedGoods.length})
                            </div>
                        }
                    >商品采购</NavBar>
                </div>

                <div className="pruchase-body">
                    <GoodsList data={this.state.goods} onSelect={this.selectGood} onNumChange={this.numChange}/>
                </div>
            </div>
        )
    }
}

export default Purchase