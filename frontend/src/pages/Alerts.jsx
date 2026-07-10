import AlertBadge from '../components/AlertBadge'

const DUMMY_ALERTS = [
  {
    station:     'Andheri',
    count:       1850,
    capacity:    2200,
    alertLevel:  'HIGH',
    surgePct:    84,
    recommendation: 'Deploy 2 extra trains immediately'
  },
  {
    station:     'Kandivali_E',
    count:       850,
    capacity:    950,
    alertLevel:  'HIGH',
    surgePct:    89,
    recommendation: 'Deploy extra trains immediately'
  },
  {
    station:     'Andheri_E',
    count:       1100,
    capacity:    1500,
    alertLevel:  'HIGH',
    surgePct:    73,
    recommendation: 'Deploy 1 extra train'
  },
  {
    station:     'Ghatkopar',
    count:       1200,
    capacity:    2100,
    alertLevel:  'MEDIUM',
    surgePct:    57,
    recommendation: 'Monitor closely'
  },
  {
    station:     'Borivali_E',
    count:       980,
    capacity:    1400,
    alertLevel:  'MEDIUM',
    surgePct:    70,
    recommendation: 'Increase frequency by 1'
  },
]

function Alerts() {
  const high   = DUMMY_ALERTS.filter(a => a.alertLevel === 'HIGH')
  const medium = DUMMY_ALERTS.filter(a => a.alertLevel === 'MEDIUM')

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize:'20px', marginBottom:'4px' }}>
        Active Alerts
      </h1>
      <p style={{ color:'#888', fontSize:'13px',
                  marginBottom:'24px' }}>
        Stations requiring immediate attention
      </p>

      {/* High alerts */}
      <h2 style={{ fontSize:'14px', fontWeight:'600',
                   color:'#e24b4a', marginBottom:'12px',
                   textTransform:'uppercase',
                   letterSpacing:'0.05em' }}>
        🔴 High Alerts ({high.length})
      </h2>

      <div style={{ marginBottom: '24px' }}>
        {high.map(a => (
          <AlertRow key={a.station} alert={a} />
        ))}
      </div>

      {/* Medium alerts */}
      <h2 style={{ fontSize:'14px', fontWeight:'600',
                   color:'#eda100', marginBottom:'12px',
                   textTransform:'uppercase',
                   letterSpacing:'0.05em' }}>
        🟡 Medium Alerts ({medium.length})
      </h2>

      <div>
        {medium.map(a => (
          <AlertRow key={a.station} alert={a} />
        ))}
      </div>
    </div>
  )
}

function AlertRow({ alert }) {
  const borderColor = alert.alertLevel === 'HIGH'
    ? '#e24b4a' : '#eda100'

  return (
    <div style={{
      background:   '#ffffff',
      borderLeft:   `4px solid ${borderColor}`,
      borderRadius: '8px',
      padding:      '16px 20px',
      marginBottom: '10px',
      boxShadow:    '0 1px 3px rgba(0,0,0,0.08)',
      display:      'flex',
      alignItems:   'center',
      gap:          '16px'
    }}>
      {/* Station name */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600',
                     marginBottom:'4px' }}>
          {alert.station.replace(/_/g, ' ')}
        </h3>
        <p style={{ fontSize:'13px', color:'#666' }}>
          {alert.recommendation}
        </p>
      </div>

      {/* Stats */}
      <div style={{ textAlign:'center', minWidth:'80px' }}>
        <p style={{ fontSize:'20px', fontWeight:'700' }}>
          {alert.surgePct}%
        </p>
        <p style={{ fontSize:'11px', color:'#888' }}>
          capacity
        </p>
      </div>

      {/* Count */}
      <div style={{ textAlign:'center', minWidth:'80px' }}>
        <p style={{ fontSize:'20px', fontWeight:'700' }}>
          {alert.count.toLocaleString()}
        </p>
        <p style={{ fontSize:'11px', color:'#888' }}>
          passengers
        </p>
      </div>

      {/* Badge */}
      <AlertBadge level={alert.alertLevel} />
    </div>
  )
}

export default Alerts