FROM node:latest AS builder
LABEL maintainer="Pavel Klimuk <pavelklimuk@outlook.com>"

WORKDIR /src
COPY . ./
RUN npm install
RUN npm run build


FROM nginx:stable-alpine-slim
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /src/build .
COPY --from=builder /src/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]