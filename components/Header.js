import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { getTypeList } from '../api/header'
import style from '../static/assets/header.less'

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


  componentWillUnmount() {
    this.setState = () => {
      return;
    }
  }

  render() {
    const { navList } = this.state
    return (
      <div className={style['header-wrapper']}>
        <div className={style['header-content-box']}>
          <div className={style['left-header-box']}>
            <div className={style['logo-box']}>
              <Link href="/">
                <img src="/static/img/header/logo.jpg" alt="logo"/>
              </Link>
            </div>
            <div className={style['type-box']}>
              {
                navList.map((item) => {
                  return (
                    <Link as={`/article/${item.id}`}  href={`/article?id=${item.id}`} key={item.id}>
                      <span className={style['type-item']}>{item.name}</span>
                    </Link>
                  )
                })
              }
            </div>
          </div>
          <div className={style['right-header-box']}>
            <Button
              type="primary"
              icon="login"
              onClick={() => {
                Router.push({
                  pathname: '/login'
                })
              }}
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
