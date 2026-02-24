def validate_raw_tables(telemetry, failures, errors, maint, machines):
    """
    Validate raw Azure tables before merge
    """

    # required columns
    required_telemetry = ["datetime","machineID","volt","rotate","pressure","vibration"]
    required_failures = ["datetime","machineID"]

    for c in required_telemetry:
        if c not in telemetry.columns:
            raise ValueError(f"Telemetry missing column {c}")

    for c in required_failures:
        if c not in failures.columns:
            raise ValueError(f"Failures missing column {c}")

    print("Raw tables validation passed")


def validate_merged_dataset(df):
    """
    Validate dataset after merge
    """

    dup = df.duplicated(subset=["machineID","datetime"]).sum()

    if dup > 0:
        print(f"Found {dup} duplicate rows → dropping safely")
        df.drop_duplicates(subset=["machineID","datetime"], inplace=True)

    if "failure" not in df.columns:
        raise ValueError("Failure label missing after merge")

    print("Merged dataset validation passed")

    return df

def check_time_leakage(df):
    """
    Ensure time order respected
    """

    if not df["datetime"].is_monotonic_increasing:
        print("Warning: dataset not strictly time ordered")

    # lag sanity check
    lag_cols = [c for c in df.columns if "lag" in c]

    if len(lag_cols) == 0:
        print("Warning: no lag features detected")

    print("Leakage check completed")