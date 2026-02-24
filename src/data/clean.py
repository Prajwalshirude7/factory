from src.config.paths import INTERIM_DIR


def clean_data(df):
    """
    Clean merged Azure dataset and save interim version
    """

    # Make explicit copy (fixes SettingWithCopyWarning)
    df = df.copy()

    # Remove duplicates
    df = df.drop_duplicates()

    # Interpolate sensors per machine
    sensor_cols = ["volt", "rotate", "pressure", "vibration"]

    df.loc[:, sensor_cols] = (
        df.groupby("machineID")[sensor_cols]
        .transform(lambda x: x.interpolate())
    )

    # Replace deprecated fillna
    df = df.bfill().ffill()

    # Save interim dataset
    save_path = INTERIM_DIR / "cleaned_dataset.parquet"
    df.to_parquet(save_path, index=False)

    print(f"Interim dataset saved → {save_path}")

    return df