# Pazz ML — exploratory modeling lab

> **Status:** Historical exploratory work. This repository is not the current PAZZ production platform, does not contain the private commercial system, and should not be read as a production-model or business-performance claim.

## Purpose

This small public repository explored how standard analytics and supervised-learning workflows could be applied to marketplace-style leasing data. Its value is in the modeling discipline and prototype structure, not in a claim that the included models are deployed.

## Scope

- Dataset inspection and validation
- Baseline feature and target experiments
- Train/test separation and cross-validation
- Leakage checks and honest evaluation
- Lightweight TypeScript visualization work

## Stack

- Python
- pandas and scikit-learn
- TypeScript and Vite

## Modeling principles

- Establish simple baselines before adding model complexity
- Keep feature availability aligned with prediction time
- Separate exploratory metrics from production acceptance criteria
- Prefer reproducible evaluation over headline accuracy
- Treat any demo output as illustrative until validated on representative data

For current PAZZ Marketplace information, visit [pazz.mx](https://pazz.mx).
