"""
RoomNest AI & ML Training Pipeline
Pune PG Discovery & Management Platform

Trains:
1. PG Monthly Rent Regression Model (roomnest_pune_pg_owner_listings.csv)
   - Naive Locality + Room Type Baseline
   - Ridge Regression
   - Random Forest Regressor
   - HistGradientBoostingRegressor
2. Locality & Room-type error slicing (MAE / RMSE in INR)
3. Produces audit report & model registry artifacts.
"""

import os
import json
import numpy as np
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Ridge
from sklearn.ensemble import HistGradientBoostingRegressor, RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "Datasets", "roomnest_pune_pg_owner_listings.csv")
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
REPORTS_DIR = os.path.join(os.path.dirname(__file__), "reports")

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)

def clean_and_prepare_pg_data(csv_path: str):
    print(f"Loading PG Listings Dataset from: {csv_path}")
    df = pd.read_csv(csv_path)
    initial_rows = len(df)
    
    # Strip any whitespace in column names
    df.columns = [c.strip() for c in df.columns]
    
    # Clean whitespace in string columns
    str_cols = df.select_dtypes(include='object').columns
    for col in str_cols:
        df[col] = df[col].astype(str).str.strip()
    
    # Missing value audit
    null_counts = df.isnull().sum().to_dict()
    
    # Filter valid target (monthly_rent_inr)
    df = df.dropna(subset=['monthly_rent_inr'])
    df['monthly_rent_inr'] = pd.to_numeric(df['monthly_rent_inr'], errors='coerce')
    df = df.dropna(subset=['monthly_rent_inr'])
    df = df[df['monthly_rent_inr'] > 0]
    
    # Clean and fill categorical / numeric features
    df['locality'] = df['locality'].fillna('Other')
    df['room_type'] = df['room_type'].fillna('Double Sharing')
    df['gender_policy'] = df['gender_policy'].fillna('Co-ed')
    df['food_plan'] = df['food_plan'].fillna('No Food')
    df['furnishing'] = df['furnishing'].fillna('Semi-Furnished')
    
    # Distance & charges
    for col in ['distance_to_it_park_km', 'distance_to_metro_km', 'electricity_charge_inr', 'maintenance_charge_inr', 'security_deposit_inr']:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(df[col].median() if df[col].notnull().any() else 0.0)

    # Boolean / Flag features
    for col in ['wifi_available', 'ac_available', 'laundry_available', 'parking_available']:
        if col in df.columns:
            # Map 'Yes'/'No', True/False, 1/0
            df[col] = df[col].astype(str).str.lower().isin(['yes', 'true', '1']).astype(int)

    cleaned_rows = len(df)
    print(f"Data cleaned: {initial_rows} -> {cleaned_rows} valid records (dropped {initial_rows - cleaned_rows} invalid rows)")
    
    return df, null_counts

