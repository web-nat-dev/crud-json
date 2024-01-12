import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Records from './pages/Records'
import EditRecord from './pages/EditRecord'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Records />} />
          <Route path='/edit-record/:id' element={<EditRecord />} />
        </Routes>
      </Router>
    </>
  )
}



export default App