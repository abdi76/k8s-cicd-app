# Kubernetes CI/CD Demo Application

[![CI/CD Pipeline](https://github.com/your-username/k8s-cicd-app/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/k8s-cicd-app/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-ready demonstration of CI/CD pipeline implementation using Kubernetes, Jenkins, and GitHub Actions. This project showcases DevOps best practices including automated testing, security scanning, monitoring, and deployment automation.

## 🚀 Features

- **Complete CI/CD Pipeline**: Automated testing, building, and deployment
- **Multi-Platform Support**: GitHub Actions and Jenkins pipelines
- **Security First**: Vulnerability scanning, code quality analysis
- **Monitoring Ready**: Prometheus metrics and Grafana dashboards
- **Production Ready**: Health checks, resource management, rolling updates
- **Cloud Native**: Kubernetes-native deployment with best practices

## 📋 Prerequisites

- **Kubernetes Cluster** (v1.20+)
- **Docker** (v20.10+)
- **Node.js** (v18+)
- **kubectl** configured
- **Helm** (v3+)
- **Jenkins** (optional, for Jenkins pipeline)

## 🚀 Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/your-username/k8s-cicd-app.git
cd k8s-cicd-app

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
```

### Docker Deployment
```bash
# Build and run locally
sudo docker build -t k8s-cicd-app .
sudo docker run -p 3000:3000 k8s-cicd-app
```

### Kubernetes Deployment
```bash
# Deploy to Kubernetes
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n k8s-cicd
```

## 🔧 Configuration

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Application port | `3000` |
| `APP_VERSION` | Application version | `1.0.0` |

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

## 📈 API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /metrics` - Prometheus metrics
- `GET /api/users` - Sample API endpoint

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Kubernetes](https://kubernetes.io/) for container orchestration
- [Jenkins](https://www.jenkins.io/) for CI/CD automation
- [Prometheus](https://prometheus.io/) for monitoring
- [GitHub Actions](https://github.com/features/actions) for automated workflows
