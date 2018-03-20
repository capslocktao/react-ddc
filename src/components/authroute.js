import React, {Component} from 'react';
import { Redirect,withRouter } from 'react-router-dom';
import axios from "axios";
import {HOST} from '../const/host';
@withRouter
class AuthRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    componentWillMount(){

/*        this.user = JSON.parse(localStorage.getItem('user'));
        //验证token
        console.log('进入');
        let xAuthToken = localStorage.getItem('xAuthToken');
        console.log(xAuthToken);
        if(!xAuthToken){
            this.props.history.push(`${HOST}/login`);
        }else{
            axios.get(`/validate`).then(response=>{
                //如果用户token失效，那么return
                if(!response){
                    return
                }
                if(response.data.flag === 'SESSION_INVALID'){
                    console.log('失效');
                    this.props.history.push('/login');
                }else{
                    localStorage.setItem('user',JSON.stringify(response.data.data));
                    this.user = JSON.parse(localStorage.getItem('user'));
                    console.log('验证通过');
                    this.props.history.push("/index")

                }
            })
        };*/
        console.log(window.location.pathname);
        /*        if(sessionStorage.getItem("roleSymbol")){
                    // this.props.history.push(`${HOST}/index`)

                }else{
                    this.props.history.push(`${HOST}/login`)

                }*/
    }
    redirect(){
        this.props.history.push(`${HOST}/login`)
    }
    render() {
        return (
            <div></div>
        )
    }
}

export default AuthRoute