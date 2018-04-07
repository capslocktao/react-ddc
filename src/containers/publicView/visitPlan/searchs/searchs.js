import React, {Component} from 'react';
import { SearchBar, WhiteSpace,NavBar ,Icon,WingBlank,} from 'antd-mobile';
import {HOST,API} from "../../../../const/host";
import { Link } from 'react-router-dom';
import './searchs.less';
import axios from "axios/index";
//const API = "http://192.168.31.13:8080";

class Searchs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:""
        };
        this.submit = this.submit.bind(this)
    };

//搜索
    submit(value){
        let customerName = value;
        axios.get(`${API}/base/visitPlan/findAll`,{
            params:{customerName}
        }).then((response)=>{
            console.log(response.data)
            let res = response.data;
            this.setState({
                content:res
            });
        })

    }
    customerType(type){
        switch (type){
            case "UNEXECUTED":
                return "未执行";
                break;
            case "UNEXECUTED":
                return "已执行";
                break;
            case "SUCCESS":
                return "签单";
                break;
        }
    }


    render() {
        return (
            <div className="visit-search">
                <div className="visit-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {this.props.history.push(`../index/visitPlan`)}}
                        rightContent={
                            <Link to={`${HOST}/addVisitPlan`} style={{color:"white"}}>
                                <Icon key="1" type="" />
                            </Link>
                        }
                    >搜索</NavBar>
                </div>

                <SearchBar placeholder="必须输入客户的全名"
                           ref={ref => this.autoFocusInst = ref}
                           onSubmit={(value)=>{this.submit(value)}}
                           style={{marginTop:45}}
                />
                <WhiteSpace />
                {
                    this.state.content?
                        this.state.content.map((v=>
                            <Link to={`${HOST}/visitDetail/${v.id}`} key={v.id} className="goods-item">
                                <WingBlank className="goods-item-inner">
                                    <div className ="title">
                                        <p>客户名称：{v.customerName}</p>
                                        <p>执行阶段：{this.customerType(v.status)}</p>
                                    </div>
                                    <div className="visit-time">
                                        {v.date}
                                    </div>
                                </WingBlank>
                            </Link>
                            )
                        )
                        :""
                }
            </div>
        )
    }
}

export default Searchs