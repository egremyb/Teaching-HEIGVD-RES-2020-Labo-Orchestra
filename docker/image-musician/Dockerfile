FROM node

COPY musician-app/ /opt/app
WORKDIR /opt/app
RUN npm install

ENTRYPOINT ["node", "index.js"]
