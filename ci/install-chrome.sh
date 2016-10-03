#!/bin/bash

set -xe
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list

apt-get update -yqq

# Install Chrome browser and Virtual Display emulator.
apt-get install -yqq google-chrome-stable xvfb

export CHROME_BIN=/usr/bin/google-chrome
