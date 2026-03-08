FROM node:lts-alpine3.19
WORKDIR /admin_panel
COPY package*.json pnpm-lock.yaml ./

# update npm and install pnpm from npm

RUN npm install -g npm@latest \
    && npm install -g pnpm \
    && pnpm i 

COPY . /admin_panel
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]