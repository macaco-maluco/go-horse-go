FROM jolicode/node-0.6

USER root

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Fix SSL issue: http://stackoverflow.com/a/22526046
RUN npm config set registry="http://registry.npmjs.org/"

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD [ "npm", "start" ]
