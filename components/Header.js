import React, { Component } from 'react'
import Link from 'next/link'
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
