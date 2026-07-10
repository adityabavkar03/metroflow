const EVENTS = [
  {
    date:  '2021-08-22',
    name:  'Ganesh Chaturthi Day 1',
    mult:  2.3,
    type:  'festival',
    note:  'Major surge expected across all stations'
  },
  {
    date:  '2021-09-01',
    name:  'Ganesh Visarjan',
    mult:  2.8,
    type:  'festival',
    note:  'Highest surge of the year — deploy max resources'
  },
  {
    date:  '2021-11-03',
    name:  'Diwali Laxmi Pujan',
    mult:  2.2,
    type:  'festival',
    note:  'Heavy shopping and travel crowd expected'
  },
  {
    date:  '2021-04-15',
    name:  'IPL Match Day',
    mult:  1.4,
    type:  'cricket',
    note:  'Evening surge expected 6 PM onwards'
  },
  {
    date:  '2021-02-15',
    name:  'Bandh Day',
    mult:  0.15,
    type:  'bandh',
    note:  'Severe drop in ridership — reduce frequency'
  },
]

function Events() {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize:'20px', marginBottom:'4px' }}>
        Events Calendar
      </h1>
      <p style={{ color:'#888', fontSize:'13px',
                  marginBottom:'24px' }}>
        India-specific events that affect passenger flow
      </p>

      {/* Legend */}
      <div style={{ display:'flex', gap:'16px',
                    marginBottom:'20px' }}>
        <LegendItem color="#e24b4a" label="Festival" />
        <LegendItem color="#1baf7a" label="Cricket"  />
        <LegendItem color="#888888" label="Bandh"    />
      </div>

      {/* Events list */}
      {EVENTS.map(event => (
        <EventCard key={event.date} event={event} />
      ))}
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display:'flex', alignItems:'center',
                  gap:'6px' }}>
      <div style={{ width:'12px', height:'12px',
                    background:color,
                    borderRadius:'3px' }} />
      <span style={{ fontSize:'13px', color:'#666' }}>
        {label}
      </span>
    </div>
  )
}

function EventCard({ event }) {
  const typeColors = {
    festival: '#e24b4a',
    cricket:  '#1baf7a',
    bandh:    '#888888'
  }
  const color = typeColors[event.type]

  const multLabel = event.mult >= 1
    ? `+${Math.round((event.mult - 1) * 100)}% surge`
    : `${Math.round((1 - event.mult) * 100)}% drop`

  return (
    <div style={{
      background:   '#ffffff',
      borderLeft:   `4px solid ${color}`,
      borderRadius: '8px',
      padding:      '16px 20px',
      marginBottom: '12px',
      boxShadow:    '0 1px 3px rgba(0,0,0,0.08)',
      display:      'flex',
      alignItems:   'center',
      gap:          '16px'
    }}>
      {/* Date */}
      <div style={{
        background:   color + '18',
        color:        color,
        borderRadius: '6px',
        padding:      '8px 12px',
        textAlign:    'center',
        minWidth:     '80px'
      }}>
        <p style={{ fontSize:'20px', fontWeight:'700' }}>
          {event.date.split('-')[2]}
        </p>
        <p style={{ fontSize:'11px' }}>
          {new Date(event.date).toLocaleString(
            'en-IN', { month: 'short' })}
        </p>
      </div>

      {/* Event details */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize:'15px', fontWeight:'600',
                     marginBottom:'4px' }}>
          {event.name}
        </h3>
        <p style={{ fontSize:'13px', color:'#666' }}>
          {event.note}
        </p>
      </div>

      {/* Multiplier */}
      <div style={{
        background:   color + '18',
        color:        color,
        padding:      '6px 14px',
        borderRadius: '20px',
        fontSize:     '13px',
        fontWeight:   '600',
        whiteSpace:   'nowrap'
      }}>
        {multLabel}
      </div>
    </div>
  )
}

export default Events