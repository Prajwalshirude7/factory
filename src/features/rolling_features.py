def add_rolling_features(df, cols, window=5):
    """
    Rolling mean per machine
    """

    for col in cols:
        df[f"{col}_roll_mean"] = (
            df.groupby("machineID")[col]
            .rolling(window)
            .mean()
            .reset_index(level=0, drop=True)
        )

    return df