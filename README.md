# RoomNest — Pune PG Discovery & Management Platform

A production-oriented Pune paying-guest (PG) accommodation platform engineered with **React + TypeScript + Vite**, **Supabase (PostgreSQL, Auth, Storage, RLS)**, and a dedicated **Python FastAPI + scikit-learn** machine learning microservice for explainable rent estimation.

---

## 🏛️ System Architecture

```
RoomNest/
├── frontend/                  # React + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/        # Navbar, Footer, DataCaveatBanner, ListingCard
│   │   ├── context/           # AuthContext (Multi-role demo switcher), StoreContext
│   │   ├── pages/             # Public, Tenant, Owner & Admin pages
│   │   ├── types/             # Canonical schema TypeScript interfaces
│   │   └── data/              # Curated Pune PG seed fixtures (40 listings)
│   └── vite.config.ts         # Reverse proxy configured to ML API (:8001)
├── ml_service/                # Python FastAPI + scikit-learn Engine
│   ├── train_models.py        # Ridge, Random Forest & HistGradientBoosting regression pipeline
│   ├── app.py                 # FastAPI service serving /v1/predictions/pg-rent & /health
│   ├── models/                # Trained model artifact (pg_rent_model.joblib)
│   └── reports/               # Evaluation report & locality-sliced error benchmarks
├── supabase/                  # Supabase Backend & Database Migrations
│   ├── migrations/
│   │   ├── 01_initial_schema.sql  # Canonical normalized tables (profiles, listings, bookings, etc.)
│   │   ├── 02_rls_policies.sql    # Zero-trust Row Level Security (RLS) matrix
│   │   └── 03_seed_data.sql       # Seed accounts (Tenant, Owner, Admin) and PG fixtures
│   └── data_import/
│       ├── import_data.py         # CSV cleaning & integrity auditing script
│       └── import_rejection_report.json # Row-level CSV rejection audit
└── Datasets/                  # Raw dataset CSVs (10,000 synthetic prototype rows)
```

---

## 🚀 Running Locally

### 1. Python ML Service (FastAPI)
```bash
cd ml_service
# (Optional) Train/re-train model pipeline:
python train_models.py

# Launch FastAPI microservice on port 8001:
python -m uvicorn app:app --port 8001 --reload
```
Endpoints:
- Health check: `http://127.0.0.1:8001/health`
- Model info & metadata: `http://127.0.0.1:8001/v1/model-info`
- Predict rent: `POST http://127.0.0.1:8001/v1/predictions/pg-rent`

### 2. Frontend Web Application (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

---

## 🤖 Multi-Model AI Suite & 5th Sem Data Visualization (DV) Studio

RoomNest includes **4 specialized machine learning models** trained on an augmented dataset of **100,000 Pune housing vectors** (25,000 per model domain):

| Model | Architecture | Accuracy / $R^2$ | 5-Fold Cross-Validation | Primary Error Metric |
| :--- | :--- | :--- | :--- | :--- |
| **Model 1: PG Rent Estimator** | `HistGradientBoostingRegressor` | **$R^2 = 0.9903$** | **$0.9880 \pm 0.0009$** | $\text{MAE} = ₹277.62$ |
| **Model 2: Roommate Harmony Matcher** | `RandomForestRegressor` | **$R^2 = 0.9331$** | **$0.9234 \pm 0.0021$** | $\text{MAE} = 2.92\%$ |
| **Model 3: Lead Conversion Propensity** | `GradientBoostingClassifier` | **$\text{Acc} = 99.8\%$** | **$0.9988 \pm 0.0007$** | $\text{ROC-AUC} = 1.0000$ |
| **Model 4: PG Maintenance Risk** | `RandomForestClassifier` | **$\text{Acc} = 85.0\%$** | **$0.9090 \pm 0.0031$** | $\text{ROC-AUC} = 0.9178$ |

### 📊 Academic Data Visualization Studio (`/model-evaluation`)
- **Interactive Actual vs. Predicted Scatter Plots** with ideal $45^\circ$ reference lines.
- **Residual Error Distribution Histograms** confirming zero-centered Gaussian distribution.
- **$2 \times 2$ Confusion Matrix Heatmaps** for both classification models with interactive metrics.
- **ROC Curves & Precision-Recall Curves** with AUC area integration.
- **Feature Importance Visualizations** identifying primary predictive drivers.

---

## 👥 Multi-Role Logins & Quick Switcher

RoomNest includes instant 1-click test role logins and session persistence for all three platform personas:

| Role | Test Account Email | Demo Persona & Capabilities |
|---|---|---|
| **Tenant** | `tanmay.tenant@roomnest.in` | Tanmay Shinde (COEP Student / Hinjewadi Intern). Search, compare, shortlist, book beds, and write stay reviews. |
| **Owner** | `suresh.owner@roomnest.in` | Suresh Patil (Verified Pune Property Owner). Manage live bed vacancies, add new PG listings wizard, reply to inquiries, accept bookings. |
| **Admin** | `admin@roomnest.in` | RoomNest Compliance Officer. Moderation queue, user verification registry, synthetic data isolation governance, and CSV rejection logs. |
| **Guest** | *Public / Unauthenticated* | Search PGs, compare side-by-side, and run AI rent estimator without logging in. |

*You can instantly switch roles anytime using the top demo switcher bar.*

---

## 📊 Dataset Provenance & Non-Negotiable Data Caveat

In accordance with Section 1 of the build specification:
- The uploaded CSVs contain 10,000 rows each and are demonstration-oriented / synthetic.
- All imported prototype listings are tagged with `is_demo = TRUE` and display a prominent caveat banner in the interface.
- Only owner-submitted and physically inspected accommodations are marked with the **Verified Owner** badge.