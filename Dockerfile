FROM docker.arvancloud.ir/node:lts
WORKDIR /admin_panel
COPY package*.json pnpm-lock.yaml ./

# update npm and install pnpm from npm

RUN npm install -g npm@latest \
    && npm install -g pnpm@9.15.0 \
    && pnpm i 

COPY . /admin_panel
# RUN pnpm build
# EXPOSE 3000
# CMD ["pnpm", "start"]
