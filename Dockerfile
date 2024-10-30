# Stage 1: Build the application
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Run the application
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]