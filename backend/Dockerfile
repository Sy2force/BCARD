FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including TypeScript for build)
RUN npm install

# Copy application files
COPY . .

# Build TypeScript
RUN npm run build

# Create logs directory
RUN mkdir -p src/logs

# Expose port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]
