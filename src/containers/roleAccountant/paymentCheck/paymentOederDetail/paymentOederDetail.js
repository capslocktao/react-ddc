import React, {Component} from 'react';
import { NavBar,WingBlank,InputItem,TextareaItem,Button,List,Icon,Toast,Modal } from "antd-mobile";
import axios from "axios";
import './paymentOederDetail.less';
import { HOST } from "../../../../const/host"
const API = "http://192.168.31.34:8080";
const Item = List.Item;
const alert = Modal.alert;
class PaymentOrderDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:"",
            address:"",
            status:"",
            checkPic:false,
            preview:""
        };
        this.linkToPrevwew = this.linkToPrevwew.bind(this)
        this.checkPayment = this.checkPayment.bind(this)
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
    linkToPrevwew(){
        let imgs = this.state.data.paymentVoucher.split(",");
        sessionStorage.setItem("preview",JSON.stringify(imgs));
        sessionStorage.setItem("backTo",this.props.match.url);

        this.props.history.push(`${HOST}/previewImg`)
    }
    checkPayment(){
        alert('确认通过审核吗？？',"请确认收到货款", [
            { text: '取消', onPress: () => {} },
            { text: '确认', onPress: () => {
                    axios.get(`${API}/base/order/financeConfirm`,{
                        params:{
                            id:this.state.data.orderId
                        }
                    }).then(response=>{
                        let res = response.data;
                        if(res.result){
                            Toast.success(res.msg,1);
                            setTimeout(()=>{
                                this.props.history.push(`${HOST}/index/paymentCheck`)
                            },1000)
                        }else{
                            Toast.success(res.msg,1);
                        }

                    })
            }},
        ])

    }
    render() {
        return (
            <div className="payment-order-detail">

                <div className="payment-order-detail-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>{
                            this.props.history.push(`${HOST}/index/paymentCheck`)
                        }}

                    >订单详情</NavBar>
                </div>
                {
                    this.state.data?
                        <div className="payment-order-detail-body">
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
                                        <Item extra={`${this.state.data.payType}`}>支付方式</Item>
                                        <Item arrow="horizontal" onClick={this.linkToPrevwew}>查看转账凭证</Item>
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
                                <div className="submit-btn">
                                    <WingBlank>
                                        <Button type="primary" onClick={this.checkPayment}>审核通过</Button>
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

export default PaymentOrderDetail