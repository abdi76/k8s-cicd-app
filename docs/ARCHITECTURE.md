# Architecture Overview

## System Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   GitHub    │    │   Jenkins   │    │ Kubernetes  │
│   Actions   ├────▶   Pipeline  ├────▶   Cluster   │
│   (CI/CD)   │    │   (CI/CD)   │    │ (Runtime)   │
└─────────────┘    └─────────────┘    └─────────────┘
      │                    │                    │
      ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Container  │    │   Quality   │    │ Monitoring  │
│  Registry   │    │   Gates     │    │ & Alerts    │
│ (ghcr.io)   │    │(SonarCloud) │    │(Prometheus) │
└─────────────┘    └─────────────┘    └─────────────┘
```

## Application Components

### Core Application
- **Framework**: Express.js (Node.js)
- **Port**: 3000
- **Health Check**: `/health` endpoint
- **Metrics**: `/metrics` Prometheus endpoint

### Container
- **Base Image**: node:18-alpine
- **Security**: Non-root user (nodejs:1001)
- **Health Check**: Built-in health check
- **Multi-stage**: Builder and production stages

### Kubernetes Resources
- **Namespace**: k8s-cicd
- **Deployment**: 3 replicas with rolling updates
- **Service**: ClusterIP and LoadBalancer
- **Security**: SecurityContext, non-root user

## CI/CD Pipeline

### GitHub Actions Workflow
1. **Test Stage**: Lint, unit tests, coverage
2. **Security Stage**: Vulnerability scanning
3. **Build Stage**: Docker image build and push
4. **Deploy Stage**: Kubernetes deployment
5. **Verify Stage**: Health checks and smoke tests

### Jenkins Pipeline
1. **Checkout**: Source code checkout
2. **Dependencies**: npm install
3. **Test**: Unit tests execution
4. **Build**: Docker image creation
5. **Push**: Registry push
6. **Deploy**: Kubernetes deployment
7. **Verify**: Health check validation

## Security Architecture

### Container Security
- Non-root user execution
- Read-only root filesystem
- Dropped capabilities
- Security contexts applied

### Vulnerability Scanning
- **Trivy**: Container image scanning
- **Snyk**: Dependency vulnerability scanning
- **CodeQL**: Static code analysis
- **npm audit**: Node.js dependency check

### Runtime Security
- **RBAC**: Role-based access control ready
- **Network Policies**: Traffic control ready
- **Pod Security**: Security contexts enforced

## Monitoring Architecture

### Metrics Collection
- **Prometheus**: Metrics scraping
- **Custom Metrics**: HTTP requests, response time
- **System Metrics**: CPU, memory, disk

### Observability
- **Grafana**: Metrics visualization
- **Dashboards**: Application and infrastructure metrics
- **Alerts**: Health and performance alerts

## Data Flow

1. **Request Flow**:
   Client → LoadBalancer → Service → Pod → Application

2. **Metrics Flow**:
   Application → Prometheus → Grafana → Dashboard

3. **CI/CD Flow**:
   Git Push → GitHub Actions/Jenkins → Build → Test → Deploy → Verify

## Scalability

### Horizontal Scaling
- **HPA**: Horizontal Pod Autoscaler ready
- **Multiple Replicas**: Load distribution
- **Rolling Updates**: Zero-downtime deployments

### Resource Management
- **Requests**: Minimum resource guarantees
- **Limits**: Maximum resource usage
- **Quality of Service**: Guaranteed QoS class

## High Availability

### Application Level
- **Multiple Replicas**: 3 replicas by default
- **Health Checks**: Liveness and readiness probes
- **Graceful Shutdown**: SIGTERM handling

### Infrastructure Level
- **Multi-AZ**: Kubernetes cluster across zones
- **Load Balancing**: Service load balancing
- **Persistent Storage**: StatefulSet ready

## Performance Considerations

### Application
- **Response Time**: Target <100ms
- **Memory Usage**: <256MB per pod
- **CPU Usage**: <200m per pod

### Monitoring
- **Metrics Scraping**: 15-second intervals
- **Alert Response**: <1 minute
- **Dashboard Updates**: Real-time
