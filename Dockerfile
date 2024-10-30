# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies as root
COPY package*.json ./
RUN npm install

# Change ownership of node_modules and the app directory
RUN adduser -D builder && chown -R builder /app/node_modules /app

# Switch to the non-root user and run Prisma generate
USER builder

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

WORKDIR /app

# Copy built application and dependencies from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Run the final stage as a non-root user for security
RUN adduser -D appuser
USER appuser

EXPOSE 3000

CMD ["node", "dist/main"]
