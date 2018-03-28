import React, {Component} from 'react';
import "./message.less";
import { NavBar,Icon,Tabs,List } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import axios from "axios";
import {API, HOST} from "../../../const/host"
const Item = List.Item;
function renderTabBar(props) {
    return (<Sticky topOffset={-45}>
        {({ style }) => <div style={{ ...style, top:45, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs:[
                {
                    title:"未读消息",
                    read:false
                },
                {
                    title:"已读消息",
                    read:true
                }
            ],
            data:[]
        };
        this.changeTab = this.changeTab.bind(this)
    };
    componentDidMount(){
        axios.get(`${API}/base/notic/findCome`,{params:{
            read:false
            }}).then(response=>{
            let res = response.data;
            this.setState({
                data:res
            });
            console.log(res);
        })
    }
    changeTab(val){
        axios.get(`${API}/base/notic/findCome`,{params:{
                read:val.read
            }}).then(response=>{
            let res = response.data;
            this.setState({
                data:res
            },()=>{
                console.log(res);
            });

        })

    }
    componentWillUnmount(){

    }
    render() {

        return (
            <div className="message">
                <div className="message-header">
                    <NavBar
                        icon={<Icon type="left"/>}
                        onLeftClick={()=>{
                                this.props.history.push(sessionStorage.getItem("backTo"))
                            }
                        }
                    >
                        消息提醒
                    </NavBar>
                </div>
                <div className="message-body">
                    <Tabs tabs={this.state.tabs}
                          onChange={(val)=>{this.changeTab(val)}}

                    >
                        <List>
                            {
                                this.state.data.map((v,i)=>(
                                        <Item style={{marginBottom:5}} key={i} onClick={()=>{
                                            this.props.history.push(`${HOST}/messageDetail`);
                                            sessionStorage.setItem("message",JSON.stringify(v))
                                        }}>{v.content}</Item>
                                    )
                                )
                            }

                        </List>
                        <div className="message-box">
                            <List>
                                {
                                    this.state.data.map((v,i)=>(
                                            <Item style={{marginBottom:5}} key={i} onClick={()=>{
                                                this.props.history.push(`${HOST}/messageDetail`);
                                                sessionStorage.setItem("message",JSON.stringify(v))
                                            }}>{v.content}</Item>
                                        )
                                    )
                                }
                            </List>
                        </div>
                    </Tabs>

                </div>
            </div>
        )
    }
}

export default Message