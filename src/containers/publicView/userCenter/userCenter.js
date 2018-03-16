import React, {Component} from 'react';
import './userCenter.less';
import { Button,Input } from "antd-mobile";

class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num:0
        };
        this.click = this.click.bind(this)
    };
    click(pa){
        console.log(23242);
        this.setState({
            num:pa
        })
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
                <Button type="primary" onClick={this.click}>{this.state.num}</Button>

            </div>
        )
    }
}

export default UserCenter