FROM node:23-alpine AS build

WORKDIR /app
COPY . .
RUN npm i && \
    npm run build

FROM node:23-alpine

WORKDIR /app
RUN addgroup nodejs && \
    adduser nodejs -G nodejs -D

ARG DATABASE_URL
ARG SERVER_PORT=8000

ENV DATABASE_URL=${DATABASE_URL}
ENV SERVER_PORT=${SERVER_PORT}

EXPOSE ${SERVER_PORT}/tcp
VOLUME /app/dist/frontend

COPY --from=build /app/package.json /app/bootstrap.sh .
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist/backend ./dist/backend
RUN npm i --only=prod && \
    npx prisma generate && \
    chown nodejs:nodejs -R .

USER nodejs:nodejs
CMD ["./bootstrap.sh"]