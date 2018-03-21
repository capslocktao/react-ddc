import React, {Component} from 'react';
import { NavBar, Icon, List, DatePicker ,Picker,Toast} from 'antd-mobile';
// import { Link} from "react-router-dom"
import './addVisitPlan.less';
import {HOST} from "../../../../const/host";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
class AddVisitPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date:now,
        };
        this.success = this.success.bind(this)
    };

    success(){
        Toast.success('保存成功 !!!', 1);
        this.props.history.push(`${HOST}/index/visitPlan`)

    }

    render() {
        return (
            <div>
                <div className="add-visit">
                    <div className="add-plan">
                        <NavBar
                            mode="dark"
                            icon={<Icon type="left" />}
                            onLeftClick={() => {this.props.history.push(`../index/visitPlan`)}}
                            rightContent={
                                <div  onClick={this.success}  style={{color:"white"}}>
                                    <Icon key="0" type="" />保存
                                </div>
                            }

                        >新增拜访计划</NavBar>
                    </div>
                    <div className="start-name">
                        <div className="state-sides">
                            <div className="text-size">
                                <List  className="date-picker-list" >
                                    <Picker>
                                        <List.Item arrow="horizontal">选择客户：</List.Item>
                                    </Picker>
                                    <DatePicker
                                        value={this.state.date}
                                        onChange={date => this.setState({ date })}
                                    >
                                        <List.Item arrow="horizontal">计划时间:</List.Item>
                                    </DatePicker>
                                    <Picker className="forss" >
                                        <List.Item arrow="horizontal">拜访状态：</List.Item>
                                    </Picker>

                                </List>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AddVisitPlan