import React, {Component} from 'react';
import { NavBar,Icon, WingBlank,List,Tabs, WhiteSpace  } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { Link } from 'react-router-dom';
import { HOST } from '../../../const/host';
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
    { title: '未付款',status:'UNPAY' },
    { title: '待确认',status:"UNCONFIRMED" },
    { title: '财务确认',status:"UNFINANCECONFIRMED" },
    { title: '未发货',status:"UNSEND" },
    { title: '已发货',status:"ALLSEND" },
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

const tab = sessionStorage.getItem("roleSymbol") === "2"?saleTabs:branchTabs;


class CustomerOrderForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           list:[]
        };
    };
    componentDidMount(){
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
                        leftContent={
                            <Link to={`${HOST}/customerOrderForm/add`}>
                                 <Icon type="up" style={{ marginRight: '16px' }} />
                            </Link>
                        }
                        rightContent={
                            [
                                <Link key="0" to={`${HOST}/customerOrderForm/search`}>
                                    <Icon  type="search" style={{ marginRight: '16px' }} />
                                </Link>,
                                <Icon key="1" type="ellipsis" />,
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
                        {
                            this.state.list.map(v=>(
                                <Link key={v.syl} to={ `${HOST}/customerOrderForm/details/${v.syl}`}>
                                    <List

                                        onClick={()=>{

                                        }}
                                        className="my-list">
                                        <Item
                                            arrow="horizontal"
                                            multipleLine
                                            onClick={() => {}}
                                            platform="android"
                                        >
                                            {v.title}<Brief>There may have water ripple effect of</Brief>
                                        </Item>
                                    </List>
                                </Link>
                            ))
                        }
                    </WingBlank>

                </div>
            </div>
        )
    }
}
export default CustomerOrderForm