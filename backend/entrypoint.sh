#!/bin/sh
set -e

# Detect environment (default to production)
ENVIRONMENT=${NODE_ENV:-production}
echo "Environment: $ENVIRONMENT"

# Set default database connection values if not provided
DB_HOST=${POSTGRES_HOST:-db}
DB_PORT=${POSTGRES_PORT:-5432}
DB_USER=${POSTGRES_USER:-postgres}

echo "Database connection: $DB_HOST:$DB_PORT (user: $DB_USER)"

# Wait for database to be ready
echo "Waiting for database to be ready..."

# Use netcat for connection checking
until nc -z $DB_HOST $DB_PORT; do
  echo "Database is not ready yet. Waiting..."
  sleep 2
done

echo "Database is ready!"

# Start the appropriate server based on environment
if [ "$ENVIRONMENT" = "development" ]; then
  echo "Starting development server with hot reload..."
  npm run start:dev
else
  echo "Starting production server..."
  node dist/main.js
fi

