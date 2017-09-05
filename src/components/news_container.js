/**
 * Created by liuyang on 2017/9/1.
 */
import React, {Component} from 'react'
import {Row, Col, Carousel} from 'antd'
import NewsBlock from './news_block'
import NewsImageBlock from './news_image_block'
import NewsProduct from './news_product'
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

export default class NewsContainer extends Component{
  render() {
    return(
      <div className="container">
        <Row >
          <Col span={1}></Col>
          <Col span={22}>
            <div className="leftContainer" style={{width: '35%'}}>
              <Carousel autoplay>
                <div><img src={carousel_1}/></div>
                <div><img src={carousel_2}/></div>
                <div><img src={carousel_3}/></div>
                <div><img src={carousel_4}/></div>
              </Carousel>
              <NewsImageBlock type="guoji" count={6} cardTitle="国际新闻" cardWidth="100%" imageWidth="110px"></NewsImageBlock>
            </div>
            <Tabs className="tabs_news" style={{width: '35%'}}>
              <TabPane key="1" tab="头条新闻">
                <NewsBlock type="top" count={21}/>
              </TabPane>
              <TabPane key="2" tab="国际新闻">
                <NewsBlock type="guoji" count={21}/>
              </TabPane>
            </Tabs>
            <Tabs className="tabs_product" style={{width: '30%'}}>
              <TabPane key="1" tab="React News产品">
                <NewsProduct ></NewsProduct>
              </TabPane>
            </Tabs>
            <div>
              <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth="125px"></NewsImageBlock>
              <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth="126px"></NewsImageBlock>
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}