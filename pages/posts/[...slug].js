//Detay Sayfasi
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import Form from '../../components/form'
import Comments from '../../components/comments'
import useComment from '../../hooks/useComment'

export default function PostPage({ post }) {
  const [comments, onSubmit, text, setText] = useComment()

  //Yazı içine component yerleştirmek için bu paketi kullanıyoruz.
  const content = useHydrate(post, {
    components: mdxComponents
  })

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
