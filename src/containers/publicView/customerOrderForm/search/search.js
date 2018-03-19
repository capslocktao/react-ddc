import React, {Component} from 'react';
import { NavBar, Icon ,WingBlank,List} from 'antd-mobile';
import { Link } from 'react-router-dom';
import {HOST} from "../../../../const/host";
import "../../../../style/common.less"

const Item = List.Item;
const Brief = Item.Brief;
class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list:[]
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

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                >搜索</NavBar>

                <WingBlank size={'sm'}>
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
        )
    }
}

export default Search