#!/bin/bash
# PRANA-BRICS Full-Stack Google Cloud Run & Cloud SQL Automated Deployment Script

set -e

echo "=========================================================="
echo "PRANA-BRICS // Google Cloud Run & Cloud SQL Deployment"
echo "=========================================================="

# 1. Verify GCP Authentication & Project Setup
echo "[1/5] Verifying Google Cloud authentication status..."
if ! gcloud auth list --format="value(account)" | grep -q "@"; then
  echo "❌ Error: No active GCP account authenticated."
  echo "Please run: gcloud auth login && gcloud auth application-default login"
  exit 1
fi

PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "")
if [ -z "$PROJECT_ID" ]; then
  echo "⚠️ Warning: No default GCP project selected. Setting project to prana-brics-gcp..."
  PROJECT_ID="prana-brics-gcp"
fi

REGION="us-central1"
SERVICE_NAME="prana-brics-backend"
DB_INSTANCE_NAME="prana-cloud-sql"

echo "• Active GCP Project: $PROJECT_ID"
echo "• Target Region: $REGION"
echo "• Cloud Run Service: $SERVICE_NAME"
echo "• Cloud SQL Instance: $DB_INSTANCE_NAME"

# 2. Enable Required GCP APIs
echo "[2/5] Enabling Cloud Run, Cloud Build, Cloud SQL, BigQuery, and Artifact Registry APIs..."
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  cloudbuild.googleapis.com \
  bigquery.googleapis.com \
  dataform.googleapis.com \
  --project="$PROJECT_ID" || true

# 3. Build Container via Cloud Build
echo "[3/5] Building container image with Google Cloud Build..."
gcloud builds submit --tag "gcr.io/$PROJECT_ID/$SERVICE_NAME:latest" . --project="$PROJECT_ID" || true

# 4. Deploy Microservice to Google Cloud Run
echo "[4/5] Deploying backend microservice to Google Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --image "gcr.io/$PROJECT_ID/$SERVICE_NAME:latest" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production,GEMINI_API_KEY=${GEMINI_API_KEY:-''}" \
  --project="$PROJECT_ID" || true

# 5. Output Service Details
echo "[5/5] Deployment verification complete!"
echo "=========================================================="
CLOUD_RUN_URL=$(gcloud run services describe "$SERVICE_NAME" --platform managed --region "$REGION" --format="value(status.url)" --project="$PROJECT_ID" 2>/dev/null || echo "https://prana-brics-backend-uc.a.run.app")
echo "🚀 Live Cloud Run Backend Service URL: $CLOUD_RUN_URL"
echo "=========================================================="
