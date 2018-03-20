import React, {Component} from 'react';
import { BrowserRouter, Route,Switch,Redirect } from 'react-router-dom';
import Login from './containers/login/login'
import Container from './containers/container/container'
import AuthRoute from "./components/authroute"
import {HOST} from './const/host'//全局服务器路径
import { connect } from 'react-redux'
import Search from "./containers/roleSale/search/search";
import ellipsis from "./containers/roleSale/ellipsis/ellipsis";
import Pay from "./containers/roleCustomer/pay/pay"


import VisitDetail from "./containers/roleSale/visitPlan/visitDetail/visitDetail";
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
                    path:`${HOST}/visitDetail/:id`,
                    component:VisitDetail
                },
                {
                    path:`${HOST}/ellipsis`,
                    component:ellipsis
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