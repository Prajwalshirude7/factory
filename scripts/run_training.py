from src.pipeline.train_pipeline import run_training
from src.evaluation.metrics import evaluate_model

model, X_test, y_test = run_training()

evaluate_model(model, X_test, y_test)

print("Training complete")