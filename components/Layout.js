import Header from './header'
import Footer from './footer'
import Head from './Head'
import { useEffect } from 'react'
import '../static/assets/reset.less'
import style from '../static/assets/layout.less'



const Layout = (props) => {
  useEffect(() => {

  })
  
  return (
    <div>
      <Header />
      <div className={style['layout-wrapper']}>
        <Head />
        <div className={style['main-content-wrapper']}>
          {props.children}
        </div>
        <div className={style['advert-wrapper']}></div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
