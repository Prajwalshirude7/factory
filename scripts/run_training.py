from src.pipeline.train_pipeline import run_training
from src.evaluation.metrics import evaluate_model
from src.explainability.shap_explainer import explain_model

model, X_test, y_test = run_training()

evaluate_model(model, X_test, y_test)
print("Training complete")


# Explain predictions
explain_model(model, X_test.head(200))



# python -m scripts.run_training
