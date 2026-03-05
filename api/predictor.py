import joblib
import pandas as pd

model = joblib.load("models/model.pkl")

# Feature list used during training
MODEL_FEATURES = [
'machineID','volt','rotate','pressure','vibration','error_flag','maint_flag','age',
'volt_lag1','volt_lag2','volt_lag3',
'rotate_lag1','rotate_lag2','rotate_lag3',
'pressure_lag1','pressure_lag2','pressure_lag3',
'vibration_lag1','vibration_lag2','vibration_lag3',
'volt_roll_mean','rotate_roll_mean','pressure_roll_mean','vibration_roll_mean',
'volt_ema','rotate_ema','pressure_ema','vibration_ema',
'model_model2','model_model3','model_model4'
]

def predict_failure(data):

    # convert request to dataframe
    df = pd.DataFrame([data])

    # create missing features
    for col in MODEL_FEATURES:
        if col not in df.columns:
            df[col] = 0

    # reorder columns exactly like training
    df = df[MODEL_FEATURES]

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return int(prediction), float(probability)