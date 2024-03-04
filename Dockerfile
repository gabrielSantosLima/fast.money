ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine


WORKDIR /usr/src/app
COPY . .


RUN npm install --production=false
RUN npm run build

ENV NODE_ENV production

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

EXPOSE 3000

CMD npm start
