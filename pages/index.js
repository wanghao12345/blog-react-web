import Layout from '../components/Layout'
import Link from 'next/link'

const SubLink = props => (
  <li>
    <Link as={`post/${props.as}`} href={`/post?id=${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
)

const Index = () => (
  <Layout>
    首页
  </Layout>
)

export default Index

