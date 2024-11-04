# clients/Dockerfile
# Step 1: Use a Node.js image to build the frontend
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend source files
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the app with an Nginx server
FROM nginx:alpine

# Copy the built files from the Node.js image to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose the frontend port
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
