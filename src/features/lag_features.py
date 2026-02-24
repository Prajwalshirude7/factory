def add_lag_features(df, cols, lags=(1, 2, 3)):
    """
    Create lag features per machine
    Example: volt_lag1, volt_lag2
    """

    for col in cols:
        for lag in lags:
            df[f"{col}_lag{lag}"] = (
                df.groupby("machineID")[col].shift(lag)
            )

    return df