FROM trion/ng-cli as builder
WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm ci  --debug 
COPY . .
ENV NODE_ENV=production
RUN ng build
EXPOSE 4200
RUN chown -R node:node /app/dist/

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node
CMD [ "npm","run", "start:prod"]
