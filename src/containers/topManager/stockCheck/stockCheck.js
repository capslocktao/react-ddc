import React, {Component} from 'react';
import {NavBar,Tabs,Picker,List,InputItem} from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import axios from "axios";
import {API} from "../../../const/host"
import "./stockCheck.less";
const Item = List.Item;
const Brief = Item.Brief;
function renderTabBar(props) {
    return (<Sticky  topOffset={-45}>
        {({ style }) => <div style={{ ...style,top:45,zIndex: 1,display: 'flex', alignItems: 'center', justifyContent: 'center', }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
class StockCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs:[
                {
                    title:"商品",
                    stockType:"GOODS"
                },
                {
                    title:"赠品",
                    stockType:"GIFT"
                },
                {
                    title:"物料",
                    stockType:"MATERIEL"
                },
            ],
            stockType:"GOODS",
            goodsId:"",
            goodsData:"",
            warehouse:"",
            warehouseId:"",
            data:""
        };
        this.changeType = this.changeType.bind(this)
        this.selectDone = this.selectDone.bind(this)
        this.warehouseSelectDone = this.warehouseSelectDone.bind(this)
    };
    componentDidMount(){
        //请求商品列表
        axios.get(`${API}/base/product/findProduct`).then(response=>{
            let res = response.data;
            res.forEach(v=>{
                v.label=v.goodsName,
                v.value = v.id
            });
            this.setState({
                goodsData:res
            })

        })
        //调用仓库
        axios.get(`${API}/base/warehouse/warehouseFindAll`).then(response=> {
            let res = response.data;
            res.forEach(v=>{
                v.label = v.warehouseName;
                v.value = v.id
            });
            this.setState({
                warehouse:res
            })
        });
        //初始请求默认数据
        this.fetchData()

    }
    selectDone(v){
        this.setState({
            goodsId:v[0]
        },()=>{
            this.fetchData()
        })
    }
    warehouseSelectDone(v){
        console.log(v);
        this.setState({
            warehouseId:v[0]
        },()=>{
            this.fetchData()
        })

    }
    fetchData(){
        let data = {
            goodsId:this.state.goodsId,
            stockType:this.state.stockType,
            warehouseId:this.state.warehouseId
        };
        this.setState({
            data:""
        },()=>{
            axios.post(`${API}/base/stockInfo/findAllStockInfoApp`,data).then(response=>{
                let res = response.data;
                this.setState({
                    data:res
                })
            })
        })

    }
    changeType(v){
        if(v.stockType === "GIFT"){
            //请求赠品列表
            axios.get(`${API}/base/gift/findGift`).then(response=>{
                let res = response.data;
                res.forEach(v=>{
                    v.label=v.giftName,
                        v.value = v.id
                });
                this.setState({
                    goodsData:res
                })
            })
        }else if(v.stockType === "MATERIEL"){
            //请求物料列表
            axios.get(`${API}/base/materiel/finaMateriel`).then(response=>{
                let res = response.data;
                res.forEach(v=>{
                    v.label=v.materielName,
                        v.value = v.id
                });
                this.setState({
                    goodsData:res
                },()=>{
                    console.log(this.state.goodsData);
                })
            })

        }
        this.setState({
            goodsId:"",
            stockType:v.stockType,
            warehouseId:""
        },()=>{
            this.fetchData()
        });

    }
    render() {
            const ListPicker = ()=>{
                switch(this.state.stockType){
                    case "GOODS":
                        return <div>
                            {
                                this.state.goodsData?
                                    <Picker data={this.state.goodsData} cols={1} onOk={(v)=>{this.selectDone(v)}} value={[this.state.goodsId]}>
                                        <List.Item arrow="horizontal">选择商品</List.Item>
                                    </Picker>
                                    :
                                    <InputItem value={`商品列表加载中...`} editable={false} style={{textAlign:"right"}}>选择商品</InputItem>
                            }

                        </div>;
                        break;
                    case "GIFT":
                        return <div>
                            {
                                this.state.goodsData?
                                    <Picker data={this.state.goodsData} cols={1} onOk={(v)=>{this.selectDone(v)}} value={[this.state.goodsId]}>
                                        <List.Item arrow="horizontal">选择赠品</List.Item>
                                    </Picker>
                                    :
                                    <InputItem value={`赠品列表加载中...`} editable={false} style={{textAlign:"right"}}>选择赠品</InputItem>
                            }

                        </div>;
                        break;
                        case "MATERIEL":
                        return <div>
                            {
                                this.state.goodsData?
                                    <Picker data={this.state.goodsData} cols={1} onOk={(v)=>{this.selectDone(v)}} value={[this.state.goodsId]}>
                                        <List.Item arrow="horizontal">选择物料</List.Item>
                                    </Picker>
                                    :
                                    <InputItem value={`物料列表加载中...`} editable={false} style={{textAlign:"right"}}>选择物料</InputItem>
                            }

                        </div>;
                        break;

                }
        }
        return (
            <div className="stock-check">
                <div className="stock-check-header">
                    <div className="stock-check-header-inner">
                        <NavBar
                            mode="dark"
                        >库存查询</NavBar>

                    </div>
                </div>
                <StickyContainer>

                    <Tabs tabs={this.state.tabs}
                          onChange={this.changeType}
                          renderTabBar={renderTabBar}
                    >
                        {
                            this.state.tabs.map((v)=>(
                                <div key={v.stockType}>
                                    <ListPicker/>
                                    {
                                        this.state.warehouse?
                                            <Picker data={this.state.warehouse} cols={1} onOk={(val)=>{this.warehouseSelectDone(val)}} value={[this.state.warehouseId]}>
                                                <List.Item arrow="horizontal">选择仓库</List.Item>
                                            </Picker>
                                            :
                                            <InputItem value={`仓库列表加载中...`} editable={false} style={{textAlign:"right"}}>选择仓库</InputItem>
                                    }
                                    <List style={{marginTop:10}}>
                                        {
                                            this.state.data?
                                                this.state.data.map((v,i)=>(<Item extra={v.modelSize} key={i} style={{marginBottom:5}}>
                                                    {v.goodsName}
                                                        <Brief>数量：{v.num}</Brief>
                                                    </Item>
                                                ))
                                                :
                                            ""
                                        }

                                    </List>
                                </div>
                            ))
                        }

                    </Tabs>
                </StickyContainer>

            </div>
        )
    }
}

export default StockCheck