import React, {Component} from 'react';
import './userCenter.less';
import { Button,Input,NavBar,List } from "antd-mobile";
const Item = List.Item;
class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num:0
        };

    };

    componentWillMount(){
        console.log('挂载前')
    }
    componentDidMount(){
        console.log('挂载后')
    }

    render() {

        return (
            <div className="user-center">
                <NavBar
                    mode="dark"
                >用户中心</NavBar>
                <div className="user-center-body">
                    <List>
                        <Item arrow="horizontal" onClick={() => {}}>Title</Item>
                    </List>
                </div>
            </div>
        )
    }
}

export default UserCenter