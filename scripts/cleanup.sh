#!/bin/bash

NAMESPACE=${1:-k8s-cicd}

echo "Cleaning up namespace: $NAMESPACE"

# Delete application resources
kubectl delete -f k8s/ -n $NAMESPACE --ignore-not-found=true

# Delete namespace
kubectl delete namespace $NAMESPACE --ignore-not-found=true

echo "Cleanup completed!"
