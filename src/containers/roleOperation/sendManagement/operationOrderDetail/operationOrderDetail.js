import React, {Component} from 'react';
import { NavBar,Icon,WingBlank,InputItem,TextareaItem,Button,List,ImagePicker,Toast,Modal,Picker } from "antd-mobile"
import "./operationOrderDetail.less";
import {HOST,API} from "../../../../const/host";
import axios from "axios";
const Item = List.Item;
const alert = Modal.alert;
class ComponentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:"",
            address:"",
            status:"",
            files:[],
            imgUrl:[],
            shipper:[
                {
                    label:"中通",
                    value:"ZTO"
                },
                {
                    label:"圆通",
                    value:"YTO"
                },
                {
                    label:"申通",
                    value:"STO"
                },
                {
                    label:"顺丰",
                    value:"SF"
                },
                {
                    label:"韵达",
                    value:"YUNDA"
                },
                {
                    label:"百世汇通",
                    value:"HTKY"
                },
            ],
            shipperName:"",
            shipperCode:"",
            logisticCode:""
        };
        this.onChange = this.onChange.bind(this);
        this.selectShipper = this.selectShipper.bind(this);
        this.setlogisticCode = this.setlogisticCode.bind(this);
        this.send = this.send.bind(this)
    };
    componentDidMount(){
        axios.get(`${API}/base/orderItem/findAllAppOrderItem`,{
            params:{id:this.props.match.params.id}
        }).then(response=>{
            let res = response.data;
            this.setState({
                data:res,
                address:res.address.split("@"),
                status:res.status
            },()=>{
                console.log(this.state.data);
            });

        })

    }
    //上传图片
    onChange = (files) => {
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
    selectShipper(val){
        this.state.shipper.forEach(v=>{
            if(val[0] === v.value){
                this.setState({
                    shipperName:v.label,
                    shipperCode:v.value
                })
            }
        });
    }
    setlogisticCode(val){
        this.setState({
            logisticCode:val
        })
    }
    send(){
        if(this.state.shipperCode === ""){
            Toast.fail("请选择物流公司",1)
            return
        }
        let submitData = {
            paymentVoucher :this.state.imgUrl.join(","),
            shipperCode:this.state.shipperCode,
            logisticCode:this.state.logisticCode,
            id:this.state.data.orderId
        };

        console.log(submitData);
        alert('确认发货吗？？',"请确认发货信息是否正确", [
            { text: '取消', onPress: () => {} },
            { text: '确认', onPress: () => {

    /*          axios.get(`${API}/base/order/financeConfirm`,{
                    params:{
                        id:this.state.data.orderId
                    }
                }).then(response=>{
                    let res = response.data;
                    if(res.result){
                        Toast.success(res.msg,1);
                        setTimeout(()=>{
                            this.props.history.push(`${HOST}/index/sendManagement`)
                        },1000)
                    }else{
                        Toast.success(res.msg,1);
                    }

                })*/
                }},
        ])

    }
    render() {
        return (
            <div className="operation-order-detail">
                <div className="operation-order-detail-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>{
                            this.props.history.push(`${HOST}/index/sendManagement`)
                        }}
                    >订单详情</NavBar>
                </div>
                {
                    this.state.data?
                        <div className="operation-order-detail-body">
                            <div className="address-box">
                                <WingBlank>
                                    <div className="consignee">
                                        <div className="name">{this.state.address[0]}</div>
                                        <div className="phone">{this.state.address[1]}</div>
                                    </div>
                                    <div className="address">
                                        {this.state.address[2]}
                                    </div>

                                </WingBlank>
                            </div>
                            <div className="goods-box">
                                {
                                    this.state.data.appOrderItemModels.map((v,i)=>
                                        <div key={i} className="goods-item">
                                            <WingBlank>
                                                <div className="top">
                                                    <div className="name">{v.productName}</div>
                                                    <div className="price">¥{v.total}</div>
                                                </div>
                                                <div className="bottom">
                                                    <div className="size">型号：{v.modelSize}</div>
                                                    <div className="num">数量：{v.num}</div>
                                                </div>
                                                <div className="unit">单位：{v.units}</div>

                                            </WingBlank>

                                        </div>
                                    )
                                }

                            </div>
                            <div className="totalPrice-wrapper">
                                <WingBlank>
                                    <div className="totalPrice">
                                        <div>总价</div>
                                        <div>¥{this.state.data.totalGoodsPrice}</div>
                                    </div>
                                </WingBlank>

                            </div>
                            <div className="pay-method">
                                <List>
                                    <Item extra={`${this.state.data.payType}`} onClick={()=>{}}>支付方式</Item>
                                </List>
                            </div>
                            <div className="pay-method">
                                <InputItem editable={false} value={`${this.state.status}`} style={{textAlign:"right"}}>订单状态</InputItem>
                            </div>
                            <div className="mark">
                                <TextareaItem
                                    title="订单备注"
                                    value={this.state.data.mark}
                                    autoHeight
                                    rows={3}
                                    editable={false}
                                />
                            </div>
                            <List style={{marginTop:10}}>
                                <Picker data={this.state.shipper}  extra={this.state.shipperName} onChange={(val)=>{this.selectShipper(val)}} cols={1}>
                                    <List.Item arrow="horizontal">物流公司</List.Item>
                                </Picker>
                            </List>

                            <InputItem
                                style={{textAlign:"right"}}
                                onChange={(val)=>{this.setlogisticCode(val)}}
                                placeholder="请填写物流单号"
                            >
                                运单号
                            </InputItem>
                            <div className="upload">
                                <WingBlank>
                                    <div className="upload-title">上传发货凭证(最多3张)</div>
                                    <ImagePicker
                                        files={this.state.files}
                                        onChange={this.onChange}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={this.state.files.length < 3}
                                        multiple={true}
                                    />
                                </WingBlank>
                            </div>


                            <div className="submit-btn">
                                <WingBlank>
                                    <Button type="primary" onClick={this.send}>发货</Button>
                                </WingBlank>
                            </div>

                        </div>
                        :
                        ""
                }

            </div>
        )
    }
}

export default ComponentName