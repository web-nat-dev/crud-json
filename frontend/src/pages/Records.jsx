import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'



function Records() {
  const navigate = useNavigate()

  const { response, loading, error, trigger } = useFetch({
    url: import.meta.env.VITE_PROXY
  })

  function testClick() {
    trigger()
  }

  useEffect(() => {
    trigger()
  }, [])

  return (
    <>
      <h1>Records</h1>
      <ul>
        {response && response.length > 0 ? response.map((record, index) => (
          <li key={index}>
            <h6>ID: {record.id}</h6>
            <p>Name: {record.name}</p>
            <button className='btn btn-success' onClick={() => navigate('/edit-record/' + record.id)}>Edit this record</button>
          </li>
        )) : <h1>No records found.</h1>}
      </ul>
    </>
  )
}



export default Records