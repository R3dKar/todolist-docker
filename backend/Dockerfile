FROM node:23-alpine AS build

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .
RUN npx prisma generate && \ 
    npm run build && \
    rm -rf node_modules src tsconfig.json package-lock.json && \
    npm i --only=prod && \
    npx prisma generate

FROM node:23-alpine

WORKDIR /app

ARG DATABASE_URL
ARG SERVER_PORT=8000

ENV DATABASE_URL=${DATABASE_URL}
ENV SERVER_PORT=${SERVER_PORT}

EXPOSE ${SERVER_PORT}/tcp
VOLUME /app/dist/frontend

RUN addgroup nodejs && \
    adduser nodejs -G nodejs -D
COPY --from=build --chown=nodejs:nodejs /app .

USER nodejs:nodejs
CMD ["./bootstrap.sh"]