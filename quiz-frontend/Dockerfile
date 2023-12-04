# Use an official Node runtime as a parent image
FROM node:20.10

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (or the port your React app runs on)
EXPOSE 3000

# Start the React app
CMD ["npm", "run", "dev"]
