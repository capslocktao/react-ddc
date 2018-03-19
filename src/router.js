import React, {Component} from 'react';
import { BrowserRouter, Route,Switch,Redirect } from 'react-router-dom';
import Login from './containers/login/login'
import Container from './containers/container/container'
import AuthRoute from "./components/authroute"
import {HOST} from './const/host'//全局服务器路径
import { connect } from 'react-redux'
import Search from "./containers/publicView/customerOrderForm/search/search";//销售订单搜索
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
                {//销售搜索
                    path:`${HOST}/customerOrderForm/search`,
                    component:Search
                },
            ]
        }
    }
    componentWillMount(){

    }

    render() {
        return (
                <BrowserRouter>

                    <div>
                        <AuthRoute/>

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