import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Layout from '../../components/Layout'
import { getArticleList } from '../../api/article'


class Article extends Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    // this.getArticleListData()
  }

  static async getInitialProps(context) {
    const {  id } = context.query;
    let listData = []

    getArticleList({
      id: id
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        listData = res.data.result
      }
    })


    return { listData, currentTypeId: id }
  }

  componentWillUnmount() {
    this.setState = () => {
      return;
    }
  }


  render() {
    const { currentTypeId } = this.props
    return (
      <Layout>
        <div>文章列表 { currentTypeId }</div>
      </Layout>
    )
  }


  /**
   * 获取该类型的文章列表
   */
  getArticleListData (id) {
    getArticleList({
      id: id
    }).then(res => {
      console.log(res);
    })
  }

}

export default withRouter(Article)
