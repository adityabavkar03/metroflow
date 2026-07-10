// StationCard Component
// Shows one station with crowd level color coding

function StationCard({ station, count, capacity, alertLevel, onClick }) {

  // Color based on alert level
  const colors = {
    HIGH:   '#e24b4a',
    MEDIUM: '#eda100',
    LOW:    '#0ca30c'
  }

  const color = colors[alertLevel] || '#0ca30c'
  const pct   = Math.round((count / capacity) * 100)

  return (
    <div
      onClick={onClick}
      style={{
        borderLeft:    `4px solid ${color}`,
        padding:       '16px',
        borderRadius:  '8px',
        background:    '#ffffff',
        cursor:        'pointer',
        boxShadow:     '0 1px 3px rgba(0,0,0,0.08)',
        transition:    'transform 0.15s',
      }}
      onMouseEnter={e =>
        e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e =>
        e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Station name */}
      <h3 style={{
        fontSize:     '14px',
        fontWeight:   '600',
        marginBottom: '4px',
        color:        '#1a1a1a'
      }}>
        {station.replace(/_/g, ' ')}
      </h3>

      {/* Passenger count */}
      <p style={{
        fontSize: '13px',
        color:    '#666',
        margin:   '4px 0'
      }}>
        {count.toLocaleString()} passengers
      </p>

      {/* Capacity bar */}
      <div style={{
        background:   '#e0e0e0',
        height:       '5px',
        borderRadius: '3px',
        margin:       '10px 0 6px'
      }}>
        <div style={{
          width:        `${Math.min(pct, 100)}%`,
          height:       '5px',
          background:   color,
          borderRadius: '3px',
          transition:   'width 0.5s'
        }} />
      </div>

      {/* Alert badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{
          fontSize:    '11px',
          fontWeight:  '600',
          color:       color,
          background:  color + '18',
          padding:     '2px 8px',
          borderRadius:'10px'
        }}>
          {alertLevel}
        </span>
        <span style={{ fontSize: '11px', color: '#888' }}>
          {pct}% capacity
        </span>
      </div>
    </div>
  )
}

export default StationCard