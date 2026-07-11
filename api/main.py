"""
MetroFlow — FastAPI Backend
Author: Kavya Gharat
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import numpy as np
import random

app = FastAPI(title="MetroFlow API v1.0")

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Station master data ──────────────────────────────
STATIONS = {
    "Andheri":             {"capacity": 2200, "line": "L1"},
    "Ghatkopar":           {"capacity": 2100, "line": "L1"},
    "Versova":             {"capacity": 1600, "line": "L1"},
    "Borivali_E":          {"capacity": 1400, "line": "L2A"},
    "Dahisar_E":           {"capacity": 1350, "line": "L2A"},
    "Goregaon_E":          {"capacity": 1300, "line": "L2A"},
    "Kandivali_E":         {"capacity": 950,  "line": "L2A"},
    "Marol_Naka":          {"capacity": 900,  "line": "L1"},
    "Chakala":             {"capacity": 900,  "line": "L1"},
    "Andheri_E":           {"capacity": 1500, "line": "L7"},
    "Chakala_Intl_Airport":{"capacity": 1500, "line": "L7"},
    "Aarey":               {"capacity": 900,  "line": "L7"},
}

# ── Event calendar ───────────────────────────────────
EVENTS = {
    "2021-08-22": {"name": "Ganesh Chaturthi", "mult": 2.3},
    "2021-09-01": {"name": "Ganesh Visarjan",  "mult": 2.8},
    "2021-11-03": {"name": "Diwali",           "mult": 2.2},
    "2021-04-15": {"name": "IPL Match",        "mult": 1.4},
}


# ── Helper functions ─────────────────────────────────
def get_hour_profile(hour, is_weekend):
    if is_weekend:
        profile = {
            8:0.45, 9:0.60, 10:0.80, 11:0.90,
            12:0.85, 13:0.80, 17:0.85, 18:0.90,
            19:0.78
        }
    else:
        profile = {
            7:0.65, 8:1.00, 9:0.90, 10:0.55,
            17:0.90, 18:1.00, 19:0.85
        }
    return profile.get(hour, 0.30)


def generate_prediction(station_name, dt):
    info      = STATIONS.get(station_name,
                    {"capacity":800,"line":"L1"})
    capacity  = info["capacity"]
    hour      = dt.hour
    weekday   = dt.weekday()
    is_weekend= weekday >= 5
    dstr      = dt.strftime("%Y-%m-%d")

    # Base count
    hour_mult = get_hour_profile(hour, is_weekend)
    event     = EVENTS.get(dstr)
    evt_mult  = event["mult"] if event else 1.0
    noise     = random.gauss(0, 0.07)

    count = max(0, int(
        capacity * hour_mult * evt_mult * (1 + noise)
    ))

    cap_pct = round(count / capacity * 100, 1)

    # Alert level
    if cap_pct > 80 or evt_mult > 1.8:
        level = "HIGH"
        rec   = "🔴 Deploy extra trains immediately"
    elif cap_pct > 60 or evt_mult > 1.2:
        level = "MEDIUM"
        rec   = "🟡 Monitor closely — surge possible"
    else:
        level = "LOW"
        rec   = "🟢 Normal operations"

    return {
        "station":          station_name,
        "timestamp":        dt.isoformat(),
        "predicted_count":  count,
        "capacity_pct":     cap_pct,
        "alert_level":      level,
        "recommendation":   rec,
        "event":            event["name"] if event else None,
        "capacity":         capacity,
        "line":             info["line"],
    }


# ── API Endpoints ────────────────────────────────────

@app.get("/")
def root():
    return {
        "message": "MetroFlow API is running",
        "version": "1.0",
        "team":    "VIVA Institute 2026-27"
    }


@app.get("/stations")
def get_stations():
    return {"stations": list(STATIONS.keys())}


@app.get("/dashboard/summary")
def dashboard_summary():
    now       = datetime.now()
    results   = []
    high_list = []

    for name in STATIONS:
        pred = generate_prediction(name, now)
        results.append(pred)
        if pred["alert_level"] == "HIGH":
            high_list.append(name)

    total_pax = sum(r["predicted_count"] for r in results)
    avg_cap   = round(
        sum(r["capacity_pct"] for r in results) /
        len(results), 1)

    return {
        "generated_at":      now.isoformat(),
        "station_forecasts": results,
        "network_stats": {
            "total_stations":    len(STATIONS),
            "high_alert_count":  len(high_list),
            "high_alert_stations": high_list,
            "avg_capacity_pct":  avg_cap,
            "total_predicted_pax": total_pax,
        }
    }


@app.get("/predict/{station}")
def predict_station(station: str, horizon_slots: int = 4):
    if station not in STATIONS:
        return {"error": f"Station '{station}' not found"}

    now       = datetime.now()
    forecasts = []

    for i in range(1, horizon_slots + 1):
        dt   = now + timedelta(minutes=15 * i)
        pred = generate_prediction(station, dt)
        forecasts.append(pred)

    return {
        "station":      station,
        "generated_at": now.isoformat(),
        "forecasts":    forecasts,
    }


@app.get("/timeseries/{station}")
def timeseries(station: str, hours_back: int = 6):
    if station not in STATIONS:
        return {"error": "Station not found"}

    now     = datetime.now()
    history = []
    forecast= []

    # Past hours
    for i in range(hours_back, 0, -1):
        dt   = now - timedelta(hours=i)
        pred = generate_prediction(station, dt)
        history.append({
            "timestamp": dt.isoformat(),
            "count":     pred["predicted_count"],
            "type":      "actual"
        })

    # Next 2 hours
    for i in range(1, 3):
        dt   = now + timedelta(hours=i)
        pred = generate_prediction(station, dt)
        forecast.append({
            "timestamp":  dt.isoformat(),
            "count":      pred["predicted_count"],
            "surge_prob": round(pred["capacity_pct"]/100, 2),
            "type":       "forecast"
        })

    return {
        "station":  station,
        "history":  history,
        "forecast": forecast,
    }


@app.get("/alerts")
def get_alerts():
    now    = datetime.now()
    alerts = []

    for name in STATIONS:
        pred = generate_prediction(name, now)
        if pred["alert_level"] in ["HIGH", "MEDIUM"]:
            alerts.append(pred)

    alerts.sort(
        key=lambda x: x["capacity_pct"],
        reverse=True
    )

    return {
        "generated_at": now.isoformat(),
        "alerts":       alerts,
        "count":        len(alerts),
    }


@app.get("/events")
def get_events():
    return {"events": EVENTS}