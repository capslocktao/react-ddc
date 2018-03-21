import React, {Component} from 'react';
import { NavBar, Icon ,WingBlank,List,InputItem,Flex} from 'antd-mobile';
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
        /*列表数据*/
        this.setState({list:[
                {title:'样品','status':'123',url:'qwe',syl:'1'},
                {title:'样品','status':'123',url:'qwe',syl:'2'},
                {title:'样品','status':'123',url:'qwe',syl:'3'},
                {title:'样品','status':'123',url:'qwe',syl:'4'}
            ]})
    }
    handleChange(v){
        /*表单搜索*/
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
                                <List

                                    onClick={()=>{

                                    }}
                                    className="my-list">
                                    <Item
                                        multipleLine
                                        onClick={() => {}}
                                        platform="android"
                                        className="order-list"
                                    >
                                        {v.title} 订单号 收货人
                                        <Brief>货物地址状态</Brief>
                                        <Flex justify="end">
                                            <Link key={v.syl} to={ `${HOST}/logistics/${v.syl}`}>
                                                <Flex.Item className="button">
                                                    查看物流
                                                </Flex.Item>
                                            </Link>
                                            <Link key={v.syl} to={ `${HOST}/orderManagement/details/${v.syl}`}>
                                                <Flex.Item className="button">
                                                    查看详情
                                                </Flex.Item>
                                            </Link>
                                        </Flex>

                                    </Item>
                                </List>
                            ))
                        }
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default Search