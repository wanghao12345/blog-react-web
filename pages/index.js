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
      <p>hello next</p>
      <SubLink as="1" id="1" />
      <SubLink as="2" id="2" />
      <SubLink as="3" id="3" />
  </Layout>
)

export default Index

