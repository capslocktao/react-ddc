import React, {Component} from 'react';
import {NavBar,Icon,WingBlank,Modal,Tabs} from "antd-mobile";
import {Link} from "react-router-dom";
import axios from "axios";
import { StickyContainer, Sticky } from 'react-sticky';
import { HOST,API } from "../../../../const/host"
import "./priceSetting.less"
const prompt = Modal.prompt;
function renderTabBar(props) {
    return (<Sticky  topOffset={-45}>
        {({ style }) => <div style={{ ...style,top:45,zIndex: 1,display: 'flex', alignItems: 'center', justifyContent: 'center', }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}

class PriceSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:"",
            tabs:[
                { title: '未设置',value:"0" },
                { title: '已设置',value:"1" }
            ],
            currentUrl:`${API}/base/stockInfo/findAllStockInfo`,
            flag:false
        };
        this.setPrice = this.setPrice.bind(this);
        this.getList = this.getList.bind(this);
        this.setVal = this.setVal.bind(this);
        this.setDone = this.setDone.bind(this);
        this.changeType = this.changeType.bind(this);
    };
    componentDidMount(){
        this.getList(false)
    }
    changeType(v){
        let url = v.value === "0"?`${API}/base/stockInfo/findAllStockInfo`:`${API}/base/cusProPrice/findAllCusProPrice`;
        let flag = v.value === "0"?false:"";
        this.setState({
            currentUrl:url,
            flag
        },()=>{
            this.getList()
        })

    }
    getList(){
        axios.get(this.state.currentUrl,{
            params:{customerId:this.props.match.params.id,flag:this.state.flag}
        }).then(response=>{
            let res = response.data;
            res.forEach(v=>{
                v.editable = false
            });
            this.setState({
                data:res
            });
        })
    }
    setPrice(i){
        console.log(this.state.data[i]);
        this.state.data[i].editable = !this.state.data[i].editable;
        this.setState({
        })
        /*prompt('请输入价格', '', [
            { text: '取消' },
            { text: '确认', onPress: value => {
                let data = {
                    customerId:this.props.match.params.id,
                    productId:this.state.data[i].goodsId,
                    unitsId:this.state.data[i].unitsId,
                    price:value
                };
                    console.log(data);
                    axios.post(`${API}/base/cusProPrice/addCusProPrice`,data).then(response=>{
                    let res = response.data;
                    console.log(res);
                    this.getList()
                })
            } },
        ], 'default', `${this.state.data[i].price}`)*/
    }
    setVal(e,i){
        this.state.data[i].price = e.target.value;
        this.setState({})
    }
    setDone(i){
        let data = {
            id:this.state.data[i].id,
            customerId:this.props.match.params.id,
            goodsId:this.state.data[i].goodsId,
            unitsId:this.state.data[i].unitsId,
            price:this.state.data[i].price
        };
        let url = this.state.flag === false?`${API}/base/cusProPrice/addCusProPrice`:`${API}/base/cusProPrice/updatePrice`
        axios.post(url,data).then(response=>{
            let res = response.data;
            console.log(res);
            if(res.result){
                this.getList()
            }

        })
    }
    render() {
        return (
            <div className="price-setting">
                <div className="price-setting-header-wrapper">
                    <div className="price-setting-header">
                        <NavBar
                            mode="dark"
                            leftContent={
                                <Link to={`${HOST}/myCustomer/customerDetail/${this.props.match.params.id}`} className="back-btn">
                                    <Icon type="left"/>
                                </Link>
                            }
                        >进货价格设置</NavBar>
                    </div>
                </div>

                <StickyContainer>
                    <Tabs tabs={this.state.tabs}
                          onChange={this.changeType}
                          renderTabBar={renderTabBar}
                    >
                        {
                            this.state.tabs.map(v=>(
                                <div className="price-setting-body" key={v.value}>
                                    {
                                        this.state.data?
                                            this.state.data.map((v,i)=>(
                                                <div key={i} className="price-setting-item">

                                                    <WingBlank>
                                                        <div className="top">
                                                            <div className="name">{v.goodsName}</div>
                                                            <div className="modelsize">型号：{v.modelSize}</div>
                                                        </div>
                                                        <div className="bottom">
                                                            <div className="unit">单位：{v.units}</div>
                                                            <div className="price" >
                                                                <span onClick={()=>{this.setPrice(i)}}>{v.editable?"价格":"点击编辑"}：</span><input value={v.price} onChange={(e)=>this.setVal(e,i)} disabled={!v.editable}></input>
                                                                {
                                                                    v.editable?
                                                                        <span className="check" onClick={()=>this.setDone(i)}><Icon type="check"/></span>
                                                                        :
                                                                        ""
                                                                }
                                                            </div>

                                                        </div>
                                                    </WingBlank>
                                                </div>
                                            ))
                                            :
                                            ""
                                    }
                                </div>
                            ))
                        }
                    </Tabs>
                </StickyContainer>

            </div>
        )
    }
}

export default PriceSetting