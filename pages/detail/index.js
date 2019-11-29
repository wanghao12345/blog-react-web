import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Layout from '../../components/Layout'

import { getArticleDetail } from '../../api/article'

import '../../static/assets/articleDetail.less'


class ArticleDetail extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // 路由跳转，将滚动条自动滑动到顶部
    document.documentElement.scrollTop = document.body.scrollTop =0;
  }

  static async getInitialProps (context) {
    const { id } = context.query
    const res = await getArticleDetail(id)
    return {detaiData: res.data.data, articleId: id}
  }



  render () {
    const { detaiData } = this.props
    return (
      <Layout>
        <div className="detail-top">
          <h1>{detaiData.title}</h1>
          <div className="detail-status">
            <div className="left">
              <span>阅读：404</span>
              <span>评论：4</span>
              <span>喜欢：4</span>
              <span>时间：{detaiData.createTime}</span>
            </div>
            <div className="right">
              <span>作者：管理员</span>
            </div>
          </div>
        </div>
        <div
          className="mainContent"
          dangerouslySetInnerHTML={{__html: detaiData.content}}
        ></div>
      </Layout>
    )
  }
}

export default withRouter(ArticleDetail)