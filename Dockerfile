FROM oven/bun:latest
WORKDIR /app
COPY package.json .
COPY . .
RUN bun i --no-save
RUN bun run build

FROM caddy:latest
COPY --from=0 /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80