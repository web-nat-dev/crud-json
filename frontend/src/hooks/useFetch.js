import { useState } from 'react'

export const useFetch = (params) => {
  const [response, setResponse] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (params) => {
    try {
      console.log('sending request...')
      setLoading(true)

      const raw = await fetch(params.url, params?.options)
      const data = await raw.json()

      console.log(`response received: ${JSON.stringify(data)}`)

      data?.success ? setResponse(data.data) : setError(data?.message)
    } catch (err) {
      console.log(`error encountered: ${err}`)
      setError(err?.message)
    } finally {
      console.log('loading state ended.')
      setLoading(false)
    }
  }

  function trigger() {
    submit(params)
  }

  return { response, loading, error, trigger }
}