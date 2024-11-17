# Use a base image with Node.js
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (including devDependencies like TypeScript)
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file into the container (optional, if you're not using environment variables differently)
COPY .env /app/.env

# Build the application (runs TypeScript compiler and then Vite build)
RUN npm run build

# Expose port for the Vite preview server
EXPOSE 3000

# Start the Vite server (or your production server)
CMD ["npm", "run", "preview"]
