FROM node

COPY src/ /opt/app
WORKDIR /opt/app
RUN npm install

ENTRYPOINT ["node", "index.js"]
