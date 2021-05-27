import Link from 'next/link'
import { getAllNodes } from 'next-mdx/server'

function Posts({ posts }) {
  console.log(posts)
  return (
    <div className="site-container">
      <div className="space-y-10">
        {posts.map((post) => {
          return (
            <Link href={post.url} key={post.url} passHref>
              <article className="space-y-4 ring-2 ring-gray-100 cursor-pointer group shadow-md p-4 hover:shadow-lg hover:bg-gray-50 transition">
                <h2 className="">{post.frontMatter.title}</h2>
                <div className="text-gray-500">
                  <span>{post.frontMatter.date}</span>
                </div>
                <p className="">{post.frontMatter.excerpt}</p>
              </article>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes('post')
    }
  }
}

export default Posts
