import React, {Component} from 'react';
import {NavBar, Icon, DatePicker, List, Tabs, WhiteSpace, Badge, Flex} from "antd-mobile";
import axios from 'axios';
import {API, HOST} from '../../../const/host';
import "./dataStatistics.less";

const nowd = new Date();
const now = nowd.toLocaleDateString();
const nowd1 = new Date(new Date().getTime() - 30 * 24 * 3600 * 1000);
const now1=nowd1.toLocaleDateString();
const Item = List.Item;

const user = sessionStorage.getItem('user')


/*
* */
const tabs2 = [
    {title: '商品', type: "goods", sub: '1'},
    {title: '门店', type: "customer", sub: '2'},
    {title: '时间', type: "time", sub: '3'},
];


class Client extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: ""
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.data
        })
        console.log(nextProps.data);
        let map = nextProps.data;

    }

    render() {
        return (
            <div>
                <div className="count">
                {
                    Object.keys(this.state.list).map((key) => (
                        <div className="count_pack">
                            <div className="count_left">
                                {key}
                            </div>
                            <div className="count_right">
                                <div className="count_list_pack">
                                    <ul className="count_list">
                                        <li key="0"><span>商品</span><span>数量</span><span>金额</span><span>回款</span><span>未回款</span></li>

                                       {
                                            this.state.list[key].map((item,index) => (
                                            <li key={index}>
                                            <span>{item.goodsName}</span><span>{item.num}</span><span>{item.total}</span><span>{item.receivedPayments}</span><span>{item.unreceived}</span>
                                            </li>

                                            ))
                                        }
                                    </ul>
                                </div>
                           </div>
                      </div>
                    ))
                }
            </div>
            </div>
        )
    }
}


class Ware extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ""
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.data
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.list ?
                        <ul className="goods_list">
                            <li><span>商品</span><span>数量</span><span>金额</span><span>回款</span><span>未回款</span></li>
                            {
                                this.state.list.map((item,index) =>(
                                    <li key={index}>
                                        <span>{item.goodsName}</span><span>{item.num}</span><span>{item.total}</span><span>{item.receivedPayments}</span><span>{item.unreceived}</span>
                                    </li>
                                ))
                            }
                        </ul>
                        : ""
                }
            </div>
        )
    }
}

//const api = "http://192.168.31.174:8080";


class DataStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTime:"",
            endTime:"",
            searchTimed:nowd1,
            endTimed:nowd,
            status: "goods",
            list: ""
        };
        this.TabClick = this.TabClick.bind(this)
        this.searchClick = this.searchClick.bind(this)
        this.endClick = this.endClick.bind(this)
    };

    componentDidMount() {
        let params = {
            startTime:now1,
            endTime:now,
            countType: this.state.status
        }
        /*time,customer,goods*/
        console.log(params)
        axios.post(`${API}/base/salesData/count`, params).then(response => {
            console.log(response)
            let res = response.data;
            if (res.result) {
                this.setState({list: res.data});
            }
        })
    }

    componentWillUnmount() {

    }

    TabClick(tab, index) {
        this.setState({status: tab.type})
        let params = {
            startTime:this.state.searchTime,
            endTime:this.state.endTime,
            countType: tab.type
        }
        axios.post(`${API}/base/salesData/count`, params).then(response => {
            // console.log(response)
            let res = response.data;
            if (res.result) {
                this.setState({list: res.data});
            }
        })
    }

    searchClick(date) {
        console.log(date)
        let sdate = new Date(date).toLocaleDateString();
        this.setState({searchTime: sdate,searchTime:date});
        let params = {
            startTime:sdate,
            endTime:this.state.endTime,
            countType: this.state.status
        }
        axios.post(`${API}/base/salesData/count`, params).then(response => {
            // console.log(response)
            let res = response.data;
            if (res.result) {
                this.setState({list: res.data});
            }
        })
    }

    endClick(date) {
        let sdate = new Date(date).toLocaleDateString();
        this.setState({endTime: sdate,endTimed:date});
        let params = {
            startTime:this.state.searchTime,
            endTime:sdate,
            countType: this.state.status
        }
        axios.post(`${API}/base/salesData/count`, params).then(response => {
            // console.log(response)
            let res = response.data;
            if (res.result) {
                this.setState({list: res.data});
            }
        })
    }

    render() {
        return (
            <div className="data-statistics">
                <div className="data-statistics-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.push(`${HOST}/index/salesUserCenter`)
                        }}
                    >
                        数据统计
                    </NavBar>
                </div>
                <List className="date-picker-list" style={{backgroundColor: 'white'}}>
                    <DatePicker
                        mode="date"
                        title="Select Date"
                        extra="Optional"
                        value={this.state.searchTimed}
                        onChange={this.searchClick}
                    >
                        <List.Item arrow="horizontal">起始时间</List.Item>
                    </DatePicker>
                    <DatePicker
                        mode="date"
                        title="Select Date"
                        extra="Optional"
                        value={this.state.endTimed}
                        onChange={this.endClick}
                    >
                        <List.Item arrow="horizontal">结束时间</List.Item>
                    </DatePicker>
                </List>
                <div>
                    <Tabs tabs={tabs2}
                          onTabClick={this.TabClick}
                    >
                    </Tabs>
                </div>
                <div className="tabList">
                    {
                        this.state.status == "goods" ? <Ware data={this.state.list}/> : <Client data={this.state.list}/>
                    }
                </div>
            </div>
        )
    }
}

export default DataStatistics