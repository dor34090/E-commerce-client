#this is the building block
FROM node:14.8.0-alpine as builder

#creating a specific directory to work on
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


ENV PATH /usr/src/app/node_module/.bin:$PATH
COPY package.json /usr/src/app/package.json

RUN npm install
RUN npm install react-scripts -g

COPY . .
RUN npm run build

CMD ["npm","run","server"]