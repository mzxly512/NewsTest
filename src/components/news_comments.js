/**
 * Created by liuyang on 2017/9/5.
 * 新闻评论列表组件
 */
import React, {Component, PropTypes} from 'react'
import {Form, Card, Input, Button} from 'antd'
import axios from 'axios'

const FormItem = Form.Item
class NewsComments extends Component{

  static propTypes = {
    uniquekey: PropTypes.string.isRequired
  }

  state = {
    comments: []
  }

  // 初始化获取的评论
  componentDidMount() {
    const {uniquekey} = this.props
    // console.log(uniquekey);
    this.showComments(uniquekey)
  }

  // 切换新闻时获取评论
  componentWillReceiveProps(newProps) {
    this.showComments(newProps.uniquekey)
  }

  // 发送请求获取评论
  showComments(uniquekey) {
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const comments = response.data
        // 更新状态-评论列表
        this.setState({comments})
        // console.log(comments);
      })
  }



  render() {
    const {comments} = this.state

    //获取form中的getFieldDecorator方法
    const {getFieldDecorator} = this.props.form

    const commentsList = !comments
      ? <h2>暂无评论</h2>
      : (
          comments.map((comment, index) => (
            <Card key={index} title={comment.UserName} extra={`发布于${comment.datetime}`}>
              <p>{comment.Comments}</p>
            </Card>
          ))
        )
    return(
      <div style={{padding: '10px'}}>
        {commentsList}

        <Form>
          <FormItem label="您的评论" onSubmit={}>
            {getFieldDecorator('userName')(
              <Input type="textarea" placeholder="随便写点什么" />
            )}
          </FormItem>
          <Button type="primary" htmlType="submit">提交评论</Button>
          <Button type="primary">收藏该文章</Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(NewsComments)