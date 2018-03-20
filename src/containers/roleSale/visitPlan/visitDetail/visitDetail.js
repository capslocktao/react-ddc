import React, {Component} from 'react';
import { NavBar, Icon} from 'antd-mobile';
import axios from "axios/index";
import './visitDetail.less';
const API = "http://192.168.31.13:8080";
class VisitDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content:""
        };
    };
    componentDidMount(){
        let id = this.props.match.params.id;
        axios.get(`${API}/base/visitPlan/updatePre`,{params:{id}}).then((response)=>{
            console.log(response)
            let res = response.data;
            this.setState({
                content:res
            })
        })
    }


    render() {
        return (
            <div className="add-visit">
                <div className="add-plan">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => {this.props.history.push(`../index/visitPlan`)}}
                        rightContent={[
                            <Icon key="0" type="ellipsis" />,
                        ]}
                    >拜访计划详情</NavBar>
                </div>
                <div className="start-name">
                    <div className="state-side">
                        <p className="font">拜访计划</p>
                        <div className="text-size">
                            <p>客户名称：<span className="visitdetil">{this.state.content.customerName}</span></p>
                            <p>所属销售人员账户：<span className="visitdetil">{this.state.content.salesAccount}</span></p>
                            <p>计划拜访时间：<span className="visitdetil">{this.state.content.visitTime}</span></p>
                            <p>计划拜访内容：<span className="visitdetil">{this.state.content.objective}</span></p>
                            <p>计划状态：<span className="visitdetil">{this.state.content.status}</span></p>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="start-name">
                    <div className="state-side">
                        <p className="font">拜访记录</p>
                        <div className="text-size">
                            <p>拜访时间：<span className="visitdetil">{this.state.content.visitTime}</span></p>
                            <p>拜访成果：<span className="visitdetil">{this.state.content.reachContent}</span></p>
                            <p>客户状态：<span className="visitdetil">{this.state.content.status}</span></p>
                            <p>拜访场景图：<span className="visitdetil">{this.state.content.visitImgUrl}</span></p>
                            <p>销售名：<span className="visitdetil">{this.state.content.userName}</span></p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default VisitDetail