FROM node:lts-slim

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./backend/package.json ./backend/
RUN npm install -workspace backend

COPY ./.env ./
COPY ./backend ./backend
CMD ["npm","run","dev","--workspace","backend"]
