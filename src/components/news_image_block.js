/**
 * Created by liuyang on 2017/9/4.
 * 图片新闻列表
 */
import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import {Card} from 'antd'

export default class NewsImageBlock extends Component{

  static propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    cardTitle: PropTypes.string.isRequired,
    cardWidth: PropTypes.string.isRequired,
    imageWidth: PropTypes.string.isRequired
  }

  state = {
    newsArr: null
  }

  componentDidMount() {
    const {type, count} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    // 发送ajax请求，获取图片新闻列表
    axios.get(url)
      .then(response => {
        const newsArr = response.data.map(
          ({uniquekey, title, author_name, thumbnail_pic_s}) => ({uniquekey, title, author_name, thumbnail_pic_s})
        )
        // 更新状态
        this.setState({newsArr})
        // console.log(newsArr)
      })

  }

  render() {
    // 获取newsArr中的属性
    const {newsArr} = this.state
    // 获取props中的属性
    const {imageWidth,cardTitle,cardWidth} = this.props
    // 定义img的样式
    const imgStyle = {
      width: imageWidth,
      height: '90px',
      display: 'block'
    }
    // 定义标题样式
    const titleStyle = {
      width: imageWidth,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
    const newsList = !newsArr
      ? <h2>没有新闻显示</h2>
      : (
          newsArr.map((news, index) => (
            <div key={index} className="imageblock">
              <Link to={`/detail/${news.uniquekey}`}>
                <div>
                  <img src={news.thumbnail_pic_s} style={imgStyle}/>
                </div>
                <div className="custom-card">
                  <h3 style={titleStyle}>{news.title}</h3>
                  <p>{news.author_name}</p>
                </div>
              </Link>
            </div>
          ))
        )
    return (
      <Card title={cardTitle} style={{width: cardWidth}} className="topNewsList">
        {newsList}
      </Card>
    )
  }
}