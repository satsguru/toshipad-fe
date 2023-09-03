FROM node:16.3.0-alpine3.13 as builder

WORKDIR /home/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN DEBUG=false GENERATE_SOURCEMAP=false yarn build

FROM nginx:1.25.1

COPY config/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder --chown=www-data:www-data /home/app/build/ /var/www/public_html/