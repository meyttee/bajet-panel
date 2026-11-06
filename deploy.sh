#!/bin/bash

set -e

echo "Stopping old container..."
docker stop bajet_panel 2>/dev/null || true

echo "Removing old container..."
docker rm bajet_panel 2>/dev/null || true

echo "Removing old image..."
docker rmi bajet_panel 2>/dev/null || true

echo "Building new image..."
docker build -t bajet_panel .

echo "Running new container..."
docker run -d \
  --name bajet_panel \
  --restart unless-stopped \
  -p 3000:3000 \
  bajet_panel

echo "Deploy completed successfully."

