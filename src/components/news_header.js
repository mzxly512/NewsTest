/**
 * Created by liuyang on 2017/9/1.
 */
import React , {Component} from 'react'
import {
  Row,  // 行
  Col,  // 列
  Menu, // 导航菜单
  Icon, // 图标
  Button, // 按钮
  Modal, // 对话框
  Tabs, // 页签
  Form, // 表单
  Input, // 输入框
  message, // 消息提示
} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
import Logo from '../images/logo.png'
import '../componentsCss/pc.css'

// 菜单项组件
const MenuItem = Menu.Item
// 页签项组件
const TabPane = Tabs.TabPane;
// 表单项组件
const FormItem = Form.Item;

class NewsHeader extends Component{

  state = {
    // 这里的状态设置为单数，在下面 Menu 属性中再设置为数组
    selectedKey: 'toutiao',
    username: null,
    modalShow: false
  }

  componentDidMount () {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({username})
    }
  }

  // 定义切换菜单的事件
  click = ({key}) => {
    // 判断点击登录按钮，打开对话框
    if (key==='logout'){
      this.setState({
        modalShow: true
      })
    }

    // 更新selectedKey的状态
    this.setState({
      selectedKey: key
    })
  }

  // 定义关闭对话框事件
  showModal = (isShow) => {
    this.setState({
      modalShow: isShow
    })
  }

  // 定义退出当前登录事件
  logout = () => {
    // 更新username状态为null
    this.setState({
      username: null
    })
    // 清空localStorage中保存的数据
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }

  // 定义表单提交事件
  handleSubmit = (isLogin) => {
    // 获取输入框输入的内容
    const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()

    // 定义基础url
    let url = 'http://newsapi.gugujiankong.com/Handler.ashx?'
    // 完整url拼串
    if(isLogin){
      url += `action=login&username=${username}&password=${password}`
    }else {
      url += `action=register&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    }

    // 发送ajax请求
    axios.get(url)
      .then(response => {

        const result = response.data
        console.log('----------------')
        console.log(result)
        if (isLogin) { // 登录
          if(!result){
            // 登录失败
            message.error('登陆失败, 重新登陆')
          }else {
            // 登录成功
            message.success('登陆成功')
            // 读取返回的username和userId
            const username = result.NickUserName
            const userId = result.userId
            // 更新username状态
            this.setState({username})
            // 在localStorage中存储username和userId
            localStorage.setItem('username', username)
            localStorage.setItem('userId', userId)
          }
        }else { // 注册
          message.success('注册成功')
        }
      })
      // 提交表单关闭对话框
      this.setState({modalShow: false})
      // 提交表单后清除输入框数据
      this.props.form.resetFields()
  }

  render () {
    // 取到状态值
    const {selectedKey , username , modalShow} = this.state
    // 获取到 form 属性中的 getFieldDecorator 方法
    const {getFieldDecorator} = this.props.form;

    const usernameShow = username
          ? (
              <MenuItem className="register" key="login">
                <Button type="primary">{username}</Button>&nbsp;&nbsp;
                <Link to="/usercenter">
                  <Button type="dashed">个人中心</Button>&nbsp;&nbsp;
                </Link>
                <Button onClick={this.logout}>退出</Button>
              </MenuItem>
            )
          : (
              <MenuItem className="register" key="logout">
                <Icon type="appstore" />登录/注册
              </MenuItem>
            )

    return (
      <header>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <a href="#" className="logo">
              <img src={Logo} alt="Logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={19}>
            {/*自己编码时是给Menu设置的 defaultSelectedKeys="toutiao"，实现了效果。但是没有状态*/}
            <Menu mode="horizontal" selectedKeys={[selectedKey]} onClick={this.click}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/>社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>
              {usernameShow}
            </Menu>
            <Modal
              title="用户中心"
              visible={modalShow}
              onOk={this.showModal.bind(this, false)}
              onCancel={() => this.showModal(false)}
              okText="关闭"
            >
              <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                <TabPane tab="登录" key="1">
                  <Form onSubmit={this.handleSubmit.bind(this, true)}>
                    <FormItem label="用户名">
                      {getFieldDecorator('username')(
                        <Input type="text" placeholder="请输入用户名"/>
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('password')(
                        <Input type="password" placeholder="请输入密码"/>
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>
                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form onSubmit={this.handleSubmit.bind(this, false)}>
                    <FormItem label="用户名">
                      {getFieldDecorator('r_userName')(
                        <Input type="text" placeholder="请输入用户名"/>
                      )}
                    </FormItem>
                    <FormItem label="密码">
                      {getFieldDecorator('r_password')(
                        <Input type="password" placeholder="请输入密码"/>
                      )}
                    </FormItem>
                    <FormItem label="确认密码">
                      {getFieldDecorator('r_confirmPassword')(
                        <Input type="password" placeholder="请输入确认密码"/>
                      )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}></Col>
        </Row>
      </header>
    )
  }
}

export default Form.create()(NewsHeader);
