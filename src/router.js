import React, {Component} from 'react';
import { BrowserRouter, Route,Switch,Redirect } from 'react-router-dom';
import Login from './containers/login/login'
import Container from './containers/container/container'
import AuthRoute from "./components/authroute"
import {HOST} from './const/host'
import { connect } from 'react-redux'
@connect(
    state=>state.count
)
class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount(){
        console.log(this.props.num)
    }

    render() {
        return (
                <BrowserRouter>
                    <div>
                        <Route path={`${HOST}/`} component={AuthRoute}/>
                        <Route path={`${HOST}/index`} component={Container}/>
                        <Route path={`${HOST}/login`} component={Login}/>
                    </div>
                </BrowserRouter>
        )
    }
}
export default Router