import React,{Component} from "react";
import {NavBar,List ,Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import {HOST} from "../../../const/host"
import "./myCustomer.less";
const Item = List.Item;
const Brief = Item.Brief;
function renderTabBar(props) {
    return (<Sticky topOffset={-45}>
        {({ style }) => <div style={{ ...style,top:45,zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
class MyCustomer extends Component{
    constructor(props){
        super(props);
        this.state={
            tabs:[
                { title: '意向客户' },
                { title: '成交客户' },
            ],
            data1:[
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"12"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"10"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"1"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"2"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"3"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"4"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"5"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"6"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"7"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"8"
                },
                {
                    customerName:"张三",
                    customerType:"门店",
                    mobilePhone:"18888854657",
                    status:"二次拜访",
                    id:"9"
                },
            ]
        }
    }
    render(){
        return(
            <div className="my-customer">
                <div className="my-customer-header">
                    <NavBar
                        mode="dark"
                        rightContent={<div onClick={()=>{this.props.history.push(`${HOST}/myCustomer/newCustomer`)}}>新增</div>}
                    >我的客户</NavBar>
                </div>
                <div className="my-customer-body">
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
                                                    <span>{v.customerName}</span>
                                                    <span>({v.status})</span>

                                                </div>
                                                <Brief>{v.mobilePhone}</Brief>
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
export default MyCustomer