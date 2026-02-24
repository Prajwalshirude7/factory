import pandas as pd
from src.config.paths import RAW_DIR


def load_all_data():
    """
    Load all Azure Predictive Maintenance tables
    """

    telemetry = pd.read_csv(RAW_DIR / "PdM_telemetry.csv")
    failures = pd.read_csv(RAW_DIR / "PdM_failures.csv")
    errors = pd.read_csv(RAW_DIR / "PdM_errors.csv")
    maint = pd.read_csv(RAW_DIR / "PdM_maint.csv")
    machines = pd.read_csv(RAW_DIR / "PdM_machines.csv")

    # convert datetime columns
    telemetry["datetime"] = pd.to_datetime(telemetry["datetime"])
    failures["datetime"] = pd.to_datetime(failures["datetime"])
    errors["datetime"] = pd.to_datetime(errors["datetime"])
    maint["datetime"] = pd.to_datetime(maint["datetime"])

    return telemetry, failures, errors, maint, machines