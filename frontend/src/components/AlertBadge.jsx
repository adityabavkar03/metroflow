// AlertBadge - shows HIGH / MEDIUM / LOW badge

function AlertBadge({ level }) {
  const styles = {
    HIGH: {
      background: '#fde8e8',
      color:      '#e24b4a',
    },
    MEDIUM: {
      background: '#fef3cd',
      color:      '#c98500',
    },
    LOW: {
      background: '#e8f5e9',
      color:      '#0ca30c',
    }
  }

  const style = styles[level] || styles.LOW

  return (
    <span style={{
      ...style,
      padding:      '3px 10px',
      borderRadius: '12px',
      fontSize:     '12px',
      fontWeight:   '600',
    }}>
      {level}
    </span>
  )
}

export default AlertBadge