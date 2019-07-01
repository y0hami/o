FROM node:current-alpine

WORKDIR /usr

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn", "test"]
