import React, {Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import './addVisitPlan.less';
class AddVisitPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

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
                    <p>拜访计划</p>
                </div>
            </div>
        )
    }
}

export default AddVisitPlan