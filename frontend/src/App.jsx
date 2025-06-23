import React from 'react'
import Login from './pages/login'
import Signup from './pages/register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add dashboard and other protected routes here */}
      </Routes>
    </Router>
  )
}

export default App
