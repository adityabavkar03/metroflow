# MetroFlow — AI-Based Metro Passenger Flow Prediction

**Department of CSE (AI & ML) — VIVA Institute of Technology**
**Major Project 2026–27**

---

## Team Members

| Name | Role |
|---|---|
| Aditya Bavkar | ML Engineer |
| Kavya Gharat | Backend Developer |
| Harshali Patil | Frontend Developer |
| Shubham Warang | Data + Integration |

**Guide:** Prof. Karishma Raut

---

## Project Overview

MetroFlow is an AI-powered Decision Support System that predicts
passenger demand 15–30 minutes in advance and recommends dynamic
train scheduling, crowd management, and passenger information
for smarter metro operations.

---

## Tech Stack

- Python, Pandas, NumPy
- LSTM (TensorFlow), XGBoost
- FastAPI
- React + Vite
- SQLite
- Deployed on Render + Vercel

---

## Folder Structure
metroflow/
├── data/          ← Raw and processed datasets
├── models/        ← Saved ML models
├── api/           ← FastAPI backend
├── frontend/      ← React dashboard
├── utils/         ← Feature engineering, event calendar
├── database/      ← Database models
├── notebooks/     ← Jupyter notebooks for EDA and training
└── outputs/       ← Graphs, results, exports
---

## Setup Instructions

```bash
# Clone repo
git clone https://github.com/adityabavkar03/metroflow.git
cd metroflow

# Install Python dependencies
pip install -r requirements.txt

# Run API
uvicorn api.main:app --reload --port 8000

# Run Frontend
cd frontend
npm install
npm run dev
```

---

## Status

- [x] Repository created
- [x] Team added as collaborators
- [ ] Dataset loaded
- [ ] Feature engineering
- [ ] XGBoost model
- [ ] LSTM model
- [ ] FastAPI backend
- [ ] React dashboard
- [ ] Deployment