import {withRouter} from 'next/router'
import Layout from '../../components/layout'

const Page = withRouter((props) => (
  <Layout>
    <h3>Post Page</h3>
    <p>Info:{props.router.query.id}</p>
  </Layout>
))
export default Page
