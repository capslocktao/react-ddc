import React, {Component} from 'react';
import { BrowserRouter, Route,Switch,Redirect } from 'react-router-dom';
import Login from './containers/login/login'
import Container from './containers/container/container'
import AuthRoute from "./components/authroute"
import {HOST} from './const/host'//全局服务器路径
import { connect } from 'react-redux'
import Search from "./containers/publicView/search/search";

import Pay from "./containers/roleCustomer/pay/pay"

import AddVisitPlan from "./containers/roleSale/visitPlan/addVisitPlan/addVisitPlan";

import add from "./containers/roleSale/orderManagement/add/add"//销售订单添加

import details from "./containers/roleSale/orderManagement/details/details"//销售订单详情

import search from "./containers/roleSale/orderManagement/search/search"//销售订单搜索

@connect(
    state=>state.count
)
class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes:[
                {
                    path:`${HOST}/index`,
                    component:Container
                },
                {
                    path:`${HOST}/login`,
                    component:Login
                },
                {
                    path:`${HOST}/search`,
                    component:Search
                },
                {

                    path:`${HOST}/pay`,
                    component:Pay
                },
                {
                    path:`${HOST}/addVisitPlan`,
                    component:AddVisitPlan
                },
                {
                    path:`${HOST}/orderManagement/add`,
                    component:add
                },
                {
                    path:`${HOST}/orderManagement/details/:id`,
                    component:details
                },
                {
                    path:`${HOST}/orderManagement/search`,
                    component:search
                }
            ]
        }
    }
    componentWillMount(){

    }

    render() {
        return (
                <BrowserRouter>

                    <div>
                        

                        {
                            this.state.routes.map(v=>(
                                <Route path={v.path} key={v.path}  component={v.component}/>
                            ))
                        }
                    </div>
                </BrowserRouter>
        )
    }
}
export default Router