import React, {Component} from 'react';
import {NavBar,List,Tabs} from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import './sendManagement.less'
import {HOST} from "../../../const/host";
import axios from "axios"
const API = "http://192.168.31.34:8080"
const Item = List.Item;
const Brief = Item.Brief;
function renderTabBar(props) {
    return (<Sticky topOffset={-45}>
        {({ style }) => <div style={{ ...style,top:45,zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
class SendManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs:[
                { title: '未发货' },
                { title: '已完成' },
            ],
            data1:[
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"12"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"10"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"1"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"2"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"3"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"4"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"5"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"6"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"7"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"8"
                        },
                        {
                            orderNo:"3321334443243289",
                            customerName:"放大回",
                            totalGoodsPrice:"40",
                            createTime:"2018-03-05",
                            id:"9"
                        },
                    ]
        };
    };
    componentDidMount(){
        let status = "UNSEND"
        axios.get(`${API}/findAllAppOrderModel`,{status}).then(response=>{
            let res = response.data;
            console.log(res);
        })
    }

    render() {
        return (
            <div className="send-management">
                <div className="send-management-header">
                    <NavBar
                        mode="dark"
                    >发货管理</NavBar>
                </div>
                <div className="send-management-body">
                    <StickyContainer>
                        <Tabs tabs={this.state.tabs}

                              renderTabBar={renderTabBar}
                        >
                            <div className="customer-wrapper">
                                <List>

                                    {
                                        this.state.data1.map(v=>
                                            <Item arrow="horizontal"key={v.id} multipleLine onClick={() => {this.props.history.push(`${HOST}/myCustomer/customerDetail/${v.id}`)}} extra={v.customerType}>
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
                            <div className="customer-wrapper">
                                <List>

                                    {
                                        this.state.data1.map(v=>
                                            <Item arrow="horizontal"key={v.id} multipleLine onClick={() => {}} extra={v.customerType}>
                                                {v.customerName} <Brief>{v.mobilePhone}</Brief>
                                            </Item>
                                        )
                                    }

                                </List>
                            </div>

                        </Tabs>
                    </StickyContainer>
                </div>
            </div>
        )
    }
}

export default SendManagement