import React, {Component} from 'react';
import PropsTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { HOST } from '../../const/host'
import { connect } from 'react-redux';

@withRouter

class NavLinkBar extends Component {
    static propTypes = {
        data:PropsTypes.array.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const navList = this.props.data;
        const {pathname} = this.props.location;

        return (
            <div className="tabbar">
                <TabBar>
                    {
                        navList.map(v=> (
                                <TabBar.Item
                                    key={v.path}
                                    title={v.name}
                                    selected={pathname == v.path}
                                    icon={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1520770460728&di=73f7d6bc01aeb5c16292874c11eaa68f&imgtype=0&src=http%3A%2F%2Fp3.gexing.com%2Fshaitu%2F2007-3%2F3212440192007t.gif"}
                                    onPress={()=>{
                                        this.props.history.push(v.path)
                                    }}
                                >

                                </TabBar.Item>

                            ))
                    }
                </TabBar>
            </div>
        )
    }
}
export default NavLinkBar