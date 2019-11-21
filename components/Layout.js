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
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout
