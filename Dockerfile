FROM node:lts-alpine 
MAINTAINER fine<dlgmltjr0925@gmail.com>


EXPOSE 3000

# Create Work directory
RUN mkdir -p /docker-registry-web

# Change Work directory 
WORKDIR /docker-registry-web

# Copy package info
COPY . .

ENTRYPOINT ["yarn", "entrypoint"]

# Run Server
CMD ["yarn", "start"]
