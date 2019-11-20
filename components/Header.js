import Link from 'next/link'
import '../static/assets/header.less'

const Header = () => (
  <div className="header-wrapper">
    <div className="header-content-box">
      <div className="left-header-box">
        <div className="logo-box">
          <Link href="/">
            <img src="/static/img/header/logo.jpg" alt="logo"/>
          </Link>
        </div>
        <div className="type-box">
          <Link href="/">
            <a className="type-item">前端文章</a>
          </Link>
          <Link href="/about">
            <a className="type-item">后端文章</a>
          </Link>
        </div>



      </div>
      <div className="right-header-box">

      </div>
    </div>
  </div>
)

export default Header
