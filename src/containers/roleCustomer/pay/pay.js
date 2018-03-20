import React, {Component} from 'react';
import { NavBar,Icon,Radio } from 'antd-mobile';
import {WingBlank} from "antd-mobile";
import { Link } from "react-router-dom";
import {HOST} from "../../../const/host";
import './pay.less';
const RadioItem = Radio.RadioItem;
class Pay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsData:JSON.parse(sessionStorage.getItem("goodsData")),
            payMethod:[
                { value:"1",label:"转账支付" },
                { value:"2",label:"未付款先发货" }
            ],
            payType:"1"
        };
        this.changePayType = this.changePayType.bind(this)
    };
    componentDidMount(){
        console.log(JSON.parse(sessionStorage.getItem("goodsData")));
    }
    changePayType(val){
        this.setState({
            payType:val
        })
    }
    render() {
        return (
            <div className="pay">
                <div className="pay-header">
                    <NavBar
                        mode="dark"
                        leftContent={
                            <Link to={`${HOST}/index/purchase`}><Icon type="left" style={{ marginRight: '16px'}} /></Link>
                        }
                        onLeftClick={()=>{sessionStorage.removeItem("this.state.selectedGoods")}}
                    >付款</NavBar>
                </div>
                <div className="pay-body">
                    <div className="address-box">
                        <WingBlank>
                            <div className="consignee">
                                <div className="name">代用名</div>
                                <div className="phone">18840846671</div>
                            </div>
                            <div className="address">
                                北京市朝阳区定福庄西里2号院北京爸爸的选择有限公司
                            </div>
                        </WingBlank>
                    </div>
                    <div className="goods-box">

                            {
                                this.state.goodsData.map((v,i)=>
                                    <div key={i} className="goods-item">
                                        <WingBlank>
                                            <div className="top">
                                                <div className="name">{v.goodsName}</div>
                                                <div className="price">¥{v.price}</div>
                                            </div>
                                            <div className="bottom">
                                                <div className="size">型号：{v.modelSize}</div>
                                                <div className="num">数量：{v.num}</div>
                                            </div>
                                        </WingBlank>

                                    </div>
                                )
                            }

                    </div>
                    <div className="pay-method">
                        {this.state.payMethod.map(i => (
                            <RadioItem key={i.value} checked={this.state.payType === i.value} onChange={() => this.changePayType(i.value)}>
                                {i.label}
                            </RadioItem>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Pay