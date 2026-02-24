from imblearn.over_sampling import SMOTE


def handle_imbalance(X, y):
    """
    Apply SMOTE to handle rare failures
    """

    sm = SMOTE(random_state=42)

    X_res, y_res = sm.fit_resample(X, y)

    return X_res, y_res