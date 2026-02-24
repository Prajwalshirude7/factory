from pathlib import Path

# Base project folder
BASE_DIR = Path(__file__).resolve().parents[2]

# Raw dataset folder (Azure CSVs)
RAW_DIR = BASE_DIR / "data" / "raw" / "Microsoft Azure Predictive Maintenance"

# Processed data
INTERIM_DIR = BASE_DIR / "data" / "interim"
PROCESSED_DIR = BASE_DIR / "data" / "processed"
FEATURE_STORE = BASE_DIR / "data" / "feature_store"

# Models
MODEL_DIR = BASE_DIR / "models"

# Create folders if not exist
for p in [INTERIM_DIR, PROCESSED_DIR, FEATURE_STORE, MODEL_DIR]:
    p.mkdir(parents=True, exist_ok=True)