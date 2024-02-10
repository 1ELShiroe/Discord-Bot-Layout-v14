FROM oven/bun:1 as builder

WORKDIR /app

COPY package*.json ./

RUN bun install

FROM oven/bun:1 as runner

WORKDIR /app

COPY --from=builder /app .
COPY . .

USER bun

CMD ["bun", "run", "main.ts"]
