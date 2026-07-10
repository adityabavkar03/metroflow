import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar         from './components/Navbar'
import Dashboard      from './pages/Dashboard'
import Alerts         from './pages/Alerts'
import StationDetail  from './pages/StationDetail'
import Events         from './pages/Events'

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f4f5f7' }}>

        {/* Top navigation */}
        <Navbar />

        {/* Page content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            <Route path="/"        element={<Dashboard />}     />
            <Route path="/alerts"  element={<Alerts />}        />
            <Route path="/station" element={<StationDetail />} />
            <Route path="/events"  element={<Events />}        />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App