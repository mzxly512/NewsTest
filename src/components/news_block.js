/**
 * Created by liuyang on 2017/9/4.
 */
import React, {Component, PropTypes} from 'react'
import { Tabs, Card } from 'antd';
import axios from 'axios'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane;

export default class NewsBlock extends Component{

  static propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }

  state = {
    newsArr: null
  }

  componentDidMount() {

    const {type, count} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        const newsArr = response.data.map(({uniquekey, title}) => ({uniquekey, title}))
        this.setState({newsArr})
        // console.log(newsArr);
      })
  }

  render() {
    const {newsArr} = this.state
    const newsList = !newsArr
      ? <h2>没有任何新闻</h2>
      : (
          <ul>
            {
              newsArr.map((news, index) => (
                <li key={index}>
                  <Link to={`/detail/${news.uniquekey}`}>{news.title}</Link>
                </li>
              ))
            }
          </ul>
        )

    return (
      <Card className="topNewsList">
        {newsList}
      </Card>
    )
  }
}