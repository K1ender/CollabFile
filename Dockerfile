FROM node:23-slim AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:23-slim AS production

WORKDIR /app

COPY --from=builder /app/.output ./

COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm

RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "server/index.mjs"]
