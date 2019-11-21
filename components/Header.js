import React, { Component } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import { getTypeList } from '../api/header'
import '../static/assets/header.less'

export default class Header extends Component{

  constructor(props) {
    super(props);
    this.state = {
      navList: []
    }
  }


  componentDidMount() {
    this.getTypeListData()
  }

  render() {
    const { navList } = this.state
    return (
      <div className="header-wrapper">
        <div className="header-content-box">
          <div className="left-header-box">
            <div className="logo-box">
              <Link href="/">
                <img src="/static/img/header/logo.jpg" alt="logo"/>
              </Link>
            </div>
            <div className="type-box">
              {
                navList.map((item) => {
                  return (<span className="type-item" key={item.id}>{item.name}</span>)
                })
              }
            </div>
          </div>
          <div className="right-header-box">
            <Button
              type="primary"
              icon="login"
            >
              登录
            </Button>
            <Button
              type="danger"
              icon="logout"
            >
              登出
            </Button>
          </div>
        </div>
      </div>
    )
  }


  /**
   * 获取类型列表
   */
  getTypeListData () {
    getTypeList().then(res => {
      if (res.status === 200) {
        this.setState({
          navList: res.data.result.list
        })
      }
    })
  }
}
