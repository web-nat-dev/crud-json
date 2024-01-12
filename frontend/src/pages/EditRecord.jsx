// import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


import RecordForm from '../components/RecordForm'



function EditRecord() {
  const { id } = useParams()

  // const { response, loading, error, trigger } = useFetch({
  //   url: import.meta.env.VITE_PROXY
  // })

  // function testClick() {
  //   trigger()
  // }

  // useEffect(() => {
  //   trigger()
  // }, [])

  return (
    <>
      <h1>Editing Record: {id}</h1>
      <RecordForm type={'edit'} data={{ id: id, name: 'Item '+id }} />
    </>
  )
}



export default EditRecord