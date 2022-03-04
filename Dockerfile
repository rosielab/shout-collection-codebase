# This is the production Dockerfile with Nginx as the server without debugging enabled

# Select base image and assign specific name
# Note: There are some dependency issues with node 17, so node 16 will used for now.
FROM node:16-alpine as frontend
# Specify the working directory
WORKDIR '/frontend'
# Copy package.json into container
COPY package.json .
# Install dependencies from package.json
RUN npm install
# Copy all other files into container
COPY . .
# Run build production command (stored in /frontend/build)
RUN npm run build

# Start next part of build phase
FROM nginx
# Set specific port for production react server
EXPOSE 3000
# Copy Nginx configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy previous phase files into this phase
COPY --from=frontend /frontend/build /usr/share/nginx/html
