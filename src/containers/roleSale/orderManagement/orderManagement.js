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
const API="http://192.168.31.34:8080"
class OrderManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
           list:"",
           status:"UNCONFIRMED"
        };
        this.orderTab=this.orderTab.bind(this);
    };
    componentDidMount(){
        /*
        list列表数据
        * */
        axios.get(`${API}/base/order/findAllAppOrderModel`,{params:{status:this.state.status}}).then(response=>{
            console.log(response)
            let res=response.data;
            this.setState({list:res})
        })

    }
    orderTab(tab){
        axios.get(`${API}/base/order/findAllAppOrderModel`,{params:{status:tab['status']}}).then(response=>{
            console.log(response)
            let res=response.data;
            this.setState({list:res})
        })
    }
    componentWillUnmount(){
        sessionStorage.setItem("backTo",this.props.match.url)
    }
    render() {
        return (
            <div className="customer-order-form">
                <div className="header nav">
                    <NavBar
                        mode="dark"
                        rightContent={
                            [
                                <Link key="0" to={`${HOST}/orderManagement/search`}>
                                    <Icon  type="search" style={{ marginRight: '16px' ,color:"#fff"}} />
                                </Link>,
                                <Link key="1" to={`${HOST}/orderManagement/add`}>
                                    <b style={{ marginRight: '16px' ,color:"#fff"}}>新增</b>
                                </Link>
                            ]
                        }
                    >客户订单</NavBar>
                </div>
                <div className="icon-orderForm-body">
                    <div className={"nav-empty"}>.</div>
                    {/*tab导航*/}
                    <StickyContainer>
                        <Tabs tabs={tab}
                              initalPage={'t2'}
                              renderTabBar={renderTabBar}
                              onChange={(tab)=>{
                                  this.orderTab(tab)
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
                    <div>
                        {/*列表循环*/}
                        {
                            this.state.list?
                               this.state.list.map(v=>(
                                    <List
                                        key={v.orderId}
                                        onClick={()=>{

                                        }}
                                        className="my-list">
                                        <Item
                                            multipleLine
                                            onClick={() => {}}
                                            platform="android"
                                            className="order-list"
                                        >
                                            {v.orderNo} {v.customerName}
                                            <Brief>{v.address} {v.status}</Brief>
                                            <Flex justify="end">
                                                <Link to={ `${HOST}/logistics/${v.orderId}`}>
                                                    <Flex.Item className="button">
                                                        查看物流
                                                    </Flex.Item>
                                                </Link>
                                                <Link  to={ `${HOST}/orderManagement/details/${v.orderId}`}>
                                                    <Flex.Item className="button">
                                                            查看详情
                                                    </Flex.Item>
                                                </Link>
                                            </Flex>

                                        </Item>
                                    </List>
                            )):""
                        }
                </div>
                <div style={{width:"100%",height:"80px"}}>

                </div>
                </div>
            </div>
        )
    }
}
export default OrderManagement