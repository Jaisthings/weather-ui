#base image
FROM node:13.12.0-alpine

#working dir
WORKDIR /weather-gui

#configure path
ENV PATH /weather-gui/node_modules/.bin:$PATH

#install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install react-scripts@4.0.0

COPY . ./

CMD [ "npm", "start" ]
