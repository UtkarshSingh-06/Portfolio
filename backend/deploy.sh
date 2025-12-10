#!/bin/bash

# Backend deployment script
# Builds Docker image and pushes to Docker Hub

set -e

# Configuration
DOCKER_USERNAME=${DOCKER_USERNAME:-"your-docker-username"}
IMAGE_NAME="portfolio-backend"
VERSION=${1:-"latest"}

echo "🐳 Building Docker image..."
docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION} .
docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:latest .

echo "📤 Pushing to Docker Hub..."
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest

echo "✅ Deployment complete!"
echo "Image: ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"

