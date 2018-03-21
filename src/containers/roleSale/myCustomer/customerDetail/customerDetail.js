import React, {Component} from 'react';
import {NavBar,Icon,List, Picker,InputItem,TextareaItem } from "antd-mobile";
import ReactCascader from "../../../../components/react-cascader/react-cascader";
import { HOST } from '../../../../const/host'
import axios from 'axios'
const API = "http://192.168.31.222:8080";
const API2 = "http://192.168.31.13:8080";
class CustomerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cascaderShow:false,
            areaData:[],
            selectedData:[],
            area:"",
            cuntomerType: [
                {
                    label:"门店",
                    value:"STORE"
                },
                {
                    label:"代理商",
                    value:"AGENT"
                },
                {
                    label:"大客户",
                    value: "BIGCUSTOMER"
                },
            ],
            type:"",
            typeName:"",
            statusType:[
                {
                    label:"初次拜访",
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
            status:"",
            statusName:"",
            customerName:"",
            mobilePhone:"",
            address:""
        };
        this.showCascader = this.showCascader.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onOk = this.onOk.bind(this);
        this.typeOk = this.typeOk.bind(this);
        this.submit = this.submit.bind(this);
        this.setValue = this.setValue.bind(this);

    };
    componentDidMount(){
        axios.post(`${API}/base/area/province`).then(res=>{
            this.setState({
                areaData:res.data
            })
        })
    }
    showCascader(){
        this.setState({
            cascaderShow:true
        })
    }
    onCancel(){
        this.setState({
            cascaderShow:false
        })
    }
    getData(id){

        axios.get(`${API}/base/area/cityOrDistrict`,{
            params:{parentId:`${id}`}
        }).then(res=>{

            this.setState({
                areaData:res.data
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
    typeOk(v){
        this.setState({
            type:v[0]
        },()=>{
            this.state.cuntomerType.find((v,i)=>{
                if(this.state.type === v.value){
                    this.setState({
                        typeName:v.label
                    })
                }
            })

        })

    }
    statusOk(v){
        this.setState({
            status:v[0]
        },()=>{
            this.state.statusType.find((v,i)=>{
                if(this.state.status === v.value){
                    this.setState({
                        statusName:v.label
                    })
                }
            })

        })

    }
    setValue(name,v){
        this.setState({
            [name]:v
        })
    }
    submit(){
        let submitData = {
            customerName:this.state.customerName,
            mobilePhone:this.state.mobilePhone,
            detailAddress:this.state.address,
            cuntomerType:this.state.type,
            status:this.state.status,
            addressIds:[this.state.selectedData[0].id,this.state.selectedData[1].id,this.state.selectedData[2].id,]
        };
        axios.post(`${API2}/base/customer/addApp`,{...submitData}).then(response=>{
            let res = response.data;
            console.log(res);
        })
        console.log(submitData)
    }
    render() {

        const ReanderNavBar=()=>{
            return this.props.match.params.id?
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{this.props.history.push(`${HOST}/index/myCustomer`)}}
                    rightContent={<div>编辑</div>}
                >客户详情</NavBar>
                :
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{this.props.history.push(`${HOST}/index/myCustomer`)}}
                    rightContent={<div onClick={()=>{this.submit()}}>完成</div>}
                >新增客户</NavBar>
        };
        return (
            <div className="custoomer-detail">
                <div className="custoomer-detail-header">
                    <ReanderNavBar></ReanderNavBar>
                </div>
                <div className="custoomer-detail-body">

                    <List>
                        <InputItem
                            style={{textAlign:"right"}}
                            type="text"
                            placeholder="请填写客户姓名"
                            clear
                            onChange={value=>this.setValue("customerName",value)}
                        >
                            客户姓名
                        </InputItem>
                        <InputItem
                            style={{textAlign:"right"}}
                            type="text"
                            placeholder="请填写电话"
                            clear
                            onChange={value=>this.setValue("mobilePhone",value)}
                        >
                            电话
                        </InputItem>
                        <Picker data={this.state.cuntomerType} extra={this.state.typeName} cols={1} onOk={(v)=>{this.typeOk(v)}}>
                            <List.Item arrow="horizontal">客户类型</List.Item>
                        </Picker>
                        <Picker data={this.state.statusType} extra={this.state.statusName} cols={1} onOk={(v)=>{this.statusOk(v)}}>
                            <List.Item arrow="horizontal">客户状态</List.Item>
                        </Picker>

                        <List.Item arrow="horizontal"
                            extra={this.state.area}
                            onClick={this.showCascader}
                        >所在区域</List.Item>

                        <TextareaItem
                            title="详细地址"
                            placeholder="请输入详细地址"
                            data-seed="logId"
                            autoHeight
                            name="address"
                            rows={3}
                            onChange={value=>this.setValue("address",value)}
                        />
                    </List>
                </div>
                <ReactCascader
                    cascaderShow={this.state.cascaderShow}
                    onCancel={this.onCancel}
                    getData={this.getData.bind(this)}
                    data={this.state.areaData}
                    onOk={this.onOk.bind(this)}
                ></ReactCascader>

            </div>
        )
    }
}

export default CustomerDetail