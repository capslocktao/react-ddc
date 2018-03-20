import React, {Component} from 'react';
import { NavBar, Icon,} from 'antd-mobile';
import {HOST} from "../../../const/host";
import { Link } from 'react-router-dom';
import './visitPlan.less';
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
                {
                    name:"我的第5个访客"
                },
                {
                    name:"我的第6个访客"
                }

            ]
        };

    };


    render() {
        return (
            <div className="visit-plan" >
                <div className="visit-smile">
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
                </div>
                {
                    this.state.data.map(v=>
                        <Link to={`${HOST}/addVisitPlan`} key={v.name}>
                                <div className="goods-item ">
                                      <div className="big-title">
                                              <div className="title" >
                                                  <p>{v.name}</p>
                                                  <p >123456789</p>
                                              </div>
                                              <div className="next-text">
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