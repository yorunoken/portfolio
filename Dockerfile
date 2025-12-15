FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lockb* package-lock.json* ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

RUN rm -rf node_modules && bun install --production --frozen-lockfile

FROM oven/bun:1
WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production

# Run the server using Bun
CMD [ "bun", "run", "build/index.js" ]