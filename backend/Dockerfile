FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create logs directory
RUN mkdir -p src/logs

# Expose port
EXPOSE 5001

# Start the application
CMD ["node", "src/server.js"]
