FROM ubuntu:20.04

ENV TZ=UTC
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    build-essential \
    software-properties-common \
    curl \
    git \
    python3-pip \
    python3-dev \
    libffi-dev \
    libssl-dev \
    libxml2-dev \
    libxslt1-dev \
    libjpeg8-dev \
    zlib1g-dev \
    gpg-agent \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh \
 && bash nodesource_setup.sh
RUN apt-get update \
 && apt-get install -y --force-yes --no-install-recommends \
    nodejs \
    ruby-full \
    zip \
    unzip \
    gcc \
    g++ \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN gem install rake bundler
RUN pip3 install --upgrade --no-cache-dir setuptools awscli

RUN mkdir -p /www

WORKDIR /www
