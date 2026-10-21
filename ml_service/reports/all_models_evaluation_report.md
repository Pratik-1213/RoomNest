# RoomNest AI/ML Suite: Data Visualization (DV) Comprehensive Evaluation Report

Evaluation results for the 4 production machine learning models trained on 100,000 augmented Pune records:

| Model # | Model Name | Algorithm | Primary Metrics | 5-Fold Cross-Validation | Training Samples |
|---|---|---|---|---|---|
| **1** | PG Monthly Rent Regression | `HistGradientBoostingRegressor` | R²: **0.9903**, MAE: **₹277.62**, MAPE: **2.17%** | 0.988 ± 0.0009 | 20,000 |
| **2** | Roommate Compatibility & Harmony Scoring | `RandomForestRegressor` | R²: **0.9331**, MAE: **2.92%**, Pearson r: **0.9667** | 0.9234 ± 0.0045 | 20,000 |
| **3** | Booking Conversion & Lead Propensity | `GradientBoostingClassifier` | Accuracy: **99.8%**, ROC-AUC: **1.0**, F1: **0.9984** | AUC: 0.9988 | 20,000 |
| **4** | PG Quality & Maintenance Risk Predictor | `RandomForestClassifier` | Accuracy: **85.0%**, ROC-AUC: **0.9178**, F1: **0.8466** | AUC: 0.909 | 20,000 |


All models serialized to `ml_service/models/` and evaluation matrices ready for interactive Data Visualization.
