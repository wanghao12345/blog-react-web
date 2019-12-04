import React, { Component } from 'react'
import { withRouter } from 'next/router'
import Layout from '../../components/Layout'
import { getArticleList } from '../../api/article'

import { baseUrl } from '../../config/env'
import { Icon } from 'antd'
import Router from 'next/router'

import { connect } from 'react-redux'
import { action } from '../../store/article'

import style from './index.less'


class Article extends Component{
  constructor(props) {
    super(props)
    this.handleLoadNextPage = this.handleLoadNextPage.bind(this)
    this.getArticleListData = this.getArticleListData.bind(this)
    this.handleRouterDetailClick = this.handleRouterDetailClick.bind(this)
  }

  static async getInitialProps(context) {
    const { query, store} = context
    const {  id } = query;
    const { dispatch } = store;
    let res = await getArticleList({
      id: id,
      p: 1,
      size: 2
    })

    const {list, hasNextPage} = res.data.result

    dispatch(action.storePage(1))
    dispatch(action.storeArticles(list))
    dispatch(action.storeHasNextPage(hasNextPage))

    return { listData: res, currentTypeId: id }
  }

  componentDidMount () {
   
  }

  componentWillUnmount() {
    this.setState = () => {
      return;
    }
  }

  render() {
    const { articles, hasNextPage } = this.props
    const articleItem = articles.map((item) => {
      return (
        <div 
          className={style['article-item-box']} 
          key={item.id}
          onClick={this.handleRouterDetailClick(item.id)}
        >
          <div className={style['article-item-img']}>
            <img src={baseUrl + item.coverImage} alt="文章图片" />
          </div>
          <div className={style['article-item-content']}>
              <div className={style['article-item-title']}>{item.title}</div>
              <div className={style['article-item-description']}>{item.description}</div>
              <div className={style['article-item-status']}>
                <div className={style['article-look']}><Icon type="eye" />321</div>
                <div className={style['article-commont']}><Icon type="form" />4</div>
                <div className={style['article-love']}><Icon type="heart" />0</div>
                <div className={style['article-time']}>
                  {item.createTime}
                </div>
              </div>
          </div>
        </div>
      )
    })

    return (
      <Layout>
        <div className={style['article-list-wrapper']}>
          { articleItem }
          <div className={style['aricle-list-bottom']}>
            {
              hasNextPage ? (<span onClick={this.handleLoadNextPage}>查看更多</span>) :
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
    const { currentTypeId, page } = this.props;

    const nextPage = page + 1
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
    const { articles, storePage, storeArticles, storeHasNextPage } = this.props
    getArticleList(param).then(res => {
      const {pageNum, list, hasNextPage} = res.data.result
      if (res.status === 200) {
        storePage(pageNum)
        storeArticles(articles.concat(list))
        storeHasNextPage(hasNextPage)
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


const mapStateToProps = (state) => {
  return {
    articles: state.article.get('articles'),
    page: state.article.get('page'),
    hasNextPage: state.article.get('hasNextPage')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeArticles: (articles) => {dispatch(action.storeArticles(articles))},
    storePage: (page) => {dispatch(action.storePage(page))},
    storeHasNextPage: (hasNextPage) => {dispatch(action.storeHasNextPage(hasNextPage))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Article))