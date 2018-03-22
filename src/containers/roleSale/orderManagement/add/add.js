import React, {Component} from 'react';
import { NavBar, Icon ,WingBlank,List,InputItem, Accordion,Flex , WhiteSpace,Picker} from 'antd-mobile';
import { Link } from 'react-router-dom';
import axios from "axios"
import {HOST} from "../../../../const/host";
const API = "http://192.168.31.13:8080"

const Item = List.Item;
const Brief = Item.Brief;


//${API}/base/customer/appFindAll`,customerName:""客户  post

//axios.

class add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            district:[
                {
                    label: '2014',
                    value: '2014',
                },
                {
                    label: '2015',
                    value: '2015',
                },
                {
                    label: '2016',
                    value: '2016',
                },
                {
                    label: '2017',
                    value: '2017',
                },
            ],
            asyncValue:[]
        };
    };
    componentDidMount(){
        /*axios.post(`${API}/base/customer/appFindAll`,{customerName:""}).then(response=>{
            console.log(response);
            let res = response.data;
            this.setState({

            })
        })*/
    }
    onPickerChange=(val)=>{
        const asyncValue = [...val];
        this.setState({
            asyncValue,
        });
    }
    state = {
        data: [],
        cols: 1,
        pickerValue: [],
        asyncValue: [],
        sValue: ['2013', '春'],
        visible: false,
    };
    onClick = () => {
        setTimeout(() => {
            this.setState({
                data: provinceLite,
            });
        }, 120);
    };
    onPickerChange = (val) => {
        console.log(val);
        let colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        if (val[0] === 'zj') {
            d.forEach((i) => {
                if (i.value === 'zj') {
                    colNum = 2;
                    if (!i.children) {
                        i.children = [{
                            value: 'zj-nb',
                            label: '宁波',
                        }, {
                            value: 'zj-hz',
                            label: '杭州',
                        }];
                        asyncValue.push('zj-nb');
                    } else if (val[1] === 'zj-hz') {
                        i.children.forEach((j) => {
                            if (j.value === 'zj-hz') {
                                j.children = [{
                                    value: 'zj-hz-xh',
                                    label: '西湖区',
                                }];
                                asyncValue.push('zj-hz-xh');
                            }
                        });
                        colNum = 3;
                    }
                }
            });
        } else {
            colNum = 1;
        }
        this.setState({
            data: d,
            cols: colNum,
            asyncValue,
        });
    };
    render() {
        return (
            <div>
                <div>
                    <NavBar
                        mode="light"
                        leftContent={
                            <Link to={`${HOST}/index/orderManagement`}>
                                <Icon type="left" style={{marginRight: '16px'}}/>
                            </Link>
                        }
                    >订单添加</NavBar>
                </div>
                <WingBlank size={'sm'}>
                    <Picker
                        data={this.state.data}
                        cols={this.state.cols}
                        value={this.state.asyncValue}
                        onPickerChange={this.onPickerChange}
                        onOk={v => console.log(v)}
                    >
                        <List.Item arrow="horizontal" onClick={this.onClick}>Multiple & async</List.Item>
                    </Picker>
                </WingBlank>
            </div>
        );
    }
}

export default add