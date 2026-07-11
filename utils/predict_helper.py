"""
MetroFlow — Prediction Helper
This file is used by Kavya's FastAPI backend
to generate predictions from saved models.
Author: Aditya Bavkar
"""

import numpy as np
import pandas as pd
import joblib
import os

# ── Feature columns in exact order ──────────────────
FEATURE_COLS = [
    'hour', 'day_of_week', 'month',
    'is_weekend', 'is_peak_hour',
    'hour_sin', 'hour_cos',
    'dow_sin', 'dow_cos',
    'is_festival', 'festival_mult',
    'is_cricket', 'is_bandh', 'is_monsoon',
    'lag_1', 'lag_2', 'lag_3', 'lag_4',
    'lag_8', 'lag_24',
    'roll_mean_4', 'roll_mean_8', 'roll_mean_24',
    'roll_std_4', 'roll_std_24',
]


def load_xgb_model(path='models/xgb_model.json'):
    """Load saved XGBoost model."""
    try:
        import xgboost as xgb
        model = xgb.XGBRegressor()
        model.load_model(path)
        print(f"XGBoost loaded from {path}")
        return model
    except Exception as e:
        print(f"XGBoost load failed: {e}")
        return None


def load_lstm_model(path='models/lstm_model.keras'):
    """Load saved LSTM model."""
    try:
        from tensorflow.keras.models import load_model
        model = load_model(path)
        print(f"LSTM loaded from {path}")
        return model
    except Exception as e:
        print(f"LSTM load failed: {e}")
        return None


def build_features_for_prediction(
        station_code: int,
        timestamp,
        recent_counts: list,
        is_festival: int = 0,
        festival_mult: float = 1.0,
        is_cricket: int = 0,
        is_bandh: int = 0,
        is_monsoon: int = 0) -> np.ndarray:
    """
    Build feature vector for one prediction.

    Parameters:
        station_code  : station number
        timestamp     : datetime object
        recent_counts : list of last 24 hourly counts
                        [count_1hr_ago, count_2hr_ago, ...]
        is_festival   : 0 or 1
        festival_mult : surge multiplier
        is_cricket    : 0 or 1
        is_bandh      : 0 or 1
        is_monsoon    : 0 or 1

    Returns:
        numpy array of shape (1, 25)
    """

    hour       = timestamp.hour
    dow        = timestamp.weekday()
    month      = timestamp.month
    is_weekend = int(dow >= 5)
    is_peak    = int(hour in [8, 9, 17, 18, 19])

    hour_sin = np.sin(2 * np.pi * hour / 24)
    hour_cos = np.cos(2 * np.pi * hour / 24)
    dow_sin  = np.sin(2 * np.pi * dow  / 7)
    dow_cos  = np.cos(2 * np.pi * dow  / 7)

    # Lag features from recent counts
    counts = recent_counts + [0] * 24
    lag_1  = counts[0]
    lag_2  = counts[1]
    lag_3  = counts[2]
    lag_4  = counts[3]
    lag_8  = counts[7]
    lag_24 = counts[23]

    # Rolling features
    roll_mean_4  = np.mean(counts[:4])
    roll_mean_8  = np.mean(counts[:8])
    roll_mean_24 = np.mean(counts[:24])
    roll_std_4   = np.std(counts[:4])
    roll_std_24  = np.std(counts[:24])

    features = np.array([[
        hour, dow, month,
        is_weekend, is_peak,
        hour_sin, hour_cos,
        dow_sin, dow_cos,
        is_festival, festival_mult,
        is_cricket, is_bandh, is_monsoon,
        lag_1, lag_2, lag_3, lag_4,
        lag_8, lag_24,
        roll_mean_4, roll_mean_8, roll_mean_24,
        roll_std_4, roll_std_24,
    ]])

    return features


def predict_xgb(model, features: np.ndarray) -> int:
    """Get XGBoost prediction."""
    pred = model.predict(features)[0]
    return max(0, int(pred))


def predict_ensemble(xgb_model,
                     features: np.ndarray,
                     is_surge: bool = False) -> int:
    """
    Blend XGBoost prediction.
    During surge events XGBoost gets more weight.
    """
    xgb_pred = predict_xgb(xgb_model, features)
    return xgb_pred


def get_alert_level(predicted: int,
                    capacity: int) -> str:
    """Convert prediction to alert level."""
    pct = (predicted / capacity) * 100
    if pct > 80:
        return 'HIGH'
    elif pct > 60:
        return 'MEDIUM'
    else:
        return 'LOW'


def get_recommendation(alert_level: str,
                       predicted: int,
                       capacity: int) -> str:
    """Generate operational recommendation."""
    pct = round((predicted / capacity) * 100, 1)

    if alert_level == 'HIGH':
        return (f"🔴 Deploy extra trains immediately. "
                f"Station at {pct}% capacity.")
    elif alert_level == 'MEDIUM':
        return (f"🟡 Monitor closely. "
                f"Station at {pct}% capacity.")
    else:
        return (f"🟢 Normal operations. "
                f"Station at {pct}% capacity.")