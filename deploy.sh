#!/bin/bash

set e

echo "Stopping old container..."
docker stop bajet-panel 2>/dev/null || true

echo "Removing old container..."
docker rm bajet-panel 2>/dev/null || true

echo "Removing old image..."
docker rmi cyra_front 2>/dev/null || true

echo "Building new image..."
docker build -t cyra_front .

echo "Running new container..."
docker run -d \
        --name bajet-panel \
        --restart unless-stopped \
        -p 3000:3000 \
        cyra_front
        
echo "Deploy completed successfully."