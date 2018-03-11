import React, {Component} from 'react';
import { HOST } from '../../const/host'
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { add,sub } from './container.redux';
import { Switch,Route } from 'react-router-dom';
import NavLinkBar from '../../components/nav-link-bar/nav-link-bar'
//公共页面
import UserCenter from '../publicView/userCenter/userCenter';//我的
import TeamManagement from '../publicView/teamManagement/teamManagement'//团队管理
import CustomerManagement from '../publicView/customerManagement/customerManagement'//客户管理
import CustomerOrderForm from '../publicView/customerOrderForm/customerOrderForm'//客户管理

//总管理员
import StockCheck from '../topManager/stockCheck/stockCheck';//库存查询

//分公司（暂无单独页面）

//销售
import VisitPlan from '../roleSale/visitPlan/visitPlan';//拜访计划

//客户
import Purchase from '../roleCustomer/purchase/purchase';//商品采购
import MaterialApply from '../roleCustomer/materialApply/material';//物料申请
import PresentApply from '../roleCustomer/presentApply/presentApply';//赠品申请

//财务
import PaymentCheck from '../roleAccountant/paymentCheck/paymentCheck';//付款审核

//运营
import MaterialCheck from '../roleOperation/materialCheck/materialCheck'//物料审核
import PresentCheck from '../roleOperation/presentCheck/presentCheck'//赠品审核
import './container.less';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topManager:[
                {
                    path:`${HOST}/index/team`,
                    name:`团队管理`,
                    icon:"",
                    component:TeamManagement
                },
                {
                    path:`${HOST}/index/customer`,
                    name:`客户管理`,
                    icon:"",
                    component:CustomerManagement
                },
                {
                    path:`${HOST}/index/stockCheck`,
                    name:`库存查询`,
                    icon:"",
                    component:StockCheck
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"",
                    component:UserCenter
                },

            ],
            branchManager:[
                {
                    path:`${HOST}/index/customerOrderForm`,
                    name:`客户订单`,
                    icon:"",
                    component:CustomerOrderForm
                },
                {
                    path:`${HOST}/index/customer`,
                    name:`客户管理`,
                    icon:"",
                    component:CustomerManagement
                },
                {
                    path:`${HOST}/index/team`,
                    name:`团队管理`,
                    icon:"",
                    component:TeamManagement
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"",
                    component:UserCenter
                },

            ],
            roleSale:[
                {
                    path:`${HOST}/index/customerOrderForm`,
                    name:`客户订单`,
                    icon:"",
                    component:CustomerOrderForm
                },
                {
                    path:`${HOST}/index/visitPlan`,
                    name:`拜访计划`,
                    icon:"",
                    component:VisitPlan
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"",
                    component:UserCenter
                },

            ],
            roleCustomer:[
                {
                    path:`${HOST}/index/purchase`,
                    name:`商品采购`,
                    icon:"",
                    component:Purchase
                },
                {
                    path:`${HOST}/index/materialApply`,
                    name:`物料申请`,
                    icon:"",
                    component:MaterialApply
                },
                {
                    path:`${HOST}/index/presentApply`,
                    name:`赠品申请`,
                    icon:"",
                    component:PresentApply
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"",
                    component:UserCenter
                },

            ],
            roleAccountant:[
                {
                    path:`${HOST}/index/paymentCheck`,
                    name:`付款审核`,
                    icon:"",
                    component:PaymentCheck
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"",
                    component:UserCenter
                },

            ],
            roleOperation:[
                {
                    path:`${HOST}/index/materialCheck`,
                    name:`物料审核`,
                    icon:"",
                    component:MaterialCheck
                },
                {
                    path:`${HOST}/index/presentCheck`,
                    name:`赠品审核`,
                    icon:"",
                    component:PresentCheck
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"",
                    component:UserCenter
                },

            ],

            routes:[
                {
                   path:`${HOST}/index/team`,
                   component:TeamManagement
                },
                {
                   path:`${HOST}/index/customer`,
                   component:CustomerManagement
                },
                {
                   path:`${HOST}/index/stockCheck`,
                   component:StockCheck
                },
                {
                   path:`${HOST}/index/userCenter`,
                   component:UserCenter
                },
                {
                   path:`${HOST}/index/customerOrderForm`,
                   component:CustomerOrderForm
                },
                {
                   path:`${HOST}/index/visitPlan`,
                   component:VisitPlan
                },
                {
                   path:`${HOST}/index/purchase`,
                   component:Purchase
                },
                {
                   path:`${HOST}/index/materialApply`,
                   component:MaterialApply
                },
                {
                   path:`${HOST}/index/presentApply`,
                   component:PresentApply
                },
                {
                   path:`${HOST}/index/presentApply`,
                   component:PresentApply
                },
                {
                   path:`${HOST}/index/paymentCheck`,
                   component:PaymentCheck
                },
                {
                   path:`${HOST}/index/materialCheck`,
                   component:MaterialCheck
                },
                {
                   path:`${HOST}/index/presentCheck`,
                   component:PresentCheck
                }
            ]
        };
    };
    componentDidMount(){

    }
    roleMenu(){
        let roleSymbol = sessionStorage.getItem('roleSymbol');
        switch (roleSymbol){
            case "0":
                return this.state.topManager;
            case "1":
                return this.state.branchManager;
            case "2":
                return this.state.roleSale;
            case "3":
                return this.state.roleCustomer;
            case "4":
                return this.state.roleAccountant;
            case "5":
                return this.state.roleOperation;
        }

    };

    render() {
        return (
            <div>
                <Switch>
                    {
                        this.state.routes.map(v=>(
                            <Route path={v.path} key={v.path} component={v.component}/>
                            )
                        )
                    }
                </Switch>
                <NavLinkBar data={this.roleMenu()}/>
            </div>
        )
    }
}

export default Container