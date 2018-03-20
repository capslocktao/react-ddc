import React, {Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';

class AddVisitPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {this.props.history.push(`../index/visitPlan`)}}
                    rightContent={[
                        <Icon key="0" type="ellipsis" />,
                    ]}
                >拜访计划</NavBar>
            </div>
        )
    }
}

export default AddVisitPlan