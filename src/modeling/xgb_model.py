from xgboost import XGBClassifier


def train_xgb(X, y):
    """
    Train XGBoost production model
    """

    model = XGBClassifier(
        n_estimators=400,
        max_depth=6,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        scale_pos_weight=10,  # helps imbalance
        random_state=42,
        n_jobs=-1,
        eval_metric="logloss"
    )

    model.fit(X, y)

    return model