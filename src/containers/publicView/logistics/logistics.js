import React, {Component} from 'react';
import { NavBar, Icon ,WingBlank,List,Steps,WhiteSpace} from 'antd-mobile';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./logistics.less"
import {HOST} from "../../../const/host";

const Item = List.Item;
const Brief = Item.Brief;

const Step = Steps.Step;

class logistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:""
        };
    };
    componentDidMount(){
        this.setState({
            data:{
                "logisticCode": "888519540633595042",
                "shipperCode": "YTO",
                "companyName":"圆通快递",
                "traces": [{
                    "acceptStation": "【浙江省金华市义乌市荷叶塘公司】已收件",
                    "acceptTime": "2018-03-0420:47:15"
                }, {
                    "acceptStation": "【浙江省金华市义乌市荷叶塘公司】已打包",
                    "acceptTime": "2018-03-0423:32:57"
                }, {
                    "acceptStation": "【浙江省金华市义乌市荷叶塘公司】已发出下一站【义乌转运中心公司】",
                    "acceptTime": "2018-03-0423:38:19"
                }, {
                    "acceptStation": "【义乌转运中心公司】已收入",
                    "acceptTime": "2018-03-0500:26:46"
                }, {
                    "acceptStation": "【义乌转运中心公司】已发出下一站【金华转运中心】",
                    "acceptTime": "2018-03-0500:31:53"
                }, {
                    "acceptStation": "【金华转运中心】已收入",
                    "acceptTime": "2018-03-0504:43:21"
                }, {
                    "acceptStation": "【金华转运中心】已发出下一站【北京转运中心】",
                    "acceptTime": "2018-03-0504:45:29"
                }, {
                    "acceptStation": "【天津转运中心】已收入",
                    "acceptTime": "2018-03-0610:17:41"
                }, {
                    "acceptStation": "【天津转运中心】已发出下一站【北京转运中心】",
                    "acceptTime": "2018-03-0617:59:27"
                }, {
                    "acceptStation": "【北京转运中心】已收入",
                    "acceptTime": "2018-03-0700:05:01"
                }, {
                    "acceptStation": "【北京转运中心】已发出下一站【北京市朝阳区十里堡公司】",
                    "acceptTime": "2018-03-0700:33:41"
                }, {
                    "acceptStation": "【北京市朝阳区十里堡公司】已收入",
                    "acceptTime": "2018-03-0704:48:23"
                }, {
                    "acceptStation": "【北京市朝阳区十里堡公司】派件人:瞿文颖派件中派件员电话18911513062",
                    "acceptTime": "2018-03-0707:42:13"
                }, {
                    "acceptStation": "客户签收人:周海涛已签收感谢使用圆通速递，期待再次为您服务",
                    "acceptTime": "2018-03-0712:00:32"
                }],
                "state": "3",
                "orderCode": "DC12345678",
                "ebusinessID": "1307226",
                "success": true
            }
        })
    }
    componentWillUnmount(){
        sessionStorage.removeItem("backTo")
    }

    render() {
        return (
            <div className="logistics">
                <div className="logistics-header">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.push(sessionStorage.getItem("backTo"))}
                    >物流详情</NavBar>
                </div>
                {
                    this.state.data?
                        <div className="logistics-body">
                            <div className="express-info">
                                <List>
                                    <Item extra={this.state.data.companyName}>物流公司</Item>
                                    <Item extra={this.state.data.logisticCode}>运单号码</Item>
                                </List>
                            </div>
                            <div className="express-step">
                                <List>
                                    <Item >物流进度</Item>
                                </List>
                                <WhiteSpace/>
                                <WingBlank>
                                    <Steps>
                                        {
                                            this.state.data.traces.map(v=>(
                                                <Step title={v.acceptTime} icon={<Icon type="check-circle" />} description={v.acceptStation} key={v.acceptTime}/>
                                            ))
                                        }

                                    </Steps>
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

export default logistics