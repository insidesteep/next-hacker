import Error from 'next/error'
import Link from 'next/link'
import Layout from '../components/Layout'
import StoryList from '../components/StoryList'

const Index = ({ stories, page }) => {
  if (stories.length === 0) {
    return <Error statusCode={503} />
  }

  return (
    <Layout
      title='Hacker Next'
      description='A Hacker News clone made with Next.js'
    >
      <StoryList stories={stories} />

      <footer>
        <Link href={`/?page=${page + 1}`}>
          <a>Next Page ({page + 1})</a>
        </Link>
      </footer>

      <style jsx>{`
        footer {
          padding: 1em;
        }

        footer a {
          text-decoration: none;
          font-weight: bold;
          color: black;
        }
      `}</style>
    </Layout>
  )
}

Index.getInitialProps = async ({ req, res, query }) => {
  let stories
  const page = Number(query.page) || 1

  try {
    const response = await fetch(
      `https://node-hnapi.herokuapp.com/news?page=${page}`
    )
    stories = await response.json()
  } catch (error) {
    console.log(error)
    stories = []
  }

  return { stories, page }
}

export default Index
