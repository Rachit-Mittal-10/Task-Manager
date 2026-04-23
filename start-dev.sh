#!/bin/bash

# check if backend/.env file exists, if not create it by copying from .env.default
if [ ! -f "backend/.env" ]; then
    echo "backend/.env file not found. Creating from .env.default..."
    cp backend/.env.default backend/.env
    echo "backend/.env file created. Please review and update it with your configuration."
else
    echo "backend/.env file already exists. Skipping creation."
fi

# Start the development environment using Docker Compose
docker compose -f docker-compose-dev.yaml --env-file backend/.env.dev up --build -d
# Run database migrations
echo "Running database migrations..."
docker compose -f docker-compose-dev.yaml --env-file backend/.env.dev exec backend npm run migrate
echo "Development environment is up and running!"