#!/bin/bash

set -e

echo "Setting up monitoring stack..."

# Add Helm repositories
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Create monitoring namespace
kubectl create namespace monitoring --dry-run=client -o yaml | kubectl apply -f -

# Install Prometheus
echo "Installing Prometheus..."
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set prometheus.prometheusSpec.retention=30d \
  --set prometheus.prometheusSpec.storageSpec.volumeClaimTemplate.spec.resources.requests.storage=10Gi \
  --set grafana.persistence.enabled=true \
  --set grafana.persistence.size=5Gi \
  --set grafana.adminPassword=admin123

# Wait for deployment
kubectl rollout status deployment/prometheus-grafana -n monitoring --timeout=300s
kubectl rollout status deployment/prometheus-kube-prometheus-operator -n monitoring --timeout=300s

echo "Monitoring stack deployed successfully!"
echo "Access Grafana: kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring"
echo "Default credentials: admin/admin123"
