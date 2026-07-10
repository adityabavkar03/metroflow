import { useState, useEffect } from 'react'
import StationCard from '../components/StationCard'
import { useNavigate } from 'react-router-dom'

// Dummy data for now - will replace with API later
const DUMMY_STATIONS = [
  { station:'Andheri',      count:1850, capacity:2200, alertLevel:'HIGH'   },
  { station:'Ghatkopar',    count:1200, capacity:2100, alertLevel:'MEDIUM' },
  { station:'Versova',      count:650,  capacity:1600, alertLevel:'LOW'    },
  { station:'Borivali_E',   count:980,  capacity:1400, alertLevel:'MEDIUM' },
  { station:'Goregaon_E',   count:720,  capacity:1300, alertLevel:'MEDIUM' },
  { station:'Dahisar_E',    count:430,  capacity:1350, alertLevel:'LOW'    },
  { station:'Kandivali_E',  count:850,  capacity:950,  alertLevel:'HIGH'   },
  { station:'Marol_Naka',   count:400,  capacity:900,  alertLevel:'LOW'    },
  { station:'Chakala',      count:550,  capacity:900,  alertLevel:'MEDIUM' },
  { station:'Andheri_E',    count:1100, capacity:1500, alertLevel:'HIGH'   },
  { station:'Airport_Road', count:780,  capacity:950,  alertLevel:'MEDIUM' },
  { station:'Aarey',        count:320,  capacity:900,  alertLevel:'LOW'    },
]

function Dashboard() {
  const navigate  = useNavigate()
  const [stations, setStations] = useState(DUMMY_STATIONS)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Count alerts
  const highCount   = stations.filter(s => s.alertLevel === 'HIGH').length
  const mediumCount = stations.filter(s => s.alertLevel === 'MEDIUM').length
  const totalPax    = stations.reduce((sum, s) => sum + s.count, 0)

  // Auto refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
      // Later: fetch from API here
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ padding: '24px' }}>

      {/* Page title */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '20px', marginBottom: '4px' }}>
          Live Dashboard
        </h1>
        <p style={{ color: '#888', fontSize: '13px' }}>
          Last updated: {lastUpdate.toLocaleTimeString('en-IN')}
          &nbsp;·&nbsp; Auto refreshes every 60 seconds
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap:                 '16px',
        marginBottom:        '24px'
      }}>
        {/* KPI 1 */}
        <div style={{
          background: '#ffffff', padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          <p style={{ fontSize:'12px', color:'#888',
                      marginBottom:'8px' }}>
            Total Stations
          </p>
          <p style={{ fontSize:'28px', fontWeight:'700' }}>
            {stations.length}
          </p>
        </div>

        {/* KPI 2 */}
        <div style={{
          background: '#ffffff', padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          <p style={{ fontSize:'12px', color:'#888',
                      marginBottom:'8px' }}>
            High Alerts
          </p>
          <p style={{ fontSize:'28px', fontWeight:'700',
                      color:'#e24b4a' }}>
            {highCount}
          </p>
        </div>

        {/* KPI 3 */}
        <div style={{
          background: '#ffffff', padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          <p style={{ fontSize:'12px', color:'#888',
                      marginBottom:'8px' }}>
            Medium Alerts
          </p>
          <p style={{ fontSize:'28px', fontWeight:'700',
                      color:'#eda100' }}>
            {mediumCount}
          </p>
        </div>

        {/* KPI 4 */}
        <div style={{
          background: '#ffffff', padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }}>
          <p style={{ fontSize:'12px', color:'#888',
                      marginBottom:'8px' }}>
            Total Passengers
          </p>
          <p style={{ fontSize:'28px', fontWeight:'700' }}>
            {totalPax.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Station Grid */}
      <h2 style={{ fontSize:'15px', fontWeight:'600',
                   marginBottom:'12px', color:'#444' }}>
        STATION WISE CROWD LEVEL
      </h2>
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap:                 '12px'
      }}>
        {stations.map(s => (
          <StationCard
            key={s.station}
            station={s.station}
            count={s.count}
            capacity={s.capacity}
            alertLevel={s.alertLevel}
            onClick={() =>
              navigate(`/station?name=${s.station}`)}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
