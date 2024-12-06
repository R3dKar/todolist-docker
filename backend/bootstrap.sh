#!/bin/sh

npx prisma migrate deploy
while [ $? -ne 0 ]; do
    sleep 2
    npx prisma migrate deploy
done 

npm start