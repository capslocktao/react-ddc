import React, {Component} from 'react';
import {NavBar,List} from "antd-mobile"
import "./paymentCheck.less";
import axios from "axios";
import {HOST} from "../../../const/host";
const Item = List.Item;
const Brief = Item.Brief;
const API = "http://192.168.31.34:8080";
class PaymentCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    };
    componentDidMount(){
        axios.get(`${API}/base/order/findAllAppOrderModel`,{
            params:{status:"UNFINANCECONFIRMED"}
        }).then(response=>{
            let res = response.data;
            this.setState({
                data:res
            });
        })

    }
    render() {
        return (
            <div className="payment-check">
                <div className="payment-check-header">
                    <NavBar
                        mode="dark"
                    >待审核订单</NavBar>
                </div>
                {
                    this.state.data.length===0?
                        ""
                        :
                        <div className="payment-check-body">
                            <List>
                                {

                                    this.state.data.map(v=>
                                        <Item arrow="horizontal" key={v.orderId} multipleLine onClick={() => {this.props.history.push(`${HOST}/paymentOrderDetail/${v.orderId}`)}} extra={v.customerType}>
                                            <div className="name">
                                                <span>订单号：{v.orderNo}</span>
                                                <span className="total-price">¥{v.totalGoodsPrice}</span>

                                            </div>
                                            <Brief>
                                                <div className="brief">
                                                    <span>{v.customerName}</span>
                                                    <span>{v.createTime}</span>
                                                </div>
                                            </Brief>
                                        </Item>
                                    )
                                }

                            </List>
                        </div>

                }

            </div>
        )
    }
}

export default PaymentCheck