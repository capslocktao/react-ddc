import React, {Component} from 'react';
import { NavBar, Icon ,WingBlank,List,InputItem,} from 'antd-mobile';
import { Link } from 'react-router-dom';
import {HOST} from "../../../../const/host";
import "./search.less"

const Item = List.Item;
const Brief = Item.Brief;


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list:[],
            value:"请输入"
        };
    };
    componentDidMount(){
        this.setState({list:[
                {title:'样品','status':'123',url:'qwe',syl:'1'},
                {title:'样品','status':'123',url:'qwe',syl:'2'},
                {title:'样品','status':'123',url:'qwe',syl:'3'},
                {title:'样品','status':'123',url:'qwe',syl:'4'}
            ]})
    }
    handleChange(v){
        console.log("999",v)
    }

    render() {
        return (
            <div>
                <div>
                    <NavBar
                        mode="light"
                        leftContent={
                            <Link to={`${HOST}/index/orderManagement`}>
                                <Icon type="left" style={{ marginRight: '16px' }} />
                            </Link>
                        }
                    >搜索</NavBar>
                </div>
                <div className="icon-orderForm-body">

                    <WingBlank size={'sm'}>
                        <div className="my-list">
                            <InputItem
                                placeholder="请输入搜索字段"
                                onChange={this.handleChange}
                            >
                            </InputItem>
                        </div>
                        {
                            this.state.list.map(v=>(
                                <Link key={v.syl} to={ `${HOST}/customerOrderForm/details/${v.syl}`}>
                                    <List

                                        onClick={()=>{

                                        }}
                                        className="my-list">
                                        <Item
                                            arrow="horizontal"
                                            multipleLine
                                            onClick={() => {}}
                                            platform="android"
                                        >
                                            {v.title}<Brief>There may have water ripple effect of</Brief>
                                        </Item>
                                    </List>
                                </Link>
                            ))
                        }
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default Search