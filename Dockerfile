FROM docker.arvancloud.ir/node:lts
WORKDIR /admin_panel
COPY package*.json pnpm-lock.yaml ./

# update npm and install pnpm from npm

COPY . /admin_panel