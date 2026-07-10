import { useSearchParams } from 'react-router-dom'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'

// Dummy chart data
function generateChartData(stationName) {
  const data = []
  const now  = new Date()

  // Past 6 hours
  for (let i = -6; i <= 0; i++) {
    const t = new Date(now.getTime() + i * 60 * 60 * 1000)
    data.push({
      time:   t.getHours() + ':00',
      actual: Math.floor(Math.random() * 800 + 400),
      type:   'actual'
    })
  }

  // Next 2 hours forecast
  for (let i = 1; i <= 2; i++) {
    const t = new Date(now.getTime() + i * 60 * 60 * 1000)
    data.push({
      time:     t.getHours() + ':00',
      forecast: Math.floor(Math.random() * 900 + 500),
      type:     'forecast'
    })
  }

  return data
}

function StationDetail() {
  const [params] = useSearchParams()
  const station  = params.get('name') || 'Andheri'
  const data     = generateChartData(station)

  return (
    <div style={{ padding: '24px' }}>

      {/* Header */}
      <h1 style={{ fontSize:'20px', marginBottom:'4px' }}>
        {station.replace(/_/g, ' ')}
      </h1>
      <p style={{ color:'#888', fontSize:'13px',
                  marginBottom:'24px' }}>
        Passenger flow history and forecast
      </p>

      {/* Chart */}
      <div style={{
        background:   '#ffffff',
        borderRadius: '8px',
        padding:      '24px',
        boxShadow:    '0 1px 3px rgba(0,0,0,0.08)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize:'15px', fontWeight:'600',
                     marginBottom:'16px' }}>
          Flow Chart — Last 6 Hours + Next 2 Hours
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3"
                           stroke="#f0f0f0" />
            <XAxis dataKey="time"
                   tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#2a78d6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Actual"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#eda100"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
              name="Forecast"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendation box */}
      <div style={{
        background:   '#fff3cd',
        border:       '1px solid #eda100',
        borderRadius: '8px',
        padding:      '16px 20px',
      }}>
        <h3 style={{ fontSize:'14px', fontWeight:'600',
                     color:'#c98500', marginBottom:'8px' }}>
          🤖 AI Recommendation
        </h3>
        <p style={{ fontSize:'14px', color:'#664d00' }}>
          Moderate crowd expected in the next hour.
          Consider increasing train frequency by 1.
          Deploy additional platform staff.
        </p>
      </div>
    </div>
  )
}

export default StationDetail