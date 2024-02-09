FROM node:20.10.0-alpine

# Node alpine need this
RUN apk add --no-cache libc6-compat

# Install NPM
RUN npm install -g npm

# Validate NPM Installation
RUN npm -v

# Copy source files
COPY ./ /app

# Install dependencies
WORKDIR /app
RUN npm install

# Set ENV
ENV SKIP_TEST_MYSQL=true
# Set Port
EXPOSE 8080

# Start app
CMD npm run start