//Detay Sayfasi
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

export default function PostPage({ post }) {
  //Yazı içine component yerleştirmek için bu paketi kullanıyoruz.
  const content = useHydrate(post, {
    components: mdxComponents
  })

  //hook
  const {
    loginWithPopup,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently
  } = useAuth0()

  const [text, setText] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const url = window.location.origin + window.location.pathname
    setUrl(url)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()

    const userToken = await getAccessTokenSilently()

    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ text, userToken, url }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="site-container">
      <article className="space-y-4 mb-6">
        <h1 className="text-4xl">{post.frontMatter.title}</h1>
        <p>{post.frontMatter.excerpt}</p>
        <hr />
        <div className="prose">{content}</div>
      </article>

      {/*yorum atma kısmı*/}
      <form className="mt-10" onSubmit={onSubmit}>
        <textarea
          onChange={(e) => setText(e.target.value)}
          rows="3"
          placeholder="Leave a comment"
          className="w-full block border mb-4 resize-y px-2 py-1 bg-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />

        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <button className="buttons">Send</button>
            <img
              src={user.picture}
              width={30}
              className="rounded-full"
              alt="profile"
            />
            <span className="">{user.name}</span>
            <button
              type="button"
              className=""
              onClick={() =>
                logout({ returnTo: process.env.NEXT_PUBLIC_URL + '/posts' })
              }
            >
              x
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="buttons"
            onClick={() => loginWithPopup()}
          >
            Login
          </button>
        )}
      </form>
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
