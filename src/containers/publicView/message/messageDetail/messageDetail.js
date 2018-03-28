import React, {Component} from 'react';
import "./messageDetail.less";
import { NavBar,Icon,WingBlank } from "antd-mobile";
import {HOST,API} from "../../../../const/host"
import axios from "axios"
class MessageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message:""
        };
    };
    componentDidMount(){
        this.setState({
            message:JSON.parse(sessionStorage.getItem("message"))
        },()=>{
            axios.get(`${API}/base/notic/findOne`,{
                params:{
                    id:this.state.message.id
                }
            }).then(response=>{
                console.log(response.data);
            })
        })
    }
    componentWillUnmount(){
        sessionStorage.removeItem("message")
    }
    render() {
        return (
            <div className="message-detail">
                <div className="message-detail-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>this.props.history.push(`${HOST}/message`)}
                    >消息详情</NavBar>
                </div>
                <div className="message-detail-body">

                        <div className="item">
                            <WingBlank>
                                {this.state.message.content}
                            </WingBlank>
                        </div>


                </div>

            </div>
        )
    }
}

export default MessageDetail