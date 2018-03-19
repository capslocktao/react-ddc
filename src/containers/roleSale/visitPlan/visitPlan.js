import React, {Component} from 'react';
import { NavBar, Icon,} from 'antd-mobile';
import {HOST} from "../../../const/host";
import { Link } from 'react-router-dom';
class VisitPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[
                {
                    name:"我的第一个访客"
                },
                {
                    name:"我的第二个访客"
                },
                {
                    name:"我的第三个访客"
                },
                {
                    name:"我的第四个访客"
                },
            ]
        };

    };


    render() {
        return (
            <div className="visit-plan" >
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
                >拜访计划</NavBar>
                {
                    this.state.data.map(v=>
                        <Link to={`${HOST}/addVisitPlan`} key={v.name} style={{marginBottom:"45px"}}>
                                <div className="textcontent" style={{height:"100px",backgroundColor:"white", padding: '15px 0',margin:"12px 0", lineHeight:"5px"}}>
                                  <div>
                                      <div style={{padding:"0 40px",width:"50%", display:"inline",float:"left"}}>
                                          <p>{v.name}</p>
                                          <p style={{marginTop:'10%',width:"50%", display:"inline",float:"left"}}>123456789</p>
                                      </div>
                                      <div style={{lineHeight:"80px"}}>
                                          <p>首次拜访</p>
                                      </div>
                                  </div>
                               </div>
                        </Link>
                    )
                }
              </div>
        )
    }
}

export default VisitPlan