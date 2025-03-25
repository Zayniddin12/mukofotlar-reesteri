FROM node:18.20.4
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build
RUN yarn global add pm2
COPY ecosystem.config.cjs /app/
EXPOSE 3000
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
