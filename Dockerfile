FROM node:slim
# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 8080

# Start the app
CMD ["npm", "start"]