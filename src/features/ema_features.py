def add_ema_features(df, cols, span=5):
    """
    Exponential moving average per machine
    """

    for col in cols:
        df[f"{col}_ema"] = (
            df.groupby("machineID")[col]
            .apply(lambda x: x.ewm(span=span).mean())
            .reset_index(level=0, drop=True)
        )

    return df