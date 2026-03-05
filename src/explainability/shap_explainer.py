import shap
import matplotlib.pyplot as plt


def explain_model(model, X_sample):
    """
    Generates SHAP explanations for model predictions.
    """

    # Create SHAP explainer
    explainer = shap.TreeExplainer(model)

    shap_values = explainer.shap_values(X_sample)

    print("SHAP values calculated successfully")

    # Global feature importance
    shap.summary_plot(shap_values, X_sample)

    # Local explanation (first prediction)
    shap.initjs()
    shap.force_plot(
        explainer.expected_value,
        shap_values[0],
        X_sample.iloc[0]
    )

    return shap_values