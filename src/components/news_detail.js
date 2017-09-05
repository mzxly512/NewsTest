/**
 * Created by liuyang on 2017/9/1.
 */
import React , {Component} from 'react'
import {Row, Col, BackTop} from 'antd'
import NewsImageBlock from './news_image_block'
import NewsComments from './news_comments'
import axios from 'axios'

export default class NewsDetail extends Component{

  state = {
    news: {}
  }

  componentDidMount() {
    const {uniquekey} = this.props.params
    this.showNewsDetail(uniquekey)
  }

  // 顶级旁边相关新闻，改变uniquekey的值，调用此方法，再次发送请求
  componentWillReceiveProps (newProps) {
    // console.log(newProps);
    this.showNewsDetail(newProps.params.uniquekey)
  }

  // 发送请求获取新闻详情数据
  showNewsDetail(uniquekey) {
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news = response.data
        // console.log(news);
        this.setState({news})

        // 更新文档标题
        document.title = news.title
      })
  }

  render() {

    const {news} = this.state
    const {uniquekey} = this.props.params
    return(
      <div>
        <Row>
          <Col span={1}></Col>
          <Col span={16} className="container">
            <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
            <NewsComments uniquekey={uniquekey}/>
          </Col>
          <Col span={6}>
            <NewsImageBlock type="top" count={40} cardTitle="相关新闻" imageWidth='150px' cardWidth='100%'/>
          </Col>
          <Col span={1}></Col>
        </Row>
        <BackTop></BackTop>
      </div>
    )
  }
}