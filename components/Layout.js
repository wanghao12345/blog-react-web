import Header from './header'
import Footer from './footer'
import Head from './Head'
import '../static/assets/reset.less'
import '../static/assets/layout.less'


const Layout = (props) => (
  <div>
    <Header />
    <div className="layout-wrapper">
      <Head />
      <div className="main-content-wrapper">
		{props.children}
      </div>
      <div className="advert-wrapper"></div>
    </div>
    <Footer />
  </div>
)

export default Layout
