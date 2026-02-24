from sklearn.metrics import (
    f1_score,
    recall_score,
    precision_score,
    classification_report,
    confusion_matrix
)


def evaluate_model(model, X, y):
    """
    Evaluate classification performance
    """

    preds = model.predict(X)

    print("Recall:", recall_score(y, preds))
    print("Precision:", precision_score(y, preds))
    print("F1:", f1_score(y, preds))

    print("\nClassification Report\n")
    print(classification_report(y, preds))

    print("\nConfusion Matrix\n")
    print(confusion_matrix(y, preds))