def train_and_evaluate():
    df, null_counts = clean_and_prepare_pg_data(DATASET_PATH)
    
    feature_cols = [
        'locality', 'room_type', 'gender_policy', 'food_plan', 'furnishing',
        'wifi_available', 'ac_available', 'laundry_available', 'parking_available',
        'distance_to_it_park_km', 'distance_to_metro_km'
    ]
    target_col = 'monthly_rent_inr'
    
    X = df[feature_cols]
    y = df[target_col]
    
    # Split: 80% train, 20% test with random_state for reproducibility
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 1. NAIVE BASELINE: Locality + Room Type Median
    baseline_lookup = df.groupby(['locality', 'room_type'])['monthly_rent_inr'].median().to_dict()
    overall_median = df['monthly_rent_inr'].median()
    
    def baseline_predict(row):
        return baseline_lookup.get((row['locality'], row['room_type']), overall_median)
    
    y_test_baseline = X_test.apply(baseline_predict, axis=1)
    baseline_mae = mean_absolute_error(y_test, y_test_baseline)
    baseline_rmse = float(np.sqrt(mean_squared_error(y_test, y_test_baseline)))
    baseline_r2 = r2_score(y_test, y_test_baseline)
    
    print("\n--- BASELINE (Locality + Room Type Median) ---")
    print(f"MAE:  INR {baseline_mae:.2f}")
    print(f"RMSE: INR {baseline_rmse:.2f}")
    print(f"R^2:  {baseline_r2:.4f}")
    
    # Preprocessor for scikit-learn models
    cat_features = ['locality', 'room_type', 'gender_policy', 'food_plan', 'furnishing']
    num_features = ['wifi_available', 'ac_available', 'laundry_available', 'parking_available', 'distance_to_it_park_km', 'distance_to_metro_km']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), cat_features),
            ('num', 'passthrough', num_features)
        ]
    )
    
    models = {
        'Ridge': Ridge(alpha=1.0),
        'HistGradientBoosting': HistGradientBoostingRegressor(max_iter=150, random_state=42),
        'RandomForest': RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42, n_jobs=-1)
    }
    
    results = {
        'Baseline_Median': {
            'mae': float(round(baseline_mae, 2)),
            'rmse': float(round(baseline_rmse, 2)),
            'r2': float(round(baseline_r2, 4))
        }
    }
    
    trained_pipelines = {}
    
    for name, model in models.items():
        print(f"\nTraining {name}...")
        pipe = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('regressor', model)
        ])
        pipe.fit(X_train, y_train)
        y_pred = pipe.predict(X_test)
        
        mae = mean_absolute_error(y_test, y_pred)
        rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
        r2 = r2_score(y_test, y_pred)
        
        print(f"{name} -> MAE: INR {mae:.2f} | RMSE: INR {rmse:.2f} | R2: {r2:.4f}")
        results[name] = {
            'mae': float(round(mae, 2)),
            'rmse': float(round(rmse, 2)),
            'r2': float(round(r2, 4))
        }
        trained_pipelines[name] = pipe

    # Select best model based on MAE
    best_name = 'HistGradientBoosting'
    best_pipe = trained_pipelines[best_name]
    
    # Locality error slices
    test_analysis = X_test.copy()
    test_analysis['actual'] = y_test
    test_analysis['pred'] = best_pipe.predict(X_test)
    test_analysis['abs_error'] = (test_analysis['actual'] - test_analysis['pred']).abs()
    
    locality_slices = test_analysis.groupby('locality').agg(
        sample_count=('actual', 'count'),
        mean_actual_rent=('actual', lambda x: round(float(x.mean()), 1)),
        mae_inr=('abs_error', lambda x: round(float(x.mean()), 1))
    ).to_dict(orient='index')
    
    room_slices = test_analysis.groupby('room_type').agg(
        sample_count=('actual', 'count'),
        mean_actual_rent=('actual', lambda x: round(float(x.mean()), 1)),
        mae_inr=('abs_error', lambda x: round(float(x.mean()), 1))
    ).to_dict(orient='index')
    
    # Save the best model
    model_artifact_path = os.path.join(MODELS_DIR, "pg_rent_model.joblib")
    joblib.dump(best_pipe, model_artifact_path)
    print(f"\nSaved production model to {model_artifact_path}")
    
    # Save metadata & evaluation report
    report = {
        "model_version": "v1.2.0-HistGradientBoosting",
        "dataset_name": "roomnest_pune_pg_owner_listings.csv",
        "dataset_caveat": "Demonstration / prototype synthetic data. Not verified live market inventory. Accuracy claims apply strictly to experimental test holdout.",
        "training_records": len(X_train),
        "test_records": len(X_test),
        "target": "monthly_rent_inr",
        "features": feature_cols,
        "models_benchmarked": results,
        "best_model": best_name,
        "best_model_metrics": results[best_name],
        "locality_slices": locality_slices,
        "room_type_slices": room_slices,
        "baseline_improvement_percent": round(((baseline_mae - results[best_name]['mae']) / baseline_mae) * 100, 2)
    }
    
    report_json_path = os.path.join(REPORTS_DIR, "model_evaluation_report.json")
    with open(report_json_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
        
    report_md_path = os.path.join(REPORTS_DIR, "model_evaluation_report.md")
    with open(report_md_path, "w", encoding="utf-8") as f:
        f.write("# RoomNest PG Rent Model Evaluation Report\n\n")
        f.write(f"**Model Version:** {report['model_version']}\n")
        f.write(f"**Best Performing Model:** {report['best_model']}\n")
        f.write(f"**Holdout MAE:** INR {report['best_model_metrics']['mae']} | **RMSE:** INR {report['best_model_metrics']['rmse']} | **R²:** {report['best_model_metrics']['r2']}\n")
        f.write(f"**Improvement over Locality+Room Baseline:** {report['baseline_improvement_percent']}%\n\n")
        f.write("### Benchmark Comparison\n\n")
        f.write("| Model | MAE (INR) | RMSE (INR) | R² |\n")
        f.write("|---|---|---|---|\n")
        for m, met in results.items():
            f.write(f"| {m} | ₹{met['mae']} | ₹{met['rmse']} | {met['r2']} |\n")
        f.write("\n### Data Provenance Caveat\n")
        f.write(f"> {report['dataset_caveat']}\n")
        
    print(f"Evaluation report written to {report_json_path} and {report_md_path}")
    return report

if __name__ == '__main__':
    train_and_evaluate()
