import React, {Component} from 'react';
import { NavBar,List,Icon,WingBlank,Radio,TextareaItem,Toast,Button,ImagePicker,InputItem,Modal } from "antd-mobile";
import { HOST } from "../../../../const/host";
import { Link } from "react-router-dom";
import axios from "axios";
import "./myOrderDetail.less";
const RadioItem = Radio.RadioItem;
const API = "http://192.168.31.34:8080";
const alert = Modal.alert;
class MyOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status:"COMPLETE",
            data:"",
            address:"",
            //上传图片
            files:[],
            imgUrl:[],
            payMethod:[
                { value:"TRANSFER",label:"转账支付" },
                { value:"ALIPAY",label:"支付宝支付" }
            ],
            payType:"TRANSFER",
            mark:"",

        };
        this.changePayType = this.changePayType.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.setMarkValue = this.setMarkValue.bind(this)

        this.confirm = this.confirm.bind(this)
    };
    componentDidMount(){
        //初始请求订单信息
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
    //确认收货
    confirm(){
        alert('确认收获吗？',"请务必确认收到货物", [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                axios.get(`${API}/base/order/customerConfirm`,{
                    params:{
                        id:this.state.data.orderId
                    }
                }).then(response=>{
                    let res = response.data;
                    if(res.result){
                        Toast.success(res.msg,1);
                        setTimeout(()=>{
                            this.props.history.push(`${HOST}/index/myOrder`)
                        },1000)

                    }else{
                        Toast.fail(res.msg,1);
                    }

                })
            }},
        ])

    }
    changePayType(val){
        console.log(val);
        this.setState({
            payType:val
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
    setMarkValue(val){
        this.setState({
            mark:val
        })
    }
    //确认销售发来的订单
    submit(){
        let submitData={
            paymentVoucher :this.state.imgUrl.join(","),
            payType:this.state.payType,
            mark:this.state.mark,
            id:this.state.data.orderId
        };
        axios.post(`${API}/base/order/customerPay`, submitData).then(response => {
            let res = response.data;
            console.log(res);
            if (res.result) {
                Toast.success(res.msg, 1);
                setTimeout(() => {
                    this.props.history.push(`${HOST}/index/purchase`)
                }, 1000)
            } else {
                Toast.fail(res.msg, 1);
            }
        });
        console.log(submitData);
    }
    componentWillUnmount(){
        sessionStorage.setItem("backTo",this.props.match.url)
    }
    render() {
        const content=()=>{
            switch(this.state.status){
                case "待确认":
                    return <div className="order-detail-body">
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
                            <div className="upload">
                                <WingBlank>
                                    <div className="upload-title">上传转账凭证(最多3张)</div>
                                    <ImagePicker
                                        files={this.state.files}
                                        onChange={this.onChange}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={this.state.files.length < 3}
                                        multiple={true}
                                    />
                                </WingBlank>
                            </div>



                        <div className="pay-method">
                            {this.state.payMethod.map(i => (
                                <RadioItem key={i.value} checked={this.state.payType === i.value} onChange={() => this.changePayType(i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))}
                        </div>
                        <div className="mark">
                            <TextareaItem
                                title="订单备注"
                                placeholder="请输入备注"
                                autoHeight
                                rows={3}
                                onChange={value=>this.setMarkValue(value)}
                            />

                        </div>
                        <WingBlank style={{marginTop:20}}>
                            <Button type="primary" onClick={this.submit}>确认订单</Button>
                        </WingBlank>
                    </div>;
                    break;
                case "待财务确认":
                    return <div className="order-detail-body">
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
                            <InputItem editable={false} value={`${this.state.data.payType}`} style={{textAlign:"right"}}>支付方式</InputItem>
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
                    </div>;
                    break;
                case "待发货":
                    return <div className="order-detail-body">
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
                            <InputItem editable={false} value={`${this.state.data.payType}`} style={{textAlign:"right"}}>支付方式</InputItem>
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
                    </div>;
                    break
                case "已发货":
                    return <div className="order-detail-body">
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
                            <InputItem editable={false} value={`${this.state.data.payType}`} style={{textAlign:"right"}}>支付方式</InputItem>
                        </div>
                        <div className="pay-method">
                            <InputItem editable={false} value={`${this.state.status}`} style={{textAlign:"right"}}>订单状态</InputItem>
                        </div>
                        <List className="logistics">
                            <List.Item extra={"申通物流"}>
                                物流公司
                            </List.Item>
                            <List.Item extra={"332200984893939"} multipleLine wrap={true}>
                                运单号
                            </List.Item>
                            <List.Item arrow="horizontal" onClick={() => {this.props.history.push(`${HOST}/logistics/${23}`)}}>
                                查看物流
                            </List.Item>
                        </List>
                        <div className="mark">
                            <TextareaItem
                                title="订单备注"
                                value={this.state.data.mark}
                                autoHeight
                                rows={3}
                                editable={false}
                            />

                        </div>
                        <WingBlank>
                            <Button type="primary" style={{marginTop:20}} onClick={this.confirm}>确认收货</Button>
                        </WingBlank>

                    </div>;
                    break
                case "完成":
                    return <div className="order-detail-body">
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
                            <InputItem editable={false} value={`${this.state.data.payType}`} style={{textAlign:"right"}}>支付方式</InputItem>
                        </div>
                        <div className="pay-method">
                            <InputItem editable={false} value={`${this.state.status}`} style={{textAlign:"right"}}>订单状态</InputItem>
                        </div>
                        <List className="logistics">
                            <List.Item extra={"申通物流"}>
                                物流公司
                            </List.Item>
                            <List.Item extra={"332200984893939"} multipleLine wrap={true}>
                                运单号
                            </List.Item>
                            <List.Item arrow="horizontal" onClick={() => {this.props.history.push(`${HOST}/logistics/${23}`)}}>
                                查看物流
                            </List.Item>
                        </List>
                        <div className="mark">
                            <TextareaItem
                                title="订单备注"
                                value={this.state.data.mark}
                                autoHeight
                                rows={3}
                                editable={false}
                            />
                        </div>
                    </div>;
                    break
            }

        };
        return (
            <div className="my-order-detail">
                <div className="order-detail-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.push(`${HOST}/index/myOrder`)}
                    >订单详情</NavBar>
                </div>
                {
                    this.state.data?
                        content()
                        :
                        ""
                }


            </div>
        )
    }
}

export default MyOrderDetail