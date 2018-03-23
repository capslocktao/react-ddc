import React, {Component} from 'react';
import { NavBar, Icon,Picker,List,DatePicker,TextareaItem} from 'antd-mobile';
import axios from "axios/index";
// import { Link } from 'react-router-dom';
import {HOST} from "../../../../../const/host";
import './addVisitRecord.less';
import convertTime from "../../../../../util/convertTime";
import {Toast} from "antd-mobile/lib/index";
const API = "http://192.168.31.13:8080";
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
let time = "";
class AddVisitRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date:now,
            content:"",
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
            customerId:"",
            visitRecord:"",
            reachContent:""
        };
        this.onOk = this.onOk.bind(this);
        this.submit = this.submit.bind(this);
        this.setTime = this.setTime.bind(this);
    };
    componentDidMount() {
        console.log(this.props.match.params.id)
        let id = this.props.match.params.id;
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
    statusOk(val){
        this.state.status.find((v,i)=>{
            if(val[0] === v.value){
                console.log(v.value)
                this.setState({
                    statusName:v.label,
                    statusId:v.value,
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
            statusId:this.state.statusId,
            reachContent:this.state.reachContent,
            date:time
        };
        axios.post(`${API}/base/visitRecord/add`,{...submitData}).then(response=>{
            let res = response.data;
            if(res.result){
                Toast.success(res.msg,1);
                this.props.history.push(`${HOST}/index/visitDetail`)
                setTimeout(()=>{

                },1000)
            }else{
                Toast.fail(res.msg,1);
            }
        })
    }

    render() {
        return (
            <div className="add-visit">
                <div className="add-plan">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {this.props.history.push(`${HOST}/visitDetail/${this.props.match.params.id}`)}}
                        rightContent={<div onClick={()=>{this.submit()}}>完成</div>}
                    >新赠拜访记录</NavBar>
                </div>
                <div className="start-name">
                    <div className="state-sides">
                        <div>
                            <List  className="date-picker-list" >
                                <DatePicker
                                    value={this.state.date}
                                    onChange={v => {this.setTime(v)}}
                                >
                                    <List.Item arrow="horizontal" >拜访时间:</List.Item>
                                </DatePicker>
                                <Picker data={this.state.status} extra={this.state.statusName} cols={1} onOk={(v)=>{this.statusOk(v)}}>
                                    <List.Item arrow="horizontal">客户状态:</List.Item>
                                </Picker>
                                <TextareaItem
                                    title="拜访成果:"
                                    placeholder="请输入拜访成果"
                                    data-seed="logId"
                                    value={this.state.reachContent}
                                    onChange={value=>this.setValue("reachContent",value)}
                                />
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddVisitRecord