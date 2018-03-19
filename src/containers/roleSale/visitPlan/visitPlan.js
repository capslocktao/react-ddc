import React, {Component} from 'react';
import { NavBar, Icon,ListView } from 'antd-mobile';
import {HOST} from "../../../const/host";
import { Link } from 'react-router-dom';
class VisitPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };
    function MyBody(props) {
        return (
            <div className="am-list-body my-body">
                <span style={{ display: 'none' }}>you can custom body wrap element</span>
                {props.children}
            </div>
        );
    }
    render() {
        return (
            <div className="visit-plan">
                <NavBar
                    mode="dark"
                    leftContent={
                        <Link to={`${HOST}/search`}>
                            <Icon key="0" type="search" style={{ marginRight: '16px' }} />
                        </Link>
                    }
                    rightContent={
                        <Icon key="1" type="ellipsis" />
                    }
                >拜访计划</NavBar>,
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() => <span>header</span>}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderSectionHeader={sectionData => (
                        <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                    )}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    renderSeparator={separator}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    pageSize={4}
                    onScroll={() => { console.log('scroll'); }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </div>
        )
    }
}

export default VisitPlan