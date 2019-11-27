import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Layout from '../../components/Layout'
import { getArticleList } from '../../api/article'

import { baseUrl } from '../../config/env'
import { Icon } from 'antd'
import Router from 'next/router'

import './index.less'


class Article extends Component{
  constructor(props) {
    super(props)
    this.state = {
      hasNextPage: true,
      articleList: [],
      currentPageNum: 1
    }

    this.handleLoadNextPage = this.handleLoadNextPage.bind(this)
    this.getArticleListData = this.getArticleListData.bind(this)
    this.handleRouterDetailClick = this.handleRouterDetailClick.bind(this)
  }

  static async getInitialProps(context) {
    const {  id } = context.query;
    let res = await getArticleList({
      id: id,
      p: 1,
      size: 2
    })
     return { listData: res, currentTypeId: id }
  }

  componentWillUnmount() {
    this.setState = () => {
      return;
    }
  }

  render() {
    const { listData } = this.props
    let articleList = []
    if (this.state.currentPageNum === 1) {
      articleList = listData.data.result.list
    } else {
      articleList = this.state.articleList
    }

    const articleItem = articleList.map((item) => {
      return (
        <div 
          className="article-item-box" 
          key={item.id}
          onClick={this.handleRouterDetailClick(item.id)}
        >
          <div className="article-item-img">
            <img src={baseUrl + item.coverImage} alt="文章图片" />
          </div>
          <div className="article-item-content">
              <div className="article-item-title">{item.title}</div>
              <div className="article-item-description">{item.description}</div>
              <div className="article-item-status">
                <div className="article-look"><Icon type="eye" />321</div>
                <div className="article-commont"><Icon type="form" />4</div>
                <div className="article-love"><Icon type="heart" />0</div>
                <div className="article-time">
                  {item.createTime}
                </div>
              </div>
          </div>
        </div>
      )
    })

    return (
      <Layout>
        <div className="article-list-wrapper">
          { articleItem }
          <div className="aricle-list-bottom">
            {
              this.state.hasNextPage ? (<span onClick={this.handleLoadNextPage}>查看更多</span>) :
              (<span>已经到底了</span>)
            }
          </div>
        </div>
      </Layout>
    )
  }

  /**
   * 加载下一页
   */
  handleLoadNextPage () {
    const { currentTypeId, listData } = this.props;
    const { currentPageNum } = this.state

    if (currentPageNum === 1) {
      this.setState({
        articleList: listData.data.result.list
      })
    }

    const nextPage = currentPageNum + 1
    const param = {
      id: currentTypeId,
      p: nextPage,
      size: 2
    }
    this.getArticleListData(param)
  }
  /**
   * 获取该类型的文章列表
   */
  getArticleListData (param) {
    getArticleList(param).then(res => {
      if (res.status === 200) {
        const arr = this.state.articleList.concat(res.data.result.list)
        this.setState({
          articleList: arr,
          currentPageNum: res.data.result.pageNum,
          hasNextPage: res.data.result.hasNextPage
        })
      }
    })
  }

  /**
   * 跳到文章详情
   * @param {文章id} id 
   */
  handleRouterDetailClick (id) {
    return () => {
      Router.push({
        pathname: '/detail',
        query: {
          id: id
        }
      })
    }
  }

}

export default withRouter(Article)
