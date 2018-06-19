FROM ubuntu:18.04

RUN apt update -y && apt install -y firefox nodejs npm

COPY ./ ./
