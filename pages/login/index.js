import React, { Component } from 'react'
import Router from 'next/router'
import { Form, Button, Checkbox, Input, Icon, message } from 'antd'
import { postLogin } from '../../api/user'
import Layout from '../../components/Layout'
import style from './index.less'

class Login extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <div className={style['login-wrapper']}>
        <Form onSubmit={this.handleSubmit} className={style['login-form']}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入你的用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入你的密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住账号</Checkbox>)}
            <a className={style['login-form-forgot']} href="">
              忘记密码
            </a>
            <Button 
              type="primary" 
              htmlType="submit" 
              className={style['login-form-button']}
            >
              登录
            </Button>
            或者 <a href="">注册!</a>
          </Form.Item>
        </Form>
        </div>
      </Layout>  
    )
  }


  /**
   * 登录
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        postLogin(values).then(res => {
          if (res.status === 200) {
            message.success(res.message, 2, () => {
              Router.push({
                pathname: '/'
              })
            });
          }
        })
      }
    });
  };

}

const LoginForm = Form.create({ name: 'normal_login' })(Login)

export default LoginForm