import React, {Component} from 'react';
import { Button,NavBar,Icon,WingBlank } from "antd-mobile";
import "./recharge.less";
import { API } from "../../../const/host"
import axios from "axios"
class Recharge extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.recharge = this.recharge.bind(this)
    };
    recharge(){
        axios.get(`${API}/pay/create`,{
            params:{
                orderId:129,
                returnUrl:""
            }
        }).then(response=>{
            let res = response.data;
            console.log(res);
        })
    }

    render() {
        return (
            <div className="recharge">
                <div className="recharge-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>this.props.history.push(sessionStorage.getItem("backTo"))}
                    >
                        余额充值
                    </NavBar>
                </div>
                <div className="recharge-body">
                    <WingBlank>
                        <Button type="primary" onClick={this.recharge}>充值</Button>
                    </WingBlank>

                </div>
            </div>
        )
    }
}

export default Recharge