/**
 * Created by liuyang on 2017/9/1.
 */
import React , {Component} from 'react'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'

export default class App extends Component{
  render() {
    return(
      <div>
        <NewsHeader></NewsHeader>
        {this.props.children}
        <NewsFooter>底部</NewsFooter>
      </div>
    )
  }
}