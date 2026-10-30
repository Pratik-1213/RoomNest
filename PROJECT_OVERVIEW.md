# RoomNest --- Project Overview

## 1. Introduction

RoomNest is a Pune-focused paying guest (PG) discovery and AI-assisted
housing platform. It is designed to help students and working
professionals explore accommodation options, understand the costs
involved, and make more informed housing decisions.

The platform brings PG discovery, roommate compatibility, rent
estimation, property-owner tools, and machine-learning evaluation
together in one application.

The project focuses on Pune's student and IT corridors, including areas
such as Hinjewadi, Kothrud, Viman Nagar, Wakad, Baner, and Kharadi.

## 2. Problem Statement

Finding suitable PG accommodation can involve comparing many listings
and considering more than just monthly rent. A tenant may also need to
evaluate location, amenities, food, deposits, maintenance charges, and
house rules.

RoomNest aims to make this process more organized by providing:

-   PG discovery and filtering.
-   Clearer visibility into accommodation costs.
-   Comparison of multiple PG options.
-   Rent estimation and roommate compatibility features.
-   Tools for owners to manage listings and inquiries.

## 3. Main Platform Modules

### PG Discovery

Users can explore PG listings and review information such as locality,
rent, room type, amenities, meal availability, deposit, and other
property details.

### PG Comparison

The comparison experience helps users evaluate multiple properties side
by side, including facilities, pricing, and relevant policies.

### Rent Estimation

The rent-estimation feature uses property and locality-related inputs to
estimate a monthly PG rent.

### Roommate Finder

The roommate matching feature compares lifestyle preferences, such as
sleep schedule, cleanliness, diet, noise tolerance, and budget
compatibility, to produce a compatibility score.

### Owner Features

PG owners can use the platform to manage property listings, vacancy
information, inquiries, and occupancy-related information.

### Administration

Administrative features support listing moderation, owner verification,
and platform oversight.

### Model Evaluation

The `/model-evaluation` area presents machine-learning evaluation
information, including regression and classification visualizations.

## 4. Technology Stack

  -----------------------------------------------------------------------
  Layer                               Technology
  ----------------------------------- -----------------------------------
  Frontend                            React, TypeScript, Vite

  Styling                             Tailwind CSS

  Database                            Supabase PostgreSQL

  Authentication and access control   Supabase Auth and Row Level
                                      Security (RLS)

  Machine-learning API                Python and FastAPI

  Machine-learning libraries          scikit-learn, NumPy, pandas

  Model storage                       Joblib model artifacts
  -----------------------------------------------------------------------

## 5. High-Level Architecture

RoomNest separates the user interface, application data services, and
machine-learning functionality.

1.  The React frontend provides the pages and interactive features used
    by tenants, owners, administrators, and guests.
2.  Supabase provides PostgreSQL database services and authentication.
    Row Level Security policies help control which records a user can
    access or modify.
3.  The Python FastAPI service exposes endpoints for machine-learning
    predictions.
4.  Trained scikit-learn models are loaded by the ML service and used to
    generate predictions from submitted inputs.
5.  The frontend displays the returned results to the user.

This separation allows the main application and machine-learning service
to be developed and maintained as distinct parts of the system.

## 6. Machine-Learning Components

The project describes four machine-learning tasks:

  -------------------------------------------------------------------------------
  Model                   Task                    Algorithm
  ----------------------- ----------------------- -------------------------------
  PG Rent Estimator       Predict monthly rent    HistGradientBoostingRegressor

  Roommate Compatibility  Estimate a              RandomForestRegressor
                          compatibility score     

  Lead Conversion         Classify inquiry        GradientBoostingClassifier
                          conversion              

  Maintenance Risk        Classify potential      RandomForestClassifier
                          maintenance risk        
  -------------------------------------------------------------------------------

The repository README reports evaluation metrics for these models. The
reported results are based on the project's augmented prototype
datasets; they should not be interpreted as proof of equivalent
performance on live housing data. Further validation on representative
real-world data would be needed before relying on the models for
operational decisions.

## 7. Data and Visualization

The project includes Pune-focused PG datasets and model evaluation data.
The datasets support analysis of property characteristics, pricing,
locality, and other housing-related factors.

The model-evaluation dashboard is intended to make model behavior easier
to inspect through visualizations such as:

-   Actual-versus-predicted plots for regression.
-   Residual error distributions.
-   Confusion matrices for classification.
-   ROC and precision-recall curves.
-   Feature-importance visualizations.

These visualizations help communicate model performance and identify
areas that may need further investigation.

## 8. Intended Users

-   **Tenants:** Discover, compare, and shortlist PG accommodation.
-   **PG owners:** Manage property information, vacancies, and
    inquiries.
-   **Administrators:** Review listings and support platform governance.
-   **Public visitors:** Explore available public features without
    necessarily signing in.

## 9. Project Scope

RoomNest combines accommodation discovery with data-driven assistance.
Its scope includes the web application, database and access-control
layer, machine-learning service, Pune-focused datasets, and
data-visualization dashboard.

The project is an academic prototype. Dataset quality, model
generalization, security configuration, and production readiness should
be assessed and tested before deployment for real-world use.

## 10. Future Improvements

Potential areas for future development include:

-   Validating rent estimates against a larger and more representative
    set of real listings.
-   Improving dataset freshness and data-quality checks.
-   Testing model performance across different Pune localities and
    property types.
-   Expanding automated tests for frontend, API, and database workflows.
-   Improving accessibility and mobile usability.
-   Monitoring prediction quality as new data becomes available.

------------------------------------------------------------------------

RoomNest brings together PG discovery, accommodation comparison,
machine-learning assistance, and data visualization to support more
informed housing decisions in Pune.
