import React, {Component} from 'react';
import { Redirect,withRouter } from 'react-router-dom';
import {HOST} from '../const/host';
@withRouter
class AuthRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    componentWillMount(){
        if(sessionStorage.getItem("roleSymbol")){
            // this.props.history.push(`${HOST}/index`)

        }else{
            this.props.history.push(`${HOST}/login`)

        }
    }
    render() {
        return (
            <div></div>
        )
    }
}

export default AuthRoute