import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Layout from '../../components/Layout'
import { getArticleList } from '../../api/article'

import { baseUrl } from '../../config/env'
import { Icon } from 'antd'

import './index.less'


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
    let res = await getArticleList({id: id})
     return { listData: res, currentTypeId: id }
  }

  componentWillUnmount() {
    this.setState = () => {
      return;
    }
  }


  render() {
    const { currentTypeId, listData } = this.props
    const listArr = listData.data.result.list

    const articleItem = listArr.map((item) => {
      return (
        <div className="article-item-box" key={item.id}>
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
        </div>
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
