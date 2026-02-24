from sklearn.model_selection import RandomizedSearchCV
from xgboost import XGBClassifier


def tune_xgb(X, y):
    """
    Hyperparameter tuning for XGBoost
    """

    param_grid = {
        "n_estimators": [200, 300, 400, 500],
        "max_depth": [4, 6, 8],
        "learning_rate": [0.01, 0.05, 0.1],
        "subsample": [0.7, 0.8, 1.0],
        "colsample_bytree": [0.7, 0.8, 1.0],
    }

    model = XGBClassifier(
        scale_pos_weight=10,
        random_state=42,
        n_jobs=-1,
        eval_metric="logloss"
    )

    search = RandomizedSearchCV(
        model,
        param_grid,
        n_iter=10,
        scoring="f1",
        cv=3,
        verbose=1,
        n_jobs=-1,
        random_state=42
    )

    search.fit(X, y)

    return search.best_estimator_