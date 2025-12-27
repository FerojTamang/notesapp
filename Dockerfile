# ---- Base image (small & secure) ----
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose app port
EXPOSE 3000

# Run as non-root user (security)
USER node

# Start the app
CMD ["npm", "start"]
