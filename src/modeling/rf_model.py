from sklearn.ensemble import RandomForestClassifier


def train_rf(X, y):
    """
    Train Random Forest model
    """

    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=None,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1
    )

    model.fit(X, y)

    return model