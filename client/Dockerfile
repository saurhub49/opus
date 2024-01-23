FROM node:18-alpine as BUILD

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


# Implementing this multi-package to reduce the size of the app and avoid exposing our code in the container
FROM node:18-alpine as PROD

WORKDIR /app

# Copying the build folder i.e. the dist folder from the previous stage
COPY --from=BUILD /app/dist/ /app/dist/

EXPOSE 3000

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

CMD [ "npm", "run", "preview" ]