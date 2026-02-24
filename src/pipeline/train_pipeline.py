from src.data.validate import (
    validate_raw_tables,
    validate_merged_dataset,
    check_time_leakage
)
from src.data.ingest import load_all_data
from src.data.build_model_dataset import build_model_dataset
from src.data.clean import clean_data
from src.features.build_features import build_features

from src.modeling.imbalance import handle_imbalance
from src.modeling.xgb_model import train_xgb

from src.config.paths import RAW_DIR
from src.data.split import time_split
from src.evaluation.validation import validate_dataset

def run_training():
    """
    End-to-end Week-2 training pipeline
    """

    # 1️⃣ Load Azure tables
    telemetry, failures, errors, maint, machines = load_all_data()
    validate_raw_tables(telemetry, failures, errors, maint, machines)
    # 2️⃣ Build modeling dataset
    df = build_model_dataset(
        telemetry, failures, errors, maint, machines
    )
    df = validate_merged_dataset(df)
    # 3️⃣ Clean
    df = clean_data(df)

    # 4️⃣ Feature engineering
    df = build_features(df)
    validate_dataset(df)
    check_time_leakage(df)
    # 5️⃣ Split X y
    train_df, test_df = time_split(df)

    X_train = train_df.drop(["failure", "datetime"], axis=1)
    y_train = train_df["failure"]

    X_test = test_df.drop(["failure", "datetime"], axis=1)
    y_test = test_df["failure"]

    # 6️⃣ Handle imbalance
    X_train, y_train = handle_imbalance(X_train, y_train)

    # 7️⃣ Train main model
    model = train_xgb(X_train, y_train)

    return model, X_test, y_test