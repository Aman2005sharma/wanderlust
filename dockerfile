# Base Image
FROM node:22.16.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Expose your application port
EXPOSE 8080

# Start the application
CMD ["node", "app.js"]