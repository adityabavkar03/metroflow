# MetroFlow — Saved Models

## XGBoost Model
- File: xgb_model.json
- Type: XGBRegressor
- Target: people_in (passenger count)
- Features: 25 features (see list below)
- MAE: (write your MAE value here)
- RMSE: (write your RMSE value here)

## LSTM Model
- File: lstm_model.keras
- Type: BiLSTM
- Sequence length: 8
- Target: people_in (scaled)
- MAE: (write your MAE value here)
- RMSE: (write your RMSE value here)

## Feature List (same order for both models)
1. hour
2. day_of_week
3. month
4. is_weekend
5. is_peak_hour
6. hour_sin
7. hour_cos
8. dow_sin
9. dow_cos
10. is_festival
11. festival_mult
12. is_cricket
13. is_bandh
14. is_monsoon
15. lag_1
16. lag_2
17. lag_3
18. lag_4
19. lag_8
20. lag_24
21. roll_mean_4
22. roll_mean_8
23. roll_mean_24
24. roll_std_4
25. roll_std_24

## How to Load Models

### XGBoost
import xgboost as xgb
model = xgb.XGBRegressor()
model.load_model('models/xgb_model.json')

### LSTM
from tensorflow.keras.models import load_model
model = load_model('models/lstm_model.keras')