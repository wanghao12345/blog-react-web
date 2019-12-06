import React, { Component } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button
} from 'antd';

import { postRegister } from '../../api/user'

import Layout from '../../components/Layout'
import style from './index.less'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };

    return (
      <Layout>
        <div className={style['register-wrapper']}>
          <Form 
            {...formItemLayout} 
            onSubmit={this.handleSubmit}
            className={style['register-form']}
          >
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: '填写的不是邮箱!',
                  },
                  {
                    required: true,
                    message: '必须填写邮箱!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '必须填写密码!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '请填写确认密码!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  昵称&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('nickname', {
                rules: [{ 
                  required: true, 
                  message: '请填写你的昵称!', 
                  whitespace: true 
                }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox>
                  我已经读了<a href="">协议</a>
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    );
  }
  
  /**
   * 验证输入密码
   */
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    if (!reg.test(value)) {
      callback('密码长度要大于6位，由数字和字母组成!');
    }
    callback();
  };

  /**
   * 验证确认密码
   */
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
  
    if (value && value !== form.getFieldValue('password')) {
      callback('两次填入的密码不一样!');
    } else {
      callback();
    }
  };

  /**
   * 提交
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        postRegister(values).then(res => {
          console.log(res)
        })
      }
    });
  };

}


const RegisterForm = Form.create({ name: 'normal_register' })(Register)

export default RegisterForm