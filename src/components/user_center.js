/**
 * Created by liuyang on 2017/9/1.
 */
import React, {Component} from 'react'
import { Row, Col, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class UserCenter extends Component{
  render () {
    return(
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs defaultActiveKey="1" >
              <TabPane tab="我的收藏列表" key="1">Content of Tab Pane 1</TabPane>
              <TabPane tab="我的评论列表" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="头像设置" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}