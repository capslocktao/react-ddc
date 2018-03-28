import React, {Component} from 'react';
import {InputItem,NavBar,Icon, WingBlank, Button,Modal,Toast } from "antd-mobile";
import "./editPwd.less"
import {API, HOST} from "../../../const/host";
import axios from "axios";
const alert = Modal.alert;
class EditPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password:"",
            oldPassword:""
        };
        this.setValue = this.setValue.bind(this)
        this.submit = this.submit.bind(this)
    };
    setValue(val,name){
        this.setState({
            [name]:val
        })
    }
    submit(){
        if(this.state.password === this.state.oldPassword){
            Toast.fail("新密码不能和旧密码相同",1)
            return
        }
        alert('确认修改密码吗？？',"修改后会自动退出，需重新登陆", [
            { text: '取消', onPress: () => {} },
            { text: '确认', onPress: () => {

                    axios.post(`${API}/sys/user/updatePassword`,{
                        oldPassWord:this.state.oldPassword,
                        newPassWord:this.state.password
                    }).then(response=>{
                        let res = response.data;
                        console.log(res);
                        if(res.result){
                            axios.get(`${API}/logout`).then(res=>{
                                if(res.data.result){
                                    sessionStorage.clear();
                                    localStorage.clear();
                                    Toast.success("退出成功",1);
                                    this.props.history.push('/login')
                                }
                            })

                        }else{
                            Toast.success(res.msg,1);
                        }

                    })
                }},
        ])
    }
    render() {
        return (
            <div className="edit-pwd">
                <div className="edit-pwd-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>{
                            this.props.history.push(sessionStorage.getItem("backTo"))
                        }
                        }
                    >修改密码</NavBar>
                </div>
                <div className="edit-pwd-body">
                    <InputItem placeholder="输入旧密码" password={this.state.oldPassword} onChange={(val)=>this.setValue(val,"oldPassword")} type="password">
                        旧密码
                    </InputItem>
                    <InputItem placeholder="输入新密码" password={this.state.password} onChange={(val)=>this.setValue(val,"password")} type="password">
                        新密码
                    </InputItem>
                </div>
                <WingBlank style={{marginTop:15}}>
                    <Button type="primary" onClick={this.submit}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default EditPwd