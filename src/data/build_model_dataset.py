import pandas as pd


def build_model_dataset(telemetry, failures, errors, maint, machines):
    """
    Merge all Azure tables into one modeling dataset
    """

    # Start with telemetry (base table)
    df = telemetry.copy()

    # -------------------------------------------------
    # 1️⃣ Create failure label
    # -------------------------------------------------
    df["failure"] = 0

    fail_idx = failures[["machineID", "datetime"]].copy()
    fail_idx["failure"] = 1

    df = df.merge(
        fail_idx,
        on=["machineID", "datetime"],
        how="left",
        suffixes=("", "_f"),
    )

    df["failure"] = df["failure_f"].fillna(0)
    df.drop(columns=["failure_f"], inplace=True)

    # -------------------------------------------------
    # 2️⃣ Error feature (error count at timestamp)
    # -------------------------------------------------
    errors["error_flag"] = 1

    err = (
        errors.groupby(["machineID", "datetime"])["error_flag"]
        .sum()
        .reset_index()
    )

    df = df.merge(err, on=["machineID", "datetime"], how="left")
    df["error_flag"] = df["error_flag"].fillna(0)

    # -------------------------------------------------
    # 3️⃣ Maintenance feature
    # -------------------------------------------------
    maint["maint_flag"] = 1

    m = (
        maint.groupby(["machineID", "datetime"])["maint_flag"]
        .sum()
        .reset_index()
    )

    df = df.merge(m, on=["machineID", "datetime"], how="left")
    df["maint_flag"] = df["maint_flag"].fillna(0)

    # -------------------------------------------------
    # 4️⃣ Machine metadata
    # -------------------------------------------------
    df = df.merge(machines, on="machineID", how="left")

    return df