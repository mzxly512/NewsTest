import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute ,hashHistory} from 'react-router'
import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'
import MediaQuery from 'react-responsive'


render((
    <div>
      <MediaQuery query="(min-device-width: 1224px)">
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={NewsContainer} />
            <Route path="/detail/:uniquekey" component={NewsDetail}/>
            <Route path="/usercenter" component={UserCenter}/>
          </Route>
        </Router>
      </MediaQuery>
      <MediaQuery query="(max-device-width: 1224px)">
        <div>手机界面</div>
      </MediaQuery>
    </div>
), document.getElementById('root'))