import React, {Component} from 'react';
import { NavBar,Icon,InputItem,ImagePicker,WingBlank,Toast,Button } from "antd-mobile";
import "./editAccount.less";
import {API, HOST} from "../../../const/host";
import axios from "axios";
class EditAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user:"",
            nickName:"",
            mobile:"",
            files:[],
            imgUrl:[],

        };
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    };
    componentDidMount(){
        this.setState({
            user:JSON.parse(sessionStorage.getItem("user"))
        },()=>{
            this.setState({
                nickName:this.state.user.nickName,
                mobile:this.state.user.mobile
            })
        })
    }
    //上传图片
    onChange = (files) => {
        if(!files[files.length-1]){
            return
        }
        let formData = new FormData();
        formData.append("file",files[files.length-1].file,files[files.length-1].name);
        let config={
            headers: {'Content-Type': 'multipart/form-data'}
        };
        axios.post(`http://192.168.31.34:8080/base/attachment/upload/signal/uploadImg`,formData,config).then(response=>{
            let res = response.data;
            if(res.result){
                this.state.imgUrl.push(res.data)
                this.setState({files});
            }else{
                Toast.fail(res.msg,1)
            }
        });
    };
    submit(){
        let submitData = {
            nickName:this.state.nickName,
            mobile:this.state.mobile,
            thumbnail:`${this.state.imgUrl[0]}`,
            id:this.state.user.id,
            orgId:this.state.user.orgId
        };

        axios.post(`${API}/sys/user/update`,submitData).then(response=>{
            let res = response.data;
            console.log(res);
            if(res.result){
                Toast.success(res.msg,1);
                //sessionStorage.setItem()
                this.state.user.nickName = submitData.nickName;
                this.state.user.mobile = submitData.mobile;
                this.state.user.thumbnail = submitData.thumbnail;
                sessionStorage.setItem("user",JSON.stringify(this.state.user));
                setTimeout(()=>{
                    this.props.history.push(sessionStorage.getItem("backTo"))
                },1000)
            }
        })
        console.log(submitData);
    }
    setValue(val,name){
        this.setState({
            [name]:val
        })
    }
    render() {

        return (
            <div className="edit-account">
                <div className="edit-account-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>{
                                this.props.history.push(sessionStorage.getItem("backTo"))
                            }
                        }
                    >修改资料</NavBar>
                </div>
                <div className="edit-account-body">
                    <InputItem placeholder="请输入昵称" value={this.state.nickName} onChange={(val)=>{this.setValue(val,"nickName")}}>昵称</InputItem>
                    <InputItem placeholder="请输入电话" value={this.state.mobile} onChange={(val)=>{this.setValue(val,"mobile")}}>电话</InputItem>
                    <div className="upload">
                        <WingBlank>
                            <div className="upload-title">上传头像</div>
                            <ImagePicker
                                files={this.state.files}
                                onChange={this.onChange}

                                selectable={this.state.files.length < 1}
                                multiple={true}
                            />
                        </WingBlank>
                    </div>
                    <WingBlank>
                        <Button type="primary" onClick={this.submit}>保存</Button>
                    </WingBlank>

                </div>
            </div>
        )
    }
}

export default EditAccount