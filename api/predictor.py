import joblib
import pandas as pd

# Load trained model
model = joblib.load("models/model.pkl")


def predict_failure(data):
    """
    Predict machine failure from sensor data.
    """

    df = pd.DataFrame([data])

    prediction = model.predict(df)[0]

    probability = model.predict_proba(df)[0][1]

    return int(prediction), float(probability)