# Stage 1: Build the React application
FROM node:20 AS build
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:stable-alpine

# Copy the build output to Nginx's default html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run's default)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
