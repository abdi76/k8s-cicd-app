pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "${env.DOCKER_REGISTRY ?: 'docker.io'}/your-dockerhub-username/k8s-cicd-app"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        KUBECONFIG_CREDENTIALS = credentials('kubeconfig-credentials')
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        SONARQUBE_TOKEN = credentials('sonarqube-token')
        SONARQUBE_URL = "${env.SONARQUBE_URL ?: 'http://sonarqube:9000'}"
        NAMESPACE = "k8s-cicd"
    }
    
    options {
        timeout(time: 30, unit: 'MINUTES')
        retry(2)
        skipDefaultCheckout(false)
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
                
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.BUILD_VERSION = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh '''
                    node --version
                    npm --version
                    npm ci
                '''
            }
        }
        
        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests...'
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo "Building Docker image: ${DOCKER_IMAGE}:${BUILD_VERSION}"
                script {
                    docker.build("${DOCKER_IMAGE}:${BUILD_VERSION}")
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                echo "Pushing Docker image to registry..."
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image("${DOCKER_IMAGE}:${BUILD_VERSION}").push()
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                echo "Deploying to Kubernetes namespace: ${NAMESPACE}"
                script {
                    withKubeConfig(credentialsId: 'kubeconfig-credentials') {
                        sh '''
                            kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
                            sed -i "s|your-dockerhub-username/k8s-cicd-app:latest|${DOCKER_IMAGE}:${BUILD_VERSION}|g" k8s/deployment.yaml
                            kubectl apply -f k8s/ -n ${NAMESPACE}
                            kubectl rollout status deployment/k8s-cicd-app -n ${NAMESPACE} --timeout=300s
                            kubectl get pods -n ${NAMESPACE} -l app=k8s-cicd-app
                        '''
                    }
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health checks...'
                script {
                    withKubeConfig(credentialsId: 'kubeconfig-credentials') {
                        sh '''
                            kubectl wait --for=condition=ready pod -l app=k8s-cicd-app -n ${NAMESPACE} --timeout=300s
                            kubectl port-forward svc/k8s-cicd-service 8080:80 -n ${NAMESPACE} &
                            sleep 10
                            curl -f http://localhost:8080/health || exit 1
                            pkill -f "kubectl port-forward"
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up...'
            sh 'docker image prune -f'
        }
        
        success {
            echo 'Pipeline completed successfully!'
        }
        
        failure {
            echo 'Pipeline failed!'
        }
    }
}
