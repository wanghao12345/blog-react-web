import React, { Component } from 'react'
import Layout from '../../components/Layout'
import '../../static/assets/login.less'

class Login extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Layout>
        <div className="login-wrapper">
          登录
        </div>
      </Layout>  
    )
  }


}


export default Login