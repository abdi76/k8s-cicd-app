# Deployment Guide

This guide covers different deployment scenarios for the K8s CI/CD application.

## Prerequisites

- Kubernetes cluster (v1.20+)
- kubectl configured
- Docker registry access
- Helm (v3+) for monitoring setup

## Local Development Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Direct Docker Run

```bash
# Build image
docker build -t k8s-cicd-app .

# Run container
docker run -p 3000:3000 k8s-cicd-app
```

## Kubernetes Deployment

### Manual Deployment

```bash
# Create namespace
kubectl create namespace k8s-cicd

# Deploy application
kubectl apply -f k8s/

# Check status
kubectl get pods -n k8s-cicd
kubectl get svc -n k8s-cicd
```

### Using Scripts

```bash
# Deploy with default settings
./scripts/deploy.sh

# Deploy to specific namespace
./scripts/deploy.sh my-namespace

# Setup monitoring
./scripts/setup-monitoring.sh
```

## Production Deployment

### Image Registry

Update deployment.yaml with your image:

```yaml
image: your-registry.com/k8s-cicd-app:v1.0.0
```

### Resource Configuration

Adjust resources based on load:

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "200m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### High Availability

Increase replicas for HA:

```yaml
spec:
  replicas: 3
```

## Health Checks

The application provides health check endpoints:

- `/health` - Application health status
- `/metrics` - Prometheus metrics

## Monitoring Setup

```bash
# Install monitoring stack
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace

# Access Grafana
kubectl port-forward svc/prometheus-grafana 3000:80 -n monitoring
```

## Troubleshooting

### Pod Not Starting

```bash
# Check pod events
kubectl describe pod <pod-name> -n k8s-cicd

# Check logs
kubectl logs <pod-name> -n k8s-cicd
```

### Service Not Accessible

```bash
# Check service endpoints
kubectl get endpoints -n k8s-cicd

# Port forward for testing
kubectl port-forward svc/k8s-cicd-service 8080:80 -n k8s-cicd
```

### Image Pull Issues

```bash
# Check image pull secrets
kubectl get pods <pod-name> -n k8s-cicd -o yaml

# Create image pull secret if needed
kubectl create secret docker-registry regcred \
  --docker-server=<your-registry-server> \
  --docker-username=<your-name> \
  --docker-password=<your-password> \
  --docker-email=<your-email>
```
