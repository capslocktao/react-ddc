import React, {Component} from 'react';
import { NavBar,Icon, WingBlank,List,Tabs, WhiteSpace ,Flex } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { Link } from 'react-router-dom';
import { HOST } from '../../../const/host';
import axios from "axios"
import "./orderManagement.less"
const Item = List.Item;
const Brief = Item.Brief;
//tab内容
function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
//销售tabs
const saleTabs = [
    { title: '待确认',status:"UNCONFIRMED" },
    { title: '财务确认',status:"UNFINANCECONFIRMED" },
    { title: '待发货',status:"UNSEND" },
    { title: '待收货',status:"ALLSEND" },
    { title: '完成',status:"COMPLETE" },
];
//分公司管理员tabs
const branchTabs = [
    { title: '全部',status:"UNCONFIRMED" },
    { title: '财务确认',status:"UNFINANCECONFIRMED" },
    { title: '未发货',status:"UNSEND" },
    { title: '已发货',status:"ALLSEND" },
    { title: '完成',status:"COMPLETE" },
];

const tab = sessionStorage.getItem("roleSymbol") === "sales"?branchTabs:saleTabs;
console.log(tab)

class OrderManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
           list:[]
        };
    };
    componentDidMount(){
        /*
        list列表数据
        * */
        this.setState({list:[
                {title:'样品','status':'123',url:'qwe',syl:'1'},
                {title:'样品','status':'123',url:'qwe',syl:'2'},
                {title:'样品','status':'123',url:'qwe',syl:'3'},
                {title:'样品','status':'123',url:'qwe',syl:'4'}
         ]})
    }
    render() {
        return (
            <div className="customer-order-form">
                <div className="header">
                    <NavBar
                        mode="dark"
                        rightContent={
                            [
                                <Link key="0" to={`${HOST}/orderManagement/search`}>
                                    <Icon  type="search" style={{ marginRight: '16px' }} />
                                </Link>,
                                <Link to={`${HOST}/orderManagement/add`}>
                                    <Icon type="up" style={{ marginRight: '16px' }} />
                                </Link>
                            ]
                        }
                    >客户订单</NavBar>
                </div>
                <div className="icon-orderForm-body">
                    {/*tab导航*/}
                    <StickyContainer>
                        <Tabs tabs={tab}
                              initalPage={'t2'}
                              renderTabBar={renderTabBar}
                              onChange={(tab,status)=>{
                                  console.log(tab,status)
                                  this.setState({list:[
                                          {title:'样品1','status':'123',url:'qwe',syl:'1'},
                                          {title:'样品2','status':'123',url:'qwe',syl:'2'},
                                          {title:'样品3','status':'123',url:'qwe',syl:'3'},
                                          {title:'样品4','status':'123',url:'qwe',syl:'4'}
                                      ]})
                              }}
                        >
                            {
                                tab.map(v=>(
                                    <div key={v.status}>

                                    </div>
                                    )
                                )
                            }
                        </Tabs>
                    </StickyContainer>
                    <WingBlank size={'sm'}>
                        {/*列表循环*/}
                        {
                            this.state.list.map(v=>(
                                    <List

                                        onClick={()=>{

                                        }}
                                        className="my-list">
                                        <Item
                                            multipleLine
                                            onClick={() => {}}
                                            platform="android"
                                            className="order-list"
                                        >
                                            {v.title} 订单号 收货人
                                            <Brief>货物地址状态</Brief>
                                            <Flex justify="end">
                                                <Link key={v.syl} to={ `${HOST}/logistics/${v.syl}`}>
                                                    <Flex.Item className="button">
                                                        查看物流
                                                    </Flex.Item>
                                                </Link>
                                                <Link key={v.syl} to={ `${HOST}/orderManagement/details/${v.syl}`}>
                                                    <Flex.Item className="button">
                                                            查看详情
                                                    </Flex.Item>
                                                </Link>
                                            </Flex>

                                        </Item>
                                    </List>
                            ))
                        }
                    </WingBlank>

                </div>
            </div>
        )
    }
}
export default OrderManagement