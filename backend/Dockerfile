# Base stage for dependencies
FROM node:22-alpine AS deps
WORKDIR /app

RUN echo "🚀 Starting dependency installation stage..."

# Copy package files for dependency installation
COPY package.json package-lock.json* ./
RUN echo "📄 Package files copied successfully!"

# Install dependencies
RUN npm ci --legacy-peer-deps && echo "📦 Dependencies installed successfully!"

# Builder stage
FROM node:22-alpine AS builder
WORKDIR /app

RUN echo "🏗️ Starting builder stage..."

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/package-lock.json* ./
RUN echo "📦 Dependencies copied from previous stage!"

# Copy source code and prisma files
COPY . .
RUN echo "📂 Source code and configuration files copied!"

RUN npm run build && echo "🎉 Application built successfully!"

# Development stage
FROM builder AS development

RUN echo "🔧 Setting up development environment..."

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/package-lock.json* ./
RUN echo "📚 Development dependencies copied!"

# Copy built application and configuration
COPY --from=builder /app/dist ./dist
RUN echo "📝 Development configuration applied!"

# Setup entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh && echo "🔑 Entrypoint script prepared!"

# Configure runtime
ENV PORT=${PORT}
EXPOSE $PORT

# Use entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]

# Production stage
FROM node:22-alpine AS production
WORKDIR /app

RUN echo "🚀 Preparing production environment..."

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json /app/package-lock.json* ./
RUN echo "📦 Production dependencies copied!"

# Copy built application and configuration
COPY --from=builder /app/dist ./dist
RUN echo "⚙️ Production configuration applied!"

# Setup entrypoint
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh && echo "🔑 Entrypoint script configured!"

# Configure runtime
ENV PORT=${PORT}
EXPOSE $PORT

# Use entrypoint script
ENTRYPOINT ["/app/entrypoint.sh"]