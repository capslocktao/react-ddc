import React, {Component} from 'react';
import {withRouter, Route,Switch,Redirect } from 'react-router-dom';

import Container from './containers/container/container'
import {HOST,API} from './const/host'//全局服务器路径
import { connect } from 'react-redux'
import axios from "axios";

//-----------------------------------------公共
import AddressManage from "./containers/publicView/addressManage/addressManage"
import NewAddress from "./containers/publicView/addressManage/newAddress/newAddress";

//------------------------------------------客户

import Pay from "./containers/roleCustomer/pay/pay"
import MyOrderDetail from "./containers/roleCustomer/myOrder/myOrderDetail/myOrderDetail"
import Logistics from "./containers/publicView/logistics/logistics"//物流查询

//------------------------------------------销售
import ellipsis from "./containers/roleSale/ellipsis/ellipsis";
import Add from "./containers/roleSale/orderManagement/add/add"//销售订单添加
import Details from "./containers/roleSale/orderManagement/details/details"//销售订单详情
import Search from "./containers/roleSale/orderManagement/search/search"//销售订单搜索
import AddVisitPlan from "./containers/roleSale/visitPlan/addVisitPlan/addVisitPlan";
import Searchs from "./containers/roleSale/visitPlan/searchs/searchs"//拜访计划搜索
import VisitDetail from "./containers/roleSale/visitPlan/visitDetail/visitDetail";
import CustomerDetail from "./containers/roleSale/myCustomer/customerDetail/customerDetail";

import AddVisitRecord from "./containers/roleSale/visitPlan/addVisitPlan/addVisitRecord/addVisitRecord";

//-------------------------------------------财务
import PaymentOrderDetail from "./containers/roleAccountant/paymentCheck/paymentOederDetail/paymentOederDetail";

//-------------------------------------------仓库
import OperationOrderDetail from "./containers/roleOperation/sendManagement/operationOrderDetail/operationOrderDetail"

//-------------------------------------------查看图片
import Preview from "./containers/publicView/previewImg/previewImg"
@withRouter
@connect(
    state=>state.count
)
class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes:[
                //--------------------------------------------------公共
                {
                    path:`${HOST}/addressManage`,
                    component:AddressManage
                },
                {
                    path:`${HOST}/newAddress`,
                    component:NewAddress
                },
                //--------------------------------------------------主页面
                {
                    path:`${HOST}/index`,
                    component:Container
                },
                {
                    path:`${HOST}/search`,
                    component:Search
                },
                //--------------------------------------------------客户
                {
                    path:`${HOST}/pay`,
                    component:Pay
                },
                {
                    path:`${HOST}/myOrder/myOrderDetail/:id`,
                    component:MyOrderDetail
                },


                //---------------------------------------------------销售
                {
                    path:`${HOST}/addVisitPlan`,
                    component:AddVisitPlan
                },
                {
                    path:`${HOST}/addVisitRecord`,
                    component:AddVisitRecord
                },

                {
                    path:`${HOST}/visitDetail/:id`,
                    component:VisitDetail
                },
                {
                    path:`${HOST}/myCustomer/customerDetail/:id`,
                    component:CustomerDetail
                },
                {
                    path:`${HOST}/myCustomer/newCustomer`,
                    component:CustomerDetail
                },
                {
                    path: `${HOST}/logistics/:id`,
                    component: Logistics
                },

                {
                    path:`${HOST}/orderManagement/add`,
                    component:Add
                },
                {
                    path:`${HOST}/orderManagement/details/:id`,
                    component:Details
                },
                {
                    path:`${HOST}/orderManagement/search`,
                    component:Search

                },
                {
                    path: `${HOST}/addVisitRecord/:id`,//拜访计划
                    component: AddVisitRecord

                },


                //---------------------------------------------------财务
                {
                    path:`${HOST}/paymentOrderDetail/:id`,
                    component:PaymentOrderDetail
                },
                {
                    path:`${HOST}/previewImg`,
                    component:Preview
                },

                {
                    path:`${HOST}/searchs`,
                    component:Searchs
                },
                //-----------------------------------------------------仓库人员
                {

                    path:`${HOST}/sendManagement/operationOrderDetail/:id`,
                    component:OperationOrderDetail
                },
            ]
        }
    }
    componentWillMount(){
        this.user = JSON.parse(localStorage.getItem('user'));
        //验证token
        console.log('进入');
        let xAuthToken = localStorage.getItem('xAuthToken');
        if(!xAuthToken){
            this.props.history.push(`${HOST}/login`);
        }else{

            axios.get(`${API}/validate`).then(response=>{
                //如果用户token失效，那么return
                if(!response){
                    return
                }
                if(response.data.flag === 'SESSION_INVALID'){
                    console.log('失效');
                    this.props.history.push('/login');
                }else{
                    sessionStorage.setItem('user',JSON.stringify(response.data.data));
                    this.user = JSON.parse(localStorage.getItem('user'));
                    let refrashPath = sessionStorage.getItem("currentPath");
                    if(refrashPath){
                        console.log(888);
                        this.props.history.push(refrashPath)
                    }else{
                        switch (response.data.data.roleCode){
                            case 0:
                                this.props.history.push(`${HOST}/index/team`);
                                break;
                            case 1:
                                this.props.history.push(`${HOST}/index/customerOrderForm`);
                                break;
                            case "sales":
                                this.props.history.push(`${HOST}/index/myCustomer`);
                                break;
                            case "customer":
                                this.props.history.push(`${HOST}/index/purchase`);
                                break;
                            case "finance":
                                this.props.history.push(`${HOST}/index/paymentCheck`);
                                break;
                            case "wareHouse":
                                this.props.history.push(`${HOST}/index/sendManagement`);
                        }
                    }

                }
            })
        };

    }
    componentDidUpdate(){
        sessionStorage.setItem("currentPath",window.location.pathname)

    }
    render() {
        return (
                    <div>
                        {
                            this.state.routes.map(v=>(
                                <Route path={v.path} key={v.path}  component={v.component}/>
                            ))
                        }
                    </div>

        )
    }
}
export default Router