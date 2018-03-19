/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
/*
import React, {Component} from 'react';
import { ListView } from 'antd-mobile';
function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );/!*props.children传递过来的模板*!/
}
const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];// 数据
const NUM_SECTIONS = 5;//总排数
const NUM_ROWS_PER_SECTION = 5;//每排多少节
let pageIndex = 0;//初始
const dataBlobs = {};//数据斑点
let sectionIDs = [];//排
let rowIDs = [];//行
function genData(pIndex = 0) {//pIndex
    for (let i = 0; i < NUM_SECTIONS; i++) {//循环总排数
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;//部分 + 0 1 2 3 4
        sectionIDs.push(sectionName);//加入到排数组中
        dataBlobs[sectionName] = sectionName;//每排的的名做对象索引
        rowIDs[ii] = [];//在row创建ii个空数组

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;// s1排标识 r1行标识
            rowIDs[ii].push(rowName);//添加到先前创立的空数组
            dataBlobs[rowName] = rowName;//每行的标识名做索引
        }
    }
    sectionIDs = [...sectionIDs];//
    rowIDs = [...rowIDs];//
}
class Demo extends React.Component {
    constructor(props) {
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];//从对象中拿取排标记数据
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];//从对象中拿取单行数据

        const dataSource = new ListView.DataSource({
            getRowData,//单行数据
            getSectionHeaderData: getSectionData,//排标题数据
            rowHasChanged: (row1, row2) => row1 !== row2,//行条件
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,//区条件
        });

        this.state = {
            dataSource,//list View对象
            isLoading: true,//懒加载
            height: document.documentElement.clientHeight * 3 / 4,//行高度
        };
    }

    componentDidMount() {
        //无限流瀑布长列表加载
        // you can scroll to the specified position可以滚动到指定位置。
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);这个参数120px 800毫秒
        //计算后实际值达到距离
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax模拟初始Ajax
        setTimeout(() => {
            genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,//loading效果
                height: hei,//边界
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`rudeu使用方法
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }
    /!*
      onEndReached当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用
    * *!/
    onEndReached = (event) => {
        // load new data  更新数据
        // hasMore: from backend data, indicates whether it is the last page, here is false //从后台数据 indicates渲染 lodding设为false hasMore更多
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });//loading显示
        setTimeout(() => {
            genData(++pageIndex);//加数据更新
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,//设回loading隐藏
            });
        }, 1000);
    }

    render() {
        const separator = (sectionID, rowID) => (//名字传入
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;//长度用下标
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];//data中的数据
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderSectionHeader={sectionData => (
                    <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                )}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={4}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}
ReactDOM.render(<Demo />, mountNode);*/

import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class ListExample extends React.Component {
    state = {
        disabled: false,
    }

    render() {
        return (<div>
            <List renderHeader={() => 'Basic Style'} className="my-list">
                <Item extra={'extra content'}>Title</Item>
            </List>
            <List renderHeader={() => 'Subtitle'} className="my-list">
                <Item arrow="horizontal" multipleLine onClick={() => {}}>
                    Title <Brief>subtitle</Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    multipleLine
                    onClick={() => {}}
                    platform="android"
                >
                    ListItem （Android）<Brief>There may have water ripple effect of <br /> material if you set the click event.</Brief>
                </Item>
                <Item
                    arrow="horizontal"
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    multipleLine
                    onClick={() => {}}
                >
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Customized Right Side（Empty Content / Text / Image）'} className="my-list">
                <Item>Title</Item>
                <Item arrow="horizontal" onClick={() => {}}>Title</Item>
                <Item extra="extra content" arrow="horizontal" onClick={() => {}}>Title</Item>
                <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Align Vertical Center'} className="my-list">
                <Item multipleLine extra="extra content">
                    Title <Brief>subtitle</Brief>
                </Item>
            </List>
            <List renderHeader={() => 'Icon in the left'}>
                <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                    arrow="horizontal"
                    onClick={() => {}}
                >My wallet</Item>
                <Item
                    thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png"
                    onClick={() => {}}
                    arrow="horizontal"
                >
                    My Cost Ratio
                </Item>
            </List>
            <List renderHeader={() => 'Text Wrapping'} className="my-list">
                <Item data-seed="logId">Single line，long text will be hidden with ellipsis；</Item>
                <Item wrap>Multiple line，long text will wrap；Long Text Long Text Long Text Long Text Long Text Long Text</Item>
                <Item extra="extra content" multipleLine align="top" wrap>
                    Multiple line and long text will wrap. Long Text Long Text Long Text
                </Item>
                <Item extra="no arrow" arrow="empty" className="spe" wrap>
                    In rare cases, the text of right side will wrap in the single line with long text. long text long text long text
                </Item>
            </List>
            <List renderHeader={() => 'Other'} className="my-list">
                <Item disabled={this.state.disabled} extra="" onClick={() => { console.log('click', this.state.disabled); this.setState({ disabled: true }); }}>Click to disable</Item>
                <Item>
                    <select defaultValue="1">
                        <option value="1">Html select element</option>
                        <option value="2" disabled>Unable to select</option>
                        <option value="3">option 3</option>
                    </select>
                </Item>
            </List>
        </div>);
    }
}

ReactDOM.render(<ListExample />, mountNode);