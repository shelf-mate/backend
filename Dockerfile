# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

RUN adduser -D builder && chown -R builder /app
USER builder


COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]