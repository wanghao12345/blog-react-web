import Header from './header'
import Footer from './footer'
import '../static/assets/reset.less'
import '../static/assets/layout.less'

const Layout = (props) => (
  <div>
    <Header />
    <div className="layout-wrapper">
      {props.children}
    </div>
    <Footer />
  </div>
)

export default Layout
