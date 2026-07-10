import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/',        label: 'Dashboard' },
    { path: '/alerts',  label: 'Alerts'    },
    { path: '/station', label: 'Stations'  },
    { path: '/events',  label: 'Events'    },
  ]

  return (
    <nav style={{
      background:    '#185FA5',
      padding:       '0 24px',
      display:       'flex',
      alignItems:    'center',
      gap:           '24px',
      height:        '56px',
      boxShadow:     '0 2px 8px rgba(0,0,0,0.15)'
    }}>

      {/* Logo */}
      <div style={{
        color:      '#ffffff',
        fontWeight: '700',
        fontSize:   '18px',
        marginRight:'16px'
      }}>
        🚇 MetroFlow
      </div>

      {/* Nav links */}
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          style={{
            color:          location.pathname === link.path
                              ? '#ffffff'
                              : 'rgba(255,255,255,0.7)',
            textDecoration: 'none',
            fontSize:       '14px',
            fontWeight:     location.pathname === link.path
                              ? '600'
                              : '400',
            borderBottom:   location.pathname === link.path
                              ? '2px solid #ffffff'
                              : '2px solid transparent',
            paddingBottom:  '4px',
          }}
        >
          {link.label}
        </Link>
      ))}

      {/* Live indicator */}
      <div style={{ marginLeft: 'auto', display: 'flex',
                    alignItems: 'center', gap: '6px' }}>
        <div style={{
          width:      '8px',
          height:     '8px',
          background: '#0ca30c',
          borderRadius: '50%',
          animation:  'pulse 2s infinite'
        }} />
        <span style={{ color: 'rgba(255,255,255,0.8)',
                       fontSize: '12px' }}>
          Live
        </span>
      </div>
    </nav>
  )
}

export default Navbar