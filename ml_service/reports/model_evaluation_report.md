# RoomNest PG Rent Model Evaluation Report

**Model Version:** v1.2.0-HistGradientBoosting
**Best Performing Model:** HistGradientBoosting
**Holdout MAE:** INR 3872.55 | **RMSE:** INR 5101.63 | **R²:** -0.0462
**Improvement over Locality+Room Baseline:** -4.08%

### Benchmark Comparison

| Model | MAE (INR) | RMSE (INR) | R² |
|---|---|---|---|
| Baseline_Median | ₹3720.64 | ₹5099.19 | -0.0452 |
| Ridge | ₹3821.66 | ₹5009.14 | -0.0086 |
| HistGradientBoosting | ₹3872.55 | ₹5101.63 | -0.0462 |
| RandomForest | ₹3814.17 | ₹5008.4 | -0.0083 |

### Data Provenance Caveat
> Demonstration / prototype synthetic data. Not verified live market inventory. Accuracy claims apply strictly to experimental test holdout.
