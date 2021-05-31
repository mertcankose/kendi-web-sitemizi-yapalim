import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'

export default function () {
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

    //const response =
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
  return [comments, onSubmit, text, setText]
}
