from sklearn.linear_model import LogisticRegression


def train_baseline(X, y):
    """
    Train Logistic Regression baseline model
    """

    model = LogisticRegression(
        max_iter=1000,
        class_weight="balanced"
    )

    model.fit(X, y)

    return model