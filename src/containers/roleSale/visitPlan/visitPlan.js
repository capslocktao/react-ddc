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
                    name:"我的第一个访客",
                    num:"2222",
                    state:"2018-1-2"
                },
                {
                    name:"我的第二个访客",
                    num:"12312312",
                    state:"2018-1-2"
                },
                {
                    name:"我的第三个访客",
                    num:"134567498",
                    state:"2018-1-2"
                },
                {
                    name:"我的第四个访客",
                    num:"1313456",
                    state:"2018-1-2"
                },
                {
                    name:"我的第5个访客",
                    num:"4678945",
                    state:"2018-1-2"
                },
                {
                    name:"我的第6个访客",
                    num:"15646879",
                    state:"2018-1-2"
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
                                                  <p>[客户]{v.num}</p>
                                              </div>
                                              <div className="next-text">
                                                  <p>{v.state}</p>
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