FROM ubuntu:18.04

RUN apt update -y && apt install -y chromium-browser firefox nodejs npm

COPY ./ ./
