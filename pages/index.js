import Error from 'next/error'
import StoryList from '../components/StoryList'

const Index = ({ stories }) => {
  if (stories.length === 0) {
    return <Error statusCode={503} />
  }

  return (
    <div>
      <h1>Hacker next</h1>
      <StoryList stories={stories} />
    </div>
  )
}

Index.getInitialProps = async () => {
  let stories

  try {
    const response = await fetch('https://node-hnapi.herokuapp.com/news?page=1')
    stories = await response.json()
  } catch (error) {
    console.log(error)
    stories = []
  }

  return { stories }
}

export default Index
