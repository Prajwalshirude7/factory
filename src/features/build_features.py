from .lag_features import add_lag_features
from .rolling_features import add_rolling_features
from .ema_features import add_ema_features

from src.config.paths import PROCESSED_DIR, FEATURE_STORE
import pandas as pd


def build_features(df):
    """
    Combine all feature engineering and save datasets
    """

    df = df.copy()

    sensor_cols = ["volt", "rotate", "pressure", "vibration"]

    # temporal features
    df = add_lag_features(df, sensor_cols)
    df = add_rolling_features(df, sensor_cols)
    df = add_ema_features(df, sensor_cols)

    # categorical encoding
    if "model" in df.columns:
        df = pd.get_dummies(df, columns=["model"], drop_first=True)

    df = df.dropna()

    # ⭐ SAVE PROCESSED DATASET
    processed_path = PROCESSED_DIR / "model_dataset.parquet"
    df.to_parquet(processed_path, index=False)
    print(f"Processed dataset saved → {processed_path}")

    # ⭐ SAVE FEATURE STORE
    feature_path = FEATURE_STORE / "features_v1.parquet"
    df.to_parquet(feature_path, index=False)
    print(f"Feature store saved → {feature_path}")

    return df