import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Layout from '../../components/Layout'

import { getArticleDetail } from '../../api/article'


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
        <div dangerouslySetInnerHTML={{__html: detaiData.content}}></div>
      </Layout>
    )
  }
}

export default withRouter(ArticleDetail)