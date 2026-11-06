FROM docker.arvancloud.ir/node:lts
WORKDIR /bajet_panel
COPY package*.json ./

# update npm and install pnpm from npm

RUN npm install -g npm@latest \
    && npm install -g pnpm@9.15.0 \
    && pnpm i 

COPY . /bajet_panel
RUN npm run build
EXPOSE 3000
CMD ["npm", "start", "--", "--port", "3000"]
