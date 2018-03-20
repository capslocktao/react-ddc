import React, {Component} from 'react';
import { HOST } from '../../const/host'
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { add,sub } from './container.redux';
import { Switch,Route } from 'react-router-dom';
import NavLinkBar from '../../components/nav-link-bar/nav-link-bar'
//公共页面
import TeamManagement from '../publicView/teamManagement/teamManagement'//团队管理
import CustomerManagement from '../publicView/customerManagement/customerManagement'//客户管理
import CustomerOrderForm from '../publicView/customerOrderForm/customerOrderForm'//客户管理

//总管理员
import StockCheck from '../topManager/stockCheck/stockCheck';//库存查询

//分公司（暂无单独页面）

//销售
import VisitPlan from '../roleSale/visitPlan/visitPlan';//拜访计划
import MyCustomer from '../roleSale/myCustomer/myCustomer'//客户管理
import orderManagement from '../roleSale/orderManagement/orderManagement'//订单管理

//客户
import Purchase from '../roleCustomer/purchase/purchase';//商品采购
import MaterialApply from '../roleCustomer/materialApply/material';//物料申请
import PresentApply from '../roleCustomer/presentApply/presentApply';//赠品申请
import UserCenter from '../roleCustomer/userCenter/userCenter'//用户中心

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
            //总管理员
            topManager:[
                {
                    path:`${HOST}/index/team`,
                    name:`团队管理`,
                    icon:"icon-team",
                    component:TeamManagement
                },
                {
                    path:`${HOST}/index/customer`,
                    name:`客户管理`,
                    icon:"icon-customer",
                    component:CustomerManagement
                },
                {
                    path:`${HOST}/index/stockCheck`,
                    name:`库存查询`,
                    icon:"icon-stockCheck",
                    component:StockCheck
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"icon-user",
                    component:UserCenter
                },

            ],
            //分公司管理员
            branchManager:[
                {
                    path:`${HOST}/index/customerOrderForm`,
                    name:`客户订单`,
                    icon:"icon-orderForm",
                    component:CustomerOrderForm
                },
                {
                    path:`${HOST}/index/customer`,
                    name:`客户管理`,
                    icon:"icon-customer",
                    component:CustomerManagement
                },
                {
                    path:`${HOST}/index/team`,
                    name:`团队管理`,
                    icon:"icon-team",
                    component:TeamManagement
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"icon-user",
                    component:UserCenter
                },

            ],
            //销售角色
            roleSale:[
                {
                    path:`${HOST}/index/myCustomer`,
                    name:`我的客户`,
                    icon:"icon-orderForm",
                    component:MyCustomer
                },
                {
                    path:`${HOST}/index/orderManagement`,
                    name:`订单管理`,
                    icon:"icon-orderForm",
                    component:orderManagement
                },
                {
                    path:`${HOST}/index/visitPlan`,
                    name:`拜访计划`,
                    icon:"icon-visitPlan",
                    component:VisitPlan
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"icon-user",
                    component:UserCenter
                },

            ],
            //客户
            roleCustomer:[
                {
                    path:`${HOST}/index/purchase`,
                    name:`商品采购`,
                    icon:"icon-purchase",
                    component:Purchase
                },
/*                {
                    path:`${HOST}/index/materialApply`,
                    name:`物料申请`,
                    icon:"icon-material",
                    component:MaterialApply
                },
                {
                    path:`${HOST}/index/presentApply`,
                    name:`赠品申请`,
                    icon:"icon-gift",
                    component:PresentApply
                },*/
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"icon-user",
                    component:UserCenter
                },

            ],
            //财务
            roleAccountant:[
                {
                    path:`${HOST}/index/paymentCheck`,
                    name:`付款审核`,
                    icon:"icon-payCheck",
                    component:PaymentCheck
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"icon-user",
                    component:UserCenter
                },

            ],
            //运营
            roleOperation:[
                {
                    path:`${HOST}/index/materialCheck`,
                    name:`物料审核`,
                    icon:"icon-stockCheck",
                    component:MaterialCheck
                },
                {
                    path:`${HOST}/index/presentCheck`,
                    name:`赠品审核`,
                    icon:"icon-gift",
                    component:PresentCheck
                },
                {
                    path:`${HOST}/index/userCenter`,
                    name:`我的`,
                    icon:"icon-user",
                    component:UserCenter
                },

            ],
            //路由注册
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
                },
                {
                    path:`${HOST}/index/myCustomer`,
                    component:MyCustomer
                },
                {
                    path:`${HOST}/index/orderManagement`,
                    component:orderManagement
                }
            ]
        };
    };
    componentDidMount(){

    }
    roleMenu(){
        let roleCode = JSON.parse(sessionStorage.getItem('user')).roleCode;
        switch (roleCode){
            case "0":
                return this.state.topManager;
            case "1":
                return this.state.branchManager;
            case "sales":
                return this.state.roleSale;
            case "customer":
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