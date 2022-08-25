FROM node:16

# Working Directory
WORKDIR /app

# Copy npm dependencies
COPY src/index.js /app/index.js/src
COPY package.json /app/app.package.json
# Install dependencies
RUN npm install
# Copy Source Code
COPY . .
# Expose port and start the application
EXPOSE 3000
CMD ["npm", "start"]