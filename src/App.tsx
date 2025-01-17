import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPages from './pages/LandingPages';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPages/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
