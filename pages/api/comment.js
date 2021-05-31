import { nanoid } from 'nanoid'
//redis
import Redis from 'ioredis'
import Boom from '@hapi/boom'

//server tarafından gelen hata mesajları ile uğraşmamak için HAPI kullanıyoruz
//O uygun status codeları ve hata mesajalrını basıyor.
function errorResponse(res, error) {
  const { output } = error
  return res.status(output.statusCode).json(output.payload)
}

export default async function handler(req, res) {
  // Create
  if (req.method === 'POST') {
    const { url, userToken, text } = req.body

    if (!url || !userToken || !text) {
      return errorResponse(res, Boom.badData('parametre eksik'))
    }

    //user'ı doğrula
    const userResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const user = await userResponse.json()

    const comment = {
      id: nanoid(),
      createdAt: Date.now(),
      text,
      user: {
        name: user.name,
        picture: user.picture
      }
    }

    //redis connection
    let redis = new Redis(process.env.REDIS_URL)
    //redis write
    redis.lpush(url, JSON.stringify(comment))
    //redis quit
    redis.quit()
    //response
    res.status(200).json(comment)
  }

  //Fetch
  if (req.method === 'GET') {
    const { url } = req.query

    let redis = new Redis(process.env.REDIS_URL)
    const comments = await redis.lrange(url, 0, -1)
    redis.quit()

    const data = comments.map((e) => JSON.parse(e))

    res.status(200).json(data)
  }
}
