import React, {Component} from 'react';
import { NavBar, Icon ,WingBlank,List,InputItem, Accordion,Flex ,Steps, WhiteSpace} from 'antd-mobile';
import { Link } from 'react-router-dom';
import axios from "axios"
import "./dateils.less"
import {HOST} from "../../../../const/host";

const Item = List.Item;
const Brief = Item.Brief;

const Step = Steps.Step;

const steps = [{
    title: 'Finished',
    description: 'This is description',
}, {
    title: 'In Progress',
    description: 'This is description',
}, {
    title: 'In Progress',
    description: 'This is description',
}, {
    title: 'Waiting',
    description: 'This is description',
}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

const customIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
        <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
            <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
            <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
        </g>
    </svg>
);

const API="http://192.168.31.34:8080"

class details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:""
        };
        console.log(this.props.match.params.id)
    };
    componentDidMount(){
        console.log(this.props.match.params.id)

        axios.get(`${API}/base/orderItem/findAllAppOrderItem`,{params:{id:this.props.match.params.id}}).then(response=>{
           console.log(response)
            let res=response.data;
            this.setState({
               data:res
           })
        })
    }
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
                    >订单详情</NavBar>
                </div>
                <WingBlank size={'sm'}>
                    {/*<Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header="单据">
                            <List className="my-list">
                                <List.Item>单据详情</List.Item>
                                <List.Item>客户标识</List.Item>
                                <List.Item>销售人员标识</List.Item>
                                <List.Item>所属销售人员标识</List.Item>
                            </List>
                        </Accordion.Panel>
                        <Accordion.Panel header="订单状态" className="pad">
                            <List.Item>订单状态</List.Item>
                            <List.Item>支付时间｜｜支付方式</List.Item>
                            <List.Item>客户确认时间</List.Item>
                            <List.Item>发货时间</List.Item>
                            <List.Item>确认收获时间</List.Item>
                        </Accordion.Panel>
                        <Accordion.Panel header="快递信息" className="pad">
                            <List.Item>运费</List.Item>
                            <List.Item>快递公司编码</List.Item>
                            <List.Item>快递单号</List.Item>
                        </Accordion.Panel>
                        <Accordion.Panel header="收获人信息" className="pad">
                            <List.Item>收货人姓名</List.Item>
                            <List.Item>收货人电话</List.Item>
                            <List.Item>收获地址</List.Item>
                        </Accordion.Panel>
                        <Accordion.Panel header="商品信息" className="pad">
                            <List.Item>商品名称</List.Item>
                            <List.Item>商品数量</List.Item>
                            <List.Item>商品单价</List.Item>
                            <List.Item>实付金额</List.Item>
                        </Accordion.Panel>
                        <Accordion.Panel header="凭证" className="pad">
                            <List.Item>支付凭证</List.Item>
                            <List.Item>发货凭证</List.Item>
                            <List.Item>备注</List.Item>
                        </Accordion.Panel>
                    </Accordion>*/}
                    <div style={{width:'100%',overflow:'auto'}}>
                        <WingBlank mode={20} className="stepsExample">
                            <WhiteSpace />
                            <Steps current={2} direction="horizontal" size="small">{steps}</Steps>
                        </WingBlank>
                    </div>
                    {
                        this.state.data?
                            <div>
                                <List renderHeader={() => '| 商品'}  className="my-list">
                                    {
                                        this.state.data.appOrderItemModels.map((item)=>(
                                             <div>
                                                 <Item align="middle">
                                                     <Flex>
                                                         <Flex.Item>{item.productName}</Flex.Item>
                                                     </Flex>
                                                 </Item>
                                                 <Item align="middle">
                                                     <Flex justify="between">
                                                         <Flex.Item>{item.price}</Flex.Item>
                                                         <Flex.Item>${item.num}</Flex.Item>
                                                     </Flex>
                                                 </Item>
                                             </div>
                                        ))
                                    }

                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>{this.state.data.totalGoodsPrice}</Flex.Item>
                                            <Flex.Item>{this.state.data.status}</Flex.Item>
                                        </Flex>
                                    </Item>
                                </List>
                                <List renderHeader={() => '| 用户信息'}  className="my-list">
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>用户ID</Flex.Item>
                                            <Flex.Item>ID</Flex.Item>
                                        </Flex>
                                    </Item>
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>用户名</Flex.Item>
                                            <Flex.Item>ID</Flex.Item>
                                        </Flex>
                                    </Item>
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>手机号</Flex.Item>
                                            <Flex.Item>ID</Flex.Item>
                                        </Flex>
                                    </Item>
                                </List>
                                <List renderHeader={() => '| 配送信息'}  className="my-list">
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>收件人</Flex.Item>
                                            <Flex.Item>手机号</Flex.Item>
                                        </Flex>
                                    </Item>
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>收获地址 {this.state.data.address}</Flex.Item>
                                        </Flex>
                                    </Item>
                                </List>
                                <List renderHeader={() => '| 快递信息'}  className="my-list">
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>什么快递</Flex.Item>
                                            <Flex.Item>快递单号</Flex.Item>
                                        </Flex>
                                    </Item>
                                </List>
                                <List renderHeader={() => '| 订单信息'}  className="my-list">
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>订单类型</Flex.Item>
                                            <Flex.Item>类</Flex.Item>
                                        </Flex>
                                    </Item>
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>订单号</Flex.Item>
                                            <Flex.Item>类</Flex.Item>
                                        </Flex>
                                    </Item>
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>下单时间</Flex.Item>
                                            <Flex.Item>类</Flex.Item>
                                        </Flex>
                                    </Item>
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>付款时间</Flex.Item>
                                            <Flex.Item>类</Flex.Item>
                                        </Flex>
                                    </Item>
                                </List>
                                <List renderHeader={() => '| 付款方式'}  className="my-list">
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>在线支付</Flex.Item>
                                            <Flex.Item>类</Flex.Item>
                                        </Flex>
                                    </Item>
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item>货到付款</Flex.Item>
                                            <Flex.Item>类</Flex.Item>
                                        </Flex>
                                    </Item>
                                </List>
                                <List renderHeader={() => '| 买家留言'}  className="my-list">
                                    <Item align="middle">
                                        <Flex justify="between">
                                            <Flex.Item style={{fontSize: '12px'}}>留言:{this.state.data.mark}</Flex.Item>
                                        </Flex>
                                    </Item>
                                </List>
                            </div>
                            :""

                    }

                </WingBlank>
            </div>
        );
    }
}

export default details