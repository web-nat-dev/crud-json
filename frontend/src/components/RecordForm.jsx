import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'



function RecordForm({ type, data }) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    id: data.id,
    name: data.name
  })

  const add = type === 'edit' || type === 'delete' ? `/${data.id}` : ''

  const { response, loading, error, trigger } = useFetch({
    url: `${import.meta.env.VITE_PROXY}${add}`,
    options: {
      method: type === 'edit' ? 'PUT' : type === 'delete' ? 'DELETE' : 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
  })

  const handleChanges = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    trigger()
  }

  useEffect(() => {
    if (response !== undefined) {
      navigate('/')
    }
  }, response)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" className="form-control" defaultValue={type === 'edit' ? data.id : ''} disabled={type === 'edit' ? true : false} onChange={handleChanges} />
        <input type="text" name="name" className="form-control" defaultValue={type === 'edit' ? data.name : ''} disabled={type === 'edit' ? false : true} onChange={handleChanges} />
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </>
  )
}



export default RecordForm