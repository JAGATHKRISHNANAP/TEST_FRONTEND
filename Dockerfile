# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React application code
COPY . .

# Expose the port the React app will run on (default is 3000)
EXPOSE 3000

# Start the React app in development mode
CMD ["npm", "start"]