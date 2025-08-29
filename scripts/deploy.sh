#!/bin/bash

set -e

NAMESPACE=${1:-k8s-cicd}
IMAGE_TAG=${2:-latest}

echo "Deploying to namespace: $NAMESPACE"
echo "Using image tag: $IMAGE_TAG"

# Create namespace if it doesn't exist
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Apply Kubernetes manifests
kubectl apply -f k8s/ -n $NAMESPACE

# Wait for rollout to complete
kubectl rollout status deployment/k8s-cicd-app -n $NAMESPACE --timeout=300s

# Get deployment status
echo "Deployment completed!"
kubectl get pods -n $NAMESPACE -l app=k8s-cicd-app
kubectl get svc -n $NAMESPACE

echo "Health check:"
kubectl port-forward svc/k8s-cicd-service 8080:80 -n $NAMESPACE &
sleep 5
curl -f http://localhost:8080/health || echo "Health check failed"
pkill -f "kubectl port-forward"
