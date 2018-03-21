import React, {Component} from 'react';
import { NavBar, Icon, List, DatePicker, InputItem,TextareaItem   } from 'antd-mobile';
import './ellipsis.less';
class ellipsis extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {

        return (
            <div>
                <div className="add-visit">
                    <div className="add-plan">
                        <NavBar
                            mode="dark"
                            icon={<Icon type="left" />}
                            onLeftClick={() => {this.props.history.push(`../index/visitPlan`)}}
                            rightContent="保存"
                        >新增拜访计划</NavBar>
                    </div>
                    <div className="start-name">
                        <div className="state-side">
                            <p>新增拜访计划</p>
                            <div className="text-size">
                                <List>
                                        <InputItem
                                        placeholder="请输入名称"
                                    >客户名称：</InputItem>
                                </List>
                                <List  className="date-picker-list" >
                                        <DatePicker
                                        value={this.state.date}
                                        onChange={date => this.setState({ date })}
                                        >
                                        <List.Item arrow="horizontal">计划时间:</List.Item>
                                       </DatePicker>
                                </List>
                                <List>
                                    <TextareaItem
                                        title="标题"
                                        placeholder="请输入沟通内容"
                                        data-seed="logId"
                                        autoHeight
                                        ref={el => this.customFocusInst = el}
                                    />
                                </List>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ellipsis