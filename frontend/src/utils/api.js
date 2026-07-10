// MetroFlow API helper
// All API calls go through this file

const BASE_URL = 'http://localhost:8000'

// Get all stations list
export const getStations = async () => {
  const res = await fetch(`${BASE_URL}/stations`)
  return res.json()
}

// Get dashboard summary - all stations
export const getDashboardSummary = async () => {
  const res = await fetch(`${BASE_URL}/dashboard/summary`)
  return res.json()
}

// Get prediction for one station
export const getPrediction = async (station, horizon = 4) => {
  const res = await fetch(
    `${BASE_URL}/predict/${station}?horizon_slots=${horizon}`
  )
  return res.json()
}

// Get timeseries for one station
export const getTimeseries = async (station, hoursBack = 6) => {
  const res = await fetch(
    `${BASE_URL}/timeseries/${station}?hours_back=${hoursBack}`
  )
  return res.json()
}

// Get all active alerts
export const getAlerts = async () => {
  const res = await fetch(`${BASE_URL}/alerts`)
  return res.json()
}

// Get events calendar
export const getEvents = async () => {
  const res = await fetch(`${BASE_URL}/events`)
  return res.json()
}