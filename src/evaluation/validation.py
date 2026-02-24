def validate_dataset(df):
    """
    Basic dataset sanity checks
    """

    required = ["datetime", "machineID", "failure"]

    missing = [c for c in required if c not in df.columns]
    if missing:
        raise ValueError(f"Missing columns: {missing}")

    if df.isnull().sum().sum() > 0:
        raise ValueError("Dataset contains null values")

    if not df["datetime"].is_monotonic_increasing:
        print("Warning: datetime not fully sorted")

    print("Dataset validation passed")