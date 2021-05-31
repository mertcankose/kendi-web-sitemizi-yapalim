//Detay Sayfasi
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import Form from '../../components/form'
import Comments from '../../components/comments'

export default function PostPage({ post }) {
  //Yazı içine component yerleştirmek için bu paketi kullanıyoruz.
  const content = useHydrate(post, {
    components: mdxComponents
  })

  //hook
  const { getAccessTokenSilently } = useAuth0()

  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [comments, setComments] = useState([])

  const fetchComment = async () => {
    const query = new URLSearchParams({ url })
    const newUrl = `/api/comment?${query.toString()}`
    const response = await fetch(newUrl, {
      method: 'GET'
    })
    const data = await response.json()
    setComments(data)
    console.log(data)
  }

  useEffect(() => {
    if (!url) return
    fetchComment()
  }, [url])

  useEffect(() => {
    const url = window.location.origin + window.location.pathname
    setUrl(url)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    const userToken = await getAccessTokenSilently()

    //comst response =
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ text, userToken, url }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    //const data = await response.json()
    fetchComment()
    setText('')
  }

  return (
    <div className="site-container">
      <article className="space-y-4 mb-6">
        <h1 className="text-4xl">{post.frontMatter.title}</h1>
        <p>{post.frontMatter.excerpt}</p>
        <hr />
        <div className="prose">{content}</div>
      </article>

      <Form onSubmit={onSubmit} setText={setText} text={text} />

      <Comments comments={comments} />
    </div>
  )
}

//Fetching Posts
export async function getStaticPaths() {
  return {
    paths: await getMdxPaths('post'),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const post = await getMdxNode('post', context)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}
