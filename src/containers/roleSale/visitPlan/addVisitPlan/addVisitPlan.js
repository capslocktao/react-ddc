import React, {Component} from 'react';
import { NavBar, Icon, List, DatePicker ,Picker,Toast} from 'antd-mobile';
import convertTime from "../../../../util/convertTime"
import { Link} from "react-router-dom"
import './addVisitPlan.less';
import {HOST} from "../../../../const/host";
import axios from "axios/index";
const API = "http://192.168.31.13:8080";
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
let time = "";
class AddVisitPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date:now,
            content:"",
            cuntomer: [],
            status:[
                {
                    label:"一次拜访",
                    value:"ONE"
                },
                {
                    label:"二次拜访",
                    value:"TWO"
                },
                {
                    label:"多次拜访",
                    value:"MORE"
                },
                {
                    label:"签单",
                    value:"SUCCESS"
                },
                {
                    label:"弃单",
                    value:"FAIL"
                }
            ],
            statusName:"",
            statusId:"",
            customerName:"",
            customerId:""
        };

        this.onOk = this.onOk.bind(this);
        this.cuntomerOk = this.cuntomerOk.bind(this);
        this.submit = this.submit.bind(this);
        this.setTime = this.setTime.bind(this);
    };
    componentDidMount() {
        console.log(API)
        axios.post(`${API}/base/customer/appFindAll`, {customerName:"", status: ""}).then((response) => {
            console.log(response.data)
            let res = response.data;
            res.forEach(v => {
                this.state.cuntomer.push({
                    label: v.customerName,
                    value: v.id
                })
            });
            this.setState({
                content: res
            })
        })

    }

    onOk(result){

        this.setState({
            cascaderShow:false,
            selectedData:result
        });

        let resultData = "";
        result.forEach((v,i)=>{
            resultData += i === 1?`/${v.name}/`:v.name
        });
        this.setState({
            area:resultData
        })


    }
    cuntomerOk(val){

        this.state.cuntomer.find((v,i)=>{
            if(val[0] === v.value){
                console.log(v.value)
                this.setState({
                    cuntomerName:v.label,
                    customerId:v.value

                })
            }
        })
    }
    statusOk(val){
            this.state.status.find((v,i)=>{
                if(val[0] === v.value){
                    console.log(v.value)
                    this.setState({
                        statusName:v.label,
                        statusId:v.value
                    })
                }
            })
    }
    setTime(v){
        this.setState({ date:v })
        time = convertTime(v.getTime())
    }
    submit(){
        let submitData = {
            customerId:this.state.customerId,
            statusId:this.state.statusId,
            date:time
        };
        axios.post(`${API}/base/visitPlan/add`,{...submitData}).then(response=>{
            let res = response.data;
            console.log(res);
        })
        console.log(submitData)
    }

    render() {
        return (
            <div>
                <div className="add-visit">
                    <div className="add-plan">
                        <NavBar
                            mode="dark"
                            icon={<Icon type="left" />}
                            onLeftClick={() => {this.props.history.push(`../index/visitPlan`)}}

                            rightContent={

                                <Link onClick={()=>{this.submit()}}  to={`${HOST}../index/visitPlan`} className="text-color">完成</Link>
                            }
                        >添加拜访计划</NavBar>
                    </div>
                    <div className="start-name">
                        <div className="state-sides">
                            <div className="text-size">
                                <List  className="date-picker-list" >
                                    <Picker data={this.state.cuntomer} extra={this.state.cuntomerName} cols={1} onOk={(v)=>{this.cuntomerOk(v)}}>
                                        <List.Item arrow="horizontal">客户名称:</List.Item>
                                    </Picker>
                                    <DatePicker
                                        value={this.state.date}
                                        onChange={v => {this.setTime(v)}}
                                    >
                                        <List.Item arrow="horizontal" >计划时间:</List.Item>
                                    </DatePicker>
                                    <Picker data={this.state.status} extra={this.state.statusName} cols={1} onOk={(v)=>{this.statusOk(v)}}>
                                        <List.Item arrow="horizontal">客户状态</List.Item>
                                    </Picker>

                                </List>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AddVisitPlan