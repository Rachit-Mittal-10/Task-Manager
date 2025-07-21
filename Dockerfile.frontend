FROM node:lts-slim

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./frontend/ ./frontend
RUN npm install --workspace frontend

COPY ./frontend ./frontend
CMD [ "npm","run","dev","--workspace","frontend" ]
