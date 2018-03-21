import React, {Component} from 'react';
import { NavBar,Icon,Radio,Button,WingBlank,ImagePicker,Toast } from 'antd-mobile';
import axios from "axios"
import { Link } from "react-router-dom";
import {HOST} from "../../../const/host";
import './pay.less';
const API = "http://192.168.31.34:8080"
const RadioItem = Radio.RadioItem;
class Pay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsData:JSON.parse(sessionStorage.getItem("goodsData")),
            address:{
              customerName:"周海涛",
              mobilePhone:"18840846671",
              detailAddress:"北京市朝阳区定福庄西里2号院北京爸爸的选择有限公司"
            },
            payMethod:[
                { value:"TRANSFER",label:"转账支付" },
                { value:"ALIPAY",label:"支付宝支付" }
            ],
            payType:"TRANSFER",
            files:[],
            imgUrl:[]
        };
        this.changePayType = this.changePayType.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this)
    };
    componentDidMount(){

    }
    changePayType(val){
        console.log(val);
        this.setState({
            payType:val
        })
    }
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
    submit(){
        let goodsData = [];
        let totalGoodsPrice = 0
        this.state.goodsData.forEach(v=>{
            goodsData.push({
                goodsId : v.goodsId,
                modelSize : v.modelSize,
                price : v.price,
                unitsId : v.unitsId,
                num : v.num
            })
            totalGoodsPrice +=v.price;
        })
        let submitData={
            paymentVoucher :this.state.imgUrl.join(","),
            goodsData,
            address:this.state.address.detailAddress,
            payType:this.state.payType,
            totalGoodsPrice
        };
        axios.post(`${API}/base/order/addOrder`,submitData).then(response=>{
            let res = response.data;
            console.log(res);
        })
        console.log(submitData);
    }
    render() {
        return (
            <div className="pay">
                <div className="pay-header">
                    <NavBar
                        mode="dark"
                        leftContent={
                            <Link to={`${HOST}/index/purchase`}><Icon type="left" style={{ marginRight: '16px'}} /></Link>
                        }
                        onLeftClick={()=>{sessionStorage.removeItem("this.state.selectedGoods")}}
                    >付款</NavBar>
                </div>
                <div className="pay-body">
                    <div className="address-box">
                        <WingBlank>
                            <div className="consignee">
                                <div className="name">{this.state.address.customerName}</div>
                                <div className="phone">{this.state.address.mobilePhone}</div>
                            </div>
                            <div className="address">
                                {this.state.address.detailAddress}
                            </div>
                        </WingBlank>
                    </div>
                    <div className="goods-box">

                            {
                                this.state.goodsData.map((v,i)=>
                                    <div key={i} className="goods-item">
                                        <WingBlank>
                                            <div className="top">
                                                <div className="name">{v.goodsName}</div>
                                                <div className="price">¥{v.price}</div>
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


                </div>
                <div className="pay-method">
                    {this.state.payMethod.map(i => (
                        <RadioItem key={i.value} checked={this.state.payType === i.value} onChange={() => this.changePayType(i.value)}>
                            {i.label}
                        </RadioItem>
                    ))}
                </div>
                <WingBlank style={{marginTop:20}}>
                    <Button type="primary" onClick={this.submit}>提交订单</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Pay