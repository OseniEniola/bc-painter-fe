# Use the official Node.js 14 image as a parent image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the rest of your application's code into the container
COPY . .

# Build the Angular app for production
RUN ng build --prod

# Use Nginx to serve the Angular app
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/BC-painters-hub /usr/share/nginx/html
